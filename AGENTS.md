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

An active autonomous goal prompt that grants commit, push, PR, and merge authority counts as explicit approval only for narrow PR cycles whose validation, review-feedback, clean-scope, and merge safety gates pass.

Never use destructive git commands such as `git reset --hard` or `git checkout --` unless the user explicitly requests that exact operation.

## AWP-lite

When the user mentions Autonomous, AWP, Hybrid AWP, Codex autonomous workflow, or asks for a broad autonomous task, first read [docs/ai/autonomous-bootstrap.md](docs/ai/autonomous-bootstrap.md).

TachiSuke uses AWP-lite, not tachigo's full autonomous PR governance. The workflow keeps startup readback, explicit scope, routing decisions, controller fallback reasons, and validation evidence, but it does not require Scope Police, spec-injector gates, or issue-first ceremony for every small change.

AWP-lite's preferred routing is GPT-5.5 Extra High as controller with Spark 5.3 as the default low-cost worker for repo scans, repetitive edits, docs/content transforms, route/link inventory, and first-pass test/build summaries. If Spark 5.3 or equivalent worker tooling is unavailable, record `controller_fallback_reason=worker_unavailable`.

Use AWP-lite only when it reduces risk: cross-module work, Phase 2 auth/database/favorites/submission planning, route or content-model changes, or tasks that explicitly ask for autonomous execution. For small docs, copy, or single-surface edits, proceed normally and keep the final report concise.

### Required Worker Routing Readback

For every non-trivial autonomous work cycle, the controller must explicitly report worker routing before implementation.

The routing readback must include one of:

- `spark_worker_delegated`: Spark 5.3 or an equivalent low-cost worker was used.
- `controller_fallback_reason=worker_unavailable`: no Spark/equivalent worker was available in the runtime.
- `controller_fallback_reason=trivial_self_only`: the task is small enough that worker delegation would add overhead.
- `controller_fallback_reason=high_risk_controller_only`: the task touches auth, database, RLS, secrets, permissions, moderation, or other high-risk areas requiring controller ownership.

For non-trivial repo-wide scans, repetitive edits, docs/content transforms, route/link inventories, and first-pass validation summaries, Spark 5.3 is the preferred worker. If Spark 5.3 is available and the task matches one of those categories, the controller should delegate that portion to Spark before implementation.

The controller remains responsible for final scope control, reviewing worker output, validating changes, PR quality, and merge safety.

