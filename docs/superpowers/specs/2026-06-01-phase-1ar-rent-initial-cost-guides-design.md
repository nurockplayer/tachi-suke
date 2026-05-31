# Phase 1AR Rent Initial Cost Guides Design

## Problem

Housing is one of the highest-intent life decisions for foreign residents in Japan. The site already has a Traditional Chinese guide for Japanese rental initial costs, but English, Japanese, and Korean users do not have the same decision-oriented article coverage.

## Scope

Add same-topic English, Japanese, and Korean articles for the existing `renting-initial-costs-japan` translation group. Keep the work content-first and static-first.

## Non-Goals

- Do not add a rent quote calculator.
- Do not add a database, backend, or submission workflow.
- Do not make time-sensitive claims about exact fees or legal limits.
- Do not position the content as Taiwan-only.

## Acceptance

- `en`, `ja`, and `ko` public articles exist for `renting-initial-costs-japan`.
- Article slugs are unique and locale-appropriate.
- Articles include internal links to existing housing-adjacent routes such as areas, tools, contact, or related articles.
- `pnpm check:content` validates the new multilingual coverage.
- `pnpm check:seo` validates built sitemap entries for representative new articles.
