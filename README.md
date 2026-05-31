# TachiSuke

TachiSuke, Chinese name 達助日本生活, is a multilingual Japan life decision assistant. It helps foreign residents and people preparing to move to Japan make practical decisions about mobile plans, housing, transportation, food, shopping, administrative procedures, practical Japanese, and work-related life in Japan.

TachiSuke is not a generic travel blog. The goal is to provide comparisons, checklists, warnings, guides, and resident-friendly notes that help users decide what to do next.

## Tech Stack

- Astro
- TypeScript
- Markdown / MDX
- Astro content collections
- pnpm only
- Static Site Generation first
- Locale-prefixed i18n routing
- Cloudflare Pages-oriented static deployment

Supported locales:

- `zh-tw`
- `en`
- `ja`
- `ko`

## Current MVP Status

Implemented:

- Four locale homepages
- Start-here homepage links for articles, mobile, areas, places, submit-place, tools, and favorites placeholder
- Four locale article index pages
- Four locale article detail routes
- Four locale article category landing page routes
- Build-time related article links on article detail pages
- Detail-page correction prompts linking public content to contact/corrections with related page URL prefill
- Twenty public article pages across four locales, including zh-tw/en/ja/ko commuter pass and residence administration decision articles
- Four locale area index pages with Tokyo area guide cards
- Four locale area detail routes
- Four locale place index pages
- Four locale place detail routes with practical guidance sections
- Four locale mobile index pages with comparison guidance
- Four locale mobile plan detail routes
- Four locale tools index pages with published tool cards
- Four locale tool detail routes
- Four locale noindex search pages with dependency-free client-side filtering and shareable `?q=` URLs
- Four locale static search index JSON endpoints for public content
- Published static checklist tools: Moving to Japan checklist, Japan rent initial cost checklist, ward office moving-in checklist, and commuter pass / IC card checklist
- Four locale submit-place form pages with provider-agnostic external endpoint support
- Four locale submit-place thanks pages
- Four locale contact/corrections form pages with provider-agnostic external endpoint support
- Four locale contact/corrections thanks pages
- Four locale about pages
- Four locale privacy pages
- Four locale editorial policy pages
- Custom static `404.html` recovery page for static hosting
- Four locale account placeholder pages
- Favorite placeholder button
- Content collections for articles, areas, places, mobile plans, and tools
- Five mobile plan entries: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile
- Four area guide samples: Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi
- Article, Place, AreaGuide, MobilePlan, Favorite, UserProfile, and PlaceSubmission type boundaries
- Unified Place enum values
- SEO-oriented `BaseLayout`
- Generated `sitemap.xml`, `robots.txt`, and `site.webmanifest`
- Sitemap includes conservative `hreflang` alternates for shared locale pages and translated article details
- Generated `llms.txt` discovery file for AI/search-adjacent tooling
- Generated `/.well-known/security.txt` pointing security reports to the public contact route
- Generated `opensearch.xml` browser search discovery file linked from every public page
- Generated global `feed.xml` for public articles, included in the sitemap with content-aware `lastmod`
- Generated locale RSS feeds at `/[locale]/feed.xml` for same-locale public articles, included in the sitemap with same-locale `lastmod`
- Default Open Graph image and Twitter summary metadata
- Browser/PWA metadata for theme color, app name, Apple app title, and phone number format detection
- JSON-LD structured data for site identity, site search, articles, places, mobile plan details, area details, tool details, and breadcrumbs
- Visible breadcrumbs on nested public article, category, place, mobile plan, area, and tool pages
- Generated article table of contents for long-form article pages
- Cloudflare Pages `_headers` for conservative security and discovery cache defaults
- Cloudflare Pages CSP blocks framing/object embeds while allowing current inline JSON-LD/search scripts and HTTPS external form endpoints
- Cloudflare Pages `_redirects` for locale-less section fallbacks to English
- Cloudflare Pages `wrangler.toml` deployment metadata
- Conservative locale switcher behavior for detail pages with missing translations
- `SITE_URL` environment variable fallback
- Structure and conservative internal-link tests in `tests/project-structure.test.mjs`
- Build-output static HTML internal link crawler in `tests/static-html-links.test.mjs`
- Build-output SEO check in `tests/seo-output.test.mjs`
- GitHub Actions CI quality gate for pull requests and pushes to `main`
- Baseline keyboard accessibility hooks: skip link, active nav state, and visible focus styles

Still placeholder-only:

