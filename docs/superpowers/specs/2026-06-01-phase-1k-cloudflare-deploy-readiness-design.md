# Phase 1K Cloudflare Deploy Readiness Design

## Objective

Make the static Astro site easier to deploy on Cloudflare Pages without adding secrets, backend code, or new runtime dependencies.

## Decision

Add a minimal Cloudflare Pages Wrangler configuration and a deployment guide. The repo should document both dashboard-based deployment and optional Wrangler CLI deployment while keeping credentials outside the repository.

Cloudflare Pages configuration supports `wrangler.toml`/JSON configuration with `name`, `pages_build_output_dir`, and `compatibility_date` keys. Source: <https://developers.cloudflare.com/pages/functions/wrangler-configuration/>

## Scope

This phase adds:

- `wrangler.toml` for Pages project name, compatibility date, and `dist` output directory.
- `docs/DEPLOYMENT.md` with Cloudflare Pages setup, environment variables, verification, and rollback notes.
- Source-level tests that reject committed Cloudflare secrets and verify Pages settings.
- README/AGENTS/docs updates that point developers to the deployment guide.

## Non-Goals

This phase does not deploy the site, add Cloudflare credentials, configure a custom domain, add Workers/Functions code, add Wrangler as a dependency, or switch from Astro static output.

## Acceptance Criteria

- `pnpm test` fails before implementation when deployment files are absent.
- `wrangler.toml` points Pages at `./dist`.
- `docs/DEPLOYMENT.md` documents `SITE_URL` and `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
- No Cloudflare account ID, API token, or project secret is committed.
- Existing build, link, and SEO checks remain green.
