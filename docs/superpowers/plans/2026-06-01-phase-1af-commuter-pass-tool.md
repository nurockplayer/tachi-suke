# Phase 1AF Commuter Pass and IC Card Tool Plan

## Architecture

Reuse the existing static `tools` collection and `ToolDetailPage.astro`. Add a fourth published tool with official source links. Avoid fare calculation and route-specific claims.

## Tasks

- [x] Inspect current tools model and source-link rendering.
- [x] Verify official source candidates for commuter pass and PASMO information.
- [x] Write failing tests for the fourth published tool, official source links, sitemap output, and built HTML.
- [x] Add `commuter-pass-ic-card-checklist.json`.
- [x] Update README, AGENTS.md, project docs, and acceptance docs.
- [ ] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
