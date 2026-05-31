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
- Build-time related article links on article detail pages
- Twelve public article pages across four locales
- Four locale area index pages with Tokyo area guide cards
- Four locale area detail routes
- Four locale place index pages
- Four locale place detail routes with practical guidance sections
- Four locale mobile index pages with comparison guidance
- Four locale mobile plan detail routes
- Four locale tools index pages with published tool cards
- Four locale tool detail routes
- First published static checklist tool: Moving to Japan checklist
- Four locale submit-place form pages with provider-agnostic external endpoint support
- Four locale submit-place thanks pages
- Four locale about pages
- Four locale account placeholder pages
- Favorite placeholder button
- Content collections for articles, areas, places, mobile plans, and tools
- Five mobile plan entries: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile
- Four area guide samples: Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi
- Article, Place, AreaGuide, MobilePlan, Favorite, UserProfile, and PlaceSubmission type boundaries
- Unified Place enum values
- SEO-oriented `BaseLayout`
- Generated `sitemap.xml`, `robots.txt`, and `site.webmanifest`
- Generated global `feed.xml` for public articles
- Default Open Graph image and Twitter summary metadata
- JSON-LD structured data for site identity, articles, places, mobile plan details, area details, tool details, and breadcrumbs
- Cloudflare Pages `_headers` for conservative security and cache defaults
- Cloudflare Pages `wrangler.toml` deployment metadata
- Conservative locale switcher behavior for detail pages with missing translations
- `SITE_URL` environment variable fallback
- Structure and conservative internal-link tests in `tests/project-structure.test.mjs`
- Build-output static HTML internal link crawler in `tests/static-html-links.test.mjs`
- Build-output SEO check in `tests/seo-output.test.mjs`
- GitHub Actions CI quality gate for pull requests and pushes to `main`

Still placeholder-only:

- Login
- Favorites
- Account submissions
- Real favorite saving
- Database-backed submit-place storage
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
- `/[locale]/areas`
- `/[locale]/areas/[slug]`
- `/[locale]/places`
- `/[locale]/places/[slug]`
- `/[locale]/mobile`
- `/[locale]/mobile/[slug]`
- `/[locale]/tools`
- `/[locale]/tools/[slug]`
- `/[locale]/submit-place`
- `/[locale]/submit-place/thanks`
- `/[locale]/about`
- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`
- `/sitemap.xml`
- `/robots.txt`
- `/site.webmanifest`
- `/feed.xml`

Article detail pages are generated only for non-draft articles. Place detail pages are generated only for places where `status = published`.
Area, mobile plan, and published tool detail pages are generated from the current static content collections.

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
2. `pnpm build`
3. `pnpm check:links`
4. `pnpm check:seo`

`pnpm test` checks source-level structure and content links. `pnpm check:links` scans built `dist/**/*.html`. `pnpm check:seo` checks built `sitemap.xml`, `robots.txt`, `site.webmanifest`, and Cloudflare headers. Run `pnpm build` before both build-output checks.

GitHub Actions runs the same verification order on pull requests and pushes to `main`, including forbidden lockfile rejection. Cloudflare Pages deployment is still configured separately.

## Environment Variables

Astro `site` is read from `SITE_URL`.

Example:

```bash
SITE_URL=https://tachi-suke.example.com
PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT=
```

`PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` controls the static submit-place form:

- Empty or unset: preview mode, submit button disabled, no submission is sent.
- Set to an external form endpoint: the form uses `method="POST"` and posts to that URL.

The endpoint can be Formspree, Netlify Forms, Cloudflare Workers, or a future custom API. TachiSuke does not hard-code a provider. External providers may require mapping the provider-agnostic `redirectUrl` hidden field to their own redirect/next field.

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
- Tool checklist pages are static content pages. They do not save progress, require login, or write to a database in Phase 1.
- Submit-place can post to an externally configured endpoint, but the repo does not store submissions or include a moderation backend.
- Do not publish user submissions directly.
- Keep user-facing copy natural for each locale.
- Keep content decision-oriented rather than tourist-oriented.
- Treat mobile plan prices, campaigns, and eligibility rules as changeable; users must confirm official sites before applying.
- Run `pnpm test`, `pnpm build`, and `pnpm check:links` before reporting completion when relevant.
- Run `pnpm check:seo` after `pnpm build` when changing SEO, routing, metadata, or deployment files.
- Structured data must be backed by current static content. Do not invent ratings, review counts, opening hours, or exact addresses.
- Mobile plan structured data must stay conservative. Do not add `Offer` price markup until pricing and campaign review workflows are mature.
- `/feed.xml` is a global RSS feed for non-draft articles across all locales. Locale-specific feeds are not implemented yet.

## Documentation Map

- [Project Spec](docs/PROJECT_SPEC.md): product positioning, scope, routes, principles, and future strategy.
- [Page Spec](docs/PAGE_SPEC.md): purpose, data source, SEO, and status for each route.
- [Content Model](docs/CONTENT_MODEL.md): collections, types, fields, enum values, and visibility rules.
- [Implementation Status](docs/IMPLEMENTATION_STATUS.md): completed work, placeholders, limitations, and verification.
- [Acceptance Criteria](docs/ACCEPTANCE_CRITERIA.md): package, build, test, i18n, article, place, submit-place, SEO, placeholder, and readiness criteria.
- [Content Strategy](docs/CONTENT_STRATEGY.md): editorial direction and first content ideas.
- [Auth and Favorites](docs/AUTH_AND_FAVORITES.md): future Supabase Auth and favorites direction.
- [Database Design](docs/DATABASE_DESIGN.md): future Supabase Postgres schema draft.
- [Deployment](docs/DEPLOYMENT.md): Cloudflare Pages deployment setup and verification.
- [Roadmap](docs/ROADMAP.md): phases from scaffold MVP through search, maps, personalization, and AI.
