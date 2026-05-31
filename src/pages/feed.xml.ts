import type { APIRoute } from "astro";
import { getPublicFeedArticles, renderArticleFeed, rssResponse } from "@/lib/content/rss";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const rss = renderArticleFeed({
    siteUrl,
    feedPath: "/feed.xml",
    channelTitle: "TachiSuke - Japan Life Assistant",
    channelLink: "/",
    channelDescription: "A multilingual life decision assistant for living in Japan.",
    articles: await getPublicFeedArticles()
  });

  return rssResponse(rss);
};
