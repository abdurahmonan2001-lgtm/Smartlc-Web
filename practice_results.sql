-- Run this once in the Supabase dashboard (SQL Editor) to enable
-- storing practice-platform results. Until it exists, finished tests
-- are kept in the student's browser and marked "not synced".
create table if not exists practice_results (
  id uuid primary key default gen_random_uuid(),
  student_username text not null,
  test_id text not null,
  module text,
  raw_score int,          -- null for writing (marked by a teacher)
  total int not null,
  band numeric,
  answers jsonb,
  duration_seconds int,
  taken_at timestamptz default now()
);

alter table practice_results enable row level security;

-- matches the trust model of the existing apps (anon key, client-side)
create policy "practice insert" on practice_results for insert with check (true);
create policy "practice select" on practice_results for select using (true);
