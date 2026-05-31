# TachiSuke

TachiSuke is a multilingual Japan life decision assistant for people living in Japan, preparing to move to Japan, studying in Japan, working in Japan, or staying long-term.

Brand meaning:

- `Tachi` = 立ち / 達 / Tachiko
- `Suke` = 助け / 助

The product helps users stand on their own feet in Japan by making practical daily-life decisions easier.

## MVP

This first version is content-first, SEO-friendly, i18n-ready, auth-ready, database-ready, and favorites-ready.

It includes:

- Astro + TypeScript static site generation
- Locale-prefixed routes for `zh-tw`, `en`, `ja`, and `ko`
- Markdown/MDX content collections
- Article, area, place, mobile, tool, submit-place, about, and account placeholder pages
- Shared UI components for layout, cards, favorite placeholders, and login prompts
- Future boundaries for auth, database, favorites, and submissions
- Supabase Auth/Postgres planning docs without implementing dynamic features yet

Not included in MVP:

- Real authentication
- Database-backed favorites
- Public comments
- Payments
- User submissions that publish directly
- Large CMS or admin dashboard

## Commands

Use pnpm only.

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm test
```

Local development:

```bash
pnpm dev
```

Production build:

```bash
pnpm build
```

Production preview:

```bash
pnpm preview
```

## Routes

- `/`
- `/zh-tw/`
- `/en/`
- `/ja/`
- `/ko/`
- `/[locale]/articles`
- `/[locale]/areas`
- `/[locale]/places`
- `/[locale]/mobile`
- `/[locale]/tools`
- `/[locale]/submit-place`
- `/[locale]/about`
- `/[locale]/account/login`
- `/[locale]/account/favorites`
- `/[locale]/account/submissions`

## i18n Strategy

All public pages use locale-prefixed routing. Supported locales are:

- `zh-tw`: Traditional Chinese
- `en`: English
- `ja`: Japanese
- `ko`: Korean

Content items include `id`, `slug`, `locale`, and `translationKey`. The `translationKey` connects different language versions of the same content. Missing translations should fall back to English first, then Traditional Chinese when English is unavailable.

## Future Supabase Starting Point

When moving into Phase 2, start with:

1. Add Supabase environment variables and client helpers under `src/lib/db/`.
2. Add Supabase Auth helpers under `src/lib/auth/`.
3. Implement the generic `favorites` table using `target_type` and `target_id`.
4. Enable Row Level Security before shipping dynamic user data.
5. Move account pages from placeholders to protected SSR or hybrid Astro routes.

See:

- [Project spec](docs/PROJECT_SPEC.md)
- [Content strategy](docs/CONTENT_STRATEGY.md)
- [Roadmap](docs/ROADMAP.md)
- [Auth and favorites](docs/AUTH_AND_FAVORITES.md)
- [Database design](docs/DATABASE_DESIGN.md)
