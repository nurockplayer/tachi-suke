# AGENTS.md

## Communication

Default to Taiwan Traditional Chinese when communicating with the project owner.

Do not use Simplified Chinese unless explicitly requested. Product UI copy must still match the target locale: `zh-tw`, `en`, `ja`, or `ko`.

## Git and Shell Rules

Use `rtk` only for git-related shell commands to reduce output tokens.

Examples:

```bash
rtk git --no-optional-locks status
rtk git diff --stat
rtk gh pr view
```

Do not commit, push, open PRs, merge, rebase, switch branches, or write public GitHub comments unless the user explicitly asks or approves it.

Never use destructive git commands such as `git reset --hard` or `git checkout --` unless the user explicitly requests that exact operation.

## AWP-lite

When the user mentions Autonomous, AWP, Hybrid AWP, Codex autonomous workflow, or asks for a broad autonomous task, first read [docs/ai/autonomous-bootstrap.md](docs/ai/autonomous-bootstrap.md).

TachiSuke uses AWP-lite, not tachigo's full autonomous PR governance. The workflow keeps startup readback, explicit scope, routing decisions, controller fallback reasons, and validation evidence, but it does not require Scope Police, spec-injector gates, or issue-first ceremony for every small change.

Use AWP-lite only when it reduces risk: cross-module work, Phase 2 auth/database/favorites/submission planning, route or content-model changes, or tasks that explicitly ask for autonomous execution. For small docs, copy, or single-surface edits, proceed normally and keep the final report concise.

## Project

Repo name: `tachi-suke`  
Brand name: `TachiSuke`  
Chinese name: `達助日本生活`  
English name: `Japan Life Assistant`

TachiSuke is a multilingual Japan life decision assistant for people living in Japan, preparing to move to Japan, studying in Japan, working in Japan, or staying in Japan long-term.

Core topics:

- Japanese mobile plans
- Renting and housing
- City and neighborhood guides
- Food, restaurants, and shopping
- Transportation and commuting
- Administrative procedures
- Practical Japanese phrases
- Job hunting and working in Japan
- Community-recommended places

## Product Positioning

TachiSuke is not a generic Japan travel blog. The core value is helping users make practical decisions about life in Japan.

Prefer comparisons, checklists, practical guides, decision trees, warnings, foreign-resident-friendly explanations, multilingual clarity, structured information, and SEO-friendly content.

Avoid generic tourist content, vague lifestyle writing, unmoderated public reviews, over-engineered features, and Taiwan-only positioning.

## Stack

- Astro
- TypeScript
- Markdown / MDX
- pnpm only
- Static Site Generation first
- i18n route prefix

## Package Manager

Use pnpm only.

Rules:

- Do not use npm.
- Do not use yarn.
- Do not use bun.
- Do not create `package-lock.json`.
- Do not create `yarn.lock`.
- Do not create `bun.lock` or `bun.lockb`.
- Keep `pnpm-lock.yaml`.
- Keep the existing `packageManager` field unless the user explicitly asks to change it.
- Do not add `preinstall`, `install`, `postinstall`, or `prepare` scripts unless the user explicitly approves a narrow exception.

Command examples must use pnpm:

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm check:links
pnpm check:seo
pnpm preview
```

## i18n Rules

Supported locales:

- `zh-tw`: Traditional Chinese
- `en`: English
- `ja`: Japanese
- `ko`: Korean

Use locale-prefixed routing:

- `/zh-tw/`
- `/en/`
- `/ja/`
- `/ko/`

Current public route pattern:

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
- `/[locale]/submit-place/thanks`
- `/[locale]/about`
- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`

Content translations should use `locale` and `translationKey`. Missing translations should fall back to English, then Traditional Chinese, or show a clear missing-content state.

Do not use Simplified Chinese unless explicitly requested.

## MVP Scope

Phase 1 is content-first, SEO-friendly, i18n-ready, auth-ready, database-ready, and favorites-ready.

Current MVP includes static pages, article publishing, place detail pages, mobile/area/tool entry pages, static submit-place external endpoint support, placeholder account pages, placeholder favorites, content collections, and SEO metadata.

Phase 1B adds public-preview content depth:

- At least twelve public articles across supported locales.
- Mobile plan data for povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile.
- Area guide samples for Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi.
- Internal links between articles and main locale sections.
- A conservative Markdown internal-link test.

Phase 1B.5 adds maintainability/detail depth:

- Mobile plan detail pages at `/[locale]/mobile/[slug]`.
- Area detail pages at `/[locale]/areas/[slug]`.
- Mobile plan fields: `officialUrl`, `lastCheckedAt`, `sourceNote`, `notes`.
- Area fields: `title`, `summary`, `lastCheckedAt`, `notes`.
- Post-build static HTML link checking with `pnpm check:links`.
- Conservative detail-page locale switcher links that avoid missing generated pages.

