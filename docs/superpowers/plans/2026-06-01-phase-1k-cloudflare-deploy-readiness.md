# Phase 1K Cloudflare Deploy Readiness Implementation Plan

**Goal:** Add Cloudflare Pages deployment configuration and documentation without adding secrets or runtime dependencies.

**Architecture:** Keep the app as Astro static output. Use `wrangler.toml` only for Pages project metadata and output directory. Keep environment variables configured in Cloudflare Pages dashboard or deployment environment.

**Tech Stack:** Astro, pnpm, Cloudflare Pages, Wrangler-compatible configuration, Node test runner.

---

### Task 1: Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`

- [x] Assert `wrangler.toml` exists.
- [x] Assert `docs/DEPLOYMENT.md` exists.
- [x] Assert `wrangler.toml` contains `name`, `compatibility_date`, and `pages_build_output_dir = "./dist"`.
- [x] Assert deployment docs mention Cloudflare Pages, `SITE_URL`, `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`, `pnpm build`, and `dist`.
- [x] Assert Cloudflare secrets such as API tokens and account IDs are not committed.
- [x] Run `pnpm test` and confirm failures before implementation.

### Task 2: Wrangler Pages Config

**Files:**
- Create: `wrangler.toml`

- [x] Set `name = "tachi-suke"`.
- [x] Set `compatibility_date`.
- [x] Set `pages_build_output_dir = "./dist"`.
- [x] Do not add bindings, routes, secrets, or account IDs.

### Task 3: Deployment Docs

**Files:**
- Create: `docs/DEPLOYMENT.md`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`

- [x] Document Cloudflare Pages dashboard setup.
- [x] Document optional Wrangler deploy flow without adding a dependency.
- [x] Document required verification commands.
- [x] Document environment variables and secret rules.

### Task 4: Verification and Publish

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Check forbidden lockfiles.
- [ ] Commit, push, create PR, wait for CI, and merge.
