/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: "all",
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro",
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
