-- Owner account for the practice platform
-- =======================================
-- Creates an account that sees every paper — all 12 mocks, all 20 practice
-- sets, all 14 Pre-IELTS sets — with no lesson gate and no once-only lock,
-- and whose attempts are never stored, so the teacher dashboard keeps
-- showing students' work only.
--
-- The privilege comes from the group's level being 'Owner'. Nothing in the
-- website's code is a credential: knowing the word "Owner" grants nothing
-- without this account's username and password.
--
-- FILL IN the four placeholders yourself and run this in the Supabase SQL
-- editor. Do not paste the finished statement into a chat, an issue, or a
-- commit — it contains your password.

-- 1. a group that exists only to carry the Owner level.
--    The three values below identify it; pick something no real class uses.
insert into groups (teacher_username, day, class_time, level)
values ('<<OWNER_TEACHER_KEY>>', 'Owner', '00:00', 'Owner');

-- 2. the account itself, pointing at that group.
--    Choose a username nobody would guess (not your name, not "admin")
--    and a long random password — 20+ characters from a password manager.
insert into students (username, password, full_name, status,
                      teacher_username, day, class_time)
values ('<<OWNER_USERNAME>>', '<<OWNER_PASSWORD>>', 'Owner', 'active',
        '<<OWNER_TEACHER_KEY>>', 'Owner', '00:00');

-- 3. check it reads back as expected (shows no password):
-- select s.username, s.full_name, g.level
--   from students s
--   join groups g on g.teacher_username = s.teacher_username
--                and g.day = s.day and g.class_time = s.class_time
--  where s.username = '<<OWNER_USERNAME>>';
-- expected: level = Owner

-- ---------------------------------------------------------------------
-- READ THIS BEFORE YOU RELY ON THE ACCOUNT BEING PRIVATE
-- ---------------------------------------------------------------------
-- Today this account is NOT private, and neither is any student's.
--
-- The practice platform signs in by asking the database directly, using the
-- public anon key that ships inside the website's JavaScript. Anyone who
-- opens the browser's developer tools can read that key, and the key is
-- currently allowed to SELECT the students table — including the password
-- column, which stores passwords as plain text.
--
-- Verified on 2026-08-15: a request carrying only the public key returned a
-- readable, unhashed password.
--
-- So any student, or anyone who visits the site, can list every account and
-- its password, this owner account included. A strong password does not fix
-- that, because the password itself is readable.
--
-- Closing it properly means the browser must stop reading the students
-- table at all: move the credential check behind a database function or a
-- server route (the placement API already holds a service-role key for
-- exactly this kind of work), then withdraw the anon key's access to the
-- table and hash what is stored. Until that is done, treat this account as
-- convenient rather than secure.
