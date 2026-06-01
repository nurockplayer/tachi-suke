# Phase 1CR Localized Article Detail Category Labels Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and Spark 5.3 read-only scan.
- `this_change_will_do`: replace raw article category display and structured metadata labels on article detail pages with localized category titles.
- `this_change_will_not_do`: change article routes, category slugs, content frontmatter, search indexing, content schemas, account placeholders, auth, database, or backend behavior.
- `research_owner`: Spark 5.3 worker for read-only candidate scan.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Checklist

- [x] Add source/build-output tests for localized article detail category labels.
- [x] Update `ArticleLayout` visible metadata to use localized category labels.
- [x] Update `ArticleLayout` visible and JSON-LD breadcrumbs to use localized category labels.
- [x] Update article detail Open Graph and `Article` JSON-LD category metadata.
- [x] Document Phase 1CR scope and acceptance.
- [x] Run validation: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
