# TachiSuke Project Spec

## 產品定位

TachiSuke is a multilingual Japan life decision assistant. It is not a generic travel blog. The product helps people living in Japan, preparing to move to Japan, studying in Japan, working in Japan, or staying long-term make practical daily-life decisions.

Core decisions include mobile plans, renting and housing, city and neighborhood choices, food and restaurants, transportation, administrative procedures, practical Japanese phrases, work topics, and community-recommended places.

## 目標使用者

- 剛到日本、正在處理手機門號、住址、銀行、交通與生活用品的人
- 準備搬到日本，想先理解成本、地區差異與流程的人
- 在日本留學、工作或長住，需要多語系生活資訊的人
- 日文能力有限，需要外國居民友善說明的人
- 想用比較、清單、決策樹快速做生活決定的人

## Brand

- Repo name: `tachi-suke`
- Brand name: `TachiSuke`
- English name: `Japan Life Assistant`
- `Tachi` = 立ち / 達 / Tachiko
- `Suke` = 助け / 助

Meaning: help people stand on their own feet and build a stable life in Japan.

## 支援語言與 i18n 策略

Supported locales:

- `zh-tw`: Traditional Chinese
- `en`: English
- `ja`: Japanese
- `ko`: Korean

The architecture must support all four locales from the start. Core content can start with Traditional Chinese and English, while Japanese and Korean can be added gradually.

## URL Locale 設計

All locale-specific pages use locale-prefixed routing:

- `/zh-tw/`
- `/en/`
- `/ja/`
- `/ko/`

Examples:

- `/zh-tw/articles`
- `/en/articles`
- `/ja/places`
- `/ko/mobile`

Content items include:

- `id`
- `slug`
- `locale`
- `translationKey`

`translationKey` connects translations of the same content item.

## Fallback 語言策略

If a translation is missing:

1. Prefer the requested locale.
2. Fall back to English.
3. Fall back to Traditional Chinese.
4. Show a clear missing-content state only if neither fallback exists.

Do not use Simplified Chinese unless explicitly requested in the future.

## MVP 範圍

The MVP focuses on:

- Static content
- Multilingual routing
- SEO metadata
- Clean navigation
- Article publishing
- City and neighborhood guide pages
- Food and place guide pages
- Mobile plan comparison pages
- Simple tool pages
- Moderated place submission planning
- Placeholder account pages
- Placeholder favorite functionality

The MVP does not fully implement:

- Authentication
- Database integration
- Public comments
- Payments
- Complex CMS/admin
- Real-time community features
- Direct public publishing from user submissions

## 資料模型

Primary models:

- `Article`
- `Place`
- `MobilePlan`
- `CityGuide`
- `Favorite`
- `PlaceSubmission`
- `UserProfile`

See `docs/DATABASE_DESIGN.md` for the future Supabase schema draft.

## SEO 策略

Each page should include:

- Locale-aware `html lang`
- Title
- Description
- Canonical URL
- Planned `hreflang` links
- Semantic headings
- Readable slugs
- Structured content where useful

Priority SEO topics:

- Mobile plan comparisons
- City and neighborhood guides
- Food and place recommendations
- Administrative procedures
- Practical Japanese phrase guides

## 目錄結構

```text
tachi-suke/
├── src/
│   ├── content/
│   ├── lib/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── types/
├── docs/
├── tests/
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## 開發規範

- Keep code simple and readable.
- Prefer static pages and content collections in MVP.
- Use semantic HTML.
- Keep pages mobile-first.
- Do not add dependencies unless clearly useful.
- Keep auth, db, favorites, and submissions as clear future boundaries.
- Run `pnpm build` before reporting completion when possible.

## pnpm 使用規則

Use pnpm only:

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Do not introduce `npm`, `npx`, `yarn`, `bun`, `package-lock.json`, `yarn.lock`, `bun.lock`, or `bun.lockb`.
