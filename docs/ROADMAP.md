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

- Added eight more decision-oriented articles, bringing the public article set to twelve pages.
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

- The Phase 1 feed is global across all locales.
- Draft articles must not appear in the feed.
- Locale-specific feeds can wait until content volume and reader demand justify them.

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

- Site search across articles, places, mobile plans, areas, and tools.
- Map UI for places and area guides.
- Saved lists and user-defined collections.
- Decision tools for mobile plans, moving, renting, and procedures.
- Personalized onboarding by language, visa/status, city, and needs.
- AI assistant features for guided life decisions.

Rules:

- Search and personalization should build on stable content models.
- Map and AI features should not replace editorial moderation.
- High-risk or date-sensitive advice should remain source-backed and updateable.
