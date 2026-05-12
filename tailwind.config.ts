import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f4fbf4",
        "cream-dim": "#e8f0e9",
        ink: "#161d19",
        muted: "#3c4a42",
        emerald: {
          DEFAULT: "#006c49",
          light: "#10b981",
          soft: "#d8f8e8",
        },
        saffron: {
          DEFAULT: "#fea619",
          dark: "#855300",
          soft: "#fff1d5",
        },
        clay: {
          DEFAULT: "#a43a3a",
          light: "#fc7c78",
          soft: "#ffdad7",
        },
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        ambient: "0 18px 50px rgba(28, 54, 40, 0.10)",
        lift: "0 22px 60px rgba(28, 54, 40, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
