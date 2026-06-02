# TachiSuke Content Model

This document records the current content collections and TypeScript model boundaries. Phase 1 stores public content in Astro content collections and keeps auth, favorites, user profiles, and submissions as TypeScript-ready placeholders only.

## Article

**Purpose:** Long-form practical guides that help users make decisions about life in Japan.

**Current storage:** Markdown/MDX files in `src/content/articles`, loaded by the `articles` content collection.

**Required fields:**

- `id`
- `slug`
- `locale`
- `translationKey`
- `title`
- `description`
- `category`
- `tags`
- `publishedAt`
- `updatedAt`
- `draft`

**Optional fields:**

- `sourceLinks`: editorial confirmation links for official or high-trust sources
  - `label`: source label in the article locale
  - `url`: HTTPS source URL
  - `note`: optional short note explaining how to use the source

**Enum values:**

- `locale`: `zh-tw`, `en`, `ja`, `ko`
- `draft`: boolean

**Public visibility rules:**

- Article index pages show only matching-locale articles where `draft = false`.
- Article detail pages are generated only for matching-locale articles where `draft = false`.
- Article category pages are generated only from matching-locale articles where `draft = false`.
- The global `/feed.xml` RSS feed includes only articles where `draft = false`.
- Locale RSS feeds at `/[locale]/feed.xml` include only matching-locale articles where `draft = false`.
- Locale search indexes include only matching-locale articles where `draft = false`.
- `sourceLinks` are rendered only on public article detail pages and are intended as official confirmation starting points, not live-validated guarantees.

**Future database mapping notes:**

- If articles move to Postgres or a CMS later, preserve `translationKey`, `locale`, and stable `slug`.
- Keep a separate draft/publish workflow and avoid exposing draft content through public routes or APIs.
- Store source links as ordered child records or JSON with `label`, `url`, and optional `note`, and keep external-link validation separate from the publishing workflow.

## Place

**Purpose:** Resident-friendly places such as restaurants, cafes, shops, diners, and practical everyday locations.

**Current storage:** JSON files in `src/content/places`, loaded by the `places` content collection.

**Required fields:**

- `id`
- `slug`
- `name`
- `category`
- `prefecture`
- `city`
- `area`
- `station`
- `priceRange`
- `soloFriendly`
- `nonSmokingStatus`
- `japaneseDifficulty`
- `paymentMethods`
- `source`
- `status`
- `createdAt`
- `updatedAt`

**Optional fields:**

- `googleMapUrl`
- `officialUrl`
- `tabelogUrl` in the TypeScript type, not currently in the content schema
- `instagramUrl` in the TypeScript type, not currently in the content schema
- Future candidate: localized editorial notes such as `goodFor`, `useCases`, `watchouts`, `smokingNote`, and `paymentNote`

**Enum values:**

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

**Public visibility rules:**

- Only `status = published` Place entries can appear in public list pages.
- Only `status = published` Place entries can generate public detail pages.
- `draft`, `pending_review`, `rejected`, and `archived` must stay out of public list/detail pages.
- User-submitted places must be moderated and normalized before becoming public Place entries.

**Future database mapping notes:**

- Keep Place publication status separate from raw submission moderation status.
- If a submission is approved, normalize it into a public Place record instead of publishing the raw submission directly.
- Add database constraints that match the enum values above.
- Phase 1B place detail pages generate explanatory sections from existing fields. Add explicit notes fields only when editorial content becomes too nuanced for generated guidance.

## Area / CityGuide

**Purpose:** City and neighborhood guide data for comparing living areas by rent, commute, convenience, quietness, and fit.

**Current storage:** JSON files in `src/content/areas`, loaded by the `areas` content collection.

**Required fields:**

- `id`
- `slug`
- `title`
- `summary`
- `prefecture`
- `city`
- `stations`
- `rentLevel`
- `foodLevel`
- `commuteConvenience`
- `quietness`
- `recommendedFor`
- `warnings`
- `lastCheckedAt`
- `notes`

**Optional fields:**

- `locale`
- `translationKey`

**Enum values:**

- `locale`: `zh-tw`, `en`, `ja`, `ko` when present

**Public visibility rules:**

- Current MVP has area index pages and area detail pages at `/[locale]/areas/[slug]`.
- Phase 1B.5 area details render all entries in the static `areas` collection.
- Area content should remain life-decision-oriented, not sightseeing-oriented.

