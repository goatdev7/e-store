import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7F56D9", // Soft violet
        secondary: "#E0D6F5", // Muted lavender
        accent: "#30C5D2", // Cool teal
        background: "#F8FAFC", // Soft white-gray
        textPrimary: "#333B4F", // Charcoal gray for text
        cardBg: "#FFFFFF", // White for cards
        borderColor: "#D1D5DB", // Light gray borders
      },
    },
  },
  plugins: [],
} satisfies Config;
