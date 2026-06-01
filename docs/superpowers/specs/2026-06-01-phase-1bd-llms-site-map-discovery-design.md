# Phase 1BD LLM Site Map Discovery Design

## Goal

Expose the new human-readable site map pages through `/llms.txt` so AI assistants and search-adjacent tooling can find TachiSuke's public content directory without parsing the XML sitemap first.

## Scope

- Add locale site map links to `/llms.txt`.
- Keep the file plain text and static.
- Update tests and docs for the discovery surface.

## Non-Goals

- Do not add AI runtime behavior, crawling, analytics, or personalized recommendations.
- Do not include account placeholders, drafts, private data, or form submissions.

## Validation

- `pnpm test`
- `pnpm build`
- `pnpm check:links`
- `pnpm check:seo`

