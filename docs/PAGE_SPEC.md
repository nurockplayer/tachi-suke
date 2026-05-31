# TachiSuke Page Spec

This document describes the current MVP page surface. The implementation is static-first and uses locale-prefixed routes for `zh-tw`, `en`, `ja`, and `ko`.

## Shared Page Requirements

All public pages should:

- Render with Astro static generation.
- Use locale-aware visible copy.
- Set a meaningful `<title>` and meta description through `BaseLayout`.
- Set `<html lang>` from the route locale.
- Include canonical and Open Graph metadata.
- Keep `hreflang` conservative. Detail pages should only link to alternates that exist.
- Avoid requiring login for public content.

## `/`

**Purpose:** Language entry page for users landing without a locale prefix.

**User goal:** Choose a preferred language and enter the localized site.

**Data source:** Static locale configuration from `src/lib/i18n/`.

**Rendering mode:** Static Astro page.

**SEO requirements:** Basic TachiSuke title, description, canonical URL, Open Graph metadata. This page can be indexed but should primarily guide users to locale roots.

**Current status:** Implemented.

**Future notes:** Consider redirecting based on browser language only after confirming SEO and user-experience tradeoffs.

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

**SEO requirements:** Use article `title` and `description`, article category/tags/dates, canonical URL, Open Graph metadata, locale-aware `html lang`, and `hreflang` alternates only for existing non-draft translations connected by `translationKey`.

**Current status:** Implemented for all four locales. Draft articles are not generated.

**Future notes:** Add related articles, table-of-contents support, and structured data after content patterns stabilize.

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

**SEO requirements:** Use area `title` and `summary`, canonical URL, Open Graph metadata, locale-aware `html lang`, and locale alternates only for generated area detail routes.

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

**SEO requirements:** Generate description from place name, category, location, and price range. Include canonical URL, Open Graph metadata, locale-aware `html lang`, and locale alternates using the shared place slug.

**Current status:** Implemented for all four locales. Only `status = published` places are generated. UI labels are localized while place body data remains locale-neutral. Phase 1B adds generated guidance sections for who the place fits, use cases, watchouts, smoking notes, and payment notes.

**Future notes:** Add localized place notes, structured data, maps, and related nearby content later. If generated guidance becomes too generic, add explicit notes fields to the Place model.

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

**SEO requirements:** Use provider + plan name as title. Generate description from data amount, monthly price, and recommended user fit. Include canonical URL, Open Graph metadata, locale-aware `html lang`, and locale alternates only for generated mobile detail routes.

**Current status:** Implemented for all four locales in Phase 1B.5. Detail pages clearly state that prices, conditions, campaigns, identity checks, and support status can change.

**Future notes:** Add localized caveats, screenshots or comparison tables if needed, and an editorial review schedule before relying on these pages for high-stakes comparison traffic.

## `/[locale]/tools`

**Purpose:** Tools and checklists entry page.

**User goal:** Find future decision tools such as moving checklists, mobile comparisons, rent calculators, and procedure guides.

**Data source:** Current page uses localized static UI copy. The `tools` content collection exists and stores starter tool metadata.

**Rendering mode:** Static Astro pages through `SimpleSectionPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented as an index/entry page.

**Future notes:** Add `/[locale]/tools/[slug]` detail pages when tools become real content experiences.

## `/[locale]/submit-place`

**Purpose:** UI-only page for recommending useful places.

**User goal:** Understand what information would be needed to recommend a place and see moderation/privacy rules.

**Data source:** Localized static UI copy and locale-aware enum labels.

**Rendering mode:** Static Astro pages through `SubmitPlacePage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates. The page must clearly state that submissions do not publish directly.

**Current status:** Implemented as a disabled form UI. It does not submit, store, email, or publish data.

**Future notes:** Phase 1C may choose a lightweight submission backend such as Formspree, Netlify Forms, Google Forms, GitHub Issues, or a small custom API. Submissions must still require moderation before publication.

## `/[locale]/about`

**Purpose:** Explain what TachiSuke is and what the MVP focuses on.

**User goal:** Understand the product mission, content style, and current MVP status.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro pages through `AboutPage`.

**SEO requirements:** Locale-specific title, description, canonical URL, Open Graph metadata, and locale alternates.

**Current status:** Implemented for all four locales.

**Future notes:** Add editorial policy, correction policy, and contributor guidelines later.

## `/[locale]/account/login`

**Purpose:** Placeholder for future login.

**User goal:** Learn that login support is planned but not available in the MVP.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro placeholder page through `AccountPlaceholderPage`.

**SEO requirements:** Basic no-surprise metadata. This page should not imply that authentication exists.

**Current status:** Placeholder only.

**Future notes:** Phase 2 should replace this with Supabase Auth and protected account behavior.

## `/[locale]/account/favorites`

**Purpose:** Placeholder for future saved items.

**User goal:** Learn that future accounts will allow saved articles, places, mobile plans, areas, and tools.

**Data source:** Localized static UI copy and `FavoriteButtonPlaceholder`.

**Rendering mode:** Static Astro placeholder page through `AccountPlaceholderPage`.

**SEO requirements:** Basic no-surprise metadata. This page should not imply that real favorites exist.

**Current status:** Placeholder only.

**Future notes:** Phase 2 should protect this route and read favorites scoped to the authenticated user.

## `/[locale]/account/submissions`

**Purpose:** Placeholder for future user submission history.

**User goal:** Learn that future accounts may show submission status such as `pending_review`, `approved`, `rejected`, and `needs_more_info`.

**Data source:** Localized static UI copy.

**Rendering mode:** Static Astro placeholder page through `AccountPlaceholderPage`.

**SEO requirements:** Basic no-surprise metadata. This page should not imply that submission history exists.

**Current status:** Placeholder only.

**Future notes:** Phase 3 should connect this to moderated `place_submissions` data with user-specific access control.
