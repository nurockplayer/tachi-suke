import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

const site = process.env.SITE_URL ?? "https://tachi-suke.example.com";

export default defineConfig({
  site,
  output: "static",
  integrations: [mdx()]
});
