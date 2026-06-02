import type { Config } from "tailwindcss";

const config: Config = {
  content: [
"./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Esto es vital
"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;