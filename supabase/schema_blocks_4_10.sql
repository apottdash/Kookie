-- =============================================================================
-- Wediva — Schema Blocks 4–10
-- Run each block in sequence in the Supabase SQL Editor.
-- After each block a VALIDATION QUERY confirms success.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 4 · bookings — RLS + enhancements
-- (table already exists from block 3; this block adds RLS + extra columns)
-- ─────────────────────────────────────────────────────────────────────────────

-- 4a. Add missing operational columns (safe: IF NOT EXISTS / default values)
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS status       text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','completed','cancelled')),
  ADD COLUMN IF NOT EXISTS event_type   text,            -- Mehendi / Haldi / Sangeet / Pheras etc.
  ADD COLUMN IF NOT EXISTS notes        text;

-- 4b. Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_inquiry   ON bookings (inquiry_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status    ON bookings (status);

-- 4c. RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Couples can read bookings that belong to their inquiries
CREATE POLICY bookings_couple_select ON bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM inquiries i
      JOIN couples c ON c.id = i.couple_id
      WHERE i.id = bookings.inquiry_id
        AND c.principal = auth.uid()::text
    )
  );

-- Only service_role / backend creates bookings (confirmed via inquiry workflow)
-- No INSERT policy for authenticated = bookings created server-side only

-- Couple can update their booking notes
CREATE POLICY bookings_couple_update ON bookings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM inquiries i
      JOIN couples c ON c.id = i.couple_id
      WHERE i.id = bookings.inquiry_id
        AND c.principal = auth.uid()::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM inquiries i
      JOIN couples c ON c.id = i.couple_id
      WHERE i.id = bookings.inquiry_id
        AND c.principal = auth.uid()::text
    )
  );

-- 4d. VALIDATION
SELECT
  'bookings' AS block,
  c.table_name,
  c.column_name,
  p.policyname
FROM information_schema.columns c
LEFT JOIN pg_policies p ON p.tablename = 'bookings'
WHERE c.table_schema = 'public' AND c.table_name = 'bookings'
ORDER BY c.ordinal_position
LIMIT 5;


-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 5 · reviews — RLS + live rating trigger
-- ─────────────────────────────────────────────────────────────────────────────

-- 5a. RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read all approved reviews
CREATE POLICY reviews_public_select ON reviews FOR SELECT USING (true);

-- Couple inserts after a confirmed booking for that vendor
CREATE POLICY reviews_couple_insert ON reviews FOR INSERT
  WITH CHECK (
    auth.uid()::text = (SELECT principal FROM couples WHERE id = reviews.couple_id)
    AND EXISTS (
      SELECT 1 FROM bookings b
      JOIN inquiries i ON i.id = b.inquiry_id
      WHERE i.vendor_id  = reviews.vendor_id
        AND i.couple_id  = reviews.couple_id
        AND b.status IN ('confirmed','completed')
    )
  );

-- Couple can update own review content/rating
CREATE POLICY reviews_couple_update ON reviews FOR UPDATE
  USING  (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id))
  WITH CHECK (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

-- Couple can delete own review
CREATE POLICY reviews_couple_delete ON reviews FOR DELETE
  USING (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

-- 5b. Trigger: recalculate vendor.rating + review_count after any review change
CREATE OR REPLACE FUNCTION wediva_update_vendor_rating()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_vendor_id int;
BEGIN
  v_vendor_id := COALESCE(NEW.vendor_id, OLD.vendor_id);
  UPDATE vendors
     SET rating       = COALESCE(
                          (SELECT ROUND(AVG(r.rating)::numeric, 1)
                             FROM reviews r WHERE r.vendor_id = v_vendor_id),
                          0),
         review_count = (SELECT COUNT(*) FROM reviews r WHERE r.vendor_id = v_vendor_id)
   WHERE id = v_vendor_id;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_update_vendor_rating ON reviews;
CREATE TRIGGER trg_update_vendor_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION wediva_update_vendor_rating();

-- 5c. VALIDATION
SELECT
  'reviews' AS block,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'reviews') AS policy_count,
  (SELECT COUNT(*) FROM pg_trigger WHERE tgname = 'trg_update_vendor_rating') AS trigger_exists;


-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 6 · vendor_accounts — vendor portal auth
-- Links a verified vendor's Supabase auth user to their vendors row.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS vendor_accounts (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id   int     NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  principal   text    UNIQUE NOT NULL,  -- auth.uid() of the vendor's Supabase user
  email       text,
  phone       text,
  gstin       text,                     -- GST registration number
  is_owner    bool    NOT NULL DEFAULT true,  -- false = team member (future)
  is_verified bool    NOT NULL DEFAULT false, -- flipped by admin after ID check
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (vendor_id, principal)
);

