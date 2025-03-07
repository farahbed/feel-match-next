/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
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