**Future database mapping notes:**

- Keep locale and `translationKey` available for localized area guides.
- Consider normalized city, station, and prefecture tables only after content volume makes that worthwhile.
- Keep `lastCheckedAt` because rent feel, station convenience, and area conditions can become stale.
- Consider future fields for source URLs and localized editorial notes if area data becomes more formal.

## MobilePlan

**Purpose:** Data for comparing mobile plans by provider, price, data amount, requirements, pros, cons, and recommended users.

**Current storage:** JSON files in `src/content/mobile-plans`, loaded by the `mobile-plans` content collection.

**Required fields:**

- `id`
- `slug`
- `provider`
- `planName`
- `monthlyPrice`
- `dataAmount`
- `paymentRequirements`
- `residenceCardRequired`
- `creditCardRequired`
- `pros`
- `cons`
- `recommendedFor`
- `officialUrl`
- `lastCheckedAt`
- `sourceNote`
- `notes`

**Optional fields:** None in the current schema.

**Enum values:** None in the current schema.

**Public visibility rules:**

- Current mobile index lists all mobile plan entries in the collection.
- Phase 1B includes povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile as decision-oriented editorial data.
- Phase 1B.5 adds mobile detail pages at `/[locale]/mobile/[slug]`.
- Mobile plan prices, campaigns, data allowances, payment conditions, and identity checks can change. Users must confirm official sites before applying.
- Mobile plan detail pages must show `officialUrl`, `lastCheckedAt`, `sourceNote`, and `notes`.
- Carrier names must use the convention documented in `docs/I18N_COMPLETENESS.md`: povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile.
- Phase 1 keeps the mobile JSON schema locale-neutral, while localized visible copy is provided by `src/lib/content/mobile-plan-copy.ts`.

**Future database mapping notes:**

- Treat pricing and plan conditions as time-sensitive editorial data.
- Consider an editorial review workflow with `reviewedBy`, `nextReviewAt`, and archived historical snapshots before publishing serious comparison content at scale.
- Add localized caveat fields only when the same plan needs substantially different explanations per locale.

## Tool

**Purpose:** Static life tools such as checklists, decision aids, procedure helpers, and future calculators that support practical decisions.

**Current storage:** JSON files in `src/content/tools`, loaded by the `tools` content collection.

Current published tools:

- `moving-to-japan-checklist`
- `japan-rent-initial-cost-checklist`
- `ward-office-moving-in-checklist`
- `commuter-pass-ic-card-checklist`
- `apartment-viewing-japanese-phrases`
- `apartment-application-documents-checklist`
- `japan-job-application-documents-checklist`
- `japan-everyday-shopping-checklist`
- `moving-out-checklist`
- `japan-emergency-disaster-checklist`

**Required fields:**

- `id`
- `slug`
- `title`
- `description`
- `status`
- `lastCheckedAt`
- `sourceNote`
- `notes`
- `sections`

`title`, `description`, `sourceNote`, source link labels, `notes`, section titles, and section items are localized records for `zh-tw`, `en`, `ja`, and `ko`.

**Optional fields:**

- `sourceLinks`: defaults to `[]`. Use this for official or high-trust confirmation links when a tool depends on public procedures, government guidance, or date-sensitive external facts.

**Enum values:**

- `status`: `planned`, `draft`, `published`

**Public visibility rules:**

- Tools index pages show only `status = published` tool cards.
- Tool detail pages are generated only for `status = published` tools at `/[locale]/tools/[slug]`.
- Planned or draft tools must not appear in public list/detail pages.
- Current checklist pages are static. They do not save progress, require login, or write to a database.
- Official source links are confirmation starting points, not a guarantee that every municipality, carrier, landlord, or institution follows the same process.

**Future database mapping notes:**

- Keep tools static while they are editorial checklists and simple decision aids.
- Add saved progress only after Phase 2 auth/favorites and a clear persistence model exist.
- If calculators become dynamic, consider whether Cloudflare Workers, Astro server islands, or a separate backend is needed before adding runtime dependencies.

## Favorite

**Purpose:** Future user-saved items across articles, places, mobile plans, areas, and tools.

**Current storage:** TypeScript placeholder in `src/types/favorite.ts`. No runtime storage exists in Phase 1.

