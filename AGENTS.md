# AGENTS.md

## Project

Repo name: `tachi-suke`
Brand name: `TachiSuke`
English name: `Japan Life Assistant`

TachiSuke is a multilingual Japan life decision assistant for people living in Japan, preparing to move to Japan, studying in Japan, working in Japan, or staying in Japan long-term.

The product helps users make practical decisions about daily life in Japan.

Core topics:

* Japanese mobile plans
* Renting and housing
* City and neighborhood guides
* Food and restaurants
* Transportation and commuting
* Administrative procedures
* Practical Japanese phrases
* Job hunting and working in Japan
* Community-recommended places

## Brand concept

`Tachi` = 立ち / 達 / Tachiko
`Suke` = 助け / 助

Meaning:

Help people stand on their own feet and build a stable life in Japan.

## Product positioning

TachiSuke is not a generic Japan travel blog.

The core value is:

> Help users make decisions about life in Japan.

Prefer:

* comparisons
* checklists
* practical guides
* decision trees
* real-life notes
* warnings and pitfalls
* foreign-resident-friendly explanations
* multilingual clarity
* structured information
* SEO-friendly content

Avoid:

* generic tourist content
* vague lifestyle writing
* over-engineered features
* unnecessary abstractions
* unmoderated public reviews
* making the product Taiwan-only

## Languages

Supported locales:

* `zh-tw`: Traditional Chinese
* `en`: English
* `ja`: Japanese
* `ko`: Korean

Language rules:

* UI architecture should support all four locales.
* Core content can start with Traditional Chinese and English.
* Japanese and Korean content can be added gradually.
* The system should allow missing translations.
* If a translation is missing, fallback to English or Traditional Chinese.
* Do not use Simplified Chinese unless explicitly requested in the future.
* All locale-specific pages should use natural wording for that language.

## URL and i18n rules

Use locale-prefixed routing:

* `/zh-tw/`
* `/en/`
* `/ja/`
* `/ko/`

Examples:

* `/zh-tw/articles`
* `/en/articles`
* `/ja/articles`
* `/ko/articles`
* `/zh-tw/places`
* `/en/places`

Each content item should include:

* `id`
* `slug`
* `locale`
* `translationKey`

The `translationKey` connects different language versions of the same content.

## Technical stack

Use:

* Astro
* TypeScript
* Markdown / MDX
* pnpm
* Static Site Generation first
* i18n routing by locale prefix

The first version should be content-first, SEO-friendly, i18n-ready, auth-ready, database-ready, and favorites-ready.

## Package manager

Use `pnpm` only.

Rules:

* Do not use npm.
* Do not use yarn.
* Do not create `package-lock.json`.
* Do not create `yarn.lock`.
* Use `pnpm-lock.yaml` as the only lockfile.
* Use `pnpm add` to add dependencies.
* Use `pnpm add -D` to add dev dependencies.
* Use `pnpm install` to install dependencies.
* Use `pnpm dev` for local development.
* Use `pnpm build` before reporting completion when possible.
* Use `pnpm preview` to preview the production build.
* If a command example is needed, always use pnpm.

## MVP scope

The first version should focus on:

* static content
* multilingual routing
* SEO
* clean navigation
* article publishing
* city guide pages
* food and place guide pages
* mobile plan comparison pages
* simple tool pages
* moderated place submission planning
* placeholder account pages
* placeholder favorite functionality

Do not fully implement in MVP:

* membership system
* authentication
* database integration
* public comments
* payment
* complex admin dashboard
* real-time community features

The MVP can include placeholder pages for future account and favorite features.

## Future auth and favorites

TachiSuke will eventually support user accounts and saved items.

Future user features:

* Sign up / login
* User profile
* Save favorite articles
* Save favorite places
* Save favorite mobile plans
* Save favorite areas
* Save favorite tools
* View saved items
* Submit recommended places
* View own submission history

MVP rule:

The first version does not need to fully implement authentication or database-backed favorites, but the architecture should be auth-ready and database-ready.

Recommended future stack:

* Supabase Auth
* Supabase Postgres
* Row Level Security
* Astro SSR or hybrid rendering when dynamic user pages are implemented

Favorite model:

Use a generic favorite model with `targetType` and `targetId`.

Supported favorite target types:

* `article`
* `place`
* `mobile_plan`
* `area`
* `tool`

Rules:

* Public content should be readable without login.
* Saving favorites requires login.
* Users can only read and modify their own favorites.
* User submissions must not be published directly.
* Submissions require moderation before becoming public.
* Admin-only moderation tools should be separated from public user pages.

## User-submitted places

Feature name:

* English: `Tachi Picks` or `Community Picks`
* Traditional Chinese: `達助推薦` or `社群推薦`
* Japanese: `みんなのおすすめ`
* Korean: `커뮤니티 추천`

Purpose:

Allow users to recommend useful restaurants, cafés, diners, izakaya, shops, and other life-related places in Japan.

This feature is not intended to become a fully open review platform like Google Maps or Tabelog. The goal is to collect practical, foreign-resident-friendly recommendations that help people make daily life decisions in Japan.

Rules:

* User submissions must not be published directly.
* Every submission should go through moderation before becoming public.
* MVP should not require user accounts.
* MVP may use a simple form-based workflow.
* Avoid collecting unnecessary personal information.
* Email should be optional unless needed for follow-up.
* Public pages should not expose submitter email addresses.
* User-submitted content should be edited and normalized before publishing.
* Submission language can be `zh-tw`, `en`, `ja`, or `ko`.

Recommended MVP flow:

