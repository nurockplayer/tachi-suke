# Phase 1P Detail Page Correction Prompts Design

## Goal

Connect public detail pages to the Phase 1O contact/corrections workflow so readers can easily report outdated information, broken links, unclear copy, or missing context from the page they are reading.

This improves maintainability and public trust without adding backend storage, login, analytics, or provider-specific behavior.

## Scope

- Add a reusable `CorrectionPrompt` component.
- Show the prompt on public detail surfaces:
  - Article detail pages
  - Place detail pages
  - Mobile plan detail pages
  - Area detail pages
  - Tool detail pages
- Link the prompt to the locale-specific `/[locale]/contact` route.
- Keep copy localized for `zh-tw`, `en`, `ja`, and `ko`.
- Update source-level tests and docs.

## UX Requirements

The prompt should be short and calm:

- Make it clear that readers can report outdated details, broken links, or unclear information.
- Avoid implying instant support, guaranteed replies, or real-time verification.
- Use the existing static contact/corrections route rather than adding a new form.
- Fit comfortably into long-form reading pages without becoming a marketing block.

## Non-Goals

- Do not prefill forms with JavaScript.
- Do not add analytics.
- Do not add a database-backed correction queue.
- Do not add account-based reporting.
- Do not add provider-specific form behavior.
