/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"], // Adding Ubuntu font to the config
      },
      width: {
        4.5: "1.125rem", // 18px
      },
      height: {
        4.5: "1.125rem", // 18px
      },
    },
  },
  plugins: [],
};