1. User opens `/[locale]/submit-place`.
2. User fills out a place recommendation form.
3. Submission is stored or sent to the site owner.
4. Site owner reviews and normalizes the data.
5. Approved places are published as Place entries.

Important fields:

* Submission language
* Place name
* Category
* Prefecture
* City
* Area
* Nearest station
* Google Maps URL
* Official URL
* Recommendation reason
* Price range
* Solo-friendly status
* Non-smoking status
* Japanese difficulty
* Payment methods
* Submitter nickname
* Optional submitter email

Moderation statuses:

* `pending_review`
* `approved`
* `rejected`
* `needs_more_info`

## Content model ideas

Article:

* `id`
* `slug`
* `locale`
* `translationKey`
* `title`
* `description`
* `category`
* `tags`
* `publishedAt`
* `updatedAt`
* `draft`

Place:

* `id`
* `slug`
* `name`
* `category`
* `prefecture`
* `city`
* `area`
* `station`
* `googleMapUrl`
* `officialUrl`
* `tabelogUrl`
* `instagramUrl`
* `priceRange`
* `soloFriendly`
* `nonSmokingStatus`
* `japaneseDifficulty`
* `paymentMethods`
* `source`
* `status`
* `createdAt`
* `updatedAt`

MobilePlan:

* `id`
* `slug`
* `provider`
* `planName`
* `monthlyPrice`
* `dataAmount`
* `paymentRequirements`
* `residenceCardRequired`
* `creditCardRequired`
* `pros`
* `cons`
* `recommendedFor`

CityGuide:

* `id`
* `slug`
* `locale`
* `translationKey`
* `prefecture`
* `city`
* `stations`
* `rentLevel`
* `foodLevel`
* `commuteConvenience`
* `quietness`
* `recommendedFor`
* `warnings`

Favorite:

* `id`
* `userId`
* `targetType`
* `targetId`
* `createdAt`

PlaceSubmission:

* `id`
* `userId`
* `submissionLocale`
* `placeName`
* `category`
* `prefecture`
* `city`
* `area`
* `station`
* `googleMapUrl`
* `officialUrl`
* `recommendationReason`
* `priceRange`
* `soloFriendly`
* `nonSmokingStatus`
* `japaneseDifficulty`
* `paymentMethods`
* `submitterNickname`
* `submitterEmail`
* `status`
* `moderatorNote`
* `createdAt`
* `updatedAt`

## Suggested directory structure

```text
tachi-suke/
├── src/
│   ├── content/
│   │   ├── articles/
│   │   ├── areas/
│   │   ├── places/
│   │   ├── mobile-plans/
│   │   └── tools/
│   │
│   ├── lib/
│   │   ├── i18n/
│   │   ├── content/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── favorites/
│   │   └── submissions/
│   │
│   ├── pages/
│   │   └── [locale]/
│   │       ├── index.astro
│   │       ├── articles/
│   │       ├── areas/
│   │       ├── places/
│   │       ├── mobile/
│   │       ├── tools/
│   │       ├── submit-place.astro
│   │       ├── about.astro
│   │       └── account/
│   │           ├── login.astro
│   │           ├── favorites.astro
│   │           └── submissions.astro
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── content/
│   │   ├── places/
│   │   ├── mobile/
│   │   ├── favorites/
│   │   └── auth/
│   │
│   └── types/
│       ├── locale.ts
│       ├── article.ts
│       ├── place.ts
│       ├── mobile-plan.ts
│       ├── favorite.ts
│       ├── user.ts
│       └── submission.ts
│
├── docs/
│   ├── PROJECT_SPEC.md
│   ├── CONTENT_STRATEGY.md
│   ├── ROADMAP.md
│   ├── AUTH_AND_FAVORITES.md
│   └── DATABASE_DESIGN.md
│
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## UI and UX principles

Use a clean, calm, Japanese-inspired information design.

Rules:

* Mobile-first
* Fast loading
* Comfortable for long-form reading
* Clear category navigation
* Avoid excessive animation
* Avoid visual clutter
* Use semantic HTML
* Use accessible labels for forms
* Make decision-oriented information easy to scan

## SEO rules

Each page should include:

* title
* description
* locale-aware HTML lang
* canonical URL when appropriate
* hreflang structure planned for multilingual pages
* semantic headings
* readable slugs
* structured content where useful

Prioritize SEO for:

* mobile plan comparisons
* city and neighborhood guides
* food and place recommendations
* administrative procedure guides
* practical Japanese phrase guides

## Development rules

* Keep code simple and readable.
* Prefer static pages and content collections in MVP.
* Do not add dependencies unless clearly useful.
* Keep UI mobile-first.
* All visible text should match the page locale.
* Use semantic HTML.
* Prioritize SEO metadata.
* Make article pages comfortable for long-form reading.
* Run `pnpm build` before reporting completion when possible.
* Do not over-engineer authentication or database features in MVP.
* Keep auth, db, favorites, and submissions boundaries clear for future implementation.

## Suggested commands

Use pnpm only.

Common commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Current implementation notes

This repository is initialized as an Astro + TypeScript static site with physical locale routes for:

* `/zh-tw/`
* `/en/`
* `/ja/`
* `/ko/`

Shared page components live under `src/components/pages/` so each locale route can stay thin while preserving locale-specific visible copy.

Phase 1 placeholders are intentional for:

* `src/lib/auth/`
* `src/lib/db/`
* `src/lib/favorites/`
* `src/lib/submissions/`
* `/[locale]/account/login`
* `/[locale]/account/favorites`
* `/[locale]/account/submissions`

Do not replace these placeholders with live Supabase behavior until Phase 2 work is explicitly requested.
