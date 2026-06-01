# Phase 1AV Apartment Viewing Phrase Articles Design

## Problem

The new apartment-viewing phrase tool is useful as a checklist, but users often discover practical Japanese content through article search queries. TachiSuke also needs a dedicated article category for practical language content rather than folding all language topics into housing.

## Scope

Add four public articles, one per locale, explaining how to use Japanese phrases during apartment viewings and rental inquiries. Add localized `language` article category labels and descriptions.

## Non-Goals

- Do not add audio pronunciation.
- Do not add flashcards or saved learning progress.
- Do not change the tools schema.
- Do not treat phrase guidance as contract translation or legal advice.

## Acceptance

- Four articles share `translationKey = apartment-viewing-japanese-phrases`.
- Article category helper has localized `language` title and description copy.
- The articles link to the apartment-viewing phrase tool and rent initial-cost checklist.
- Source tests validate article counts, language category copy, and expected slugs.
- SEO output tests validate representative sitemap and RSS inclusion.
