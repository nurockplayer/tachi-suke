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
  ".github/workflows/ci.yml",
  "astro.config.mjs",
  "tsconfig.json",
  "package.json",
  "pnpm-lock.yaml",
  "public/_headers",
  "src/pages/index.astro",
  "src/pages/sitemap.xml.ts",
  "src/pages/robots.txt.ts",
  "src/pages/site.webmanifest.ts",
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
  "src/components/pages/MobilePlanDetailPage.astro",
  "src/components/pages/AreaDetailPage.astro",
  "src/components/pages/SubmitPlaceThanksPage.astro",
  "src/components/mobile/MobilePlanCard.astro",
  "src/components/favorites/FavoriteButtonPlaceholder.astro",
  "src/components/auth/LoginPrompt.astro",
  "src/types/locale.ts",
  "src/types/article.ts",
  "src/types/place.ts",
  "src/types/mobile-plan.ts",
  "src/types/area.ts",
  "src/types/favorite.ts",
  "src/types/user.ts",
  "src/types/submission.ts",
  "public/images/og-default.svg",
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
  "mobile/[slug].astro",
  "areas/[slug].astro",
  "tools/index.astro",
  "submit-place.astro",
  "submit-place/thanks.astro",
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
    assert.equal(packageJson.scripts["check:links"], "node tests/static-html-links.test.mjs");
    assert.equal(packageJson.scripts["check:seo"], "node --test tests/seo-output.test.mjs");
    assert.equal(existsSync(join(root, "tests/static-html-links.test.mjs")), true, "static HTML link crawler should exist");
    assert.equal(existsSync(join(root, "tests/seo-output.test.mjs")), true, "static SEO output check should exist");
  });

  it("runs a pnpm-only CI quality gate", () => {
    const workflow = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8");
    for (const command of [
      "pnpm install --frozen-lockfile",
      "pnpm test",
      "pnpm build",
      "pnpm check:links",
      "pnpm check:seo"
    ]) {
      assert.match(workflow, new RegExp(command.replaceAll(" ", "\\s+")), `CI should run ${command}`);
    }

    for (const forbiddenLockfile of ["package-lock.json", "yarn.lock", "bun.lock", "bun.lockb"]) {
      assert.match(workflow, new RegExp(forbiddenLockfile.replace(".", "\\.")), `CI should reject ${forbiddenLockfile}`);
    }

    assert.doesNotMatch(workflow, /(^|\n)\s*run:\s*npm\s+/m, "CI should not use npm run commands");
    assert.doesNotMatch(workflow, /(^|\n)\s*npm\s+(install|ci|run)\b/m, "CI should not use npm shell commands");
    assert.doesNotMatch(workflow, /\bnpx\b/, "CI should not use npx");
    assert.doesNotMatch(workflow, /yarn\s+/, "CI should not use yarn commands");
    assert.doesNotMatch(workflow, /bun\s+/, "CI should not use bun commands");
  });

  it("includes static SEO discovery and social metadata hooks", () => {
    const baseLayout = readFileSync(join(root, "src/components/layout/BaseLayout.astro"), "utf8");
    assert.match(baseLayout, /robots\?:\s*string/, "BaseLayout should accept optional robots metadata");
    assert.match(baseLayout, /jsonLd\?:/, "BaseLayout should accept optional JSON-LD metadata");
    assert.match(baseLayout, /<meta\s+name="robots"\s+content=\{robots\}/, "BaseLayout should render robots metadata when provided");
    assert.match(baseLayout, /rel="manifest"\s+href="\/site\.webmanifest"/, "BaseLayout should link the web manifest");
    assert.match(baseLayout, /property="og:image"/, "BaseLayout should include an Open Graph image");
    assert.match(baseLayout, /name="twitter:card"\s+content="summary_large_image"/, "BaseLayout should include a summary_large_image card");
    assert.match(baseLayout, /name="twitter:image"/, "BaseLayout should include a Twitter image");
    assert.match(baseLayout, /application\/ld\+json/, "BaseLayout should render JSON-LD scripts");

    const accountPage = readFileSync(join(root, "src/components/pages/AccountPlaceholderPage.astro"), "utf8");
    assert.match(accountPage, /robots="noindex,\s*nofollow"/, "account placeholder pages should be noindex");

    const articleLayout = readFileSync(join(root, "src/components/layout/ArticleLayout.astro"), "utf8");
    assert.match(articleLayout, /relatedArticles\?:/, "ArticleLayout should accept related article links");
    assert.match(articleLayout, /class="related-articles"/, "ArticleLayout should render a related articles section");
    assert.match(articleLayout, /"@type":\s*"Article"/, "ArticleLayout should define Article JSON-LD");
    assert.match(articleLayout, /"@type":\s*"BreadcrumbList"/, "ArticleLayout should define BreadcrumbList JSON-LD");
    assert.match(articleLayout, /jsonLd=\{jsonLd\}/, "ArticleLayout should pass JSON-LD into BaseLayout");

    const articleDetailPage = readFileSync(join(root, "src/components/pages/ArticleDetailPage.astro"), "utf8");
    assert.match(articleDetailPage, /const relatedArticles/, "ArticleDetailPage should compute related articles");
    assert.match(articleDetailPage, /relatedArticles=\{relatedArticles\}/, "ArticleDetailPage should pass related articles into ArticleLayout");

    const placeDetailPage = readFileSync(join(root, "src/components/pages/PlaceDetailPage.astro"), "utf8");
    assert.match(placeDetailPage, /"@type":\s*"LocalBusiness"/, "PlaceDetailPage should define LocalBusiness JSON-LD");
    assert.match(placeDetailPage, /"@type":\s*"BreadcrumbList"/, "PlaceDetailPage should define BreadcrumbList JSON-LD");
    assert.match(placeDetailPage, /jsonLd=\{jsonLd\}/, "PlaceDetailPage should pass JSON-LD into BaseLayout");
  });

  it("configures submit-place as a provider-agnostic static form", () => {
    const envExample = readFileSync(join(root, ".env.example"), "utf8");
    assert.match(envExample, /PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT=/);

    const submitPage = readFileSync(join(root, "src/components/pages/SubmitPlacePage.astro"), "utf8");
    assert.match(submitPage, /PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT/, "SubmitPlacePage should read PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT");
    assert.match(submitPage, /method="POST"/, "submit-place form should use POST");
    assert.match(submitPage, /action=\{formEndpoint\}/, "submit-place form action should use configured endpoint");
    assert.match(submitPage, /name="formName"\s+value="submit-place"/, "submit-place form should include formName hidden field");
    assert.match(submitPage, /name="source"\s+value="tachi-suke"/, "submit-place form should include source hidden field");
    assert.match(submitPage, /name="moderationRequired"\s+value="true"/, "submit-place form should include moderationRequired hidden field");
    assert.match(submitPage, /name="publishDirectly"\s+value="false"/, "submit-place form should include publishDirectly hidden field");
    assert.match(submitPage, /name="locale"\s+value=\{locale\}/, "submit-place form should include current locale hidden field");
    assert.match(submitPage, /name="redirectUrl"\s+value=\{thanksUrl\}/, "submit-place form should include provider-agnostic redirectUrl hidden field");
    assert.match(submitPage, /name="website"/, "submit-place form should include a honeypot field");
    assert.match(submitPage, /class="honeypot-field"/, "honeypot should be visually hidden with a dedicated class");
    assert.match(submitPage, /disabled=\{!formEndpoint\}/, "submit button should be disabled when endpoint is missing");

    for (const requiredField of [
      "submissionLanguage",
      "placeName",
      "category",
      "prefecture",
      "city",
      "googleMapUrl",
      "recommendationReason"
    ]) {
      assert.match(submitPage, new RegExp(`name="${requiredField}"[\\s\\S]*?required`), `${requiredField} should be required`);
    }

    assert.match(submitPage, /name="googleMapUrl"\s+type="url"/, "Google Maps URL should use URL input type");
    assert.match(submitPage, /name="officialUrl"\s+type="url"/, "Official URL should use URL input type");
    assert.match(submitPage, /name="submitterEmail"\s+type="email"/, "Submitter email should use email input type");
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
    for (const plan of mobilePlans) {
      assert.match(plan.officialUrl, /^https:\/\//, `${plan.id} should include an officialUrl`);
      assert.match(plan.lastCheckedAt, /^\d{4}-\d{2}-\d{2}$/, `${plan.id} should include lastCheckedAt as YYYY-MM-DD`);
      assert.ok(plan.sourceNote?.length > 20, `${plan.id} should include a useful sourceNote`);
      assert.ok(Array.isArray(plan.notes) && plan.notes.length >= 2, `${plan.id} should include maintenance notes`);
    }

    const areas = listFiles("src/content/areas", [".json"]).map(readJson);
    assert.ok(areas.length >= 4, "Phase 1B should include at least 4 area guides");
    for (const slug of ["ikebukuro", "itabashi", "akabane", "kagurazaka-edogawabashi"]) {
      assert.ok(areas.some((area) => area.slug === slug), `area guide data should include ${slug}`);
    }
    for (const area of areas) {
      assert.ok(area.title?.length > 4, `${area.id} should include a display title`);
      assert.ok(area.summary?.length > 40, `${area.id} should include an SEO-ready summary`);
      assert.match(area.lastCheckedAt, /^\d{4}-\d{2}-\d{2}$/, `${area.id} should include lastCheckedAt as YYYY-MM-DD`);
      assert.ok(Array.isArray(area.notes) && area.notes.length >= 2, `${area.id} should include area notes`);
    }
  });

  it("keeps article internal links pointed at existing static or generated routes", () => {
    const routeSet = new Set(["/"]);
    for (const locale of locales) {
      for (const route of ["", "/articles", "/areas", "/places", "/mobile", "/tools", "/submit-place", "/submit-place/thanks", "/about", "/account/login", "/account/favorites", "/account/submissions"]) {
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

    for (const mobilePlan of listFiles("src/content/mobile-plans", [".json"]).map(readJson)) {
      for (const locale of locales) {
        routeSet.add(normalizePath(`/${locale}/mobile/${mobilePlan.slug}`));
      }
    }

    for (const area of listFiles("src/content/areas", [".json"]).map(readJson)) {
      for (const locale of locales) {
        routeSet.add(normalizePath(`/${locale}/areas/${area.slug}`));
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

  it("links mobile and area cards to their generated detail pages", () => {
    const mobileCard = readFileSync(join(root, "src/components/mobile/MobilePlanCard.astro"), "utf8");
    assert.match(mobileCard, /localizePath\(locale,\s*`\/mobile\/\$\{slug\}`\)/, "MobilePlanCard should link to mobile detail pages");

    const areasPage = readFileSync(join(root, "src/components/pages/SimpleSectionPage.astro"), "utf8");
    assert.match(areasPage, /localizePath\(locale,\s*`\/areas\/\$\{area\.data\.slug\}`\)/, "area cards should link to area detail pages");
  });
});
