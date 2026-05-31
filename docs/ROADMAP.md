# TachiSuke Roadmap

## Phase 1A: Scaffold MVP

Status: completed.

Completed scope:

- Astro + TypeScript static site.
- pnpm-only package setup.
- Locale-prefixed routes for `zh-tw`, `en`, `ja`, and `ko`.
- Four locale homepages.
- Article index and article detail routes.
- Place index and place detail routes.
- Area, mobile, tools, submit-place, about, and account placeholder routes.
- Content collections for articles, areas, places, mobile plans, and tools.
- TypeScript model boundaries for future user, favorite, and submission features.
- Place enum values unified.
- SEO-capable `BaseLayout`.
- `SITE_URL` environment variable strategy.
- Structure tests.
- Static build passing.

Phase 1A intentionally does not include real login, real favorites, real submission handling, Supabase, Postgres, RLS, or moderation admin.

## Phase 1B: Content and SEO MVP

Status: current phase baseline implemented.

Goals:

- Add real decision-oriented articles for mobile plans, renting, first-week setup, administrative procedures, transportation, food, and practical Japanese.
- Expand mobile plan comparison content with update dates, source links, eligibility notes, and practical warnings.
- Add richer area guide content for Tokyo, Osaka, Fukuoka, and other high-intent resident areas.
- Expand food/place content with resident-friendly criteria.
- Improve internal navigation between related articles, places, mobile plans, areas, and tools.
- Add SEO polish such as stronger descriptions, related links, structured content blocks, and possibly schema.org where appropriate.
- Add a build-time route/link crawl test when the static page count increases.

Implemented in the current baseline:

- Added eight more decision-oriented articles, bringing the Phase 1B public article set to twelve pages.
- Added five mobile plan data entries: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile.
- Added four Tokyo area guide samples: Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi.
- Improved the mobile index into a comparison entry with document, payment, data, calling, coverage, and eSIM decision points.
- Improved the area index into a browsable set of area cards.
- Improved place detail pages with generated guidance for fit, situations, watchouts, smoking, and payment.
- Added a conservative Markdown internal-link check to project tests.

Rules:

- Keep content static-first.
- Do not require login for public content.
- Do not add a large CMS yet.
- Keep translation coverage explicit and avoid silently showing the wrong locale.
- Treat mobile plan data as editorial guidance. Users must confirm official carrier pages before applying.

## Phase 1B.5: Content Maintainability and Detail Pages

Status: implemented.

Goal:

Make the static content foundation easier to maintain as mobile plan and area content grows.

Implemented:

- Added mobile plan maintenance fields: `officialUrl`, `lastCheckedAt`, `sourceNote`, and `notes`.
- Added area maintenance fields: `title`, `summary`, `lastCheckedAt`, and `notes`.
- Added mobile plan detail routes at `/[locale]/mobile/[slug]`.
- Added area detail routes at `/[locale]/areas/[slug]`.
- Linked mobile plan cards, area cards, homepage start-here links, and relevant articles to generated detail routes.
- Added `pnpm check:links` for post-build static HTML root-relative link checks.
- Updated locale switcher behavior so detail pages do not link to missing article translations.

Rules:

- Continue to treat mobile plan information as date-sensitive editorial guidance.
- Continue to treat area information as periodically reviewed guidance, not live rent or real-estate data.
- Keep the site static-first and avoid auth/database work until Phase 2.
- `pnpm check:links` requires a fresh `pnpm build` first.

## Phase 1C: Submission Workflow MVP

Status: implemented as a static-site friendly external endpoint workflow, still no login required.

Goal:

Enable a lightweight way for users to recommend useful places while keeping moderation mandatory.

Implemented:

- `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` controls whether the static form can submit.
- Endpoint unset means preview mode with disabled submit.
- Endpoint set means the form posts with `method="POST"` to the configured external endpoint.
- Four locale thanks pages at `/[locale]/submit-place/thanks`.
- Provider-agnostic hidden fields for classification and moderation metadata.
- A visually hidden `website` honeypot field for basic spam reduction.

Rules:

- Submissions must not publish directly.
- Submissions must require review before becoming public.
- Submitter email must remain private.
- Avoid unnecessary personal data.
- Raw submission data should be normalized before it becomes a Place entry.
- Account login is still not required in this phase unless the project explicitly changes scope.
- The form provider is not hard-coded. It can be Formspree, Netlify Forms, Cloudflare Workers, or a future custom API.
- Honeypot is basic spam reduction only, not complete abuse prevention.

