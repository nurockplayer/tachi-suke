# Phase 1U Visible Breadcrumbs Design

## Objective

Improve public-site navigation and SEO clarity by adding visible, accessible breadcrumbs to nested public pages. JSON-LD breadcrumbs already exist on several detail pages, but users currently do not get a consistent on-page trail.

## Scope

Add breadcrumbs to:

- Article detail pages
- Article category landing pages
- Place detail pages
- Mobile plan detail pages
- Area detail pages
- Tool detail pages

Add conservative JSON-LD to article category pages:

- `WebPage`
- `BreadcrumbList`

## Non-goals

- No database work.
- No login, favorites, or submission persistence.
- No route changes.
- No new dependency.
- No analytics or personalization.

## UX Rules

- Breadcrumbs must be visible near the top of each page, before the page title.
- Breadcrumb labels must be locale-aware.
- Parent breadcrumb items link to existing public routes.
- Current page item uses `aria-current="page"` and is not a link.
- Breadcrumbs must not replace the global navigation.

## SEO Rules

- Article detail breadcrumb JSON-LD should include the category page when a category landing page exists.
- Category pages should expose `WebPage` and `BreadcrumbList` JSON-LD.
- Structured data must not invent unavailable facts such as ratings, review counts, offers, opening hours, or exact addresses.

## Acceptance

- Source tests confirm a shared breadcrumb component exists and is imported by nested public pages.
- Post-build SEO tests confirm representative pages render visible breadcrumbs.
- Existing `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` all pass.
