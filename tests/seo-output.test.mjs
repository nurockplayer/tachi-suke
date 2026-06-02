import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const contentRoot = join(root, "src/content");
const locales = ["zh-tw", "en", "ja", "ko"];
const htmlLangByLocale = {
  "zh-tw": "zh-Hant-TW",
  en: "en",
  ja: "ja",
  ko: "ko"
};
const searchEntryTypes = ["article", "place", "mobile_plan", "area", "tool"];
const fallbackSiteUrl = "https://tachi-suke.example.com";
const configuredSiteUrl = (process.env.SITE_URL ?? "").trim().replace(/\/$/, "");
const oneHourDiscoveryCachePaths = [
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/.well-known/security.txt",
  "/opensearch.xml",
  "/site.webmanifest",
  "/feed.xml",
  ...locales.map((locale) => `/${locale}/feed.xml`),
  ...locales.map((locale) => `/${locale}/search-index.json`)
];

function originFromUrl(value) {
  return new URL(value).origin.replace(/\/$/, "");
}

function inferSiteUrlFromBuildOutput() {
  const sitemapPath = join(dist, "sitemap.xml");
  if (existsSync(sitemapPath)) {
    const sitemap = readFileSync(sitemapPath, "utf8");
    const firstSitemapUrl = sitemap.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (firstSitemapUrl) return originFromUrl(firstSitemapUrl);
  }

  const robotsPath = join(dist, "robots.txt");
  if (existsSync(robotsPath)) {
    const robots = readFileSync(robotsPath, "utf8");
    const sitemapUrl = robots.match(/^Sitemap:\s*(\S+)/m)?.[1];
    if (sitemapUrl) return originFromUrl(sitemapUrl);
  }

  return fallbackSiteUrl;
}

const expectedSiteUrl = configuredSiteUrl || inferSiteUrlFromBuildOutput();

function readDist(relativePath) {
  const fullPath = join(dist, relativePath);
  assert.equal(existsSync(fullPath), true, `dist/${relativePath} should exist. Run pnpm build before pnpm check:seo.`);
  return readFileSync(fullPath, "utf8");
}

function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

function absoluteUrl(pathname) {
  return `${expectedSiteUrl}${pathname}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function urlRegExp(pathname) {
  return new RegExp(escapeRegExp(absoluteUrl(pathname)));
}

function urlPrefixRegExp(pathname) {
  return new RegExp(`^${escapeRegExp(absoluteUrl(pathname))}`);
}

function headerBlock(headers, pathname) {
  return headers
    .split(/\n(?=\/)/)
    .find((block) => block.startsWith(`${pathname}\n`));
}

function assertCacheHeaderRule(headers, pathname, expectedValue) {
  const block = headerBlock(headers, pathname);
  assert.ok(block, `_headers should include a rule for ${pathname}`);

  const cacheHeaderValues = [...block.matchAll(/^  Cache-Control:\s*(.*?)$/gm)].map((match) => match[1]);
  assert.deepEqual(cacheHeaderValues, [expectedValue], `_headers should define exactly one Cache-Control rule for ${pathname}`);
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
  const loc = `<loc>${absoluteUrl(pathname)}</loc>`;
  const block = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)]
    .map((match) => match[0])
    .find((entry) => entry.includes(loc));
  assert.ok(block, `sitemap should include ${pathname}`);
  return block;
}

function readHtml(relativePath) {
  return readDist(relativePath);
}

function assertFeedLink(feed, pathname) {
  assert.match(feed, new RegExp(`<link>${escapeRegExp(absoluteUrl(pathname))}<\\/link>`));
}

function listFiles(dir, extensions) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listFiles(fullPath, extensions);
    }

    return extensions.some((extension) => entry.name.endsWith(extension)) ? [fullPath] : [];
  });
}

function readJson(fullPath) {
  return JSON.parse(readFileSync(fullPath, "utf8"));
}

function readFrontmatter(fullPath) {
  const file = readFileSync(fullPath, "utf8");
  const match = file.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${fullPath} should include frontmatter`);

  const data = {};
  for (const line of match[1].split("\n")) {
    const property = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!property) continue;

    const [, key, rawValue] = property;
    data[key] = rawValue.replace(/^"|"$/g, "");
  }

  return data;
}

function isDraft(data) {
  return data.draft === true || data.draft === "true";
}

function expectedSearchUrlsByType(locale) {
  const urls = Object.fromEntries(searchEntryTypes.map((type) => [type, new Set()]));

  for (const article of listFiles(join(contentRoot, "articles"), [".md", ".mdx"]).map(readFrontmatter)) {
    if (article.locale === locale && !isDraft(article)) {
      urls.article.add(`/${locale}/articles/${article.slug}`);
    }
  }

  for (const place of listFiles(join(contentRoot, "places"), [".json"]).map(readJson)) {
    if (place.status === "published") {
      urls.place.add(`/${locale}/places/${place.slug}`);
    }
  }

  for (const mobilePlan of listFiles(join(contentRoot, "mobile-plans"), [".json"]).map(readJson)) {
    urls.mobile_plan.add(`/${locale}/mobile/${mobilePlan.slug}`);
  }

  for (const area of listFiles(join(contentRoot, "areas"), [".json"]).map(readJson)) {
    urls.area.add(`/${locale}/areas/${area.slug}`);
  }

  for (const tool of listFiles(join(contentRoot, "tools"), [".json"]).map(readJson)) {
    if (tool.status === "published") {
      urls.tool.add(`/${locale}/tools/${tool.slug}`);
    }
  }

  return urls;
}

