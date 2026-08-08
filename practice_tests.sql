-- ============================================================================
-- Uploaded practice tests + audio storage.
-- Run in: Supabase dashboard → SQL Editor.
--
-- The practice platform ships a few built-in tests in the JS bundle; this
-- table holds tests uploaded by staff through the "Upload tests" screen at
-- /practice. Rows are written ONLY by /api/practice-tests (service role,
-- gated by the PRACTICE_ADMIN_KEY env var on Vercel) — the anon key that
-- ships in the browser can just read active tests.
--
-- Audio lives in the public 'practice-audio' storage bucket. Files are
-- uploaded straight from the staff browser via signed upload URLs minted by
-- the same API, so the service key never leaves the server and Vercel's
-- request-size limit doesn't apply to the MP3s.
--
-- Required Vercel env var (server-only, NO VITE_ prefix):
--   PRACTICE_ADMIN_KEY  — any long random string; staff paste it once in the
--                         upload screen. Rotate it to revoke access.
-- ============================================================================

create table if not exists public.practice_tests (
  id text primary key,                       -- slug, e.g. 'vol2-test3-listening'
  title text not null,                       -- 'Test 3 — Listening'
  book_title text not null,                  -- library shelf, e.g. 'Smart LC Vol 2'
  module text not null check (module in ('listening', 'reading', 'writing')),
  duration_min int not null default 60,
  sections jsonb not null,                   -- same shape as src/practice/content.js
  status text not null default 'active',     -- active | hidden
  created_at timestamptz default now()
);

alter table public.practice_tests enable row level security;

-- students (anon key) can read active tests; all writes go through the API
drop policy if exists practice_tests_read on public.practice_tests;
create policy practice_tests_read on public.practice_tests
  for select using (status = 'active');

-- public-read bucket for listening audio (uploads only via signed URLs)
insert into storage.buckets (id, name, public)
  values ('practice-audio', 'practice-audio', true)
  on conflict (id) do nothing;
