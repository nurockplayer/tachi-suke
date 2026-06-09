# Phase 1DM Robots Directive Guard Plan

## Goal

Add a narrow build-output guard for `robots.txt` directives.

## Success Criteria

- Built `robots.txt` is checked line-by-line.
- Public crawling stays allowed.
- Every supported locale account placeholder path is disallowed.
- The sitemap directive uses the configured site URL.
- Public locale sections, feeds, search pages, and search indexes are not disallowed.
- No runtime feature, route, UI, auth, database, form, Cloudflare runtime, or deployment behavior changes are introduced.

## Current Context

- `src/pages/robots.txt.ts` already generates `Allow: /`, locale account disallows, and a sitemap directive.
- Existing `pnpm check:seo` verified the sitemap URL and representative account behavior.
- Account placeholder pages also carry page-level `noindex, nofollow` metadata.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Worker Routing

- `controller_fallback_reason=trivial_self_only`
- This is a small single-output test extension in an already inspected generated artifact.
- Worker delegation would add overhead without reducing risk for this line-by-line contract check.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Inspect existing robots endpoint and output tests.
- [x] Add exact robots directive checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