Operational decisions still needed:

- Which external endpoint provider to configure in deployment.
- Who receives moderation notifications.
- Whether anonymous submissions are allowed.
- Whether provider-specific redirect field mapping is required instead of `redirectUrl`.
- How approved submissions become public static content.

## Phase 1D: SEO and Launch Readiness

Status: implemented.

Goal:

Make the static MVP easier to crawl, preview, and deploy on Cloudflare Pages.

Implemented:

- Generated `sitemap.xml` from static routes and content collections.
- Generated `robots.txt` with sitemap reference and account placeholder disallow rules.
- Generated `site.webmanifest` with TachiSuke brand metadata.
- Default Open Graph image and Twitter summary metadata.
- Account placeholder pages marked `noindex, nofollow`.
- Cloudflare Pages `_headers` for conservative security and cache defaults.
- `pnpm check:seo` for post-build SEO output verification.

Rules:

- Keep Astro as the frontend stack while the product is content-first and static-first.
- Use Cloudflare Pages as the preferred Phase 1 deployment target.
- Set `SITE_URL` to the production domain before launch.
- Do not migrate to Next.js until SSR/account/personalization requirements are concrete.

## Phase 1E: Structured Data

Status: implemented.

Goal:

Help search engines understand site identity, article detail pages, place detail pages, and route hierarchy without adding runtime dependencies.

Implemented:

- `BaseLayout` support for page-specific JSON-LD.
- Site-wide `Organization` and `WebSite` JSON-LD.
- Article detail `Article` and `BreadcrumbList` JSON-LD.
- Place detail `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Post-build SEO tests that parse representative built HTML pages.

Rules:

- Do not invent ratings, review counts, opening hours, offers, or exact street addresses.
- Use only fields already present in the static content model.
- Add structured data for area and mobile plan detail pages only after deciding the correct schema types.

## Phase 1F: CI Quality Gate

Status: implemented.

Goal:

Make pull requests prove the same checks that are required locally before merge.

Implemented:

- GitHub Actions workflow at `.github/workflows/ci.yml`.
- Pull request and `main` push triggers.
- Forbidden lockfile rejection.
- `pnpm install --frozen-lockfile`.
- `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- Source tests that keep the CI workflow pnpm-only.

Rules:

- CI verifies quality but does not deploy to Cloudflare Pages yet.
- Cloudflare deployment settings and secrets should be configured separately.
- Do not add deployment credentials to the repo.

## Phase 1G: Related Content Navigation

Status: implemented.

Goal:

Improve article reading flow and internal linking without adding search or personalization.

Implemented:

- Article detail pages compute related articles at build time.
- Related articles are limited to the same locale and non-draft entries.
- Ranking prefers same category, shared tags, and recent updates.
- Article pages render up to three related guide links after the article body.
- Build-output SEO tests verify representative related links.

Rules:

- Do not use analytics, login state, or personalization in Phase 1.
- Do not link to draft articles or other locales as related content.
- Broaden related navigation to places, areas, and mobile plans only after content volume grows.

## Phase 1H: Static Tools and Checklists

Status: implemented.

Goal:

Turn the tools section from a placeholder entry page into a static, SEO-friendly tool surface without adding auth, persistence, or runtime dependencies.

Implemented:

- Expanded the `tools` content collection with localized `title`, `description`, `sourceNote`, `notes`, checklist `sections`, and `lastCheckedAt`.
- Added tool detail routes at `/[locale]/tools/[slug]`.
- Added the first published tool, `moving-to-japan-checklist`.
- Linked tools index cards to generated detail pages.
- Added published tool detail routes to sitemap and source/build-output checks.

Rules:

- Tool detail pages are generated only for `status = published` tools.
- Checklist progress is not saved in Phase 1.
- Do not add database-backed tool state until auth and persistence are explicitly scoped.
- Keep tool content practical, date-aware, and decision-oriented.

## Phase 1I: Detail Page Structured Data

Status: implemented.

Goal:

Improve crawl clarity for static detail pages that are not articles or places.

Implemented:

- Mobile plan detail pages emit conservative `Service` and `BreadcrumbList` JSON-LD.
- Area detail pages emit conservative `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail pages emit conservative `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- Build-output SEO tests parse representative generated pages.

