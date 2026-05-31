# Phase 1L Accessibility Polish Design

## Objective

Improve baseline keyboard and assistive-technology usability for the static site without changing route structure or visual direction.

## Decision

Add a skip link to the main content, give the main landmark a stable target, expose active primary navigation with `aria-current`, and add visible focus styles for interactive elements.

## Scope

This phase adds:

- Skip link at the top of `BaseLayout`.
- `id="main-content"` on the main landmark.
- Active primary navigation state in `Header`.
- Visible `:focus-visible` styles and skip-link CSS.
- Source-level tests for the accessibility structure.

## Non-Goals

This phase does not run a full accessibility audit, add automated axe/Playwright dependencies, change visual design direction, or solve all copy/reading-level concerns.

## Acceptance Criteria

- `pnpm test` fails before implementation when accessibility hooks are absent.
- Keyboard users can jump directly to main content.
- Primary navigation exposes the current section.
- Focus states are visible without layout shift.
- Existing build, link, and SEO checks remain green.
