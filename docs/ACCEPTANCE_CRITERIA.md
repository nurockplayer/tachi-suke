# TachiSuke MVP Acceptance Criteria

This document defines the acceptance criteria for the current static-first MVP.

## Package Manager Criteria

- The project must use pnpm only.
- `package.json` must keep a `packageManager` value starting with `pnpm@10`.
- The repo must contain `pnpm-lock.yaml`.
- The repo must not contain:
  - `package-lock.json`
  - `yarn.lock`
  - `bun.lock`
  - `bun.lockb`
- Command examples in project documentation should use pnpm.
- Do not add `preinstall`, `install`, `postinstall`, or `prepare` scripts unless the user explicitly approves a narrow exception.

## Build Criteria

- `pnpm build` must pass before reporting completion when possible.
- Astro check must report no TypeScript or Astro diagnostics that block build.
- Static route generation must include the implemented locale routes.
- The project must remain Static Site Generation first in Phase 1.

## Test Criteria

- `pnpm test` must pass.
- `pnpm check:links` must pass after `pnpm build` when verifying built static output.
- Structure tests should verify required files, required locale routes, pnpm-only lockfile policy, content collections, `SITE_URL` fallback strategy, and finalized Place enum values.
- Phase 1B/1B.5 tests should verify minimum content depth for articles, mobile plans, and area guides.
- Phase 1B/1B.5 tests should scan Markdown/MDX article links that point to internal absolute paths and verify they match known static routes or generated article/place/mobile/area detail routes.
- `pnpm check:links` should scan built `dist/**/*.html` for root-relative `href="/..."` links and verify the matching file exists in `dist/`.
- The current static HTML crawler does not validate external links, anchors, JavaScript behavior, or visual rendering.
- New required route or model decisions should be reflected in tests when they become implementation requirements.

## i18n Routing Criteria

- Supported locales are `zh-tw`, `en`, `ja`, and `ko`.
- Locale-specific pages must use locale-prefixed routing:
  - `/zh-tw/`
  - `/en/`
  - `/ja/`
  - `/ko/`
- Shared page components may be used, but public routes should remain easy to inspect.
- User-facing copy should be natural for each locale.
- Do not add Simplified Chinese unless explicitly requested.

## Article Criteria

- Article content must come from `src/content/articles`.
- Article content should include `id`, `slug`, `locale`, `translationKey`, `title`, `description`, `category`, `tags`, `publishedAt`, `updatedAt`, and `draft`.
- Article slugs should be globally unique inside the content collection so Astro does not overwrite entries during content loading.
- Article index pages must filter to matching locale and `draft = false`.
- Article detail pages must use `getStaticPaths`.
- Article detail pages must generate only matching-locale, non-draft articles.
- Draft articles must not be public.
- Article SEO must use article title and description.
- Article `hreflang` should only point to existing non-draft translations.

## Place Criteria

- Place content must come from `src/content/places`.
- Place enum values must be:
  - `soloFriendly`: `yes`, `maybe`, `no`, `unknown`
  - `nonSmokingStatus`: `confirmed_non_smoking`, `separated_smoking_area`, `smoking_allowed`, `unknown`
  - `japaneseDifficulty`: `easy`, `normal`, `hard`, `unknown`
  - `source`: `editor`, `user_submission`, `official`
  - `status`: `draft`, `pending_review`, `published`, `rejected`, `archived`
- Place index pages must show only `status = published`.
- Place detail pages must use `getStaticPaths`.
- Place detail pages must generate only `status = published`.
- Non-published places must not be public.
- PlaceCard must link to the matching locale detail page.
- Place UI must show localized labels and must not expose internal enum values such as `confirmed_non_smoking` to users.
- Missing optional URLs must not render `undefined`.

## Area Criteria

- Area content must come from `src/content/areas`.
- Area entries must include `title`, `summary`, `lastCheckedAt`, and `notes`.
- Area index cards must link to `/[locale]/areas/[slug]`.
- Area detail pages must use `getStaticPaths`.
- Area detail pages must show rent feel, food/daily-life level, commute convenience, quietness, recommended fit, warnings, notes, and last checked date.
- Area content should be life-decision-oriented, not sightseeing-oriented.

## Mobile Plan Criteria

- Mobile plan content must come from `src/content/mobile-plans`.
- Mobile plan entries must include `officialUrl`, `lastCheckedAt`, `sourceNote`, and `notes`.
- Mobile index cards must link to `/[locale]/mobile/[slug]`.
- Mobile detail pages must use `getStaticPaths`.
- Mobile detail pages must show provider, plan name, monthly price, data amount, payment requirements, residence-card and credit-card assumptions, pros, cons, recommended fit, official URL, source note, notes, and last checked date.
- Mobile detail pages must clearly remind users that prices, terms, campaigns, identity checks, and support status can change.
- Users must be directed to official carrier sites before applying.

## Submit-Place Criteria

- Submit-place pages must be UI-only in the current MVP.
- The form must not actually submit, store, email, or publish data.
- The submit button must remain disabled until a real submission workflow is intentionally designed.
- The page must clearly state:
  - Submissions are not published directly.
  - Submissions require moderation.
  - Email is optional/private and will not be public.
  - Users should not enter other people's personal information.
  - Site owners may edit and normalize place information before publication.
- Required fields in the UI are:
  - `submissionLanguage`
  - `placeName`
  - `category`
  - `prefecture`
  - `city`
  - `googleMapUrl`
  - `recommendationReason`
- Google Maps URL must use URL input behavior.
- Email must use email input behavior.

## SEO Criteria

- Each page should have a title and description.
- HTML `lang` must match the page locale.
- Canonical URL should use `SITE_URL` or the configured Astro site fallback.
- Open Graph metadata must include `og:url` and `og:site_name = TachiSuke`.
- Public pages should use semantic HTML.
- Detail pages should avoid `hreflang` links to missing detail pages.
- Locale switcher links on detail pages should also avoid missing generated detail pages.
- The site should stay mobile-first and comfortable for long-form reading.
- Mobile plan pages must clearly remind users that prices, campaigns, eligibility, and application rules can change and must be checked on official sites.

## Placeholder Criteria

- Account login, favorites, and submissions pages must remain placeholder-only in Phase 1.
- Favorite buttons must remain placeholder-only in Phase 1.
- Account/favorites/submissions must not imply that real login, saved items, or submission history already exist.
- Submit-place must not publish or store user recommendations.
- No Supabase client, database client, or auth implementation should be added in Phase 1.

## Future Auth/Database Readiness Criteria

- Keep `src/lib/auth/`, `src/lib/db/`, `src/lib/favorites/`, and `src/lib/submissions/` as clear future boundaries.
- Keep TypeScript model boundaries for `Favorite`, `UserProfile`, and `PlaceSubmission`.
- Future favorites should use a generic `targetType` and `targetId` model.
- Future auth should protect user-specific account pages.
- Future database work must enable Row Level Security before user data ships.
- User submissions must remain moderated and must not publish directly.
