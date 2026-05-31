import type { APIRoute } from "astro";
import { getLocaleFeedTitle, getPublicFeedArticles, renderArticleFeed, rssResponse } from "@/lib/content/rss";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const rss = renderArticleFeed({
    siteUrl,
    feedPath: "/ko/feed.xml",
    channelTitle: getLocaleFeedTitle("ko"),
    channelLink: "/ko/",
    channelDescription: "TachiSuke의 한국어 일본 생활 가이드입니다.",
    articles: await getPublicFeedArticles("ko")
  });

  return rssResponse(rss);
};
