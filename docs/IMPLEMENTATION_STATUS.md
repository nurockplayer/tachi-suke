# TachiSuke Implementation Status

This document records the current MVP state after Phase 1DN OpenSearch output guard checks. It should not be read as a promise that auth, database, database-backed submissions, support storage, saved checklist state, or favorites already work.

## Completed

- Astro + TypeScript static site foundation.
- pnpm-only project setup with `packageManager: pnpm@10.33.0`.
- Static Site Generation first configuration.
- `SITE_URL` environment variable support with `https://tachi-suke.example.com` fallback.
- Four supported locales: `zh-tw`, `en`, `ja`, `ko`.
- Root language entry page at `/`.
- Four locale homepages with start-here links and internal navigation to articles, mobile, areas, places, submit-place, tools, and favorites placeholder.
- Four locale article index pages.
- Four locale article detail routes at `/[locale]/articles/[slug]`.
- Four locale article category routes at `/[locale]/articles/category/[category]`.
- Localized article category display labels on public article index rows, category-page rows, and homepage latest-article cards.
- Localized article detail category labels in visible metadata, breadcrumbs, Open Graph, and JSON-LD.
- Static article table of contents generated from Markdown/MDX H2/H3 headings.
- Article detail pages render semantic published/updated `<time>` metadata and a localized freshness/trust notice before the article body.
- Build-time related article links on article detail pages, limited to non-draft same-locale articles.
- Public detail-page correction prompts that link article, place, mobile plan, area, and tool details to contact/corrections with related page URL prefill.
- Fifty-six public article pages across `zh-tw`, `en`, `ja`, and `ko`, organized into fourteen fully localized public article `translationKey` groups.
- Four locale area index pages showing area guide cards.
- Four locale area detail routes at `/[locale]/areas/[slug]`.
- Four locale place index pages.
- Four locale place detail routes at `/[locale]/places/[slug]`.
- Four locale mobile index pages with comparison guidance and mobile plan cards.
- Four locale mobile detail routes at `/[locale]/mobile/[slug]`.
- Four locale tools index pages showing published tool cards.
- Four locale tool detail routes at `/[locale]/tools/[slug]`.
- Four locale static search pages at `/[locale]/search`, marked `noindex, follow`, with shareable `?q=` query support.
- Static search zero-result states include localized helper copy and a clear-search button that restores the full public result list.
- Four locale static search index JSON endpoints at `/[locale]/search-index.json`.
- Build-output SEO checks verify all four static search pages keep the noindex, GET `q`, locale search-index, empty-state, and clear-search contracts.
- Build-output tests verify all four locale search indexes contain only expected public content collection routes.
- Published static checklist tools: `moving-to-japan-checklist`, `japan-rent-initial-cost-checklist`, `ward-office-moving-in-checklist`, `commuter-pass-ic-card-checklist`, `apartment-viewing-japanese-phrases`, `apartment-application-documents-checklist`, `japan-job-application-documents-checklist`, `japan-everyday-shopping-checklist`, `moving-out-checklist`, and `japan-emergency-disaster-checklist`.
- Four locale submit-place form pages with provider-agnostic endpoint support.
- Four locale submit-place thanks pages.
- Four locale contact/corrections form pages with provider-agnostic endpoint support.
- Four locale contact/corrections thanks pages.
- Four locale about pages.
- Four locale privacy pages.
- Four locale editorial policy pages.
- Four locale human-readable site map pages at `/[locale]/site-map`, linked from the footer and generated from public content collections.
- Static `llms.txt` discovery file for public AI/search-adjacent tooling, including locale site map links.
- Custom static `404.html` recovery page with multilingual top copy, locale-specific recovery links, language-marked recovery sections, and `noindex, nofollow`.
- Four locale account login placeholder pages.
- Four locale account favorites placeholder pages.
- Four locale account submissions placeholder pages.
- Favorite button placeholder.
- Content collections for `articles`, `areas`, `places`, `mobile-plans`, and `tools`.
- Five mobile plan entries: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile.
- Four Tokyo area guide samples: Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi.
- TypeScript model boundaries for `Article`, `Place`, `AreaGuide`, `MobilePlan`, `Favorite`, `UserProfile`, and `PlaceSubmission`.
- Mobile plan source-maintenance fields: `officialUrl`, `lastCheckedAt`, `sourceNote`, and `notes`.
- Area source-maintenance fields: `title`, `summary`, `lastCheckedAt`, and `notes`.
- Place enum values unified across schema, types, example data, UI labels, and docs.
- Place list/detail public filtering by `status = published`.
- Article list/detail public filtering by `draft = false`.
- Article category page public filtering by locale, category, and `draft = false`.
- SEO base layout with title, description, canonical URL, Open Graph URL, Open Graph site name, locale-aware `html lang`, and conservative `hreflang`.
- Public HTML head `hreflang` alternates are checked against public sitemap HTML paths by `pnpm check:seo`.
- Default Open Graph image, Twitter summary metadata, manifest link, and sitemap-wide social image metadata checks in `BaseLayout` / `pnpm check:seo`.
- Open Graph locale and alternate locale metadata in `BaseLayout`.
- Article Open Graph metadata for public article detail pages.
- Browser/PWA metadata in `BaseLayout`: `theme-color`, `application-name`, `apple-mobile-web-app-title`, and `format-detection`.
- System/light/dark theme support with media-aware browser `theme-color` metadata, an early persisted-theme initializer, a globe-icon collapsed language control, a separate collapsed theme control, and a no-JavaScript `prefers-color-scheme: dark` fallback.
- The collapsed language switcher stays language-neutral with a globe icon while its navigation, trigger, title, and visually hidden labels use multilingual text instead of only the active locale.
- The collapsed theme switcher uses a compact icon plus short current state, while the expanded menu keeps full localized system/light/dark labels.
- JSON-LD structured data support in `BaseLayout`.
- Site-wide `Organization` and `WebSite` JSON-LD.
- Site-wide `WebSite` JSON-LD includes a conservative `SearchAction` for the static English search fallback.
- Locale homepage `WebPage` and start-here `ItemList` JSON-LD.
- Article index `CollectionPage` and public-article `ItemList` JSON-LD.
- Mobile, area, place, and tool index `CollectionPage` and public-card `ItemList` JSON-LD.
- Collection index `BreadcrumbList` JSON-LD for articles, mobile, areas, places, and tools.
- Article detail `Article` and `BreadcrumbList` JSON-LD.
- Article detail pages can render structured official confirmation links from article frontmatter; current emergency/disaster, work-contract, residence administration, first-week setup, and ward-office moving-in procedure articles include first official source links.
- Article category `WebPage` and `BreadcrumbList` JSON-LD.
- Place detail `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Mobile plan detail `Service` and `BreadcrumbList` JSON-LD.
- Area detail `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- Public trust/form pages at `/[locale]/about`, `/[locale]/privacy`, `/[locale]/editorial-policy`, `/[locale]/contact`, and `/[locale]/submit-place` emit conservative `WebPage` and two-level `BreadcrumbList` JSON-LD.
- Human-readable site map pages emit `WebPage` JSON-LD with BCP47 `inLanguage` values from shared locale metadata.
- Visible breadcrumbs on article, area, place, mobile, and tool collection index pages, plus article detail, article category, place detail, mobile plan detail, area detail, and tool detail pages.
- Generated `sitemap.xml` for public static routes and content collection detail pages.
- Sitemap entries include conservative `hreflang` alternates for shared locale pages and translated article detail pages.
- Generated `robots.txt` with sitemap reference and account placeholder disallow rules.
- Build-output `robots.txt` directive checks that keep public sections crawlable and account placeholders disallowed.
- Generated `llms.txt` with public discovery links and content caveats.
- Generated `/.well-known/security.txt` with public contact, policy, canonical, preferred-language, and expiration fields.
- Build-output `/.well-known/security.txt` freshness checks for parseable UTC `Expires` metadata.
- Generated `opensearch.xml` for browser/search-adjacent discovery of the static English search route.
- Generated `site.webmanifest`.
- Generated global `feed.xml` for non-draft public articles, included in the sitemap with newest-public-article `lastmod`.
- Generated locale RSS feeds at `/zh-tw/feed.xml`, `/en/feed.xml`, `/ja/feed.xml`, and `/ko/feed.xml` for same-locale non-draft public articles, included in the sitemap with same-locale newest-article `lastmod`.
- XML sitemap public section and human-readable site map entries carry content-derived `lastmod` values from public articles, areas, places, mobile plans, and tools.
- XML sitemap locale homepage entries carry content-derived `lastmod` values from the same public content freshness calculation.
- Cloudflare Pages `_headers` with conservative security and discovery cache defaults.
- Cloudflare Pages CSP header for baseline static-site hardening while preserving current inline JSON-LD/search scripts and HTTPS external form endpoints.
- Cloudflare Pages `_redirects` with temporary English fallbacks for common locale-less public paths and a legacy `/security.txt` fallback.
- Build-output Cloudflare Pages `_redirects` checks that keep fallback rules exact, temporary, and public-only.
- Cloudflare Pages `wrangler.toml` with project name, compatibility date, and `dist` output directory.
- Deployment guide at `docs/DEPLOYMENT.md`.
- Baseline keyboard accessibility hooks: skip link, stable main content target, active primary nav state, and visible focus styles.
- Localized shared assistive labels for primary navigation, footer navigation, article tag lists, article category lists, place fact lists, and language switcher controls.
- Dark theme surface tokens for global layout, hero overlays, cards, forms, search, article reading surfaces, collapsed global controls, and placeholders.
- Structure tests in `tests/project-structure.test.mjs`.
- Static submit-place and contact/corrections form contract tests in `tests/form-contract.test.mjs`, run with `pnpm test`.
- Source content health checks in `tests/content-health.test.mjs`, run with `pnpm check:content`, including article metadata, explicit public article translation-group locale policy, stored URL fields, and Markdown/MDX root-relative internal links.
- Conservative article internal-link checks for locale-prefixed static/generated public routes.
- Static HTML internal link crawler in `tests/static-html-links.test.mjs`, run after `pnpm build` with `pnpm check:links`.
- Static SEO output check in `tests/seo-output.test.mjs`, run after `pnpm build` with `pnpm check:seo`; when `SITE_URL` is unset, it infers the expected origin from the current built sitemap or robots output, sitemap public-content coverage and RSS item URL coverage are derived from current content collections, every sitemap-derived public HTML page must have matching canonical and `og:url` metadata plus complete title/description/Open Graph/Twitter metadata, baseline language/viewport/skip-link/main-landmark shell metadata, favicon/manifest/OpenSearch/global RSS/current-locale RSS discovery links, and parseable JSON-LD without exact `undefined`/`null` string placeholder values, account/search/404 utility pages are checked for noindex and sitemap exclusion, mobile/area/place/tool section JSON-LD is checked across all supported locales, discovery cache header rules are checked for all current discovery endpoints, specific cache blocks must detach inherited global `Cache-Control`, and built `opensearch.xml` must match the reviewed static browser search discovery contract.
- Deployment URL guard in `tests/deploy-output.test.mjs`, run after `SITE_URL=<production-url> pnpm build` with `SITE_URL=<production-url> pnpm check:deploy`; it rejects fallback-domain output and requires configured production URLs in key discovery and representative HTML files.
- GitHub Actions CI workflow rejects forbidden lockfiles and runs source/content checks, fallback-domain build-output checks, and production `SITE_URL=https://tachi-suke.pages.dev` SEO/deploy output checks.
- Locale switcher links for detail pages use conservative alternate paths so missing article translations do not create dead links.
- Submit-place form uses `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`: unset means preview mode/disabled submit; set means a static `POST` to the external endpoint.
- Submit-place includes provider-agnostic hidden fields and a visually hidden `website` honeypot field for basic spam reduction.
- Contact/corrections form uses `PUBLIC_CONTACT_FORM_ENDPOINT`: unset means preview mode/disabled submit; set means a static `POST` to the external endpoint.
- Contact/corrections includes provider-agnostic hidden fields and a visually hidden `company` honeypot field for basic spam reduction.
- Correction prompt component with localized copy for reporting outdated details, broken links, or unclear information from detail pages.
- Build-output SEO checks verify representative public detail correction prompts pass an encoded absolute `relatedUrl` into the contact/corrections form.
- Tool detail pages are generated only for `status = published` tools and include localized notes, checklist sections, source note, and last checked date.
- Footer navigation links to contact, privacy, editorial policy, and human-readable site map pages for all locales.

