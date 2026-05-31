import type { APIRoute } from "astro";
import { getLocaleFeedTitle, getPublicFeedArticles, renderArticleFeed, rssResponse } from "@/lib/content/rss";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const rss = renderArticleFeed({
    siteUrl,
    feedPath: "/zh-tw/feed.xml",
    channelTitle: getLocaleFeedTitle("zh-tw"),
    channelLink: "/zh-tw/",
    channelDescription: "TachiSuke 的繁體中文日本生活指南。",
    articles: await getPublicFeedArticles("zh-tw")
  });

  return rssResponse(rss);
};