Worker unavailability must not block autonomous progress. If the worker is unavailable, record the fallback reason and continue as controller.

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
- `/[locale]/site-map`
- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`
- `/[locale]/feed.xml`
- `/llms.txt`
- `/opensearch.xml`

Content translations should use `locale` and `translationKey`. Missing translations should fall back to English, then Traditional Chinese, or show a clear missing-content state.

Do not use Simplified Chinese unless explicitly requested.

## MVP Scope

Phase 1 is content-first, SEO-friendly, i18n-ready, auth-ready, database-ready, and favorites-ready.

Current MVP includes static pages, article publishing with semantic article dates and freshness/trust notices, place detail pages, mobile/area/tool detail pages, human-readable site map pages, static submit-place and contact/corrections external endpoint support, placeholder account pages, placeholder favorites, content collections, SEO metadata, RSS feeds, static search indexes, `llms.txt` discovery, browser OpenSearch discovery, and system/light/dark theme support with a globe-icon collapsed language control and separate collapsed theme control.

Phase 1B adds public-preview content depth:

- At least twenty public articles across supported locales, including zh-tw/en/ja/ko transportation commuter pass and residence administration decision content.
- Mobile plan data for povo, LINEMO, Rakuten Mobile, ahamo, and UQ mobile.
- Area guide samples for Ikebukuro, Itabashi, Akabane, and Kagurazaka / Edogawabashi.
- Internal links between articles and main locale sections.
- A conservative Markdown internal-link test.

Phase 1CI adds source-backed setup guide coverage:

- First-week setup and ward-office moving-in procedure article clusters should include official source links in all supported locales.
- Use source links as confirmation starting points, not exhaustive procedure guarantees.
- Do not add live external crawling, CMS workflows, database-backed source review, or Phase 2 behavior in Phase 1CI.

Phase 1CK adds static form contract tests:

- `pnpm test` should cover submit-place and contact/corrections form contracts.
- Contract tests should verify provider-agnostic endpoint env vars, preview-mode disabled submit, static `POST` action binding, hidden routing/moderation/privacy fields, honeypot fields, required fields, and URL/email input types.
- Do not turn these forms into backend storage, provider-specific integrations, captcha flows, auth-gated flows, or database-backed workflows in Phase 1CK.

Phase 1CL adds correction related URL coverage:

- `pnpm check:seo` should verify representative public detail pages link to `/[locale]/contact` with an encoded absolute `relatedUrl`.
- Coverage should include article, place, mobile plan, area, tool, and at least one non-English locale representative.
- Keep this as a static correction workflow helper; do not add analytics, tracking, backend storage, or guaranteed support response behavior.

Phase 1CM adds localized assistive labels:

- Shared layout assistive labels should use `getUiCopy` instead of hard-coded English strings.
- Primary navigation, footer navigation, article tag lists, and language switcher labels should stay locale-aware or explicitly multilingual where language-neutral discovery matters.
- Do not change route structure, visible navigation, theme behavior, or account/auth functionality in Phase 1CM.

Phase 1CN extends localized assistive labels:

- Article index category lists and place-card fact lists should also use `getUiCopy` instead of hard-coded English `aria-label` values.
- Keep these labels as assistive text only; do not change visible category cards, place cards, route structure, search behavior, or account/auth functionality in Phase 1CN.

Phase 1CO aligns site map structured-data language:

- Human-readable site map `WebPage` JSON-LD should use `htmlLangByLocale[locale]` for BCP47 `inLanguage` values.
- `pnpm check:seo` should verify generated `/[locale]/site-map` JSON-LD uses the same language metadata as the HTML `lang` value.
- Do not change visible site map content, routes, sitemap entries, account placeholders, or backend behavior in Phase 1CO.

Phase 1CP localizes article category display labels:

- Public article lists, article category pages, and locale homepage latest-article cards should display `getArticleCategoryTitle(locale, article.data.category)` instead of raw category keys like `mobile` or `housing`.
- Route slugs and content frontmatter category keys stay unchanged; only visible/meta display labels are localized.
- Do not change article routes, category slugs, content schemas, search indexing, account placeholders, or backend behavior in Phase 1CP.

Phase 1CQ improves static 404 recovery localization:

- `src/pages/404.astro` stays static, noindex, and excluded from `sitemap.xml`.
- The page should provide locale-specific recovery sections for `zh-tw`, `en`, `ja`, and `ko`, with links to each locale home, articles, mobile, and tools routes.
- Mark locale-specific recovery sections with shared BCP47 language metadata.
- Do not add language-detection redirects, Cloudflare Functions, Workers, analytics, backend error tracking, auth, database, or route changes in Phase 1CQ.

Phase 1CR localizes article detail category labels:

- Article detail pages should display `getArticleCategoryTitle(locale, category)` for visible category links, visible breadcrumbs, `Article` JSON-LD `articleSection`, breadcrumb JSON-LD category names, and Open Graph `article:section`.
- Keep article frontmatter category keys and category route slugs unchanged; raw keys remain content-model identifiers only.
- Do not change article routes, category slugs, content schemas, search indexing, account placeholders, or backend behavior in Phase 1CR.

Phase 1CS completes static 404 multilingual copy:

- `404.html` should keep a language-neutral visible heading and show top recovery explanations in all supported locales.
- The 404 language selector guidance should also be multilingual, not fixed English-only copy.
- Keep `404.html` static, noindex, nofollow, and excluded from `sitemap.xml`.
- Do not add language-detection redirects, client-side locale switching, Cloudflare Functions, Workers, analytics, backend error tracking, auth, database, or route changes in Phase 1CS.

Phase 1CT improves SEO check URL inference:

- `pnpm check:seo` should prefer an explicit `SITE_URL` when provided.
- When `SITE_URL` is unset, `pnpm check:seo` may infer the expected origin from the current built `dist/sitemap.xml` or `dist/robots.txt` so local checks validate the build that actually exists.
- Production/deploy verification should still build with the real `SITE_URL` and run `SITE_URL=<production-url> pnpm check:seo` plus `SITE_URL=<production-url> pnpm check:deploy`.
- Do not change Astro `site` runtime behavior, canonical URL generation, deployment domains, routes, auth, database, or backend behavior in Phase 1CT.

Phase 1CU expands locale search page SEO coverage:

- Build-output SEO checks should verify all four `/[locale]/search` pages keep `noindex, follow`, locale-aware GET form actions, `q` query support, locale search-index references, empty-state hooks, clear-search behavior, and no account placeholder results.
- Keep `/[locale]/search` static, dependency-free, and backed by `/[locale]/search-index.json`.
- Do not change search ranking, index generation, routes, analytics, hosted search, auth, database, or backend behavior in Phase 1CU.

Phase 1CV adds article translation group health:

- `pnpm check:content` should verify every public article `translationKey` is covered by an explicit locale policy.
- Fully localized public article groups should contain exactly `zh-tw`, `en`, `ja`, and `ko`.
- Any intentionally partial public article group must be documented in the content-health partial-locale allowlist.
- Do not auto-generate translations, change article routes, introduce machine translation, or add backend/CMS behavior in Phase 1CV.

Phase 1CW adds content-driven sitemap checks:

- `pnpm check:seo` should derive expected public sitemap paths from current content collections instead of a hand-maintained sample list.
- The sitemap check should cover non-draft article details, generated article categories, area details, mobile plan details, published place details, published tool details, locale roots, public section pages, trust/form pages, and RSS feeds.
- The sitemap check should continue excluding account placeholders, search pages, search indexes, drafts, non-published places, and non-published tools.
- Do not change sitemap generation, routes, auth, database, forms, deployment configuration, or runtime behavior in Phase 1CW.

Phase 1CX expands multilingual section JSON-LD checks:

- `pnpm check:seo` should verify mobile, area, place, and tool index `CollectionPage`, `ItemList`, and `BreadcrumbList` JSON-LD for every supported locale.
- Section index JSON-LD checks should verify BCP47 `inLanguage`, canonical URL, locale-home breadcrumb, public item count, and detail URL prefixes.
- Do not change section page output, routes, content, schemas, auth, database, forms, deployment configuration, or backend behavior in Phase 1CX.

Phase 1CY expands discovery cache header checks:

- `pnpm check:seo` should verify one-hour Cloudflare Pages cache rules for `sitemap.xml`, `robots.txt`, `llms.txt`, `security.txt`, `opensearch.xml`, `site.webmanifest`, the global RSS feed, all locale RSS feeds, and all locale search indexes.
- Checked `_headers` blocks should define exactly one `Cache-Control` line.
- Do not change Cloudflare runtime behavior, routes, generated HTML, auth, database, forms, deployment configuration, or backend behavior in Phase 1CY.

Phase 1CZ fixes Cloudflare cache header inheritance:

- Specific `_headers` blocks that set their own `Cache-Control` should first detach the inherited global `Cache-Control` rule with `! Cache-Control`.
- This avoids Cloudflare joining the global HTML revalidation policy with more specific cache policies.
- `pnpm check:seo` should verify the detach marker and exact cache value for every specific cache block.
- Do not add Workers, Functions, live crawling, auth, database, forms, or backend behavior in Phase 1CZ.

Phase 1DA expands deployment URL guards:

- `pnpm check:deploy` should require the configured HTTPS `SITE_URL` in public files that must expose absolute production URLs: sitemap, robots, OpenSearch, `llms.txt`, `security.txt`, global/locale RSS feeds, root home, locale homes, and a representative public HTML page.
- Relative-only deploy artifacts such as `site.webmanifest` and search index JSON should not be forced to contain `SITE_URL`.
- Do not change runtime SEO generation, routes, Cloudflare headers, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DA.

Phase 1DB expands RSS feed coverage checks:

- `pnpm check:seo` should derive expected global and locale RSS item URLs from current non-draft article content.
- Global `/feed.xml` should exactly match all public article URLs; locale feeds should exactly match same-locale public article URLs and exclude other locales.
- Do not change RSS runtime generation, routes, content, schemas, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DB.

Phase 1DC adds a public HTML head metadata guard:

- `pnpm check:seo` should derive indexable public HTML pages from `sitemap.xml`.
- Every sitemap HTML page should have a canonical URL and `og:url` that match the generated absolute page URL.
- Noindex utility pages such as search, account placeholders, and `404.html` stay outside this sitemap-derived guard.
- Do not change runtime SEO generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DC unless the guard exposes a real metadata defect.

Phase 1DD expands public HTML title and description guards:

- `pnpm check:seo` should verify every sitemap-derived public HTML page has non-empty title, meta description, Open Graph title/description, and Twitter title/description metadata.
- Open Graph and Twitter title/description should match the regular page title/description after HTML entity decoding.
- Avoid English-centric length thresholds because supported locales have different natural description lengths.
- Do not change runtime SEO generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DD unless the guard exposes a real metadata defect.

Phase 1DE expands public HTML shell guards:

- `pnpm check:seo` should verify every sitemap-derived public HTML page has the expected BCP47 `html lang`, mobile viewport metadata, skip link to `#main-content`, and stable `main#main-content` landmark.
- Root `/` should use the English fallback language; locale-prefixed paths should use shared locale metadata.
- Treat this as a baseline shell guard, not a full accessibility audit.
- Do not change runtime SEO generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DE unless the guard exposes a real shell defect.

