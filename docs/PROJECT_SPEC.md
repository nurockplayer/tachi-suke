# TachiSuke Project Spec

## 1. Project Overview

TachiSuke is a multilingual Japan life decision assistant for people living in Japan, preparing to move to Japan, studying in Japan, working in Japan, or staying in Japan long-term.

Chinese name: 達助日本生活  
English name: Japan Life Assistant  
Repo name: `tachi-suke`

The product helps foreign residents make practical daily-life decisions in Japan. It focuses on topics such as mobile plans, renting, transportation, food, shopping, administrative procedures, practical Japanese, work, and resident-friendly places.

The current MVP is an Astro static site with locale-prefixed routing, content collections, article detail pages, place detail pages, mobile plan detail pages, area detail pages, static tool detail pages, static public-content search, global and locale-specific RSS feeds, placeholder account pages, placeholder favorite UI, a submit-place form, and a contact/corrections form. Both forms can post to provider-agnostic external endpoints when configured.

## 2. Brand Concept

`Tachi` can reference 立ち, 達, and Tachiko. `Suke` references 助け and 助.

The brand meaning is:

> Help people stand on their own feet and build a stable life in Japan.

The product should feel calm, practical, friendly, and decision-oriented. It should not feel like a generic travel blog, a tourist list, or an unmoderated review platform.

## 3. Product Positioning

TachiSuke is a content-first life decision guide for Japan. Its core value is helping users compare options, avoid common mistakes, and decide what to do next.

Prefer:

- Comparisons
- Checklists
- Step-by-step guides
- Decision trees
- Warnings and pitfalls
- Foreign-resident-friendly explanations
- Multilingual clarity
- SEO-friendly content
- Practical notes grounded in daily life

Avoid:

- Generic sightseeing content
- Vague lifestyle essays
- Taiwan-only positioning
- Unmoderated public reviews
- Public comments in the MVP
- Over-engineered dynamic features before content quality is proven

## 4. Target Users

Primary users:

- People newly arrived in Japan who need to set up mobile service, address registration, daily shopping, transportation, and basic procedures.
- People preparing to move to Japan who want to understand costs, neighborhoods, documents, and first-week tasks.
- Students, workers, and long-term residents who need practical multilingual information.
- Foreign residents with limited Japanese who need clear explanations and vocabulary support.
- Users who prefer structured comparisons and checklists over long, vague articles.

TachiSuke should be useful for a broad foreign-resident audience, not only Taiwanese users.

## 5. Core User Problems

- Mobile plans in Japan are hard to compare because requirements differ by carrier, payment method, identity verification, and residence status.
- Renting and neighborhood decisions require practical local context that is often scattered across multiple sources.
- Administrative procedures are stressful because users may not know the correct order, documents, or Japanese terms.
- Everyday food, shopping, and service choices are easier with resident-friendly notes such as solo-friendly status, non-smoking status, payment methods, and Japanese difficulty.
- Many users need multilingual help, but translations may be incomplete at early stages.
- Users need trustworthy recommendations, but user-submitted content must be moderated before publication.

## 6. Product Principles

- Static-first until dynamic features are necessary.
- Public content should be readable without login.
- Every page should have a clear user goal.
- Content should help users make decisions, not just browse.
- Missing translations should degrade gracefully.
- User submissions must not publish directly.
- Account, favorites, submissions, auth, and database features should remain clear placeholders until their implementation phase.
- Data models should be simple enough for content collections now and Supabase Postgres later.

## 7. Supported Locales

Supported locales:

- `zh-tw`: Traditional Chinese
- `en`: English
- `ja`: Japanese
- `ko`: Korean

Locale-specific routes are physical routes under `src/pages/{locale}/`.

Current locale roots:

- `/zh-tw/`
- `/en/`
- `/ja/`
- `/ko/`

Do not add Simplified Chinese unless explicitly requested in the future.

## 8. i18n Strategy

