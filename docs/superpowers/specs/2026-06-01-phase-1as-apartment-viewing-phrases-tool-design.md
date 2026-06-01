# Phase 1AS Apartment Viewing Japanese Phrases Tool Design

## Problem

Foreign residents comparing apartments in Japan often understand cost concepts but still struggle during viewings and contract conversations because the practical Japanese is unfamiliar. TachiSuke already has rental initial-cost articles and a rent cost checklist, but it lacks a phrase-focused static tool for asking basic housing questions.

## Scope

Add one published static tool for apartment viewing and rental inquiry Japanese phrases. It should use the existing tools collection and detail page, without changing schema or adding runtime behavior.

## Non-Goals

- Do not add saved checklist state.
- Do not add a phrase search engine or audio playback.
- Do not add backend storage, auth, or database work.
- Do not present phrases as legal advice or a substitute for understanding the contract.

## Content Shape

The tool should have localized title, description, source note, notes, and sections. Checklist items can contain the practical Japanese phrase plus the meaning or use case in the user locale. Keep phrases focused on:

- Viewing appointment basics
- Fees and contract terms
- Move-in conditions and equipment
- Application and communication follow-up

## Acceptance

- A published tool exists at slug `apartment-viewing-japanese-phrases`.
- `/[locale]/tools/apartment-viewing-japanese-phrases` is generated for all four locales.
- Source tests require at least five published tools and the new slug.
- SEO output tests verify representative sitemap entries.
- Rental initial-cost articles link to the new tool where useful.
