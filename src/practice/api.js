// Thin Supabase REST helpers for the practice platform.
// Uses the same project (and `students` table) as the Student / Parent apps.
// Environment values have reached Vercel with a UTF-8 BOM in front of them
// (a PowerShell `>` redirect writes one, and it is invisible in the
// dashboard). A BOM in a header value makes fetch throw before the request
// leaves the browser -- "String contains non ISO-8859-1 code point" -- which
// the UI then reports as a connection problem, so the real cause is well
// hidden. api/_session.js strips it server-side; do the same here. Neither a
// URL nor a JWT contains whitespace or non-ASCII, so dropping those is safe.
const env = (v) => String(v ?? "").replace(/[^\x21-\x7e]/g, "");

const URL_BASE = env(import.meta.env.VITE_SUPABASE_URL);
const KEY = env(import.meta.env.VITE_SUPABASE_ANON_KEY);

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

export async function loginStudent(username, password) {
  const q = `${URL_BASE}/rest/v1/students?username=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}&select=username,full_name,status`;
  const res = await fetch(q, { headers });
  if (!res.ok) throw new Error(`login failed: ${res.status}`);
  const rows = await res.json();
  const s = rows[0];
  if (!s) return null;
  if (s.status && s.status !== "active") return null;
  return { username: s.username, full_name: s.full_name };
}

/** Saves a finished attempt; on failure the caller keeps it locally. */
export async function saveResult(result) {
  const res = await fetch(`${URL_BASE}/rest/v1/practice_results`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify(result),
  });
  return res.ok;
}

/** Active staff-uploaded tests, converted to the content.js test shape.
 *  Returns [] until practice_tests.sql has been run (or when offline). */
export async function fetchRemoteTests() {
  try {
    const q = `${URL_BASE}/rest/v1/practice_tests?status=eq.active&select=id,title,book_title,module,duration_min,sections&order=title.asc`;
    const res = await fetch(q, { headers });
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map((r) => ({
      id: r.id,
      bookId: `up:${r.book_title}`,
      bookTitle: r.book_title,
      title: r.title,
      module: r.module,
      durationMin: r.duration_min,
      sections: r.sections,
      uploaded: true,
    }));
  } catch {
    return [];
  }
}

export async function fetchResults(username) {
  const q = `${URL_BASE}/rest/v1/practice_results?student_username=eq.${encodeURIComponent(username)}&order=taken_at.desc&limit=50`;
  const res = await fetch(q, { headers });
  if (!res.ok) return null;
  return res.json();
}
