# Phase 1M Launch Trust Pages Design

## Goal

Add multilingual static trust pages that make the site safer to preview publicly before any backend or auth work exists.

## Scope

- Add `/[locale]/privacy`.
- Add `/[locale]/editorial-policy`.
- Link both pages from the footer.
- Include both page types in the sitemap.
- Keep account placeholders out of the sitemap.
- Keep the pages static and content-first.

## Content Requirements

Privacy pages should explain:

- TachiSuke is currently a static information site.
- Submit-place may post to an external endpoint when configured.
- Email, if submitted, is optional/private and not published.
- Users should not submit personal or sensitive information.
- Future auth/database work will require a fuller privacy review.

Editorial policy pages should explain:

- TachiSuke is a life decision guide, not an unmoderated review site.
- Mobile plan, area, and place information can change.
- Users should confirm official sources before applying or visiting.
- User-submitted places require manual moderation and normalization.
- Corrections should be welcomed through future contact/submission flows.

## Non-Goals

- Do not add cookie banners.
- Do not add analytics.
- Do not implement backend storage.
- Do not implement account data or favorites.
- Do not add legal-heavy wording that pretends to be final counsel.