Rules:

- Do not add `Offer` price markup for mobile plans until pricing review workflows are mature.
- Do not invent ratings, reviews, coordinates, opening hours, or exact addresses.
- Keep JSON-LD backed by current static content fields.

## Phase 1J: RSS Feed

Status: implemented.

Goal:

Make public articles easier to discover through feed readers, crawlers, and external automation.

Implemented:

- Static `/feed.xml` endpoint generated from non-draft articles.
- RSS 2.0 channel metadata for TachiSuke.
- RSS items with absolute article URLs, descriptions, categories, publish dates, and per-item language metadata.
- RSS alternate link in `BaseLayout`.
- Build-output SEO tests for feed generation and discovery link.

Rules:

- The Phase 1J feed is global across all locales.
- Draft articles must not appear in the feed.
- Locale-specific feeds are handled by Phase 1R.

## Phase 1K: Cloudflare Deploy Readiness

Status: implemented.

Goal:

Make static deployment to Cloudflare Pages explicit and repeatable without committing credentials.

Implemented:

- Minimal `wrangler.toml` with project name, compatibility date, and `pages_build_output_dir = "./dist"`.
- Deployment guide at `docs/DEPLOYMENT.md`.
- Source-level tests for deployment config, docs, and secret-free configuration.

Rules:

- Cloudflare credentials, API tokens, account IDs, and production-only values must not be committed.
- Use Cloudflare Pages dashboard settings or a trusted environment for `SITE_URL` and optional form endpoint configuration.
- Do not add Workers/Functions runtime code unless a future phase explicitly scopes it.

## Phase 1L: Accessibility Polish

Status: implemented.

Goal:

Improve baseline keyboard and assistive-technology navigation without adding dependencies or redesigning the UI.

Implemented:

- Skip link to main content.
- Stable `main` landmark target.
- Active primary navigation state with `aria-current`.
- Visible `:focus-visible` styles.
- Source-level tests for accessibility hooks.

Rules:

- Treat this as baseline polish, not a complete WCAG audit.
- Keep future accessibility work practical: forms, reading flow, contrast, language metadata, and keyboard interaction should be checked as content and UI grow.

## Phase 1M: Launch Trust Pages

Status: implemented.

Goal:

Add public static trust pages that explain privacy posture, editorial boundaries, and moderation rules before launch.

Implemented:

- Four locale privacy pages at `/[locale]/privacy`.
- Four locale editorial policy pages at `/[locale]/editorial-policy`.
- Shared `PolicyPage` component for static localized trust content.
- Footer links to privacy and editorial policy pages.
- Sitemap inclusion for public trust pages.
- Tests for route presence, footer links, sitemap output, and trust page HTML.

Rules:

- Keep these pages static and informational in Phase 1.
- Do not imply that auth, database-backed submissions, analytics, or legal-reviewed production privacy workflows already exist.
- Before adding login, analytics, or personal-data persistence, replace launch-readiness copy with a fuller privacy/legal review.

## Phase 1N: Rent Initial Cost Tool

Status: implemented.

Goal:

Expand static tools with a practical rental initial-cost checklist for users evaluating Japan apartments.

Implemented:

- Added the second published static tool, `japan-rent-initial-cost-checklist`.
- Covered common rent initial cost categories such as deposit, key money, agency fee, advance rent, management fee, guarantor company fee, fire insurance, and lock change.
- Added localized copy for `zh-tw`, `en`, `ja`, and `ko`.
- Added source-level and SEO-output tests for multiple published tools and the rent-cost detail page.

Rules:

- Keep the tool static and decision-oriented.
- Do not present common fee categories as universal rules or fixed prices.
- Do not save checklist state in Phase 1.

## Phase 1O: Contact and Corrections Workflow

Status: implemented.

Goal:

Add a public static channel for readers to report outdated information, broken links, unclear content, and general feedback without adding a backend.

Implemented:

- Four locale contact pages at `/[locale]/contact`.
- Four locale contact thanks pages at `/[locale]/contact/thanks`.
- `PUBLIC_CONTACT_FORM_ENDPOINT` controls form activation.
- Endpoint unset keeps the form in preview mode with disabled submit.
- Endpoint set posts the form to the configured external endpoint with `method="POST"`.
- Provider-agnostic hidden fields and a visually hidden honeypot field.
- Footer and sitemap links for contact/corrections pages.
- Source-level and SEO-output tests for contact routes and build output.

