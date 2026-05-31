# Phase 1F CI Quality Gate Design

## Objective

Make every pull request prove the same checks we run locally before merge.

## Decision

Add a small GitHub Actions workflow using pnpm. Do not add another CI service, deploy token, or Cloudflare integration yet. Deployment can be configured later in Cloudflare Pages; this phase only guards source quality and static build output.

## Scope

The CI workflow should run on pull requests and pushes to `main`:

- Reject forbidden lockfiles.
- Install dependencies with `pnpm install --frozen-lockfile`.
- Run `pnpm test`.
- Run `pnpm build`.
- Run `pnpm check:links`.
- Run `pnpm check:seo`.

## Non-Goals

This phase does not deploy to Cloudflare Pages, configure secrets, run browser visual QA, or add external link checking.

## Acceptance Criteria

- Source tests verify the CI workflow exists and uses pnpm-only commands.
- Source tests verify the CI workflow rejects `package-lock.json`, `yarn.lock`, `bun.lock`, and `bun.lockb`.
- The workflow runs build-output checks only after build.
- Local verification still passes.
