import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  site: "https://iAdw.in",
  server: {
    host: true,
    port: 3000,
  },
  integrations: [react(), tailwind(), sitemap(), astroImageTools],
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-captions"],
    rehypePlugins: ["rehype-slug"],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
});