All user-facing UI text should be natural for the target locale. The project uses shared page components where appropriate, but each locale route is explicit so static generation remains easy to inspect.

Content items that are translated should include:

- `id`
- `slug`
- `locale`
- `translationKey`

`translationKey` connects different language versions of the same concept. Article detail pages use it to build conservative `hreflang` links only for existing non-draft translations.

Place content is currently locale-neutral. Place detail pages reuse the same `slug` across locales while localizing UI labels such as solo-friendly status, non-smoking status, Japanese difficulty, and field names.

Mobile plan and area detail pages currently reuse locale-neutral data across locale routes while localizing UI labels and decision reminders.

## 9. Locale Fallback Strategy

Expected fallback order for content:

1. Requested locale
2. English
3. Traditional Chinese
4. Clear missing-content state

The current MVP has the routing and metadata structure needed for fallback behavior, but most pages still render only locale-specific content or static localized UI copy. Future content utilities should implement fallback without silently showing the wrong locale.

## 10. MVP Scope

The MVP includes:

- Astro + TypeScript static site
- pnpm-only package management
- Locale-prefixed routing for `zh-tw`, `en`, `ja`, and `ko`
- Four locale homepages
- Article index pages
- Article detail pages generated from Markdown/MDX content
- Article category landing pages generated from non-draft article frontmatter
- Related article links generated at build time for article detail pages
- Correction prompts on public detail pages that link readers to the contact/corrections route
- Twelve public article pages across the supported locales in the current Phase 1B baseline
- Areas index pages with Tokyo area guide cards
- Area detail pages generated from JSON content with decision notes, warnings, `lastCheckedAt`, and maintenance notes
- Places index pages
- Place detail pages generated from JSON content with practical guidance sections
- Mobile index pages with comparison guidance and five mobile plan entries
- Mobile plan detail pages generated from JSON content with official URLs, `lastCheckedAt`, source notes, caveats, pros, cons, and recommended fit
- Tools index pages with published tool cards
- Tool detail pages generated from JSON content with localized checklist sections, source notes, caveats, and `lastCheckedAt`
- Published tools: `moving-to-japan-checklist`, `japan-rent-initial-cost-checklist`
- Static search pages at `/[locale]/search`, including shareable `?q=` query behavior
- Static search index JSON endpoints at `/[locale]/search-index.json`
- Submit-place form with preview mode, external endpoint support, hidden moderation metadata, and thanks pages
- Contact/corrections form with preview mode, external endpoint support, hidden provider metadata, honeypot, and thanks pages
- About pages
- Account placeholder pages
- Favorite placeholder button
- Content collections for articles, areas, places, mobile plans, and tools
- TypeScript model files for future auth, favorites, users, and submissions
- SEO-oriented `BaseLayout`
- Generated `sitemap.xml`, `robots.txt`, and `site.webmanifest`
- Generated global `feed.xml` for public articles
- Generated locale RSS feeds at `/[locale]/feed.xml` for same-locale public articles
- Custom static `404.html` recovery page with `noindex, nofollow`
- Default Open Graph image and Twitter summary metadata
- Browser/PWA metadata for theme color, app name, Apple app title, and phone number format detection
- JSON-LD structured data for `Organization`, `WebSite`, `Article`, `LocalBusiness`, `Service`, `WebPage`, `ItemList`, and `BreadcrumbList`
- Visible breadcrumbs for nested public article, category, place, mobile plan, area, and tool pages
- Static article table of contents generated from Markdown/MDX headings
- Cloudflare Pages `_headers` for conservative security and cache defaults
- Cloudflare Pages `wrangler.toml` metadata for `dist` static output
- `SITE_URL` environment variable with example-domain fallback
- Structure tests in `tests/project-structure.test.mjs`
- Content health checks in `tests/content-health.test.mjs`
- Conservative Markdown internal-link checks in `tests/project-structure.test.mjs`
- Post-build static HTML internal link checks in `tests/static-html-links.test.mjs`
- Post-build SEO output checks in `tests/seo-output.test.mjs`
- GitHub Actions CI quality gate for pull requests and pushes to `main`, including source tests, content health, build, link, and SEO checks

