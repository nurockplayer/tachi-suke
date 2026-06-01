# Phase 1AW Ward Office Moving-In Articles Design

## Problem

TachiSuke has a useful ward office moving-in checklist tool, but users often search for procedural explanations before they know a checklist exists. The site needs indexable, decision-oriented articles that explain how to prepare for municipal-office moving-in procedures in each supported locale.

## Scope

Add four public articles, one per locale, focused on ward/city office moving-in setup after arriving in Japan or moving within Japan. Articles should connect the first-week setup, residence administration basics, the ward-office checklist tool, and practical next steps.

## Non-Goals

- Do not provide legal, immigration, tax, pension, or administrative advice.
- Do not promise universal deadlines or required documents.
- Do not add appointment booking, account features, database storage, or backend forms.
- Do not add a new content schema.

## Acceptance

- Four articles share `translationKey = ward-office-moving-in-procedures`.
- Article category remains `procedures`.
- Articles link to the ward office moving-in checklist tool and residence administration basics.
- Source tests validate article counts, per-locale thresholds, and expected slugs.
- SEO output tests validate sitemap and RSS inclusion for representative new URLs.
