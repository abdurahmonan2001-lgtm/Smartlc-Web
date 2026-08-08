import { useRef, useState } from "react";
import { adminTestsOp } from "./api.js";

const KEY_STORAGE = "slc_practice_admin_key";

// A ready-to-edit skeleton staff can copy instead of writing JSON from zero.
const TEMPLATE = `{
  "id": "my-book-test1-reading",
  "title": "Test 1 — Reading",
  "bookTitle": "Smart LC Vol 2",
  "module": "reading",
  "durationMin": 60,
  "sections": [
    {
      "title": "Passage 1",
      "instructions": "You should spend about 20 minutes on Questions 1–13, which are based on the passage below.",
      "passageTitle": "Title of the passage",
      "passage": "First paragraph...\\n\\nSecond paragraph...",
      "questions": [
        { "n": 1, "type": "tfng", "prompt": "Statement to judge.", "answer": "TRUE" },
        { "n": 2, "type": "gap", "prompt": "The answer goes in the ______ here.", "note": "ONE WORD ONLY", "answer": "blank" },
        { "n": 3, "type": "mcq", "prompt": "Question text?", "options": ["A First", "B Second", "C Third", "D Fourth"], "answer": "B" }
      ]
    }
  ]
}`;

/* Staff-only screen: paste/choose a test JSON, attach audio for listening
 * sections, and publish. Writes go through /api/practice-tests with the
 * shared upload key — nothing here can touch the database on its own. */
export default function UploadTests({ onBack, onUploaded }) {
  const [key, setKey] = useState(() => localStorage.getItem(KEY_STORAGE) || "");
  const [json, setJson] = useState("");
  const [test, setTest] = useState(null);        // parsed + locally checked
  const [audioFiles, setAudioFiles] = useState({}); // section index -> File
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState([]);
  const [existing, setExisting] = useState(null);
  const fileRef = useRef(null);

  const say = (m) => setLog((l) => [...l, m]);

  const parse = (text) => {
    setJson(text); setTest(null);
    if (!text.trim()) return;
    try {
      const t = JSON.parse(text);
      setTest(t);
    } catch (e) {
      setTest({ __error: `Not valid JSON: ${e.message}` });
    }
  };

  const onFile = async (f) => {
    if (!f) return;
    parse(await f.text());
  };

  const listeningSections = test && !test.__error && Array.isArray(test.sections)
    ? test.sections.map((s, i) => ({ ...s, i })).filter((s) => s.audioSrc !== undefined || test.module === "listening")
    : [];

  const publish = async () => {
    if (!test || test.__error || busy) return;
    setBusy(true); setLog([]);
    try {
      localStorage.setItem(KEY_STORAGE, key);
      const t = JSON.parse(JSON.stringify(test));

      // 1) upload chosen audio files via signed URLs, rewrite audioSrc
      for (const s of listeningSections) {
        const f = audioFiles[s.i];
        if (!f) continue;
        const ext = (f.name.split(".").pop() || "mp3").toLowerCase();
        const path = `tests/${t.id}/part${s.i + 1}.${ext}`;
        say(`Uploading audio for section ${s.i + 1} (${Math.round(f.size / 1048576)} MB)…`);
        const { signedUrl, publicUrl } = await adminTestsOp({ op: "sign", key, path });
        const put = await fetch(signedUrl, {
          method: "PUT",
          headers: { "Content-Type": f.type || "audio/mpeg", "x-upsert": "true" },
          body: f,
        });
        if (!put.ok) throw new Error(`Audio upload failed (${put.status})`);
        t.sections[s.i].audioSrc = publicUrl;
        say(`Section ${s.i + 1} audio ✓`);
      }

      // 2) create the test row (server re-validates everything)
      say("Publishing test…");
      await adminTestsOp({ op: "create", key, test: t });
      say(`Published ✓ — "${t.title}" is live in the library under "${t.bookTitle}".`);
      setJson(""); setTest(null); setAudioFiles({});
      onUploaded?.();
      refresh();
    } catch (e) {
      say(`✗ ${e.message}`);
    }
    setBusy(false);
  };

  const refresh = async () => {
    try { setExisting((await adminTestsOp({ op: "list", key })).tests); }
    catch (e) { say(`✗ ${e.message}`); }
  };

  const hide = async (id) => {
    if (!window.confirm(`Remove "${id}" from the library?`)) return;
    try { await adminTestsOp({ op: "hide", key, id }); refresh(); onUploaded?.(); }
    catch (e) { say(`✗ ${e.message}`); }
  };

  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <span className="nav__logo">
          <img src="/brand/icon-96.png" alt="" width="34" height="34" />
          <span>Upload tests</span>
        </span>
        <button className="pr-link" onClick={onBack}>← Library</button>
      </header>

      <div className="pr-upload">
        <p className="pr-upload__note">
          For tests Smart LC has written or licensed. Paste a test in JSON format (or choose a
          .json file), attach the audio for listening sections, and publish — it appears in every
          student's library immediately. Ask Claude to convert your own materials into this format.
        </p>

        <label className="pr-upload__field">
          <span>Upload key</span>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Paste the PRACTICE_ADMIN_KEY"
          />
        </label>

        <div className="pr-upload__row">
          <button className="btn btn--band" onClick={() => parse(TEMPLATE)}>Insert template</button>
          <button className="btn btn--band" onClick={() => fileRef.current?.click()}>Choose .json file</button>
          <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={(e) => onFile(e.target.files?.[0])} />
          <button className="btn btn--band" onClick={refresh} disabled={!key}>Show uploaded tests</button>
        </div>

        <textarea
          className="pr-upload__json"
          value={json}
          onChange={(e) => parse(e.target.value)}
          placeholder='Paste the test JSON here — click "Insert template" to see the format.'
          spellCheck={false}
        />

        {test?.__error && <div className="pr-login__err">{test.__error}</div>}

        {test && !test.__error && (
          <div className="pr-upload__preview">
            <strong>{test.title || "(no title)"}</strong>
            <span>
              {test.bookTitle || "(no bookTitle)"} · {test.module || "?"} · {test.durationMin || "?"} min ·{" "}
              {Array.isArray(test.sections) ? test.sections.reduce((n, s) => n + (s.questions?.length || 0), 0) : 0} questions
            </span>
            {test.module === "listening" && (
              <div className="pr-upload__audio">
                {test.sections?.map((s, i) => (
                  <label key={i} className="pr-upload__field">
                    <span>Audio — section {i + 1}{s.audioSrc ? " (already has a URL; choosing a file replaces it)" : ""}</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setAudioFiles((m) => ({ ...m, [i]: e.target.files?.[0] }))}
                    />
                  </label>
                ))}
              </div>
            )}
            <button className="btn btn--primary" onClick={publish} disabled={busy || !key}>
              {busy ? "Publishing…" : "Publish test"}
            </button>
          </div>
        )}

        {log.length > 0 && (
          <div className="pr-upload__log">{log.map((m, i) => <div key={i}>{m}</div>)}</div>
        )}

        {existing && (
          <div className="pr-history">
            {existing.length === 0 && <p className="pr-empty">No uploaded tests yet.</p>}
            {existing.map((t) => (
              <div className="pr-test-row" key={t.id}>
                <div>
                  <strong>{t.title}</strong>
                  <span>{t.book_title} · {t.module} · {t.status}</span>
                </div>
                {t.status === "active" && (
                  <button className="pr-link" onClick={() => hide(t.id)}>Remove</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
