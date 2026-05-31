import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

function readDist(relativePath) {
  const fullPath = join(dist, relativePath);
  assert.equal(existsSync(fullPath), true, `dist/${relativePath} should exist. Run pnpm build before pnpm check:seo.`);
  return readFileSync(fullPath, "utf8");
}

function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizePath(new URL(match[1]).pathname));
}

describe("static SEO output", () => {
  it("generates sitemap, robots, manifest, and Cloudflare headers", () => {
    const sitemap = readDist("sitemap.xml");
    const robots = readDist("robots.txt");
    const manifest = JSON.parse(readDist("site.webmanifest"));
    const headers = readDist("_headers");

    assert.match(sitemap, /<urlset/);
    assert.match(robots, /Sitemap:\s*https:\/\/tachi-suke\.example\.com\/sitemap\.xml/);
    assert.equal(manifest.name, "TachiSuke - Japan Life Assistant");
    assert.equal(manifest.short_name, "TachiSuke");
    assert.equal(manifest.start_url, "/");
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, "manifest should include icons");
    assert.match(headers, /X-Content-Type-Options:\s*nosniff/);
  });

  it("includes public multilingual content and excludes account placeholders in sitemap", () => {
    const paths = new Set(sitemapPaths(readDist("sitemap.xml")));

    for (const expectedPath of [
      "/",
      "/zh-tw",
      "/en",
      "/ja",
      "/ko",
      "/zh-tw/articles/taiwanese-newcomer-mobile-plan-japan",
      "/en/articles/choose-mobile-plan-japan-foreigner",
      "/ja/articles/foreign-resident-mobile-plan-basics-japan",
      "/ko/articles/foreigner-mobile-plan-basics-japan",
      "/zh-tw/mobile/povo2",
      "/en/mobile/ahamo",
      "/ja/areas/ikebukuro",
      "/ko/places/dennys",
      "/zh-tw/submit-place/thanks"
    ]) {
      assert.ok(paths.has(expectedPath), `sitemap should include ${expectedPath}`);
    }

    for (const excludedPath of [
      "/zh-tw/account/login",
      "/en/account/favorites",
      "/ja/account/submissions",
      "/ko/account/login"
    ]) {
      assert.equal(paths.has(excludedPath), false, `sitemap should not include ${excludedPath}`);
    }
  });

  it("keeps robots directives aligned with placeholder account routes", () => {
    const robots = readDist("robots.txt");
    for (const locale of ["zh-tw", "en", "ja", "ko"]) {
      assert.match(robots, new RegExp(`Disallow:\\s*/${locale}/account/`), `robots should disallow /${locale}/account/`);
    }
  });
});
