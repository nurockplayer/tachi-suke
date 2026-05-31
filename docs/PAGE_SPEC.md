# TachiSuke Page Spec

This document describes the current MVP page surface. The implementation is static-first and uses locale-prefixed routes for `zh-tw`, `en`, `ja`, and `ko`.

## Shared Page Requirements

All public pages should:

- Render with Astro static generation.
- Use locale-aware visible copy.
- Set a meaningful `<title>` and meta description through `BaseLayout`.
- Set `<html lang>` from the route locale.
- Include canonical and Open Graph metadata.
- Include a manifest link, default Open Graph image, and Twitter summary metadata.
- Keep `hreflang` conservative. Detail pages should only link to alternates that exist.
- Avoid requiring login for public content.
- Public detail pages should include a concise correction prompt that links to the locale-specific contact/corrections page.

## `/`

**Purpose:** Language entry page for users landing without a locale prefix.

**User goal:** Choose a preferred language and enter the localized site.

**Data source:** Static locale configuration from `src/lib/i18n/`.

**Rendering mode:** Static Astro page.

**SEO requirements:** Basic TachiSuke title, description, canonical URL, Open Graph metadata. This page can be indexed but should primarily guide users to locale roots.

**Current status:** Implemented.

**Future notes:** Consider redirecting based on browser language only after confirming SEO and user-experience tradeoffs.

## `/sitemap.xml`

**Purpose:** Machine-readable discovery map for search engines.

**User goal:** Not user-facing; supports crawling and indexing of public content.

**Data source:** Static route list, supported locales, `articles`, `areas`, `places`, `mobile-plans`, and `tools` content collections.

**Rendering mode:** Static Astro endpoint.

**SEO requirements:** Include public locale roots, section pages, non-draft article detail pages, published place detail pages, area detail pages, mobile plan detail pages, published tool detail pages, submit-place thanks pages, and contact/corrections pages. Exclude account placeholder routes, draft articles, non-published places, and non-published tools.

**Current status:** Implemented.

**Future notes:** Add future dynamic tool URLs only after their generated static routes are known.

## `/robots.txt`

**Purpose:** Crawler guidance and sitemap discovery.

**User goal:** Not user-facing; tells crawlers where the sitemap lives and which placeholder paths should not be crawled.

**Data source:** Supported locales and configured Astro `site` URL.

**Rendering mode:** Static Astro endpoint.

**SEO requirements:** Allow public content, disallow `/[locale]/account/`, and reference `/sitemap.xml`.

**Current status:** Implemented.

**Future notes:** Revisit once account pages become protected dynamic routes.

## `/site.webmanifest`

**Purpose:** Browser/app identity metadata.

**User goal:** Let browsers identify TachiSuke consistently if saved or installed.

**Data source:** Static brand metadata.

**Rendering mode:** Static Astro endpoint.

**SEO requirements:** Include name, short name, description, start URL, theme color, and icons.

**Current status:** Implemented.

**Future notes:** Replace SVG-only icons with a fuller icon set before a polished PWA launch.

## `/feed.xml`

**Purpose:** Global RSS feed for public article discovery across all supported locales.

**User goal:** Let readers, feed readers, search tools, and external automation discover recently updated public TachiSuke articles without choosing a language-specific feed.

**Data source:** `articles` content collection filtered to `draft = false`, sorted by `updatedAt` descending.

**Rendering mode:** Static Astro endpoint.

**SEO requirements:** Generate valid RSS 2.0 XML with absolute article URLs, titles, descriptions, categories/tags, publish dates, and per-item language metadata. Public pages should include an RSS alternate link to `/feed.xml`.

**Current status:** Implemented as a global multilingual feed in Phase 1J. Shared feed rendering now lives in `src/lib/content/rss.ts` so locale feeds can reuse the same XML behavior.

**Future notes:** Add category-specific or topic-specific feeds only after content volume justifies more feed routes.