Phase 1DF expands public HTML discovery link guards:

- `pnpm check:seo` should verify every sitemap-derived public HTML page links the SVG favicon, web manifest, OpenSearch description, global RSS feed, and current-locale RSS feed.
- Root `/` should use the English fallback locale feed; locale-prefixed paths should use their matching locale feed.
- Keep this as a static build-output discovery guard; do not change runtime SEO generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DF unless the guard exposes a real discovery defect.

Phase 1DG expands public HTML JSON-LD guards:

- `pnpm check:seo` should verify every sitemap-derived public HTML page has at least one JSON-LD script.
- Every JSON-LD script on those pages should parse successfully.
- Parsed JSON-LD should not contain string values exactly equal to `undefined` or `null`.
- Keep this as a static build-output structured-data guard; do not change runtime structured data generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DG unless the guard exposes a real JSON-LD defect.

Phase 1DH expands noindex utility page guards:

- `pnpm check:seo` should verify account placeholders, search pages, search index JSON endpoints, and `404.html` stay outside `sitemap.xml`.
- Built account placeholder pages should keep `noindex, nofollow`.
- Built search pages should keep `noindex, follow`.
- Keep this as a static build-output utility-page guard; do not change route structure, visible UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DH unless the guard exposes a real noindex defect.

