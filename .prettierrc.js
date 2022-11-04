module.exports = {
  arrowParens: 'always',
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  importOrder: ['^@src/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  plugins: [require('prettier-plugin-tailwindcss')],
};
