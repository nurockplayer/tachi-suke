# Phase 1N Rent Initial Cost Tool Design

## Goal

Add a second static checklist tool focused on Japan rental initial costs. This improves the tools section's SEO surface and gives users a practical housing decision aid without requiring login, saved state, or a backend.

## Scope

- Add one published `tools` collection entry.
- Slug: `japan-rent-initial-cost-checklist`.
- Provide localized title, description, source note, notes, and checklist sections for `zh-tw`, `en`, `ja`, and `ko`.
- Keep the page static and checklist-based.
- Update tests and docs to reflect at least two published static tools.

## Content Requirements

The tool should help users:

- Understand common initial cost categories.
- Separate required costs from negotiable or property-specific costs.
- Prepare cash flow before applying.
- Confirm official estimates and contract documents before paying.

Cost examples can mention common Japanese renting terms such as:

- 敷金 / deposit
- 礼金 / key money
- 仲介手数料 / agency fee
- 前家賃 / advance rent
- 管理費 / management fee
- 保証会社 / guarantor company fee
- 火災保険 / fire insurance
- 鍵交換 / lock change

## Non-Goals

- Do not build a calculator with saved input.
- Do not provide legal advice.
- Do not claim exact prices or universal fee rules.
- Do not add auth, database, analytics, or large dependencies.
