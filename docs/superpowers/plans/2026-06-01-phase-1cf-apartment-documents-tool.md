# Phase 1CF Apartment Documents Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a static four-locale apartment application documents checklist in the existing tools collection.

**Architecture:** Reuse the existing `tools` content collection and `ToolDetailPage` rendering pipeline. Add one JSON entry, strengthen source-level checks for the new published tool, and add a representative sitemap expectation for generated public routes.

**Tech Stack:** Astro content collections, TypeScript, JSON content, Node test runner, pnpm.

---

### Task 1: Add Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] **Step 1: Require the new tool in source-level tests**

Add assertions that published tools include `apartment-application-documents-checklist`, that its JSON file has complete locale copy, and that it has practical sections.

- [x] **Step 2: Require sitemap routes**

Add representative `/en/tools/apartment-application-documents-checklist` and `/zh-tw/tools/apartment-application-documents-checklist` sitemap expectations.

- [x] **Step 3: Run tests to verify RED**

Run: `pnpm test`

Expected: fail because `src/content/tools/apartment-application-documents-checklist.json` is missing.

### Task 2: Add Tool Content

**Files:**
- Create: `src/content/tools/apartment-application-documents-checklist.json`

- [x] **Step 1: Add localized metadata**

Create a published tool with stable `id`, `slug`, `title`, `description`, `lastCheckedAt`, `sourceNote`, and `notes` in all four locales.

- [x] **Step 2: Add checklist sections**

Include sections for identity and address, income and affiliation, emergency contact and guarantor checks, and submission hygiene.

- [x] **Step 3: Run source tests**

Run: `pnpm test`

Expected: pass.

### Task 3: Update Public Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`

- [x] **Step 1: Update published tool counts and lists**

Mention the apartment application documents checklist wherever the current published tool list is enumerated.

- [x] **Step 2: Record Phase 1CF**

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
