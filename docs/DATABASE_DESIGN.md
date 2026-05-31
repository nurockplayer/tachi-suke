# Database Design

## MVP Status

Phase 1 does not connect to a database. This document defines the future Supabase Postgres direction so the static site stays database-ready without over-engineering the MVP.

## Data Models

### Article

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

### Place

- `id`
- `slug`
- `name`
- `category`
- `prefecture`
- `city`
- `area`
- `station`
- `googleMapUrl`
- `officialUrl`
- `tabelogUrl`
- `instagramUrl`
- `priceRange`
- `soloFriendly`
- `nonSmokingStatus`
- `japaneseDifficulty`
- `paymentMethods`
- `source`
- `status`
- `createdAt`
- `updatedAt`

Final enum values:

- `soloFriendly`: `yes`, `maybe`, `no`, `unknown`
- `nonSmokingStatus`: `confirmed_non_smoking`, `separated_smoking_area`, `smoking_allowed`, `unknown`
- `japaneseDifficulty`: `easy`, `normal`, `hard`, `unknown`
- `source`: `editor`, `user_submission`, `official`
- `status`: `draft`, `pending_review`, `published`, `rejected`, `archived`

Phase 1 stores Place records as static content. Only `published` entries should generate public list/detail pages.

### MobilePlan

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

Phase 1B keeps mobile plan data in static JSON and treats it as editorial guidance. Prices, campaigns, data allowances, and eligibility can change, so future database-backed plans should add source and review metadata before being treated as a serious comparison product.

Future candidate fields:

- `officialUrl`
- `lastCheckedAt`
- `notes`
- `locale`
- `translationKey`

### Favorite

- `id`
- `userId`
- `targetType`
- `targetId`
- `createdAt`

### PlaceSubmission

- `id`
- `userId`
- `submissionLocale`
- `placeName`
- `category`
- `prefecture`
- `city`
- `area`
- `station`
- `googleMapUrl`
- `officialUrl`
- `recommendationReason`
- `priceRange`
- `soloFriendly`
- `nonSmokingStatus`
- `japaneseDifficulty`
- `paymentMethods`
- `submitterNickname`
- `submitterEmail`
- `status`
- `moderatorNote`
- `createdAt`
- `updatedAt`

## Future Supabase Schema Draft

```sql
create type favorite_target_type as enum (
  'article',
  'place',
  'mobile_plan',
  'area',
  'tool'
);

create type moderation_status as enum (
  'pending_review',
  'approved',
  'rejected',
  'needs_more_info'
);

create type place_status as enum (
  'draft',
  'pending_review',
  'published',
  'rejected',
  'archived'
);

create type place_source as enum (
  'editor',
  'user_submission',
  'official'
);

create type solo_friendly_status as enum (
  'yes',
  'maybe',
  'no',
  'unknown'
);

create type non_smoking_status as enum (
  'confirmed_non_smoking',
  'separated_smoking_area',
  'smoking_allowed',
  'unknown'
);

create type japanese_difficulty as enum (
  'easy',
  'normal',
  'hard',
  'unknown'
);

create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_locale text check (preferred_locale in ('zh-tw', 'en', 'ja', 'ko')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type favorite_target_type not null,
  target_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

create table public.place_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  submission_locale text not null check (submission_locale in ('zh-tw', 'en', 'ja', 'ko')),
  place_name text not null,
  category text not null,
  prefecture text not null,
  city text not null,
  area text,
  station text,
  google_map_url text,
  official_url text,
  recommendation_reason text not null,
  price_range text,
  solo_friendly text,
  non_smoking_status text,
  japanese_difficulty text,
  payment_methods text[] default '{}',
  submitter_nickname text,
  submitter_email text,
  status moderation_status not null default 'pending_review',
  moderator_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Row Level Security Draft

```sql
alter table public.user_profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.place_submissions enable row level security;

create policy "Users can read own profile"
on public.user_profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.user_profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can read own favorites"
on public.favorites for select
using (auth.uid() = user_id);

create policy "Users can create own favorites"
on public.favorites for insert
with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
on public.favorites for delete
using (auth.uid() = user_id);

create policy "Users can read own submissions"
on public.place_submissions for select
using (auth.uid() = user_id);

create policy "Users can create submissions"
on public.place_submissions for insert
with check (auth.uid() = user_id or user_id is null);
```

Admin moderation policies should be added only after an admin role model is chosen.

Supabase Auth and Postgres are Phase 2 or later. Do not wire these schema drafts into the Phase 1 static site.
