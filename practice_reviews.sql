-- Run this once in the Supabase dashboard (SQL Editor) to record when a
-- student works through their mistake notebook. Until it exists the Quiz me
-- sessions still run — they simply are not saved, which is how the platform
-- behaved before this table.
--
-- The notebook itself is NOT stored here: the list of mistakes is derived from
-- practice_results every time it opens, so it can never go stale. What this
-- table adds is the missing half — the evidence that the student went back and
-- re-answered them, which is what a teacher wants to know and what nothing in
-- the system recorded.
--
-- One row per finished Quiz me session. `items` holds every question
-- re-answered in that session so a teacher can see which mistakes are fixed
-- and which keep coming back:
--   [{ "test_id": "upset1-reading", "n": 7, "type": "tfng", "right": true }, …]
create table if not exists practice_reviews (
  id uuid primary key default gen_random_uuid(),
  student_username text not null,
  reviewed_at timestamptz default now(),
  right_count int not null,        -- re-answered correctly this time
  total_count int not null,        -- questions put in front of them
  items jsonb,
  seconds int                      -- time spent on the session
);

create index if not exists practice_reviews_student_idx
  on practice_reviews (student_username, reviewed_at desc);

alter table practice_reviews enable row level security;

-- matches the trust model of the existing apps (anon key, client-side)
create policy "reviews insert" on practice_reviews for insert with check (true);
create policy "reviews select" on practice_reviews for select using (true);
