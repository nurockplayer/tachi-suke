# Phase 1CH Everyday Shopping Checklist Tool Design

## Goal

Add a static multilingual checklist that helps foreign residents in Japan build a practical daily shopping routine across supermarkets, drugstores, convenience stores, 100-yen shops, and daily-goods stores.

## Problem

TachiSuke already has everyday shopping articles, but the tools section does not yet turn that advice into an actionable checklist. New residents often overspend by relying only on convenience stores, miss cheaper store categories, misunderstand payment or point-card expectations, or overlook labels, food dates, allergies, and waste rules.

## Scope

- Add one published `tools` collection entry for an everyday shopping checklist.
- Provide complete `zh-tw`, `en`, `ja`, and `ko` title, description, source note, notes, and checklist sections.
- Keep the content static, editorial, and decision-oriented.
- Add source-level and build-output expectations so the tool appears in generated public routes, sitemap, and search output.
- Update documentation where published static tool lists or counts are enumerated.

## Non-Goals

- No saved checklist progress, account login, personalization, shopping cart, price tracking, coupons, affiliate links, or store database.
- No medicine, allergy, nutrition, legal, or consumer-rights advice.
- No external dependency, backend search, Supabase, database persistence, RLS, real favorites, native submissions, or moderation workflow.

## Content Direction

The checklist should cover:

- choosing the right store type for the task;
- first-week essentials for food and household setup;
- payment methods, point cards, bags, and self-checkout;
- labels, dates, allergies, medicine, and product-safety caution;
- budget routines, carrying capacity, and waste/package disposal habits.

The tone should be practical and conservative: help users decide what to do next without implying that store rules, prices, point campaigns, or product availability are stable.

## Acceptance

- `src/content/tools/everyday-shopping-checklist.json` exists and has `status = published`.
- The tool slug is `japan-everyday-shopping-checklist`.
- The tool has complete four-locale localized fields and at least five practical sections.
- The sitemap and search index include representative generated routes for the new tool.
- README, implementation status, content model, page spec, project spec, roadmap, and acceptance criteria mention the new static tool where published tool lists or criteria are enumerated.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
