# Phase 1BA Shopping Guides Design

## Problem

TachiSuke covers housing, procedures, mobile plans, transportation, food, and daily-life rules, but everyday shopping decisions are still underdeveloped. New residents often need to decide when to use convenience stores, supermarkets, drugstores, 100-yen shops, and online shopping without overpaying or missing essentials.

## Scope

Add four public articles, one per locale, explaining how to choose between convenience stores, supermarkets, drugstores, and other everyday shopping options in Japan. Add localized `shopping` article category copy so generated category pages remain polished.

## Non-Goals

- Do not publish store-specific prices, campaigns, coupons, or inventory promises.
- Do not add affiliate links, shopping carts, price scraping, or product recommendations.
- Do not add a new content schema.

## Acceptance

- Four articles share `translationKey = japan-shopping-basics`.
- Article category is `shopping`.
- Category helper has localized `shopping` title and description copy.
- Articles link to places, family restaurant content, area guides, mobile setup, and submit-place where relevant.
- Source tests validate article counts, category copy, per-locale thresholds, and expected slugs.
- SEO output tests validate sitemap and RSS inclusion for representative new URLs.
