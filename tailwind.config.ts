import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: '#005EB8',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B0FF',
          400: '#3396FF',
          500: '#005EB8',
          600: '#004B94',
          700: '#003870',
          800: '#00254C',
          900: '#001228',
        },
        forest: {
          DEFAULT: '#2D5016',
          50: '#F0F5ED',
          100: '#E1EBDB',
          200: '#C3D7B7',
          300: '#A5C393',
          400: '#87AF6F',
          500: '#2D5016',
          600: '#244012',
          700: '#1B300E',
          800: '#12200A',
          900: '#091006',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-roboto-slab)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
