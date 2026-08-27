import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders Clara's two-path career site without public phone details", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Clara/);
  assert.match(html, /我在招聘运营负责人/);
  assert.match(html, /我在寻找 AI 产品合伙人/);
  assert.match(html, /dcao1255@gmail\.com/);
  assert.doesNotMatch(html, /18800315277/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps the public assets and removes the disposable starter", async () => {
  await Promise.all([
    access(new URL("../public/avatar.png", import.meta.url)),
    access(new URL("../public/clara-fulltime-resume.pdf", import.meta.url)),
    access(new URL("../public/clara-fractional-coo.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  const resumeSite = await readFile(new URL("../app/ResumeSite.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(resumeSite, /持续更新的职业资料库/);
  assert.match(resumeSite, /证书与资质/);
  assert.match(resumeSite, /作品集与方法论/);
});
