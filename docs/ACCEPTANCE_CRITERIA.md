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
- Cloudflare Pages static output directory must remain `dist`.
- `wrangler.toml` must not contain account IDs, API tokens, or deployment secrets.

## Test Criteria

- `pnpm test` must pass.
- `pnpm check:links` must pass after `pnpm build` when verifying built static output.
- `pnpm check:seo` must pass after `pnpm build` when verifying generated SEO output.
- CI must run the same verification chain for pull requests and pushes to `main`.
- Structure tests should verify required files, required locale routes, pnpm-only lockfile policy, content collections, `SITE_URL` fallback strategy, and finalized Place enum values.
- Phase 1B/1B.5 tests should verify minimum content depth for articles, mobile plans, and area guides.
- Phase 1B/1B.5/1H tests should scan Markdown/MDX article links that point to internal absolute paths and verify they match known static routes or generated article/place/mobile/area/tool detail routes.
- `pnpm check:links` should scan built `dist/**/*.html` for root-relative `href="/..."` links and verify the matching file exists in `dist/`.
- `pnpm check:seo` should verify built `sitemap.xml`, `robots.txt`, `site.webmanifest`, and Cloudflare `_headers`.
- The current static HTML crawler does not validate external links, anchors, JavaScript behavior, or visual rendering.
- New required route or model decisions should be reflected in tests when they become implementation requirements.
- CI must reject `package-lock.json`, `yarn.lock`, `bun.lock`, and `bun.lockb`.
- CI must use pnpm commands and must not use command-level npm, yarn, or bun invocations.

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

## Accessibility Criteria

- Public pages should expose a skip link to the main content.
- The main landmark should have a stable `id="main-content"` target.
- Primary navigation should mark the active section with `aria-current`.
- Keyboard focus must be visible with `:focus-visible` styles.
- These baseline criteria do not replace a full accessibility audit.

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
- Article detail pages should show up to three related non-draft articles from the same locale.
- Related article links must not point to the current article, drafts, or other locales.

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

## Tool Criteria

- Tool content must come from `src/content/tools`.
- Tool entries must include localized `title`, `description`, `sourceNote`, `notes`, and checklist section copy for `zh-tw`, `en`, `ja`, and `ko`.
- Tool entries must include `lastCheckedAt`.
- Tool index cards must link to `/[locale]/tools/[slug]`.
- Tool detail pages must use `getStaticPaths`.
- Tool detail pages must generate only `status = published` tools.
- Planned or draft tools must not be public.
- Tool detail pages must show localized sections, notes, source note, and last checked date.
- Phase 1 tool pages must stay static and must not imply that checklist progress is saved.
- Phase 1N must keep at least two published static tools, including `moving-to-japan-checklist` and `japan-rent-initial-cost-checklist`.

## Submit-Place Criteria

