const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
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
