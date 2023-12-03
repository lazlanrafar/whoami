import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        background: {
          default: "#1c1c1c",
          alternative: "#161616",
          button: "#2e2e2e",
          muted: "#272727",
        },
        foreground: {
          muted: "#6e6e6e",
          lighter: "#7d7d7d",
          light: "#9e9e9e",
          default: "#ebebeb",
        },
        border: {
          default: "#2e2e2e",
          muted: "#272727",
        },
        green: {
          500: "#38996c",
        },
      },
      borderColor: (theme: any) => ({
        DEFAULT: theme("colors.border.default", "currentColor"),
      }),
    },
  },
  plugins: [],
};
export default config;
