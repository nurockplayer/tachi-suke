# Phase 1DM Robots Directive Guard Design

## Context

TachiSuke generates `robots.txt` as a static Astro endpoint. The file should allow public content crawling, disallow account placeholder routes for every supported locale, and point crawlers at the production sitemap URL.

Existing SEO checks verified representative robots output, but not the full directive contract line-by-line.

## Decision

Add a dependency-free `pnpm check:seo` guard that reads built `dist/robots.txt` and verifies the exact Phase 1 directive contract:

- `User-agent: *`
- `Allow: /`
- `Disallow: /[locale]/account/` for every supported locale
- a configured-site absolute `Sitemap` URL

Also verify public locale sections, feeds, search pages, and search indexes are not accidentally disallowed.

## Non-Goals

- No robots endpoint behavior changes unless the guard exposes a real defect.
- No sitemap generation changes.
- No route changes.
- No UI changes.
- No auth, database, forms, Workers, Functions, or backend behavior.

## Acceptance

- `pnpm check:seo` fails if account placeholder disallow rules are missing for any supported locale.
- `pnpm check:seo` fails if public locale sections are disallowed.
- `pnpm check:seo` fails if the sitemap directive uses the wrong origin.
- Existing sitemap, security.txt, redirect, metadata, noindex, and JSON-LD guards continue to pass.