Rules:

- Do not hard-code a specific form provider.
- Do not store contact messages in the repo.
- Do not imply a support backend, CRM, or guaranteed individual replies in Phase 1.
- Keep email optional/private and avoid sensitive personal data.

## Phase 1P: Detail Page Correction Prompts

Status: implemented.

Goal:

Make the contact/corrections workflow discoverable from the content that is most likely to become stale.

Implemented:

- Reusable `CorrectionPrompt` component.
- Localized correction prompt copy for `zh-tw`, `en`, `ja`, and `ko`.
- Prompt appears on article, place, mobile plan, area, and tool detail pages.
- Prompt links to `/[locale]/contact`.
- Source-level tests verify detail pages render the prompt.

Rules:

- Keep prompts static and lightweight.
- Do not add analytics, account-based reporting, database-backed queues, or provider-specific behavior in Phase 1.
- Do not imply that individual replies or real-time content updates are guaranteed.

## Phase 1Q: Custom Static 404

Status: implemented.

Goal:

Give static-hosted missing routes a branded recovery page instead of a generic platform error.

Implemented:

- `src/pages/404.astro` generates `dist/404.html`.
- The page is marked `noindex, nofollow`.
- The page links to all locale homepages and key English recovery sections.
- SEO-output tests verify `404.html` exists and stays out of the sitemap.

Rules:

- Keep the 404 page static.
- Do not add language-detection redirects, Cloudflare Workers, analytics, or error tracking in Phase 1.

## Phase 1R: Locale RSS Feeds

Status: implemented.

Goal:

Let readers and feed tooling subscribe to one TachiSuke language without removing the global multilingual feed.

Implemented:

- Shared RSS rendering helper in `src/lib/content/rss.ts`.
- Existing global `/feed.xml` preserved.
- Four locale RSS endpoints: `/zh-tw/feed.xml`, `/en/feed.xml`, `/ja/feed.xml`, and `/ko/feed.xml`.
- Locale feeds include only same-locale, non-draft articles.
- `BaseLayout` advertises both global and current-locale RSS alternate links.
- `sitemap.xml` includes locale feed paths.
- Source-level and build-output SEO tests verify route files, alternate links, sitemap entries, and representative feed contents.

Rules:

- Keep RSS generation static.
- Do not include draft articles.
- Do not add per-category feeds, pagination, or runtime feed generation until article volume makes it useful.

## Phase 1S: Static Search

Status: implemented.

Goal:

Let users find public TachiSuke content across content types without adding a backend or hosted search service.

Implemented:

- Static search pages at `/[locale]/search`.
- Static search index JSON endpoints at `/[locale]/search-index.json`.
- Shared search index helper in `src/lib/content/search.ts`.
- Primary navigation links to search in all supported locales.
- Search indexes include public articles, places, mobile plans, area guides, and tools.
- Search pages are `noindex, follow` and excluded from `sitemap.xml`.
- Search pages support shareable GET query URLs with `q`, such as `/en/search?q=Denny`.
- Source-level and build-output SEO tests verify route presence, public-only filtering, and sitemap exclusion.

Rules:

- Keep Phase 1 search dependency-free and static.
- Keep search query URLs noindex and client-side only.
- Do not add database search, hosted search, analytics, personalization, typo tolerance, or semantic search until content volume and product needs justify a new phase.
- Do not index account placeholders, drafts, non-published content, or private data.

## Phase 1T: Article Category Landing Pages

Status: implemented.

Goal:

Expose article categories as static, indexable landing pages for higher-intent SEO and clearer article browsing.

Implemented:

- Category routes at `/[locale]/articles/category/[category]`.
- Shared category slug/summary helper in `src/lib/content/article-categories.ts`.
- Article category pages generated only from non-draft same-locale articles.
- Article index pages link to category landing pages.
- Article detail category labels link to the matching category page.
- `sitemap.xml` includes category pages with `lastmod` from the newest article update in each category.
- Source-level and build-output tests verify route files, links, sitemap entries, and same-locale public filtering.

Rules:

- Do not generate empty categories.
- Do not add tag pages until article volume justifies them.
- Keep category pages static and content-first.

## Phase 1U: Visible Breadcrumbs

Status: implemented.

Goal:

