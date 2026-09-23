import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Flexport-style system: white page, navy ink, one accent (Speed's signal orange).
        ivory: "#FFFFFF",
        ink: "#0B1A24",
        navy: { DEFAULT: "#0B1A24", light: "#12283A", tint: "#8FA6B6", mist: "#D9E2E8" },
        signal: { DEFAULT: "#E8541E", dark: "#C9430F", tint: "#FFE1D4" },
        petrol: { DEFAULT: "#12283A", light: "#1C3A50", tint: "#8FA6B6", mist: "#D9E2E8" },
        sand: "#E3E8EA",
        stone: "#C9D2D7",
        slate: "#3E4F5A",
        muted: "#5C6B73",
        ash: "#8F9CA3",
        cloud: "#C3CED5",
        graphite: "#1C2C38",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "4xl": "28px",
        "5xl": "36px",
      },
      maxWidth: {
        site: "1188px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,26,36,0.04), 0 12px 40px -12px rgba(11,26,36,0.12)",
        lift: "0 2px 4px rgba(11,26,36,0.05), 0 28px 64px -20px rgba(11,26,36,0.28)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 40px -10px rgba(11,26,36,0.18)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      animation: {
        rise: "rise 700ms cubic-bezier(0.23, 1, 0.32, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
