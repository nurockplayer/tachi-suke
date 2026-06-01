# Phase 1CO Site Map JSON-LD Language Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and Spark 5.3 read-only scan.
- `this_change_will_do`: align site map `WebPage.inLanguage` JSON-LD with shared BCP47 locale metadata.
- `this_change_will_not_do`: change visible site map content, 404 behavior, routes, content schemas, account placeholders, auth, database, or backend behavior.
- `research_owner`: Spark 5.3 worker for read-only candidate scan.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Checklist

- [x] Add failing build-output SEO coverage for site map `WebPage.inLanguage`.
- [x] Update `SiteMapPage` to use `htmlLangByLocale[locale]`.
- [x] Add source-level structure coverage for the shared locale metadata usage.
- [x] Document Phase 1CO scope and acceptance.
- [x] Run validation: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
