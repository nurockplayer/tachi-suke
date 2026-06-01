# Phase 1CE Compact Theme Toggle Plan

## Tasks

1. Strengthen source-level tests so the collapsed language switcher cannot regress to visible current-locale text.
2. Add a failing source-level test for a compact theme summary with an icon, localized accessible label, and short current state.
3. Update `ThemeToggle` and shared header styles to use compact icon-plus-state presentation.
4. Update implementation status, roadmap, and acceptance criteria for the compact global controls rule.
5. Run source, content, build, static link, SEO, production-URL SEO, deploy-output, and browser checks.
6. Open a PR, merge after checks pass, and deploy the merged `main` build to Cloudflare Pages.

## Notes

- The language control remains globe-only in the closed state because users may not understand the current locale.
- The theme menu still shows localized full labels after opening, so the compact closed state does not remove meaning for screen reader or keyboard users.
