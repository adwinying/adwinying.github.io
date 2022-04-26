import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  site: "https://iAdw.in",
  server: {
    host: true,
    port: 3000,
  },
  integrations: [react(), tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [
      "remark-gfm",
      [
        "@fec/remark-images",
        {
          elasticContainer: false,
          srcDir: "./public",
          targetDir: "./public",
        },
      ],
    ],
    rehypePlugins: ["rehype-slug"],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
});
