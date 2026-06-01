# Phase 1CA Content Internal Link Health Design

## Goal

Catch broken source-content internal links before static build or deployment.

## Problem

Article Markdown/MDX files often link to locale sections, article details, tools, areas, mobile plans, and places. The post-build HTML crawler catches rendered broken links after `pnpm build`, but source content should fail faster during `pnpm check:content`.

## Decision

- Extend `tests/content-health.test.mjs` with a conservative public route set.
- Include static locale routes, generated non-draft article routes, article category routes, published place/tool routes, and generated mobile/area routes.
- Scan article body content after frontmatter removal.
- Validate Markdown links and MDX `href="/..."` values that use root-relative internal paths.
- Ignore external URLs, protocol-relative URLs, anchors, and relative paths for this phase.

## Acceptance

- `pnpm check:content` fails when an article body links to a missing root-relative internal route.
- The check remains network-free and dependency-free.
- The check follows public visibility rules: draft articles and non-published places/tools are not valid public detail routes.