## `/[locale]/feed.xml`

**Purpose:** Locale-specific RSS feed for public article discovery in one language.

**User goal:** Subscribe to only `zh-tw`, `en`, `ja`, or `ko` articles instead of the global multilingual feed.

**Data source:** `articles` content collection filtered to matching `locale` and `draft = false`, sorted by `updatedAt` descending.

**Rendering mode:** Static Astro endpoints through one route file per supported locale.

**SEO requirements:** Generate valid RSS 2.0 XML with locale-specific channel title, channel link, `atom:link`, feed language, absolute same-locale article URLs, categories/tags, publish dates, and per-item `dc:language`. Public pages should include both the global RSS alternate link and the current locale RSS alternate link.

**Current status:** Implemented for all four locales in Phase 1R and included in `sitemap.xml`.

**Future notes:** Keep feeds static and lightweight. Do not add per-category feeds, pagination, or runtime feed generation until content volume requires it.

## `/[locale]/search`

**Purpose:** Static utility page for searching public TachiSuke content in one locale.

**User goal:** Find relevant articles, places, mobile plans, area guides, and tools without manually browsing every section.

**Data source:** Public entries from `articles`, `places`, `mobile-plans`, `areas`, and `tools` content collections through `src/lib/content/search.ts`.

**Rendering mode:** Static Astro pages through `SearchPage`. Initial HTML includes browseable result cards, a normal GET search form, and vanilla client-side JavaScript that filters results in the browser.

**SEO requirements:** Use a meaningful title and description, locale-aware `html lang`, canonical URL, Open Graph metadata, and `robots="noindex, follow"`. Search pages are utility pages and should not appear in `sitemap.xml`.

**Current status:** Implemented for all four locales in Phase 1S and linked from the primary navigation. Phase 1Y adds shareable `?q=` URLs that prefill the input, filter results, and update the URL without adding a backend.

**Future notes:** Current search is substring-based and dependency-free. Add typo tolerance, ranking, pagination, or hosted search only after content volume justifies it.

## `/[locale]/search-index.json`

**Purpose:** Static JSON index used by the locale search page.

**User goal:** Not directly user-facing; supports fast client-side filtering over public content.

**Data source:** `src/lib/content/search.ts`, which filters to public content only: non-draft same-locale articles, published places, all current mobile plans, all current area guides, and published tools.

**Rendering mode:** Static Astro JSON endpoint.

**SEO requirements:** Must be valid JSON and excluded from `sitemap.xml`. It should not include draft articles, account placeholders, non-published places, planned tools, form data, or private data.

**Current status:** Implemented for all four locales in Phase 1S.

**Future notes:** If index size grows substantially, consider splitting by type or moving to a dedicated search service in a separately scoped phase.

## `/404.html`

**Purpose:** Static missing-page recovery page for Cloudflare Pages and other static hosts.

**User goal:** Recover from an outdated, moved, or mistyped URL by choosing a locale homepage or a useful section.

**Data source:** Static localized copy and locale configuration from `src/lib/i18n/`.

**Rendering mode:** Static Astro page.

**SEO requirements:** Must use `noindex, nofollow`, include a clear title and description, provide internal recovery links, and stay excluded from `sitemap.xml`.

**Current status:** Implemented in Phase 1Q as a branded multilingual recovery page.

**Future notes:** Do not add client-side language detection or server redirects until SEO and hosting behavior are explicitly scoped.

## `/zh-tw/`, `/en/`, `/ja/`, `/ko/`

**Purpose:** Locale homepage.

**User goal:** Understand TachiSuke positioning and enter the main content sections.

**Data source:** Localized UI copy from `src/lib/i18n/`, latest non-draft articles from `src/content/articles`, published places from `src/content/places`, and mobile plans from `src/content/mobile-plans`.

**Rendering mode:** Static Astro pages through `LocaleHomePage`.

**SEO requirements:** Locale-aware title and description, canonical URL, Open Graph metadata, `html lang`, and locale alternates.

