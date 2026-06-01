import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { getArticleCategorySummaries } from "@/lib/content/article-categories";
import { htmlLangByLocale, locales, localizePath, type Locale } from "@/lib/i18n";

export const prerender = true;

interface SitemapEntry {
  path: string;
  lastmod?: Date;
  alternates?: SitemapAlternates;
}

type SitemapAlternates = Partial<Record<Locale | "x-default", string>>;

const localeIndexPaths = [
  "/",
  "/articles",
  "/areas",
  "/places",
  "/mobile",
  "/tools",
  "/submit-place",
  "/submit-place/thanks",
  "/contact",
  "/contact/thanks",
  "/about",
  "/privacy",
  "/editorial-policy",
  "/site-map"
];

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function uniqueEntries(entries: SitemapEntry[]): SitemapEntry[] {
  const byPath = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    byPath.set(entry.path, entry);
  }

  return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
}

function newestDate(current: Date | undefined, next: Date): Date {
  return !current || next > current ? next : current;
}

function newestOptionalDate(...dates: Array<Date | undefined>): Date | undefined {
  return dates.reduce<Date | undefined>((current, next) => next ? newestDate(current, next) : current, undefined);
}

function localizedAlternates(path: string): SitemapAlternates {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localizePath(locale, path)])),
    "x-default": localizePath("en", path)
  };
}

function renderAlternates(alternates: SitemapAlternates | undefined, siteUrl: URL): string {
  if (!alternates) return "";

  return Object.entries(alternates)
    .map(([locale, path]) => {
      const hreflang = locale === "x-default" ? locale : htmlLangByLocale[locale as Locale];
      const href = new URL(path, siteUrl).href;
      return `\n    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`;
    })
    .join("");
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  const areas = await getCollection("areas");
  const mobilePlans = await getCollection("mobile-plans");
  const places = await getCollection("places", ({ data }) => data.status === "published");
  const tools = await getCollection("tools", ({ data }) => data.status === "published");
  let newestArticleUpdatedAt: Date | undefined;
  const newestArticleUpdatedAtByLocale = new Map<Locale, Date>();
  let newestAreaLastCheckedAt: Date | undefined;
  let newestMobileLastCheckedAt: Date | undefined;
  let newestPlaceUpdatedAt: Date | undefined;
  let newestToolLastCheckedAt: Date | undefined;

  for (const article of articles) {
    newestArticleUpdatedAt = newestDate(newestArticleUpdatedAt, article.data.updatedAt);
    newestArticleUpdatedAtByLocale.set(
      article.data.locale,
      newestDate(newestArticleUpdatedAtByLocale.get(article.data.locale), article.data.updatedAt)
    );
  }

  for (const area of areas) {
    newestAreaLastCheckedAt = newestDate(newestAreaLastCheckedAt, area.data.lastCheckedAt);
  }

  for (const plan of mobilePlans) {
    newestMobileLastCheckedAt = newestDate(newestMobileLastCheckedAt, plan.data.lastCheckedAt);
  }

  for (const place of places) {
    newestPlaceUpdatedAt = newestDate(newestPlaceUpdatedAt, place.data.updatedAt);
  }

  for (const tool of tools) {
    newestToolLastCheckedAt = newestDate(newestToolLastCheckedAt, tool.data.lastCheckedAt);
  }

  const entries: SitemapEntry[] = [
    { path: "/" },
    { path: "/feed.xml", lastmod: newestArticleUpdatedAt }
  ];

  for (const locale of locales) {
    const newestLocaleArticleUpdatedAt = newestArticleUpdatedAtByLocale.get(locale);
    const siteMapLastmod = newestOptionalDate(
      newestLocaleArticleUpdatedAt,
      newestAreaLastCheckedAt,
      newestMobileLastCheckedAt,
      newestPlaceUpdatedAt,
      newestToolLastCheckedAt
    );
    const localeIndexLastmodByPath = new Map<string, Date | undefined>([
      ["/articles", newestLocaleArticleUpdatedAt],
      ["/areas", newestAreaLastCheckedAt],
      ["/places", newestPlaceUpdatedAt],
      ["/mobile", newestMobileLastCheckedAt],
      ["/tools", newestToolLastCheckedAt],
      ["/site-map", siteMapLastmod]
    ]);

    entries.push({
      path: localizePath(locale, "/feed.xml"),
      lastmod: newestLocaleArticleUpdatedAt
    });

    for (const path of localeIndexPaths) {
      entries.push({
        path: localizePath(locale, path),
        lastmod: localeIndexLastmodByPath.get(path),
        alternates: localizedAlternates(path)
      });
    }

    const categorySummaries = await getArticleCategorySummaries(locale);
    for (const category of categorySummaries) {
      entries.push({
        path: localizePath(locale, `/articles/category/${category.slug}`),
        lastmod: category.updatedAt
      });
    }
  }

  const articleAlternatesByTranslationKey = new Map<string, SitemapAlternates>();
  for (const article of articles) {
    const existing = articleAlternatesByTranslationKey.get(article.data.translationKey) ?? {};
    existing[article.data.locale] = localizePath(article.data.locale, `/articles/${article.data.slug}`);
    if (article.data.locale === "en") {
      existing["x-default"] = localizePath(article.data.locale, `/articles/${article.data.slug}`);
    }
    articleAlternatesByTranslationKey.set(article.data.translationKey, existing);
  }

  for (const article of articles) {
    entries.push({
      path: localizePath(article.data.locale, `/articles/${article.data.slug}`),
      lastmod: article.data.updatedAt,
      alternates: articleAlternatesByTranslationKey.get(article.data.translationKey)
    });
  }

  for (const area of areas) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, `/areas/${area.data.slug}`),
        lastmod: area.data.lastCheckedAt,
        alternates: localizedAlternates(`/areas/${area.data.slug}`)
      });
    }
  }

  for (const plan of mobilePlans) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, `/mobile/${plan.data.slug}`),
        lastmod: plan.data.lastCheckedAt,
        alternates: localizedAlternates(`/mobile/${plan.data.slug}`)
      });
    }
  }

  for (const place of places) {
    for (const locale of locales as readonly Locale[]) {
      entries.push({
        path: localizePath(locale, `/places/${place.data.slug}`),
        lastmod: place.data.updatedAt,
        alternates: localizedAlternates(`/places/${place.data.slug}`)
      });
    }
  }

  for (const tool of tools) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, `/tools/${tool.data.slug}`),
        lastmod: tool.data.lastCheckedAt,
        alternates: localizedAlternates(`/tools/${tool.data.slug}`)
      });
    }
  }

  const urls = uniqueEntries(entries)
    .map((entry) => {
      const loc = new URL(entry.path, siteUrl).href;
      const alternates = renderAlternates(entry.alternates, siteUrl);
      const lastmod = entry.lastmod ? `\n    <lastmod>${formatDate(entry.lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${alternates}${lastmod}\n  </url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
