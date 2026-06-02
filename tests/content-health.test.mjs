import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contentRoot = join(root, "src/content");
const locales = ["zh-tw", "en", "ja", "ko"];
const fullyLocalizedArticleTranslationKeys = new Set([
  "apartment-viewing-japanese-phrases",
  "commuter-pass-ic-card-guide",
  "family-restaurants-japan-basics",
  "first-week-japan-setup",
  "japan-apartment-moving-out-checklist",
  "japan-emergency-disaster-basics",
  "japan-garbage-sorting-oversized-trash",
  "japan-shopping-basics",
  "japan-work-contract-basics",
  "mobile-plan-basics-foreign-residents",
  "mobile-plan-brand-comparison",
  "renting-initial-costs-japan",
  "residence-card-resident-record-my-number",
  "ward-office-moving-in-procedures"
]);
const allowedPartialArticleTranslationLocales = new Map([]);
const tomorrow = new Date();
tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

function listFiles(dir, extensions) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listFiles(fullPath, extensions);
    }

    return extensions.some((extension) => entry.name.endsWith(extension)) ? [fullPath] : [];
  });
}

function relative(fullPath) {
  return fullPath.replace(`${root}/`, "");
}

function readJson(fullPath) {
  return JSON.parse(readFileSync(fullPath, "utf8"));
}

function readFrontmatter(fullPath) {
  const file = readFileSync(fullPath, "utf8");
  const match = file.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${relative(fullPath)} should include frontmatter`);

  const data = {};
  let currentArrayKey;
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;

    const arrayItem = line.match(/^\s+-\s+"?(.+?)"?\s*$/);
    if (arrayItem && currentArrayKey) {
      data[currentArrayKey].push(arrayItem[1]);
      continue;
    }

    const property = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!property) continue;

    currentArrayKey = undefined;
    const [, key, rawValue] = property;
    if (!rawValue) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = rawValue.replace(/^"|"$/g, "");
  }

  return data;
}

function parseDate(value, label) {
  const date = new Date(value);
  assert.ok(!Number.isNaN(date.getTime()), `${label} should be a valid date`);
  return date;
}

function assertNotFuture(date, label) {
  assert.ok(date <= tomorrow, `${label} should not be set in the future`);
}

function assertUnique(entries, field, label) {
  const seen = new Map();
  for (const entry of entries) {
    const value = entry.data[field];
    assert.ok(value, `${entry.path} should include ${field}`);
    assert.equal(seen.has(value), false, `${label} ${field} "${value}" is duplicated in ${entry.path} and ${seen.get(value)}`);
    seen.set(value, entry.path);
  }
}

function assertHttpsUrl(value, label) {
  if (!value) return;
  const url = new URL(value);
  assert.equal(url.protocol, "https:", `${label} should use https`);
}

function assertNoUndefinedString(value, label) {
  if (typeof value === "string") {
    assert.notEqual(value.trim().toLowerCase(), "undefined", `${label} should not contain an undefined placeholder string`);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoUndefinedString(item, `${label}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      assertNoUndefinedString(child, `${label}.${key}`);
    }
  }
}

