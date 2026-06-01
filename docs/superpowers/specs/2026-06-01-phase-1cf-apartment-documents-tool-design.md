# Phase 1CF Apartment Documents Tool Design

## Goal

Add a static multilingual checklist that helps foreign residents prepare documents before applying for an apartment in Japan.

## Problem

TachiSuke already covers rent initial costs, apartment viewing phrases, moving in, and moving out. The current tools do not yet cover the document-preparation step between choosing a listing and submitting a rental application. This is a common decision point for newcomers because missing identity, income, emergency contact, school, employer, or guarantor-related documents can delay or derail an application.

## Scope

- Add one published `tools` collection entry for an apartment application documents checklist.
- Provide natural `zh-tw`, `en`, `ja`, and `ko` title, description, source note, notes, and checklist sections.
- Keep the tool static, editorial, and checklist-oriented.
- Add source-level and build-output expectations so the tool appears in generated public routes and sitemap output.
- Update public docs that list the published static checklist tools.

## Non-Goals

- No real document upload or storage.
- No legal, immigration, or contract advice.
- No account login, saved checklist state, Supabase, database persistence, RLS, or moderation workflow.
- No external dependency or route-structure change.

## Acceptance

- `src/content/tools/apartment-application-documents-checklist.json` exists and has `status = published`.
- The tool has complete four-locale localized fields and at least four practical sections.
- The sitemap includes representative locale detail routes for the new tool.
- README, implementation status, and roadmap mention the new static tool.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
