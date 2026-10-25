/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  // Preflight is off so Tailwind's reset doesn't restyle the existing CSS Module pages.
  corePlugins: { preflight: false },
  theme: { extend: { colors: { brand: "#DB4444" } } },
  plugins: [],
};
