import type { APIRoute } from "astro";
import { locales } from "@/lib/i18n";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const disallows = locales.map((locale) => `Disallow: /${locale}/account/`).join("\n");
  const sitemapUrl = new URL("/sitemap.xml", siteUrl).href;

  return new Response(`User-agent: *\nAllow: /\n${disallows}\n\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
