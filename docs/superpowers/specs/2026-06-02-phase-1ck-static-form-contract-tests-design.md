# Phase 1CK Static Form Contract Tests Design

## Goal

Add a small source-level quality gate that protects the Phase 1 static form behavior for submit-place and contact/corrections.

## Scope

- Verify `.env.example` documents both form endpoint variables.
- Verify submit-place remains a provider-agnostic static `POST` form controlled by `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT`.
- Verify contact/corrections remains a provider-agnostic static `POST` form controlled by `PUBLIC_CONTACT_FORM_ENDPOINT`.
- Verify preview mode keeps submit disabled when endpoints are unset.
- Verify hidden classification, redirect, moderation, privacy, and locale fields remain present.
- Verify honeypot fields remain visually hidden, skipped by keyboard focus, and autocomplete-disabled.
- Verify required fields and URL/email input types remain present.

## Non-Goals

- No runtime behavior changes.
- No new provider-specific endpoint.
- No captcha dependency.
- No login, Supabase, database, native submission storage, support queue, or moderation dashboard.
- No visual redesign.

## Acceptance

- `pnpm test` includes the form contract tests.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
