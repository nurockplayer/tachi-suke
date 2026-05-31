import type { APIRoute } from "astro";

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://tachi-suke.example.com");
  const searchTemplatePath = "/en/search?q={searchTerms}";
  const searchTemplate = `${new URL("/", siteUrl).href.replace(/\/$/, "")}${searchTemplatePath}`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>TachiSuke</ShortName>
  <Description>Search TachiSuke public Japan life guides, places, mobile plans, area guides, and tools.</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="${escapeXml(searchTemplate)}" />
</OpenSearchDescription>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8"
    }
  });
};
