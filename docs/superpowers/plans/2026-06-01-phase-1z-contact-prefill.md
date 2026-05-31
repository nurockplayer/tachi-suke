# Phase 1Z Contact Prefill Plan

## Plan

- [x] Add failing source/build-output tests for correction prompt URL prefill.
- [x] Update `CorrectionPrompt` to accept the current public path and append an encoded absolute `relatedUrl`.
- [x] Pass `Astro.url.pathname` from article, place, mobile plan, area, and tool detail surfaces.
- [x] Update `ContactPage` to prefill `relatedUrl` from the query string with browser-side JavaScript.
- [x] Update docs for the static correction prefill workflow.
- [x] Run verification: `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
- [ ] Open PR, wait for checks, and merge.
