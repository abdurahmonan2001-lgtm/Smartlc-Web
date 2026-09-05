// A dev-only harness for the "My mistakes" notebook on its own, with no
// sign-in and no practice home around it.
//
// The notebook reads a student's results from the database, so it cannot be
// looked at without signing in as a real student who has sat real papers.
// This mounts the SAME component against a made-up student whose answer
// sheets are built from the papers' own keys — so every question, every
// explanation and every highlighted line is the real thing, only the ticks
// and crosses are invented.
//
// To reach the notebook through the app instead — the practice home, the
// history, the whole platform — use seed.html, which puts the same student
// into this browser and hands over to /practice.
//
// Not part of the app and not in the production build: vite builds
// index.html only, and nothing here is imported by src/.
//
//   http://localhost:5188/preview/notebook.html
import React from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import Notebook from "../src/practice/Notebook.jsx";
import { getTest } from "../src/practice/content.js";
import { rows, user } from "./rows.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Notebook user={user} findTest={getTest} onBack={() => {}} rows={rows} />
  </React.StrictMode>,
);
