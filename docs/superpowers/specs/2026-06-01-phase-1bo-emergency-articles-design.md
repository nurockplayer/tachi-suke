# Phase 1BO Emergency and Disaster Articles Design

## Goal

Turn the emergency/disaster checklist into an indexable four-locale article cluster that helps foreign residents in Japan understand basic preparation before stressful events.

## Scope

- Add one public article per supported locale for emergency/disaster basics.
- Use `translationKey = japan-emergency-disaster-basics` so sitemap hreflang, RSS, static search, and related content can connect the translations.
- Categorize the articles as `daily-life`.
- Link each article to the emergency/disaster checklist, first-week setup, ward-office moving-in content, area guides, and official JMA/FDMA confirmation pages.
- Extend source-level tests for the new article count, locale thresholds, slug coverage, and translation-key coverage.
- Update public docs and roadmap.

## Non-Goals

- No emergency dispatch behavior.
- No medical advice, official disaster instructions, alert subscriptions, saved state, location tracking, or backend storage.
- No new content model fields.
- No UI redesign or route structure changes.

## Validation

- `pnpm test` verifies article count, per-locale coverage, expected slugs, and internal links.
- `pnpm check:content` verifies article IDs, slugs, dates, and external HTTPS links.
- `pnpm build` generates article detail/category/RSS/sitemap output.
- `pnpm check:links` verifies built internal links.
- `pnpm check:seo` verifies generated SEO and discovery outputs.
