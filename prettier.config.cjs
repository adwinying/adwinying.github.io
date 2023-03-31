/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: "all",
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("prettier-plugin-astro"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
