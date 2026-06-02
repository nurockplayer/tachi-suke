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
- `pnpm check:content` must pass.
- `pnpm check:links` must pass after `pnpm build` when verifying built static output.
- `pnpm check:seo` must pass after `pnpm build` when verifying generated SEO output.
- `SITE_URL=<production-url> pnpm check:seo` must pass after a production-URL build when verifying deployable SEO output.
- `pnpm check:deploy` must pass after building with the real `SITE_URL` before manual Cloudflare Pages deployment.
- CI must run the same verification chain for pull requests and pushes to `main`, including a production `SITE_URL=https://tachi-suke.pages.dev` SEO/deploy output check.
- `pnpm check:content` should verify content IDs, slugs, dates, review dates, stored URL fields, and Markdown/MDX root-relative internal links without fetching the network.
- Structure tests should verify required files, required locale routes, pnpm-only lockfile policy, content collections, `SITE_URL` fallback strategy, and finalized Place enum values.
- Form contract tests should verify submit-place and contact/corrections stay provider-agnostic, env-controlled, preview-safe when endpoints are unset, and include required hidden fields, honeypot fields, required user fields, and URL/email input types.
- Phase 1B/1B.5 tests should verify minimum content depth for articles, mobile plans, and area guides.
- Source content tests should scan Markdown/MDX article links that point to internal absolute paths and verify they match known public static routes or generated article/category/place/mobile/area/tool detail routes.
- `pnpm check:links` should scan built `dist/**/*.html` for root-relative `href="/..."` links and verify the matching file exists in `dist/`.
- `pnpm check:seo` should verify built `sitemap.xml`, `robots.txt`, `site.webmanifest`, `opensearch.xml`, global RSS feed, locale RSS feeds, Cloudflare `_headers`, and Cloudflare `_redirects` against the same `SITE_URL` used for the build when provided.
- `pnpm check:seo` should verify one-hour Cloudflare Pages cache rules for all current discovery endpoints: `sitemap.xml`, `robots.txt`, `llms.txt`, `security.txt`, `opensearch.xml`, `site.webmanifest`, the global RSS feed, all locale RSS feeds, and all locale search indexes.
- Checked Cloudflare `_headers` discovery blocks should define exactly one `Cache-Control` line.
- Specific Cloudflare `_headers` blocks that set their own `Cache-Control` must detach the inherited global cache header with `! Cache-Control` before setting the specific value.
- If `SITE_URL` is unset, `pnpm check:seo` should infer the expected origin from the current built sitemap or robots output instead of assuming a different fallback domain.
- `pnpm check:deploy` should require an HTTPS `SITE_URL`, reject the example fallback domain, scan deployable `dist` text assets, and fail if `https://tachi-suke.example.com` remains in deployment output.
- `pnpm check:deploy` should also require the configured `SITE_URL` in public files that should contain production absolute URLs: sitemap, robots, OpenSearch, `llms.txt`, `security.txt`, global and locale RSS feeds, the root homepage, locale homepages, and a representative public HTML page.
- Relative-only deploy artifacts such as `site.webmanifest` and search index JSON should not be forced to contain `SITE_URL`.
- Cloudflare Pages `_redirects` should provide temporary English fallbacks for common locale-less public section paths and must not add account placeholder fallbacks.
- Cloudflare Pages `_headers` should keep HTML revalidated while applying conservative one-hour cache headers to sitemap, robots, manifest, RSS feeds, `llms.txt`, `security.txt`, `opensearch.xml`, and search indexes.
- Cloudflare Pages `_headers` should define a conservative CSP that blocks framing/object embeds while allowing current inline JSON-LD/search scripts and HTTPS external form endpoints.
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
- Reusable layout assistive labels, including primary navigation, footer navigation, article tags, and language switch controls, should use shared i18n copy instead of hard-coded English strings.
- These baseline criteria do not replace a full accessibility audit.

## Theme Criteria

- Public pages should support system, light, and dark theme preferences without adding runtime dependencies.
- The header should expose a locale-aware theme switcher with accessible pressed state.
- Language choices and theme choices should be collapsed into separate header disclosure controls rather than always showing every option.
- The closed language switcher should use a language-neutral globe icon, plus multilingual non-visual labels, and must not require understanding the current locale name to find language switching.
- The closed theme switcher should use a compact icon plus short current state, with the full localized label available through accessible text and the expanded menu.
- Opening a global language or theme disclosure should not leave overlapping peer controls open; outside click and Escape should close open controls.
- The selected theme should persist in `localStorage` using the `tachi-suke-theme` key.
- BaseLayout should initialize the saved or system theme before first paint to reduce theme flash.
- Browser `theme-color` metadata should include light and dark media variants.
- CSS should use shared theme tokens for body, header, cards, forms, article reading surfaces, and utility panels instead of hard-coded light-only surfaces.
- No-JavaScript visitors should still receive the system dark theme through `prefers-color-scheme: dark`.