**Required fields:**

- `id`
- `userId`
- `targetType`
- `targetId`
- `createdAt`

**Optional fields:** None in the current type.

**Enum values:**

- `targetType`: `article`, `place`, `mobile_plan`, `area`, `tool`

**Public visibility rules:**

- Favorites do not exist in Phase 1.
- Future favorites require login.
- Users must only read, create, and delete their own favorites.

**Future database mapping notes:**

- Use a unique constraint on `(user_id, target_type, target_id)`.
- Enable Row Level Security before shipping.

## UserProfile

**Purpose:** Future user profile metadata connected to an authenticated user.

**Current storage:** TypeScript placeholder in `src/types/user.ts`. No runtime storage exists in Phase 1.

**Required fields:**

- `id`
- `createdAt`
- `updatedAt`

**Optional fields:**

- `displayName`
- `preferredLocale`

**Enum values:**

- `preferredLocale`: `zh-tw`, `en`, `ja`, `ko` when present

**Public visibility rules:**

- User profiles do not exist in Phase 1.
- Future profiles should be private to the user unless a public profile feature is explicitly designed.

**Future database mapping notes:**

- `id` should reference `auth.users(id)` in Supabase.
- Users should read and update only their own profile unless admin workflows are explicitly added.

## PlaceSubmission

**Purpose:** Future raw recommendation submissions from users before editorial review.

**Current storage:** TypeScript placeholder in `src/types/submission.ts`. Phase 1C can post the submit-place form to an external endpoint configured by `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`, but the repo does not create database records or store submissions locally.

**Required fields:**

- `id`
- `submissionLocale`
- `placeName`
- `category`
- `prefecture`
- `city`
- `recommendationReason`
- `paymentMethods`
- `status`
- `createdAt`
- `updatedAt`

**Optional fields:**

- `userId`
- `area`
- `station`
- `googleMapUrl`
- `officialUrl`
- `priceRange`
- `soloFriendly`
- `nonSmokingStatus`
- `japaneseDifficulty`
- `submitterNickname`
- `submitterEmail`
- `moderatorNote`

**Enum values:**

- `status`: `pending_review`, `approved`, `rejected`, `needs_more_info`
- `submissionLocale`: `zh-tw`, `en`, `ja`, `ko`

**Public visibility rules:**

- Raw submissions must never publish directly.
- Submitter email must never appear on public pages.
- Approved submissions should be edited and normalized into Place entries.
- Public Place visibility is still controlled by `Place.status = published`.

**Future database mapping notes:**

- Anonymous submissions may be allowed in Phase 1C, but should still avoid unnecessary personal data.
- Phase 1C hidden form metadata includes `formName`, `source`, `locale`, `moderationRequired`, `publishDirectly`, and `redirectUrl`.
- Phase 1C includes a visually hidden `website` honeypot field for basic spam reduction. It is not a complete anti-spam system.
- Authenticated submissions in Phase 3 should let users view only their own submission history.
- Admin moderation requires a separate admin role model and RLS policies.

## ContactCorrectionMessage

**Purpose:** Future raw correction, outdated-information, broken-link, or general feedback messages from readers.

**Current storage:** No content collection, no TypeScript runtime model, and no database storage in Phase 1. Phase 1O can post the contact/corrections form to an external endpoint configured by `PUBLIC_CONTACT_FORM_ENDPOINT`, but the repo does not create records, send email, or store messages locally.

**Current form fields:**

- `contactLanguage`
- `topic`
- `relatedUrl`
- `name`
- `email`
- `message`

**Hidden metadata:**

- `formName = contact-corrections`
- `source = tachi-suke`
- `locale`
- `redirectUrl`
- `publicResponse = false`

**Public visibility rules:**

- Contact messages must not publish directly.
- Email must never appear on public pages.
- Reports may inform future public content corrections after editorial review.
- Detail-page correction prompts can prefill `relatedUrl` through a URL query parameter, but the value is still user-editable and does not create local storage.

**Future database mapping notes:**

- Add a real model only if TachiSuke needs a first-party support or corrections queue.
- Keep email optional and private.
- Add retention, access-control, and privacy-review rules before storing messages in PostgreSQL.
- If a database-backed queue is built later, protect it with admin-only access and avoid storing unnecessary sensitive data.
