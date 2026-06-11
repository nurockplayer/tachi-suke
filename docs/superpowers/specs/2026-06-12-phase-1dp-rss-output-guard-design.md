# Phase 1DP RSS Channel Metadata Guard Design

## Problem

TachiSuke already generates a global RSS feed and four locale feeds. Existing checks verified that feed item URLs match public article content, but they did not fully guard channel metadata or item-level metadata that feed readers depend on.

Potential regressions included:

- missing or wrong atom self links
- malformed channel links
- unparseable `lastBuildDate`
- duplicate items hidden by set-based URL comparison
- item GUIDs drifting away from article URLs
- missing or unsupported item language values
- accidental utility/account/search-index URLs in feeds

## Decision

Keep RSS generation unchanged and strengthen `pnpm check:seo` against built `dist` output.

The guard checks:

- XML declaration
- RSS 2.0, atom, and Dublin Core namespaces
- channel title, link, atom self link, and description
- parseable `lastBuildDate`
- exact public article URL item coverage
- no duplicate items
- GUID equals item link and remains permalink-backed
- parseable item `pubDate`
- supported `dc:language` values
- no account, search, or search-index utility route links

## Non-Goals

- No new feed surfaces.
- No category feeds.
- No place/tool/mobile/area feeds.
- No pagination.
- No runtime feed generation.
- No auth, database, Workers, Functions, or backend behavior.

## Acceptance Criteria

- `pnpm check:seo` fails if global or locale RSS channel metadata drifts from the reviewed contract.
- `pnpm check:seo` fails if RSS item coverage no longer exactly matches current non-draft public articles.
- `pnpm check:seo` fails on duplicated feed items, unsupported item languages, mismatched GUIDs, unparseable dates, or utility-route links.
- The production validation chain remains green.

