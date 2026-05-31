# Phase 1J RSS Feed Design

## Objective

Add a static RSS feed so readers, crawlers, and external tools can discover newly published TachiSuke articles without requiring an account, API, database, or CMS.

## Decision

Generate one global `/feed.xml` from non-draft articles across all supported locales. A global feed is simpler for Phase 1 and avoids multiplying routes before locale-specific subscriber demand is proven.

## Scope

This phase adds:

- Static `/feed.xml` endpoint.
- RSS channel metadata for TachiSuke.
- RSS items for non-draft article detail pages.
- `<link rel="alternate" type="application/rss+xml">` in `BaseLayout`.
- Feed verification in build-output SEO tests.

## Non-Goals

This phase does not add per-locale feeds, email subscriptions, push notifications, a newsletter backend, analytics tracking, or CMS-driven feed publishing.

## Acceptance Criteria

- `pnpm check:seo` fails before implementation when `dist/feed.xml` and feed alternate links are absent.
- `pnpm build` generates `dist/feed.xml`.
- The feed excludes draft articles and includes canonical links to public article detail pages.
- Root and representative public pages expose the RSS alternate link.
