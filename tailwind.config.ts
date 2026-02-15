import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-secondary": "var(--bg-secondary)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        border: "var(--border)",
        link: "var(--link)",
        "link-hover": "var(--link-hover)",
      },
      fontFamily: {
        heading: ["Georgia", "'Times New Roman'", "serif"],
        body: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      maxWidth: {
        content: "640px",
      },
    },
  },
  plugins: [],
};
export default config;
