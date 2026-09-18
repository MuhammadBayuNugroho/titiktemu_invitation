import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        surface: {
          50: "#fcfcfc",
          100: "#f8f9fa",
          200: "#f1f3f5",
          800: "#1a1b1e",
          900: "#141517",
          950: "#0c0d0e",
        },
        brand: {
          50: "#f4f6f8",
          100: "#e5e9ed",
          500: "#18181b",
          900: "#09090b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
