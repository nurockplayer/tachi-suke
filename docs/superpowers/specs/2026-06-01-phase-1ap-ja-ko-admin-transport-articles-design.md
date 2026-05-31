# Phase 1AP Japanese/Korean Admin and Transport Articles Design

## Goal

Improve multilingual content coverage by adding Japanese and Korean versions of the commuter pass / IC card and residence administration decision articles.

## Scope

- Add Japanese article for `commuter-pass-ic-card-guide`.
- Add Korean article for `commuter-pass-ic-card-guide`.
- Add Japanese article for `residence-card-resident-record-my-number`.
- Add Korean article for `residence-card-resident-record-my-number`.
- Keep all articles decision-oriented, static, and internally linked.

## Non-Goals

- No legal, fare-calculation, or immigration advice.
- No database, auth, comments, or personalization.
- No claim that municipality, operator, employer, or school rules are universal.

## Acceptance

- `pnpm test` verifies article count, locale coverage, and slugs.
- `pnpm check:seo` verifies sitemap and RSS output includes the new public articles.
