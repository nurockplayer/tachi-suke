# Phase 1CX Multilingual Section JSON-LD Check Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1cx-multilingual-section-jsonld-check`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and autonomous PR instructions
- `phase`: Phase 1-safe static SEO quality gate
- `this_change_will_do`: expand section index JSON-LD build-output checks from English-only to all supported locales
- `this_change_will_not_do`: change runtime output, routes, content, schemas, forms, auth, database, deployment configuration, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only repo scan for one narrow Phase 1-safe autonomous PR candidate
- `worker_output_summary`: worker found that `tests/seo-output.test.mjs` verifies section index `CollectionPage`/`ItemList` JSON-LD only on English pages
- `controller_review_summary`: accepted the direction because section index pages are core SEO discovery surfaces and the change can stay inside tests/docs
- `controller_followup_decisions`: add a multilingual section-case helper, preserve existing item-count logic, and document the new gate

## Tasks

- [x] Add a RED test path requiring multilingual section JSON-LD cases.
- [x] Expand section index JSON-LD checks to `zh-tw`, `en`, `ja`, and `ko`.
- [x] Update docs for Phase 1CX.
- [x] Run final validation.
- [ ] Open PR, address review/CI feedback, merge, and deploy if gates pass.