- Login
- Favorites
- Account submissions
- Real favorite saving
- Database-backed submit-place storage
- Database-backed contact/support storage
- Supabase Auth
- Postgres/database integration
- Row Level Security runtime setup
- Moderation dashboard
- Real user profile data

## Routes

Root:

- `/`

Locale roots:

- `/zh-tw/`
- `/en/`
- `/ja/`
- `/ko/`

Locale routes:

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
- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`
- `/[locale]/feed.xml`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/.well-known/security.txt`
- `/opensearch.xml`
- `/site.webmanifest`
- `/feed.xml`
- `/404.html`

Article detail pages are generated only for non-draft articles. Place detail pages are generated only for places where `status = published`.
Area, mobile plan, and published tool detail pages are generated from the current static content collections. Tool pages may include editorial source notes and official source links when a checklist depends on date-sensitive public information.

## Commands

Use pnpm only.

Install dependencies:

```bash
pnpm install
```

Start local development:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```

Check source content health:

```bash
pnpm check:content
```

Build static output:

```bash
pnpm build
```

Check internal links in built HTML after build:

```bash
pnpm check:links
```

Check generated SEO output after build:

```bash
pnpm check:seo
```

Preview production build:

```bash
pnpm preview
```

Recommended verification order:

1. `pnpm test`
2. `pnpm check:content`
3. `pnpm build`
4. `pnpm check:links`
5. `pnpm check:seo`

`pnpm test` checks source-level structure and content links. `pnpm check:content` checks content IDs, slugs, dates, review dates, and stored URL fields without fetching the network. `pnpm check:links` scans built `dist/**/*.html`. `pnpm check:seo` checks built `sitemap.xml`, `robots.txt`, `site.webmanifest`, `opensearch.xml`, global RSS feed, locale RSS feeds, and Cloudflare headers. Run `pnpm build` before both build-output checks.

GitHub Actions runs the same verification order on pull requests and pushes to `main`, including forbidden lockfile rejection. Cloudflare Pages deployment is still configured separately.

## Environment Variables

Astro `site` is read from `SITE_URL`.

Example:

```bash
SITE_URL=https://tachi-suke.example.com
PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT=
PUBLIC_CONTACT_FORM_ENDPOINT=
```

`PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` controls the static submit-place form:

- Empty or unset: preview mode, submit button disabled, no submission is sent.
- Set to an external form endpoint: the form uses `method="POST"` and posts to that URL.

The endpoint can be Formspree, Netlify Forms, Cloudflare Workers, or a future custom API. TachiSuke does not hard-code a provider. External providers may require mapping the provider-agnostic `redirectUrl` hidden field to their own redirect/next field.

`PUBLIC_CONTACT_FORM_ENDPOINT` controls the static contact/corrections form:

- Empty or unset: preview mode, submit button disabled, no message is sent.
- Set to an external form endpoint: the form uses `method="POST"` and posts to that URL.

This endpoint is for corrections, outdated information reports, broken links, and general feedback. TachiSuke does not hard-code a provider and does not store contact messages in the repo.

For local setup:

```bash
cp .env.example .env
```

Use the real deployment URL when the production domain is decided.

## Deployment

Preferred Phase 1 deployment target: Cloudflare Pages static output.

Recommended production settings:

- Build command: `pnpm build`
- Output directory: `dist`
- Environment variable: `SITE_URL=https://your-production-domain.example`
- Optional environment variable: `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT=https://your-form-endpoint.example`
- Optional environment variable: `PUBLIC_CONTACT_FORM_ENDPOINT=https://your-contact-endpoint.example`
- Optional CLI deploy: `pnpm dlx wrangler pages deploy dist --project-name tachi-suke`

Astro remains the preferred frontend stack for the current content-first MVP. A Next.js migration should wait until the product has a concrete SSR requirement, such as authenticated account pages, personalized saved lists, or server-side workflows.

See [Deployment](docs/DEPLOYMENT.md) for Cloudflare Pages setup, environment variables, verification, and rollback notes.

## Place Enum Values

Published Place entries use these enum values:

- `soloFriendly`: `yes`, `maybe`, `no`, `unknown`
- `nonSmokingStatus`: `confirmed_non_smoking`, `separated_smoking_area`, `smoking_allowed`, `unknown`
- `japaneseDifficulty`: `easy`, `normal`, `hard`, `unknown`
- `source`: `editor`, `user_submission`, `official`
- `status`: `draft`, `pending_review`, `published`, `rejected`, `archived`

