# Phase 1CH Everyday Shopping Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development. This plan is executed by the controller because Spark worker spawning returned `agent thread limit reached`.

**Goal:** Publish a static four-locale everyday shopping checklist in the existing tools collection.

**Architecture:** Reuse the existing `tools` content collection and `ToolDetailPage` rendering pipeline. Add one JSON entry, strengthen source-level checks for the new published tool, add representative sitemap/search/detail output expectations, and update docs that enumerate published tools.

**Tech Stack:** Astro content collections, TypeScript, JSON content, Node test runner, pnpm.

---

### Task 1: Add Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] **Step 1: Require the new tool in source-level tests**

Add assertions that published tools include `japan-everyday-shopping-checklist`, that its JSON file has complete locale copy, and that practical section IDs exist.

- [x] **Step 2: Require build-output discovery**

Add representative sitemap, search-index, and rendered tool detail expectations for `/en/tools/japan-everyday-shopping-checklist`.

- [x] **Step 3: Run tests to verify RED**

Run: `pnpm test`

Expected: fail because `src/content/tools/everyday-shopping-checklist.json` is missing.

### Task 2: Add Tool Content

**Files:**
- Create: `src/content/tools/everyday-shopping-checklist.json`

- [x] **Step 1: Add localized metadata**

Create a published tool with stable `id`, `slug`, `title`, `description`, `lastCheckedAt`, `sourceNote`, and `notes` in all four locales.

- [x] **Step 2: Add checklist sections**

Include sections for store choice, first-week essentials, payments and points, labels and safety, and budget routines.

### Task 3: Update Public Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/CONTENT_MODEL.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`

- [x] **Step 1: Update published tool counts and lists**

Mention the everyday shopping checklist wherever current published tool lists are enumerated.

- [x] **Step 2: Record Phase 1CH**

Add a roadmap entry describing the static tool and its non-goals.

### Task 4: Validate and Ship

**Files:**
- No additional file edits expected.

- [x] **Step 1: Run full validation**

Run:

```bash
pnpm test
pnpm check:content
pnpm build
pnpm check:links
pnpm check:seo
SITE_URL=https://tachi-suke.pages.dev pnpm build
SITE_URL=https://tachi-suke.pages.dev pnpm check:seo
SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy
```

- [ ] **Step 2: Browser/HTTP smoke**

After deployment, verify the new production tool route returns 200 and contains the new checklist title.
