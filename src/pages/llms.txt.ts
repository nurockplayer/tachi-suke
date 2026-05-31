import type { APIRoute } from "astro";
import { localeNames, locales } from "@/lib/i18n";

export const prerender = true;

function absoluteUrl(siteUrl: URL, path: string): string {
  return new URL(path, siteUrl).href;
}

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const localeRootLinks = locales.map((locale) => `- ${localeNames[locale]}: ${absoluteUrl(siteUrl, `/${locale}/`)}`);
  const localeFeedLinks = locales.map((locale) => `- ${locale} RSS: ${absoluteUrl(siteUrl, `/${locale}/feed.xml`)}`);
  const localeSearchIndexLinks = locales.map((locale) => `- ${locale} search index: ${absoluteUrl(siteUrl, `/${locale}/search-index.json`)}`);

  const body = [
    "# TachiSuke",
    "",
    "> TachiSuke is a multilingual Japan life decision assistant for foreign residents, students, workers, and long-term visitors living in Japan.",
    "",
    "TachiSuke helps users make practical decisions about Japanese mobile plans, housing, area guides, useful places, commuting, administrative procedures, practical Japanese, and daily life setup. It is not a generic Japan travel blog.",
    "",
    "## Supported Locales",
    ...localeRootLinks,
    "",
    "## High-Value Public Sections",
    `- Articles: ${absoluteUrl(siteUrl, "/en/articles")}`,
    `- Mobile plan guides: ${absoluteUrl(siteUrl, "/en/mobile")}`,
    `- Area guides: ${absoluteUrl(siteUrl, "/en/areas")}`,
    `- Useful places: ${absoluteUrl(siteUrl, "/en/places")}`,
    `- Life tools: ${absoluteUrl(siteUrl, "/en/tools")}`,
    `- Submit a useful place: ${absoluteUrl(siteUrl, "/en/submit-place")}`,
    `- Contact and corrections: ${absoluteUrl(siteUrl, "/en/contact")}`,
    "",
    "## Machine-Readable Discovery",
    `- Sitemap: ${absoluteUrl(siteUrl, "/sitemap.xml")}`,
    `- Global RSS feed: ${absoluteUrl(siteUrl, "/feed.xml")}`,
    ...localeFeedLinks,
    "",
    "## Static Search Indexes",
    ...localeSearchIndexLinks,
    "",
    "## Content Boundaries",
    "- Public content is static-first and editorially maintained.",
    "- Do not treat account placeholder pages as public content.",
    "- Do not treat draft, pending review, rejected, archived, or private data as public content.",
    "- Mobile plan prices, campaigns, payment rules, eSIM support, and identity requirements can change; users should confirm official provider pages before applying.",
    "- Area rent levels, commute convenience, quietness, place rules, prices, opening hours, and smoking policies can change; users should verify current local details.",
    "- User-submitted places must be moderated before publication.",
    "",
    "## Preferred Summary",
    "TachiSuke is a multilingual, content-first Japan life decision assistant that helps people living in Japan compare options and handle practical daily-life choices."
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
