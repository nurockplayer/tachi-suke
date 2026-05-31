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
- Twelve public article pages across four locales
- Four locale area index pages with Tokyo area guide cards
- Four locale area detail routes
- Four locale place index pages
- Four locale place detail routes with practical guidance sections
- Four locale mobile index pages with comparison guidance
- Four locale mobile plan detail routes
- Four locale tools index pages
- Four locale submit-place UI pages
- Four locale about pages
- Four locale account placeholder pages
- Favorite placeholder button
- Content collections for articles, areas, places, mobile plans, and tools
- Five mobile plan entries: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile
- Four area guide samples: Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi
- Article, Place, AreaGuide, MobilePlan, Favorite, UserProfile, and PlaceSubmission type boundaries
- Unified Place enum values
- SEO-oriented `BaseLayout`
- Conservative locale switcher behavior for detail pages with missing translations
- `SITE_URL` environment variable fallback
- Structure and conservative internal-link tests in `tests/project-structure.test.mjs`
- Build-output static HTML internal link crawler in `tests/static-html-links.test.mjs`

Still placeholder-only:

- Login
- Favorites
- Account submissions
- Real favorite saving
- Real submit-place submission
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
- `/[locale]/submit-place`
- `/[locale]/about`
- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`

Article detail pages are generated only for non-draft articles. Place detail pages are generated only for places where `status = published`.
Area and mobile plan detail pages are generated from the current static content collections.

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

Preview production build:

```bash
pnpm preview
```

Recommended verification order:

1. `pnpm test`
2. `pnpm build`
3. `pnpm check:links`

`pnpm test` checks source-level structure and content links. `pnpm check:links` scans built `dist/**/*.html`, so run `pnpm build` first.

## Environment Variables

Astro `site` is read from `SITE_URL`.

Example:

```bash
SITE_URL=https://tachi-suke.example.com
```

For local setup:

```bash
cp .env.example .env
```

Use the real deployment URL when the production domain is decided.

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
- Do not publish user submissions directly.
- Keep user-facing copy natural for each locale.
- Keep content decision-oriented rather than tourist-oriented.
- Treat mobile plan prices, campaigns, and eligibility rules as changeable; users must confirm official sites before applying.
- Run `pnpm test`, `pnpm build`, and `pnpm check:links` before reporting completion when relevant.

## Documentation Map

- [Project Spec](docs/PROJECT_SPEC.md): product positioning, scope, routes, principles, and future strategy.
- [Page Spec](docs/PAGE_SPEC.md): purpose, data source, SEO, and status for each route.
- [Content Model](docs/CONTENT_MODEL.md): collections, types, fields, enum values, and visibility rules.
- [Implementation Status](docs/IMPLEMENTATION_STATUS.md): completed work, placeholders, limitations, and verification.
- [Acceptance Criteria](docs/ACCEPTANCE_CRITERIA.md): package, build, test, i18n, article, place, submit-place, SEO, placeholder, and readiness criteria.
- [Content Strategy](docs/CONTENT_STRATEGY.md): editorial direction and first content ideas.
- [Auth and Favorites](docs/AUTH_AND_FAVORITES.md): future Supabase Auth and favorites direction.
- [Database Design](docs/DATABASE_DESIGN.md): future Supabase Postgres schema draft.
- [Roadmap](docs/ROADMAP.md): phases from scaffold MVP through search, maps, personalization, and AI.
