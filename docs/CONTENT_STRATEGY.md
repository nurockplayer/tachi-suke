# Content Strategy

## 內容定位

TachiSuke content should help users make decisions about life in Japan. Prefer comparison, checklists, warnings, decision trees, concrete examples, and foreign-resident-friendly explanations.

Avoid generic sightseeing articles, vague lifestyle writing, unmoderated public reviews, and content that makes the product Taiwan-only.

## 內容分類

- Mobile plans and connectivity
- Renting and housing
- City and neighborhood guides
- Food, restaurants, and everyday shopping
- Transportation and commuting
- Administrative procedures
- Practical Japanese phrases
- Job hunting and working in Japan
- Community-recommended places
- Tools and checklists

## 多語系內容策略

- All content should include `locale` and `translationKey`.
- Traditional Chinese and English are the first content priorities.
- Japanese and Korean can start with shorter starter pages.
- Missing translations should fall back to English, then Traditional Chinese.
- Each locale should use natural local wording instead of literal translation.

## 首批 20 篇文章題目

1. 台灣人剛到日本，手機門號怎麼選？
2. How to Choose a Mobile Plan in Japan as a Foreigner
3. 外国人が日本で携帯プランを選ぶときの基本
4. 외국인이 일본에서 휴대폰 요금제를 고르는 기본
5. 日本租屋前要先知道的初期費用
6. Tokyo Neighborhood Guide for First-Time Residents
7. 留學生在日本辦銀行帳戶前的準備清單
8. 日本通勤路線怎麼看：電車、轉乘與定期券
9. 外國人在日本找房常見陷阱
10. 便利商店、超市、藥妝店：剛到日本怎麼買生活用品
11. 日本手機方案比較：大手、格安 SIM、eSIM
12. What to Do in Your First Week After Moving to Japan
13. 住民票、在留卡、My Number 的基本差異
14. 日本外食預算怎麼抓：連鎖店、食堂、家庭餐廳
15. Practical Japanese Phrases for Renting an Apartment
16. 日本打工與正職求職前要知道的用語
17. Osaka Area Guide for New Residents
18. Fukuoka Life Guide for International Students
19. 子育て世帯が日本で住むエリアを選ぶときの基本
20. 한국인이 일본에서 집을 구할 때 확인할 것

## Article Format

Recommended article structure:

- Short answer summary
- Who this guide is for
- Decision criteria
- Comparison table or checklist
- Common pitfalls
- Recommended next steps
- Related content

## Phase 1B Content Baseline

Phase 1B adds a public-preview content baseline:

- `zh-tw`: mobile plan basics, mobile brand comparison, renting initial costs, family restaurant comparison, and first-week setup
- `en`: mobile plan basics, mobile brand comparison, and first-week setup
- `ja`: mobile plan basics and first-week setup
- `ko`: mobile plan basics and first-week setup

All Phase 1B articles should remain decision-oriented and include internal links to relevant locale sections or related articles.

## Place Content

Place content should focus on practical daily-life usefulness:

- Solo-friendly status
- Non-smoking status
- Japanese difficulty
- Payment methods
- Price range
- Nearest station
- Why the place is useful for residents

User-submitted places must be moderated and normalized before publication.

Public Place pages now exist at `/[locale]/places/[slug]`. Place body data can remain locale-neutral in Phase 1, but UI labels must be localized by locale.

Final Place enum values:

- `soloFriendly`: `yes`, `maybe`, `no`, `unknown`
- `nonSmokingStatus`: `confirmed_non_smoking`, `separated_smoking_area`, `smoking_allowed`, `unknown`
- `japaneseDifficulty`: `easy`, `normal`, `hard`, `unknown`
- `source`: `editor`, `user_submission`, `official`
- `status`: `draft`, `pending_review`, `published`, `rejected`, `archived`

Only `published` places are public. `draft`, `pending_review`, `rejected`, and `archived` must stay out of public lists and detail pages.

## SEO Priorities

Use readable slugs, clear metadata, semantic headings, locale-aware URLs, and useful internal linking. Prioritize content that answers high-intent questions about living in Japan rather than broad tourist discovery.

Article detail routes use article descriptions for SEO metadata. Place detail routes generate descriptions from name, category, location, and price range.

Mobile plan content is time-sensitive. Pricing, campaigns, eligibility, and application rules must be framed as changeable and should point users back to official carrier pages before applying.
