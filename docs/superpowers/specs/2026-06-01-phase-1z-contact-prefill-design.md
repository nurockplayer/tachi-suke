# Phase 1Z Contact Prefill Design

## Objective

Make content correction reports more actionable by carrying the current public detail page URL into the contact/corrections form.

## Scope

- Public detail pages keep the existing correction prompt.
- Correction prompt links include a `relatedUrl` query parameter when the current page is known.
- The `relatedUrl` value should be an absolute site URL so the contact form's URL input remains valid.
- Contact pages remain static and read the query parameter in browser JavaScript.
- The related page URL field is prefilled when `relatedUrl` is present.

## Non-goals

- No backend contact storage.
- No database.
- No Supabase.
- No login requirement.
- No moderation dashboard.
- No external provider-specific redirect or form behavior changes.
- No analytics event tracking.

## UX Rules

- Readers should still be able to open `/[locale]/contact` directly without a query parameter.
- Detail-page correction prompts should link to `/[locale]/contact?relatedUrl=...`.
- The contact form should not auto-submit and should not change endpoint behavior.
- Prefill should be progressive enhancement: if JavaScript is unavailable, the form still renders normally.

## Acceptance

- Source tests verify correction prompts build a `relatedUrl` query parameter and detail pages pass the current path.
- Source tests verify the contact page reads `relatedUrl` with `URLSearchParams` and targets the related URL input.
- Build-output SEO tests verify a representative detail page links to contact with an encoded absolute `relatedUrl`.
- Build-output SEO tests verify the contact page includes the prefill script hook.
- Existing source, content, build, link, and SEO checks pass.
