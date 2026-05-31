# Phase 1O Contact and Corrections Workflow Design

## Goal

Add a static-first contact and corrections workflow so readers can report outdated information, broken links, unclear copy, or general feedback before TachiSuke has a backend.

This is a launch-readiness feature. It gives the public site a trust and maintenance channel without implementing login, database storage, moderation tooling, or a provider-specific form integration.

## Scope

- Add locale routes:
  - `/[locale]/contact`
  - `/[locale]/contact/thanks`
- Add a provider-agnostic environment variable:
  - `PUBLIC_CONTACT_FORM_ENDPOINT`
- If the endpoint is unset, keep the form in preview mode with disabled submit.
- If the endpoint is set, submit via static `POST` to the configured endpoint.
- Include hidden fields for provider routing:
  - `formName`
  - `source`
  - `locale`
  - `redirectUrl`
  - `publicResponse`
- Add a simple honeypot field for basic spam reduction.
- Link the contact page from the footer and sitemap.
- Update docs and tests.

## Form Requirements

Required fields:

- Contact language
- Topic
- Message

Optional fields:

- Related page URL
- Name or nickname
- Email

The page must explain:

- Email is optional and private.
- Users should not send sensitive personal information.
- TachiSuke may use reports to correct or update public content.
- The form does not guarantee an individual response.
- This is a static external endpoint integration, not an internal support system.

## Non-Goals

- Do not implement email sending in this repo.
- Do not store contact messages in the repo.
- Do not add a database client.
- Do not add authentication.
- Do not hard-code Formspree, Netlify Forms, Google Forms, Cloudflare Workers, or any provider URL.
- Do not add captcha or large anti-spam dependencies.
