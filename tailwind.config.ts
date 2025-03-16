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
      },
      keyframes: {
        'success-circle': {
          '0%': {
            'stroke-dasharray': '166',
            'stroke-dashoffset': '166',
            'stroke-width': '2',
            'stroke': 'white',
            'fill': 'none',
          },
          '100%': {
            'stroke-dasharray': '166',
            'stroke-dashoffset': '0',
            'stroke-width': '2',
            'stroke': 'white',
            'fill': 'none',
          },
        },
        'success-check': {
          '0%': {
            'stroke-dashoffset': '48',
          },
          '100%': {
            'stroke-dashoffset': '0',
          },
        },
        'success-fill': {
          '100%': {
            'background-color': '#4CAF50',
          },
        },
      },
      animation: {
        'success-circle': 'success-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        'success-check': 'success-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
        'success-fill': 'success-fill 0.4s ease-in-out 0.4s forwards',
      },
    },
  },
  plugins: [],
};

export default config;