Phase 1C adds submit-place workflow MVP:

- `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` controls form activation.
- Endpoint unset means preview mode with disabled submit.
- Endpoint set means static `POST` to the external endpoint.
- The provider must stay configurable; do not hard-code Formspree, Netlify Forms, Google Forms, Cloudflare Workers, or a custom API URL.
- Submit-place thanks pages exist at `/[locale]/submit-place/thanks`.
- Hidden fields should include `formName`, `source`, `locale`, `moderationRequired`, `publishDirectly`, and `redirectUrl`.
- Honeypot is basic spam reduction only; do not add captcha or large anti-spam dependencies in Phase 1C.

Phase 1D adds SEO and launch readiness:

- Generate `sitemap.xml`, `robots.txt`, and `site.webmanifest`.
- Keep account placeholder routes accessible but `noindex, nofollow`.
- Exclude account placeholders, draft articles, and non-published places from the sitemap.
- Include default Open Graph image and Twitter summary metadata.
- Prefer Cloudflare Pages static deployment with `pnpm build` and `dist`.
- Set `SITE_URL` to the production domain before launch.
- Keep Astro unless SSR/account/personalization requirements justify a future migration.

Phase 1E adds structured data:

- `BaseLayout` emits site-wide `Organization` and `WebSite` JSON-LD.
- Article detail pages emit `Article` and `BreadcrumbList` JSON-LD.
- Place detail pages emit `LocalBusiness` and `BreadcrumbList` JSON-LD.
- Do not invent ratings, review counts, opening hours, offers, or exact street addresses.
- `pnpm check:seo` parses representative built pages for JSON-LD.

Phase 1F adds CI quality gates:

- GitHub Actions must use pnpm only.
- CI should reject `package-lock.json`, `yarn.lock`, `bun.lock`, and `bun.lockb`.
- CI should run `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- CI does not deploy to Cloudflare Pages yet; deployment secrets and project settings stay outside the repo until explicitly scoped.

Mobile plan prices, campaigns, payment methods, and identity requirements can change. Always phrase mobile data as editorial guidance and remind users to confirm official carrier pages before applying.
Area rent feel, quietness, and commute convenience can also become stale. Keep area pages date-aware and practical rather than sightseeing-oriented.

Do not implement in Phase 1 unless explicitly requested:

- Real login
- Supabase Auth
- Database clients
- Postgres persistence
- Row Level Security runtime integration
- Real favorites
- Native/database-backed submit-place storage
- Public comments
- Payment
- Large CMS/admin dashboard

## Future Auth and Favorites

Future stack:

- Supabase Auth
- Supabase Postgres
- Row Level Security
- Astro SSR or hybrid rendering for protected account pages

Future favorites use a generic model:

- `targetType`: `article`, `place`, `mobile_plan`, `area`, `tool`
- `targetId`: stable content identifier

Rules:

- Public content remains readable without login.
- Saving favorites requires login.
- Users can only read and modify their own favorites.
- Account pages are placeholders until Phase 2.

## User-Submitted Places

The submit-place page is static-site friendly in Phase 1C. It may post to `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`, but the repo must not store, email, moderate, or publish submissions directly.

Rules:

- User submissions must not be published directly.
- Every submission requires moderation before becoming public.
- Email is optional/private and must not be public.
- Avoid collecting unnecessary personal information.
- Approved submissions should be normalized before becoming public Place entries.

## Place Enum Final Version

`soloFriendly`:

- `yes`
- `maybe`
- `no`
- `unknown`

`nonSmokingStatus`:

- `confirmed_non_smoking`
- `separated_smoking_area`
- `smoking_allowed`
- `unknown`

`japaneseDifficulty`:

- `easy`
- `normal`
- `hard`
- `unknown`

`source`:

- `editor`
- `user_submission`
- `official`

`status`:

- `draft`
- `pending_review`
- `published`
- `rejected`
- `archived`

Only `status = published` Place entries can appear in public list/detail pages.

## Build and Test Expectations

Before reporting completion when possible:

```bash
pnpm test
pnpm build
pnpm check:links
pnpm check:seo
```

For Phase 1B/1B.5 content work, `pnpm test` should cover content depth and conservative source-level internal link checks. `pnpm check:links` scans built static HTML in `dist/`, so run `pnpm build` first. It does not validate external URLs, anchors, JavaScript behavior, or visual rendering.

For SEO/routing/deployment work, run `pnpm check:seo` after `pnpm build`; it verifies generated sitemap, robots, manifest, and Cloudflare headers.

For package or scaffold work, also check that forbidden lockfiles were not introduced:

- `package-lock.json`
- `yarn.lock`
- `bun.lock`
- `bun.lockb`

Keep final reports concise: list important changed files, placeholder status, verification results, and useful next steps.
