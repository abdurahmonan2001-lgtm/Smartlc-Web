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
-- ON THE PASSWORD
-- ---------------------------------------------------------------------
-- Choose a long one and keep it in a password manager. It is worth doing
-- properly: this account can open every paper in the library.
--
-- When this file was first written the advice here was the opposite --
-- that the account could not be private, because the practice platform
-- checked credentials by querying students.password with the public key,
-- which meant that column had to be readable and the whole roster was
-- dumpable in plain text. That was true, and it was verified against the
-- live database on 2026-08-15.
--
-- It has since been fixed. Sign-in goes through student_login(), which
-- compares a bcrypt hash held in a table the public key cannot read, and
-- the plaintext column is emptied by a trigger the moment a password is
-- written. A request carrying only the public key now returns no password
-- for any of the 139 students. A strong password on this account is
-- therefore worth exactly what it should be.
--
-- Still outstanding, and worth knowing: the roster itself (names, phone
-- numbers, dates of birth, staff notes) remains readable with the public
-- key. That is a separate piece of work -- see the JWT the login routes
-- already issue, which is what row-level security would key on.