## Placeholder

These are intentionally present but not functional:

- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`
- `FavoriteButtonPlaceholder`
- Native/database-backed submit-place storage
- Native/database-backed contact/support storage
- `src/lib/auth/`
- `src/lib/db/`
- `src/lib/favorites/`
- `src/lib/submissions/`
- Supabase Auth
- Postgres persistence
- Row Level Security runtime setup
- Real user profiles
- Real favorites
- Real submission history
- Moderation/admin UI
- Saved checklist/tool progress

## Not Started

- Map UI.
- Native submission backend.
- Authenticated account pages.
- Admin moderation dashboard.
- Personalization or AI assistant features.

## Known Limitations

- Content volume is still early editorial sample-level, though Phase 1B now has enough pages for public preview.
- Article category pages are useful for current high-intent categories, but richer category copy should wait until there are more articles per category.
- Tools currently include ten static checklists and phrase tools. Checklist state is not saved and there is no user-specific progress tracking.
- Areas and mobile plans now have detail pages, but the content is still static editorial guidance rather than live data.
- Mobile plan prices, campaigns, and conditions can change, so users must confirm official sites before applying.
- Area rent feel, quietness, and commute notes can become stale and need periodic editorial review.
- Submit-place form only sends data when `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is configured. The repo does not store submissions.
- Contact/corrections form only sends data when `PUBLIC_CONTACT_FORM_ENDPOINT` is configured. The repo does not store messages or guarantee individual replies.
- `/.well-known/security.txt` points to the existing contact route. It does not create a private vulnerability tracker, personal email commitment, or guaranteed response SLA.
- The honeypot field is basic spam reduction only. It is not a full anti-spam or abuse-prevention system.
- Place body data is locale-neutral; only UI labels are localized.
- `hreflang` remains conservative for non-article surfaces and future partial translation groups; missing alternates are not invented.
- Sitemap article alternates are limited to non-draft articles sharing a `translationKey`; untranslated articles do not get invented alternates.
- `pnpm test` scans Markdown article links and generated/static source routes.
- `pnpm check:content` checks source content metadata, stored URL fields, and Markdown/MDX root-relative internal links, but it does not fetch external URLs, validate anchors, or validate live business/provider data.
- Public article translation groups are currently expected to be fully localized across `zh-tw`, `en`, `ja`, and `ko`; intentionally partial future groups must be added to the content-health partial-locale allowlist.
- `pnpm check:links` scans built static HTML root-relative links in `dist/`, but it does not validate external links, anchors, JavaScript behavior, form submission behavior, or visual rendering.
- RSS feeds are static and article-only. They do not include category feeds, pagination, places, tools, mobile plans, or area guides.
- Static search is substring-based client-side filtering with shareable `?q=` URLs. It does not provide typo tolerance, semantic search, pagination, analytics, or personalization.
- Search pages are noindex utility pages and are intentionally excluded from `sitemap.xml`. Their zero-result state is recoverable, but it is still client-side substring search.
- Build-output SEO tests verify every locale search index contains only expected public content collection routes and excludes account, search, trust, form, and other utility routes.
- OpenSearch discovery points to `/en/search?q={searchTerms}` as the stable static fallback. It does not detect language preference or provide backend search.
- WebSite `SearchAction` points to `/en/search?q={search_term_string}` and has the same limitations as static search.
- `/404.html` is static and noindex. It provides multilingual top copy and locale-specific recovery links, but it does not perform language detection or redirects.
- Related article links are static and rule-based. They are not personalized and do not use analytics.
- Article table of contents is static and does not include scroll spy, reading progress, or saved state.
- Correction prompts pass an encoded absolute `relatedUrl` into `/[locale]/contact`; they still do not track reports, store messages, or guarantee individual replies.
- Account pages are static placeholders and do not protect user data because no user data exists yet.
- Account placeholder pages are marked `noindex, nofollow` and excluded from the sitemap.
- Structured data is intentionally conservative and does not claim ratings, reviews, opening hours, coordinates, offers, or exact street addresses.
- Visible breadcrumbs cover public collection index pages and nested public detail/category pages.
- Cloudflare Pages is the preferred static deployment target for Phase 1. Set `SITE_URL` to the production domain before launch.
- The Phase 1 CSP still allows `'unsafe-inline'` because the current Astro output uses inline JSON-LD and small inline progressive enhancement scripts. A nonce/hash CSP can be revisited later.
- Locale-less redirects are convenience fallbacks only. Canonical URLs and navigation remain locale-prefixed.
- CI verifies the static site but does not deploy it. Cloudflare Pages deployment remains separate.
- Deployment credentials and Cloudflare account-specific secrets are intentionally not committed.
- Browser QA currently covers basic route/card/form/search checks, including the static search empty-state recovery flow, not a full accessibility or visual regression suite.
- Dark theme QA covers representative pages and the header switcher, but it is not yet a full automated visual regression suite across every page template.
- Accessibility work currently covers baseline keyboard navigation only, not a complete WCAG audit.
- Privacy and editorial policy pages are launch-readiness guidance for the current static MVP, not a final legal review for future auth, analytics, or database-backed personal data.

## Verification Results

Most recent recorded verification:

- `pnpm install`: passed
- `pnpm test`: passed
- `pnpm check:content`: passed
- `pnpm build`: passed
- `pnpm check:links`: passed
- `pnpm check:seo`: passed
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:seo`: passed
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`: passed
- Browser QA: basic route/card/form/search check passed

Browser QA covered:

- Place card navigation to a place detail page.
- Submit-place form field interaction.
- Required fields and URL/email input types.
- Disabled submit button.
- Headless Chrome check for `/en/search`: typing `Denny` filters results to `Denny's` and preserves `noindex, follow`.
- No observed console error/warning during the checked flows.

## Next Recommended Tasks

1. Add more real content for practical Japanese, everyday shopping, working life, and housing documents.
2. Add more practical tools, starting with moving-in neighborhood setup and public-service discovery checklists.
3. Choose and configure an external form provider for `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
4. Choose and configure an external form provider for `PUBLIC_CONTACT_FORM_ENDPOINT`.
5. Add a fuller external link checker or scheduled source-review workflow when route count grows.
6. Start Supabase Auth, profiles, favorites, and RLS only in Phase 2.
