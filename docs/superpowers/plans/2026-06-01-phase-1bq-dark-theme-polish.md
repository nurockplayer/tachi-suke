# Phase 1BQ Dark Theme and Visual Polish Plan

## Tasks

1. Add source-level tests for persistent dark theme support.
2. Implement a no-dependency `ThemeToggle` component.
3. Add early theme initialization and light/dark `theme-color` metadata in `BaseLayout`.
4. Refactor global CSS to use theme-aware color tokens for major surfaces.
5. Update README, project docs, roadmap, acceptance criteria, and AGENTS guidance.
6. Run source, content, build, link, SEO, and browser QA checks.
7. Open a PR, merge after checks pass, and deploy the merged `main` build to Cloudflare Pages.

## Notes

- The switcher supports `system`, `light`, and `dark`.
- `system` follows `prefers-color-scheme`.
- The persisted preference key is `tachi-suke-theme`.
- The phase stays static-first and does not introduce runtime dependencies.
