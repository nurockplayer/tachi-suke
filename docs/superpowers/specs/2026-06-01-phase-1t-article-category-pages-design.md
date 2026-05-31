# Phase 1T Article Category Pages Design

## Goal

Add static article category landing pages so TachiSuke can expose high-intent guide groups such as mobile, setup, housing, and food as crawlable, internally linked pages.

## Scope

- Add category routes:
  - `/zh-tw/articles/category/[category]`
  - `/en/articles/category/[category]`
  - `/ja/articles/category/[category]`
  - `/ko/articles/category/[category]`
- Generate category pages from existing public article frontmatter.
- Link category pages from article index pages.
- Link the article detail category label to the matching category page.
- Include category pages in `sitemap.xml`.
- Keep draft articles out of category pages and sitemap.
- Update tests and docs.

## SEO Requirements

- Category pages should be indexable static pages.
- Page title and description should be locale-aware.
- Category pages should list only same-locale, non-draft articles.
- Category pages should include canonical, Open Graph metadata, locale-aware `html lang`, and conservative `hreflang` for the same category slug across locales when generated.
- Category pages should be included in `sitemap.xml` with `lastmod` based on the newest article update date in that category.

## Non-Goals

- Do not add tag pages yet.
- Do not add a CMS, database, or runtime category service.
- Do not invent categories without article content.
- Do not add category filters that require client-side state.
