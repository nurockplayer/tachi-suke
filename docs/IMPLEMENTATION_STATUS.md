# TachiSuke Implementation Status

This document records the current MVP state after Phase 1H static tool detail work. It should not be read as a promise that auth, database, database-backed submissions, saved checklist state, or favorites already work.

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
- Build-time related article links on article detail pages, limited to non-draft same-locale articles.
- Twelve public article pages across `zh-tw`, `en`, `ja`, and `ko`, including Phase 1B decision-oriented content.
- Four locale area index pages showing area guide cards.
- Four locale area detail routes at `/[locale]/areas/[slug]`.
- Four locale place index pages.
- Four locale place detail routes at `/[locale]/places/[slug]`.
- Four locale mobile index pages with comparison guidance and mobile plan cards.
- Four locale mobile detail routes at `/[locale]/mobile/[slug]`.
- Four locale tools index pages showing published tool cards.
- Four locale tool detail routes at `/[locale]/tools/[slug]`.
- First published static checklist tool: `moving-to-japan-checklist`.
- Four locale submit-place form pages with provider-agnostic endpoint support.
- Four locale submit-place thanks pages.
- Four locale about pages.
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
- SEO base layout with title, description, canonical URL, Open Graph URL, Open Graph site name, locale-aware `html lang`, and conservative `hreflang`.
- Default Open Graph image, Twitter summary metadata, and manifest link in `BaseLayout`.
- JSON-LD structured data support in `BaseLayout`.
- Site-wide `Organization` and `WebSite` JSON-LD.
- Article detail `Article` and `BreadcrumbList` JSON-LD.
- Place detail `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Mobile plan detail `Service` and `BreadcrumbList` JSON-LD.
- Area detail `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- Generated `sitemap.xml` for public static routes and content collection detail pages.
- Generated `robots.txt` with sitemap reference and account placeholder disallow rules.
- Generated `site.webmanifest`.
- Cloudflare Pages `_headers` with conservative security and cache defaults.
- Structure tests in `tests/project-structure.test.mjs`.
- Conservative article internal-link checks for locale-prefixed static/generated routes.
- Static HTML internal link crawler in `tests/static-html-links.test.mjs`, run after `pnpm build` with `pnpm check:links`.
- Static SEO output check in `tests/seo-output.test.mjs`, run after `pnpm build` with `pnpm check:seo`.
- GitHub Actions CI workflow that rejects forbidden lockfiles and runs `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- Locale switcher links for detail pages use conservative alternate paths so missing article translations do not create dead links.
- Submit-place form uses `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`: unset means preview mode/disabled submit; set means a static `POST` to the external endpoint.
- Submit-place includes provider-agnostic hidden fields and a visually hidden `website` honeypot field for basic spam reduction.
- Tool detail pages are generated only for `status = published` tools and include localized notes, checklist sections, source note, and last checked date.

## Placeholder

These are intentionally present but not functional:

- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`
- `FavoriteButtonPlaceholder`
- Native/database-backed submit-place storage
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

- Site search.
- Map UI.
- Native submission backend.
- Authenticated account pages.
- Admin moderation dashboard.
- Personalization or AI assistant features.

## Known Limitations

- Content volume is still early editorial sample-level, though Phase 1B now has enough pages for public preview.
- Tools currently include one static checklist. Checklist state is not saved and there is no user-specific progress tracking.
- Areas and mobile plans now have detail pages, but the content is still static editorial guidance rather than live data.
- Mobile plan prices, campaigns, and conditions can change, so users must confirm official sites before applying.
- Area rent feel, quietness, and commute notes can become stale and need periodic editorial review.
- Submit-place form only sends data when `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is configured. The repo does not store submissions.
- The honeypot field is basic spam reduction only. It is not a full anti-spam or abuse-prevention system.
- Place body data is locale-neutral; only UI labels are localized.
- `hreflang` is conservative, but full translation coverage is not complete.
- `pnpm test` scans Markdown article links and generated/static source routes.
- `pnpm check:links` scans built static HTML root-relative links in `dist/`, but it does not validate external links, anchors, JavaScript behavior, form submission behavior, or visual rendering.
- Related article links are static and rule-based. They are not personalized and do not use analytics.
- Account pages are static placeholders and do not protect user data because no user data exists yet.
- Account placeholder pages are marked `noindex, nofollow` and excluded from the sitemap.
- Structured data is intentionally conservative and does not claim ratings, reviews, opening hours, coordinates, offers, or exact street addresses.
- Cloudflare Pages is the preferred static deployment target for Phase 1. Set `SITE_URL` to the production domain before launch.
- CI verifies the static site but does not deploy it. Cloudflare Pages deployment remains separate.
- Browser QA currently covers basic route/card/form checks, not a full accessibility or visual regression suite.

## Verification Results

Most recent recorded verification:

- `pnpm install`: passed
- `pnpm test`: passed
- `pnpm build`: passed
- `pnpm check:links`: passed
- `pnpm check:seo`: passed
- Browser QA: basic route/card/form check passed

Browser QA covered:

- Place card navigation to a place detail page.
- Submit-place form field interaction.
- Required fields and URL/email input types.
- Disabled submit button.
- No observed console error/warning during the checked flows.

## Next Recommended Tasks

1. Add more real content for renting, administrative procedures, transportation, and practical Japanese.
2. Add more practical tools, starting with rent initial-cost and first-week setup checklists.
3. Add schema.org JSON-LD for area, mobile plan, and tool detail pages after choosing the right schema types.
4. Choose and configure an external form provider for `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
5. Add a fuller external link checker or scheduled source-review workflow when route count grows.
6. Start Supabase Auth, profiles, favorites, and RLS only in Phase 2.
