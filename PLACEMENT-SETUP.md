# Public placement test — setup & security notes

The placement test now lives on the website at **`/placement`** (linked from the
"Check your level" section). It is no longer a hidden kiosk behind the `test`
teacher account in the Staff App.

## Required env vars (this website's Vercel project)

| Var | Where to get it | Why |
|---|---|---|
| `SUPABASE_URL` | Supabase → Settings → API → Project URL | where to save results |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role | server-only write access |
| `ANTHROPIC_API_KEY` | Anthropic console | AI writing grading |
| `PLACEMENT_SECRET` | any long random string you invent | signs test-session tokens |

⚠️ None of these may use the `VITE_` prefix — `VITE_` variables are compiled
into the public browser bundle. These are read only by the serverless functions
in `api/`, which never run in a browser.

After setting them, redeploy and open `/placement` to smoke-test.

## How the security works

**The answer key never reaches the browser.** `api/_bank.js` holds the
questions *and* their answers. Vercel does not expose underscore-prefixed
files as endpoints, so it is server-only. `/api/placement-start` returns the
questions with the `answer` field stripped; `/api/placement-submit` scores
them. Previously the whole key shipped in the JS bundle — acceptable on an
office tablet, fatal on a public URL where anyone can view source.

**The website holds no database credentials at all.** There is no Supabase
client in the frontend. Results are written by the serverless function using
the service-role key, so a visitor cannot read anyone's results back — the
response contains only their own score.

**The score is computed server-side**, so a candidate cannot submit a level of
their choosing, and answers are validated against the order they were actually
served (the signed token encodes the shuffle seed).

**Abuse controls:** signed one-use session token; minimum 60 seconds to
complete; hidden honeypot field; per-IP rate limits (12 starts, 6 submissions
per hour); hard caps on name/phone/writing length; the AI call is only
reachable through a scored submission, never directly.

**Per-candidate question order.** Grammar questions and all multiple-choice
options are shuffled per session, so answers cannot circulate between
applicants.

## Database

Run `placement-rls.sql` (in this folder) in the Supabase SQL editor to revoke
public access to `placement_results`. After it, only the service role can read
or write that table: this website's API writes to it, and the office admin app
reads it with its own service key. No anon key — and therefore no browser —
can list applicants' names and phone numbers.

## For the office

Running the test on a tablet in the centre: just open
`https://<your-domain>/placement` — no login. Results appear in the admin app's
CRM exactly as before (matched to leads by phone number).

The `test` teacher account is no longer used by the app. You can leave it (the
apps filter it out of rosters with `.neq('username','test')`) or ask us to
retire it; either way it can no longer open the placement test.