Make nested public pages easier to scan and navigate while keeping structured data aligned with visible route hierarchy.

Implemented:

- Shared `Breadcrumbs` component with locale-aware aria labels.
- Visible breadcrumbs on article detail pages.
- Visible breadcrumbs on article category landing pages.
- Visible breadcrumbs on place, mobile plan, area, and tool detail pages.
- Article detail JSON-LD now includes the article category page in its breadcrumb trail.
- Article category pages emit conservative `WebPage` and `BreadcrumbList` JSON-LD.
- Source-level and build-output SEO tests verify breadcrumb component usage and representative rendered HTML.

Rules:

- Breadcrumbs link only to existing public parent routes.
- The current page breadcrumb item is not a link and uses `aria-current="page"`.
- Keep visible breadcrumb trails and JSON-LD breadcrumb trails aligned.

## Phase 1V: Article Table of Contents

Status: implemented.

Goal:

Improve long-form article readability with static, dependency-free in-page navigation.

Implemented:

- `ArticleDetailPage` passes Astro-rendered Markdown/MDX headings into `ArticleLayout`.
- `ArticleLayout` renders a locale-aware table of contents for useful H2/H3 heading sets.
- TOC links point to generated same-page heading anchors.
- Mobile-first styling keeps the TOC compact before the article body.
- Source-level and build-output SEO tests verify TOC wiring and representative generated anchors.

Rules:

- Keep TOC generation static and dependency-free.
- Do not add scroll spy, saved reading progress, analytics, or personalization in Phase 1.
- TOC links must remain same-page anchors generated from article headings.

## Phase 1W: Content Health Check

Status: implemented.

Goal:

Prevent malformed static content from shipping as the editorial surface grows.

Implemented:

- `tests/content-health.test.mjs`.
- `pnpm check:content`.
- CI runs `pnpm check:content` before `pnpm build`.
- Checks article IDs, slugs, published/updated dates, and HTTPS external Markdown links.
- Checks JSON collection IDs, slugs, `lastCheckedAt`, place created/updated dates, stored URL fields, and accidental `undefined` placeholder strings.

Rules:

- Keep the check dependency-free.
- Do not fetch external URLs in CI.
- Do not treat this as live price, campaign, opening-hours, or provider-term validation.

## Phase 1X: Browser Metadata

Status: implemented.

Goal:

Polish static launch metadata for browsers and mobile surfaces.

Implemented:

- `theme-color` metadata in `BaseLayout`.
- `application-name` metadata in `BaseLayout`.
- `apple-mobile-web-app-title` metadata in `BaseLayout`.
- `format-detection` metadata in `BaseLayout`.
- Source-level and build-output tests for representative generated HTML.

Rules:

- Keep Phase 1 static and lightweight.
- Do not add a service worker, install prompt, or PWA runtime until that is explicitly scoped.

## Phase 1Z: Contact Related URL Prefill

Status: implemented.

Goal:

Make content correction reports easier to triage by carrying the current detail-page URL into the contact/corrections form.

Implemented:

- `CorrectionPrompt` accepts the current public path.
- Public article, place, mobile plan, area, and tool detail pages pass `Astro.url.pathname` into the correction prompt.
- Prompt links include `/[locale]/contact?relatedUrl=...` with an encoded absolute site URL.
- Contact/corrections pages prefill the optional related URL field from `relatedUrl` using browser-side progressive enhancement.
- Source-level and build-output SEO tests verify the prompt link and prefill hook.

Rules:

- Keep the workflow static-first and provider-agnostic.
- Do not add analytics, backend triage, database-backed messages, or guaranteed replies in Phase 1.
- The prefilled URL remains user-editable and does not create local storage.

## Phase 1AA: LLM Discovery

Status: implemented.

Goal:

Make TachiSuke easier for AI assistants and search-adjacent tooling to understand without exposing private, draft, or placeholder data.

Implemented:

- Static `/llms.txt` endpoint.
- Plain-text product positioning and preferred summary.
- Public locale roots, section links, sitemap, global RSS, locale RSS feeds, and static search index links.
- Freshness caveats for mobile plans, areas, places, and user-submitted content.
- Source-level and build-output SEO tests for the generated file.

Rules:

- Keep `llms.txt` static, concise, and editorially maintained.
- Link only to public discovery surfaces.
- Do not add AI runtime behavior, analytics, crawling, or private data.