function slugifyArticleCategory(category) {
  return category
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function expectedPublicSitemapPaths() {
  const paths = new Set(["/", "/feed.xml"]);
  const localeIndexPaths = [
    "",
    "/articles",
    "/areas",
    "/places",
    "/mobile",
    "/tools",
    "/submit-place",
    "/submit-place/thanks",
    "/contact",
    "/contact/thanks",
    "/about",
    "/privacy",
    "/editorial-policy",
    "/site-map"
  ];

  for (const locale of locales) {
    paths.add(`/${locale}/feed.xml`);
    for (const indexPath of localeIndexPaths) {
      paths.add(normalizePath(`/${locale}${indexPath}/`));
    }
  }

  for (const article of listFiles(join(contentRoot, "articles"), [".md", ".mdx"]).map(readFrontmatter)) {
    if (isDraft(article)) continue;
    paths.add(`/${article.locale}/articles/${article.slug}`);
    paths.add(`/${article.locale}/articles/category/${slugifyArticleCategory(article.category)}`);
  }

  for (const area of listFiles(join(contentRoot, "areas"), [".json"]).map(readJson)) {
    for (const locale of locales) {
      paths.add(`/${locale}/areas/${area.slug}`);
    }
  }

  for (const mobilePlan of listFiles(join(contentRoot, "mobile-plans"), [".json"]).map(readJson)) {
    for (const locale of locales) {
      paths.add(`/${locale}/mobile/${mobilePlan.slug}`);
    }
  }

  for (const place of listFiles(join(contentRoot, "places"), [".json"]).map(readJson)) {
    if (place.status !== "published") continue;
    for (const locale of locales) {
      paths.add(`/${locale}/places/${place.slug}`);
    }
  }

  for (const tool of listFiles(join(contentRoot, "tools"), [".json"]).map(readJson)) {
    if (tool.status !== "published") continue;
    for (const locale of locales) {
      paths.add(`/${locale}/tools/${tool.slug}`);
    }
  }

  return paths;
}

function sectionIndexJsonLdCases(expectedSectionCounts) {
  return locales.flatMap((locale) => [
    {
      label: `${locale} mobile`,
      relativePath: `${locale}/mobile/index.html`,
      expectedCount: expectedSectionCounts.mobile,
      expectedUrlPattern: urlPrefixRegExp(`/${locale}/mobile/`),
      expectedLanguage: htmlLangByLocale[locale],
      expectedCanonicalUrl: absoluteUrl(`/${locale}/mobile/`),
      expectedHomeUrl: absoluteUrl(`/${locale}/`)
    },
    {
      label: `${locale} areas`,
      relativePath: `${locale}/areas/index.html`,
      expectedCount: expectedSectionCounts.areas,
      expectedUrlPattern: urlPrefixRegExp(`/${locale}/areas/`),
      expectedLanguage: htmlLangByLocale[locale],
      expectedCanonicalUrl: absoluteUrl(`/${locale}/areas/`),
      expectedHomeUrl: absoluteUrl(`/${locale}/`)
    },
    {
      label: `${locale} places`,
      relativePath: `${locale}/places/index.html`,
      expectedCount: expectedSectionCounts.places,
      expectedUrlPattern: urlPrefixRegExp(`/${locale}/places/`),
      expectedLanguage: htmlLangByLocale[locale],
      expectedCanonicalUrl: absoluteUrl(`/${locale}/places/`),
      expectedHomeUrl: absoluteUrl(`/${locale}/`)
    },
    {
      label: `${locale} tools`,
      relativePath: `${locale}/tools/index.html`,
      expectedCount: expectedSectionCounts.tools,
      expectedUrlPattern: urlPrefixRegExp(`/${locale}/tools/`),
      expectedLanguage: htmlLangByLocale[locale],
      expectedCanonicalUrl: absoluteUrl(`/${locale}/tools/`),
      expectedHomeUrl: absoluteUrl(`/${locale}/`)
    }
  ]);
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
  it("uses the built sitemap origin when SITE_URL is not provided", () => {
    if (process.env.SITE_URL) return;

    const firstSitemapUrl = readDist("sitemap.xml").match(/<loc>(.*?)<\/loc>/)?.[1];
    assert.ok(firstSitemapUrl, "sitemap.xml should include at least one <loc> entry");
    assert.equal(expectedSiteUrl, new URL(firstSitemapUrl).origin);
  });

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
    assert.match(robots, new RegExp(`Sitemap:\\s*${escapeRegExp(absoluteUrl("/sitemap.xml"))}`));
    assert.match(llms, /# TachiSuke/);
    assert.match(llms, /multilingual Japan life decision assistant/i);
    assert.match(llms, urlRegExp("/sitemap.xml"));
    assert.match(llms, urlRegExp("/feed.xml"));
    assert.match(llms, urlRegExp("/en/site-map"));
    assert.match(llms, urlRegExp("/zh-tw/site-map"));
    assert.match(llms, urlRegExp("/en/search-index.json"));
    assert.match(llms, /Do not treat account placeholder pages as public content/i);
    assert.match(security, new RegExp(`^Contact:\\s*${escapeRegExp(absoluteUrl("/en/contact"))}`, "m"));
    assert.match(security, new RegExp(`^Canonical:\\s*${escapeRegExp(absoluteUrl("/.well-known/security.txt"))}`, "m"));
    assert.match(security, /^Preferred-Languages:\s*en,\s*zh-tw,\s*ja,\s*ko/m);
    assert.match(security, /^Expires:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z/m);
    assert.match(opensearch, /<OpenSearchDescription[^>]+xmlns="http:\/\/a9\.com\/-\/spec\/opensearch\/1\.1\/">/);
    assert.match(opensearch, /<ShortName>TachiSuke<\/ShortName>/);
    assert.match(
      opensearch,
      new RegExp(`<Url type="text\\/html" template="${escapeRegExp(absoluteUrl("/en/search"))}\\?q=\\{searchTerms\\}" \\/>`)
    );
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
    for (const pathname of oneHourDiscoveryCachePaths) {
      assertCacheHeaderRule(headers, pathname, "public, max-age=3600");
    }
    assert.match(redirects, /^\/articles\s+\/en\/articles\s+302/m, "Cloudflare redirects should include locale-less article fallback");
    assert.match(redirects, /^\/mobile\/\*\s+\/en\/mobile\/:splat\s+302/m, "Cloudflare redirects should preserve mobile slugs");
    assert.match(redirects, /^\/security\.txt\s+\/\.well-known\/security\.txt\s+302/m, "Cloudflare redirects should include legacy security.txt fallback");
    assert.doesNotMatch(redirects, /\/account/, "Cloudflare redirects should not add account placeholder fallbacks");
    assert.match(feed, /<rss[^>]+version="2\.0"/, "feed.xml should be an RSS 2.0 feed");
    assert.match(feed, /<title>TachiSuke - Japan Life Assistant<\/title>/);
    assert.match(englishFeed, /<rss[^>]+version="2\.0"/, "locale feed should be an RSS 2.0 feed");
    assert.match(
      englishFeed,
      new RegExp(`<atom:link href="${escapeRegExp(absoluteUrl("/en/feed.xml"))}" rel="self" type="application\\/rss\\+xml" \\/>`)
    );
  });

  it("includes public multilingual content and excludes account placeholders in sitemap", () => {
    const paths = new Set(sitemapPaths(readDist("sitemap.xml")));
    const contentDrivenExpectedPaths = expectedPublicSitemapPaths();

    for (const expectedPath of contentDrivenExpectedPaths) {
      assert.ok(paths.has(expectedPath), `sitemap should include content-driven public path ${expectedPath}`);
    }

    for (const actualPath of paths) {
      assert.ok(contentDrivenExpectedPaths.has(actualPath), `sitemap should not include unexpected path ${actualPath}`);
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
      ["zh-Hant-TW", absoluteUrl("/zh-tw/mobile/povo2")],
      ["en", absoluteUrl("/en/mobile/povo2")],
      ["ja", absoluteUrl("/ja/mobile/povo2")],
      ["ko", absoluteUrl("/ko/mobile/povo2")],
      ["x-default", absoluteUrl("/en/mobile/povo2")]
    ]) {
      assert.match(mobile, new RegExp(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeRegExp(href)}" \\/>`));
    }

    const article = sitemapBlock(sitemap, "/en/articles/choose-mobile-plan-japan-foreigner");
    assert.match(article, new RegExp(`hreflang="zh-Hant-TW" href="${escapeRegExp(absoluteUrl("/zh-tw/articles/taiwanese-newcomer-mobile-plan-japan"))}"`));
    assert.match(article, new RegExp(`hreflang="en" href="${escapeRegExp(absoluteUrl("/en/articles/choose-mobile-plan-japan-foreigner"))}"`));
    assert.match(article, new RegExp(`hreflang="ja" href="${escapeRegExp(absoluteUrl("/ja/articles/foreign-resident-mobile-plan-basics-japan"))}"`));
    assert.match(article, new RegExp(`hreflang="ko" href="${escapeRegExp(absoluteUrl("/ko/articles/foreigner-mobile-plan-basics-japan"))}"`));
    assert.match(article, new RegExp(`hreflang="x-default" href="${escapeRegExp(absoluteUrl("/en/articles/choose-mobile-plan-japan-foreigner"))}"`));
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
    assert.match(html, /<h1>404<\/h1>/, "404 page hero should use a language-neutral heading");
    assert.match(html, /<strong>找不到頁面<\/strong>/, "404 page hero should include zh-tw copy");
    assert.match(html, /<strong>Page not found<\/strong>/, "404 page hero should include English copy");
    assert.match(html, /<strong>ページが見つかりません<\/strong>/, "404 page hero should include Japanese copy");
    assert.match(html, /<strong>페이지를 찾을 수 없습니다<\/strong>/, "404 page hero should include Korean copy");
    assert.match(html, /<h2>Language \/ 語言 \/ 言語 \/ 언어<\/h2>/, "404 page language selector heading should be multilingual");
    assert.match(html, /<strong>選擇語言<\/strong>/, "404 page language selector should include zh-tw guidance");
    assert.match(html, /<strong>언어 선택<\/strong>/, "404 page language selector should include Korean guidance");
    assert.match(html, /href="\/zh-tw\/"/, "404 page should link to zh-tw home");
    assert.match(html, /href="\/en\/"/, "404 page should link to English home");
    for (const locale of ["zh-tw", "en", "ja", "ko"]) {
      for (const section of ["articles", "mobile", "tools"]) {
        assert.match(html, new RegExp(`href="/${locale}/${section}/?"`), `404 page should link to /${locale}/${section}`);
      }
    }
    assert.match(html, /lang="zh-Hant-TW"/, "404 page should mark zh-tw recovery copy with language metadata");
    assert.match(html, /lang="ja"/, "404 page should mark Japanese recovery copy with language metadata");
    assert.match(html, /lang="ko"/, "404 page should mark Korean recovery copy with language metadata");

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
      absoluteUrl("/en/search?q={search_term_string}"),
      "WebSite SearchAction should target the stable English search route"
    );
    assert.equal(website?.potentialAction?.["query-input"], "required name=search_term_string");
    assert.match(html, /<meta name="theme-color" content="#f5f8f7" media="\(prefers-color-scheme: light\)">/, "root page should include light browser theme color");
    assert.match(html, /<meta name="theme-color" content="#101819" media="\(prefers-color-scheme: dark\)">/, "root page should include dark browser theme color");
    assert.match(html, /tachi-suke-theme/, "root page should initialize the persisted theme preference");
    assert.match(html, /data-theme-switcher/, "root page should render the theme switcher");
    assert.match(html, /data-theme-option="dark"/, "root page should offer a dark theme option");
    assert.match(html, /<meta name="application-name" content="TachiSuke">/, "root page should include application name metadata");
    assert.match(html, /<meta name="apple-mobile-web-app-title" content="TachiSuke">/, "root page should include Apple app title metadata");
    assert.match(html, /<meta name="format-detection" content="telephone=no">/, "root page should disable automatic phone formatting");
    assert.match(html, /<meta property="og:locale" content="en_US">/, "root page should include the current Open Graph locale");
    assert.match(html, /<meta property="og:locale:alternate" content="zh_TW">/, "root page should include zh-tw Open Graph alternate locale");
    assert.match(html, /<meta property="og:locale:alternate" content="ja_JP">/, "root page should include ja Open Graph alternate locale");
    assert.match(html, /<meta property="og:locale:alternate" content="ko_KR">/, "root page should include ko Open Graph alternate locale");
    assert.match(html, new RegExp(`rel="alternate"[^>]+type="application\\/rss\\+xml"[^>]+href="${escapeRegExp(absoluteUrl("/feed.xml"))}"`));
    assert.match(html, new RegExp(`rel="search"[^>]+type="application\\/opensearchdescription\\+xml"[^>]+href="${escapeRegExp(absoluteUrl("/opensearch.xml"))}"`));
  });

  it("renders localized homepage WebPage and ItemList JSON-LD", () => {
    for (const [locale, relativePath, language] of [
      ["zh-tw", "zh-tw/index.html", "zh-Hant-TW"],
      ["en", "en/index.html", "en"],
      ["ja", "ja/index.html", "ja"],
      ["ko", "ko/index.html", "ko"]
    ]) {
      const objects = jsonLdObjects(readHtml(relativePath));
      const webPage = objects.find((object) => object["@type"] === "WebPage");
      const itemList = objects.find((object) => object["@type"] === "ItemList");

      assert.ok(webPage, `${locale} homepage should include WebPage JSON-LD`);
      assert.equal(webPage?.inLanguage, language, `${locale} homepage WebPage should use the HTML language`);
      assert.equal(webPage?.url, absoluteUrl(`/${locale}/`), `${locale} homepage WebPage should use its canonical URL`);
      assert.equal(webPage?.isPartOf?.["@id"], absoluteUrl("/#website"));
      assert.equal(webPage?.publisher?.["@id"], absoluteUrl("/#organization"));

      assert.ok(itemList, `${locale} homepage should include ItemList JSON-LD`);
      assert.equal(itemList?.inLanguage, language, `${locale} homepage ItemList should use the HTML language`);
      assert.ok(Array.isArray(itemList?.itemListElement), `${locale} homepage ItemList should contain entries`);
      assert.ok(itemList.itemListElement.length >= 6, `${locale} homepage ItemList should describe the start-here links`);
      assert.equal(itemList.itemListElement[0]?.["@type"], "ListItem");
      assert.equal(itemList.itemListElement[0]?.position, 1);
      assert.match(
        itemList.itemListElement[0]?.url ?? "",
        new RegExp(`^${escapeRegExp(absoluteUrl(`/${locale}/`))}(articles|mobile|areas|places|submit-place|tools)`)
      );
    }
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

    for (const [label, relativePath, expectedLanguage, expectedUrl] of [
      ["about", "en/about/index.html", "en", absoluteUrl("/en/about/")],
      ["privacy", "en/privacy/index.html", "en", absoluteUrl("/en/privacy/")],
      ["editorial policy", "zh-tw/editorial-policy/index.html", "zh-Hant-TW", absoluteUrl("/zh-tw/editorial-policy/")],
      ["contact", "en/contact/index.html", "en", absoluteUrl("/en/contact/")],
      ["submit place", "en/submit-place/index.html", "en", absoluteUrl("/en/submit-place/")]
    ]) {
      const objects = jsonLdObjects(readHtml(relativePath));
      const webPage = objects.find((object) => object["@type"] === "WebPage");
      const breadcrumb = objects.find((object) => object["@type"] === "BreadcrumbList");

      assert.ok(webPage, `${label} page should include WebPage JSON-LD`);
      assert.equal(webPage?.url, expectedUrl, `${label} WebPage should use the canonical URL`);
      assert.equal(webPage?.inLanguage, expectedLanguage, `${label} WebPage should use the HTML language`);
      assert.equal(webPage?.isPartOf?.["@id"], absoluteUrl("/#website"));
      assert.equal(webPage?.publisher?.["@id"], absoluteUrl("/#organization"));

      assert.ok(breadcrumb, `${label} page should include BreadcrumbList JSON-LD`);
      assert.equal(breadcrumb?.itemListElement?.length, 2, `${label} breadcrumb should include home and current page`);
      assert.equal(breadcrumb?.itemListElement?.[0]?.item, absoluteUrl(`/${expectedUrl.includes("/zh-tw/") ? "zh-tw" : "en"}/`));
      assert.equal(breadcrumb?.itemListElement?.[1]?.item, expectedUrl);
    }
  });

  it("prefills contact corrections from public detail-page prompts", () => {
    for (const [label, distPath, publicPath, contactPath] of [
      ["article", "en/articles/choose-mobile-plan-japan-foreigner/index.html", "/en/articles/choose-mobile-plan-japan-foreigner", "/en/contact"],
      ["place", "en/places/dennys/index.html", "/en/places/dennys", "/en/contact"],
      ["mobile plan", "en/mobile/povo2/index.html", "/en/mobile/povo2", "/en/contact"],
      ["area", "en/areas/ikebukuro/index.html", "/en/areas/ikebukuro", "/en/contact"],
      ["tool", "en/tools/moving-to-japan-checklist/index.html", "/en/tools/moving-to-japan-checklist", "/en/contact"],
      ["localized article", "zh-tw/articles/newcomer-first-week-japan-setup/index.html", "/zh-tw/articles/newcomer-first-week-japan-setup", "/zh-tw/contact"]
    ]) {
      const html = readHtml(distPath);
      const encodedRelatedUrl = encodeURIComponent(absoluteUrl(publicPath));
      assert.match(
        html,
        new RegExp(`href="${escapeRegExp(`${contactPath}?relatedUrl=${encodedRelatedUrl}`)}(?:%2F)?"`),
        `${label} correction prompt should carry the encoded canonical URL into contact`
      );
    }

    const contact = readHtml("en/contact/index.html");
    assert.match(contact, /data-related-url-input/, "contact page should expose the related URL input hook");
    assert.match(contact, /new URLSearchParams\(window\.location\.search\)/, "contact page should include query prefill logic");
    assert.match(contact, /\.get\("relatedUrl"\)/, "contact page should read relatedUrl from the query string");
  });

  it("renders official source links on high-risk article pages", () => {
    const article = readHtml("en/articles/japan-emergency-disaster-basics-en/index.html");
    assert.match(article, /data-article-source-links/, "article page should render official source links");
    assert.match(article, /Official confirmation links/, "article source section should use localized English copy");
    assert.match(article, /https:\/\/www\.fdma\.go\.jp\/publication\/portal\/post1\.html/, "emergency article should link to FDMA");
    assert.match(article, /https:\/\/www\.jma\.go\.jp\/jma\/en\/Emergency_Warning\/ew_index\.html/, "emergency article should link to JMA");
    assert.match(article, /target="_blank"/, "official source links should open external pages separately");
    assert.match(article, /rel="noreferrer"/, "official source links should avoid leaking referrer context");
  });

  it("renders official source links on residence administration article pages", () => {
    const article = readHtml("en/articles/residence-card-resident-record-my-number-en/index.html");
    assert.match(article, /data-article-source-links/, "residence admin article should render official source links");
    assert.match(article, /Digital Agency: My Number FAQ/, "residence admin article should link the Digital Agency source");
    assert.match(article, /https:\/\/www\.digital\.go\.jp\/en\/policies\/mynumber_faq_02/, "residence admin article should include Digital Agency URL");
    assert.match(article, /Immigration Services Agency: Guidebook on Living and Working/, "residence admin article should link the ISA source");
    assert.match(article, /https:\/\/www\.moj\.go\.jp\/content\/001297615\.pdf/, "residence admin article should include Immigration Services Agency URL");
  });

  it("renders official source links on setup and ward-office article pages", () => {
    const firstWeek = readHtml("en/articles/first-week-japan-setup/index.html");
    assert.match(firstWeek, /data-article-source-links/, "first-week setup article should render official source links");
    assert.match(firstWeek, /Immigration Services Agency: Daily Life Support Portal/, "first-week setup article should link the ISA portal source");
    assert.match(firstWeek, /https:\/\/www\.moj\.go\.jp\/isa\/support\/portal\/guidebook_all\.html\?hl=ja/, "first-week setup article should include the ISA guidebook portal URL");
    assert.match(firstWeek, /Digital Agency: My Number FAQ/, "first-week setup article should link the Digital Agency source");

    const wardOffice = readHtml("en/articles/ward-office-moving-in-procedures-en/index.html");
    assert.match(wardOffice, /data-article-source-links/, "ward-office article should render official source links");
    assert.match(wardOffice, /Immigration Services Agency: Daily Life Support Portal/, "ward-office article should link the ISA portal source");
    assert.match(wardOffice, /https:\/\/www\.digital\.go\.jp\/en\/policies\/mynumber_faq_02/, "ward-office article should include Digital Agency URL");
  });

  it("generates an RSS feed for public article detail pages", () => {
    const feed = readDist("feed.xml");
    assertFeedLink(feed, "/zh-tw/articles/taiwanese-newcomer-mobile-plan-japan");
    assertFeedLink(feed, "/zh-tw/articles/japan-commuter-pass-ic-card-guide");
    assertFeedLink(feed, "/zh-tw/articles/residence-card-resident-record-my-number");
    assertFeedLink(feed, "/en/articles/choose-mobile-plan-japan-foreigner");
    assertFeedLink(feed, "/en/articles/japan-commuter-pass-ic-card-guide-en");
    assertFeedLink(feed, "/en/articles/residence-card-resident-record-my-number-en");
    assertFeedLink(feed, "/en/articles/apartment-viewing-japanese-phrases-en");
    assertFeedLink(feed, "/en/articles/ward-office-moving-in-procedures-en");
    assertFeedLink(feed, "/en/articles/japan-apartment-moving-out-checklist-en");
    assertFeedLink(feed, "/en/articles/japan-garbage-sorting-oversized-trash-en");
    assertFeedLink(feed, "/en/articles/japan-family-restaurants-dennys-gusto-royal-host-en");
    assertFeedLink(feed, "/en/articles/japan-convenience-store-supermarket-drugstore-guide-en");
    assertFeedLink(feed, "/ja/articles/japan-commuter-pass-ic-card-guide-ja");
    assertFeedLink(feed, "/ja/articles/residence-card-resident-record-my-number-ja");
    assertFeedLink(feed, "/ko/articles/japan-commuter-pass-ic-card-guide-ko");
    assertFeedLink(feed, "/ko/articles/residence-card-resident-record-my-number-ko");
    assert.doesNotMatch(feed, /draft/i, "feed should not expose draft article data");
  });

  it("generates locale-specific RSS feeds for same-locale public articles", () => {
    const englishFeed = readDist("en/feed.xml");
    assert.match(englishFeed, /<title>TachiSuke English Articles<\/title>/);
    assert.match(englishFeed, /<dc:language>en<\/dc:language>/);
    assertFeedLink(englishFeed, "/en/articles/choose-mobile-plan-japan-foreigner");
    assert.doesNotMatch(englishFeed, /\/zh-tw\/articles\//, "English feed should not include zh-tw article URLs");
    assert.doesNotMatch(englishFeed, /\/ja\/articles\//, "English feed should not include ja article URLs");
    assert.doesNotMatch(englishFeed, /draft/i, "English feed should not expose draft article data");

    const zhTwFeed = readDist("zh-tw/feed.xml");
    assert.match(zhTwFeed, /<title>TachiSuke 繁體中文文章<\/title>/);
    assert.match(zhTwFeed, /<dc:language>zh-Hant-TW<\/dc:language>/);
    assertFeedLink(zhTwFeed, "/zh-tw/articles/taiwanese-newcomer-mobile-plan-japan");
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

  it("renders human-readable site map JSON-LD with BCP47 language values", () => {
    for (const locale of locales) {
      const objects = jsonLdObjects(readHtml(`${locale}/site-map/index.html`));
      const webPage = objects.find((object) => object["@type"] === "WebPage" && object.mainEntity?.["@type"] === "ItemList");

      assert.ok(webPage, `${locale} site map should include WebPage JSON-LD`);
      assert.equal(webPage?.inLanguage, htmlLangByLocale[locale], `${locale} site map WebPage should use the HTML language`);
      assert.ok(webPage?.mainEntity?.numberOfItems > 0, `${locale} site map ItemList should describe public links`);
    }
  });

  it("generates noindex locale search pages and public search index JSON", () => {
    for (const locale of locales) {
      const html = readHtml(`${locale}/search/index.html`);

      assert.match(html, /\| TachiSuke<\/title>/, `${locale} search page should have an SEO title`);
      assert.match(html, /name="robots" content="noindex, follow"/, `${locale} search page should be noindex but follow links`);
      assert.match(
        html,
        new RegExp(`<form class="search-panel" role="search" method="get" action="${escapeRegExp(`/${locale}/search`)}" data-search-form>`),
        `${locale} search page should render a locale-aware shareable GET form`
      );
      assert.match(
        html,
        new RegExp(`data-search-index-url="${escapeRegExp(`/${locale}/search-index.json`)}"`),
        `${locale} search page should point at its own locale search index`
      );
      assert.match(html, /data-search-root/, `${locale} search page should include the search root hook`);
      assert.match(html, /data-search-input/, `${locale} search page should include the client-side search input`);
      assert.match(html, /name="q"/, `${locale} search input should submit q query values`);
      assert.match(html, /new URLSearchParams\(window\.location\.search\)/, `${locale} search script should read q from the URL`);
      assert.match(html, /history\.replaceState/, `${locale} search script should sync q back to the URL`);
      assert.match(html, /data-search-empty-help/, `${locale} search empty state should include a helper text hook`);
      assert.match(html, /data-search-clear/, `${locale} search empty state should include a clear-search action`);
      assert.match(
        html,
        /data-search-empty[^>]+aria-live="polite"[^>]+aria-atomic="true"/,
        `${locale} search empty state should announce recoverable zero-result changes politely`
      );
      assert.match(html, /search-result-type/, `${locale} search result type labels should render as badge-like elements`);
      assert.match(html, /function clearSearch\(\)/, `${locale} search script should expose a clearSearch helper`);
      assert.match(html, /url\.searchParams\.delete\("q"\)/, `${locale} clear search should remove q from the URL`);
      assert.match(html, new RegExp(`href="/${escapeRegExp(locale)}/articles/`), `${locale} search page should render static article results`);
      assert.doesNotMatch(html, new RegExp(`<h2><a href="/${escapeRegExp(locale)}/account/`), `${locale} search page should not render account placeholder results`);
    }

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
      "/en/tools/japan-everyday-shopping-checklist",
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

  it("keeps locale search indexes limited to public content collections", () => {
    for (const locale of locales) {
      const index = JSON.parse(readDist(`${locale}/search-index.json`));
      const expectedByType = expectedSearchUrlsByType(locale);
      const expectedUrls = new Set(Object.values(expectedByType).flatMap((urls) => [...urls]));
      const seenIds = new Set();
      const seenUrls = new Set();

      assert.equal(index.locale, locale, `${locale} search index should declare its locale`);
      assert.equal(index.count, index.items.length, `${locale} search index count should match item length`);

      for (const item of index.items) {
        assert.ok(searchEntryTypes.includes(item.type), `${locale} search entry ${item.id} should use a known type`);
        assert.equal(seenIds.has(item.id), false, `${locale} search entry id ${item.id} should be unique`);
        assert.match(item.id, new RegExp(`^${item.type}:`), `${locale} search entry ${item.id} should prefix its type`);
        assert.equal(item.url, normalizePath(item.url), `${locale} search entry ${item.id} should use normalized URLs`);
        assert.ok(item.url.startsWith(`/${locale}/`), `${locale} search entry ${item.id} should stay in the locale route tree`);
        assert.ok(
          expectedByType[item.type].has(item.url),
          `${locale} search entry ${item.id} points to non-public or unexpected URL ${item.url}`
        );
        assert.doesNotMatch(
          item.url,
          /\/(?:account|contact|editorial-policy|privacy|search|site-map|submit-place)(?:\/|$)/,
          `${locale} search entry ${item.id} should not point to utility, form, trust, or account routes`
        );

        seenIds.add(item.id);
        seenUrls.add(item.url);
      }

      for (const expectedUrl of expectedUrls) {
        assert.ok(seenUrls.has(expectedUrl), `${locale} search index should include public content URL ${expectedUrl}`);
      }
      assert.equal(seenUrls.size, expectedUrls.size, `${locale} search index should not include extra public-looking URLs`);
    }
  });

  it("generates article category landing pages for public same-locale articles", () => {
    const mobile = readHtml("en/articles/category/mobile/index.html");
    assert.match(mobile, /Mobile guides \| TachiSuke/, "English mobile category page should have an SEO title");
    assert.match(mobile, /href="\/en\/articles\/choose-mobile-plan-japan-foreigner"/, "mobile category should link to English mobile articles");
    assert.match(mobile, /href="\/en\/articles\/povo-linemo-rakuten-ahamo-comparison"/, "mobile category should include all matching English articles");
    assert.match(mobile, />Mobile guides · /, "mobile category article rows should display localized category labels");
    assert.doesNotMatch(mobile, />mobile · /, "mobile category article rows should not display raw category keys");
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
    assert.match(procedures, />行政手續文章 · /, "zh-tw category article rows should display localized category labels");
    assert.doesNotMatch(procedures, />procedures · /, "zh-tw category article rows should not display raw category keys");

    const work = readHtml("en/articles/category/work/index.html");
    assert.match(work, /Work guides \| TachiSuke/, "English work category should have a localized SEO title");
    assert.match(work, /href="\/en\/articles\/japan-work-contract-basics-en"/, "work category should link to English work article");
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

  it("renders visible breadcrumbs on collection index pages", () => {
    for (const [locale, ariaLabel, sections] of [
      ["zh-tw", "麵包屑導覽", [["articles", "生活文章"], ["areas", "地區生活圈"], ["places", "店家推薦"], ["mobile", "手機門號"], ["tools", "生活工具"]]],
      ["en", "Breadcrumb", [["articles", "Life Articles"], ["areas", "Area Guides"], ["places", "Useful Places"], ["mobile", "Mobile Plans"], ["tools", "Life Tools"]]],
      ["ja", "パンくずリスト", [["articles", "生活記事"], ["areas", "エリアガイド"], ["places", "おすすめのお店"], ["mobile", "携帯プラン"], ["tools", "生活ツール"]]],
      ["ko", "이동 경로", [["articles", "생활 글"], ["areas", "지역 가이드"], ["places", "유용한 장소"], ["mobile", "휴대폰 요금제"], ["tools", "생활 도구"]]]
    ]) {
      for (const [section, currentText] of sections) {
        const html = readHtml(`${locale}/${section}/index.html`);
        assert.match(html, new RegExp(`<nav class="breadcrumbs" aria-label="${escapeRegExp(ariaLabel)}">`), `${locale}/${section} should render breadcrumb navigation`);
        assert.match(html, new RegExp(`href="\\/${locale}\\/"`), `${locale}/${section} breadcrumb should link to locale home`);
        assert.match(html, new RegExp(`aria-current="page"[^>]*>${escapeRegExp(currentText)}`), `${locale}/${section} breadcrumb should mark the current collection`);
      }
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
    assert.match(html, /<meta property="article:section" content="Mobile guides">/, "article detail should include localized section Open Graph metadata");
    assert.match(html, /<meta property="article:tag" content="mobile plans">/, "article detail should include tag Open Graph metadata");
    const articleJsonLd = objects.find((object) => object["@type"] === "Article");
    assert.equal(articleJsonLd?.articleSection, "Mobile guides", "article detail Article JSON-LD should use localized category labels");
    const breadcrumb = objects.find((object) => object["@type"] === "BreadcrumbList");
    const categoryCrumb = breadcrumb?.itemListElement?.[2];
    assert.equal(categoryCrumb?.name, "Mobile guides", "article detail breadcrumb JSON-LD should use localized category labels");
    assert.match(html, /<a class="article-meta-link" href="\/en\/articles\/category\/mobile">Mobile guides<\/a>/, "article visible meta should use localized category labels");

    const zhArticle = readHtml("zh-tw/articles/residence-card-resident-record-my-number/index.html");
    assert.match(zhArticle, /<meta property="article:section" content="行政手續文章">/, "zh-tw article detail should localize section Open Graph metadata");
    assert.match(zhArticle, /<a class="article-meta-link" href="\/zh-tw\/articles\/category\/procedures">行政手續文章<\/a>/, "zh-tw article visible meta should use localized category labels");
  });

  it("renders conservative JSON-LD on article index pages", () => {
    for (const [locale, relativePath, language] of [
      ["zh-tw", "zh-tw/articles/index.html", "zh-Hant-TW"],
      ["en", "en/articles/index.html", "en"],
      ["ja", "ja/articles/index.html", "ja"],
      ["ko", "ko/articles/index.html", "ko"]
    ]) {
      const objects = jsonLdObjects(readHtml(relativePath));
      const collectionPage = objects.find((object) => object["@type"] === "CollectionPage");
      const itemList = objects.find((object) => object["@type"] === "ItemList");

      assert.ok(collectionPage, `${locale} article index should include CollectionPage JSON-LD`);
      assert.ok(hasJsonLdType(objects, "BreadcrumbList"), `${locale} article index should include BreadcrumbList JSON-LD`);
      assert.equal(collectionPage?.inLanguage, language, `${locale} article index should use the HTML language`);
      assert.equal(collectionPage?.url, absoluteUrl(`/${locale}/articles/`), `${locale} CollectionPage should use its canonical URL`);
      assert.equal(collectionPage?.isPartOf?.["@id"], absoluteUrl("/#website"));

      assert.ok(itemList, `${locale} article index should include ItemList JSON-LD`);
      assert.equal(itemList?.numberOfItems, itemList?.itemListElement?.length, `${locale} ItemList count should match its entries`);
      assert.ok(itemList.numberOfItems >= 10, `${locale} article index should expose the public article list`);
      assert.equal(itemList.itemListElement[0]?.["@type"], "ListItem");
      assert.equal(itemList.itemListElement[0]?.position, 1);
      assert.match(itemList.itemListElement[0]?.url ?? "", urlPrefixRegExp(`/${locale}/articles/`));
    }
  });

  it("renders conservative JSON-LD on public section index pages", () => {
    const expectedSectionCounts = {
      mobile: listFiles(join(contentRoot, "mobile-plans"), [".json"]).length,
      areas: listFiles(join(contentRoot, "areas"), [".json"]).length,
      places: listFiles(join(contentRoot, "places"), [".json"]).map(readJson).filter((place) => place.status === "published").length,
      tools: listFiles(join(contentRoot, "tools"), [".json"]).map(readJson).filter((tool) => tool.status === "published").length
    };

    for (const {
      label,
      relativePath,
      expectedCount,
      expectedUrlPattern,
      expectedLanguage,
      expectedCanonicalUrl,
      expectedHomeUrl
    } of sectionIndexJsonLdCases(expectedSectionCounts)) {
      const objects = jsonLdObjects(readHtml(relativePath));
      const collectionPage = objects.find((object) => object["@type"] === "CollectionPage");
      const itemList = objects.find((object) => object["@type"] === "ItemList");
      const breadcrumb = objects.find((object) => object["@type"] === "BreadcrumbList");

      assert.ok(collectionPage, `${label} index should include CollectionPage JSON-LD`);
      assert.equal(collectionPage?.inLanguage, expectedLanguage, `${label} index should use the page language`);
      assert.equal(collectionPage?.url, expectedCanonicalUrl, `${label} CollectionPage should use its canonical URL`);
      assert.equal(collectionPage?.isPartOf?.["@id"], absoluteUrl("/#website"), `${label} CollectionPage should belong to the site WebSite`);
      assert.ok(itemList, `${label} index should include ItemList JSON-LD`);
      assert.ok(breadcrumb, `${label} index should include BreadcrumbList JSON-LD`);
      assert.equal(breadcrumb?.itemListElement?.length, 2, `${label} breadcrumb should include home and current section`);
      assert.equal(breadcrumb?.itemListElement?.[0]?.item, expectedHomeUrl, `${label} breadcrumb should link to its locale home`);
      assert.equal(breadcrumb?.itemListElement?.[1]?.item, expectedCanonicalUrl, `${label} breadcrumb should link to its canonical URL`);
      assert.equal(itemList?.numberOfItems, expectedCount, `${label} ItemList should match visible item count`);
      assert.equal(itemList?.itemListElement?.length, expectedCount, `${label} ItemList entries should match visible item count`);
      itemList.itemListElement.forEach((item, index) => {
        assert.equal(item?.["@type"], "ListItem", `${label} ItemList entry ${index + 1} should be a ListItem`);
        assert.equal(item?.position, index + 1, `${label} ItemList entry ${index + 1} should use a sequential position`);
        assert.match(item?.url ?? "", expectedUrlPattern, `${label} ItemList entry ${index + 1} should link to a detail page`);
      });
    }
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
      itemList.itemListElement.some((item) => item.url === absoluteUrl("/en/articles/choose-mobile-plan-japan-foreigner")),
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

    const shoppingTool = readHtml("en/tools/japan-everyday-shopping-checklist/index.html");
    assert.match(shoppingTool, /Everyday Shopping Checklist/, "everyday shopping tool should build a detail page");
    assert.match(shoppingTool, /supermarket/i, "everyday shopping tool should include store-choice guidance");
    assert.match(shoppingTool, /point card/i, "everyday shopping tool should include payment and point guidance");
  });
});