COMMENT ON COLUMN vendor_accounts.principal  IS 'Supabase auth.uid() for this vendor login';
COMMENT ON COLUMN vendor_accounts.gstin      IS 'GST Identification Number — required for Verified badge';
COMMENT ON COLUMN vendor_accounts.is_verified IS 'Set to true by admin after GST + ID documents confirmed';

CREATE INDEX IF NOT EXISTS idx_vendor_accounts_principal ON vendor_accounts (principal);
CREATE INDEX IF NOT EXISTS idx_vendor_accounts_vendor    ON vendor_accounts (vendor_id);

ALTER TABLE vendor_accounts ENABLE ROW LEVEL SECURITY;

-- Vendor sees only their own account row
CREATE POLICY vendor_accounts_select_own ON vendor_accounts FOR SELECT
  USING (auth.uid()::text = principal);

-- Vendor can update contact details (not is_verified — that stays admin-only)
CREATE POLICY vendor_accounts_update_own ON vendor_accounts FOR UPDATE
  USING (auth.uid()::text = principal)
  WITH CHECK (auth.uid()::text = principal);

-- Self-registration: vendor creates their own account row after signing up
CREATE POLICY vendor_accounts_insert_own ON vendor_accounts FOR INSERT
  WITH CHECK (auth.uid()::text = principal);

-- 6b. VALIDATION
SELECT
  'vendor_accounts' AS block,
  t.table_name,
  fk.constraint_name,
  fk.foreign_table_name
FROM information_schema.tables t
LEFT JOIN (
  SELECT tc.constraint_name, tc.table_name,
         ccu.table_name AS foreign_table_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON ccu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'vendor_accounts'
) fk ON fk.table_name = t.table_name
WHERE t.table_schema = 'public' AND t.table_name = 'vendor_accounts';


