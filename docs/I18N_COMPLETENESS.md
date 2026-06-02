# I18N Completeness Notes

TachiSuke currently uses locale-prefixed static routes for `zh-tw`, `en`, `ja`, and `ko`. Public page chrome, navigation, search UI, article metadata, tools, and the main section copy are localized. Article and tool content use localized entries, while some shared editorial data remains locale-neutral and is rendered through localized display helpers when needed.

## Mobile Content Status

Mobile plan routes are static and generated from `src/content/mobile-plans`. The base JSON schema remains locale-neutral in Phase 1, but visible mobile plan copy for cards, detail pages, and search entries is localized through `src/lib/content/mobile-plan-copy.ts`.

Localized mobile surfaces currently include:

- `/[locale]/mobile`
- `/[locale]/mobile/[slug]`
- homepage mobile plan cards
- mobile plan search result titles, descriptions, tags, and search text
- mobile basics articles in all four locales
- mobile brand comparison articles in all four locales

## Carrier Naming Convention

Use these carrier brand names exactly:

- povo
- LINEMO
- Rakuten Mobile
- ahamo
- UQ mobile

Do not translate these carrier brand names and do not create localized naming variants.

## Intentional English

The following English or Latin-script terms are intentional in localized mobile content:

- TachiSuke
- carrier brand names listed above
- official plan names currently stored in mobile plan JSON
- network or adjacent service labels when used as brand names, such as SoftBank, docomo, au, Paidy, PayPay, and Rakuten Points
- mobile technical terms commonly used in product copy, such as SIM, eSIM, GB, app, and povo topping
- URLs, email addresses, form field names, hidden field names, schema enum values, code identifiers, package/script names, and Open Graph or JSON-LD technical metadata
- test-only strings

## Remaining Gaps

The mobile plan content model does not yet store fully localized fields in JSON. The current display helper is a Phase 1-safe bridge that avoids visible English leftovers without redesigning the schema.

Future localization work could move `monthlyPrice`, `dataAmount`, `paymentRequirements`, `pros`, `cons`, `recommendedFor`, `sourceNote`, and `notes` into localized schema fields when editorial workflow and review capacity justify it. That future work should keep official-source reminders, `lastCheckedAt`, and carrier naming tests in place.
