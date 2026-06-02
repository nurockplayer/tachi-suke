# Phase 1DB Content-Driven RSS Check Design

## Goal

Make RSS build-output checks follow the current public article content collection instead of a hand-maintained sample URL list.

## Context

RSS generation is already static and content-driven:

- `/feed.xml` includes all non-draft public articles.
- `/[locale]/feed.xml` includes same-locale non-draft public articles.

The existing SEO output tests verified representative RSS URLs and a few locale exclusions, but they did not prove that every current public article appears in the correct feed or that locale feeds exclude all other locales.

## Scope

- Update `tests/seo-output.test.mjs` so RSS expected URLs are derived from `src/content/articles` frontmatter.
- Check that the global feed item links exactly match every non-draft public article path.
- Check that each locale feed item link set exactly matches that locale's non-draft public article paths.
- Keep basic RSS 2.0, localized title, language, and draft-exclusion checks.
- Update documentation to describe content-driven RSS validation.

## Non-Goals

- Do not change RSS runtime generation, routes, content, frontmatter schemas, UI, auth, database, forms, Cloudflare configuration, Workers, Functions, or backend behavior.
- Do not add category feeds, pagination, feed analytics, external URL fetching, or new dependencies.
- Do not make feed order assertions while many articles share the same `updatedAt` date.

## Acceptance Criteria

- `pnpm check:seo` fails if `/feed.xml` omits any non-draft public article or includes an unexpected article URL.
- `pnpm check:seo` fails if any locale feed omits a same-locale non-draft article or includes an article from another locale.
- Existing sitemap, RSS alternate link, and feed `lastmod` checks remain green.
