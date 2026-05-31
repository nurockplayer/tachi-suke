import { getCollection, type CollectionEntry } from "astro:content";
import { htmlLangByLocale, localeNames, localizePath, type Locale } from "@/lib/i18n";

export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function rfc822(date: Date): string {
  return date.toUTCString();
}

export async function getPublicFeedArticles(locale?: Locale): Promise<CollectionEntry<"articles">[]> {
  return (await getCollection("articles", ({ data }) => !data.draft && (!locale || data.locale === locale))).sort(
    (a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime()
  );
}

interface RenderArticleFeedOptions {
  siteUrl: URL;
  feedPath: string;
  channelTitle: string;
  channelLink: string;
  channelDescription: string;
  articles: CollectionEntry<"articles">[];
}

export function getLocaleFeedTitle(locale: Locale): string {
  const titles: Record<Locale, string> = {
    "zh-tw": "TachiSuke 繁體中文文章",
    en: "TachiSuke English Articles",
    ja: "TachiSuke 日本語記事",
    ko: "TachiSuke 한국어 글"
  };

  return titles[locale] ?? `TachiSuke ${localeNames[locale]} Articles`;
}

export function renderArticleFeed({
  siteUrl,
  feedPath,
  channelTitle,
  channelLink,
  channelDescription,
  articles
}: RenderArticleFeedOptions): string {
  const latestUpdatedAt = articles[0]?.data.updatedAt ?? new Date();
  const feedUrl = new URL(feedPath, siteUrl).href;
  const items = articles
    .map((article) => {
      const articleUrl = new URL(localizePath(article.data.locale, `/articles/${article.data.slug}`), siteUrl).href;
      const categories = [article.data.category, ...article.data.tags]
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("");

      return `    <item>
      <title>${escapeXml(article.data.title)}</title>
      <link>${escapeXml(articleUrl)}</link>
      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>
      <description>${escapeXml(article.data.description)}</description>
      <pubDate>${rfc822(article.data.publishedAt)}</pubDate>
      <dc:language>${escapeXml(htmlLangByLocale[article.data.locale])}</dc:language>
      ${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(new URL(channelLink, siteUrl).href)}</link>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channelDescription)}</description>
    <lastBuildDate>${rfc822(latestUpdatedAt)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

export function rssResponse(rss: string): Response {
  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
