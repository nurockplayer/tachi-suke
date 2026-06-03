# Phase 1DK Cloudflare Redirect Guard Plan

## Goal

Add a narrow build-output guard for Cloudflare Pages `_redirects`.

## Success Criteria

- The built `_redirects` file is parsed as structured rules.
- Rules match the reviewed Phase 1 redirect contract exactly.
- Every redirect stays `302`.
- Locale-less public fallbacks target English public routes.
- Wildcard fallbacks preserve detail path splats.
- `/security.txt` redirects to `/.well-known/security.txt`.
- Account placeholders and canonical locale-prefixed routes are not redirected.
- No runtime feature, route, UI, auth, database, form, Cloudflare runtime, or deployment behavior changes are introduced.

## Current Context

- `public/_redirects` already contains locale-less fallback rules for common public routes.
- Source-level and build-output tests checked representative rules.
- Deployment docs already instruct post-deploy checks for `/security.txt` and locale-less fallbacks.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Work Packets

- Packet 1: Worker read-only scan of existing SEO/deploy guard opportunities.
- Packet 2: Controller implementation of exact built `_redirects` guard.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: recommend one narrow Phase 1-safe launch-readiness improvement from existing SEO/deploy checks.
- `worker_output_summary`: worker did not produce usable output because the configured low-cost worker repeatedly hit model capacity limits.
- `controller_review_summary`: controller selected a narrow build-output `_redirects` contract guard based on existing deployment docs and representative redirect tests.
- `controller_followup_decisions`: keep runtime redirects unchanged because the guard did not expose a redirect defect.
- `controller_fallback_reason=worker_result_insufficient`

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Attempt low-cost worker scan.
- [x] Add exact built `_redirects` checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
