# Phase 1CD CI Production SEO Gate Design

## Goal

Make production `SITE_URL` SEO/deploy output validation automatic on pull requests and `main`.

## Problem

After Phase 1CC, `pnpm check:seo` can validate production URL builds, but CI still only exercised the default example-domain build. Manual Cloudflare deploys could catch production URL issues, but PRs would not fail early if production canonical, feed, sitemap, structured data, or deployment fallback checks regressed.

## Decision

- Keep the existing default `pnpm build`, `pnpm check:links`, and `pnpm check:seo` CI path.
- Add a second CI build with `SITE_URL=https://tachi-suke.pages.dev`.
- Run `SITE_URL=https://tachi-suke.pages.dev pnpm check:seo`.
- Run `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`.

## Acceptance

- `pnpm test` verifies the CI workflow includes `pnpm check:deploy` and the production Pages URL.
- CI validates both fallback-domain and production-domain output.
- Deployment docs mention production `SITE_URL` SEO checks before deploy.
