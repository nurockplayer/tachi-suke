# Phase 1AC Cloudflare Redirects Design

## Objective

Reduce avoidable 404s on Cloudflare Pages when users manually type or share common section URLs without a locale prefix.

## Scope

- Add a static `public/_redirects` file for Cloudflare Pages.
- Redirect common locale-less section paths to English equivalents with temporary redirects.
- Preserve the official locale-prefixed route structure.
- Cover section roots and simple nested public content paths for articles, article categories, areas, places, mobile plans, tools, search, submit-place, contact, about, privacy, and editorial policy.

## Non-goals

- No language detection.
- No Cloudflare Workers or Functions.
- No auth-aware routing.
- No redirects for account placeholder routes.
- No migration away from locale-prefixed canonical URLs.

## Acceptance

- Source tests verify `public/_redirects` exists.
- Source and build-output tests verify common redirects point to `/en/...` with `302`.
- Existing static routes, sitemap, robots, link checks, and SEO checks pass.
