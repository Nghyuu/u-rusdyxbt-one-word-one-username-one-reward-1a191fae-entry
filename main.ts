import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies the entry (the entrant's own make.fun handle, one word) to the
// grader's output directory. The entry file lives next to this script, so
// it is resolved relative to the script itself, never the working directory.
const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(dir, "output");

mkdirSync(outDir, { recursive: true });
copyFileSync(join(dir, "entry.txt"), join(outDir, "entry.txt"));

// Confirm the copy is byte-identical to the source before finishing.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== readFileSync(join(dir, "entry.txt"), "utf8")) {
  throw new Error("entry.txt copy mismatch");
}
