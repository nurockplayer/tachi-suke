# Phase 1BT Article Freshness and Trust Plan

## Tasks

1. Add source-level tests for semantic article dates and localized article freshness copy.
2. Update `ArticleLayout` to render `publishedAt` and `updatedAt` as `<time>` elements.
3. Add localized article trust notice copy for `zh-tw`, `en`, `ja`, and `ko`.
4. Add theme-aware CSS for the article trust notice.
5. Update README, project docs, roadmap, implementation status, acceptance criteria, and AGENTS guidance.
6. Run source, content, build, link, SEO, and browser QA checks.
7. Open a PR, merge after checks pass, and deploy the merged `main` build to Cloudflare Pages.

## Notes

- The notice uses existing article `updatedAt`; it does not add a new review-date field yet.
- Correction prompts remain the channel for reporting stale or unclear details.
- The phase stays static-first and dependency-free.
