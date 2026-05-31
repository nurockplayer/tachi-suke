# Phase 1AD Discovery Cache Headers Design

## Objective

Make Cloudflare Pages cache behavior explicit for static discovery files that are read by crawlers, feed readers, and search tooling.

## Scope

- Add conservative cache headers for `/feed.xml`.
- Add conservative cache headers for all locale RSS feeds.
- Add conservative cache headers for `/llms.txt`.
- Add conservative cache headers for locale static search indexes.
- Preserve existing no-cache HTML behavior and immutable asset caching.

## Non-goals

- No CDN purge automation.
- No Cloudflare Workers.
- No runtime cache logic.
- No long-lived caching for changing discovery files.

## Acceptance

- Build-output SEO tests verify `_headers` includes explicit cache rules for global RSS, locale RSS, `llms.txt`, and locale search index JSON.
- Existing source, content, build, link, and SEO checks pass.