- Submit-place pages must remain static-site friendly in Phase 1C.
- The form action must come from `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
- If `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is unset, the page must show preview-mode copy and keep the submit button disabled.
- If `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is set, the form must use `method="POST"` and enable the submit button.
- The repo must not hard-code a specific form provider URL.
- The repo must not store, moderate, or publish submissions directly.
- The page must clearly state:
  - Submissions are not published directly.
  - Submissions require moderation.
  - Email is optional/private and will not be public.
  - Users should not enter other people's personal information.
  - Users should not enter sensitive information.
  - Site owners may edit and normalize place information before publication.
  - Hours, prices, payment methods, and smoking rules can change.
- The form must include hidden fields:
  - `formName = submit-place`
  - `source = tachi-suke`
  - `locale`
  - `moderationRequired = true`
  - `publishDirectly = false`
  - `redirectUrl`
- The form must include a visually hidden honeypot field such as `website`.
- Honeypot is basic spam reduction only and must not be documented as complete spam prevention.
- Required fields in the UI are:
  - `submissionLanguage`
  - `placeName`
  - `category`
  - `prefecture`
  - `city`
  - `googleMapUrl`
  - `recommendationReason`
- Google Maps URL must use URL input behavior.
- Official URL must use URL input behavior.
- Email must use email input behavior.
- Four locale thanks pages must exist at `/[locale]/submit-place/thanks`.
- Thanks pages must explain moderation, privacy, non-public email, normalization, and provide links back to places, articles, and home.

## Contact/Corrections Criteria

- `.env.example` must include `PUBLIC_CONTACT_FORM_ENDPOINT`.
- Four locale contact pages must exist at `/[locale]/contact`.
- Four locale contact thanks pages must exist at `/[locale]/contact/thanks`.
- If `PUBLIC_CONTACT_FORM_ENDPOINT` is unset, the page must show preview-mode copy and keep the submit button disabled.
- If `PUBLIC_CONTACT_FORM_ENDPOINT` is set, the form must use `method="POST"` and enable the submit button.
- The repo must not hard-code a specific form provider URL.
- The repo must not store contact messages or implement a support backend in Phase 1.
- The page must clearly state:
  - Email is optional/private.
  - Users should not enter sensitive information.
  - Users should not enter other people's personal information.
  - TachiSuke may use reports to correct or improve public content.
  - Individual replies are not guaranteed.
- The form must include hidden fields:
  - `formName = contact-corrections`
  - `source = tachi-suke`
  - `locale`
  - `redirectUrl`
  - `publicResponse = false`
- The form must include a visually hidden honeypot field such as `company`.
- Honeypot is basic spam reduction only and must not be documented as complete spam prevention.
- Required fields in the UI are:
  - `contactLanguage`
  - `topic`
  - `message`
- Related page URL must use URL input behavior.
- Email must use email input behavior.

## Trust Page Criteria

- Four locale privacy pages must exist at `/[locale]/privacy`.
- Four locale editorial policy pages must exist at `/[locale]/editorial-policy`.
- Footer navigation should link to contact, privacy, and editorial policy pages.
- Privacy pages should explain that Phase 1 is static-first, account pages are placeholders, submit-place/contact only post to external endpoints when configured, and optional email is private/not public.
- Editorial policy pages should explain that content is decision-oriented, user-submitted places are moderated, and price/hours/terms can change.
- These pages must not imply that auth, database-backed submissions, saved user data, analytics, or a final legal policy already exist.

## SEO Criteria

- Each page should have a title and description.
- HTML `lang` must match the page locale.
- Canonical URL should use `SITE_URL` or the configured Astro site fallback.
- Open Graph metadata must include `og:url` and `og:site_name = TachiSuke`.
- Open Graph metadata must include a default `og:image`.
- Twitter metadata should use `summary_large_image`.
- Pages should link `/site.webmanifest`.
- `sitemap.xml` must include public locale roots, section pages, non-draft article details, published place details, area details, mobile plan details, published tool details, submit-place thanks pages, contact/corrections pages, and launch trust pages.
- `sitemap.xml` must exclude account placeholder routes, draft articles, non-published places, and non-published tools.
- `robots.txt` must reference the sitemap and disallow `/[locale]/account/`.
- `feed.xml` must be generated as an RSS 2.0 feed for non-draft public article detail pages.
- Public pages should include an RSS alternate link to `/feed.xml`.
- Account placeholder pages must use `noindex, nofollow`.
- Built pages should include parseable JSON-LD for site identity.
- Article detail pages should include `Article` and `BreadcrumbList` JSON-LD.
- Place detail pages should include `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Mobile plan detail pages should include conservative `Service` and `BreadcrumbList` JSON-LD.
- Area detail pages should include conservative `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail pages should include conservative `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- JSON-LD must not invent ratings, review counts, opening hours, coordinates, offers, or exact addresses that are not in the content model.
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
- Submit-place can post to an external endpoint when configured, but account pages and favorite buttons remain placeholder-only.
- Contact/corrections can post to an external endpoint when configured, but the repo must not store contact messages or imply a support backend exists.
- No Supabase client, database client, or auth implementation should be added in Phase 1.

## Future Auth/Database Readiness Criteria

- Keep `src/lib/auth/`, `src/lib/db/`, `src/lib/favorites/`, and `src/lib/submissions/` as clear future boundaries.
- Keep TypeScript model boundaries for `Favorite`, `UserProfile`, and `PlaceSubmission`.
- Future favorites should use a generic `targetType` and `targetId` model.
- Future auth should protect user-specific account pages.
- Future database work must enable Row Level Security before user data ships.
- User submissions must remain moderated and must not publish directly.
