import type { APIRoute } from "astro";
import { getLocaleFeedTitle, getPublicFeedArticles, renderArticleFeed, rssResponse } from "@/lib/content/rss";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const rss = renderArticleFeed({
    siteUrl,
    feedPath: "/ja/feed.xml",
    channelTitle: getLocaleFeedTitle("ja"),
    channelLink: "/ja/",
    channelDescription: "TachiSuke の日本語向け日本生活ガイド。",
    articles: await getPublicFeedArticles("ja")
  });

  return rssResponse(rss);
};