## Article Criteria

- Article content must come from `src/content/articles`.
- Article content should include `id`, `slug`, `locale`, `translationKey`, `title`, `description`, `category`, `tags`, `publishedAt`, `updatedAt`, and `draft`.
- Phase 1BP must keep at least fifty-four public articles, including commuter pass, residence administration, rental initial-cost, apartment-viewing practical Japanese, ward-office moving-in procedure, apartment moving-out, garbage sorting, family restaurant comparison, everyday shopping, emergency/disaster basics, and work contract basics articles.
- Article slugs should be globally unique inside the content collection so Astro does not overwrite entries during content loading.
- Article index pages must filter to matching locale and `draft = false`.
- Article detail pages must use `getStaticPaths`.
- Article detail pages must generate only matching-locale, non-draft articles.
- Article category pages must use `getStaticPaths`.
- Article category pages must generate only categories that have matching-locale, non-draft articles.
- Article category pages must list only matching-locale, non-draft articles.
- Known article categories should have localized title and description copy instead of exposing raw category keys.
- Every public article `translationKey` must be covered by the source-level translation locale policy.
- Fully localized public article groups must contain exactly `zh-tw`, `en`, `ja`, and `ko`.
- Intentionally partial public article groups must be documented in the content-health partial-locale allowlist.
- Article category pages should emit conservative `ItemList` JSON-LD based on the same visible matching-locale, non-draft articles.
- Article index and detail pages should link to generated category pages.
- Draft articles must not be public.
- Article SEO must use article title and description.
- Article `hreflang` should only point to existing non-draft translations.
- Article detail pages should show up to three related non-draft articles from the same locale.
- Related article links must not point to the current article, drafts, or other locales.
- Article detail pages should render a static table of contents from Markdown/MDX H2/H3 headings when enough headings exist.
- Article TOC links must point to generated same-page heading anchors.
- Article detail pages should render published and updated dates with semantic `<time datetime>` elements.
- Article detail pages should show localized freshness/trust copy reminding readers that life information can change and should be verified before acting.
- Article detail pages with frontmatter `sourceLinks` should render a localized official confirmation section before the article body.
- Article `sourceLinks` must include `label` and HTTPS `url`; optional `note` may explain how to use the source.
- Emergency/disaster, work-contract basics, residence administration, first-week setup, and ward-office moving-in procedure articles should keep official source links in all four locales because the information can affect safety, legal status, administrative setup, or work decisions.

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
- Tool entries may include localized `sourceLinks` for official confirmation links.
- Tool entries must include `lastCheckedAt`.
- Tool index cards must link to `/[locale]/tools/[slug]`.
- Tool detail pages must use `getStaticPaths`.
- Tool detail pages must generate only `status = published` tools.
- Planned or draft tools must not be public.
- Tool detail pages must show localized sections, notes, source note, and last checked date.
- Tool detail pages must show official source links when `sourceLinks` are present.
- Phase 1 tool pages must stay static and must not imply that checklist progress is saved.
- Phase 1CH must keep at least ten published static tools, including `moving-to-japan-checklist`, `japan-rent-initial-cost-checklist`, `ward-office-moving-in-checklist`, `commuter-pass-ic-card-checklist`, `apartment-viewing-japanese-phrases`, `apartment-application-documents-checklist`, `japan-job-application-documents-checklist`, `japan-everyday-shopping-checklist`, `moving-out-checklist`, and `japan-emergency-disaster-checklist`.

## Static Search Criteria

- Four locale search pages must exist at `/[locale]/search`.
- Four locale search index JSON endpoints must exist at `/[locale]/search-index.json`.
- Search pages must be static and must not require login, a database, a hosted search service, or a server runtime.
- Search pages must use `robots="noindex, follow"`.
- Search pages must support shareable GET query URLs with `q`, such as `/en/search?q=Denny`.
- Search pages should read the initial `q` value, prefill the input, filter client-side results, and keep the URL query in sync.
- Search pages should show a localized recoverable empty state for zero-result queries, including helper copy and a clear-search action that removes `q` and restores all results.
- Build-output SEO tests should verify the same noindex, locale-aware GET action, `q` query, locale search-index, empty-state, clear-search, and public-result contracts for all four locale search pages.
- Search pages and search index JSON endpoints must not appear in `sitemap.xml`.
- Search indexes must include only public content:
  - matching-locale non-draft articles
  - published places
  - current mobile plans
  - current area guides
  - published tools
