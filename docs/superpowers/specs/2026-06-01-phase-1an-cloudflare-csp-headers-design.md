# Phase 1AN Cloudflare CSP Headers Design

## Goal

Add a conservative Content Security Policy to the static Cloudflare Pages headers without breaking current static search, JSON-LD, or provider-agnostic external forms.

## Scope

- Add `Content-Security-Policy` to `public/_headers`.
- Keep scripts and styles limited to self plus current inline usage.
- Allow form posts to self and HTTPS external endpoints.
- Block object embeds and framing.

## Non-Goals

- No nonce/hash CSP rollout yet.
- No analytics or external script allowance.
- No backend form provider integration.
- No runtime Cloudflare Worker.

## Acceptance

- `pnpm check:seo` verifies the built `_headers` CSP directives.
- Existing static build, link, and SEO checks remain green.