## 11. Out-of-Scope for MVP

The MVP must not implement:

- Real login
- Supabase Auth
- Database client setup
- Postgres persistence
- Row Level Security policies in runtime code
- Real favorites
- Native/database-backed submit-place submission handling
- Native/database-backed contact/support message handling
- Public comments
- Payment features
- Large CMS or admin dashboard
- Direct public publishing from user submissions

## 12. Current Implemented Routes

Root:

- `/`

Locale home:

- `/zh-tw/`
- `/en/`
- `/ja/`
- `/ko/`

Content and section pages:

- `/[locale]/articles`
- `/[locale]/articles/[slug]`
- `/[locale]/articles/category/[category]`
- `/[locale]/areas`
- `/[locale]/areas/[slug]`
- `/[locale]/places`
- `/[locale]/places/[slug]`
- `/[locale]/mobile`
- `/[locale]/mobile/[slug]`
- `/[locale]/tools`
- `/[locale]/tools/[slug]`
- `/[locale]/search`
- `/[locale]/search-index.json`
- `/[locale]/submit-place`
- `/[locale]/submit-place/thanks`
- `/[locale]/contact`
- `/[locale]/contact/thanks`
- `/[locale]/about`
- `/[locale]/privacy`
- `/[locale]/editorial-policy`
- `/[locale]/feed.xml`

Account placeholder pages:

- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`

SEO and discovery routes:

- `/sitemap.xml`
- `/robots.txt`
- `/site.webmanifest`
- `/feed.xml`
- `/404.html`

Article detail pages are generated only for non-draft articles matching the locale route. Place detail pages are generated only for places where `status = published`. Area, mobile, and published tool detail pages are generated from their static content collections.

## 13. Current Placeholder Routes

These routes exist and are intentionally placeholder-only:

- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`

The submit-place route is static-site friendly in the MVP:

- `/[locale]/submit-place`

It displays a full form and moderation notice. If `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` is unset, it stays in preview mode and does not send. If configured, it posts to the external endpoint, but the repo still does not store, review, or publish submissions.

The contact/corrections route is also static-site friendly:

- `/[locale]/contact`

It lets users report outdated information, broken links, unclear content, or general feedback. If `PUBLIC_CONTACT_FORM_ENDPOINT` is unset, it stays in preview mode and does not send. If configured, it posts to the external endpoint, but the repo still does not store messages or provide a support backend.

## 14. Content-First Strategy

TachiSuke should prove value through high-quality content before adding complex dynamic features.

Priority content types:

- Mobile plan comparisons
- First-week Japan setup checklists
- Rent initial-cost checklists
- Renting and neighborhood guides
- Administrative procedure guides
- Practical Japanese phrase guides
- Resident-friendly place recommendations
- Everyday shopping and food guides
- Tools and checklists that support decisions

Article pages should include clear titles, descriptions, categories, tags, publish dates, update dates, and readable content. Place pages should show practical details such as location, nearest station, price range, solo-friendly status, non-smoking status, Japanese difficulty, payment methods, Google Maps link, and official URL when available.

Mobile plan pages must show official URLs, `lastCheckedAt`, source notes, and caveats because carrier prices, campaigns, identity checks, payment methods, and eSIM/SIM support can change. Area guide pages must show `lastCheckedAt` and notes because rent feel, quietness, and commute convenience can become stale. Tool pages should be static, checklist-oriented, and explicit that progress is not saved in Phase 1.

## 15. Future Auth/Database Strategy

Future dynamic features should start in Phase 2 or later.

Recommended direction:

- Supabase Auth for login
- Supabase Postgres for profiles, favorites, and submissions
- Row Level Security before any user data ships
- Astro SSR or hybrid rendering for protected account pages
- Public content remains static-first where possible

