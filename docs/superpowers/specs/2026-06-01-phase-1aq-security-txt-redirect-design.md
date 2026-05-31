# Phase 1AQ Security.txt Legacy Redirect Design

## Goal

Expose a legacy `/security.txt` fallback that redirects to the canonical `/.well-known/security.txt` file for scanners and tools that still probe the root path.

## Scope

- Add a Cloudflare Pages `_redirects` rule from `/security.txt` to `/.well-known/security.txt`.
- Keep `/.well-known/security.txt` as the canonical URL.
- Add source-level and build-output redirect tests.

## Non-Goals

- No duplicate root security endpoint.
- No new support backend or security SLA.
- No account, auth, or private issue tracker.

## Acceptance

- `pnpm test` verifies the redirect rule exists in source.
- `pnpm check:seo` verifies the built `_redirects` file includes the rule.
