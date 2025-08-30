/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
   extend: {
  colors: {
    gold: "#c2a661",
    "red-dark": "#500808",
    white: "#ffffff",
    black: "#171717",
    foreground: "#171717",
    background: "#0a0a0a",
    "foreground-dark": "#ededed",
    "white-dark": "#ededed",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    zoomIn: {
      "0%": { transform: "scale(0)" },
      "100%": { transform: "scale(1)" },
    },
    'pulse-glow': {
      '0%, 100%': { opacity: '0.4' },
      '50%': { opacity: '1' },
    },
  },
  animation: {
    fadeIn: "fadeIn 1s ease-in-out",
    zoomIn: "zoomIn 1s ease-in-out",
    'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  },
},
  },
  plugins: [],
};
