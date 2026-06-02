# Phase 1CV Article Translation Health Design

## Goal

Prevent public article translation regressions by making `translationKey` locale coverage explicit in source-level content health checks.

## Scope

- Replace scattered hard-coded translation completeness checks with one policy-driven content-health check.
- Require current fully localized public article groups to contain exactly `zh-tw`, `en`, `ja`, and `ko`.
- Keep a documented partial-locale allowlist available for future intentionally partial public article groups.
- Record the Phase 1CV rule in project documentation.

## Non-Goals

- Do not add or rewrite article content.
- Do not auto-generate translations or introduce machine translation.
- Do not change article routes, sitemap generation, `hreflang`, search indexes, RSS feeds, auth, database, or backend behavior.
- Do not require runtime locale fallback changes in this phase.

## Acceptance Criteria

- `pnpm check:content` fails if a public article `translationKey` is not covered by the full or partial locale policy.
- Fully localized public article groups fail content health if any supported locale is missing, duplicated, or unsupported.
- Future partial translation groups must be explicitly documented in the partial-locale allowlist before passing content health.
