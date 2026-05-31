# Phase 1AO Security.txt Design

## Goal

Expose a standard security contact file for static deployment so security researchers and automated tools can find the current public reporting route.

## Scope

- Add `/.well-known/security.txt` as a static Astro endpoint.
- Use the existing English contact/corrections page as the contact URL.
- Include canonical URL, preferred languages, policy URL, and a generated future expiration date.
- Add a conservative Cloudflare cache header.

## Non-Goals

- No new support backend.
- No private vulnerability tracker.
- No guaranteed response SLA.
- No committed personal email address.

## Acceptance

- `pnpm test` verifies the route file exists.
- `pnpm check:seo` verifies built `security.txt` content and cache header.