Only `status = published` places are publicly listed or rendered as detail pages.

## Development Rules

- Keep Phase 1 static-first.
- Use pnpm commands only.
- Do not add forbidden lockfiles.
- Do not implement auth, database, favorites, or real submissions in Phase 1.
- Related article links are static, same-locale, and non-personalized.
- Search pages are static, noindex utility pages backed by `/[locale]/search-index.json`, and `/[locale]/search?q=...` can be shared to prefill/filter results.
- Search indexes include public content only and do not include account placeholders, drafts, or non-published items.
- Article category pages are generated from public non-draft articles and are included in the sitemap.
- Sitemap `hreflang` alternates must only point to generated public URLs; article alternates are grouped by `translationKey`.
- Tool checklist pages are static content pages. They do not save progress, require login, or write to a database in Phase 1.
- Submit-place can post to an externally configured endpoint, but the repo does not store submissions or include a moderation backend.
- Contact/corrections can post to an externally configured endpoint, but the repo does not store messages or include a support backend.
- Public detail pages link to contact/corrections with a `relatedUrl` prefill so readers can report outdated content, broken links, or unclear information from the page they were reading.
- Do not publish user submissions directly.
- Privacy and editorial policy pages are static launch-readiness pages, not a substitute for a future legal/privacy review before auth or database-backed personal data.
- Keep user-facing copy natural for each locale.
- Keep content decision-oriented rather than tourist-oriented.
- Treat mobile plan prices, campaigns, and eligibility rules as changeable; users must confirm official sites before applying.
- Run `pnpm test`, `pnpm check:content`, `pnpm build`, and `pnpm check:links` before reporting completion when relevant.
- Run `pnpm check:seo` after `pnpm build` when changing SEO, routing, metadata, or deployment files.
- Structured data must be backed by current static content. Do not invent ratings, review counts, opening hours, or exact addresses.
- WebSite JSON-LD exposes only the static English search fallback as `SearchAction`; do not imply backend or private-content search.
- Visible breadcrumbs should stay locale-aware, link only to existing public routes, and mark the current page with `aria-current="page"`.
- Mobile plan structured data must stay conservative. Do not add `Offer` price markup until pricing and campaign review workflows are mature.
- `/feed.xml` is a global RSS feed for non-draft articles across all locales.
- `/[locale]/feed.xml` is a locale-specific RSS feed for same-locale non-draft articles.
- `/opensearch.xml` exposes the static English search route as a browser-discoverable OpenSearch template.
- `/.well-known/security.txt` exposes the public contact route for security reports; it does not create a support backend or response SLA.
- `/404.html` is a static noindex recovery page for missing routes on Cloudflare Pages or other static hosts.
- Cloudflare Pages `_redirects` sends common locale-less paths such as `/articles`, `/mobile/povo2`, and `/contact` to English `302` fallbacks. Canonical routes remain locale-prefixed.
- Cloudflare Pages `_headers` caches sitemap, robots, manifest, RSS feeds, `llms.txt`, `opensearch.xml`, and search indexes conservatively for one hour while keeping HTML revalidated.
- Cloudflare Pages CSP is intentionally conservative for Phase 1 and still allows `'unsafe-inline'` because the current static site uses inline JSON-LD and small inline enhancement scripts.

## Documentation Map

- [Project Spec](docs/PROJECT_SPEC.md): product positioning, scope, routes, principles, and future strategy.
- [Page Spec](docs/PAGE_SPEC.md): purpose, data source, SEO, and status for each route.
- [Content Model](docs/CONTENT_MODEL.md): collections, types, fields, enum values, and visibility rules.
- [Implementation Status](docs/IMPLEMENTATION_STATUS.md): completed work, placeholders, limitations, and verification.
- [Acceptance Criteria](docs/ACCEPTANCE_CRITERIA.md): package, build, test, i18n, article, place, submit-place, contact, SEO, placeholder, and readiness criteria.
- [Content Strategy](docs/CONTENT_STRATEGY.md): editorial direction and first content ideas.
- [Auth and Favorites](docs/AUTH_AND_FAVORITES.md): future Supabase Auth and favorites direction.
- [Database Design](docs/DATABASE_DESIGN.md): future Supabase Postgres schema draft.
- [Deployment](docs/DEPLOYMENT.md): Cloudflare Pages deployment setup and verification.
- [Roadmap](docs/ROADMAP.md): phases from scaffold MVP through search, maps, personalization, and AI.