Phase 1DI expands public HTML social image guards:

- `pnpm check:seo` should verify every sitemap-derived public HTML page has `og:image`, `og:image:alt`, `twitter:image`, and `twitter:card`.
- Social image URLs should use the configured site origin and same-site image assets.
- `twitter:image` should stay aligned with `og:image`, and `twitter:card` should remain `summary_large_image`.
- Keep this as a static build-output social metadata guard; do not change runtime SEO generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DI unless the guard exposes a real social metadata defect.

Phase 1DJ expands public HTML hreflang head guards:

- `pnpm check:seo` should verify every sitemap-derived public HTML page has head `hreflang` alternates.
- Head `hreflang` links should use supported locale values or `x-default`, avoid duplicates, use the configured site origin, and point only at public sitemap HTML paths.
- Keep this as a static build-output hreflang guard; do not change runtime i18n generation, routes, UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DJ unless the guard exposes a real hreflang defect.

Phase 1DK expands Cloudflare Pages redirect guards:

- `pnpm check:seo` should verify the built `_redirects` file matches the reviewed Phase 1 temporary fallback contract exactly.
- Redirect rules should stay `302`, avoid account placeholder routes, avoid redirecting canonical locale-prefixed paths, preserve splats for detail-like fallbacks, and only target English public fallbacks or canonical `/.well-known/security.txt`.
- Keep this as a static build-output redirect guard; do not change route structure, language detection, visible UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DK unless the guard exposes a real redirect defect.

Phase 1DL expands security.txt freshness guards:

- `pnpm check:seo` should verify built `/.well-known/security.txt` emits a parseable canonical UTC `Expires` timestamp.
- `Expires` should remain at least 30 days in the future and should not drift beyond the one-year editorial policy.
- Keep this as a static build-output discovery guard; do not change security contact workflow, route structure, visible UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DL unless the guard exposes a real security.txt defect.

Phase 1DM expands robots.txt directive guards:

- `pnpm check:seo` should verify built `robots.txt` has the reviewed exact directive contract: `User-agent: *`, `Allow: /`, `Disallow: /[locale]/account/` for every supported locale, and a configured-site `Sitemap` URL.
- `robots.txt` should not disallow public locale sections, feeds, search pages, or search indexes unless separately scoped.
- Keep this as a static build-output robots guard; do not change robots runtime generation, sitemap generation, route structure, visible UI, auth, database, forms, Workers, Functions, or backend behavior in Phase 1DM unless the guard exposes a real robots defect.

