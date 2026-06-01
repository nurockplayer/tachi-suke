# Phase 1BM Deploy URL Guard Design

## Goal

Prevent Cloudflare Pages deployments from accidentally shipping the fallback `https://tachi-suke.example.com` URL in canonical, Open Graph, sitemap, RSS, OpenSearch, or JSON-LD output.

## Scope

- Add a deployment-only output check script.
- Require `SITE_URL` to be set to an HTTPS URL when running the deployment check.
- Fail if generated `dist` files still reference `https://tachi-suke.example.com`.
- Verify representative generated files reference the configured `SITE_URL`.
- Document the deploy verification order.

## Non-Goals

- No runtime feature changes.
- No Cloudflare API or account credentials in the repo.
- No CI requirement for production `SITE_URL`, because pull request checks intentionally use the example fallback.
- No change to the local `SITE_URL` fallback strategy.

## Validation

- `pnpm test` verifies the script is wired.
- `SITE_URL=https://tachi-suke.pages.dev pnpm build` generates deploy-ready static output.
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy` verifies generated deployment URLs.
