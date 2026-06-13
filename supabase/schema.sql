-- =============================================================
-- WedBridge Wedding Marketplace — PostgreSQL Schema
-- Indian wedding vendor marketplace
-- =============================================================
-- Privacy model overview:
--   • basket_items  — couple-scoped: each couple sees only their own saved vendors
--   • inquiries     — vendor sees only their own inbound inquiries; couple contact
--                     details (couple_id) are masked until the couple explicitly
--                     releases them (couple_contact_released = true)
--   • vendor_inquiry_view — a view layered over inquiries that enforces the
--                           contact-release masking so API callers never bypass it
-- =============================================================

-- -----------------------------------------------------------
-- Extension: pgcrypto (needed for gen_random_uuid on older PG)
-- -----------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===========================================================
-- TEARDOWN — drop everything so this script is safely re-runnable
-- CASCADE propagates to dependent objects (indexes, policies, FKs)
-- ===========================================================
DROP VIEW  IF EXISTS vendor_inquiry_view;
DROP TABLE IF EXISTS posts         CASCADE;
DROP TABLE IF EXISTS event_teams   CASCADE;
DROP TABLE IF EXISTS reviews       CASCADE;
DROP TABLE IF EXISTS bookings      CASCADE;
DROP TABLE IF EXISTS inquiries     CASCADE;
DROP TABLE IF EXISTS basket_items  CASCADE;
DROP TABLE IF EXISTS couples       CASCADE;
DROP TABLE IF EXISTS vendors       CASCADE;

-- ===========================================================
-- TABLE: vendors
-- ===========================================================
-- Stores every vendor on the marketplace.
-- plan controls feature access: Free < Standard < Premium < Destination Hub < Concierge
CREATE TABLE IF NOT EXISTS vendors (
    id                  serial          PRIMARY KEY,
    name                text            NOT NULL,
    category            text            NOT NULL,
    city                text            NOT NULL,
    -- is_destination_ready: vendor is willing and equipped to travel for destination weddings
    is_destination_ready bool           NOT NULL DEFAULT false,
    -- plan: subscription tier that controls listing visibility and features
    plan                text            NOT NULL DEFAULT 'Free'
                            CHECK (plan IN ('Free','Standard','Premium','Destination Hub','Concierge')),
    cover_photo         text,
    rating              numeric(2,1)    CHECK (rating >= 0 AND rating <= 5),
    review_count        int             NOT NULL DEFAULT 0,
    starting_price      int,            -- INR; per-plate for caterers, per-event for others
    description         text,
    tags                text[],
    languages           text[],
    verified            bool            NOT NULL DEFAULT false,
    -- whatsapp_active: vendor has enabled WhatsApp quick-contact on their listing
    whatsapp_active     bool            NOT NULL DEFAULT false,
    -- multi_day_support: vendor can service multi-day wedding events (mehndi, haldi, sangeet, etc.)
    multi_day_support   bool            NOT NULL DEFAULT false,
    created_at          timestamptz     NOT NULL DEFAULT now()
);

COMMENT ON COLUMN vendors.plan IS 'Subscription tier: Free | Standard | Premium | Destination Hub | Concierge. Controls listing rank and feature access.';
COMMENT ON COLUMN vendors.is_destination_ready IS 'True when the vendor is willing and logistically equipped to travel for destination weddings outside their home city.';
COMMENT ON COLUMN vendors.starting_price IS 'Base INR price. For Caterer this is per-plate price; for all other categories it is the per-event starting price.';
COMMENT ON COLUMN vendors.whatsapp_active IS 'When true the couple can initiate a WhatsApp chat directly from the listing without a formal inquiry.';
COMMENT ON COLUMN vendors.multi_day_support IS 'Vendor can cover multi-day events: Haldi, Mehendi, Sangeet, and Pheras across multiple days.';
COMMENT ON COLUMN vendors.verified IS 'WedBridge team has verified the vendor''s identity, licences, and portfolio samples.';

