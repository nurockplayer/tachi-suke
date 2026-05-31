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
  "wrangler.toml",
  "tsconfig.json",
  "package.json",
  "pnpm-lock.yaml",
  "public/_headers",
  "public/_redirects",
  "src/pages/index.astro",
  "src/pages/404.astro",
  "src/pages/sitemap.xml.ts",
  "src/pages/robots.txt.ts",
  "src/pages/llms.txt.ts",
  "src/pages/opensearch.xml.ts",
  "src/pages/site.webmanifest.ts",
  "src/pages/feed.xml.ts",
  "src/lib/content/article-categories.ts",
  "src/lib/content/rss.ts",
  "src/lib/content/search.ts",
  "src/content.config.ts",
  "src/components/layout/BaseLayout.astro",
  "src/components/layout/Header.astro",
  "src/components/layout/Footer.astro",
  "src/components/layout/ArticleLayout.astro",
  "src/components/layout/LocaleSwitcher.astro",
  "src/components/navigation/Breadcrumbs.astro",
  "src/components/content/CategoryCard.astro",
  "src/components/content/CorrectionPrompt.astro",
  "src/components/places/PlaceCard.astro",
  "src/components/pages/ArticleDetailPage.astro",
  "src/components/pages/ArticleCategoryPage.astro",
  "src/components/pages/PlaceDetailPage.astro",
  "src/components/pages/MobilePlanDetailPage.astro",
  "src/components/pages/AreaDetailPage.astro",
  "src/components/pages/ToolDetailPage.astro",
  "src/components/pages/SubmitPlaceThanksPage.astro",
  "src/components/pages/ContactPage.astro",
  "src/components/pages/ContactThanksPage.astro",
  "src/components/pages/PolicyPage.astro",
  "src/components/pages/SearchPage.astro",
  "src/components/mobile/MobilePlanCard.astro",
  "src/components/favorites/FavoriteButtonPlaceholder.astro",
  "src/components/auth/LoginPrompt.astro",
  "src/types/locale.ts",
  "src/types/article.ts",
  "src/types/place.ts",
  "src/types/mobile-plan.ts",
  "src/types/area.ts",
  "src/types/tool.ts",
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
  "docs/DATABASE_DESIGN.md",
  "docs/DEPLOYMENT.md"
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
  "articles/category/[category].astro",
  "areas/index.astro",
  "places/index.astro",
  "places/[slug].astro",
  "mobile/index.astro",
  "mobile/[slug].astro",
  "areas/[slug].astro",
  "tools/index.astro",
  "tools/[slug].astro",
  "submit-place.astro",
  "submit-place/thanks.astro",
  "contact.astro",
  "contact/thanks.astro",
  "about.astro",
  "privacy.astro",
  "editorial-policy.astro",
  "feed.xml.ts",
  "search.astro",
  "search-index.json.ts",
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
    assert.equal(packageJson.scripts["check:content"], "node --test tests/content-health.test.mjs");
    assert.equal(packageJson.scripts["check:links"], "node tests/static-html-links.test.mjs");
    assert.equal(packageJson.scripts["check:seo"], "node --test tests/seo-output.test.mjs");
    assert.equal(existsSync(join(root, "tests/content-health.test.mjs")), true, "content health check should exist");
    assert.equal(existsSync(join(root, "tests/static-html-links.test.mjs")), true, "static HTML link crawler should exist");
    assert.equal(existsSync(join(root, "tests/seo-output.test.mjs")), true, "static SEO output check should exist");
  });

  it("runs a pnpm-only CI quality gate", () => {
    const workflow = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8");
    for (const command of [
      "pnpm install --frozen-lockfile",
      "pnpm test",
      "pnpm check:content",
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

  it("documents Cloudflare Pages deployment without committing secrets", () => {
    const wrangler = readFileSync(join(root, "wrangler.toml"), "utf8");
    assert.match(wrangler, /^name\s*=\s*"tachi-suke"/m, "wrangler.toml should name the Pages project");
    assert.match(wrangler, /^compatibility_date\s*=\s*"\d{4}-\d{2}-\d{2}"/m, "wrangler.toml should set a compatibility date");
    assert.match(wrangler, /^pages_build_output_dir\s*=\s*"\.\/dist"/m, "wrangler.toml should point Pages at dist");
    assert.doesNotMatch(wrangler, /account_id|api_token|CLOUDFLARE_API_TOKEN|secret/i, "wrangler.toml must not contain secrets");

    const deploymentDocs = readFileSync(join(root, "docs/DEPLOYMENT.md"), "utf8");
    for (const term of ["Cloudflare Pages", "pnpm build", "dist", "SITE_URL", "PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT"]) {
      assert.match(deploymentDocs, new RegExp(term.replaceAll("/", "\\/")), `deployment docs should mention ${term}`);
    }
    assert.doesNotMatch(deploymentDocs, /CLOUDFLARE_API_TOKEN=.*[A-Za-z0-9_-]{16,}/, "deployment docs should not include a real API token");

    const redirects = readFileSync(join(root, "public/_redirects"), "utf8");
    assert.match(redirects, /^\/articles\s+\/en\/articles\s+302/m, "_redirects should send locale-less articles to English");
    assert.match(redirects, /^\/mobile\/\*\s+\/en\/mobile\/:splat\s+302/m, "_redirects should preserve mobile plan slugs");
    assert.match(redirects, /^\/contact\s+\/en\/contact\s+302/m, "_redirects should send locale-less contact to English");
    assert.doesNotMatch(redirects, /\/account/, "_redirects should not expose account placeholder fallbacks");
  });

  it("includes static SEO discovery and social metadata hooks", () => {
    const baseLayout = readFileSync(join(root, "src/components/layout/BaseLayout.astro"), "utf8");
    assert.match(baseLayout, /robots\?:\s*string/, "BaseLayout should accept optional robots metadata");
    assert.match(baseLayout, /jsonLd\?:/, "BaseLayout should accept optional JSON-LD metadata");
    assert.match(baseLayout, /<meta\s+name="robots"\s+content=\{robots\}/, "BaseLayout should render robots metadata when provided");
    assert.match(baseLayout, /rel="manifest"\s+href="\/site\.webmanifest"/, "BaseLayout should link the web manifest");
    assert.match(baseLayout, /rel="search"[\s\S]*application\/opensearchdescription\+xml/, "BaseLayout should expose OpenSearch discovery");
    assert.match(baseLayout, /href=\{new URL\("\/opensearch\.xml",\s*site\)\.href\}/, "BaseLayout should link the OpenSearch description");
    assert.match(baseLayout, /"@type":\s*"SearchAction"/, "WebSite JSON-LD should expose a SearchAction");
    assert.match(baseLayout, /\/en\/search\?q=\{search_term_string\}/, "SearchAction should target the stable English static search route");
    assert.match(baseLayout, /"query-input":\s*"required name=search_term_string"/, "SearchAction should describe the query input");
    assert.match(baseLayout, /name="theme-color"/, "BaseLayout should include theme-color metadata");
    assert.match(baseLayout, /name="application-name"\s+content="TachiSuke"/, "BaseLayout should include application-name metadata");
    assert.match(baseLayout, /name="apple-mobile-web-app-title"\s+content="TachiSuke"/, "BaseLayout should include Apple app title metadata");
    assert.match(baseLayout, /name="format-detection"/, "BaseLayout should include format-detection metadata");
    assert.match(baseLayout, /href=\{new URL\(localizePath\(locale,\s*"\/feed\.xml"\),\s*site\)\.href\}/, "BaseLayout should link the current locale RSS feed");
    assert.match(baseLayout, /property="og:image"/, "BaseLayout should include an Open Graph image");
    assert.match(baseLayout, /name="twitter:card"\s+content="summary_large_image"/, "BaseLayout should include a summary_large_image card");
    assert.match(baseLayout, /name="twitter:image"/, "BaseLayout should include a Twitter image");
    assert.match(baseLayout, /application\/ld\+json/, "BaseLayout should render JSON-LD scripts");

    const accountPage = readFileSync(join(root, "src/components/pages/AccountPlaceholderPage.astro"), "utf8");
    assert.match(accountPage, /robots="noindex,\s*nofollow"/, "account placeholder pages should be noindex");

    const notFoundPage = readFileSync(join(root, "src/pages/404.astro"), "utf8");
    assert.match(notFoundPage, /robots="noindex,\s*nofollow"/, "custom 404 page should be noindex");
    assert.match(notFoundPage, /localizePath\(locale\)/, "custom 404 page should link to locale home pages");

    const llms = readFileSync(join(root, "src/pages/llms.txt.ts"), "utf8");
    assert.match(llms, /APIRoute/, "llms.txt should be generated by an Astro endpoint");
    assert.match(llms, /Content-Type":\s*"text\/plain;\s*charset=utf-8"/, "llms.txt should render as plain text");
    assert.match(llms, /TachiSuke/, "llms.txt should identify the site");
    assert.match(llms, /sitemap\.xml/, "llms.txt should link to the sitemap");
    assert.match(llms, /feed\.xml/, "llms.txt should link to RSS feeds");
    assert.match(llms, /search-index\.json/, "llms.txt should link to static search index surfaces");
    assert.match(llms, /account/i, "llms.txt should document that account placeholders are not discovery targets");

    const opensearch = readFileSync(join(root, "src/pages/opensearch.xml.ts"), "utf8");
    assert.match(opensearch, /APIRoute/, "opensearch.xml should be generated by an Astro endpoint");
    assert.match(opensearch, /application\/opensearchdescription\+xml;\s*charset=utf-8/, "opensearch.xml should render with the OpenSearch content type");
    assert.match(opensearch, /OpenSearchDescription/, "opensearch.xml should generate an OpenSearchDescription document");
    assert.match(opensearch, /\/en\/search\?q=\{searchTerms\}/, "opensearch.xml should point at the stable English search route");

    const articleLayout = readFileSync(join(root, "src/components/layout/ArticleLayout.astro"), "utf8");
    assert.match(articleLayout, /Breadcrumbs/, "ArticleLayout should render visible breadcrumbs");
    assert.match(articleLayout, /headings\?:/, "ArticleLayout should accept rendered article headings");
    assert.match(articleLayout, /class="article-toc"/, "ArticleLayout should render an article table of contents");
    assert.match(articleLayout, /relatedArticles\?:/, "ArticleLayout should accept related article links");
    assert.match(articleLayout, /class="related-articles"/, "ArticleLayout should render a related articles section");
    assert.match(articleLayout, /"@type":\s*"Article"/, "ArticleLayout should define Article JSON-LD");
    assert.match(articleLayout, /"@type":\s*"BreadcrumbList"/, "ArticleLayout should define BreadcrumbList JSON-LD");
    assert.match(articleLayout, /jsonLd=\{jsonLd\}/, "ArticleLayout should pass JSON-LD into BaseLayout");

    const articleDetailPage = readFileSync(join(root, "src/components/pages/ArticleDetailPage.astro"), "utf8");
    assert.match(articleDetailPage, /const\s+\{\s*Content,\s*headings\s*\}\s*=\s*await render\(article\)/, "ArticleDetailPage should read rendered headings");
    assert.match(articleDetailPage, /headings=\{headings\}/, "ArticleDetailPage should pass headings into ArticleLayout");
    assert.match(articleDetailPage, /const relatedArticles/, "ArticleDetailPage should compute related articles");
    assert.match(articleDetailPage, /relatedArticles=\{relatedArticles\}/, "ArticleDetailPage should pass related articles into ArticleLayout");

    const placeDetailPage = readFileSync(join(root, "src/components/pages/PlaceDetailPage.astro"), "utf8");
    assert.match(placeDetailPage, /Breadcrumbs/, "PlaceDetailPage should render visible breadcrumbs");
    assert.match(placeDetailPage, /"@type":\s*"LocalBusiness"/, "PlaceDetailPage should define LocalBusiness JSON-LD");
    assert.match(placeDetailPage, /"@type":\s*"BreadcrumbList"/, "PlaceDetailPage should define BreadcrumbList JSON-LD");
    assert.match(placeDetailPage, /jsonLd=\{jsonLd\}/, "PlaceDetailPage should pass JSON-LD into BaseLayout");

    const categoryPage = readFileSync(join(root, "src/components/pages/ArticleCategoryPage.astro"), "utf8");
    assert.match(categoryPage, /Breadcrumbs/, "ArticleCategoryPage should render visible breadcrumbs");
    assert.match(categoryPage, /"@type":\s*"WebPage"/, "ArticleCategoryPage should define WebPage JSON-LD");
    assert.match(categoryPage, /"@type":\s*"BreadcrumbList"/, "ArticleCategoryPage should define BreadcrumbList JSON-LD");

    for (const [file, label] of [
      ["src/components/pages/MobilePlanDetailPage.astro", "MobilePlanDetailPage"],
      ["src/components/pages/AreaDetailPage.astro", "AreaDetailPage"],
      ["src/components/pages/ToolDetailPage.astro", "ToolDetailPage"]
    ]) {
      const source = readFileSync(join(root, file), "utf8");
      assert.match(source, /Breadcrumbs/, `${label} should render visible breadcrumbs`);
      assert.match(source, /"@type":\s*"BreadcrumbList"/, `${label} should keep BreadcrumbList JSON-LD`);
    }
  });

  it("includes dependency-free static search routes and source filters", () => {
    const i18n = readFileSync(join(root, "src/lib/i18n/index.ts"), "utf8");
    assert.match(i18n, /href:\s*"\/search"/, "primary navigation should link to locale search");

    const searchPage = readFileSync(join(root, "src/components/pages/SearchPage.astro"), "utf8");
    assert.match(searchPage, /robots="noindex,\s*follow"/, "search pages should be noindex utility pages");
    assert.match(searchPage, /data-search-root/, "SearchPage should expose a stable client-side root");
    assert.match(searchPage, /data-search-input/, "SearchPage should expose a query input");
    assert.match(searchPage, /data-search-results/, "SearchPage should expose a result container");
    assert.match(searchPage, /search-index\.json/, "SearchPage should point to the static locale search index");
    assert.match(searchPage, /type="search"/, "SearchPage query field should use search input behavior");
    assert.match(searchPage, /role="search"/, "SearchPage should render a search form landmark");
    assert.match(searchPage, /method="get"/, "SearchPage should use GET query behavior");
    assert.match(searchPage, /data-search-form/, "SearchPage should expose a stable form hook");
    assert.match(searchPage, /new URLSearchParams\(window\.location\.search\)/, "SearchPage should read the initial q query parameter");
    assert.match(searchPage, /history\.replaceState/, "SearchPage should sync query input back to the URL");

    const searchHelper = readFileSync(join(root, "src/lib/content/search.ts"), "utf8");
    assert.match(searchHelper, /export async function getSearchEntries/, "search helper should expose getSearchEntries");
    assert.match(searchHelper, /getCollection\("articles"[\s\S]*!data\.draft/, "search should include only non-draft articles");
    assert.match(searchHelper, /getCollection\("places"[\s\S]*data\.status === "published"/, "search should include only published places");
    assert.match(searchHelper, /getCollection\("tools"[\s\S]*data\.status === "published"/, "search should include only published tools");
    for (const type of ["article", "place", "mobile_plan", "area", "tool"]) {
      assert.match(searchHelper, new RegExp(`["']${type}["']`), `search index should support ${type} entries`);
    }
  });

  it("includes static article category pages linked from article surfaces", () => {
    const categoryHelper = readFileSync(join(root, "src/lib/content/article-categories.ts"), "utf8");
    assert.match(categoryHelper, /export function slugifyArticleCategory/, "category helper should expose a stable category slugifier");
    assert.match(categoryHelper, /export async function getArticleCategoryStaticPaths/, "category helper should expose category static paths");
    assert.match(categoryHelper, /getCollection\("articles"[\s\S]*!data\.draft/, "category helper should use only non-draft articles");
    assert.match(categoryHelper, /transportation/, "category helper should include localized transportation category copy");
    assert.match(categoryHelper, /procedures/, "category helper should include localized procedures category copy");

    const categoryPage = readFileSync(join(root, "src/components/pages/ArticleCategoryPage.astro"), "utf8");
    assert.match(categoryPage, /slugifyArticleCategory/, "ArticleCategoryPage should use category slugs");
    assert.match(categoryPage, /getCollection\("articles"[\s\S]*!article\.data\.draft/, "ArticleCategoryPage should render only non-draft articles");
    assert.match(categoryPage, /localizePath\(locale,\s*`\/articles\/\$\{article\.data\.slug\}`\)/, "ArticleCategoryPage should link to article details");
    assert.match(categoryPage, /"@type":\s*"ItemList"/, "ArticleCategoryPage should define ItemList JSON-LD");
    assert.match(categoryPage, /numberOfItems:\s*articles\.length/, "ArticleCategoryPage should set ItemList numberOfItems from rendered articles");
    assert.match(categoryPage, /itemListElement:\s*articles\.map/, "ArticleCategoryPage should map visible articles into ItemList entries");

    const articlesIndex = readFileSync(join(root, "src/components/pages/ArticlesIndexPage.astro"), "utf8");
    assert.match(articlesIndex, /getArticleCategorySummaries/, "articles index should show category entry links");
    assert.match(articlesIndex, /`\/articles\/category\/\$\{category\.slug\}`/, "articles index should link to category pages");

    const articleLayout = readFileSync(join(root, "src/components/layout/ArticleLayout.astro"), "utf8");
    assert.match(articleLayout, /slugifyArticleCategory/, "article detail layout should compute category href");
    assert.match(articleLayout, /`\/articles\/category\/\$\{slugifyArticleCategory\(category\)\}`/, "article detail category should link to category page");

    const sitemap = readFileSync(join(root, "src/pages/sitemap.xml.ts"), "utf8");
    assert.match(sitemap, /getArticleCategorySummaries/, "sitemap should include article category pages");
  });

  it("includes baseline keyboard accessibility hooks", () => {
    const baseLayout = readFileSync(join(root, "src/components/layout/BaseLayout.astro"), "utf8");
    assert.match(baseLayout, /class="skip-link"\s+href="#main-content"/, "BaseLayout should render a skip link");
    assert.match(baseLayout, /<main\s+id="main-content"\s+class="site-main"/, "main landmark should have a stable skip target");
    assert.match(baseLayout, /getUiCopy\(locale,\s*"layout\.skipMain"\)/, "skip link copy should come from the shared i18n helper");

    const header = readFileSync(join(root, "src/components/layout/Header.astro"), "utf8");
    assert.match(header, /aria-current=\{[^}]*isActive/, "Header nav should mark the active section");
    assert.match(header, /localizePath\(locale,\s*item\.href\)/, "Header nav should keep locale-aware hrefs");

    const i18n = readFileSync(join(root, "src/lib/i18n/index.ts"), "utf8");
    assert.match(i18n, /export function getUiCopy/, "i18n helper should expose fallback-aware UI copy lookup");
    assert.match(i18n, /"layout\.skipMain"/, "skip link translation key should live in i18n copy");

    const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
    assert.match(css, /\.skip-link/, "global CSS should style the skip link");
    assert.match(css, /:focus-visible/, "global CSS should define visible focus styles");

    const accessibilityPlan = readFileSync(
      join(root, "docs/superpowers/plans/2026-06-01-phase-1l-accessibility-polish.md"),
      "utf8"
    );
    assert.doesNotMatch(accessibilityPlan, /^### Task/m, "accessibility plan should not skip heading levels");
  });

  it("includes public launch trust pages in locale routes and footer navigation", () => {
    const footer = readFileSync(join(root, "src/components/layout/Footer.astro"), "utf8");
    assert.match(footer, /localizePath\(locale,\s*"\/privacy"\)/, "Footer should link to privacy pages");
    assert.match(footer, /localizePath\(locale,\s*"\/editorial-policy"\)/, "Footer should link to editorial policy pages");
    assert.match(footer, /localizePath\(locale,\s*"\/contact"\)/, "Footer should link to contact/corrections pages");

    const sitemap = readFileSync(join(root, "src/pages/sitemap.xml.ts"), "utf8");
    assert.match(sitemap, /"\/privacy"/, "sitemap should include privacy pages");
    assert.match(sitemap, /"\/editorial-policy"/, "sitemap should include editorial policy pages");
    assert.match(sitemap, /"\/contact"/, "sitemap should include contact/corrections pages");
    assert.match(sitemap, /"\/contact\/thanks"/, "sitemap should include contact thanks pages");
    assert.match(sitemap, /path:\s*"\/feed\.xml"/, "sitemap should include the global RSS feed");
    assert.match(sitemap, /newestArticleUpdatedAt/, "sitemap should compute a global feed lastmod from public articles");
    assert.match(sitemap, /newestArticleUpdatedAtByLocale/, "sitemap should compute locale feed lastmod from same-locale public articles");

    const policyPage = readFileSync(join(root, "src/components/pages/PolicyPage.astro"), "utf8");
    assert.match(policyPage, /kind:\s*"privacy"\s*\|\s*"editorial-policy"/, "PolicyPage should support both trust page types");
    assert.match(policyPage, /submit-place/, "PolicyPage should explain submission-related privacy or moderation");
  });

  it("configures contact/corrections as a provider-agnostic static form", () => {
    const envExample = readFileSync(join(root, ".env.example"), "utf8");
    assert.match(envExample, /PUBLIC_CONTACT_FORM_ENDPOINT=/, ".env.example should document PUBLIC_CONTACT_FORM_ENDPOINT");

    const contactPage = readFileSync(join(root, "src/components/pages/ContactPage.astro"), "utf8");
    assert.match(contactPage, /PUBLIC_CONTACT_FORM_ENDPOINT/, "ContactPage should read PUBLIC_CONTACT_FORM_ENDPOINT");
    assert.match(contactPage, /method="POST"/, "contact form should use POST");
    assert.match(contactPage, /action=\{formEndpoint\}/, "contact form action should use configured endpoint");
    assert.match(contactPage, /name="formName"\s+value="contact-corrections"/, "contact form should include formName hidden field");
    assert.match(contactPage, /name="source"\s+value="tachi-suke"/, "contact form should include source hidden field");
    assert.match(contactPage, /name="locale"\s+value=\{locale\}/, "contact form should include current locale hidden field");
    assert.match(contactPage, /name="redirectUrl"\s+value=\{thanksUrl\}/, "contact form should include provider-agnostic redirectUrl hidden field");
    assert.match(contactPage, /name="publicResponse"\s+value="false"/, "contact form should declare that public response is false");
    assert.match(contactPage, /name="company"/, "contact form should include a honeypot field");
    assert.match(contactPage, /class="honeypot-field"/, "honeypot should be visually hidden with a dedicated class");
    assert.match(contactPage, /disabled=\{!formEndpoint\}/, "submit button should be disabled when endpoint is missing");

    for (const requiredField of ["contactLanguage", "topic", "message"]) {
      assert.match(contactPage, new RegExp(`name="${requiredField}"[\\s\\S]*?required`), `${requiredField} should be required`);
    }

    assert.match(contactPage, /name="relatedUrl"\s+type="url"/, "related page URL should use URL input type");
    assert.match(contactPage, /name="email"\s+type="email"/, "contact email should use email input type");
    assert.match(contactPage, /data-related-url-input/, "related URL input should expose a stable prefill hook");
    assert.match(contactPage, /new URLSearchParams\(window\.location\.search\)/, "contact page should read query parameters");
    assert.match(contactPage, /\.get\("relatedUrl"\)/, "contact page should read the relatedUrl query parameter");
  });

  it("links public detail pages to the contact/corrections workflow", () => {
    const correctionPrompt = readFileSync(join(root, "src/components/content/CorrectionPrompt.astro"), "utf8");
    assert.match(correctionPrompt, /currentPath\?:\s*string/, "CorrectionPrompt should accept an optional currentPath");
    assert.match(correctionPrompt, /new URL\(currentPath/, "CorrectionPrompt should convert currentPath to an absolute URL");
    assert.match(correctionPrompt, /relatedUrl/, "CorrectionPrompt should add relatedUrl to contact links when possible");
    assert.match(correctionPrompt, /encodeURIComponent\(relatedPageUrl\)/, "CorrectionPrompt should encode relatedUrl query values");
    assert.match(correctionPrompt, /localizePath\(locale,\s*"\/contact"\)/, "CorrectionPrompt should link to locale contact pages");
    assert.match(correctionPrompt, /correction-prompt/, "CorrectionPrompt should expose a stable class for styling");

    for (const detailPage of [
      "src/components/layout/ArticleLayout.astro",
      "src/components/pages/PlaceDetailPage.astro",
      "src/components/pages/MobilePlanDetailPage.astro",
      "src/components/pages/AreaDetailPage.astro",
      "src/components/pages/ToolDetailPage.astro"
    ]) {
      const source = readFileSync(join(root, detailPage), "utf8");
      assert.match(source, /CorrectionPrompt/, `${detailPage} should render CorrectionPrompt`);
      assert.match(source, /locale=\{locale\}/, `${detailPage} should pass locale into CorrectionPrompt`);
      assert.match(source, /currentPath=\{Astro\.url\.pathname\}/, `${detailPage} should pass the current public path into CorrectionPrompt`);
    }

    const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
    assert.match(css, /\.correction-prompt/, "global CSS should style CorrectionPrompt");
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

  it("publishes static checklist tools with detail routes", () => {
    const contentConfig = readFileSync(join(root, "src/content.config.ts"), "utf8");
    for (const field of ["lastCheckedAt", "sourceNote", "sourceLinks", "notes", "sections"]) {
      assert.match(contentConfig, new RegExp(field), `tools schema should include ${field}`);
    }

    const publishedTools = listFiles("src/content/tools", [".json"]).map(readJson).filter((tool) => tool.status === "published");
    assert.ok(publishedTools.length >= 4, "Phase 1AF should publish at least four static tools");
    assert.ok(publishedTools.some((tool) => tool.slug === "moving-to-japan-checklist"), "moving checklist should stay published");
    assert.ok(publishedTools.some((tool) => tool.slug === "japan-rent-initial-cost-checklist"), "rent initial cost checklist should be published");
    assert.ok(publishedTools.some((tool) => tool.slug === "ward-office-moving-in-checklist"), "ward office moving-in checklist should be published");
    assert.ok(publishedTools.some((tool) => tool.slug === "commuter-pass-ic-card-checklist"), "commuter pass and IC card checklist should be published");

    const tool = readJson("src/content/tools/moving-checklist.json");
    assert.equal(tool.slug, "moving-to-japan-checklist");
    assert.equal(tool.status, "published");
    assert.match(tool.lastCheckedAt, /^\d{4}-\d{2}-\d{2}$/);
    for (const locale of locales) {
      assert.ok(tool.title[locale], `tool should include ${locale} title`);
      assert.ok(tool.description[locale]?.length > 20, `tool should include ${locale} description`);
      assert.ok(tool.sourceNote[locale]?.length > 20, `tool should include ${locale} source note`);
    }
    assert.ok(Array.isArray(tool.notes) && tool.notes.length >= 2, "tool should include maintenance notes");
    for (const note of tool.notes) {
      for (const locale of locales) {
        assert.ok(note[locale], `tool note should include ${locale} copy`);
      }
    }
    assert.ok(Array.isArray(tool.sections) && tool.sections.length >= 3, "tool should include checklist sections");
    for (const section of tool.sections) {
      for (const locale of locales) {
        assert.ok(section.title[locale], `tool section should include ${locale} title`);
      }
      assert.ok(section.items.length >= 2, "each tool section should include checklist items");
      for (const item of section.items) {
        for (const locale of locales) {
          assert.ok(item[locale], `tool checklist item should include ${locale} copy`);
        }
      }
    }

    const toolsPage = readFileSync(join(root, "src/components/pages/SimpleSectionPage.astro"), "utf8");
    assert.match(toolsPage, /getCollection\("tools"/, "tools index should load tools collection");
    assert.match(toolsPage, /localizePath\(locale,\s*`\/tools\/\$\{tool\.data\.slug\}`\)/, "tools index cards should link to tool detail pages");

    const toolDetailPage = readFileSync(join(root, "src/components/pages/ToolDetailPage.astro"), "utf8");
    assert.match(toolDetailPage, /sourceNote/, "tool detail page should show source note");
    assert.match(toolDetailPage, /sourceLinks/, "tool detail page should render optional official source links");
    assert.match(toolDetailPage, /lastCheckedAt/, "tool detail page should show last checked date");
    assert.match(toolDetailPage, /sections\.map/, "tool detail page should render checklist sections");

    const wardOfficeTool = readJson("src/content/tools/ward-office-moving-in-checklist.json");
    assert.equal(wardOfficeTool.status, "published");
    assert.equal(wardOfficeTool.slug, "ward-office-moving-in-checklist");
    assert.ok(Array.isArray(wardOfficeTool.sourceLinks) && wardOfficeTool.sourceLinks.length >= 2, "ward office tool should link official sources");
    assert.ok(
      wardOfficeTool.sourceLinks.some((source) => source.url.includes("digital.go.jp")),
      "ward office tool should include a Digital Agency source link"
    );
    assert.ok(
      wardOfficeTool.sourceLinks.some((source) => source.url.includes("moj.go.jp")),
      "ward office tool should include an Immigration Services Agency source link"
    );
    for (const locale of locales) {
      assert.ok(wardOfficeTool.title[locale], `ward office tool should include ${locale} title`);
      assert.ok(wardOfficeTool.description[locale]?.length > 30, `ward office tool should include ${locale} description`);
      assert.ok(wardOfficeTool.sourceNote[locale]?.length > 30, `ward office tool should include ${locale} source note`);
    }

    const commuterTool = readJson("src/content/tools/commuter-pass-ic-card-checklist.json");
    assert.equal(commuterTool.status, "published");
    assert.equal(commuterTool.slug, "commuter-pass-ic-card-checklist");
    assert.ok(Array.isArray(commuterTool.sourceLinks) && commuterTool.sourceLinks.length >= 2, "commuter tool should link official sources");
    assert.ok(
      commuterTool.sourceLinks.some((source) => source.url.includes("tokyometro.jp")),
      "commuter tool should include a Tokyo Metro source link"
    );
    assert.ok(
      commuterTool.sourceLinks.some((source) => source.url.includes("pasmo.co.jp")),
      "commuter tool should include a PASMO source link"
    );
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
    assert.ok(articles.length >= 16, "Phase 1AH should include residence administration articles on top of the Phase 1AG baseline");

    const localeCounts = Object.fromEntries(locales.map((locale) => [locale, articles.filter((article) => article.locale === locale).length]));
    assert.ok(localeCounts["zh-tw"] >= 7, "Phase 1AH should include at least 7 zh-tw articles");
    assert.ok(localeCounts.en >= 5, "Phase 1AH should include at least 5 en articles");
    assert.ok(localeCounts.ja >= 2, "Phase 1B should include at least 2 ja articles");
    assert.ok(localeCounts.ko >= 2, "Phase 1B should include at least 2 ko articles");
    assert.ok(articles.some((article) => article.slug === "japan-commuter-pass-ic-card-guide"), "zh-tw commuter pass article should exist");
    assert.ok(articles.some((article) => article.slug === "japan-commuter-pass-ic-card-guide-en"), "English commuter pass article should exist");
    assert.ok(articles.some((article) => article.slug === "residence-card-resident-record-my-number"), "zh-tw residence admin article should exist");
    assert.ok(articles.some((article) => article.slug === "residence-card-resident-record-my-number-en"), "English residence admin article should exist");

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
      for (const route of ["", "/articles", "/areas", "/places", "/mobile", "/tools", "/search", "/submit-place", "/submit-place/thanks", "/about", "/account/login", "/account/favorites", "/account/submissions"]) {
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

    for (const tool of listFiles("src/content/tools", [".json"]).map(readJson)) {
      if (tool.status === "published") {
        for (const locale of locales) {
          routeSet.add(normalizePath(`/${locale}/tools/${tool.slug}`));
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

  it("links mobile and area cards to their generated detail pages", () => {
    const mobileCard = readFileSync(join(root, "src/components/mobile/MobilePlanCard.astro"), "utf8");
    assert.match(mobileCard, /localizePath\(locale,\s*`\/mobile\/\$\{slug\}`\)/, "MobilePlanCard should link to mobile detail pages");

    const areasPage = readFileSync(join(root, "src/components/pages/SimpleSectionPage.astro"), "utf8");
    assert.match(areasPage, /localizePath\(locale,\s*`\/areas\/\$\{area\.data\.slug\}`\)/, "area cards should link to area detail pages");
    assert.match(areasPage, /localizePath\(locale,\s*`\/tools\/\$\{tool\.data\.slug\}`\)/, "tool cards should link to tool detail pages");
  });
});