**Current status:** Implemented for all four locales. Phase 1B adds a start-here section with internal links to articles, mobile, areas, places, submit-place, tools, and favorites placeholder.

**Future notes:** Add more real content and improve internal links once article, area, and tool inventories grow.

## `/[locale]/articles`

**Purpose:** Article index for one locale.

**User goal:** Browse practical life guides and choose an article to read.

**Data source:** `articles` content collection, filtered by matching `locale` and `draft = false`.

**Rendering mode:** Static Astro pages through `ArticlesIndexPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented for all four locales.

**Future notes:** Add category filters, richer article taxonomy, and stronger related-content navigation after content volume increases.

## `/[locale]/articles/[slug]`

**Purpose:** Article detail page.

**User goal:** Read a full Markdown/MDX guide for a practical Japan life decision.

**Data source:** `articles` content collection.

**Rendering mode:** Static generated dynamic route. Each locale has its own route file and uses `getStaticPaths`.

**SEO requirements:** Use article `title` and `description`, article category/tags/dates, canonical URL, Open Graph metadata, locale-aware `html lang`, visible breadcrumbs, static article table of contents links to generated heading anchors, `Article` JSON-LD, `BreadcrumbList` JSON-LD, and `hreflang` alternates only for existing non-draft translations connected by `translationKey`.

**Current status:** Implemented for all four locales. Draft articles are not generated. Article detail pages render a static table of contents from useful H2/H3 Markdown headings.

**Future notes:** Add table-of-contents support after content patterns stabilize. Correction prompts currently link to contact/corrections but do not prefill the form.

## `/[locale]/articles/category/[category]`

**Purpose:** Static landing page for one article category in a locale.

**User goal:** Browse guides for one practical intent, such as mobile, setup, housing, or food.

**Data source:** `articles` content collection filtered to matching `locale`, matching `category`, and `draft = false`.

**Rendering mode:** Static generated dynamic route. Each locale has its own route file and uses category static paths from `src/lib/content/article-categories.ts`.

**SEO requirements:** Use localized category title/description, canonical URL, Open Graph metadata, locale-aware `html lang`, visible breadcrumbs, conservative `WebPage` and `BreadcrumbList` JSON-LD, conservative category alternates only when the category exists in that locale, and `sitemap.xml` inclusion with `lastmod` based on the newest article update date in the category.

**Current status:** Implemented for all four locales in Phase 1T. Article index pages link to category pages, and article detail category labels link to the matching category page.

**Future notes:** Tag pages, category descriptions with richer editorial copy, and category-specific related content can wait until article volume grows.

## `/[locale]/areas`

**Purpose:** Area guide index.

**User goal:** Understand that TachiSuke will compare city and neighborhood life factors such as rent, commute, quietness, and convenience.

**Data source:** Localized static UI copy plus the `areas` content collection.

**Rendering mode:** Static Astro pages through `SimpleSectionPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented as an index/entry page. Phase 1B shows area guide cards for Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi. Phase 1B.5 links each card to its detail page.

**Future notes:** Add richer localized body content, source links, and related articles when area content becomes substantial.

## `/[locale]/areas/[slug]`

**Purpose:** Area guide detail page for comparing whether a neighborhood fits a user's living needs.

**User goal:** Check rent feel, food/daily-life convenience, commute, quietness, recommended fit, warnings, notes, and the last checked date before choosing whether to research the area further.

**Data source:** `areas` content collection.

**Rendering mode:** Static generated dynamic route. Each locale has its own route file and uses `getStaticPaths`.

**SEO requirements:** Use area `title` and `summary`, canonical URL, Open Graph metadata, locale-aware `html lang`, visible breadcrumbs, conservative `WebPage` JSON-LD, `BreadcrumbList` JSON-LD, and locale alternates only for generated area detail routes.

