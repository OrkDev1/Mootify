/** @type {import('tailwindcss').Config} */
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f472b6",

          secondary: "#c084fc",

          accent: "#86efac",

          neutral: "#f3f4f6",

          "base-100": "#f3f4f6",

          info: "#60a5fa",

          success: "#a3e635",

          warning: "#fde047",

          error: "#f43f5e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