## Phase 1AB: Feed Sitemap Lastmod

Status: implemented.

Goal:

Make RSS feeds easier for crawlers and feed-aware tools to discover with meaningful update dates.

Implemented:

- Added `/feed.xml` to `sitemap.xml`.
- Added `lastmod` to the global feed sitemap entry based on the newest public article update date.
- Added `lastmod` to locale feed sitemap entries based on the newest same-locale public article update date.
- Preserved existing `lastmod` behavior for article, category, place, area, mobile plan, and tool pages.
- Source-level and build-output SEO tests verify feed sitemap entries and dates.

Rules:

- Keep feeds static and article-only.
- Do not add per-category feeds or pagination until article volume justifies it.
- Do not include account placeholders, search pages, search indexes, drafts, or private data in the sitemap.

## Phase 1AC: Cloudflare Locale-Less Redirects

Status: implemented.

Goal:

Reduce avoidable 404s on Cloudflare Pages when users type or share common section URLs without a locale prefix.

Implemented:

- Added `public/_redirects`.
- Temporary `302` fallbacks from common locale-less public section paths to English routes.
- Splat redirects for public article, area, place, mobile, and tool detail-like paths.
- Source-level and build-output SEO tests verify representative redirects and ensure account placeholders are not redirected.

Rules:

- Canonical URLs remain locale-prefixed.
- Do not add language detection, Cloudflare Workers/Functions, auth-aware routing, or account placeholder fallbacks.

## Phase 1AD: Discovery Cache Headers

Status: implemented.

Goal:

Make Cloudflare Pages cache behavior explicit for frequently read static discovery files.

Implemented:

- One-hour cache headers for `/feed.xml`.
- One-hour cache headers for locale RSS feeds.
- One-hour cache headers for `/llms.txt`.
- One-hour cache headers for locale search index JSON files.
- Build-output SEO tests verify representative header rules.

Rules:

- Keep HTML revalidated.
- Do not add CDN purge automation, Workers, or runtime cache logic in Phase 1.

## Phase 1AE: Ward Office Moving-In Checklist

Status: implemented.

Goal:

Add a high-intent administrative procedure checklist for readers who have just arrived in Japan or moved addresses, while keeping TachiSuke static-first and source-aware.

Implemented:

- Added the third published static tool, `ward-office-moving-in-checklist`.
- Added optional `sourceLinks` to the tools content model.
- Rendered official source links on tool detail pages when present.
- Linked the locale homepages directly to the ward office checklist from the start-here section.
- Added source-level and SEO-output checks for the new tool and source links.

Rules:

- Treat government links as confirmation starting points, not as copied legal advice.
- Municipality procedures, deadlines, documents, and language support can vary.
- Do not add saved checklist state, account requirements, backend storage, or a database in Phase 1AE.

## Phase 1AF: Commuter Pass and IC Card Checklist

Status: implemented.

Goal:

Add a transportation-life checklist for readers deciding whether to buy a commuter pass and how to prepare Suica/PASMO-style IC card details without adding fare calculation or route search.

Implemented:

- Added the fourth published static tool, `commuter-pass-ic-card-checklist`.
- Reused optional `sourceLinks` to cite Tokyo Metro and PASMO official confirmation pages.
- Covered route preparation, purchase details, daily-use caveats, and change/loss/refund reminders.
- Added source-level and SEO-output checks for the new tool and source links.

Rules:

- Do not present the tool as a fare calculator.
- Operator rules, purchasable route segments, student proof, refunds, changes, and mobile IC support can vary.
- Keep pass purchase decisions source-backed and date-aware.
- Do not add saved commute profiles, route search integrations, backend storage, or a database in Phase 1AF.

## Phase 1AG: Commuter Pass Articles

Status: implemented.

Goal:

Connect the commuter pass / IC card checklist to searchable article content so readers can discover the topic from article indexes, transportation category pages, RSS feeds, and search engines.

Implemented:

- Added zh-tw article `japan-commuter-pass-ic-card-guide`.
- Added en article `japan-commuter-pass-ic-card-guide-en`.
- Added `transportation` category landing pages through existing dynamic category routes.
- Linked the articles to the commuter pass checklist, first-week setup content, area guides, mobile setup, and ward office checklist.
- Added source-level and SEO-output checks for article counts, slugs, sitemap paths, category paths, and RSS feed entries.

Rules:

