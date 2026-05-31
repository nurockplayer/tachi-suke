# TachiSuke Implementation Status

This document records the current MVP state after the second-round scaffold cleanup. It should not be read as a promise that auth, database, submissions, or favorites already work.

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
- Twelve public article pages across `zh-tw`, `en`, `ja`, and `ko`, including Phase 1B decision-oriented content.
- Four locale area index pages showing area guide cards.
- Four locale place index pages.
- Four locale place detail routes at `/[locale]/places/[slug]`.
- Four locale mobile index pages with comparison guidance and mobile plan cards.
- Four locale tools index pages.
- Four locale submit-place UI pages.
- Four locale about pages.
- Four locale account login placeholder pages.
- Four locale account favorites placeholder pages.
- Four locale account submissions placeholder pages.
- Favorite button placeholder.
- Content collections for `articles`, `areas`, `places`, `mobile-plans`, and `tools`.
- Five mobile plan entries: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile.
- Four Tokyo area guide samples: Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi.
- TypeScript model boundaries for `Article`, `Place`, `MobilePlan`, `Favorite`, `UserProfile`, and `PlaceSubmission`.
- Place enum values unified across schema, types, example data, UI labels, and docs.
- Place list/detail public filtering by `status = published`.
- Article list/detail public filtering by `draft = false`.
- SEO base layout with title, description, canonical URL, Open Graph URL, Open Graph site name, locale-aware `html lang`, and conservative `hreflang`.
- Structure tests in `tests/project-structure.test.mjs`.
- Conservative article internal-link checks for locale-prefixed static/generated routes.

## Placeholder

These are intentionally present but not functional:

- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`
- `FavoriteButtonPlaceholder`
- Submit-place actual submission behavior
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

## Not Started

- Area detail pages at `/[locale]/areas/[slug]`.
- Mobile plan detail pages at `/[locale]/mobile/[slug]`.
- Tool detail pages at `/[locale]/tools/[slug]`.
- Site search.
- Map UI.
- Real submission backend.
- Authenticated account pages.
- Admin moderation dashboard.
- Personalization or AI assistant features.

## Known Limitations

- Content volume is still early editorial sample-level, though Phase 1B now has enough pages for public preview.
- Areas and tools have collections but no detail pages.
- Mobile plans are static editorial summaries. Prices, campaigns, and conditions can change, so users must confirm official sites before applying.
- Submit-place form is disabled and does not send data.
- Place body data is locale-neutral; only UI labels are localized.
- `hreflang` is conservative, but full translation coverage is not complete.
- The link check scans Markdown article links and generated/static routes, but it is not a full crawler and does not verify rendered HTML or external links.
- Account pages are static placeholders and do not protect user data because no user data exists yet.
- Browser QA currently covers basic route/card/form checks, not a full accessibility or visual regression suite.

## Verification Results

Most recent recorded verification:

- `pnpm install`: passed
- `pnpm test`: passed
- `pnpm build`: passed
- Browser QA: basic route/card/form check passed

Browser QA covered:

- Place card navigation to a place detail page.
- Submit-place form field interaction.
- Required fields and URL/email input types.
- Disabled submit button.
- No observed console error/warning during the checked flows.

## Next Recommended Tasks

1. Add more real content for renting, administrative procedures, transportation, and practical Japanese.
2. Add area, mobile plan, and tool detail routes when content supports them.
3. Improve related-content navigation inside article/detail pages.
4. Add a fuller build-time static HTML crawl or external link checker when route count grows.
5. Decide Phase 1C submission workflow technology without adding login yet.
6. Start Supabase Auth, profiles, favorites, and RLS only in Phase 2.
