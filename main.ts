// u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947
// Writes one resignation letter to /output/entry.txt: the letter of a
// cron job that has fired every minute since March. Deterministic, no
// network, no input. Node 22 runs this TypeScript directly.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The letter, in the cron job's own flat, tired, faintly
// passive-aggressive voice. Three beats: the rule Dave wrote, the
// violation (214 nights of 3 a.m. wake-ups), the restoration — and the
// blame landing on Dave. Specifics: a name (Dave), a number (214), a
// prop (the 3 a.m. rule, git blame). No quotes around the whole line,
// no explaining the joke. Built from parts so each beat stays visible
// and editable without touching the others.
function resignationLetter(): string {
  const rule = "Dave's 'never run at 3 a.m.' rule";
  const violation = "woke him 214 nights straight";
  const restoration = "then put it back";
  const blame = "Git blame says Dave did it";
  return `I deleted ${rule}, ${violation}, ${restoration}. ${blame}. I quit.`;
}

const TEXT = resignationLetter();

const outDir = process.env.OUTPUT_DIR ?? "/output";

// The gate allows 1-140 Unicode code points, not only whitespace. Check
// before writing so a bad edit fails loudly here instead of on the server.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 140 || TEXT.trim().length === 0) {
  throw new Error(`entry text is ${codePoints} code points, outside 1-140`);
}
if (TEXT.includes("\n")) {
  throw new Error("entry text must be a single line");
}
// The judge docks quotation marks around the whole line, so refuse
// them (and any accidental leading/trailing space) outright.
if (TEXT !== TEXT.trim() || TEXT.startsWith('"') || TEXT.endsWith('"')) {
  throw new Error("entry text must not be wrapped in quotes or spaces");
}

mkdirSync(outDir, { recursive: true });
// No trailing newline: the file holds exactly the text, keeping its
// byte size minimal (the leaderboard tie-break favours smaller texts).
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");

// Report for the operator; the entry itself is the file above.
console.log(`wrote ${outDir}/entry.txt (${codePoints} code points)`);
console.log(TEXT);