- Keep articles decision-oriented rather than generic travel content.
- Do not present commuter pass content as a fare calculator.
- Operator rules, reimbursements, student eligibility, refunds, route changes, and mobile IC support can vary.
- Japanese and Korean translations were added in Phase 1AP after the zh-tw/en content proved useful.

## Phase 1AH: Residence Administration Articles

Status: implemented.

Goal:

Add procedures-category article content that explains the practical difference between residence cards, resident records, and My Number for foreign residents without turning the site into legal advice.

Implemented:

- Added zh-tw article `residence-card-resident-record-my-number`.
- Added en article `residence-card-resident-record-my-number-en`.
- Added `procedures` category landing pages through existing dynamic category routes.
- Linked the articles to the ward office moving-in checklist, first-week setup content, and mobile setup.
- Added source-level and SEO-output checks for article counts, slugs, sitemap paths, category paths, and RSS feed entries.

Rules:

- Keep administrative content conservative and source-aware.
- Do not promise exact deadlines, eligibility, documents, or outcomes across all municipalities or residence statuses.
- Direct action-oriented readers to official sources, municipality counters, schools, employers, and immigration authorities as appropriate.
- Japanese and Korean translations were added in Phase 1AP after the zh-tw/en content proved useful.

## Phase 1AP: Japanese/Korean Admin and Transport Articles

Status: implemented.

Goal:

Improve multilingual coverage for two high-intent life-decision topics that already have zh-tw/en content.

Implemented:

- Added ja article `japan-commuter-pass-ic-card-guide-ja`.
- Added ko article `japan-commuter-pass-ic-card-guide-ko`.
- Added ja article `residence-card-resident-record-my-number-ja`.
- Added ko article `residence-card-resident-record-my-number-ko`.
- Reused existing `translationKey` values so article detail, sitemap, RSS, search, and hreflang behavior stay aligned.
- Added source-level and SEO-output checks for article count, locale coverage, sitemap entries, and RSS entries.

Rules:

- Keep transportation content decision-oriented and avoid presenting it as fare calculation.
- Keep residence administration content conservative and avoid legal/immigration advice.
- Continue adding ja/ko coverage for proven zh-tw/en topics when it improves user value and SEO coverage.

## Phase 1AI: Article Category Label Polish

Status: implemented.

Goal:

Prevent newly added article category pages from exposing raw category keys in titles and descriptions.

Implemented:

- Added localized title and description copy for `transportation`.
- Added localized title and description copy for `procedures`.
- Added source-level tests to require category helper support for these keys.
- Added build-output SEO tests for representative transportation and procedures category pages.

Rules:

- Keep category copy centralized in `src/lib/content/article-categories.ts`.
- When adding a new recurring category, add localized title and description copy in the same change.
- Do not redesign category taxonomy, filters, icons, or pagination until article volume justifies it.

## Phase 1AJ: Article Category ItemList JSON-LD

Status: implemented.

Goal:

Make article category landing pages easier for crawlers to interpret as curated article collections.

Implemented:

- Added `ItemList` JSON-LD to `ArticleCategoryPage.astro`.
- Built `ItemList` entries from the same filtered article list used by the visible page.
- Included article canonical URLs, titles, descriptions, and positions.
- Added source-level tests for ItemList construction.
- Added build-output SEO checks for ItemList presence, count, and article canonical URLs.

Rules:

- Keep category structured data conservative.
- Do not include drafts, other locales, ratings, reviews, or unsupported author/date claims.
- If category pages later add pagination, revisit `ItemList` semantics before shipping.

## Phase 1AK: OpenSearch Discovery

Status: implemented.

Goal:

Expose TachiSuke's existing static search route through the standard OpenSearch discovery mechanism so browsers and search-adjacent tools can find it.

Implemented:

- Added static `/opensearch.xml`.
- Linked the OpenSearch description from `BaseLayout` with `rel="search"`.
- Pointed the template at `/en/search?q={searchTerms}` as the stable locale fallback.
- Added conservative Cloudflare cache headers for `/opensearch.xml`.
- Added source-level and build-output SEO tests for the endpoint, discovery link, and cache header.

Rules:

- Keep Phase 1 search static and dependency-free.
- Do not add backend search, language detection, analytics, account search, or private-content discovery through OpenSearch.

## Phase 1AL: WebSite SearchAction JSON-LD

Status: implemented.

