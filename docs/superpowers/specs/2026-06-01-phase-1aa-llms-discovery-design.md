# Phase 1AA LLM Discovery Design

## Objective

Add a static `llms.txt` discovery file that summarizes TachiSuke for AI assistants and search-adjacent tooling.

## Scope

- Generate `/llms.txt` at build time.
- Keep the file static, concise, and editorially accurate.
- Include the product positioning, supported locales, important public URLs, RSS feeds, sitemap, search indexes, and freshness caveats.
- Use the configured Astro `site` URL with the existing example-domain fallback.

## Non-goals

- No AI runtime feature.
- No chatbot.
- No crawling of live external URLs.
- No analytics or tracking.
- No user-specific, private, draft, account, or placeholder data.

## Content Rules

- Describe TachiSuke as a multilingual Japan life decision assistant, not a travel blog.
- Link only to public static routes.
- Mention that mobile plans, prices, campaigns, area conditions, and place rules may change.
- Point readers/tools to sitemap and RSS feeds for canonical discovery.

## Acceptance

- Source tests verify the `llms.txt` endpoint exists and references core public discovery surfaces.
- Build-output SEO tests verify `dist/llms.txt` exists with a plain-text content summary.
- Existing source, content, build, link, and SEO checks pass.
