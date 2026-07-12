-- =============================================================
-- VowVoyage — Add couple persona & social profile columns
-- Run this in Supabase SQL Editor (safe to run multiple times)
-- =============================================================

ALTER TABLE couples
  ADD COLUMN IF NOT EXISTS guest_count            int,
  ADD COLUMN IF NOT EXISTS wedding_style          text,
  ADD COLUMN IF NOT EXISTS events_needed          text[],
  ADD COLUMN IF NOT EXISTS instagram_handle       text,
  ADD COLUMN IF NOT EXISTS pinterest_url          text,
  ADD COLUMN IF NOT EXISTS facebook_url           text,
  ADD COLUMN IF NOT EXISTS wedding_hashtag        text,
  ADD COLUMN IF NOT EXISTS wants_whatsapp_updates bool NOT NULL DEFAULT true;