Reserved boundaries:

- `src/lib/auth/`
- `src/lib/db/`
- `src/lib/favorites/`
- `src/lib/submissions/`
- `src/types/user.ts`
- `src/types/favorite.ts`
- `src/types/submission.ts`

Current deployment direction:

- Prefer Cloudflare Pages for Phase 1 static deployment.
- Use `pnpm build` with output directory `dist`.
- Keep `wrangler.toml` free of secrets and limited to Pages-safe project metadata.
- Set `SITE_URL` to the production domain so canonical URLs, sitemap URLs, robots sitemap reference, and Open Graph URLs are correct.
- Keep Astro until SSR/account requirements are concrete. A Next.js migration is not justified for the current content-first static MVP.

## 16. Success Metrics for MVP

Product and content metrics:

- Users can understand the product purpose from every locale homepage.
- Users can browse articles and places without login.
- Users can reach all main sections from locale navigation.
- Article and place detail pages are indexable and readable.
- Article category landing pages expose category intent such as mobile, setup, housing, and food.
- Article pages guide readers to related same-locale articles.
- Published tool pages can serve practical checklist intent without requiring login.
- Users can search current public content without login or a backend.
- Place labels are understandable in each locale and do not expose internal enum values.
- Submit-place clearly explains moderation and privacy limits.
- Contact/corrections clearly explains privacy limits, optional email, and that individual replies are not guaranteed.
- Public detail pages provide a clear correction prompt so outdated information and broken links can be reported.
- Privacy and editorial policy pages make the static MVP's data, moderation, and content boundaries clear before launch.

Engineering metrics:

- `pnpm install` succeeds.
- `pnpm test` succeeds.
- `pnpm check:content` succeeds.
- `pnpm build` succeeds.
- `pnpm check:links` succeeds after `pnpm build`.
- `pnpm check:seo` succeeds after `pnpm build`.
- GitHub Actions CI runs forbidden lockfile rejection, frozen pnpm install, source tests, content health check, static build, link check, and SEO output check.
- No forbidden lockfiles are present.
- Draft articles do not generate public article detail pages.
- Non-published places do not appear in public lists or detail pages.
- SEO metadata includes title, description, canonical URL, Open Graph URL, Open Graph site name, Open Graph image, Twitter card metadata, locale-aware `html lang`, manifest link, and conservative `hreflang`.
- Browser metadata includes `theme-color`, `application-name`, `apple-mobile-web-app-title`, and `format-detection`.
- `sitemap.xml` includes public content and excludes account placeholders.
- `sitemap.xml` includes public article category landing pages.
- `sitemap.xml` includes public privacy and editorial policy pages.
- `sitemap.xml` includes public contact/corrections pages.
- `sitemap.xml` excludes noindex search pages and search index JSON endpoints.
- `robots.txt` references the sitemap and disallows placeholder account routes.
- `404.html` is generated, marked `noindex, nofollow`, and excluded from `sitemap.xml`.
- `feed.xml` includes non-draft public article detail pages across supported locales.
- `/[locale]/feed.xml` includes only same-locale non-draft public article detail pages.
- Built representative pages include parseable JSON-LD for site identity, article detail pages, place detail pages, mobile plan detail pages, area detail pages, tool detail pages, and breadcrumbs.
- Structured data must not claim unavailable ratings, review counts, opening hours, coordinates, offers, or exact addresses.
- Nested public pages render visible breadcrumbs that link to existing parent routes and mark the current page with `aria-current="page"`.
- Article detail pages render a static table of contents with links to generated same-page heading anchors.
- Detail-page language switcher links avoid missing generated pages.

## 17. Non-Goals

- Becoming a generic Japan travel website.
- Becoming an open public review platform.
- Supporting only Taiwanese users.
- Building authentication before content and SEO foundations are stable.
- Building a large CMS before editorial workflows are understood.
- Publishing unreviewed user submissions.
- Treating placeholders as real account, favorite, submission, or database features.
