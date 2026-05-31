# Phase 1Q Custom 404 Page Design

## Goal

Add a branded static `404.html` page for Cloudflare Pages and other static hosts. Missing routes should give users clear recovery links instead of a generic platform error page.

## Scope

- Add `src/pages/404.astro`.
- Render a noindex page with TachiSuke branding.
- Include concise multilingual copy for `zh-tw`, `en`, `ja`, and `ko`.
- Link users back to locale homepages and main English sections.
- Keep the page static and dependency-free.
- Update tests and docs.

## SEO Requirements

- The 404 page must use `robots="noindex, nofollow"`.
- The page should not be included in `sitemap.xml`.
- It should still include normal layout metadata and internal recovery links.

## Non-Goals

- Do not add server-side redirects.
- Do not add client-side language detection.
- Do not add analytics or error tracking.
- Do not add Cloudflare Functions/Workers code.
