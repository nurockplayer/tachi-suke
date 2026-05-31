import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const manifest = {
    name: "TachiSuke - Japan Life Assistant",
    short_name: "TachiSuke",
    description: "A multilingual life decision assistant for living in Japan.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f7f2",
    theme_color: "#25635c",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      }
    ]
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8"
    }
  });
};
