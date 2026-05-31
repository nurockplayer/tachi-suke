# Phase 1AE Ward Office Moving-In Checklist Plan

## Architecture

Reuse the existing `tools` content collection and `ToolDetailPage.astro`. Add an optional `sourceLinks` field so editorial tools can cite official references without forcing every existing checklist to include external links.

## Tasks

- [x] Inspect current tool schema, detail page, and test surfaces.
- [x] Verify official source candidates for My Number and foreign resident living guidance.
- [x] Write failing tests for `sourceLinks`, the third published tool, sitemap output, and built HTML source links.
- [x] Add optional `sourceLinks` to the tools schema and TypeScript type.
- [x] Render source links on tool detail pages.
- [x] Add `ward-office-moving-in-checklist.json`.
- [x] Update README, AGENTS.md, and project docs.
- [ ] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
