// One-Liner Laugh Lab — a tiny program that writes one funny line:
// the excuse a robot vacuum gives after eating a sock.
//
// The line lives in one place (LINE below). The program self-checks it
// against the competition gate (UTF-8 text, 1-200 characters, a single
// line, not only whitespace) and then writes it to entry.txt with NO
// trailing newline, because the newline would count as a character.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I didn't eat your sock — I archived it. It's in the dust vault now, finally reunited with the 47 other singles you've given up on.";

function checkGate(line: string): void {
  if (typeof line !== "string" || line.trim().length === 0) {
    throw new Error("gate: line is blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("gate: line must be a single line");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`gate: line is ${line.length} characters, must be 1-200`);
  }
}

function main(): void {
  checkGate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
  console.log(`wrote entry.txt (${LINE.length} characters)`);
}

main();
