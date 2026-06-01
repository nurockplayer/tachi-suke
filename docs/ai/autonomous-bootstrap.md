# TachiSuke AWP-lite Bootstrap

This document is the lightweight autonomous workflow entrypoint for TachiSuke. Use it only when the user explicitly asks for Autonomous, AWP, Hybrid AWP, Codex autonomous workflow, or when a task is broad enough that autonomous routing would reduce risk.

AWP-lite keeps the useful parts of tachigo's Hybrid AWP with Explicit Fallback Gate, but it does not import tachigo's full PR governance, Scope Police, spec-injector gates, or develop-branch workflow.

## When To Use

Use AWP-lite for:

- Cross-module work touching content models, route generation, layouts, and tests together.
- Phase 2 planning or implementation involving auth, database, favorites, submissions, or moderation.
- Work that needs an explicit split between research, implementation, validation, and final review.
- User requests that mention Autonomous, AWP, Hybrid AWP, or Codex autonomous workflow.

Do not use AWP-lite for:

- Small copy edits, single-file docs updates, or direct answers.
- Routine content additions that fit existing schemas and do not change behavior.
- Work where the user only asked for an assessment and did not authorize edits.

## Hard Boundaries

- Default communication is Taiwan Traditional Chinese.
- Do not use Simplified Chinese unless the user explicitly asks for it.
- Do not overwrite dirty worktree changes. If relevant files already have user changes, read them and work with them.
- Do not commit, push, open PRs, merge, rebase, switch branches, or write public GitHub comments unless the user explicitly asks or approves it.
- Use `rtk` only for git and gh shell commands.
- Use pnpm only for JavaScript and Astro commands.
- Do not create `package-lock.json`, `yarn.lock`, `bun.lock`, or `bun.lockb`.
- Do not introduce lifecycle scripts such as `preinstall`, `install`, `postinstall`, or `prepare` without explicit approval.
- Keep Phase 1 static-first. Do not implement real login, Supabase Auth, database clients, persistence, RLS runtime integration, real favorites, database-backed submission handling, comments, payments, or a large admin dashboard unless the user explicitly asks for Phase 2 work.
- The submit-place page may post to `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` in Phase 1C, but the repo must not store, email, moderate, or publish submission data directly.
- Only published Place entries may appear in public list and detail pages.

## Startup Readback

Before implementing an AWP-lite task, report:

- `cwd`
- current branch
- dirty state
- user-approved source of truth, such as the current request, local docs, or a GitHub issue if one was provided
- intended scope and explicit non-goals
- whether the task is Phase 1-safe or intentionally Phase 2
- routing choice and fallback reason if work stays with the controller
- planned validation, normally `pnpm test` and `pnpm build` when feasible

If any item cannot be confirmed, state the uncertainty before making changes.

## Required Worker Routing Readback

For every non-trivial autonomous work cycle, the controller must explicitly report worker routing before implementation.

The routing readback must include one of:

- `spark_worker_delegated`: Spark 5.3 or an equivalent low-cost worker was used.
- `controller_fallback_reason=worker_unavailable`: no Spark/equivalent worker was available in the runtime.
- `controller_fallback_reason=trivial_self_only`: the task is small enough that worker delegation would add overhead.
- `controller_fallback_reason=high_risk_controller_only`: the task touches auth, database, RLS, secrets, permissions, moderation, or other high-risk areas requiring controller ownership.

For non-trivial repo-wide scans, repetitive edits, docs/content transforms, route/link inventories, and first-pass validation summaries, Spark 5.3 is the preferred worker.

If Spark 5.3 is available and the task matches one of those categories, the controller should delegate that portion to Spark before implementation.

The controller remains responsible for:

- final scope control
- reviewing worker output
- validating changes
- PR quality
- merge safety

Worker unavailability must not block autonomous progress. If the worker is unavailable, record the fallback reason and continue as controller.

## Routing Plan

