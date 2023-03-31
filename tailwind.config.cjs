const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        serif: ["Georgia", ...defaultTheme.fontFamily.serif],
        title: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: () => ({
        hero: "url('/img/hero_bg.jpg')",
        "hero-mobile": "url('/img/hero_bg_mobile.jpg')",
      }),
      screens: {
        hero: "800px",
      },
      maxWidth: {
        blog: "46rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