function assertUrlFieldsAreHttps(value, label) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertUrlFieldsAreHttps(item, `${label}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    const childLabel = `${label}.${key}`;
    if (typeof child === "string" && /Url$/.test(key)) {
      assertHttpsUrl(child, childLabel);
    } else {
      assertUrlFieldsAreHttps(child, childLabel);
    }
  }
}

function markdownExternalLinks(fullPath) {
  const file = readFileSync(fullPath, "utf8");
  return [...file.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);
}

function markdownBody(fullPath) {
  return readFileSync(fullPath, "utf8").replace(/^---\n[\s\S]*?\n---\n?/, "");
}

function normalizePath(path) {
  const withoutQuery = path.split("#")[0].split("?")[0];
  return withoutQuery.length > 1 ? withoutQuery.replace(/\/$/, "") : withoutQuery;
}

function isDraft(data) {
  return data.draft === true || data.draft === "true";
}

function slugifyArticleCategory(category) {
  return category
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function collectInternalLinks(fullPath) {
  const body = markdownBody(fullPath);
  const candidates = [
    ...body.matchAll(/(?<!!)\[[^\]]*]\((\/[^)\s]+)(?:\s+["'][^)]*["'])?\)/g),
    ...body.matchAll(/\shref=["'](\/[^"']+)["']/g)
  ].map((match) => match[1]);

  return candidates
    .filter((link) => !link.startsWith("//"))
    .map(normalizePath);
}

function buildPublicRouteSet(articles) {
  const routeSet = new Set([
    "/",
    "/404.html",
    "/feed.xml",
    "/llms.txt",
    "/opensearch.xml",
    "/robots.txt",
    "/site.webmanifest",
    "/sitemap.xml",
    "/.well-known/security.txt",
    "/favicon.svg",
    "/images/life-map.svg",
    "/images/og-default.svg"
  ]);

  for (const locale of locales) {
    for (const route of [
      "",
      "/about",
      "/account/favorites",
      "/account/login",
      "/account/submissions",
      "/areas",
      "/articles",
      "/contact",
      "/contact/thanks",
      "/editorial-policy",
      "/feed.xml",
      "/mobile",
      "/places",
      "/privacy",
      "/search",
      "/search-index.json",
      "/site-map",
      "/submit-place",
      "/submit-place/thanks",
      "/tools"
    ]) {
      routeSet.add(normalizePath(`/${locale}${route}/`));
    }
  }

  for (const article of articles) {
    if (isDraft(article.data)) continue;
    routeSet.add(normalizePath(`/${article.data.locale}/articles/${article.data.slug}`));
    routeSet.add(normalizePath(`/${article.data.locale}/articles/category/${slugifyArticleCategory(article.data.category)}`));
  }

  for (const place of listFiles(join(contentRoot, "places"), [".json"]).map(readJson)) {
    if (place.status !== "published") continue;
    for (const locale of locales) {
      routeSet.add(normalizePath(`/${locale}/places/${place.slug}`));
    }
  }

  for (const mobilePlan of listFiles(join(contentRoot, "mobile-plans"), [".json"]).map(readJson)) {
    for (const locale of locales) {
      routeSet.add(normalizePath(`/${locale}/mobile/${mobilePlan.slug}`));
    }
  }

  for (const area of listFiles(join(contentRoot, "areas"), [".json"]).map(readJson)) {
    for (const locale of locales) {
      routeSet.add(normalizePath(`/${locale}/areas/${area.slug}`));
    }
  }

  for (const tool of listFiles(join(contentRoot, "tools"), [".json"]).map(readJson)) {
    if (tool.status !== "published") continue;
    for (const locale of locales) {
      routeSet.add(normalizePath(`/${locale}/tools/${tool.slug}`));
    }
  }

  return routeSet;
}

function readArticleSourceLinks(fullPath) {
  const file = readFileSync(fullPath, "utf8");
  const match = file.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${relative(fullPath)} should include frontmatter`);

  const lines = match[1].split("\n");
  const sourceLinksIndex = lines.findIndex((line) => line === "sourceLinks:");
  if (sourceLinksIndex === -1) return [];

  const links = [];
  let current;
  for (const line of lines.slice(sourceLinksIndex + 1)) {
    if (/^[A-Za-z0-9_-]+:/.test(line)) break;
    const item = line.match(/^\s+-\s+label:\s*"?(.*?)"?\s*$/);
    if (item) {
      current = { label: item[1] };
      links.push(current);
      continue;
    }

    const property = line.match(/^\s+([A-Za-z0-9_-]+):\s*"?(.*?)"?\s*$/);
    if (property && current) {
      const [, key, value] = property;
      current[key] = value;
    }
  }

  return links;
}

