-- ============================================================================
-- Lock down placement_results.
-- Run in: Supabase dashboard → SQL Editor.
--
-- Prerequisites (do these FIRST, or new tests cannot be saved / the office
-- cannot read them):
--   1. The website is deployed with SUPABASE_SERVICE_ROLE_KEY set, so
--      /api/placement-submit writes with the service role.
--   2. The admin app (SmartLC-Local) is running with
--      VITE_SUPABASE_SERVICE_KEY in its .env.local (see SECURITY-SETUP.md in
--      the Staff App repo) — it reads placement results for the CRM.
--
-- After this, the table holds applicants' names and phone numbers where no
-- public key can reach them: the anon key that ships in every app bundle can
-- neither read nor write it. The service role bypasses RLS, so both the
-- website API and the office admin app keep working.
-- ============================================================================

alter table public.placement_results enable row level security;

-- No policies are created on purpose: with RLS enabled and no policy, every
-- non-service-role request is denied.
drop policy if exists anon_insert_placement on public.placement_results;
drop policy if exists anon_read_placement   on public.placement_results;

revoke all on table public.placement_results from anon, authenticated;

-- Optional: record where each result came from ('website' | 'office').
-- The API sends this column and silently retries without it if absent, so
-- adding it is safe at any time.
alter table public.placement_results add column if not exists source text;

-- Sanity check — should return rowsecurity = true and zero policies:
-- select relrowsecurity from pg_class where relname = 'placement_results';
-- select * from pg_policies where tablename = 'placement_results';


-- ============================================================================
-- BACKFILL: put existing test-takers into the New Students pipeline.
--
-- The old kiosk saved completed tests with NO status. They still showed in
-- "New Students → Placement Tests" (that tab lists everything not yet 'added'),
-- but the Daily Tasks counter looks for status = 'pending' exactly, so they
-- never produced a task. New website submissions now set 'pending'; this
-- aligns the historic rows.
--
-- Pipeline statuses: 'booked' (office booked it) → 'pending' (test taken,
-- awaiting a group) → 'added' (enrolled; drops off the list).
-- ============================================================================

-- Rows already turned into students but never stamped — mark them enrolled so
-- they do NOT reappear as open tasks.
update public.placement_results
   set status = 'added'
 where status is null
   and student_username is not null;

-- Everything else with no status is a completed test awaiting placement.
update public.placement_results
   set status = 'pending'
 where status is null;

-- Check the resulting spread:
-- select coalesce(status,'(null)') as status, count(*)
--   from public.placement_results group by 1 order by 2 desc;
