-- Indicative AI marking for mock writing papers.
-- Run once in the Supabase dashboard → SQL Editor.
--
-- The band and the feedback are written by the server (service role) in
-- api/mock-writing-grade.js, never by the browser, so a student cannot award
-- themselves a band. Until this runs, grading silently no-ops and writing
-- papers behave exactly as they do today: stored, unmarked, teacher's job.

alter table practice_results add column if not exists ai_band numeric;
alter table practice_results add column if not exists ai_feedback jsonb;
alter table practice_results add column if not exists ai_graded_at timestamptz;

-- The grader looks up "this student's most recent ungraded writing paper for
-- this test", which is this index exactly.
create index if not exists practice_results_writing_lookup
  on practice_results (student_username, test_id, taken_at desc);

-- Sanity check:
-- select id, student_username, test_id, band, ai_band, ai_graded_at
--   from practice_results where module = 'writing' order by taken_at desc limit 10;
