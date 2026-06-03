# Phase 1DL Security.txt Freshness Guard Design

## Context

TachiSuke generates `/.well-known/security.txt` as a static Astro endpoint. The file includes public contact and policy URLs, preferred languages, a canonical URL, and a generated `Expires` timestamp.

Existing SEO output checks verified the `Expires` field shape, but did not verify that the timestamp was parseable, still future-dated, or aligned with the one-year freshness policy.

## Decision

Add a dependency-free `pnpm check:seo` guard that reads the built `dist/.well-known/security.txt` and verifies:

- `Expires` exists.
- `Expires` is a canonical UTC ISO timestamp.
- `Expires` parses to the emitted timestamp.
- `Expires` remains at least 30 days in the future.
- `Expires` does not drift beyond the one-year editorial policy.

## Non-Goals

- No endpoint behavior changes unless the guard exposes a real defect.
- No security contact workflow changes.
- No private ticket storage.
- No guaranteed support response semantics.
- No route changes, UI changes, auth, database, forms, Workers, Functions, or backend behavior.

## Acceptance

- `pnpm check:seo` fails if `Expires` is missing or malformed.
- `pnpm check:seo` fails if `Expires` is stale or too close to expiry.
- `pnpm check:seo` fails if `Expires` drifts beyond the expected one-year window.
- Existing discovery, deploy, redirect, metadata, noindex, and JSON-LD guards continue to pass.
