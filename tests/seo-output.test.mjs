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

function sitemapLastmodByPath(xml) {
  const entries = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)];
  return new Map(entries.map((match) => {
    const loc = match[0].match(/<loc>(.*?)<\/loc>/)?.[1] ?? "";
    const lastmod = match[0].match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? "";
    return [normalizePath(new URL(loc).pathname), lastmod];
  }));
}

function sitemapBlock(xml, pathname) {
  const loc = `<loc>https://tachi-suke.example.com${pathname}</loc>`;
  const block = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)]
    .map((match) => match[0])
    .find((entry) => entry.includes(loc));
  assert.ok(block, `sitemap should include ${pathname}`);
  return block;
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
    const redirects = readDist("_redirects");
    const feed = readDist("feed.xml");
    const englishFeed = readDist("en/feed.xml");
    const llms = readDist("llms.txt");
    const security = readDist(".well-known/security.txt");
    const opensearch = readDist("opensearch.xml");

    assert.match(sitemap, /<urlset/);
    assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/, "sitemap should declare XHTML alternates");
    assert.match(robots, /Sitemap:\s*https:\/\/tachi-suke\.example\.com\/sitemap\.xml/);
    assert.match(llms, /# TachiSuke/);
    assert.match(llms, /multilingual Japan life decision assistant/i);
    assert.match(llms, /https:\/\/tachi-suke\.example\.com\/sitemap\.xml/);
    assert.match(llms, /https:\/\/tachi-suke\.example\.com\/feed\.xml/);
    assert.match(llms, /https:\/\/tachi-suke\.example\.com\/en\/site-map/);
    assert.match(llms, /https:\/\/tachi-suke\.example\.com\/zh-tw\/site-map/);
    assert.match(llms, /https:\/\/tachi-suke\.example\.com\/en\/search-index\.json/);
    assert.match(llms, /Do not treat account placeholder pages as public content/i);
    assert.match(security, /^Contact:\s*https:\/\/tachi-suke\.example\.com\/en\/contact/m);
    assert.match(security, /^Canonical:\s*https:\/\/tachi-suke\.example\.com\/\.well-known\/security\.txt/m);
    assert.match(security, /^Preferred-Languages:\s*en,\s*zh-tw,\s*ja,\s*ko/m);
    assert.match(security, /^Expires:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z/m);
    assert.match(opensearch, /<OpenSearchDescription[^>]+xmlns="http:\/\/a9\.com\/-\/spec\/opensearch\/1\.1\/">/);
    assert.match(opensearch, /<ShortName>TachiSuke<\/ShortName>/);
    assert.match(opensearch, /<Url type="text\/html" template="https:\/\/tachi-suke\.example\.com\/en\/search\?q=\{searchTerms\}" \/>/);
    assert.equal(manifest.name, "TachiSuke - Japan Life Assistant");
    assert.equal(manifest.short_name, "TachiSuke");
    assert.equal(manifest.start_url, "/");
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, "manifest should include icons");
    assert.match(headers, /X-Content-Type-Options:\s*nosniff/);
    assert.match(headers, /Content-Security-Policy:\s*default-src 'self'/, "_headers should define a baseline CSP");
    assert.match(headers, /script-src 'self' 'unsafe-inline'/, "CSP should allow current inline JSON-LD/search scripts");
    assert.match(headers, /form-action 'self' https:/, "CSP should allow provider-agnostic HTTPS form endpoints");
    assert.match(headers, /frame-ancestors 'none'/, "CSP should block framing");
    assert.match(headers, /object-src 'none'/, "CSP should block object embeds");
    assert.match(headers, /\/feed\.xml\s+Cache-Control:\s*public,\s*max-age=3600/m, "_headers should cache the global RSS feed conservatively");
    assert.match(headers, /\/en\/feed\.xml\s+Cache-Control:\s*public,\s*max-age=3600/m, "_headers should cache locale RSS feeds conservatively");
    assert.match(headers, /\/llms\.txt\s+Cache-Control:\s*public,\s*max-age=3600/m, "_headers should cache llms.txt conservatively");
    assert.match(headers, /\/\.well-known\/security\.txt\s+Cache-Control:\s*public,\s*max-age=3600/m, "_headers should cache security.txt conservatively");
    assert.match(headers, /\/opensearch\.xml\s+Cache-Control:\s*public,\s*max-age=3600/m, "_headers should cache OpenSearch discovery conservatively");
    assert.match(headers, /\/en\/search-index\.json\s+Cache-Control:\s*public,\s*max-age=3600/m, "_headers should cache locale search indexes conservatively");
    assert.match(redirects, /^\/articles\s+\/en\/articles\s+302/m, "Cloudflare redirects should include locale-less article fallback");
    assert.match(redirects, /^\/mobile\/\*\s+\/en\/mobile\/:splat\s+302/m, "Cloudflare redirects should preserve mobile slugs");
    assert.match(redirects, /^\/security\.txt\s+\/\.well-known\/security\.txt\s+302/m, "Cloudflare redirects should include legacy security.txt fallback");
    assert.doesNotMatch(redirects, /\/account/, "Cloudflare redirects should not add account placeholder fallbacks");
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
      "/zh-tw/site-map",
      "/en/site-map",
      "/ja/site-map",
      "/ko/site-map",
      "/zh-tw/articles/taiwanese-newcomer-mobile-plan-japan",
      "/zh-tw/articles/japan-commuter-pass-ic-card-guide",
      "/zh-tw/articles/residence-card-resident-record-my-number",
      "/zh-tw/articles/apartment-viewing-japanese-phrases-zh-tw",
      "/zh-tw/articles/ward-office-moving-in-procedures-zh-tw",
      "/zh-tw/articles/japan-apartment-moving-out-checklist-zh-tw",
      "/zh-tw/articles/japan-garbage-sorting-oversized-trash-zh-tw",
      "/zh-tw/articles/japan-family-restaurants-dennys-gusto-royal-host",
      "/zh-tw/articles/japan-convenience-store-supermarket-drugstore-guide-zh-tw",
      "/en/articles/japan-renting-initial-costs-en",
      "/en/articles/choose-mobile-plan-japan-foreigner",
      "/en/articles/apartment-viewing-japanese-phrases-en",
      "/en/articles/ward-office-moving-in-procedures-en",
      "/en/articles/japan-apartment-moving-out-checklist-en",
      "/en/articles/japan-garbage-sorting-oversized-trash-en",
      "/en/articles/japan-family-restaurants-dennys-gusto-royal-host-en",
      "/en/articles/japan-convenience-store-supermarket-drugstore-guide-en",
      "/en/articles/japan-commuter-pass-ic-card-guide-en",
      "/en/articles/residence-card-resident-record-my-number-en",
      "/ja/articles/japan-commuter-pass-ic-card-guide-ja",
      "/ja/articles/japan-renting-initial-costs-ja",
      "/ja/articles/apartment-viewing-japanese-phrases-ja",
      "/ja/articles/ward-office-moving-in-procedures-ja",
      "/ja/articles/japan-apartment-moving-out-checklist-ja",
      "/ja/articles/japan-garbage-sorting-oversized-trash-ja",
      "/ja/articles/japan-family-restaurants-dennys-gusto-royal-host-ja",
      "/ja/articles/japan-convenience-store-supermarket-drugstore-guide-ja",
      "/ja/articles/residence-card-resident-record-my-number-ja",
      "/ja/articles/foreign-resident-mobile-plan-basics-japan",
      "/ko/articles/japan-commuter-pass-ic-card-guide-ko",
      "/ko/articles/japan-renting-initial-costs-ko",
      "/ko/articles/apartment-viewing-japanese-phrases-ko",
      "/ko/articles/ward-office-moving-in-procedures-ko",
      "/ko/articles/japan-apartment-moving-out-checklist-ko",
      "/ko/articles/japan-garbage-sorting-oversized-trash-ko",
      "/ko/articles/japan-family-restaurants-dennys-gusto-royal-host-ko",
      "/ko/articles/japan-convenience-store-supermarket-drugstore-guide-ko",
      "/ko/articles/residence-card-resident-record-my-number-ko",
      "/ko/articles/foreigner-mobile-plan-basics-japan",
      "/en/articles/category/mobile",
      "/en/articles/category/transportation",
      "/en/articles/category/procedures",
      "/zh-tw/articles/category/transportation",
      "/zh-tw/articles/category/procedures",
      "/zh-tw/articles/category/housing",
      "/zh-tw/mobile/povo2",
      "/en/mobile/ahamo",
      "/ja/areas/ikebukuro",
      "/ko/places/dennys",
      "/en/tools/moving-to-japan-checklist",
      "/zh-tw/tools/moving-to-japan-checklist",
      "/en/tools/japan-rent-initial-cost-checklist",
      "/en/tools/ward-office-moving-in-checklist",
      "/zh-tw/tools/ward-office-moving-in-checklist",
      "/en/tools/commuter-pass-ic-card-checklist",
      "/en/tools/apartment-viewing-japanese-phrases",
      "/en/tools/moving-out-checklist",
      "/zh-tw/tools/commuter-pass-ic-card-checklist",
      "/zh-tw/tools/moving-out-checklist",
      "/ja/tools/apartment-viewing-japanese-phrases",
      "/zh-tw/submit-place/thanks",
      "/en/contact",
      "/ja/contact/thanks",
      "/feed.xml",
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

  it("adds conservative hreflang alternates to shared sitemap entries", () => {
    const sitemap = readDist("sitemap.xml");
    const mobile = sitemapBlock(sitemap, "/en/mobile/povo2");
    for (const [hreflang, href] of [
      ["zh-Hant-TW", "https://tachi-suke.example.com/zh-tw/mobile/povo2"],
      ["en", "https://tachi-suke.example.com/en/mobile/povo2"],
      ["ja", "https://tachi-suke.example.com/ja/mobile/povo2"],
      ["ko", "https://tachi-suke.example.com/ko/mobile/povo2"],
      ["x-default", "https://tachi-suke.example.com/en/mobile/povo2"]
    ]) {
      assert.match(mobile, new RegExp(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href.replaceAll("/", "\\/")}" \\/>`));
    }

    const article = sitemapBlock(sitemap, "/en/articles/choose-mobile-plan-japan-foreigner");
    assert.match(article, /hreflang="zh-Hant-TW" href="https:\/\/tachi-suke\.example\.com\/zh-tw\/articles\/taiwanese-newcomer-mobile-plan-japan"/);
    assert.match(article, /hreflang="en" href="https:\/\/tachi-suke\.example\.com\/en\/articles\/choose-mobile-plan-japan-foreigner"/);
    assert.match(article, /hreflang="ja" href="https:\/\/tachi-suke\.example\.com\/ja\/articles\/foreign-resident-mobile-plan-basics-japan"/);
    assert.match(article, /hreflang="ko" href="https:\/\/tachi-suke\.example\.com\/ko\/articles\/foreigner-mobile-plan-basics-japan"/);
    assert.match(article, /hreflang="x-default" href="https:\/\/tachi-suke\.example\.com\/en\/articles\/choose-mobile-plan-japan-foreigner"/);
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
    const website = objects.find((object) => object["@type"] === "WebSite");
    assert.equal(website?.potentialAction?.["@type"], "SearchAction", "WebSite JSON-LD should expose site search");
    assert.equal(
      website?.potentialAction?.target,
      "https://tachi-suke.example.com/en/search?q={search_term_string}",
      "WebSite SearchAction should target the stable English search route"
    );
    assert.equal(website?.potentialAction?.["query-input"], "required name=search_term_string");
    assert.match(html, /<meta name="theme-color" content="#f5f8f7">/, "root page should include browser theme color");
    assert.match(html, /<meta name="application-name" content="TachiSuke">/, "root page should include application name metadata");
    assert.match(html, /<meta name="apple-mobile-web-app-title" content="TachiSuke">/, "root page should include Apple app title metadata");
    assert.match(html, /<meta name="format-detection" content="telephone=no">/, "root page should disable automatic phone formatting");
    assert.match(html, /<meta property="og:locale" content="en_US">/, "root page should include the current Open Graph locale");
    assert.match(html, /<meta property="og:locale:alternate" content="zh_TW">/, "root page should include zh-tw Open Graph alternate locale");
    assert.match(html, /<meta property="og:locale:alternate" content="ja_JP">/, "root page should include ja Open Graph alternate locale");
    assert.match(html, /<meta property="og:locale:alternate" content="ko_KR">/, "root page should include ko Open Graph alternate locale");
    assert.match(html, /rel="alternate"[^>]+type="application\/rss\+xml"[^>]+href="https:\/\/tachi-suke\.example\.com\/feed\.xml"/);
    assert.match(html, /rel="search"[^>]+type="application\/opensearchdescription\+xml"[^>]+href="https:\/\/tachi-suke\.example\.com\/opensearch\.xml"/);
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
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/zh-tw\/articles\/japan-commuter-pass-ic-card-guide<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/zh-tw\/articles\/residence-card-resident-record-my-number<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/choose-mobile-plan-japan-foreigner<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/japan-commuter-pass-ic-card-guide-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/residence-card-resident-record-my-number-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/apartment-viewing-japanese-phrases-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/ward-office-moving-in-procedures-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/japan-apartment-moving-out-checklist-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/japan-garbage-sorting-oversized-trash-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/japan-family-restaurants-dennys-gusto-royal-host-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/en\/articles\/japan-convenience-store-supermarket-drugstore-guide-en<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/ja\/articles\/japan-commuter-pass-ic-card-guide-ja<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/ja\/articles\/residence-card-resident-record-my-number-ja<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/ko\/articles\/japan-commuter-pass-ic-card-guide-ko<\/link>/);
    assert.match(feed, /<link>https:\/\/tachi-suke\.example\.com\/ko\/articles\/residence-card-resident-record-my-number-ko<\/link>/);
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

  it("adds content-aware lastmod values for RSS feeds in sitemap", () => {
    const lastmods = sitemapLastmodByPath(readDist("sitemap.xml"));
    for (const path of ["/feed.xml", "/en/feed.xml", "/zh-tw/feed.xml", "/ja/feed.xml", "/ko/feed.xml"]) {
      assert.match(lastmods.get(path) ?? "", /^\d{4}-\d{2}-\d{2}$/, `${path} should have an article-derived lastmod date`);
    }
  });

  it("adds content-aware lastmod values for public section and site map pages", () => {
    const lastmods = sitemapLastmodByPath(readDist("sitemap.xml"));
    for (const locale of ["zh-tw", "en", "ja", "ko"]) {
      assert.match(lastmods.get(`/${locale}`) ?? "", /^\d{4}-\d{2}-\d{2}$/, `/${locale} should have a content-derived lastmod date`);
      for (const section of ["articles", "areas", "places", "mobile", "tools", "site-map"]) {
        const path = `/${locale}/${section}`;
        assert.match(lastmods.get(path) ?? "", /^\d{4}-\d{2}-\d{2}$/, `${path} should have a content-derived lastmod date`);
      }
    }
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
    for (const toolPath of [
      "/en/tools/apartment-viewing-japanese-phrases",
      "/en/tools/commuter-pass-ic-card-checklist",
      "/en/tools/japan-rent-initial-cost-checklist",
      "/en/tools/moving-out-checklist",
      "/en/tools/moving-to-japan-checklist",
      "/en/tools/ward-office-moving-in-checklist"
    ]) {
      assert.ok(
        index.items.some((item) => item.type === "tool" && item.url === toolPath),
        `search index should include published tool ${toolPath}`
      );
    }
    assert.equal(index.items.some((item) => item.url.startsWith("/zh-tw/articles/")), false, "English search index should not include zh-tw article URLs");
    assert.equal(index.items.some((item) => item.url.includes("/account/")), false, "search index should not include account placeholders");
    assert.equal(index.items.some((item) => item.url === "/en/search"), false, "search index should not include search utility pages");
    assert.equal(index.items.some((item) => item.url === "/en/search-index.json"), false, "search index should not include search index endpoints");
    assert.equal(index.items.some((item) => item.url.startsWith("/en/submit-place")), false, "search index should not include submit-place form routes");
    assert.equal(index.items.some((item) => item.url.startsWith("/en/contact")), false, "search index should not include contact form routes");
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

    const transportation = readHtml("en/articles/category/transportation/index.html");
    assert.match(transportation, /Transportation guides \| TachiSuke/, "English transportation category should have a localized SEO title");
    assert.match(transportation, /href="\/en\/articles\/japan-commuter-pass-ic-card-guide-en"/, "transportation category should link to English commuter pass article");

    const procedures = readHtml("zh-tw/articles/category/procedures/index.html");
    assert.match(procedures, /行政手續文章 \| TachiSuke/, "zh-tw procedures category should have a localized SEO title");
    assert.match(procedures, /href="\/zh-tw\/articles\/residence-card-resident-record-my-number"/, "procedures category should link to zh-tw residence admin article");
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
    const html = readHtml("en/articles/choose-mobile-plan-japan-foreigner/index.html");
    const objects = jsonLdObjects(html);
    assert.ok(hasJsonLdType(objects, "Organization"), "article page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "article page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "Article"), "article page should include Article JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "article page should include BreadcrumbList JSON-LD");
    assert.match(html, /<meta property="article:published_time" content="2026-05-31T00:00:00\.000Z">/, "article detail should include published time Open Graph metadata");
    assert.match(html, /<meta property="article:modified_time" content="2026-05-31T00:00:00\.000Z">/, "article detail should include modified time Open Graph metadata");
    assert.match(html, /<meta property="article:section" content="mobile">/, "article detail should include section Open Graph metadata");
    assert.match(html, /<meta property="article:tag" content="mobile plans">/, "article detail should include tag Open Graph metadata");
  });

  it("renders conservative JSON-LD on article category landing pages", () => {
    const objects = jsonLdObjects(readHtml("en/articles/category/mobile/index.html"));
    assert.ok(hasJsonLdType(objects, "Organization"), "category page should include Organization JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebSite"), "category page should include WebSite JSON-LD");
    assert.ok(hasJsonLdType(objects, "WebPage"), "category page should include WebPage JSON-LD");
    assert.ok(hasJsonLdType(objects, "ItemList"), "category page should include ItemList JSON-LD");
    assert.ok(hasJsonLdType(objects, "BreadcrumbList"), "category page should include BreadcrumbList JSON-LD");

    const itemList = objects.find((object) => object["@type"] === "ItemList");
    assert.equal(itemList.numberOfItems, 2, "English mobile category ItemList should match visible article count");
    assert.ok(
      itemList.itemListElement.some((item) => item.url === "https://tachi-suke.example.com/en/articles/choose-mobile-plan-japan-foreigner"),
      "category ItemList should include article canonical URLs"
    );
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

    const wardOfficeTool = readHtml("en/tools/ward-office-moving-in-checklist/index.html");
    assert.match(wardOfficeTool, /Ward Office Moving-In Checklist/, "ward office tool should build a detail page");
    assert.match(wardOfficeTool, /Digital Agency/, "ward office tool should show official source labels");
    assert.match(wardOfficeTool, /digital\.go\.jp/, "ward office tool should link the Digital Agency source");
    assert.match(wardOfficeTool, /moj\.go\.jp/, "ward office tool should link the Immigration Services Agency source");

    const commuterTool = readHtml("en/tools/commuter-pass-ic-card-checklist/index.html");
    assert.match(commuterTool, /Commuter Pass and IC Card Checklist/, "commuter pass tool should build a detail page");
    assert.match(commuterTool, /Tokyo Metro/, "commuter pass tool should show official source labels");
    assert.match(commuterTool, /tokyometro\.jp/, "commuter pass tool should link the Tokyo Metro source");
    assert.match(commuterTool, /pasmo\.co\.jp/, "commuter pass tool should link the PASMO source");
  });
});