Phase 1DN expands OpenSearch output guards:

- `pnpm check:seo` should verify built `opensearch.xml` matches the reviewed browser search discovery contract exactly.
- The OpenSearch template should use the configured-site English static search fallback at `/en/search?q={searchTerms}`; production/deploy checks must not ship the fallback example domain.
- OpenSearch discovery must not point at account placeholders, locale search variants, search index JSON, private data, analytics, hosted search, auth, database, Workers, Functions, or backend behavior in Phase 1DN unless separately scoped.

Phase 1DO expands Web Manifest output guards:

- `pnpm check:seo` should verify built `site.webmanifest` matches the reviewed browser app identity contract for TachiSuke.
- The manifest should keep same-site icon assets, static root start/scope values, standalone display, and reviewed brand colors.
- Keep this as a static build-output guard; do not add service workers, install prompts, offline caching, push notifications, route changes, auth, database, Workers, Functions, or backend behavior in Phase 1DO.

Phase 1B.5 adds maintainability/detail depth:

- Mobile plan detail pages at `/[locale]/mobile/[slug]`.
- Area detail pages at `/[locale]/areas/[slug]`.
- Mobile plan fields: `officialUrl`, `lastCheckedAt`, `sourceNote`, `notes`.
- Area fields: `title`, `summary`, `lastCheckedAt`, `notes`.
- Post-build static HTML link checking with `pnpm check:links`.
- Conservative detail-page locale switcher links that avoid missing generated pages.

Phase 1BB adds public content directory depth:

- Human-readable site map pages at `/[locale]/site-map`.
- Pages list public content only: non-draft articles, article categories, mobile plans, area guides, published places, published tools, trust pages, and RSS links.
- Do not link account placeholder routes from public site map pages.

Phase 1BC adds sitemap freshness depth:

- Public aggregate sitemap entries should have content-derived `lastmod` values for `/[locale]/articles`, `/[locale]/areas`, `/[locale]/places`, `/[locale]/mobile`, `/[locale]/tools`, and `/[locale]/site-map`.
- Derive freshness from local content metadata only; do not add external crawling or backend freshness tracking in Phase 1.

Phase 1BD adds LLM discovery alignment:

- `/llms.txt` should include locale site map links as public discovery surfaces.
- Keep `/llms.txt` plain text and do not expose account placeholders, drafts, private data, or runtime AI behavior.

Phase 1BE adds Open Graph locale metadata:

- Keep `ogLocaleByLocale` centralized in locale metadata.
- `BaseLayout` should emit `og:locale` and supported `og:locale:alternate` values for multilingual sharing.

Phase 1BF adds article Open Graph metadata:

- Article detail pages should emit `article:published_time`, `article:modified_time`, `article:section`, and `article:tag` from existing article frontmatter.
- Do not add social SDKs, tracking, comments, or analytics in this phase.

Phase 1BG adds homepage sitemap freshness:

- Locale homepage sitemap entries should have content-derived `lastmod` values.
- Reuse local public content metadata; do not add crawling, analytics, or backend freshness tracking.

Phase 1BH adds homepage structured data:

- Locale homepages should emit conservative `WebPage` and start-here `ItemList` JSON-LD from existing homepage copy and links.
- Do not invent ratings, pricing, review counts, or external claims in homepage structured data.

Phase 1BI adds article index structured data:

- Article index pages should emit conservative `CollectionPage` and `ItemList` JSON-LD from same-locale, non-draft public articles.
- Keep article index JSON-LD aligned with rendered article lists; do not add engagement metrics or unsupported authorship claims.

Phase 1BJ adds section index structured data:

- Mobile, area, place, and tool index pages should emit conservative `CollectionPage` and `ItemList` JSON-LD from rendered public cards.
- Keep section index JSON-LD static and editorial; do not invent ratings, exact prices, live availability, or external claims.

Phase 1BK adds collection index breadcrumb structured data:

- Article, mobile, area, place, and tool index pages should emit two-level `BreadcrumbList` JSON-LD from locale home to current section.
- Phase 1CJ adds matching visible breadcrumbs for public collection index pages.

Phase 1CJ adds collection visible breadcrumbs:

- Article, mobile, area, place, and tool index pages should render locale-aware visible breadcrumbs from locale home to current section.
- Breadcrumb links must point to existing public routes only.
- Do not add breadcrumbs to noindex utility/account pages unless separately scoped.

