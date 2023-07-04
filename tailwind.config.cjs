/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        desktop: "12% 88%",
        mobile: "30% 70%",
      },
    },
  },
  plugins: [],
};