- Search indexes must not include account placeholders, draft articles, non-published places, planned tools, form submissions, or private user data.
- `pnpm check:seo` should verify all four built locale search indexes contain exactly the expected public content collection routes and exclude utility, trust, form, account, draft, planned, and non-published content routes.
- Search should remain dependency-free in Phase 1 unless a future phase explicitly scopes a search service.

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
- Open Graph metadata should include current `og:locale` and supported `og:locale:alternate` values when alternates exist.
- `pnpm check:seo` should verify every sitemap-derived indexable public HTML page has canonical and `og:url` metadata that both match the generated absolute page URL.
- `pnpm check:seo` should verify every sitemap-derived indexable public HTML page has non-empty title, meta description, Open Graph title/description, and Twitter title/description metadata, with social title/description aligned to the regular page metadata.
- `pnpm check:seo` should verify every sitemap-derived indexable public HTML page has the expected `html lang`, mobile viewport metadata, skip link to `#main-content`, and stable `main#main-content` landmark.
- `pnpm check:seo` should verify every sitemap-derived indexable public HTML page links the SVG favicon, web manifest, OpenSearch description, global RSS feed, and current-locale RSS feed.
- Article detail pages should include `article:published_time`, `article:modified_time`, `article:section`, and `article:tag` Open Graph metadata.
- Twitter metadata should use `summary_large_image`.
- Pages should link `/site.webmanifest`.
- Pages should include browser app metadata: `theme-color`, `application-name`, `apple-mobile-web-app-title`, and `format-detection`.
- `sitemap.xml` must include public locale roots, section pages, human-readable site map pages, the global RSS feed, locale RSS feeds, non-draft article details, article category pages, published place details, area details, mobile plan details, published tool details, submit-place thanks pages, contact/corrections pages, and launch trust pages.
- `sitemap.xml` must exclude account placeholder routes, draft articles, non-published places, non-published tools, search pages, and search index JSON endpoints.
- `pnpm check:seo` should derive expected public sitemap paths from current content collections so newly added public articles, categories, areas, mobile plans, published places, and published tools are checked without manually extending a sample path list.
- Human-readable `/[locale]/site-map` pages must list public content only and must not expose account placeholder routes.
- `sitemap.xml` should include conservative `xhtml:link` hreflang alternates for generated shared locale pages and translated article detail pages.
- Article sitemap alternates must be grouped by `translationKey` and must not point to missing or draft translations.
- `robots.txt` must reference the sitemap and disallow `/[locale]/account/`.
- `llms.txt` must be generated as plain text, summarize the product positioning, and link only to public discovery surfaces such as sitemap, human-readable site map pages, RSS feeds, locale roots, and search indexes.
- `/.well-known/security.txt` must be generated as plain text, point `Contact` to `/en/contact`, include `Canonical`, `Preferred-Languages`, and a future `Expires` value, and must not imply a private support backend.
- `opensearch.xml` must be generated as an OpenSearch description and use the static English search template `/en/search?q={searchTerms}`.
- Public pages should include a `rel="search"` link to `/opensearch.xml`.
- `feed.xml` must be generated as an RSS 2.0 feed for non-draft public article detail pages.
- `/[locale]/feed.xml` must be generated as an RSS 2.0 feed for same-locale non-draft public article detail pages.
- `pnpm check:seo` should verify global and locale RSS item URLs against the current non-draft article content collection, not a hand-maintained sample slug list.
- Global and locale RSS feed sitemap entries should include `lastmod` derived from the newest matching public article `updatedAt`.
- Public aggregate sitemap entries for `/[locale]/articles`, `/[locale]/areas`, `/[locale]/places`, `/[locale]/mobile`, `/[locale]/tools`, and `/[locale]/site-map` should include content-derived `lastmod` values.
- Locale homepage sitemap entries at `/[locale]/` should include content-derived `lastmod` values.
- Public pages should include an RSS alternate link to `/feed.xml` and a current-locale RSS alternate link to `/[locale]/feed.xml`.
- `404.html` must be generated as a branded static recovery page.
- `404.html` must use `noindex, nofollow` and must not appear in `sitemap.xml`.
- `404.html` should use a language-neutral visible heading and include top recovery explanations in all supported locales.
- `404.html` language selector guidance should be multilingual, not fixed English-only copy.
- `404.html` should include locale-specific recovery links for each supported locale home, articles, mobile, and tools route.
- Locale-specific recovery sections on `404.html` should carry appropriate BCP47 language metadata.
- Account placeholder pages must use `noindex, nofollow`.
- Every sitemap-derived indexable public HTML page should include at least one parseable JSON-LD script.
- Parsed JSON-LD should not contain string values exactly equal to `undefined` or `null`.
- Site-wide `WebSite` JSON-LD should include a conservative `SearchAction` targeting `/en/search?q={search_term_string}`.
- Locale homepages should include conservative `WebPage` and start-here `ItemList` JSON-LD backed by rendered homepage copy and links.
- Article index pages should include conservative `CollectionPage` and `ItemList` JSON-LD backed by rendered same-locale public article lists.
- Mobile, area, place, and tool index pages should include conservative `CollectionPage` and `ItemList` JSON-LD backed by rendered public cards.
- `pnpm check:seo` should verify mobile, area, place, and tool index JSON-LD across every supported locale, including language, canonical URL, locale-home breadcrumb, public item count, and detail URL prefixes.
- Public collection index pages should include conservative `BreadcrumbList` JSON-LD from locale home to the current section.
- Article detail pages should include `Article` and `BreadcrumbList` JSON-LD.
- Article category pages should include conservative `WebPage` and `BreadcrumbList` JSON-LD.
- Place detail pages should include `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Mobile plan detail pages should include conservative `Service` and `BreadcrumbList` JSON-LD.
- Area detail pages should include conservative `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail pages should include conservative `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- Public trust/form pages, including about, privacy, editorial policy, contact, and submit-place, should include conservative `WebPage` and two-level `BreadcrumbList` JSON-LD.
- Human-readable site map pages should include `WebPage` JSON-LD whose `inLanguage` value matches the shared BCP47 HTML language metadata for the current locale.
- JSON-LD must not invent ratings, review counts, opening hours, coordinates, offers, or exact addresses that are not in the content model.
- Public article, area, place, mobile, and tool collection index pages should render visible breadcrumbs from locale home to the current section.
- Nested public article, article category, place, mobile plan, area, and tool pages should render visible breadcrumbs.
- Visible breadcrumbs must be locale-aware, link only to existing public parent routes, and mark the current page with `aria-current="page"`.
- Public article index rows, article category page rows, and homepage latest-article cards should display localized article category labels, not raw content category keys.
- Article detail pages should display localized article category labels in visible metadata, visible breadcrumbs, Open Graph `article:section`, `Article` JSON-LD `articleSection`, and breadcrumb JSON-LD category names.
- Reusable assistive labels should come from shared `getUiCopy` keys, including primary/footer navigation, article tag lists, article category lists, and place fact lists.
- Public pages should use semantic HTML.
- Detail pages should avoid `hreflang` links to missing detail pages.
- Locale switcher links on detail pages should also avoid missing generated detail pages.
- The site should stay mobile-first and comfortable for long-form reading.
- Published static tools should include practical housing and procedure checklists without requiring login or saved state in Phase 1.
- Mobile plan pages must clearly remind users that prices, campaigns, eligibility, and application rules can change and must be checked on official sites.

## Content Maintenance Criteria

- Public article, place, mobile plan, area, and tool detail pages should include a localized correction prompt.
- The prompt should link to `/[locale]/contact`.
- When the current public detail path is known, the prompt should append an encoded absolute `relatedUrl` query value for the current page.
- Build-output SEO tests should verify the encoded `relatedUrl` behavior for representative article, place, mobile plan, area, tool, and non-English detail pages.
- The contact/corrections page should prefill its related URL field from `relatedUrl` as progressive browser-side enhancement.
- The prompt must not imply guaranteed individual replies or real-time verification.
- The prompt must not add analytics, authentication, database storage, or provider-specific form behavior.

## Placeholder Criteria

- Account login, favorites, and submissions pages must remain placeholder-only in Phase 1.
- Favorite buttons must remain placeholder-only in Phase 1.
- Account/favorites/submissions must not imply that real login, saved items, or submission history already exist.
- Submit-place must not publish or store user recommendations.
- Submit-place can post to an external endpoint when configured, but account pages and favorite buttons remain placeholder-only.
- Contact/corrections can post to an external endpoint when configured, but the repo must not store contact messages or imply a support backend exists.
- Submit-place and contact/corrections must not hard-code external form provider URLs.
- No Supabase client, database client, or auth implementation should be added in Phase 1.

## Future Auth/Database Readiness Criteria

- Keep `src/lib/auth/`, `src/lib/db/`, `src/lib/favorites/`, and `src/lib/submissions/` as clear future boundaries.
- Keep TypeScript model boundaries for `Favorite`, `UserProfile`, and `PlaceSubmission`.
- Future favorites should use a generic `targetType` and `targetId` model.
- Future auth should protect user-specific account pages.
- Future database work must enable Row Level Security before user data ships.
- User submissions must remain moderated and must not publish directly.
