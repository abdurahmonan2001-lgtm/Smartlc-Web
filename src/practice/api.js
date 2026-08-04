// Thin Supabase REST helpers for the practice platform.
// Uses the same project (and `students` table) as the Student / Parent apps.
const URL_BASE = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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

export async function fetchResults(username) {
  const q = `${URL_BASE}/rest/v1/practice_results?student_username=eq.${encodeURIComponent(username)}&order=taken_at.desc&limit=50`;
  const res = await fetch(q, { headers });
  if (!res.ok) return null;
  return res.json();
}