function assertArticleSourceLinks(articles, translationKey, expectedUrlFragments) {
  const matchingArticles = articles
    .filter((article) => article.data.translationKey === translationKey)
    .filter((article) => !isDraft(article.data));

  for (const locale of ["zh-tw", "en", "ja", "ko"]) {
    const article = matchingArticles.find((entry) => entry.data.locale === locale);
    assert.ok(article, `${translationKey} should include a public ${locale} article`);

    const sourceLinks = readArticleSourceLinks(article.fullPath);
    assert.ok(sourceLinks.length >= expectedUrlFragments.length, `${article.path} should include official sourceLinks`);

    for (const [index, link] of sourceLinks.entries()) {
      assert.ok(link.label, `${article.path} sourceLinks[${index}] should include a label`);
      assertHttpsUrl(link.url, `${article.path} sourceLinks[${index}].url`);
    }

    for (const fragment of expectedUrlFragments) {
      assert.ok(
        sourceLinks.some((link) => link.url?.includes(fragment)),
        `${article.path} should include a source link containing ${fragment}`
      );
    }
  }
}

function collectArticleTranslationGroups(articles) {
  const groups = new Map();

  for (const article of articles) {
    if (isDraft(article.data)) continue;

    const translationKey = article.data.translationKey;
    assert.ok(translationKey, `${article.path} should include translationKey`);

    const entries = groups.get(translationKey) ?? [];
    entries.push(article);
    groups.set(translationKey, entries);
  }

  return groups;
}

