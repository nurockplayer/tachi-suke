# Phase 1BN Emergency and Disaster Checklist Design

## Goal

Add a static, multilingual emergency/disaster preparation checklist for foreign residents in Japan. The tool should help readers prepare before an earthquake, typhoon, heavy rain, fire, accident, serious illness, or evacuation situation without claiming to replace official instructions.

## Scope

- Add one published `tools` collection entry: `japan-emergency-disaster-checklist`.
- Include localized title, description, source note, notes, and checklist sections for `zh-tw`, `en`, `ja`, and `ko`.
- Cover emergency numbers, basic Japanese communication, alert sources, local municipality information, home/go-bag supplies, evacuation routes, and contact plans.
- Include official source links for the Japan Meteorological Agency and the Fire and Disaster Management Agency.
- Extend source-level tests so the tool count and required source links do not regress.
- Update public project docs to record the seventh published tool.

## Non-Goals

- No emergency dispatch behavior.
- No medical, legal, immigration, or disaster-response advice beyond practical preparation.
- No saved checklist state, push alerts, location tracking, backend storage, auth, database, or Supabase integration.
- No external-link network checks in CI.
- No UI redesign or route structure changes.

## Validation

- `pnpm test` verifies the source-level tool requirements.
- `pnpm check:content` verifies JSON collection metadata and stored URLs.
- `pnpm build` generates all four locale tool detail pages.
- `pnpm check:links` verifies built internal links.
- `pnpm check:seo` verifies search/sitemap/structured-data outputs still work with the added tool.
