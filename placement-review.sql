-- Per-question review for placement tests.
--
-- /api/placement-submit is the only place that holds both the candidate's
-- answers and the server-only answer key, so it builds the review there and
-- stores it here. Keeping a stored copy (rather than recomputing on demand)
-- means two things: the Admin app can show it without any access to the
-- question bank, and an old result still reads correctly after the bank is
-- edited — a review that silently rewrote itself to match newer questions
-- would be worse than no review at all.
--
-- Shape: [{ section:'grammar'|'reading', id, q, your, correct, ok, why }]
--
-- Safe to re-run. Existing rows keep review = null; the Admin app renders
-- nothing for those, and the score columns it already shows are unaffected.

alter table placement_results
  add column if not exists review jsonb;

-- `source` was written by the API but had never been added to the table. Every
-- insert therefore failed and fell back to a stripped row, which silently
-- dropped `age` too: 33 results were stored with no age at all before this was
-- found. Adding it here is what makes age, source AND review persist.
alter table placement_results
  add column if not exists source text;

-- PostgREST caches the schema, so a new column is invisible to the API until
-- it reloads. Without this the migration looks applied but nothing is stored.
notify pgrst, 'reload schema';

comment on column placement_results.review is
  'Per-question review written by /api/placement-submit: question, the answer given, the correct answer and an explanation. Null for tests taken before this column existed.';
comment on column placement_results.source is
  'Where the result came from: "website" for the public placement test.';
