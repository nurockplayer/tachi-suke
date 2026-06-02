# Phase 1DA Deploy Discovery URL Guard Design

## Goal

Make the deployment-only output guard catch missing production `SITE_URL` usage across public discovery and representative HTML files before Cloudflare Pages deployment.

## Context

`pnpm check:seo` validates generated metadata and can infer the expected origin from the current build output for local development. `pnpm check:deploy` is stricter: it must be run after a production-URL build with the same `SITE_URL` that will be deployed.

The existing deploy guard rejected the example fallback domain and sampled a small set of files. This phase expands the explicit production URL contract without changing runtime generation.

## Scope

- Expand `tests/deploy-output.test.mjs` so `pnpm check:deploy` requires the configured HTTPS `SITE_URL` in public files that should contain absolute URLs.
- Cover sitemap, robots, OpenSearch, `llms.txt`, `security.txt`, global and locale RSS feeds, the root homepage, locale homepages, and one representative public HTML page.
- Keep relative-only artifacts such as `site.webmanifest` and search indexes out of the absolute URL requirement.
- Update project documentation for the stricter deploy guard.

## Non-Goals

- Do not change routes, generated content, SEO helpers, Cloudflare configuration, UI, auth, database, forms, Workers, Functions, or backend behavior.
- Do not require every deployable file to contain `SITE_URL`; many static assets and JSON indexes intentionally do not.
- Do not validate live production headers or fetch external URLs.

## Acceptance Criteria

- `SITE_URL=<production-url> pnpm check:deploy` fails if any required discovery or representative HTML file is missing.
- `SITE_URL=<production-url> pnpm check:deploy` fails if any required file does not reference the configured production URL.
- `pnpm check:deploy` continues to reject missing `SITE_URL`, non-HTTPS `SITE_URL`, the example fallback domain, and any fallback-domain references in deployable text assets.
