import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
// eslint-disable-next-line import/no-extraneous-dependencies
import { visit } from "unist-util-visit";

// https://astro.build/config
export default defineConfig({
  site: "https://iAdw.in",
  server: {
    host: true,
  },
  integrations: [tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [
      "remark-gfm",
      "remark-captions",
      // temp fix for code blocks not rendering
      // https://github.com/zestedesavoir/zmarkdown/issues/490
      () => (tree) => {
        visit(tree, "figure", (figure) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          delete figure.value;
        });
      },
    ],
    rehypePlugins: ["rehype-slug"],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
  vite: {
    server: {
      watch: {
        ignored: ["**/.direnv/**"],
      },
    },
  },
});