describe("content health", () => {
  it("keeps article ids, slugs, dates, and external links healthy", () => {
    const articles = listFiles(join(contentRoot, "articles"), [".md", ".mdx"]).map((fullPath) => ({
      path: relative(fullPath),
      data: readFrontmatter(fullPath),
      fullPath
    }));

    assertUnique(articles, "id", "article");
    assertUnique(articles, "slug", "article");

    for (const article of articles) {
      const publishedAt = parseDate(article.data.publishedAt, `${article.path} publishedAt`);
      const updatedAt = parseDate(article.data.updatedAt, `${article.path} updatedAt`);
      assert.ok(updatedAt >= publishedAt, `${article.path} updatedAt should not be earlier than publishedAt`);
      assertNotFuture(publishedAt, `${article.path} publishedAt`);
      assertNotFuture(updatedAt, `${article.path} updatedAt`);

      for (const url of markdownExternalLinks(article.fullPath)) {
        assertHttpsUrl(url, `${article.path} external markdown link ${url}`);
      }
    }

    assertArticleSourceLinks(articles, "japan-emergency-disaster-basics", ["fdma.go.jp", "jma.go.jp"]);
    assertArticleSourceLinks(articles, "japan-work-contract-basics", ["studyinjapan.go.jp", "check-roudou.mhlw.go.jp"]);
    assertArticleSourceLinks(articles, "residence-card-resident-record-my-number", ["digital.go.jp", "moj.go.jp"]);
    assertArticleSourceLinks(articles, "first-week-japan-setup", ["moj.go.jp/isa/support/portal/guidebook_all", "digital.go.jp"]);
    assertArticleSourceLinks(articles, "ward-office-moving-in-procedures", ["moj.go.jp/isa/support/portal/guidebook_all", "digital.go.jp"]);
  });

  it("keeps public article translation groups explicitly covered by locale policy", () => {
    const articles = listFiles(join(contentRoot, "articles"), [".md", ".mdx"]).map((fullPath) => ({
      path: relative(fullPath),
      data: readFrontmatter(fullPath),
      fullPath
    }));
    const groups = collectArticleTranslationGroups(articles);
    const requiredLocales = [...locales].sort();

    for (const translationKey of fullyLocalizedArticleTranslationKeys) {
      assert.ok(groups.has(translationKey), `${translationKey} should exist as a public article translation group`);
      assert.equal(
        allowedPartialArticleTranslationLocales.has(translationKey),
        false,
        `${translationKey} should not be marked as both fully localized and partially localized`
      );
    }

    for (const [translationKey, partialLocales] of allowedPartialArticleTranslationLocales.entries()) {
      assert.ok(groups.has(translationKey), `${translationKey} should exist as a public partial article translation group`);

      const normalizedPartialLocales = [...new Set(partialLocales)].sort();
      assert.deepEqual(
        normalizedPartialLocales,
        [...partialLocales].sort(),
        `${translationKey} partial article locale policy should not duplicate locales`
      );
      assert.ok(
        normalizedPartialLocales.length > 0 && normalizedPartialLocales.length < locales.length,
        `${translationKey} partial article locale policy should be a strict subset of supported locales`
      );
      for (const locale of normalizedPartialLocales) {
        assert.ok(locales.includes(locale), `${translationKey} partial article locale policy uses unsupported locale ${locale}`);
      }
    }

    for (const [translationKey, entries] of groups) {
      const actualLocales = entries.map((entry) => entry.data.locale).sort();
      const uniqueLocales = new Set(actualLocales);
      assert.equal(uniqueLocales.size, actualLocales.length, `${translationKey} should not duplicate article locales`);
      for (const locale of actualLocales) {
        assert.ok(locales.includes(locale), `${translationKey} uses unsupported article locale ${locale}`);
      }

      const isFullyLocalized = fullyLocalizedArticleTranslationKeys.has(translationKey);
      const allowedPartialLocales = allowedPartialArticleTranslationLocales.get(translationKey);
      assert.ok(
        isFullyLocalized || allowedPartialLocales,
        `${translationKey} should be listed in fullyLocalizedArticleTranslationKeys or allowedPartialArticleTranslationLocales`
      );

      if (isFullyLocalized) {
        assert.deepEqual(actualLocales, requiredLocales, `${translationKey} should include every supported article locale`);
        continue;
      }

      assert.deepEqual(
        actualLocales,
        [...allowedPartialLocales].sort(),
        `${translationKey} should match its documented partial article locale set`
      );
    }
  });

  it("keeps Markdown and MDX internal links pointed at generated public routes", () => {
    const articles = listFiles(join(contentRoot, "articles"), [".md", ".mdx"]).map((fullPath) => ({
      path: relative(fullPath),
      data: readFrontmatter(fullPath),
      fullPath
    }));
    const routeSet = buildPublicRouteSet(articles);

    for (const article of articles) {
      for (const link of collectInternalLinks(article.fullPath)) {
        assert.ok(routeSet.has(link), `${article.path} links to missing internal route ${link}`);
      }
    }
  });

  it("keeps JSON collection ids, slugs, review dates, and URL fields healthy", () => {
    for (const collection of ["areas", "mobile-plans", "places", "tools"]) {
      const entries = listFiles(join(contentRoot, collection), [".json"]).map((fullPath) => ({
        path: relative(fullPath),
        data: readJson(fullPath)
      }));

      assertUnique(entries, "id", collection);
      assertUnique(entries, "slug", collection);

      for (const entry of entries) {
        assertNoUndefinedString(entry.data, entry.path);
        assertUrlFieldsAreHttps(entry.data, entry.path);

        if ("lastCheckedAt" in entry.data) {
          assertNotFuture(parseDate(entry.data.lastCheckedAt, `${entry.path} lastCheckedAt`), `${entry.path} lastCheckedAt`);
        }

        if ("createdAt" in entry.data || "updatedAt" in entry.data) {
          const createdAt = parseDate(entry.data.createdAt, `${entry.path} createdAt`);
          const updatedAt = parseDate(entry.data.updatedAt, `${entry.path} updatedAt`);
          assert.ok(updatedAt >= createdAt, `${entry.path} updatedAt should not be earlier than createdAt`);
          assertNotFuture(createdAt, `${entry.path} createdAt`);
          assertNotFuture(updatedAt, `${entry.path} updatedAt`);
        }
      }
    }
  });
});