Phase 1BL adds trust/form page structured data:

- About, privacy, editorial policy, contact, and submit-place pages should emit conservative `WebPage` and two-level `BreadcrumbList` JSON-LD.
- Keep this metadata backed by visible page copy and configured static routes.
- Do not add structured data to noindex account placeholders.

Phase 1C adds submit-place workflow MVP:

- `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` controls form activation.
- Endpoint unset means preview mode with disabled submit.
- Endpoint set means static `POST` to the external endpoint.
- The provider must stay configurable; do not hard-code Formspree, Netlify Forms, Google Forms, Cloudflare Workers, or a custom API URL.
- Submit-place thanks pages exist at `/[locale]/submit-place/thanks`.
- Hidden fields should include `formName`, `source`, `locale`, `moderationRequired`, `publishDirectly`, and `redirectUrl`.
- Honeypot is basic spam reduction only; do not add captcha or large anti-spam dependencies in Phase 1C.

Phase 1D adds SEO and launch readiness:

- Generate `sitemap.xml`, `robots.txt`, `llms.txt`, and `site.webmanifest`.
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
- CI should run `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- CI does not deploy to Cloudflare Pages yet; deployment secrets and project settings stay outside the repo until explicitly scoped.

Phase 1G adds static related content:

- Article detail pages can show up to three related same-locale, non-draft articles.
- Related links are build-time and rule-based, not personalized.
- Ranking should prefer same category, shared tags, then recent updates.
- Related links must not point to the current article, drafts, or other locales.

Phase 1H adds static tools and checklists:

- Tool detail pages exist at `/[locale]/tools/[slug]`.
- Published tools are generated from `src/content/tools`.
- Tool fields include localized `title`, `description`, `sourceNote`, optional `sourceLinks`, `notes`, checklist `sections`, and `lastCheckedAt`.
- Published Phase 1 tools include `moving-to-japan-checklist`, `japan-rent-initial-cost-checklist`, `ward-office-moving-in-checklist`, `commuter-pass-ic-card-checklist`, `apartment-viewing-japanese-phrases`, `moving-out-checklist`, and `japan-emergency-disaster-checklist`.
- Checklist pages are static and must not imply saved progress, login, or database persistence.
- Only `status = published` tools should appear in public list/detail pages.

Phase 1I adds conservative detail-page structured data:

- Mobile plan detail pages emit `Service` and `BreadcrumbList` JSON-LD.
- Area detail pages emit `WebPage` and `BreadcrumbList` JSON-LD.
- Tool detail pages emit `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD.
- Do not add `Offer`, ratings, reviews, coordinates, opening hours, or exact addresses unless the content model and editorial review process actually support those claims.

Phase 1U adds visible breadcrumbs:

- Nested public article, article category, place, mobile plan, area, and tool pages should render locale-aware visible breadcrumbs.
- Public collection index pages should also render two-level visible breadcrumbs after Phase 1CJ.
- Breadcrumb parent links must point to existing public routes only.
- The current breadcrumb item should use `aria-current="page"` and should not be a link.
- Keep visible breadcrumbs aligned with JSON-LD breadcrumbs when both exist.

Phase 1V adds article table of contents:

- Article detail pages should pass Astro-rendered Markdown/MDX headings into `ArticleLayout`.
- `ArticleLayout` should render a static, locale-aware table of contents for useful H2/H3 heading sets.
- TOC links must point to same-page generated heading anchors only.
- Do not add scroll spy, saved reading state, or client dependencies in Phase 1V.

Phase 1W adds content health checks:

- `pnpm check:content` runs dependency-free source checks for content IDs, slugs, dates, `lastCheckedAt`, and stored URL fields.
- Content health checks do not fetch external URLs and do not validate live prices, campaigns, opening hours, or provider terms.
- CI should run `pnpm check:content` before `pnpm build`.

Phase 1X adds browser metadata polish:

- `BaseLayout` should include site-wide `theme-color`, `application-name`, `apple-mobile-web-app-title`, and `format-detection` metadata.
- Keep this lightweight; do not add a service worker, install prompt, or PWA runtime without a dedicated phase.

Phase 1J adds a static RSS feed:

- `/feed.xml` is generated from non-draft public articles.
- Public pages include an RSS alternate link in `BaseLayout`.
- The global feed remains multilingual across all locales.
- Draft articles must not appear in the feed.

