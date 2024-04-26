const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss"), require.resolve("@trivago/prettier-plugin-sort-imports")],
  semi: true,
  trailingComma: "none",
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  importOrder: [
    "^~/(.*)$",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};

module.exports = config;