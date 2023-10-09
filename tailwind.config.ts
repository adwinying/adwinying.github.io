import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        serif: ["Georgia", ...defaultTheme.fontFamily.serif],
        title: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        blog: "46rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography],
};
