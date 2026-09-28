import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#16243D",
        blue: "#2C5697",
        blueLight: "#5B86C2",
        gold: "#C8A24B",
        cream: "#FBF9F5",
        bgBlue: "#EAF1FA",
        bgGrey: "#F3F5F8",
        ink: "#2B2B2B",
        muted: "#5A6473",
        line: "#D7DEE8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};
export default config;
