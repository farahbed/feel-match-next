/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        zoomIn: "zoomIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      colors: {
        gold: "#c2a661",  // Doré
        "red-dark": "#500808",  // Rouge foncé
        white: "#ffffff",  // Blanc
        black: "#171717",  // Noir
        foreground: "#171717",  // Texte principal
        background: "#0a0a0a",  // Arrière-plan en mode sombre
        "foreground-dark": "#ededed",  // Texte en mode sombre
        "white-dark": "#ededed",  // Blanc pour mode sombre
        
      },
    },
  },
  plugins: [],
};