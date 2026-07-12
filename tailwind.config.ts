import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF6E9",
          100: "#F7EFD9",
          200: "#F1E6C7",
          300: "#E8D9AE",
        },
        navy: {
          DEFAULT: "#1E3A5F",
          50: "#E8EEF5",
          100: "#C6D3E4",
          500: "#1E3A5F",
          700: "#152847",
          900: "#0B172E",
        },
        sunset: {
          orange: "#F97316",
          coral: "#EF4444",
          magenta: "#E11D74",
        },
        seafoam: "#8DBFA6",
        sand: "#E8D9AE",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        script: ["var(--font-script)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "sunset-gradient":
          "linear-gradient(90deg, #F97316 0%, #EF4444 50%, #E11D74 100%)",
        "sunset-gradient-v":
          "linear-gradient(180deg, #F97316 0%, #EF4444 55%, #E11D74 100%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.23 0 0 0 0 0.37 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        chunky: "0 8px 0 0 #0B172E",
        "chunky-sm": "0 4px 0 0 #0B172E",
      },
      keyframes: {
        wave: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
      },
      animation: {
        wave: "wave 6s ease-in-out infinite",
        bob: "bob 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
