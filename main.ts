import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(dir, "output");
mkdirSync(outDir, { recursive: true });
const src = join(dir, "entry.txt");
const dest = join(outDir, "entry.txt");
copyFileSync(src, dest);
console.log(`wrote ${dest}`);
