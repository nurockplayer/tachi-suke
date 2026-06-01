# Phase 1CG Job Application Documents Tool Design

## Goal

Add a static multilingual checklist that helps foreign residents in Japan prepare common job-search and onboarding documents before applying or responding to an offer.

## Problem

TachiSuke already has work contract basics articles, but readers still need a practical preparation tool for the step before and during job application: organizing resume materials, residence-status checks, identity documents, contact details, bank/tax/social-insurance notes, and safe submission practices. Missing or mismatched documents can delay interviews, offers, or onboarding.

## Scope

- Add one published `tools` collection entry for a job application documents checklist.
- Provide natural `zh-tw`, `en`, `ja`, and `ko` title, description, source note, notes, and checklist sections.
- Keep the tool static, editorial, and checklist-oriented.
- Add source-level and build-output expectations so the tool appears in generated public routes and sitemap output.
- Update public docs that list the published static checklist tools.

## Non-Goals

- No job board, employer review, recruiter workflow, resume builder, application tracker, or saved checklist state.
- No legal, tax, immigration, or labor-law advice.
- No document upload, storage, parsing, translation, or validation.
- No account login, Supabase, database persistence, RLS, real favorites, native submissions, or moderation workflow.
- No external dependency or route-structure change.

## Content Direction

The checklist should cover:

- resume and career-history preparation;
- residence status, work permission, and identity checks;
- interview and offer-stage documents;
- onboarding basics such as bank account, My Number, tax, and social-insurance questions;
- safe submission hygiene for sensitive documents.

Official sources should be used as confirmation starting points, not as a claim that one document set applies to every employer or visa status.

## Acceptance

- `src/content/tools/japan-job-application-documents-checklist.json` exists and has `status = published`.
- The tool has complete four-locale localized fields and at least four practical sections.
- The tool includes source links to official Japanese government information relevant to employment and residence/work permission.
- The sitemap includes representative locale detail routes for the new tool.
- README, implementation status, content model, page spec, project spec, roadmap, and acceptance criteria mention the new static tool where published tool lists or criteria are enumerated.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
