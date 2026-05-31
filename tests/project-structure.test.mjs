import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const locales = ["zh-tw", "en", "ja", "ko"];

const requiredFiles = [
  "AGENTS.md",
  "README.md",
  "astro.config.mjs",
  "tsconfig.json",
  "package.json",
  "pnpm-lock.yaml",
  "src/pages/index.astro",
  "src/content.config.ts",
  "src/components/layout/BaseLayout.astro",
  "src/components/layout/Header.astro",
  "src/components/layout/Footer.astro",
  "src/components/layout/ArticleLayout.astro",
  "src/components/layout/LocaleSwitcher.astro",
  "src/components/content/CategoryCard.astro",
  "src/components/places/PlaceCard.astro",
  "src/components/mobile/MobilePlanCard.astro",
  "src/components/favorites/FavoriteButtonPlaceholder.astro",
  "src/components/auth/LoginPrompt.astro",
  "src/types/locale.ts",
  "src/types/article.ts",
  "src/types/place.ts",
  "src/types/mobile-plan.ts",
  "src/types/favorite.ts",
  "src/types/user.ts",
  "src/types/submission.ts",
  "docs/PROJECT_SPEC.md",
  "docs/CONTENT_STRATEGY.md",
  "docs/ROADMAP.md",
  "docs/AUTH_AND_FAVORITES.md",
  "docs/DATABASE_DESIGN.md"
];

const requiredDirs = [
  "src/content/articles",
  "src/content/areas",
  "src/content/places",
  "src/content/mobile-plans",
  "src/content/tools",
  "src/lib/i18n",
  "src/lib/content",
  "src/lib/auth",
  "src/lib/db",
  "src/lib/favorites",
  "src/lib/submissions"
];

const localePages = [
  "index.astro",
  "articles/index.astro",
  "areas/index.astro",
  "places/index.astro",
  "mobile/index.astro",
  "tools/index.astro",
  "submit-place.astro",
  "about.astro",
  "account/login.astro",
  "account/favorites.astro",
  "account/submissions.astro"
];

describe("TachiSuke project scaffold", () => {
  it("contains the required documents, source files, and locale routes", () => {
    for (const file of requiredFiles) {
      assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
    }

    for (const dir of requiredDirs) {
      assert.equal(existsSync(join(root, dir)), true, `${dir} should exist`);
    }

    for (const locale of locales) {
      for (const page of localePages) {
        const route = `src/pages/${locale}/${page}`;
        assert.equal(existsSync(join(root, route)), true, `${route} should exist`);
      }
    }
  });

  it("uses pnpm only for JavaScript package management", () => {
    assert.equal(existsSync(join(root, "package-lock.json")), false, "package-lock.json must not exist");
    assert.equal(existsSync(join(root, "yarn.lock")), false, "yarn.lock must not exist");
    assert.equal(existsSync(join(root, "bun.lock")), false, "bun.lock must not exist");
    assert.equal(existsSync(join(root, "bun.lockb")), false, "bun.lockb must not exist");

    const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    assert.match(packageJson.packageManager, /^pnpm@10/);
    assert.equal(packageJson.scripts.preinstall, undefined);
  });
});
