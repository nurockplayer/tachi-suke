# Phase 1AX Moving-Out Articles Design

## Problem

TachiSuke now covers renting, apartment viewings, and moving-in procedures, but moving out of a Japan apartment is still mostly represented by a tool card. Users searching for notice periods, utility shutdown, trash disposal, handover, and address updates need indexable explanatory articles before they find a checklist.

## Scope

Add four public articles, one per locale, explaining how to prepare for moving out of a Japan apartment. The articles should link to the moving-out checklist tool, rental initial-cost content, and municipal moving-in procedure content when the reader is moving to another municipality.

## Non-Goals

- Do not provide legal advice about deposit disputes or restoration obligations.
- Do not promise exact notice periods, fees, or garbage collection rules.
- Do not add saved checklist state, quote workflows, moving-company integrations, or backend storage.
- Do not add a new content schema.

## Acceptance

- Four articles share `translationKey = japan-apartment-moving-out-checklist`.
- Article category remains `housing`.
- Articles link to the moving-out checklist tool and relevant rental/procedure content.
- Source tests validate article counts, per-locale thresholds, and expected slugs.
- SEO output tests validate sitemap and RSS inclusion for representative new URLs.
