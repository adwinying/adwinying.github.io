const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        title: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: () => ({
        hero: "url('/img/hero_bg.jpg')",
        "hero-mobile": "url('/img/hero_bg_mobile.jpg')",
      }),
      screens: {
        hero: "800px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
