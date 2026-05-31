import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { locales, localizePath, type Locale } from "@/lib/i18n";

export const prerender = true;

interface SitemapEntry {
  path: string;
  lastmod?: Date;
}

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
  "/editorial-policy"
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

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const entries: SitemapEntry[] = [{ path: "/" }];

  for (const locale of locales) {
    entries.push({ path: localizePath(locale, "/feed.xml") });

    for (const path of localeIndexPaths) {
      entries.push({ path: localizePath(locale, path) });
    }
  }

  const articles = await getCollection("articles", ({ data }) => !data.draft);
  for (const article of articles) {
    entries.push({
      path: localizePath(article.data.locale, `/articles/${article.data.slug}`),
      lastmod: article.data.updatedAt
    });
  }

  const areas = await getCollection("areas");
  for (const area of areas) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, `/areas/${area.data.slug}`),
        lastmod: area.data.lastCheckedAt
      });
    }
  }

  const mobilePlans = await getCollection("mobile-plans");
  for (const plan of mobilePlans) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, `/mobile/${plan.data.slug}`),
        lastmod: plan.data.lastCheckedAt
      });
    }
  }

  const places = await getCollection("places", ({ data }) => data.status === "published");
  for (const place of places) {
    for (const locale of locales as readonly Locale[]) {
      entries.push({
        path: localizePath(locale, `/places/${place.data.slug}`),
        lastmod: place.data.updatedAt
      });
    }
  }

  const tools = await getCollection("tools", ({ data }) => data.status === "published");
  for (const tool of tools) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, `/tools/${tool.data.slug}`),
        lastmod: tool.data.lastCheckedAt
      });
    }
  }

  const urls = uniqueEntries(entries)
    .map((entry) => {
      const loc = new URL(entry.path, siteUrl).href;
      const lastmod = entry.lastmod ? `\n    <lastmod>${formatDate(entry.lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