**Current status:** Implemented for all four locales in Phase 1B.5. UI labels are localized while current area data remains locale-neutral sample content.

**Future notes:** Add localized area content, source URLs, map context, nearby place links, and related housing/renting articles after editorial patterns stabilize.

## `/[locale]/places`

**Purpose:** Place index for useful resident-friendly places.

**User goal:** Browse restaurants, cafes, shops, and everyday places that are practical for life in Japan.

**Data source:** `places` content collection, filtered to `status = published`.

**Rendering mode:** Static Astro pages through `PlacesIndexPage`.

**SEO requirements:** Locale-specific title and description, canonical URL, Open Graph metadata, locale alternates, and readable links to place detail pages.

**Current status:** Implemented for all four locales.

**Future notes:** Add filters by area, category, station, smoking status, solo-friendly status, and payment method after data volume grows.

## `/[locale]/places/[slug]`

**Purpose:** Place detail page.

**User goal:** Check practical facts about a place before visiting or saving it later.

**Data source:** `places` content collection.

**Rendering mode:** Static generated dynamic route. Each locale has its own route file and uses `getStaticPaths`.

**SEO requirements:** Generate description from place name, category, location, and price range. Include canonical URL, Open Graph metadata, locale-aware `html lang`, visible breadcrumbs, `LocalBusiness` JSON-LD, `BreadcrumbList` JSON-LD, and locale alternates using the shared place slug.

**Current status:** Implemented for all four locales. Only `status = published` places are generated. UI labels are localized while place body data remains locale-neutral. Phase 1B adds generated guidance sections for who the place fits, use cases, watchouts, smoking notes, and payment notes.

**Future notes:** Add localized place notes, maps, and related nearby content later. If generated guidance becomes too generic, add explicit notes fields to the Place model.

## `/[locale]/mobile`

**Purpose:** Mobile plan comparison entry page.

**User goal:** Compare available mobile plan examples by documents, payment, data, coverage, and application difficulty.

**Data source:** `mobile-plans` content collection.

**Rendering mode:** Static Astro pages through `MobileIndexPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented as an index page with comparison guidance and five mobile plan cards for povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile. Phase 1B.5 links each card to its detail page.

**Future notes:** Add stronger provider comparisons, localized caveats, next review scheduling, and source-backed update workflow. Prices and plan conditions must remain clearly marked as changeable.

## `/[locale]/mobile/[slug]`

**Purpose:** Mobile plan detail page for one plan/provider option.

**User goal:** Review monthly price summary, data amount, payment requirements, residence-card and credit-card assumptions, pros, cons, recommended fit, official URL, source note, notes, and last checked date before going to the official site.

**Data source:** `mobile-plans` content collection.

**Rendering mode:** Static generated dynamic route. Each locale has its own route file and uses `getStaticPaths`.

**SEO requirements:** Use provider + plan name as title. Generate description from data amount, monthly price, and recommended user fit. Include canonical URL, Open Graph metadata, locale-aware `html lang`, visible breadcrumbs, conservative `Service` JSON-LD, `BreadcrumbList` JSON-LD, and locale alternates only for generated mobile detail routes.

**Current status:** Implemented for all four locales in Phase 1B.5. Detail pages clearly state that prices, conditions, campaigns, identity checks, and support status can change.

**Future notes:** Add localized caveats, screenshots or comparison tables if needed, and an editorial review schedule before relying on these pages for high-stakes comparison traffic.

## `/[locale]/tools`

**Purpose:** Tools and checklists entry page.

**User goal:** Find future decision tools such as moving checklists, mobile comparisons, rent calculators, and procedure guides.

**Data source:** Localized static UI copy plus published entries from the `tools` content collection.

**Rendering mode:** Static Astro pages through `SimpleSectionPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented as an index/entry page with published tool cards. Phase 1H adds `moving-to-japan-checklist`; Phase 1N adds `japan-rent-initial-cost-checklist`.

