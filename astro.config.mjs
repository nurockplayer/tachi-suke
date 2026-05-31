import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://tachi-suke.example.com",
  output: "static",
  integrations: [mdx()]
});
