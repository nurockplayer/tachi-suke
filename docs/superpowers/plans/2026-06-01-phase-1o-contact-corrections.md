# Phase 1O Contact and Corrections Implementation Plan

**Goal:** Add a static-first, provider-agnostic contact/corrections form and thanks pages.

**Architecture:** Reuse Astro static pages, `BaseLayout`, existing form styles, footer navigation, sitemap generation, and source-level tests.

**Tech Stack:** Astro components, TypeScript, pnpm checks.

---

## Task 1: Failing Tests and Spec

**Files:**
- Add: `docs/superpowers/specs/2026-06-01-phase-1o-contact-corrections-design.md`
- Add: `docs/superpowers/plans/2026-06-01-phase-1o-contact-corrections.md`
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Define Phase 1O scope and non-goals.
- [x] Assert contact routes exist for all locales.
- [x] Assert `.env.example` includes `PUBLIC_CONTACT_FORM_ENDPOINT`.
- [x] Assert contact form uses the endpoint, POST, hidden fields, and honeypot.
- [x] Assert sitemap/build SEO output includes contact pages.

## Task 2: Static Form Pages

**Files:**
- Add: `src/components/pages/ContactPage.astro`
- Add: `src/components/pages/ContactThanksPage.astro`
- Add: `src/pages/*/contact.astro`
- Add: `src/pages/*/contact/thanks.astro`
- Modify: `.env.example`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/pages/sitemap.xml.ts`

- [x] Implement preview mode when endpoint is unset.
- [x] Implement static POST when endpoint is set.
- [x] Add provider-agnostic hidden fields and honeypot.
- [x] Add natural locale copy for privacy and corrections.
- [x] Link contact pages from footer and sitemap.

## Task 3: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document the contact endpoint and preview behavior.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Browser smoke check `/en/contact`.
- [x] Commit, push, create PR, wait for CI, and merge.
