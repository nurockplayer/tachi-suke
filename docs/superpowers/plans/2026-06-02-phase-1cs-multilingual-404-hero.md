# Phase 1CS Multilingual Static 404 Hero Copy Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and Spark 5.3 read-only scan.
- `this_change_will_do`: replace fixed English-only visible 404 hero and language-selector copy with static multilingual copy.
- `this_change_will_not_do`: add redirects, client-side locale detection, locale-specific 404 routes, Cloudflare Functions, Workers, analytics, backend error tracking, auth, database, real favorites, native submissions, or route changes.
- `research_owner`: Spark 5.3 worker for read-only candidate scan.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Controller Decision

Spark suggested parsing the request path to infer locale. The controller rejected that implementation detail because `404.html` is static build output and Cloudflare fallback requests do not re-render Astro with the missing URL. The implemented approach keeps the page static and shows all supported top-level explanations.

## Checklist

- [x] Add source/build-output tests for multilingual 404 top copy.
- [x] Update `404.astro` visible hero copy to be language-neutral plus multilingual.
- [x] Update 404 language-selector guidance to be multilingual.
- [x] Add minimal styles for multilingual 404 intro copy.
- [x] Document Phase 1CS scope and acceptance.
- [x] Run validation: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
