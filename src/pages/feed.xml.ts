import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { htmlLangByLocale, localizePath } from "@/lib/i18n";

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rfc822(date: Date): string {
  return date.toUTCString();
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const articles = (await getCollection("articles", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime()
  );
  const latestUpdatedAt = articles[0]?.data.updatedAt ?? new Date();
  const feedUrl = new URL("/feed.xml", siteUrl).href;
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

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>TachiSuke - Japan Life Assistant</title>
    <link>${escapeXml(new URL("/", siteUrl).href)}</link>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>A multilingual life decision assistant for living in Japan.</description>
    <lastBuildDate>${rfc822(latestUpdatedAt)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
};
