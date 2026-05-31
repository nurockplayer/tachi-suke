# Phase 1D SEO Launch Readiness Design

## Objective

Make TachiSuke easier to discover, index, preview, and deploy as a static multilingual information site before adding dynamic product features.

## Decision

Keep Astro as the frontend framework for now. TachiSuke is currently a content-first, static-first site, and Astro already fits the SEO and Cloudflare Pages deployment target well. A Next.js migration should wait until the product has a concrete SSR requirement, such as authenticated account pages, personalized saved lists, or server-side submission workflows.

## Scope

This phase adds launch-readiness infrastructure:

- `sitemap.xml` generated from static routes and content collections.
- `robots.txt` generated from `SITE_URL`, pointing crawlers to the sitemap and keeping placeholder account pages out of public indexing.
- `site.webmanifest` for install/identity metadata.
- A default Open Graph image and richer social metadata in `BaseLayout`.
- Cloudflare Pages `_headers` for conservative security and caching defaults.
- Build-output SEO checks that run after `pnpm build`.

## Non-Goals

This phase does not add authentication, Supabase, PostgreSQL, real favorites, user-specific pages, a moderation dashboard, or provider-specific form handling. It also does not migrate from Astro to Next.js.

## SEO Rules

Public content pages should be indexable by default. Placeholder account pages should remain accessible for route readiness but should not be encouraged for indexing.

The sitemap must include:

- Root and locale home pages.
- Locale index pages for articles, areas, places, mobile plans, tools, submit-place, and about.
- Public article detail pages where `draft` is false.
- Public place detail pages where `status` is `published`.
- Area and mobile plan detail pages.
- Submit-place thanks pages, because form providers may redirect users there.

The sitemap must not include:

- Draft articles.
- Non-published places.
- Account placeholder routes.

## Cloudflare Deployment Notes

The MVP should deploy as static output on Cloudflare Pages. Deployment should set `SITE_URL` to the production domain. `PUBLIC_SUBMIT_PLACE_FORM_ENDPOINT` remains optional; without it, submit-place stays in preview mode.

The `_headers` file should stay conservative and static-friendly:

- Basic browser hardening headers.
- Long cache for immutable Astro assets.
- Short cache for HTML/XML/TXT/manifest files.

## Acceptance Criteria

- `pnpm test` verifies source-level SEO files and metadata hooks.
- `pnpm build` generates `dist/sitemap.xml`, `dist/robots.txt`, and `dist/site.webmanifest`.
- `pnpm check:seo` verifies built SEO output and sitemap exclusions.
- `pnpm check:links` still passes.
- README and docs describe the launch-readiness workflow and Cloudflare environment variables.
