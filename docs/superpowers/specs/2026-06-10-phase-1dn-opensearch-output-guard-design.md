# Phase 1DN OpenSearch Output Guard Design

## Context

TachiSuke generates `/opensearch.xml` as a static Astro endpoint. The file lets browsers and search-adjacent tooling discover the site's static search page. In Phase 1, the reviewed contract is deliberately conservative: use the English static search fallback at `/en/search?q={searchTerms}` and keep the output provider-free.

Existing checks verified that `opensearch.xml` exists and contains the expected broad elements, but they did not pin the exact XML output or guard production builds against accidental fallback-domain, locale-variant, private-account, or search-index targets.

## Decision

Add a dependency-free `pnpm check:seo` guard that reads built `dist/opensearch.xml` and verifies the exact Phase 1 browser search discovery contract:

- XML declaration and OpenSearch 1.1 namespace.
- `ShortName` is `TachiSuke`.
- Description reflects public Japan life guides, places, mobile plans, area guides, and tools.
- `InputEncoding` is `UTF-8`.
- The only URL entry is `type="text/html"` and points at the configured-site `/en/search?q={searchTerms}` template.

Also verify configured-site output does not include the fallback example domain or point at locale search variants, account placeholders, or search index JSON.

## Non-Goals

- No OpenSearch endpoint behavior changes unless the guard exposes a real defect.
- No static search behavior changes.
- No search ranking changes.
- No hosted search, analytics, language detection, private/account search, auth, database, Workers, Functions, or backend behavior.

## Acceptance

- `pnpm check:seo` fails if the built OpenSearch XML differs from the reviewed contract.
- Production `SITE_URL` `pnpm check:seo` fails if the template uses the fallback example domain.
- `pnpm check:seo` fails if the template targets non-English locale variants, account placeholders, or search index JSON.
- Existing sitemap, robots, security.txt, redirects, metadata, noindex, RSS, and JSON-LD guards continue to pass.
