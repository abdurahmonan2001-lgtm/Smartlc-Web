// Step 1 of the cut-out. See scripts/cutout-founder.mjs for step 2 and for
// why the two are separate processes.
//
// The segmentation model is NOT a project dependency — it drags in
// onnxruntime, which nobody needs to build or deploy the site. Install it
// only when the cut-out has to be regenerated:
//
//   npm install --no-save @imgly/background-removal-node
//
// The image is passed as a Blob, not a path: the library treats a bare
// Windows path as a URI and rejects "c:" as an unknown protocol.
import { removeBackground } from "@imgly/background-removal-node";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC = "C:/Users/abdur/Desktop/my photo.jpg";
const OUT = fileURLToPath(new URL("../.cutout-raw.png", import.meta.url));

console.log("segmenting (first run fetches the model, ~1-2 min)...");
const blob = new Blob([readFileSync(SRC)], { type: "image/jpeg" });
writeFileSync(OUT, Buffer.from(await (await removeBackground(blob)).arrayBuffer()));
console.log("wrote .cutout-raw.png");
