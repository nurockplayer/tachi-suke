# Phase 1CL Correction Related URL Coverage Design

## Goal

Strengthen build-output coverage for the static correction workflow so public detail pages continue to pass their own URL into `/[locale]/contact`.

## Scope

- Verify representative article, place, mobile plan, area, and tool detail pages include a correction prompt link with encoded `relatedUrl`.
- Verify at least one non-English detail page uses the locale-specific contact route.
- Keep relying on the existing contact page progressive enhancement that reads `relatedUrl`.

## Non-Goals

- No runtime behavior changes.
- No backend, auth, database, analytics, or tracking.
- No provider-specific form handling.
- No support queue or guaranteed response behavior.
- No UI redesign or route changes.

## Acceptance

- `pnpm check:seo` covers representative public detail correction prompt links.
- Full local validation passes before PR merge.
