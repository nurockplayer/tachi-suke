# Phase 1AB Feed Sitemap Lastmod Design

## Objective

Improve RSS feed discovery in `sitemap.xml` by including the global feed and adding content-aware `lastmod` values to global and locale feed entries.

## Scope

- Add `/feed.xml` to `sitemap.xml`.
- Keep `/[locale]/feed.xml` entries in `sitemap.xml`.
- Set the global feed `lastmod` to the newest public article `updatedAt`.
- Set each locale feed `lastmod` to the newest public same-locale article `updatedAt`.
- Preserve existing `lastmod` behavior for article, article category, area, mobile plan, place, and tool detail pages.

## Non-goals

- No runtime feed generation.
- No per-category feeds.
- No pagination.
- No database.
- No external URL checks.

## Acceptance

- Source tests verify the sitemap generator explicitly includes `/feed.xml` and computes feed `lastmod` from public article dates.
- Build-output SEO tests verify `/feed.xml` and locale feeds appear in `sitemap.xml` with `lastmod`.
- Build-output SEO tests continue verifying account placeholders, search pages, and search indexes are excluded.
- Existing source, content, build, link, and SEO checks pass.