Phase 1R adds locale RSS feeds:

- `/[locale]/feed.xml` is generated from same-locale non-draft public articles.
- Public pages include a current-locale RSS alternate link in addition to `/feed.xml`.
- Feeds remain static and article-only; do not add category feeds, pagination, or runtime feed generation unless explicitly scoped.

Phase 1S adds static search:

- `/[locale]/search` is a noindex static utility page.
- `/[locale]/search?q=...` should prefill the search input, filter results, and keep the URL query in sync while staying noindex.
- `/[locale]/search-index.json` is generated from public content collections.
- Search indexes include only public content: matching-locale non-draft articles, published places, current mobile plans, current area guides, and published tools.
- Do not add hosted search, database search, analytics, personalization, or large search dependencies in Phase 1 unless explicitly scoped.

Phase 1AK adds OpenSearch discovery:

- `/opensearch.xml` points browser/search-adjacent tooling at `/en/search?q={searchTerms}` as the stable static search fallback.
- Public pages include `<link rel="search" type="application/opensearchdescription+xml">`.
- Keep it static and provider-free; do not add backend search, language detection, analytics, or private-content search in Phase 1.

Phase 1AL adds WebSite SearchAction JSON-LD:

- Site-wide `WebSite` JSON-LD includes `SearchAction` pointing at `/en/search?q={search_term_string}`.
- Keep the target aligned with static search and OpenSearch.
- Do not imply backend, personalized, account, analytics, or private-content search in Phase 1.

Phase 1AM adds sitemap hreflang alternates:

- `sitemap.xml` declares the XHTML namespace and includes conservative `xhtml:link` alternates.
- Shared locale pages and shared static detail pages can include all supported locales plus `x-default` to English.
- Article alternates must be grouped by `translationKey` and include only non-draft generated article pages.
- Do not add alternates to missing translations, account placeholders, search pages, or private data.

Phase 1T adds article category landing pages:

- `/[locale]/articles/category/[category]` is generated from non-draft same-locale article categories.
- Article category pages are public, indexable, and included in `sitemap.xml`.
- Do not generate empty categories or tag pages unless explicitly scoped.

Phase 1K adds Cloudflare Pages deploy readiness:

- `wrangler.toml` should stay minimal: `name`, `compatibility_date`, and `pages_build_output_dir = "./dist"`.
- Do not commit Cloudflare account IDs, API tokens, secrets, or production-only environment values.
- Deployment details live in `docs/DEPLOYMENT.md`.
- Keep Phase 1 deployment static-first; do not add Workers/Functions runtime code unless explicitly scoped.
- `_headers` should keep HTML revalidated and use conservative one-hour cache rules for sitemap, robots, manifest, RSS feeds, `llms.txt`, `opensearch.xml`, and search indexes.

Phase 1AN adds Cloudflare CSP headers:

- `_headers` should include a conservative `Content-Security-Policy`.
- The Phase 1 CSP may allow `'unsafe-inline'` for current inline JSON-LD and small static enhancement scripts.
- `form-action` should allow `https:` so provider-agnostic external form endpoints still work.
- Do not add analytics, external script hosts, nonce infrastructure, or Workers runtime unless explicitly scoped.

Phase 1AO adds `/.well-known/security.txt`:

- Generate it as a static endpoint from `SITE_URL`.
- Use `/en/contact` as the public security contact route until a dedicated security process exists.
- Include `Canonical`, `Preferred-Languages`, `Policy`, and a future `Expires` value.
- Do not commit personal email addresses, private trackers, response SLAs, or a support backend in Phase 1AO.

Phase 1AC adds Cloudflare Pages redirects:

- `public/_redirects` may provide temporary English fallbacks for common locale-less public paths.
- Keep canonical URLs and in-app navigation locale-prefixed.
- Do not add account placeholder redirects, language-detection redirects, Cloudflare Workers, or auth-aware routing in Phase 1AC.

Phase 1AD adds discovery cache headers:

- Keep HTML revalidated.
- Use one-hour cache headers for RSS feeds, `llms.txt`, and search index JSON.
- Do not add CDN purge automation, Workers, or runtime cache logic in Phase 1AD.

Phase 1L adds baseline accessibility polish:

- Keep the skip link to `#main-content`.
- Keep the main landmark target stable.
- Mark active primary navigation with `aria-current`.
- Preserve visible `:focus-visible` styles for keyboard users.
- Treat this as baseline work, not a complete accessibility audit.

