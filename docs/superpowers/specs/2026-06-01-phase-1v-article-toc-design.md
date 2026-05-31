# Phase 1V Article Table of Contents Design

## Objective

Improve long-form article readability by adding an automatically generated table of contents to article detail pages. TachiSuke articles are decision-oriented and often use multiple sections; a visible TOC helps readers jump to the part they need.

## Scope

- Article detail pages only.
- Generate TOC entries from Markdown / MDX headings returned by Astro content rendering.
- Include level 2 and level 3 headings.
- Render TOC only when an article has enough headings to be useful.
- Keep the TOC static and dependency-free.

## Non-goals

- No client-side scroll spy.
- No persistent reading progress.
- No database or personalization.
- No route changes.
- No new dependency.

## UX Rules

- Render the TOC after the article header and before the article body.
- Use locale-aware labels.
- Anchor links must point to generated heading IDs in the same article.
- Keep styling readable on mobile and restrained for long-form pages.

## Acceptance

- Source tests confirm `ArticleDetailPage` passes rendered headings to `ArticleLayout`.
- Source tests confirm `ArticleLayout` renders an `article-toc` navigation.
- Build-output SEO tests confirm representative article pages include TOC links to real heading anchors.
- `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