**Future notes:** Add filters or groupings once there are enough published tools. Keep this page clear that account-based saved progress is not available in Phase 1.

## `/[locale]/tools/[slug]`

**Purpose:** Static tool detail page for a checklist or decision helper.

**User goal:** Work through a practical checklist, understand caveats, and jump to related sections without needing login or saved state.

**Data source:** `tools` content collection, filtered to `status = published`.

**Rendering mode:** Static generated dynamic route. Each locale has its own route file and uses `getStaticPaths`.

**SEO requirements:** Use localized tool `title` and `description`, canonical URL, Open Graph metadata, locale-aware `html lang`, visible breadcrumbs, conservative `WebPage` JSON-LD, `ItemList` JSON-LD for checklist items, `BreadcrumbList` JSON-LD, and locale alternates only for generated tool detail routes. Published tool detail routes should appear in `sitemap.xml`.

**Current status:** Implemented for all four locales. Published tools currently include `moving-to-japan-checklist` and `japan-rent-initial-cost-checklist`, both with localized sections, notes, source note, and last checked date.

**Future notes:** Current checklist interaction is local to the page and does not persist progress. Saved tool state should wait for Phase 2 auth/database work or a separately scoped static-friendly storage decision.

## `/[locale]/submit-place`

**Purpose:** Static-site friendly page for recommending useful places through an externally configured form endpoint.

**User goal:** Recommend a useful place when submissions are enabled, or understand that the form is in preview mode when no endpoint is configured.

**Data source:** Localized static UI copy, locale-aware enum labels, and `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.

**Rendering mode:** Static Astro pages through `SubmitPlacePage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates. The page must clearly state that submissions do not publish directly.

**Current status:** Implemented for all four locales in Phase 1C. If `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is unset, the page stays in preview mode and the submit button is disabled. If the endpoint is set, the form posts with `method="POST"` to that endpoint. The form includes provider-agnostic hidden fields: `formName`, `source`, `locale`, `moderationRequired`, `publishDirectly`, and `redirectUrl`. It also includes a visually hidden `website` honeypot field for basic spam reduction.

**Future notes:** External form providers may require a provider-specific redirect field instead of `redirectUrl`. Submissions must still require moderation before publication. Phase 3 should add a real `place_submissions` table and moderation dashboard if the project moves beyond static endpoint handling.

## `/[locale]/submit-place/thanks`

**Purpose:** Thank-you page shown after an external submit-place provider redirects back to the site.

**User goal:** Confirm that the recommendation was received by the external flow and understand moderation, privacy, and publication rules.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro pages through `SubmitPlaceThanksPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, locale alternates, and internal links to places, articles, and home.

**Current status:** Implemented for all four locales in Phase 1C.

**Future notes:** If the chosen external provider requires a different redirect parameter, update the provider configuration or form hidden field mapping without changing the public route.

## `/[locale]/contact`

**Purpose:** Static-site friendly page for reporting outdated information, broken links, unclear copy, or general feedback through an externally configured form endpoint.

**User goal:** Send a correction or feedback message when contact is enabled, or understand that the form is in preview mode when no endpoint is configured.

**Data source:** Localized static UI copy and `PUBLIC_CONTACT_FORM_ENDPOINT`.

**Rendering mode:** Static Astro pages through `ContactPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates. The page must clearly state that email is optional/private, sensitive information should not be sent, and the repo does not provide a built-in support backend.

**Current status:** Implemented for all four locales in Phase 1O. If `PUBLIC_CONTACT_FORM_ENDPOINT` is unset, the page stays in preview mode and the submit button is disabled. If the endpoint is set, the form posts with `method="POST"` to that endpoint. The form includes provider-agnostic hidden fields: `formName`, `source`, `locale`, `redirectUrl`, and `publicResponse`. It also includes a visually hidden `company` honeypot field for basic spam reduction.

**Future notes:** External form providers may require a provider-specific redirect field instead of `redirectUrl`. Do not add database-backed support, analytics, or CRM behavior without a separate privacy/security review.

## `/[locale]/contact/thanks`

**Purpose:** Thank-you page shown after an external contact/corrections provider redirects back to the site.

**User goal:** Confirm that the correction or feedback message was sent and understand how TachiSuke may use it.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro pages through `ContactThanksPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, locale alternates, and internal links to home, articles, and editorial policy.

