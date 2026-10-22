import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = new URL("../pages-dist/", import.meta.url);

async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesAt(file) : [file];
  }));
  return nested.flat();
}

test("GitHub Pages build publishes projects without private resumes", async () => {
  const files = await filesAt(root.pathname);
  const names = files.map((file) => path.relative(root.pathname, file));
  assert.ok(names.includes("index.html"));
  assert.ok(names.includes("og.svg"));
  assert.ok(names.includes("robots.txt"));
  assert.ok(names.includes("sitemap.xml"));
  assert.ok(names.every((name) => !/\.pdf$/i.test(name)), "PDF in published output");

  const textFiles = files.filter((file) => /\.(html|js|css|svg|txt|xml)$/i.test(file));
  const text = (await Promise.all(textFiles.map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(text, /clara-fulltime|clara-fractional|曹丹|(?:\+?86[-\s]?)?1[3-9]\d{9}/i);
  assert.match(text, /dcao1255@gmail\.com/);
  assert.match(text, /MBA Learning OS|MBA-Learning-OS/);
  assert.match(text, /English Study Hub|english-study-hub/);
  assert.doesNotMatch(text, /Mulebuy|Fotor|Piclumen|AliExpress|Fudan-MIT/i);
  assert.match(text, /From AI Products/);
});
