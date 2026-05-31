# Roadmap

## Phase 1: Content-First MVP

Goals:

- Astro static site
- Locale-prefixed routing
- SEO metadata
- Content collections for articles and data
- Place and mobile plan UI foundations
- Submit-place form UI
- Placeholder account pages
- Placeholder favorites UI
- Docs for future auth, database, favorites, and moderation

Success criteria:

- `pnpm install`, `pnpm dev`, `pnpm build`, and `pnpm preview` are supported.
- Public pages are readable without login.
- The structure is ready for Supabase without implementing it prematurely.

## Phase 2: 登入與收藏功能

Goals:

- Add Supabase Auth.
- Add user profile pages.
- Add generic favorites with `targetType` and `targetId`.
- Let logged-in users save articles, places, mobile plans, areas, and tools.
- Move account pages from placeholders to protected routes.

Rules:

- Public content remains readable without login.
- Saving favorites requires login.
- Users can only read and modify their own favorites.
- Row Level Security must be enabled before dynamic user data ships.

## Phase 3: 投稿審核與社群功能

Goals:

- Store place submissions.
- Let users view their own submission status.
- Add moderation states: `pending_review`, `approved`, `rejected`, `needs_more_info`.
- Create an admin-only moderation surface.
- Publish only approved, normalized place entries.

Rules:

- User submissions must never publish directly.
- Submitter emails must never appear on public pages.
- Avoid collecting unnecessary personal information.
- Public community features should stay moderated and practical.

## Later Ideas

- Rich comparison tools for mobile plans
- City cost calculators
- Saved checklists
- Personalized onboarding by visa/status/language
- Editorial workflow for translations
- Search across articles, places, and tools
