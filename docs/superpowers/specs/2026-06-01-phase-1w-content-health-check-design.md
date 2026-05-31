# Phase 1W Content Health Check Design

## Objective

Add a dependency-free content quality gate so public static content does not accidentally ship with duplicate slugs, invalid dates, future review dates, or malformed external URLs.

## Scope

Add a Node test script:

- `tests/content-health.test.mjs`

Add a package script:

- `pnpm check:content`

Run it in CI before build.

## Checks

- Article frontmatter slugs and IDs are unique.
- JSON collection slugs and IDs are unique within each collection.
- Article `publishedAt` and `updatedAt` values are valid dates.
- `updatedAt` must not be earlier than `publishedAt`.
- Date-sensitive `lastCheckedAt` values for mobile plans, areas, and tools must be valid and not in the future.
- Place `createdAt` and `updatedAt` values must be valid, and `updatedAt` must not be earlier than `createdAt`.
- Official, map, and form-free content URLs stored in content files must use `https://`.
- Content JSON should not contain `undefined` placeholder strings.

## Non-goals

- No network fetching.
- No external link availability checks.
- No price or official-condition validation.
- No scheduled workflow.
- No new dependency.

## Acceptance

- `pnpm check:content` passes locally.
- CI runs `pnpm check:content`.
- Project structure tests verify the new script and CI step.
- Documentation records that this is a source-level static content health check, not a live data audit.
