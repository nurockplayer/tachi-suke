# Phase 1CA Content Internal Link Health Plan

## Scope

Move Markdown/MDX internal-link health into `pnpm check:content` so source content catches obvious broken root-relative links before deployment.

## Tasks

1. Build a conservative public route set from static locale pages and public content collections.
2. Scan article Markdown/MDX body content for root-relative Markdown links and MDX `href` values.
3. Fail with the source article path and missing route when a link is not known to exist.
4. Update implementation and acceptance docs.
5. Validate with content health, project structure, build, static link, and SEO checks.

## Non-goals

- No network crawling.
- No validation of external URLs beyond existing HTTPS syntax checks.
- No anchor validation.
- No route generation or content model changes.
