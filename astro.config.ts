import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://iAdw.in",
  server: {
    host: true,
  },
  integrations: [react(), tailwind(), sitemap()],
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-captions"],
    rehypePlugins: ["rehype-slug"],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
  experimental: {
    assets: true,
  },
});
