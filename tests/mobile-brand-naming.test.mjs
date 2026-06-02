import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const locales = ["zh-tw", "en", "ja", "ko"];
const expectedProvidersBySlug = new Map([
  ["povo2", "povo"],
  ["linemo-best-plan", "LINEMO"],
  ["rakuten-saikyo-plan", "Rakuten Mobile"],
  ["ahamo", "ahamo"],
  ["uq-mobile", "UQ mobile"]
]);
const invalidCarrierCasing = ["Povo", "Linemo", "rakuten mobile", "Ahamo", "UQ Mobile"];
const nonEnglishLocales = ["zh-tw", "ja", "ko"];
const oldEnglishMobilePhrases = [
  "base fee",
  "confirm current",
  "Official website information",
  "flexible data toppings",
  "online signup",
  "credit card",
  "bank transfer",
  "identity verification",
  "people who",
  "users who",
  "recommended for"
];

function listFiles(relativeDir, extensions) {
  return readdirSync(join(root, relativeDir), { withFileTypes: true }).flatMap((entry) => {
    const relativePath = `${relativeDir}/${entry.name}`;
    if (entry.isDirectory()) return listFiles(relativePath, extensions);
    return extensions.some((extension) => entry.name.endsWith(extension)) ? [relativePath] : [];
  });
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function localeMarker(locale) {
  return locale === "zh-tw" ? `${JSON.stringify(locale)}: {` : `${locale}: {`;
}

function contentBlocksForLocale(source, locale) {
  const marker = localeMarker(locale);
  const blocks = [];
  let start = source.indexOf(marker);

  while (start !== -1) {
    const nextLocaleStarts = locales
      .filter((candidate) => candidate !== locale)
      .map((candidate) => source.indexOf(localeMarker(candidate), start + marker.length))
      .filter((index) => index !== -1);
    const end = nextLocaleStarts.length > 0 ? Math.min(...nextLocaleStarts) : source.length;
    blocks.push(source.slice(start, end));
    start = source.indexOf(marker, start + marker.length);
  }

  return blocks;
}

describe("mobile carrier naming and localized copy", () => {
  it("keeps mobile plan providers in the approved carrier casing", () => {
    const plans = listFiles("src/content/mobile-plans", [".json"]).map(readJson);
    assert.equal(plans.length, expectedProvidersBySlug.size, "mobile plan provider list should stay intentionally small in this phase");

    for (const plan of plans) {
      assert.equal(
        plan.provider,
        expectedProvidersBySlug.get(plan.slug),
        `${plan.slug} provider should use the approved carrier casing`
      );
    }
  });

  it("rejects obvious invalid carrier casing in mobile-related sources", () => {
    const mobileRelatedFiles = [
      ...listFiles("src/content/mobile-plans", [".json"]),
      ...listFiles("src/content/articles", [".md", ".mdx"]).filter((path) => {
        const source = read(path);
        return /category:\s+"mobile"|\/mobile|povo|LINEMO|Rakuten Mobile|ahamo|UQ mobile/.test(source);
      }),
      "src/components/mobile/MobilePlanCard.astro",
      "src/components/pages/LocaleHomePage.astro",
      "src/components/pages/MobileIndexPage.astro",
      "src/components/pages/MobilePlanDetailPage.astro",
      "src/lib/content/mobile-plan-copy.ts",
      "src/lib/content/search.ts",
      "docs/CONTENT_MODEL.md",
      "docs/I18N_COMPLETENESS.md"
    ];

    for (const relativePath of mobileRelatedFiles) {
      const source = read(relativePath);
      for (const invalidName of invalidCarrierCasing) {
        assert.equal(
          source.includes(invalidName),
          false,
          `${relativePath} should not use invalid carrier casing "${invalidName}"`
        );
      }
    }
  });

  it("keeps localized mobile display copy for every published plan and non-English locale", () => {
    const helper = read("src/lib/content/mobile-plan-copy.ts");

    for (const slug of expectedProvidersBySlug.keys()) {
      assert.ok(
        helper.includes(`${JSON.stringify(slug)}:`) || helper.includes(`${slug}:`),
        `mobile display copy should cover ${slug}`
      );
    }

    for (const locale of nonEnglishLocales) {
      const localeBlocks = contentBlocksForLocale(helper, locale);
      assert.equal(
        localeBlocks.length,
        expectedProvidersBySlug.size,
        `mobile display copy should include ${locale} copy for every published plan`
      );
      for (const localeBlock of localeBlocks) {
        for (const phrase of oldEnglishMobilePhrases) {
          assert.equal(
            localeBlock.toLowerCase().includes(phrase.toLowerCase()),
            false,
            `${locale} mobile display copy should not contain old English phrase "${phrase}"`
          );
        }
      }
    }
  });
});
