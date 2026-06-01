# Phase 1CU Search Page Locale SEO Coverage Plan

## Startup Readback

- `cwd`: `<repo-root>`
- `branch`: `codex/phase-1cu-search-page-locale-seo`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and autonomous PR instructions
- `phase`: Phase 1-safe testing and documentation
- `this_change_will_do`: expand build-output SEO checks so all four locale search pages keep the same static noindex/shareable search contract
- `this_change_will_not_do`: change search ranking, search index generation, routes, auth, database, hosted search, analytics, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only scan for one small Phase 1-safe PR candidate
- `worker_output_summary`: Spark found that search-page HTML/SEO checks only exercised `/en/search`, while other locales were covered mainly through search-index JSON tests
- `controller_review_summary`: accepted the narrow coverage goal because it protects multilingual static search behavior without changing runtime functionality
- `controller_followup_decisions`: update `tests/seo-output.test.mjs` to loop over all locales, keep English-specific deep index assertions, and document the Phase 1CU contract

## Tasks

- [x] Expand build-output search page SEO checks to all four locales.
- [x] Keep deeper English search-index assertions and all-locale public-index checks.
- [x] Update README and docs.
- [x] Run final validation.
- [ ] Open PR, wait for checks, merge if clean, and deploy main.
