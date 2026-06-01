# Phase 1BS Globe Language Switcher Plan

## Tasks

1. Add a failing source-level test requiring a language-neutral collapsed locale switcher.
2. Update `LocaleSwitcher` so the closed state uses a globe icon, `Lang`, and a compact locale code instead of the current locale name.
3. Add small shared icon styling without introducing an icon dependency.
4. Update docs and acceptance criteria for the language-neutral switcher rule.
5. Run source, content, build, link, SEO, and browser QA checks.
6. Open a PR, merge after checks pass, and deploy the merged `main` build to Cloudflare Pages.

## Notes

- Expanded menu options still use native language names because those are useful once the user opens the language menu.
- The globe icon is inline SVG to keep Phase 1 static-first and dependency-free.
