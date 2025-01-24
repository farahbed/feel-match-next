// tailwind.config.mjs
import { defineConfig } from 'tailwindcss';
module.exports = defineConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adapte selon ton projet
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000", // Noir
        text: "#fff", // Blanc
        highlight: "#c2a661", // Doré
        accent: "#b22222", // Rouge foncé
        border: "#333", // Gris foncé
        upcomingBg: "rgb(93, 15, 15)", // Rouge sombre
      },
      fontFamily: {
        main: ["Arial", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
});
