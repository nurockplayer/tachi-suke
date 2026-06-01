# Phase 1CP Localized Article Category Display Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and Spark 5.3 read-only scan.
- `this_change_will_do`: replace raw article category display labels on public article discovery surfaces with localized category titles.
- `this_change_will_not_do`: change article routes, category slugs, content frontmatter, search indexing, content schemas, account placeholders, auth, database, or backend behavior.
- `research_owner`: Spark 5.3 worker for read-only candidate scan.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Checklist

- [x] Add failing source/build-output tests for localized article category display.
- [x] Update article index rows to use `getArticleCategoryTitle`.
- [x] Update article category page rows to use `getArticleCategoryTitle`.
- [x] Update homepage latest-article rows to use `getArticleCategoryTitle`.
- [x] Document Phase 1CP scope and acceptance.
- [x] Run validation: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