Phase 1M adds launch trust pages:

- Keep `/[locale]/privacy` and `/[locale]/editorial-policy` static and publicly linked.
- Privacy copy should match the current static MVP: no auth, no database, optional external submit-place and contact/corrections endpoints only.
- Editorial policy copy should explain moderation, source caveats, and decision-guide boundaries.
- Do not imply that Phase 1 has a final legal privacy policy, analytics, account storage, or database-backed submissions.

Phase 1O adds contact/corrections workflow MVP:

- `PUBLIC_CONTACT_FORM_ENDPOINT` controls form activation.
- Endpoint unset means preview mode with disabled submit.
- Endpoint set means static `POST` to the external endpoint.
- The provider must stay configurable; do not hard-code Formspree, Netlify Forms, Google Forms, Cloudflare Workers, or a custom API URL.
- Contact thanks pages exist at `/[locale]/contact/thanks`.
- Hidden fields should include `formName`, `source`, `locale`, `redirectUrl`, and `publicResponse`.
- The form may collect optional email for follow-up, but the repo must not store messages or provide a support backend in Phase 1.
- Honeypot is basic spam reduction only; do not add captcha or large anti-spam dependencies in Phase 1O.

Phase 1P adds detail-page correction prompts:

- Public article, place, mobile plan, area, and tool detail pages should link readers to `/[locale]/contact`.
- Keep correction prompts short, localized, and static.
- Do not add analytics, auth, database storage, or provider-specific behavior for prompts in Phase 1P.

Phase 1Z adds correction prompt URL prefill:

- Detail-page correction prompts may append an encoded absolute `relatedUrl` query value for the current public page.
- Contact/corrections may use small browser-side JavaScript to prefill the optional related URL field.
- Prefill must stay progressive enhancement only; do not change endpoint behavior, add tracking, or add server-side storage.

Phase 1AA adds `llms.txt` discovery:

- Keep `/llms.txt` static, concise, and plain text.
- Link only to public discovery surfaces such as sitemap, RSS feeds, locale roots, section pages, and static search indexes.
- Do not include account placeholders, drafts, private data, analytics, crawling, or AI runtime behavior.

Phase 1AB adds feed-aware sitemap discovery:

- Include `/feed.xml` and `/[locale]/feed.xml` in `sitemap.xml`.
- Global feed `lastmod` should use the newest public article update date.
- Locale feed `lastmod` should use the newest public same-locale article update date.
- Keep account placeholders, search pages, and search indexes out of the sitemap.

Phase 1Q adds a static custom 404 page:

- Keep `src/pages/404.astro` static and dependency-free.
- `404.html` should be `noindex, nofollow` and excluded from `sitemap.xml`.
- Use recovery links to locale homepages and core sections.
- Do not add language-detection redirects, Cloudflare Functions, Workers, analytics, or error tracking unless explicitly scoped.

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
- Native/database-backed contact/support storage
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

## Contact and Corrections

The contact/corrections page is static-site friendly in Phase 1O. It may post to `PUBLIC_CONTACT_FORM_ENDPOINT`, but the repo must not store, email, triage, or publish contact messages directly.

Rules:

- Contact messages are for corrections, outdated information, broken links, and general feedback.
- Public detail prompts can pass the current page URL as `relatedUrl` so reports are easier to triage.
- Email is optional/private and must not be public.
- Avoid collecting unnecessary personal or sensitive information.
- Do not imply an individual reply is guaranteed.
- Do not add a database-backed support queue unless explicitly scoped in a future phase.

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
pnpm check:content
pnpm build
pnpm check:links
pnpm check:seo
```

For Phase 1B/1B.5 content work, `pnpm test` should cover content depth and conservative source-level internal link checks. `pnpm check:links` scans built static HTML in `dist/`, so run `pnpm build` first. It does not validate external URLs, anchors, JavaScript behavior, or visual rendering.

For SEO/routing/deployment work, run `pnpm check:seo` after `pnpm build`; it verifies generated sitemap, robots, manifest, and Cloudflare headers.
It also parses representative detail pages for conservative JSON-LD.

For package or scaffold work, also check that forbidden lockfiles were not introduced:

- `package-lock.json`
- `yarn.lock`
- `bun.lock`
- `bun.lockb`

Keep final reports concise: list important changed files, placeholder status, verification results, and useful next steps.
