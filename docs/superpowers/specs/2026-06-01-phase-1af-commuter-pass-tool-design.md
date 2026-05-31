# Phase 1AF Commuter Pass and IC Card Tool Design

## Goal

Add a static checklist that helps foreign residents decide whether to buy a commuter pass and how to prepare IC card details after choosing a commute route.

## Scope

- Add one published `tools` collection entry.
- Slug: `commuter-pass-ic-card-checklist`.
- Reuse existing `sourceLinks` support.
- Localize content for `zh-tw`, `en`, `ja`, and `ko`.
- Keep advice conservative because operator rules, commuter pass products, student eligibility, refunds, and mobile IC support vary.

## Official Source Strategy

Use operator and IC-card sources as confirmation entry points:

- Tokyo Metro commuter pass information.
- PASMO visitor information.

The tool should tell readers to confirm exact route, fare, purchase method, refund/change rules, proof requirements, and mobile IC support with the operator that sells their pass.

## Non-Goals

- No fare calculator.
- No route search integration.
- No saved commute profile.
- No backend or database.
- No new dependencies.

## Acceptance

- `pnpm test` verifies at least four published tools and the commuter checklist source links.
- `pnpm build` generates `/[locale]/tools/commuter-pass-ic-card-checklist/`.
- `pnpm check:links` validates built internal links.
- `pnpm check:seo` verifies sitemap output and built official source links.
