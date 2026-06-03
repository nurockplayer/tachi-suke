# Phase 1DK Cloudflare Redirect Guard Design

## Context

TachiSuke uses a static `public/_redirects` file for Cloudflare Pages convenience fallbacks. Canonical public URLs stay locale-prefixed, while common locale-less public paths temporarily redirect to English equivalents. `/security.txt` redirects to the canonical `/.well-known/security.txt` discovery file.

Existing checks verified representative redirect rules, but they did not treat the full built `_redirects` file as an exact deployment contract.

## Decision

Add a dependency-free `pnpm check:seo` guard that parses `dist/_redirects` and verifies the full reviewed Phase 1 redirect contract:

- Every rule is a temporary `302`.
- Locale-less public section fallbacks point to English public routes.
- Detail-like wildcard fallbacks preserve `:splat`.
- `/security.txt` points to `/.well-known/security.txt`.
- Canonical locale-prefixed routes are not redirected.
- Account placeholder routes are not redirected or targeted.
- The built `_redirects` file matches the reviewed ordered rule list exactly.

## Non-Goals

- No route changes.
- No language-detection redirects.
- No account placeholder redirects.
- No UI changes.
- No auth, database, forms, Workers, Functions, or backend behavior.

## Acceptance

- `pnpm check:seo` fails if `_redirects` loses a reviewed public fallback.
- `pnpm check:seo` fails if `_redirects` adds an account placeholder fallback.
- `pnpm check:seo` fails if a redirect becomes permanent or targets a non-English public fallback, except `/security.txt`.
- Existing sitemap, head metadata, hreflang, noindex, discovery, cache, and JSON-LD guards continue to pass.
