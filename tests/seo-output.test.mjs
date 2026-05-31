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

function readHtml(relativePath) {
  return readDist(relativePath);
}

function jsonLdObjects(html) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return scripts.flatMap((match) => {
    const parsed = JSON.parse(match[1]);
    return Array.isArray(parsed) ? parsed : [parsed];
  });
}

function hasJsonLdType(objects, type) {
  return objects.some((object) => object["@type"] === type || (Array.isArray(object["@type"]) && object["@type"].includes(type)));
}

describe("static SEO output", () => {
  it("generates sitemap, robots, manifest, and Cloudflare headers", () => {
    const sitemap = readDist("sitemap.xml");
    const robots = readDist("robots.txt");
    const manifest = JSON.parse(readDist("site.webmanifest"));
    const headers = readDist("_headers");
    const feed = readDist("feed.xml");

    assert.match(sitemap, /<urlset/);
    assert.match(robots, /Sitemap:\s*https:\/\/tachi-suke\.example\.com\/sitemap\.xml/);
    assert.equal(manifest.name, "TachiSuke - Japan Life Assistant");
    assert.equal(manifest.short_name, "TachiSuke");
    assert.equal(manifest.start_url, "/");
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, "manifest should include icons");
    assert.match(headers, /X-Content-Type-Options:\s*nosniff/);
    assert.match(feed, /<rss[^>]+version="2\.0"/, "feed.xml should be an RSS 2.0 feed");
    assert.match(feed, /<title>TachiSuke - Japan Life Assistant<\/title>/);
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
      "/en/tools/moving-to-japan-checklist",
      "/zh-tw/tools/moving-to-japan-checklist",
      "/en/tools/japan-rent-initial-cost-checklist",
      "/zh-tw/submit-place/thanks",
      "/en/contact",
      "/ja/contact/thanks",
      "/en/privacy",
      "/zh-tw/editorial-policy"
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

  it("renders a custom noindex 404 recovery page outside the sitemap", () => {
    const html = readHtml("404.html");
    assert.match(html, /Page not found \| TachiSuke/, "404 page should have a branded SEO title");
    assert.match(html, /name="robots" content="noindex, nofollow"/, "404 page should be noindex");
    assert.match(html, /href="\/zh-tw\/"/, "404 page should link to zh-tw home");
    assert.match(html, /href="\/en\/"/, "404 page should link to English home");

    const paths = new Set(sitemapPaths(readDist("sitemap.xml")));
    assert.equal(paths.has("/404"), false, "sitemap should not include /404");
    assert.equal(paths.has("/404.html"), false, "sitemap should not include /404.html");
  });

  it("renders site-wide JSON-LD on the root page", () => {
    const html = readHtml("index.html");
    const objects = jsonLdObjects(html);
    assert.ok(hasJsonLdType(objects, "Organization"), "root page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "root page should include WebSite JSON-LD");
    assert.match(html, /rel="alternate"[^>]+type="application\/rss\+xml"[^>]+href="https:\/\/tachi-suke\.example\.com\/feed\.xml"/);
  });

  it("renders launch trust pages as public static HTML", () => {
    const privacy = readHtml("en/privacy/index.html");
    assert.match(privacy, /Privacy \| TachiSuke/, "privacy page should have an SEO title");
    assert.match(privacy, /external form endpoint/i, "privacy page should mention external form endpoint behavior");

    const editorialPolicy = readHtml("zh-tw/editorial-policy/index.html");
    assert.match(editorialPolicy, /編輯政策 \| TachiSuke/, "editorial policy page should have an SEO title");
    assert.match(editorialPolicy, /不會直接公開/, "editorial policy should explain moderation");

    const contact = readHtml("en/contact/index.html");
    assert.match(contact, /Contact and Corrections \| TachiSuke/, "contact page should have an SEO title");
    assert.match(contact, /PUBLIC_CONTACT_FORM_ENDPOINT|preview mode|external form endpoint/i, "contact page should explain static endpoint behavior");

    const thanks = readHtml("zh-tw/contact/thanks/index.html");
    assert.match(thanks, /謝謝你的回報 \| TachiSuke/, "contact thanks page should have an SEO title");
    assert.match(thanks, /不會公開你的 Email/, "contact thanks page should explain private email handling");
  });

  it("generates an RSS feed for public article detail pages", () => {
    const feed = readDist("feed.xml");
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/zh-tw\/articles\/taiwanese-newcomer-mobile-plan-japan<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/choose-mobile-plan-japan-foreigner<\/link>/);
    assert.doesNotMatch(feed, /draft/i, "feed should not expose draft article data");
  });

  it("renders article and breadcrumb JSON-LD on article detail pages", () => {
    const objects = jsonLdObjects(readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "article page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "article page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "Article"), "article page should include Article JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "article page should include BreadcrumbList JSON-LD");
  });

  it("renders same-locale related article links on article detail pages", () => {
    const html = readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html");
    assert.match(html, /class="related-articles"/, "article page should include a related articles section");
    assert.match(
      html,
      /href="\/en\/articles\/povo-linemo-rakuten-ahamo-comparison"/,
      "article page should link to another English article"
    );
  });

  it("renders local business and breadcrumb JSON-LD on place detail pages", () => {
    const objects = jsonLdObjects(readHtml("en/places/dennys/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "place page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "place page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "LocalBusiness"), "place page should include LocalBusiness JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "place page should include BreadcrumbList JSON-LD");
  });

  it("renders conservative structured data on mobile plan detail pages", () => {
    const objects = jsonLdObjects(readHtml("en/mobile/povo2/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "mobile plan page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "mobile plan page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "Service"), "mobile plan page should include Service JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "mobile plan page should include BreadcrumbList JSON-LD");
  });

  it("renders conservative structured data on area detail pages", () => {
    const objects = jsonLdObjects(readHtml("en/areas/ikebukuro/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "area page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "area page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebPage"), "area page should include WebPage JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "area page should include BreadcrumbList JSON-LD");
  });

  it("renders conservative structured data on tool detail pages", () => {
    const objects = jsonLdObjects(readHtml("en/tools/moving-to-japan-checklist/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "tool page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "tool page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebPage"), "tool page should include WebPage JSON-LD");
    assert.ok(hasJsonLdType(objects, "ItemList"), "tool page should include ItemList JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "tool page should include BreadcrumbList JSON-LD");

    const rentTool = readHtml("en/tools/japan-rent-initial-cost-checklist/index.html");
    assert.match(rentTool, /Japan Rent Initial Cost Checklist/, "rent initial cost tool should build a detail page");
    assert.match(rentTool, /key money/i, "rent initial cost tool should include practical renting cost content");
  });
});
