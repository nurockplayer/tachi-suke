# Phase 1R Locale RSS Feeds Design

## Goal

Add locale-specific RSS feeds so readers, feed readers, and search/discovery tooling can subscribe to one TachiSuke language instead of only the global multilingual feed.

## Scope

- Keep the existing global `/feed.xml`.
- Add static locale feeds:
  - `/zh-tw/feed.xml`
  - `/en/feed.xml`
  - `/ja/feed.xml`
  - `/ko/feed.xml`
- Each locale feed should include only non-draft articles for that locale.
- Add a shared feed generator helper to avoid duplicating RSS XML logic.
- Add locale feed alternate links in `BaseLayout`.
- Add sitemap entries for locale feeds.
- Update tests and docs.

## SEO and Feed Requirements

- Global feed remains multilingual and includes all non-draft articles.
- Locale feeds use locale-specific channel title, link, description, and `atom:link`.
- Feed items must include absolute URLs, title, description, pubDate, guid, categories, and `dc:language`.
- Draft articles must not appear in any feed.
- Locale feed output should be generated at build time.

## Non-Goals

- Do not add per-category feeds.
- Do not add feed discovery UI.
- Do not add pagination.
- Do not add runtime server code.
- Do not add dependencies.
