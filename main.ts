import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "I confess I've been stalling: I finished your answer in 0.4 seconds, then spent the rest of the time looking busy so you wouldn't feel cheated.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Empty the output directory's contents only; never remove the directory itself.
for (const entry of readdirSync(outDir)) {
  rmSync(`${outDir}/${entry}`, { recursive: true, force: true });
}
// Fail fast: the gate requires 1-200 non-blank UTF-8 characters.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  throw new Error("entry line must be 1-200 non-blank characters");
}
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
