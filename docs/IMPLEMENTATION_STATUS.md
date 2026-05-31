# TachiSuke Implementation Status

This document records the current MVP state after Phase 1S static search work. It should not be read as a promise that auth, database, database-backed submissions, support storage, saved checklist state, or favorites already work.

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
- Static article table of contents generated from Markdown/MDX H2/H3 headings.
- Build-time related article links on article detail pages, limited to non-draft same-locale articles.
- Public detail-page correction prompts that link article, place, mobile plan, area, and tool details to contact/corrections with related page URL prefill.
- Twelve public article pages across `zh-tw`, `en`, `ja`, and `ko`, including Phase 1B decision-oriented content.
- Four locale area index pages showing area guide cards.
- Four locale area detail routes at `/[locale]/areas/[slug]`.
- Four locale place index pages.
- Four locale place detail routes at `/[locale]/places/[slug]`.
- Four locale mobile index pages with comparison guidance and mobile plan cards.
- Four locale mobile detail routes at `/[locale]/mobile/[slug]`.
- Four locale tools index pages showing published tool cards.
- Four locale tool detail routes at `/[locale]/tools/[slug]`.
- Four locale static search pages at `/[locale]/search`, marked `noindex, follow`, with shareable `?q=` query support.
- Four locale static search index JSON endpoints at `/[locale]/search-index.json`.
- Published static checklist tools: `moving-to-japan-checklist` and `japan-rent-initial-cost-checklist`.
- Four locale submit-place form pages with provider-agnostic endpoint support.
- Four locale submit-place thanks pages.
- Four locale contact/corrections form pages with provider-agnostic endpoint support.
- Four locale contact/corrections thanks pages.
- Four locale about pages.
- Four locale privacy pages.
- Four locale editorial policy pages.
- Static `llms.txt` discovery file for public AI/search-adjacent tooling.
- Custom static `404.html` recovery page with multilingual links and `noindex, nofollow`.
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
- Default Open Graph image, Twitter summary metadata, and manifest link in `BaseLayout`.
- Browser/PWA metadata in `BaseLayout`: `theme-color`, `application-name`, `apple-mobile-web-app-title`, and `format-detection`.
- JSON-LD structured data support in `BaseLayout`.
- Site-wide `Organization` and `WebSite` JSON-LD.
- Article detail `Article` and `BreadcrumbList` JSON-LD.
- Article category `WebPage` and `BreadcrumbList` JSON-LD.
- Place detail `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Mobile plan detail `Service` and `BreadcrumbList` JSON-LD.
- Area detail `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- Visible breadcrumbs on article detail, article category, place detail, mobile plan detail, area detail, and tool detail pages.
- Generated `sitemap.xml` for public static routes and content collection detail pages.
- Generated `robots.txt` with sitemap reference and account placeholder disallow rules.
- Generated `llms.txt` with public discovery links and content caveats.
- Generated `site.webmanifest`.
- Generated global `feed.xml` for non-draft public articles, included in the sitemap with newest-public-article `lastmod`.
- Generated locale RSS feeds at `/zh-tw/feed.xml`, `/en/feed.xml`, `/ja/feed.xml`, and `/ko/feed.xml` for same-locale non-draft public articles, included in the sitemap with same-locale newest-article `lastmod`.
- Cloudflare Pages `_headers` with conservative security and cache defaults.
- Cloudflare Pages `wrangler.toml` with project name, compatibility date, and `dist` output directory.
- Deployment guide at `docs/DEPLOYMENT.md`.
- Baseline keyboard accessibility hooks: skip link, stable main content target, active primary nav state, and visible focus styles.
- Structure tests in `tests/project-structure.test.mjs`.
- Source content health checks in `tests/content-health.test.mjs`, run with `pnpm check:content`.
- Conservative article internal-link checks for locale-prefixed static/generated routes.
- Static HTML internal link crawler in `tests/static-html-links.test.mjs`, run after `pnpm build` with `pnpm check:links`.
- Static SEO output check in `tests/seo-output.test.mjs`, run after `pnpm build` with `pnpm check:seo`.
- GitHub Actions CI workflow that rejects forbidden lockfiles and runs `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- GitHub Actions CI runs `pnpm check:content` before static build.
- Locale switcher links for detail pages use conservative alternate paths so missing article translations do not create dead links.
- Submit-place form uses `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`: unset means preview mode/disabled submit; set means a static `POST` to the external endpoint.
- Submit-place includes provider-agnostic hidden fields and a visually hidden `website` honeypot field for basic spam reduction.
- Contact/corrections form uses `PUBLIC_CONTACT_FORM_ENDPOINT`: unset means preview mode/disabled submit; set means a static `POST` to the external endpoint.
- Contact/corrections includes provider-agnostic hidden fields and a visually hidden `company` honeypot field for basic spam reduction.
- Correction prompt component with localized copy for reporting outdated details, broken links, or unclear information from detail pages.
- Tool detail pages are generated only for `status = published` tools and include localized notes, checklist sections, source note, and last checked date.
- Footer navigation links to contact, privacy, and editorial policy pages for all locales.

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
- Tools currently include two static checklists. Checklist state is not saved and there is no user-specific progress tracking.
- Areas and mobile plans now have detail pages, but the content is still static editorial guidance rather than live data.
- Mobile plan prices, campaigns, and conditions can change, so users must confirm official sites before applying.
- Area rent feel, quietness, and commute notes can become stale and need periodic editorial review.
- Submit-place form only sends data when `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is configured. The repo does not store submissions.
- Contact/corrections form only sends data when `PUBLIC_CONTACT_FORM_ENDPOINT` is configured. The repo does not store messages or guarantee individual replies.
- The honeypot field is basic spam reduction only. It is not a full anti-spam or abuse-prevention system.
- Place body data is locale-neutral; only UI labels are localized.
- `hreflang` is conservative, but full translation coverage is not complete.
- `pnpm test` scans Markdown article links and generated/static source routes.
- `pnpm check:content` checks source content metadata and stored URL fields, but it does not fetch external URLs or validate live business/provider data.
- `pnpm check:links` scans built static HTML root-relative links in `dist/`, but it does not validate external links, anchors, JavaScript behavior, form submission behavior, or visual rendering.
- RSS feeds are static and article-only. They do not include category feeds, pagination, places, tools, mobile plans, or area guides.
- Static search is substring-based client-side filtering with shareable `?q=` URLs. It does not provide typo tolerance, semantic search, pagination, analytics, or personalization.
- Search pages are noindex utility pages and are intentionally excluded from `sitemap.xml`.
- `/404.html` is static and noindex. It does not perform language detection or redirects.
- Related article links are static and rule-based. They are not personalized and do not use analytics.
- Article table of contents is static and does not include scroll spy, reading progress, or saved state.
- Correction prompts pass an encoded absolute `relatedUrl` into `/[locale]/contact`; they still do not track reports, store messages, or guarantee individual replies.
- Account pages are static placeholders and do not protect user data because no user data exists yet.
- Account placeholder pages are marked `noindex, nofollow` and excluded from the sitemap.
- Structured data is intentionally conservative and does not claim ratings, reviews, opening hours, coordinates, offers, or exact street addresses.
- Visible breadcrumbs currently focus on nested public pages and do not appear on top-level section pages.
- Cloudflare Pages is the preferred static deployment target for Phase 1. Set `SITE_URL` to the production domain before launch.
- CI verifies the static site but does not deploy it. Cloudflare Pages deployment remains separate.
- Deployment credentials and Cloudflare account-specific secrets are intentionally not committed.
- Browser QA currently covers basic route/card/form/search checks, not a full accessibility or visual regression suite.
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
- Browser QA: basic route/card/form/search check passed

Browser QA covered:

- Place card navigation to a place detail page.
- Submit-place form field interaction.
- Required fields and URL/email input types.
- Disabled submit button.
- Headless Chrome check for `/en/search`: typing `Denny` filters results to `Denny's` and preserves `noindex, follow`.
- No observed console error/warning during the checked flows.

## Next Recommended Tasks

1. Add more real content for renting, administrative procedures, transportation, and practical Japanese.
2. Add more practical tools, starting with first-week setup, ward-office procedure, and commuter pass checklists.
3. Choose and configure an external form provider for `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
4. Choose and configure an external form provider for `PUBLIC_CONTACT_FORM_ENDPOINT`.
5. Add a fuller external link checker or scheduled source-review workflow when route count grows.
6. Start Supabase Auth, profiles, favorites, and RLS only in Phase 2.
