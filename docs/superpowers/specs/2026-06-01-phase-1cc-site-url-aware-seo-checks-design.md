# Phase 1CC Site URL Aware SEO Checks Design

## Goal

Allow the same build-output SEO test suite to validate both local fallback builds and production `SITE_URL` builds.

## Problem

`pnpm check:seo` validates canonical URLs, RSS links, sitemap entries, structured data, OpenSearch discovery, and related URL prefill behavior. Before this phase, those assertions expected `https://tachi-suke.example.com` even when the site was built with a production `SITE_URL`, so deployable output needed a separate narrower deploy guard.

## Decision

- Read `SITE_URL` inside `tests/seo-output.test.mjs`.
- Fall back to `https://tachi-suke.example.com` when `SITE_URL` is not set.
- Keep `pnpm check:deploy` as a production guard that rejects the example fallback in deployable output.
- Update documentation so production verification can run `SITE_URL=<production-url> pnpm check:seo` after `SITE_URL=<production-url> pnpm build`.

## Acceptance

- `pnpm check:seo` passes after the default fallback build.
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:seo` passes after a production URL build.
- The deploy guard still fails if production output contains the example fallback domain.
