import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  site: "https://iAdw.in",
  server: {
    host: true,
    port: 3000,
  },
  integrations: [react(), tailwind()],
});
