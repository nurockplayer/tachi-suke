# Phase 1AZ Family Restaurant Articles Design

## Problem

TachiSuke has a Traditional Chinese article comparing Denny's, Gusto, and Royal Host, but English, Japanese, and Korean readers do not yet have the same food/places entry point. The place detail pages exist across locales, so translated articles can strengthen internal linking and daily food decision coverage.

## Scope

Add English, Japanese, and Korean articles for the family restaurant comparison. Reuse the existing `translationKey = family-restaurants-japan-basics` from the zh-tw article so translated sitemap alternates can connect the cluster.

## Non-Goals

- Do not add restaurant reviews, ratings, comments, or user submissions.
- Do not promise branch-specific hours, prices, smoking rules, menus, or payment methods.
- Do not add a restaurant database schema change.
- Do not add a map or reservation feature.

## Acceptance

- Three new articles share the existing `translationKey = family-restaurants-japan-basics`.
- Articles link to localized Denny's, Gusto, Royal Host, places index, and submit-place surfaces.
- Source tests validate article counts, per-locale thresholds, and expected slugs.
- SEO output tests validate sitemap and RSS inclusion for representative new URLs.
