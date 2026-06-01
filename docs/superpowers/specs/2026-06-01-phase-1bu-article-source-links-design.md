# Phase 1BU Article Source Links Design

## Scope

Add structured official-source links to article content and render them on article detail pages. This is a Phase 1 static-site improvement focused on reader trust, source freshness, and maintainability.

## Source Of Truth

- Active project goal: make TachiSuke production-ready through iterative specs, tests, implementation, PRs, merges, and deployment.
- Current content model and routes in `src/content.config.ts`, `src/types/article.ts`, and `src/components/layout/ArticleLayout.astro`.
- Existing high-risk article topics: emergency/disaster guidance and work contract guidance.

## Goals

- Let editors attach official confirmation links to an article as structured frontmatter.
- Render localized source-link copy on article detail pages before the article body.
- Start with source links for the four emergency/disaster articles and four work-contract articles.
- Keep all source links HTTPS and clearly editorial, not a guarantee that conditions are always current.
- Preserve the static-first Astro architecture and existing locale-prefixed routes.

## Non-Goals

- No database, Supabase, login, favorites, backend submission workflow, crawler, or automated external URL validation.
- No broad content rewrite beyond adding structured source metadata.
- No user-facing claim that official links are exhaustive or legally sufficient.

## Content Model

Article frontmatter gains optional `sourceLinks`:

```yaml
sourceLinks:
  - label: "Official source label"
    url: "https://example.com/path"
    note: "Optional short editorial note"
```

`label` and `url` are required for each source link. `note` is optional. Articles remain locale-specific, so source labels and notes are plain strings in the article locale rather than a localized object.

## Rendering

`ArticleLayout` accepts `sourceLinks` and renders a section only when at least one link exists. The section appears after the article freshness notice and before the table of contents/body. It uses locale-aware headings and description text:

- `zh-tw`: 官方確認入口
- `en`: Official confirmation links
- `ja`: 公式確認リンク
- `ko`: 공식 확인 링크

External source links open in a new tab with `rel="noreferrer"`.

## Testing

- Source-level tests verify the article schema, TypeScript type, layout prop, rendered source-link section marker, and detail-page prop wiring.
- Content-health tests verify that emergency/disaster and work-contract public articles in all four locales include at least two HTTPS `sourceLinks`.
- Build-output SEO tests verify that a representative article renders the source-links section and expected official URLs.

## AWP-Lite Routing

- `source_of_truth`: active project goal, current repo docs, and current content files.
- `this_change_will_do`: add structured source links for article detail pages.
- `this_change_will_not_do`: add database/auth/backend behavior or validate external links live.
- `research_owner`: controller.
- `implementation_owner`: controller fallback.
- `validation_owner`: controller.
- `controller_fallback_reason`: worker unavailable in the current toolset.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`, browser QA.
