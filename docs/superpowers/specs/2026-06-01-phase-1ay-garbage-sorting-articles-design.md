# Phase 1AY Garbage Sorting Articles Design

## Problem

Garbage sorting, pickup days, collection points, and oversized trash are common pain points for foreign residents in Japan. TachiSuke currently mentions garbage inside housing and moving content, but lacks a dedicated daily-life article cluster for this high-frequency problem.

## Scope

Add four public articles, one per locale, explaining how to approach Japanese garbage sorting and oversized trash rules without pretending that one national rule applies everywhere. Add localized `daily-life` article category copy so generated category pages remain polished.

## Non-Goals

- Do not publish municipality-specific garbage calendars.
- Do not promise universal sorting categories, pickup days, fees, or oversized trash rules.
- Do not add a calendar, reminder system, saved checklist state, or backend storage.
- Do not add a new content schema.

## Acceptance

- Four articles share `translationKey = japan-garbage-sorting-oversized-trash`.
- Article category is `daily-life`.
- Category helper has localized `daily-life` title and description copy.
- Articles link to moving-out, ward-office moving-in, and area/life setup surfaces where relevant.
- Source tests validate article counts, category copy, per-locale thresholds, and expected slugs.
- SEO output tests validate sitemap and RSS inclusion for representative new URLs.