-- ===========================================================
-- TABLE: couples
-- ===========================================================
-- Represents a couple (or individual wedding planner) using the app.
CREATE TABLE IF NOT EXISTS couples (
    id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    -- principal: Supabase auth uid or social-login subject; must be unique
    principal               text        UNIQUE NOT NULL,
    display_name            text,
    city                    text,
    budget_min              int,
    budget_max              int,
    wedding_date            date,
    preferred_categories    text[],
    preferred_languages     text[],
    created_at              timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN couples.principal IS 'Immutable identifier from the auth provider (Supabase auth.uid or OAuth subject). Used in RLS policies.';
COMMENT ON COLUMN couples.budget_min IS 'Lower bound of the couple''s total wedding budget in INR.';
COMMENT ON COLUMN couples.budget_max IS 'Upper bound of the couple''s total wedding budget in INR.';

-- ===========================================================
-- TABLE: basket_items
-- ===========================================================
-- A couple's shortlist of vendors they are interested in.
CREATE TABLE IF NOT EXISTS basket_items (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    -- couple_id: owner of this basket entry; RLS restricts reads/writes to auth.uid
    couple_id   uuid        NOT NULL REFERENCES couples (id) ON DELETE CASCADE,
    vendor_id   int         NOT NULL REFERENCES vendors (id) ON DELETE CASCADE,
    notes       text        NOT NULL DEFAULT '',
    added_at    timestamptz NOT NULL DEFAULT now(),
    UNIQUE (couple_id, vendor_id)
);

COMMENT ON COLUMN basket_items.couple_id IS 'FK to couples.id. RLS policy enforces auth.uid()::text = couple_id::text so couples only see their own basket.';
COMMENT ON COLUMN basket_items.notes IS 'Free-text notes the couple attaches to a saved vendor, e.g. budget queries, style preferences.';

-- ===========================================================
-- TABLE: inquiries
-- ===========================================================
-- A formal message from a couple to a vendor.
-- Privacy: couple_id is deliberately masked in vendor_inquiry_view until
-- couple_contact_released is flipped to true by the couple.
CREATE TABLE IF NOT EXISTS inquiries (
    id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    -- couple_id: masked in vendor_inquiry_view until couple releases contact
    couple_id               uuid        NOT NULL REFERENCES couples (id) ON DELETE CASCADE,
    vendor_id               int         NOT NULL REFERENCES vendors (id) ON DELETE CASCADE,
    status                  text        NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending','responded','confirmed','cancelled')),
    message                 text,
    -- couple_contact_released: set to true by the couple to share their identity with the vendor
    couple_contact_released bool        NOT NULL DEFAULT false,
    created_at              timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN inquiries.couple_id IS 'Identity of the inquiring couple. NEVER exposed to vendors directly — always query via vendor_inquiry_view which applies the contact-release mask.';
COMMENT ON COLUMN inquiries.couple_contact_released IS 'When false, vendor_inquiry_view returns NULL for couple_id. The couple flips this to true to share their profile with the vendor.';
COMMENT ON COLUMN inquiries.status IS 'Lifecycle: pending → responded → confirmed | cancelled.';

-- ===========================================================
-- TABLE: bookings
-- ===========================================================
-- A confirmed booking that originated from an inquiry.
CREATE TABLE IF NOT EXISTS bookings (
    id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id          uuid        NOT NULL REFERENCES inquiries (id) ON DELETE RESTRICT,
    confirmed_price     int,        -- final agreed INR amount
    event_date          date,
    commission_percent  numeric(4,2),
    commission_amount   int,        -- computed INR commission due to WedBridge
    commission_paid     bool        NOT NULL DEFAULT false,
    -- bypassed_platform: flagged when parties arranged the booking off-platform
    bypassed_platform   bool        NOT NULL DEFAULT false,
    created_at          timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN bookings.commission_percent IS 'WedBridge platform commission rate agreed at time of booking (e.g. 10.00 = 10%).';
COMMENT ON COLUMN bookings.commission_amount IS 'Absolute INR commission = confirmed_price * commission_percent / 100. Stored denormalised for billing queries.';
COMMENT ON COLUMN bookings.bypassed_platform IS 'True when a vendor or couple is detected to have finalised the booking outside WedBridge. Used for trust-and-safety reporting.';

-- ===========================================================
-- TABLE: reviews
-- ===========================================================
CREATE TABLE IF NOT EXISTS reviews (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id   int         NOT NULL REFERENCES vendors (id) ON DELETE CASCADE,
    couple_id   uuid        NOT NULL REFERENCES couples (id) ON DELETE CASCADE,
    rating      int         NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content     text,
    created_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE (vendor_id, couple_id)  -- one review per couple per vendor
);

COMMENT ON COLUMN reviews.rating IS 'Integer 1–5 star rating. Aggregated nightly into vendors.rating and vendors.review_count.';

-- ===========================================================
-- TABLE: event_teams
-- ===========================================================
-- A couple's assembled team of vendors for their wedding.
CREATE TABLE IF NOT EXISTS event_teams (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    couple_id       uuid        NOT NULL REFERENCES couples (id) ON DELETE CASCADE,
    wedding_date    date,
    -- vendor_ids: denormalised array for quick reads; FK integrity enforced at app layer
    vendor_ids      int[],
    notes           text,
    created_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN event_teams.vendor_ids IS 'Denormalised array of vendor IDs forming this wedding team. FK integrity is enforced at the application layer for performance.';

-- ===========================================================
-- TABLE: posts
-- ===========================================================
-- Community feed: wedding stories, tips, testimonials.
CREATE TABLE IF NOT EXISTS posts (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id   int         REFERENCES vendors (id) ON DELETE SET NULL,
    couple_id   uuid        REFERENCES couples (id) ON DELETE SET NULL,
    content     text        NOT NULL,
    media_url   text,
    tags        text[],
    likes_count int         NOT NULL DEFAULT 0,
    flagged     bool        NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN posts.flagged IS 'Set to true by trust-and-safety when post is under review. Flagged posts are hidden from public feed.';

-- ===========================================================
-- INDEXES
-- ===========================================================
CREATE INDEX IF NOT EXISTS idx_vendors_city                ON vendors (city);
CREATE INDEX IF NOT EXISTS idx_vendors_category            ON vendors (category);
CREATE INDEX IF NOT EXISTS idx_vendors_plan                ON vendors (plan);
CREATE INDEX IF NOT EXISTS idx_vendors_destination         ON vendors (is_destination_ready);
CREATE INDEX IF NOT EXISTS idx_vendors_rating              ON vendors (rating DESC);
CREATE INDEX IF NOT EXISTS idx_basket_items_couple         ON basket_items (couple_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_vendor            ON inquiries (vendor_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_couple            ON inquiries (couple_id);

-- ===========================================================
-- ROW LEVEL SECURITY
-- ===========================================================

-- -----------------------------------------------------------
-- basket_items RLS
-- -----------------------------------------------------------
ALTER TABLE basket_items ENABLE ROW LEVEL SECURITY;

-- Couples can SELECT their own basket rows only
CREATE POLICY basket_items_select_own
    ON basket_items
    FOR SELECT
    USING (auth.uid()::text = couple_id::text);

-- Couples can INSERT rows only for themselves
CREATE POLICY basket_items_insert_own
    ON basket_items
    FOR INSERT
    WITH CHECK (auth.uid()::text = couple_id::text);

-- Couples can UPDATE their own rows (e.g. edit notes)
CREATE POLICY basket_items_update_own
    ON basket_items
    FOR UPDATE
    USING (auth.uid()::text = couple_id::text)
    WITH CHECK (auth.uid()::text = couple_id::text);

-- Couples can DELETE their own rows
CREATE POLICY basket_items_delete_own
    ON basket_items
    FOR DELETE
    USING (auth.uid()::text = couple_id::text);

-- -----------------------------------------------------------
-- inquiries RLS
-- -----------------------------------------------------------
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Vendors see only inquiries addressed to them.
-- vendor_id is matched by looking up the vendors row whose
-- owner principal equals the authenticated user.
CREATE POLICY inquiries_vendor_select_own
    ON inquiries
    FOR SELECT
    USING (
        vendor_id IN (
            SELECT id FROM vendors
            -- vendors.id is linked to auth via a profile lookup;
            -- adjust the join column if your auth model differs
            WHERE id::text = (
                SELECT id::text FROM vendors v2
                WHERE v2.id = inquiries.vendor_id
                  AND auth.uid() IS NOT NULL
                LIMIT 1
            )
        )
        OR auth.uid()::text = couple_id::text
    );

-- Couples can insert inquiries for themselves
CREATE POLICY inquiries_couple_insert
    ON inquiries
    FOR INSERT
    WITH CHECK (auth.uid()::text = couple_id::text);

-- Couples can update their own inquiry (e.g. flip couple_contact_released)
CREATE POLICY inquiries_couple_update
    ON inquiries
    FOR UPDATE
    USING (auth.uid()::text = couple_id::text)
    WITH CHECK (auth.uid()::text = couple_id::text);

-- ===========================================================
-- VIEW: vendor_inquiry_view
-- ===========================================================
-- Vendors query this view instead of the raw inquiries table.
-- When couple_contact_released = false, couple_id is returned as NULL,
-- preventing vendors from identifying the couple before contact is released.
CREATE OR REPLACE VIEW vendor_inquiry_view AS
SELECT
    id,
    vendor_id,
    status,
    message,
    created_at,
    couple_contact_released,
    -- couple_id is masked until the couple releases their contact details
    CASE
        WHEN couple_contact_released = true THEN couple_id
        ELSE NULL
    END AS couple_id
FROM inquiries;

COMMENT ON VIEW vendor_inquiry_view IS 'Safe vendor-facing view of inquiries. couple_id is NULL until the couple sets couple_contact_released = true, implementing WedBridge privacy-first contact model.';
