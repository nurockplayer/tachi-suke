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
    const englishFeed = readDist("en/feed.xml");

    assert.match(sitemap, /<urlset/);
    assert.match(robots, /Sitemap:\s*https:\/\/tachi-suke\.example\.com\/sitemap\.xml/);
    assert.equal(manifest.name, "TachiSuke - Japan Life Assistant");
    assert.equal(manifest.short_name, "TachiSuke");
    assert.equal(manifest.start_url, "/");
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, "manifest should include icons");
    assert.match(headers, /X-Content-Type-Options:\s*nosniff/);
    assert.match(feed, /<rss[^>]+version="2\.0"/, "feed.xml should be an RSS 2.0 feed");
    assert.match(feed, /<title>TachiSuke - Japan Life Assistant<\/title>/);
    assert.match(englishFeed, /<rss[^>]+version="2\.0"/, "locale feed should be an RSS 2.0 feed");
    assert.match(englishFeed, /<atom:link href="https:\/\/tachi-suke\.example\.com\/en\/feed\.xml" rel="self" type="application\/rss\+xml" \/>/);
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
      "/en/articles/category/mobile",
      "/zh-tw/articles/category/housing",
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
      "/zh-tw/feed.xml",
      "/en/feed.xml",
      "/ja/feed.xml",
      "/ko/feed.xml",
      "/en/privacy",
      "/zh-tw/editorial-policy"
    ]) {
      assert.ok(paths.has(expectedPath), `sitemap should include ${expectedPath}`);
    }

    for (const excludedPath of [
      "/en/search",
      "/en/search-index.json",
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
    assert.match(html, /<meta name="theme-color" content="#f5f8f7">/, "root page should include browser theme color");
    assert.match(html, /<meta name="application-name" content="TachiSuke">/, "root page should include application name metadata");
    assert.match(html, /<meta name="apple-mobile-web-app-title" content="TachiSuke">/, "root page should include Apple app title metadata");
    assert.match(html, /<meta name="format-detection" content="telephone=no">/, "root page should disable automatic phone formatting");
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

  it("prefills contact corrections from public detail-page prompts", () => {
    const article = readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html");
    assert.match(
      article,
      /href="\/en\/contact\?relatedUrl=https%3A%2F%2Ftachi-suke\.example\.com%2Fen%2Farticles%2Fchoose-mobile-plan-japan-foreigner(?:%2F)?"/,
      "article correction prompt should carry the encoded canonical URL into contact"
    );

    const contact = readHtml("en/contact/index.html");
    assert.match(contact, /data-related-url-input/, "contact page should expose the related URL input hook");
    assert.match(contact, /new URLSearchParams\(window\.location\.search\)/, "contact page should include query prefill logic");
    assert.match(contact, /\.get\("relatedUrl"\)/, "contact page should read relatedUrl from the query string");
  });

  it("generates an RSS feed for public article detail pages", () => {
    const feed = readDist("feed.xml");
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/zh-tw\/articles\/taiwanese-newcomer-mobile-plan-japan<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/choose-mobile-plan-japan-foreigner<\/link>/);
    assert.doesNotMatch(feed, /draft/i, "feed should not expose draft article data");
  });

  it("generates locale-specific RSS feeds for same-locale public articles", () => {
    const englishFeed = readDist("en/feed.xml");
    assert.match(englishFeed, /<title>TachiSuke English Articles<\/title>/);
    assert.match(englishFeed, /<dc:language>en<\/dc:language>/);
    assert.match(englishFeed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/choose-mobile-plan-japan-foreigner<\/link>/);
    assert.doesNotMatch(englishFeed, /\/zh-tw\/articles\//, "English feed should not include zh-tw article URLs");
    assert.doesNotMatch(englishFeed, /\/ja\/articles\//, "English feed should not include ja article URLs");
    assert.doesNotMatch(englishFeed, /draft/i, "English feed should not expose draft article data");

    const zhTwFeed = readDist("zh-tw/feed.xml");
    assert.match(zhTwFeed, /<title>TachiSuke 繁體中文文章<\/title>/);
    assert.match(zhTwFeed, /<dc:language>zh-Hant-TW<\/dc:language>/);
    assert.match(zhTwFeed, /<link>https:\/\/tachi-suke\.example\.com\/zh-tw\/articles\/taiwanese-newcomer-mobile-plan-japan<\/link>/);
    assert.doesNotMatch(zhTwFeed, /\/en\/articles\//, "zh-tw feed should not include English article URLs");
  });

  it("generates noindex locale search pages and public search index JSON", () => {
    const html = readHtml("en/search/index.html");
    assert.match(html, /Search \| TachiSuke/, "search page should have an SEO title");
    assert.match(html, /name="robots" content="noindex, follow"/, "search page should be noindex but follow links");
    assert.match(html, /<form class="search-panel" role="search" method="get" action="\/en\/search" data-search-form>/, "search page should render a shareable GET form");
    assert.match(html, /data-search-input/, "search page should include the client-side search input");
    assert.match(html, /name="q"/, "search input should submit q query values");
    assert.match(html, /new URLSearchParams\(window\.location\.search\)/, "search script should read q from the URL");
    assert.match(html, /history\.replaceState/, "search script should sync q back to the URL");
    assert.match(html, /href="\/en\/articles\/choose-mobile-plan-japan-foreigner"/, "search page should render static article results");
    assert.doesNotMatch(html, /<h2><a href="\/en\/account\//, "search page should not render account placeholder results");

    const index = JSON.parse(readDist("en/search-index.json"));
    assert.equal(index.locale, "en");
    assert.ok(Array.isArray(index.items), "search index should include items");
    assert.ok(index.items.length >= 10, "English search index should include public content across collections");

    const types = new Set(index.items.map((item) => item.type));
    for (const type of ["article", "place", "mobile_plan", "area", "tool"]) {
      assert.ok(types.has(type), `search index should include ${type} entries`);
    }

    assert.ok(
      index.items.some((item) => item.url === "/en/articles/choose-mobile-plan-japan-foreigner"),
      "search index should include English public articles"
    );
    assert.ok(
      index.items.some((item) => item.url === "/en/places/dennys"),
      "search index should include published places"
    );
    assert.equal(index.items.some((item) => item.url.startsWith("/zh-tw/articles/")), false, "English search index should not include zh-tw article URLs");
    assert.equal(index.items.some((item) => item.url.includes("/account/")), false, "search index should not include account placeholders");
    assert.equal(JSON.stringify(index).toLowerCase().includes("draft"), false, "search index should not expose draft metadata");
  });

  it("generates article category landing pages for public same-locale articles", () => {
    const mobile = readHtml("en/articles/category/mobile/index.html");
    assert.match(mobile, /Mobile guides \| TachiSuke/, "English mobile category page should have an SEO title");
    assert.match(mobile, /href="\/en\/articles\/choose-mobile-plan-japan-foreigner"/, "mobile category should link to English mobile articles");
    assert.match(mobile, /href="\/en\/articles\/povo-linemo-rakuten-ahamo-comparison"/, "mobile category should include all matching English articles");
    assert.doesNotMatch(mobile, /<a href="\/zh-tw\/articles\/[^"]+">\s*<span class="article-meta"/, "English category page should not list zh-tw articles");
    assert.doesNotMatch(mobile, /draft/i, "category page should not expose draft article data");

    const housing = readHtml("zh-tw/articles/category/housing/index.html");
    assert.match(housing, /租屋文章 \| TachiSuke/, "zh-tw housing category should have a localized SEO title");
    assert.match(housing, /href="\/zh-tw\/articles\/japan-renting-initial-costs"/, "housing category should link to zh-tw housing article");
  });

  it("renders visible breadcrumbs on nested public pages", () => {
    const article = readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html");
    assert.match(article, /<nav class="breadcrumbs" aria-label="Breadcrumb">/, "article detail should render breadcrumb navigation");
    assert.match(article, /href="\/en\/articles"/, "article breadcrumb should link to article index");
    assert.match(article, /href="\/en\/articles\/category\/mobile"/, "article breadcrumb should link to category landing page");
    assert.match(article, /aria-current="page"[^>]*>How to Choose a Mobile Plan in Japan as a Foreigner/, "article breadcrumb should mark current page");

    const category = readHtml("en/articles/category/mobile/index.html");
    assert.match(category, /<nav class="breadcrumbs" aria-label="Breadcrumb">/, "category page should render breadcrumb navigation");
    assert.match(category, /href="\/en\/articles"/, "category breadcrumb should link to article index");
    assert.match(category, /aria-current="page"[^>]*>Mobile guides/, "category breadcrumb should mark current page");

    for (const [path, parentPath, currentText] of [
      ["en/places/dennys/index.html", "/en/places", "Denny"],
      ["en/mobile/povo2/index.html", "/en/mobile", "povo"],
      ["en/areas/ikebukuro/index.html", "/en/areas", "Ikebukuro"],
      ["en/tools/moving-to-japan-checklist/index.html", "/en/tools", "Moving to Japan Checklist"]
    ]) {
      const html = readHtml(path);
      assert.match(html, /<nav class="breadcrumbs" aria-label="Breadcrumb">/, `${path} should render breadcrumb navigation`);
      assert.match(html, new RegExp(`href="${parentPath}"`), `${path} should link to its parent index`);
      assert.match(html, new RegExp(`aria-current="page"[^>]*>${currentText}`), `${path} should mark current page`);
    }
  });

  it("renders article table of contents links to generated heading anchors", () => {
    const html = readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html");
    assert.match(html, /<nav class="article-toc" aria-labelledby="article-toc-title">/, "article detail should render a table of contents");
    assert.match(html, /href="#start-with-your-constraints"/, "TOC should link to the first generated h2 anchor");
    assert.match(html, /href="#what-to-compare"/, "TOC should link to another generated heading anchor");
    assert.match(html, /id="start-with-your-constraints"/, "target heading anchor should exist in article body");
    assert.match(html, /id="what-to-compare"/, "second target heading anchor should exist in article body");
  });

  it("renders article and breadcrumb JSON-LD on article detail pages", () => {
    const objects = jsonLdObjects(readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "article page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "article page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "Article"), "article page should include Article JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "article page should include BreadcrumbList JSON-LD");
  });

  it("renders conservative JSON-LD on article category landing pages", () => {
    const objects = jsonLdObjects(readHtml("en/articles/category/mobile/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "category page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "category page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebPage"), "category page should include WebPage JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "category page should include BreadcrumbList JSON-LD");
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