**Current status:** Implemented for all four locales in Phase 1O.

**Future notes:** If the chosen external provider requires a different redirect parameter, update provider configuration or form hidden field mapping without changing the public route.

## `/[locale]/about`

**Purpose:** Explain what TachiSuke is and what the MVP focuses on.

**User goal:** Understand the product mission, content style, and current MVP status.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro pages through `AboutPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented for all four locales.

**Future notes:** Add contributor guidelines once the static contact/corrections workflow has enough real usage.

## `/[locale]/privacy`

**Purpose:** Explain the current static-site privacy posture before launch.

**User goal:** Understand what data TachiSuke currently does and does not handle, especially around submit-place and optional email.

**Data source:** Localized static UI copy in `PolicyPage`.

**Rendering mode:** Static Astro pages through `PolicyPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, locale alternates, and footer links from all public pages.

**Current status:** Implemented for all four locales in Phase 1M. The page states that account/favorites/submissions are placeholders, submit-place and contact/corrections only post to external endpoints when configured, email is optional/private, and future auth/database features require a fuller privacy review.

**Future notes:** Replace this with a reviewed production privacy policy before collecting personal account data, adding analytics, or storing database-backed submissions.

## `/[locale]/editorial-policy`

**Purpose:** Explain TachiSuke's editorial standards, moderation rules, and information boundaries.

**User goal:** Understand that content is decision-oriented, date-sensitive, moderated, and not a substitute for official sources or professional advice.

**Data source:** Localized static UI copy in `PolicyPage`.

**Rendering mode:** Static Astro pages through `PolicyPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, locale alternates, and footer links from all public pages.

**Current status:** Implemented for all four locales in Phase 1M. The page explains that user-submitted places are not published directly, editors may normalize content, and mobile/place/area information can change.

**Future notes:** Add source-review and contributor guidelines once the editorial workflow is more mature.

## `/[locale]/account/login`

**Purpose:** Placeholder for future login.

**User goal:** Learn that login support is planned but not available in the MVP.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro placeholder page through `AccountPlaceholderPage`.

**SEO requirements:** Basic no-surprise metadata with `noindex, nofollow`. This page should not imply that authentication exists and should not be promoted for search indexing.

**Current status:** Placeholder only.

**Future notes:** Phase 2 should replace this with Supabase Auth and protected account behavior.

## `/[locale]/account/favorites`

**Purpose:** Placeholder for future saved items.

**User goal:** Learn that future accounts will allow saved articles, places, mobile plans, areas, and tools.

**Data source:** Localized static UI copy and `FavoriteButtonPlaceholder`.

**Rendering mode:** Static Astro placeholder page through `AccountPlaceholderPage`.

**SEO requirements:** Basic no-surprise metadata with `noindex, nofollow`. This page should not imply that real favorites exist and should not be promoted for search indexing.

**Current status:** Placeholder only.

**Future notes:** Phase 2 should protect this route and read favorites scoped to the authenticated user.

## `/[locale]/account/submissions`

**Purpose:** Placeholder for future user submission history.

**User goal:** Learn that future accounts may show submission status such as `pending_review`, `approved`, `rejected`, and `needs_more_info`.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro placeholder page through `AccountPlaceholderPage`.

**SEO requirements:** Basic no-surprise metadata with `noindex, nofollow`. This page should not imply that submission history exists and should not be promoted for search indexing.

**Current status:** Placeholder only.

**Future notes:** Phase 3 should connect this to moderated `place_submissions` data with user-specific access control.