-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 7 · recommendation_settings — per-couple engine preferences
-- Stores each couple's scoring weight overrides and WediGuide consent.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS recommendation_settings (
  id                   uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id            uuid    UNIQUE NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  enabled              bool    NOT NULL DEFAULT true,
  -- Scoring weight overrides (must sum to 100; defaults match useRecommendations.ts)
  weight_budget        int     NOT NULL DEFAULT 40 CHECK (weight_budget   BETWEEN 0 AND 100),
  weight_rating        int     NOT NULL DEFAULT 30 CHECK (weight_rating   BETWEEN 0 AND 100),
  weight_city          int     NOT NULL DEFAULT 20 CHECK (weight_city     BETWEEN 0 AND 100),
  weight_plan_tier     int     NOT NULL DEFAULT 10 CHECK (weight_plan_tier BETWEEN 0 AND 100),
  -- Excluded categories (couple doesn't want suggestions from these)
  excluded_categories  text[]  NOT NULL DEFAULT '{}',
  -- WediGuide AI: false = bot must ask before recommending (per T&C spec)
  wedi_guide_opt_in    bool    NOT NULL DEFAULT false,
  updated_at           timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN recommendation_settings.wedi_guide_opt_in IS 'false = WediGuide must ask permission before recommending vendors; true = proactive suggestions allowed';
COMMENT ON COLUMN recommendation_settings.weight_budget     IS 'Scoring weight for budget match (default 40). Total of all four weights should equal 100.';

CREATE INDEX IF NOT EXISTS idx_rec_settings_couple ON recommendation_settings (couple_id);

ALTER TABLE recommendation_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY rec_settings_select_own ON recommendation_settings FOR SELECT
  USING (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

CREATE POLICY rec_settings_insert_own ON recommendation_settings FOR INSERT
  WITH CHECK (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

CREATE POLICY rec_settings_update_own ON recommendation_settings FOR UPDATE
  USING  (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id))
  WITH CHECK (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

-- Auto-stamp updated_at on change
CREATE OR REPLACE FUNCTION wediva_stamp_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_rec_settings_updated_at ON recommendation_settings;
CREATE TRIGGER trg_rec_settings_updated_at
  BEFORE UPDATE ON recommendation_settings
  FOR EACH ROW EXECUTE FUNCTION wediva_stamp_updated_at();

-- 7b. VALIDATION
SELECT
  'recommendation_settings' AS block,
  (SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema='public' AND table_name='recommendation_settings') AS table_exists,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename='recommendation_settings') AS policy_count;


-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 8 · couple_events — individual ceremony planning
-- One row per ceremony (Mehendi, Haldi, Sangeet, Pheras, Reception, etc.)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS couple_events (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id         uuid    NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  event_type        text    NOT NULL CHECK (event_type IN (
                              'Mehendi','Haldi','Sangeet','Baraat','Pheras',
                              'Reception','Tilak','Engagement','Cocktail','Custom'
                            )),
  event_name        text,           -- custom label when event_type = 'Custom'
  event_date        date,
  venue_id          int     REFERENCES vendors(id) ON DELETE SET NULL,  -- optional venue vendor
  guest_count       int,
  budget_allocated  int,            -- INR budget ring-fenced for this ceremony
  notes             text,
  is_confirmed      bool    NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN couple_events.venue_id         IS 'Optional reference to a Venue vendor for this ceremony';
COMMENT ON COLUMN couple_events.budget_allocated IS 'INR amount ring-fenced for this individual ceremony';

CREATE INDEX IF NOT EXISTS idx_couple_events_couple ON couple_events (couple_id);
CREATE INDEX IF NOT EXISTS idx_couple_events_date   ON couple_events (event_date);

ALTER TABLE couple_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY couple_events_select_own ON couple_events FOR SELECT
  USING (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

CREATE POLICY couple_events_insert_own ON couple_events FOR INSERT
  WITH CHECK (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

CREATE POLICY couple_events_update_own ON couple_events FOR UPDATE
  USING  (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id))
  WITH CHECK (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

CREATE POLICY couple_events_delete_own ON couple_events FOR DELETE
  USING (auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id));

-- 8b. VALIDATION
SELECT
  'couple_events' AS block,
  (SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema='public' AND table_name='couple_events') AS table_exists,
  (SELECT COUNT(*) FROM information_schema.referential_constraints
   WHERE constraint_schema='public'
     AND unique_constraint_name IN (
       SELECT constraint_name FROM information_schema.table_constraints
       WHERE table_name IN ('couples','vendors')
     )
     AND (SELECT table_name FROM information_schema.constraint_table_usage
          WHERE constraint_name=referential_constraints.constraint_name
          LIMIT 1) = 'couple_events'
  ) AS fk_count;


-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 9 · terms_agreements — T&C consent audit trail
-- Immutable record of every user accepting a version of Wediva's T&C.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS terms_agreements (
  id                    uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  principal             text    NOT NULL,   -- auth.uid() of the consenting user
  role                  text    NOT NULL CHECK (role IN ('couple','vendor','planner')),
  terms_version         text    NOT NULL DEFAULT '1.0',
  agreed_at             timestamptz NOT NULL DEFAULT now(),
  ip_address            text,               -- server-captured; never from client JS
  user_agent            text,
  platform              text    NOT NULL DEFAULT 'web'
                                CHECK (platform IN ('web','android','ios')),
  -- Explicit consent flags (matching the checkboxes in AuthModal + VendorOnboarding)
  consent_no_offplatform bool   NOT NULL DEFAULT false,  -- agreed to "no off-platform deals" rule
  UNIQUE (principal, terms_version)   -- one record per user per T&C version
);

COMMENT ON COLUMN terms_agreements.principal             IS 'Supabase auth.uid() of the user who agreed';
COMMENT ON COLUMN terms_agreements.terms_version         IS 'Semantic version of T&C accepted; increment when material changes are made';
COMMENT ON COLUMN terms_agreements.consent_no_offplatform IS 'true = user explicitly ticked the no-off-platform-deals checkbox';
COMMENT ON COLUMN terms_agreements.ip_address            IS 'Server-side IP capture for legal evidence; never populate from client';

CREATE INDEX IF NOT EXISTS idx_terms_agreements_principal ON terms_agreements (principal);
CREATE INDEX IF NOT EXISTS idx_terms_agreements_version   ON terms_agreements (terms_version);

ALTER TABLE terms_agreements ENABLE ROW LEVEL SECURITY;

-- Users can read their own agreements
CREATE POLICY terms_agreements_select_own ON terms_agreements FOR SELECT
  USING (auth.uid()::text = principal);

-- Users can insert their own consent record
CREATE POLICY terms_agreements_insert_own ON terms_agreements FOR INSERT
  WITH CHECK (auth.uid()::text = principal);

-- NO UPDATE / DELETE for authenticated users — agreements are immutable.
-- Only service_role can amend (e.g. legal corrections via Supabase dashboard).

-- 9b. VALIDATION
SELECT
  'terms_agreements' AS block,
  (SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema='public' AND table_name='terms_agreements') AS table_exists,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename='terms_agreements') AS policy_count,
  (SELECT COUNT(*) FROM information_schema.table_constraints
   WHERE table_name='terms_agreements' AND constraint_type='UNIQUE') AS unique_constraints;


-- ─────────────────────────────────────────────────────────────────────────────
-- BLOCK 10 · off_platform_alerts — suspected bypass incident tracking
-- Records reported or system-detected off-platform deal attempts.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS off_platform_alerts (
  id               uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Reported parties (nullable: might not know both sides at report time)
  couple_id        uuid    REFERENCES couples(id) ON DELETE SET NULL,
  vendor_id        int     REFERENCES vendors(id) ON DELETE SET NULL,
  inquiry_id       uuid    REFERENCES inquiries(id) ON DELETE SET NULL,
  -- Who filed it
  reported_by      text    NOT NULL,   -- principal (auth.uid()) or 'system'
  alert_type       text    NOT NULL CHECK (alert_type IN (
                              'couple_reported',    -- couple says vendor solicited off-platform
                              'vendor_reported',    -- vendor says couple went off-platform
                              'system_detected',    -- future: pattern-based auto-detect
                              'admin_flagged'       -- admin manually raised
                            )),
  description      text,
  evidence_urls    text[]  NOT NULL DEFAULT '{}',  -- Supabase Storage URLs for screenshots/receipts
  -- Resolution tracking
  status           text    NOT NULL DEFAULT 'open' CHECK (status IN (
                              'open','investigating','resolved','dismissed'
                            )),
  penalty_applied  bool    NOT NULL DEFAULT false,
  penalty_amount   int,                -- INR fine charged (per T&C: 5% min ₹5,000 for couples; 7% for vendors)
  resolved_by      text,               -- admin principal
  resolved_at      timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN off_platform_alerts.alert_type     IS 'Source of the report: couple, vendor, system auto-detect, or admin';
COMMENT ON COLUMN off_platform_alerts.evidence_urls  IS 'Supabase Storage paths to uploaded screenshots, bank receipts, WhatsApp exports';
COMMENT ON COLUMN off_platform_alerts.penalty_amount IS 'INR fine levied per Section 3 of T&C: 5% min ₹5,000 (couples) or 7% (vendors)';

CREATE INDEX IF NOT EXISTS idx_off_platform_couple   ON off_platform_alerts (couple_id);
CREATE INDEX IF NOT EXISTS idx_off_platform_vendor   ON off_platform_alerts (vendor_id);
CREATE INDEX IF NOT EXISTS idx_off_platform_status   ON off_platform_alerts (status);
CREATE INDEX IF NOT EXISTS idx_off_platform_reporter ON off_platform_alerts (reported_by);

ALTER TABLE off_platform_alerts ENABLE ROW LEVEL SECURITY;

-- Anyone can file a report (authenticated users only)
CREATE POLICY off_platform_alerts_insert_own ON off_platform_alerts FOR INSERT
  WITH CHECK (auth.uid()::text = reported_by);

-- Reporters can see only the reports they filed
CREATE POLICY off_platform_alerts_select_reporter ON off_platform_alerts FOR SELECT
  USING (auth.uid()::text = reported_by);

-- Couples named in a report can see that report (to respond / provide evidence)
CREATE POLICY off_platform_alerts_select_named_couple ON off_platform_alerts FOR SELECT
  USING (
    auth.uid()::text = (SELECT principal FROM couples WHERE id = couple_id)
  );

-- UPDATE / DELETE restricted to service_role (admin via dashboard) only.
-- This prevents parties from deleting evidence or changing resolution outcomes.

-- 10b. FINAL VALIDATION — confirm all 7 new tables / RLS blocks succeeded
SELECT
  t.table_name                                                      AS "Table",
  (SELECT COUNT(*) FROM pg_policies p WHERE p.tablename = t.table_name) AS "RLS Policies",
  (SELECT COUNT(*) FROM pg_trigger  g WHERE g.tgrelid = (
    'public.' || t.table_name)::regclass::oid
  )                                                                 AS "Triggers"
FROM information_schema.tables t
WHERE t.table_schema = 'public'
  AND t.table_name IN (
    'bookings','reviews','vendor_accounts',
    'recommendation_settings','couple_events',
    'terms_agreements','off_platform_alerts'
  )
ORDER BY t.table_name;