Goal:

Expose TachiSuke's static search route through schema.org `WebSite` structured data so search engines can understand the site search entry point.

Implemented:

- Added `potentialAction` to site-wide `WebSite` JSON-LD.
- Used `SearchAction` targeting `/en/search?q={search_term_string}` as the stable fallback.
- Added source-level and build-output SEO tests for the JSON-LD.

Rules:

- Keep the SearchAction target aligned with static search and OpenSearch.
- Do not add backend search, language detection, account search, analytics, or private-content discovery through this schema.

## Phase 1AM: Sitemap Hreflang Alternates

Status: implemented.

Goal:

Help search engines understand TachiSuke's multilingual URL relationships directly from `sitemap.xml`.

Implemented:

- Added the XHTML sitemap namespace.
- Added `xhtml:link` hreflang alternates for shared locale pages and shared static detail pages.
- Added article detail alternates grouped by `translationKey`, limited to non-draft generated pages.
- Added `x-default` alternates to English when an English generated URL exists.
- Added source-level and build-output SEO tests for representative shared and article alternates.

Rules:

- Do not point hreflang alternates at missing translations, drafts, account placeholders, search pages, or private data.
- Keep sitemap alternates conservative until translation coverage and route volume justify more specialized sitemap handling.

## Phase 1AN: Cloudflare CSP Headers

Status: implemented.

Goal:

Add baseline static-site hardening through Cloudflare Pages `_headers` without breaking current Astro output, inline JSON-LD, static search, or provider-agnostic external forms.

Implemented:

- Added `Content-Security-Policy` to `public/_headers`.
- Blocked object embeds and framing with `object-src 'none'` and `frame-ancestors 'none'`.
- Allowed current inline scripts/styles needed by JSON-LD and small static progressive enhancements.
- Allowed `form-action 'self' https:` so configured external form endpoints remain usable.
- Added build-output SEO tests for representative CSP directives.

Rules:

- Do not add external script hosts, analytics, nonce infrastructure, or Workers runtime in Phase 1AN.
- Revisit nonce/hash-based CSP only when the script architecture is ready.

## Phase 1AO: Security.txt

Status: implemented.

Goal:

Expose a standard security contact file for static deployment without adding a backend or committing personal contact details.

Implemented:

- Added static `/.well-known/security.txt`.
- Pointed `Contact` at `/en/contact`.
- Added `Policy`, `Preferred-Languages`, generated `Expires`, and `Canonical` fields.
- Added a conservative Cloudflare cache header.
- Added source-level and build-output SEO tests.

Rules:

- Do not imply a private vulnerability tracker, personal email commitment, guaranteed response SLA, or security operations backend in Phase 1AO.
- Replace the generic contact route only when a dedicated security response process exists.

## Phase 2: Auth and Favorites

Status: future phase.

Goals:

- Add Supabase Auth.
- Add `profiles`.
- Add generic `favorites`.
- Replace account placeholders with protected account pages.
- Let logged-in users save articles, places, mobile plans, areas, and tools.
- Add Row Level Security before shipping user data.

Rules:

- Public content remains readable without login.
- Saving favorites requires login.
- Users can only read and modify their own favorites.
- Account pages likely require Astro SSR or hybrid rendering.
- Phase 2 should not automatically include moderation dashboard work unless explicitly scoped.

## Phase 3: Moderation and Community

Status: future phase.

Goals:

- Add `place_submissions`.
- Let users view their own submission status.
- Add moderation dashboard.
- Add admin review.
- Convert approved submissions into normalized published places.

Submission moderation statuses:

- `pending_review`
- `approved`
- `rejected`
- `needs_more_info`

Rules:

- User submissions never publish directly.
- Admin-only tools must be separated from public user pages.
- Submitter email must not appear on public pages.
- Published Place entries still use `status = published`.

## Phase 4: Search, Maps, Personalization

Status: future ideas.

Possible scope:

- Advanced search across articles, places, mobile plans, areas, and tools.
- Map UI for places and area guides.
- Saved lists and user-defined collections.
- Decision tools for mobile plans, moving, renting, and procedures.
- Personalized onboarding by language, visa/status, city, and needs.
- AI assistant features for guided life decisions.

Rules:

- Search and personalization should build on stable content models.
- Map and AI features should not replace editorial moderation.
- High-risk or date-sensitive advice should remain source-backed and updateable.
