import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        snow: "#F4F3F1",
        ash: "#EEEEEE",
        clay: "#605858",
        coal: "#353131",
        "dark-mint": "#489078",
        "shade-24-dark": "rgba(53, 49, 49, .24)",
        "shade-24-light": "rgba(241, 240, 236, .24)",
        "shade-12-light": "rgba(241, 240, 236, .12)",
        red: "#EB5757",
      },
    },
  },
  plugins: [],
} satisfies Config;
