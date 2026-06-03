# Phase 1DL Security.txt Freshness Guard Plan

## Goal

Add a narrow build-output guard for `/.well-known/security.txt` freshness.

## Success Criteria

- Built `security.txt` `Expires` is parsed from the generated output.
- `Expires` is a canonical UTC ISO timestamp.
- `Expires` remains at least 30 days in the future.
- `Expires` does not drift beyond the one-year editorial policy.
- No runtime feature, route, UI, auth, database, form, Cloudflare runtime, or deployment behavior changes are introduced.

## Current Context

- `src/pages/.well-known/security.txt.ts` generates `Expires` from build time.
- Existing `pnpm check:seo` verified `Expires` string shape only.
- Deployment docs already include `/.well-known/security.txt` and `/security.txt` smoke checks.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Worker Routing

- `controller_fallback_reason=trivial_self_only`
- This is a small single-output test extension in an already inspected file.
- The previous low-cost worker attempt in the immediately prior cycle repeatedly hit capacity limits, so re-delegating this tiny scope would add overhead without reducing risk.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Inspect existing security.txt endpoint and output tests.
- [x] Add security.txt freshness checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
