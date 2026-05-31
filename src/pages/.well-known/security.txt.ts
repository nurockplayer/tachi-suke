import type { APIRoute } from "astro";
import { locales } from "@/lib/i18n";

export const prerender = true;

function absoluteUrl(siteUrl: URL, path: string): string {
  return new URL(path, siteUrl).href;
}

function oneYearFromBuild(): string {
  const expires = new Date();
  expires.setUTCFullYear(expires.getUTCFullYear() + 1);
  expires.setUTCHours(0, 0, 0, 0);
  return expires.toISOString();
}

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const body = [
    `Contact: ${absoluteUrl(siteUrl, "/en/contact")}`,
    `Policy: ${absoluteUrl(siteUrl, "/en/editorial-policy")}`,
    `Preferred-Languages: ${["en", ...locales.filter((locale) => locale !== "en")].join(", ")}`,
    `Expires: ${oneYearFromBuild()}`,
    `Canonical: ${absoluteUrl(siteUrl, "/.well-known/security.txt")}`
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
