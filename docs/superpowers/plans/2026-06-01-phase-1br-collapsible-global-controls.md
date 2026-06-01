# Phase 1BR Collapsible Global Controls Plan

## Tasks

1. Add source-level tests for collapsed language and theme controls.
2. Update `LocaleSwitcher` to use a locale-aware disclosure menu.
3. Update `ThemeToggle` to use a disclosure menu while keeping persisted system/light/dark behavior.
4. Add shared header disclosure behavior for peer closing, outside click closing, and Escape closing.
5. Refine global CSS for compact header controls and menu surfaces.
6. Update README, project docs, roadmap, implementation status, and acceptance criteria.
7. Run source, content, build, link, SEO, and browser QA checks.
8. Open a PR, merge after checks pass, and deploy the merged `main` build to Cloudflare Pages.

## Notes

- The controls remain separate: language choices do not mix with theme choices.
- The implementation uses native `details` / `summary` semantics for a small, dependency-free interaction surface.
- The phase stays static-first and does not introduce auth, database, favorites, or submission backend behavior.
