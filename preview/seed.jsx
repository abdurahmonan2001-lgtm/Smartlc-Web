// Puts the preview student's session and finished papers into this browser,
// then hands over to the real app at /practice.
//
// The notebook reads a student's results from the database, so without this
// there is no way to look at it except by signing in as a real student who
// has really sat papers. The rows are written to the offline queue that the
// app already reads alongside the database — a queue that is only ever
// appended to on a failed save and never flushed back, so nothing here can
// reach the live database.
//
// Not part of the app and not in the production build.
//
//   http://localhost:5188/preview/seed.html
import { rows, user } from "./rows.js";

const SESSION_KEY = "slc_practice_user";
const PENDING_KEY = "slc_practice_pending";

const el = document.getElementById("root");
el.style.cssText = "font:15px/1.6 system-ui,sans-serif;color:#0f172a;max-width:520px;margin:80px auto;padding:0 20px";

// Straight to the notebook rather than the practice home. This student
// belongs to no class, so the home can only say it cannot tell which papers
// are theirs — correct behaviour (a failed lookup must never unlock
// anything) but a poor first screen. The notebook needs no class.
const enter = (path) => () => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem(PENDING_KEY, JSON.stringify(rows));
  window.location.href = path;
};

const leave = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(PENDING_KEY);
  el.querySelector("p.msg").textContent = "Cleared. This browser is signed out again.";
};

el.innerHTML = `
  <h1 style="font-size:20px;margin:0 0 10px">Preview student</h1>
  <p class="msg">Five finished papers — two practice, and Mock 1 entire — put into this
  browser so the practice platform can be clicked through without a real account.
  Nothing is written to the database.</p>
  <p><button id="go" style="font:inherit;padding:10px 16px;border:0;border-radius:8px;background:#0f172a;color:#fff;cursor:pointer">Open My mistakes</button>
  <button id="home" style="font:inherit;padding:10px 16px;margin-left:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer">Practice home</button>
  <button id="clr" style="font:inherit;padding:10px 16px;margin-left:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer">Sign out again</button></p>
  <p style="color:#64748b;font-size:13.5px">This student belongs to no class, so the
  practice home can only say it cannot tell which papers are theirs. The notebook
  does not need a class. The notebook with no sign-in at all is at
  <a href="/preview/notebook.html">/preview/notebook.html</a>.</p>`;

el.querySelector("#go").onclick = enter("/practice/notebook");
el.querySelector("#home").onclick = enter("/practice");
el.querySelector("#clr").onclick = leave;
