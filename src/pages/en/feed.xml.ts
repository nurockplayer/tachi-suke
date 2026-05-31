import type { APIRoute } from "astro";
import { getLocaleFeedTitle, getPublicFeedArticles, renderArticleFeed, rssResponse } from "@/lib/content/rss";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const rss = renderArticleFeed({
    siteUrl,
    feedPath: "/en/feed.xml",
    channelTitle: getLocaleFeedTitle("en"),
    channelLink: "/en/",
    channelDescription: "English Japan life guides from TachiSuke.",
    articles: await getPublicFeedArticles("en")
  });

  return rssResponse(rss);
};
