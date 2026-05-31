# Auth and Favorites

## MVP Status

Authentication and favorites are placeholders in Phase 1. The source tree already reserves boundaries under:

- `src/lib/auth/`
- `src/lib/db/`
- `src/lib/favorites/`
- `src/components/favorites/`
- `src/pages/[locale]/account/`

## Future Auth Stack

Recommended stack:

- Supabase Auth
- Supabase Postgres
- Row Level Security
- Astro SSR or hybrid rendering for protected account pages

## User Features

Phase 2 should support:

- Sign up and login
- User profile
- Save favorite articles
- Save favorite places
- Save favorite mobile plans
- Save favorite areas
- Save favorite tools
- View saved items

Phase 3 should support:

- Submit recommended places
- View own submission history
- Track moderation status

## Favorite Model

Use a generic favorite model:

```ts
type FavoriteTargetType = "article" | "place" | "mobile_plan" | "area" | "tool";

interface Favorite {
  id: string;
  userId: string;
  targetType: FavoriteTargetType;
  targetId: string;
  createdAt: string;
}
```

Supported target types:

- `article`
- `place`
- `mobile_plan`
- `area`
- `tool`

## Row Level Security 原則

- Public content can be read without login.
- Favorites require an authenticated user.
- Users can only read, create, and delete their own favorites.
- A unique constraint should prevent duplicate favorites for the same user and target.
- Admin-only moderation tools must be separated from public user pages.

## UI Behavior

Phase 1:

- Show `FavoriteButtonPlaceholder`.
- The button text includes `收藏功能準備中`.
- Account pages explain future login and saved-items behavior.

Phase 2:

- Replace placeholders with real favorite buttons.
- Prompt anonymous users to log in before saving.
- Keep favorite state scoped to the authenticated user.
