# Phase 1CT SEO Check URL Inference Design

## Goal

Make `pnpm check:seo` validate the current built `dist/` output even when the shell does not have `SITE_URL` set and the previous build used a production URL.

## Scope

- Keep `SITE_URL` as the source of truth when it is explicitly provided.
- If `SITE_URL` is unset, infer the expected origin from generated `dist/sitemap.xml`.
- Fall back to `dist/robots.txt` if sitemap output is unavailable.
- Keep the existing example-domain fallback only as a final fallback.
- Document that deploy verification should still use explicit `SITE_URL=<production-url>`.

## Non-Goals

- Do not change Astro `site` configuration.
- Do not change canonical, Open Graph, feed, sitemap, or JSON-LD generation.
- Do not change routes, content models, account placeholders, auth, database, or Cloudflare deployment behavior.
- Do not weaken `pnpm check:deploy`.

## Acceptance Criteria

- A production-URL `dist/` can pass `pnpm check:seo` even when `SITE_URL` is unset.
- `SITE_URL=<production-url> pnpm check:seo` remains strict against the explicit URL.
- `pnpm check:deploy` still requires an HTTPS non-example `SITE_URL`.
- Documentation clearly separates local build-output checks from deploy checks.
