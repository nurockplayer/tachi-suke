# Phase 1AT Moving-Out Checklist Tool Design

## Problem

TachiSuke now helps users compare move-in costs and apartment-viewing communication, but the housing lifecycle is incomplete without moving-out guidance. Foreign residents can miss notice periods, utility cancellations, trash rules, mail forwarding, address procedures, and move-out cost checks.

## Scope

Add one published static checklist tool for moving out of a Japan apartment. Reuse the existing tools content model and detail page.

## Non-Goals

- Do not add saved checklist state.
- Do not add a moving company quote workflow.
- Do not add backend storage, auth, or database work.
- Do not provide legal advice about deposit disputes.

## Content Shape

The tool should cover:

- Notice and contract checks
- Utilities, internet, mail, and subscriptions
- Trash, oversized garbage, cleaning, and handover
- Address and administration follow-up

## Acceptance

- A published tool exists at slug `moving-out-checklist`.
- `/[locale]/tools/moving-out-checklist` is generated for all four locales.
- Source tests require at least six published tools and the new slug.
- SEO output tests verify representative sitemap entries.
- Docs record Phase 1AT and updated tool count.
