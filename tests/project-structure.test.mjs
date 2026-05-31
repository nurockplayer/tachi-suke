import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const locales = ["zh-tw", "en", "ja", "ko"];

function listFiles(dir, extensions) {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const relativePath = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      return listFiles(relativePath, extensions);
    }

    return extensions.some((extension) => entry.name.endsWith(extension)) ? [relativePath] : [];
  });
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

function readFrontmatter(relativePath) {
  const file = readFileSync(join(root, relativePath), "utf8");
  const match = file.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${relativePath} should include frontmatter`);

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

    const value = rawValue.replace(/^"|"$/g, "");
    data[key] = value === "true" ? true : value === "false" ? false : value;
  }

  return data;
}

function normalizePath(path) {
  const withoutQuery = path.split("#")[0].split("?")[0];
  return withoutQuery.length > 1 ? withoutQuery.replace(/\/$/, "") : withoutQuery;
}

const requiredFiles = [
  "AGENTS.md",
  "README.md",
  ".env.example",
  "astro.config.mjs",
  "tsconfig.json",
  "package.json",
  "pnpm-lock.yaml",
  "src/pages/index.astro",
  "src/content.config.ts",
  "src/components/layout/BaseLayout.astro",
  "src/components/layout/Header.astro",
  "src/components/layout/Footer.astro",
  "src/components/layout/ArticleLayout.astro",
  "src/components/layout/LocaleSwitcher.astro",
  "src/components/content/CategoryCard.astro",
  "src/components/places/PlaceCard.astro",
  "src/components/pages/ArticleDetailPage.astro",
  "src/components/pages/PlaceDetailPage.astro",
  "src/components/mobile/MobilePlanCard.astro",
  "src/components/favorites/FavoriteButtonPlaceholder.astro",
  "src/components/auth/LoginPrompt.astro",
  "src/types/locale.ts",
  "src/types/article.ts",
  "src/types/place.ts",
  "src/types/mobile-plan.ts",
  "src/types/favorite.ts",
  "src/types/user.ts",
  "src/types/submission.ts",
  "docs/PROJECT_SPEC.md",
  "docs/PAGE_SPEC.md",
  "docs/CONTENT_MODEL.md",
  "docs/IMPLEMENTATION_STATUS.md",
  "docs/ACCEPTANCE_CRITERIA.md",
  "docs/CONTENT_STRATEGY.md",
  "docs/ROADMAP.md",
  "docs/AUTH_AND_FAVORITES.md",
  "docs/DATABASE_DESIGN.md"
];

const requiredDirs = [
  "src/content/articles",
  "src/content/areas",
  "src/content/places",
  "src/content/mobile-plans",
  "src/content/tools",
  "src/lib/i18n",
  "src/lib/content",
  "src/lib/auth",
  "src/lib/db",
  "src/lib/favorites",
  "src/lib/submissions"
];

const localePages = [
  "index.astro",
  "articles/index.astro",
  "articles/[slug].astro",
  "areas/index.astro",
  "places/index.astro",
  "places/[slug].astro",
  "mobile/index.astro",
  "tools/index.astro",
  "submit-place.astro",
  "about.astro",
  "account/login.astro",
  "account/favorites.astro",
  "account/submissions.astro"
];

describe("TachiSuke project scaffold", () => {
  it("contains the required documents, source files, and locale routes", () => {
    for (const file of requiredFiles) {
      assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
    }

    for (const dir of requiredDirs) {
      assert.equal(existsSync(join(root, dir)), true, `${dir} should exist`);
    }

    for (const locale of locales) {
      for (const page of localePages) {
        const route = `src/pages/${locale}/${page}`;
        assert.equal(existsSync(join(root, route)), true, `${route} should exist`);
      }
    }
  });

  it("uses pnpm only for JavaScript package management", () => {
    assert.equal(existsSync(join(root, "package-lock.json")), false, "package-lock.json must not exist");
    assert.equal(existsSync(join(root, "yarn.lock")), false, "yarn.lock must not exist");
    assert.equal(existsSync(join(root, "bun.lock")), false, "bun.lock must not exist");
    assert.equal(existsSync(join(root, "bun.lockb")), false, "bun.lockb must not exist");

    const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    assert.match(packageJson.packageManager, /^pnpm@10/);
    assert.equal(packageJson.scripts.preinstall, undefined);
  });

  it("defines all required content collections and avoids a fixed production domain", () => {
    const contentConfig = readFileSync(join(root, "src/content.config.ts"), "utf8");
    for (const collection of ["articles", "places", "areas", "\"mobile-plans\"", "tools"]) {
      assert.match(contentConfig, new RegExp(collection), `content config should include ${collection}`);
    }

    const astroConfig = readFileSync(join(root, "astro.config.mjs"), "utf8");
    assert.match(astroConfig, /process\.env\.SITE_URL/);
    assert.match(astroConfig, /https:\/\/tachi-suke\.example\.com/);
    assert.doesNotMatch(astroConfig, /site:\s*["']https:\/\/tachi-suke\.example\.com["']/);
  });

  it("uses the finalized Place enum names across schema and types", () => {
    const contentConfig = readFileSync(join(root, "src/content.config.ts"), "utf8");
    const placeTypes = readFileSync(join(root, "src/types/place.ts"), "utf8");
    const combined = `${contentConfig}\n${placeTypes}`;

    for (const value of ["maybe", "confirmed_non_smoking", "separated_smoking_area", "smoking_allowed", "easy", "normal", "hard", "editor", "user_submission", "pending_review", "rejected"]) {
      assert.match(combined, new RegExp(`["']${value}["']`), `Place enum should include ${value}`);
    }

    for (const oldValue of ["mixed", "partial", "\"low\"", "\"medium\"", "\"high\"", "editorial", "community"]) {
      assert.doesNotMatch(combined, new RegExp(oldValue), `Place enum should not include old value ${oldValue}`);
    }
  });

  it("includes Phase 1B content depth for articles, mobile plans, and area guides", () => {
    const articleFiles = listFiles("src/content/articles", [".md", ".mdx"]);
    const articles = articleFiles.map(readFrontmatter);
    assert.ok(articles.length >= 12, "Phase 1B should add at least 8 articles on top of the Phase 1A samples");

    const localeCounts = Object.fromEntries(locales.map((locale) => [locale, articles.filter((article) => article.locale === locale).length]));
    assert.ok(localeCounts["zh-tw"] >= 5, "Phase 1B should include at least 5 zh-tw articles");
    assert.ok(localeCounts.en >= 3, "Phase 1B should include at least 3 en articles");
    assert.ok(localeCounts.ja >= 2, "Phase 1B should include at least 2 ja articles");
    assert.ok(localeCounts.ko >= 2, "Phase 1B should include at least 2 ko articles");

    assert.equal(new Set(articles.map((article) => article.id)).size, articles.length, "article ids should be unique");
    assert.equal(new Set(articles.map((article) => article.slug)).size, articles.length, "article slugs should be globally unique for Astro content ids");
    assert.equal(new Set(articles.map((article) => `${article.locale}/${article.slug}`)).size, articles.length, "article locale slugs should be unique");
    for (const article of articles) {
      assert.equal(article.draft, false, `${article.id} should be public sample content`);
      assert.ok(article.title?.length > 12, `${article.id} should have an SEO-ready title`);
      assert.ok(article.description?.length > 40, `${article.id} should have an SEO-ready description`);
      assert.ok(article.category, `${article.id} should have a category`);
    }

    const mobilePlans = listFiles("src/content/mobile-plans", [".json"]).map(readJson);
    assert.ok(mobilePlans.length >= 5, "Phase 1B should include at least 5 mobile plans");
    for (const provider of ["povo", "LINEMO", "Rakuten Mobile", "ahamo", "UQ mobile"]) {
      assert.ok(
        mobilePlans.some((plan) => plan.provider.toLowerCase() === provider.toLowerCase()),
        `mobile plan data should include ${provider}`
      );
    }

    const areas = listFiles("src/content/areas", [".json"]).map(readJson);
    assert.ok(areas.length >= 4, "Phase 1B should include at least 4 area guides");
    for (const slug of ["ikebukuro", "itabashi", "akabane", "kagurazaka-edogawabashi"]) {
      assert.ok(areas.some((area) => area.slug === slug), `area guide data should include ${slug}`);
    }
  });

  it("keeps article internal links pointed at existing static or generated routes", () => {
    const routeSet = new Set(["/"]);
    for (const locale of locales) {
      for (const route of ["", "/articles", "/areas", "/places", "/mobile", "/tools", "/submit-place", "/about", "/account/login", "/account/favorites", "/account/submissions"]) {
        routeSet.add(normalizePath(`/${locale}${route}/`));
      }
    }

    for (const article of listFiles("src/content/articles", [".md", ".mdx"]).map(readFrontmatter)) {
      if (!article.draft) {
        routeSet.add(normalizePath(`/${article.locale}/articles/${article.slug}`));
      }
    }

    for (const place of listFiles("src/content/places", [".json"]).map(readJson)) {
      if (place.status === "published") {
        for (const locale of locales) {
          routeSet.add(normalizePath(`/${locale}/places/${place.slug}`));
        }
      }
    }

    for (const relativePath of listFiles("src/content/articles", [".md", ".mdx"])) {
      const file = readFileSync(join(root, relativePath), "utf8");
      const links = [...file.matchAll(/\[[^\]]+\]\((\/[^)\s]+)\)/g)].map((match) => normalizePath(match[1]));

      for (const link of links) {
        assert.ok(routeSet.has(link), `${relativePath} links to missing internal route ${link}`);
      }
    }
  });
});