For AWP-lite work, produce a short routing plan before implementation:

- `source_of_truth`
- `this_change_will_do`
- `this_change_will_not_do`
- `research_owner`
- `implementation_owner`
- `validation_owner`
- `controller_decisions`
- `planned_validation`
- `controller_fallback_reason`, only when no worker or subagent is used

## Worker Profiles

AWP-lite uses a controller-worker model when multi-agent tooling is available. This is a routing policy, not a guarantee that the runtime can always select the exact model.

| Profile | Preferred model | Reasoning | Owns |
| --- | --- | --- | --- |
| `controller` | GPT-5.5 | Extra High | scope, architecture, Phase 1/Phase 2 boundaries, worker task definition, final review, validation, git/PR/merge decisions |
| `spark_worker` | Spark 5.3 | low / medium | repo-wide search, impact mapping, repetitive edits, docs/content transforms, route/link inventory, first-pass test or build failure summaries |
| `high_risk_reviewer` | GPT-5.5 | high / Extra High | auth, database, persistence, moderation, permissions, security, schema, and any decision that could move work into Phase 2 |

The controller may delegate execution to Spark 5.3, but the controller remains responsible for reading back the actual diff, checking scope, and running final validation. Do not treat a worker summary as completion evidence.

If Spark 5.3 is unavailable, use the closest low-cost worker if one exists. If no suitable worker is available, continue with controller fallback and record `controller_fallback_reason=worker_unavailable`.

Default routing:

| Work type | Default route |
| --- | --- |
| Small docs or single-surface content changes | controller with `controller_fallback_reason=trivial_self_only` |
| Repo-wide search, impact mapping, or duplicated pattern checks | Spark 5.3 `spark_worker` if available |
| Repetitive docs/content transforms | Spark 5.3 `spark_worker` if available, controller review |
| Astro route, layout, i18n, content collection, or UI behavior changes | Spark 5.3 `spark_worker` for bounded implementation if available, controller review |
| Tests, build failures, and regression investigation | Spark 5.3 `spark_worker` for first-pass summary if available, controller review |
| Phase 2 auth, database, favorites, submissions, moderation, or permissions | controller or high-reasoning review required |

For any non-trivial AWP-lite task, first consider Spark 5.3. If the controller does not delegate to Spark or another worker, it must include `controller_fallback_reason` in the routing plan.

## Implementation Rules

- Keep each change aligned to one clear product or documentation goal.
- Prefer existing Astro, TypeScript, Markdown, MDX, content collection, and i18n patterns.
- Do not expand an issue or user request into Phase 2 behavior unless explicitly authorized.
- Use structured content schemas and typed helpers instead of ad hoc parsing when practical.
- For visible UI changes, preserve target locale copy and avoid adding instructional text inside the app unless it belongs to the product experience.
- For place data, preserve the final enum values documented in `AGENTS.md`.
- For user-submitted place flows, keep email optional and private, and keep moderation as a future requirement.

## Validation

Before reporting completion, run when feasible:

```bash
pnpm test
pnpm build
```

For package, scaffold, workflow, or dependency-related changes, also confirm forbidden lockfiles were not introduced:

```bash
find . -maxdepth 2 \( -name package-lock.json -o -name yarn.lock -o -name bun.lock -o -name bun.lockb \) -print
```

If validation cannot run, explain why and report the remaining risk.

## Optional spec-injector

spec-injector is not required for TachiSuke AWP-lite. If a future task explicitly asks to use it:

- Treat it as local-only evidence.
- Do not commit `.spec-injector/`, spec output, private context, or task packages.
- If the CLI is unavailable or outdated, record `tool_gap=spec-injector unavailable` and continue with the manual AWP-lite checklist.

## Closeout

Final reports for AWP-lite work should stay concise and include:

- important changed files
- placeholder or Phase 1 status, when relevant
- validation commands and results
- known risks or skipped checks
- practical next steps only when they build on the completed work
