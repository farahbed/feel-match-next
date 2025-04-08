// src/app/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  console.log("📄 Le composant LoginPage est monté");

  // On récupère le paramètre "register" de l'URL pour afficher l'inscription ou la connexion
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const registerParam = urlParams.get("register");
    console.log("🔍 Paramètre 'register' dans l'URL :", registerParam);

    if (registerParam === "true") {
      setIsLogin(false);
      console.log("🔄 Mode affiché : Inscription");
    } else {
      setIsLogin(true);
      console.log("🔄 Mode affiché : Connexion");
    }
  }, []);

  // Fonction pour gérer le switch entre connexion et inscription
  const handleToggle = () => {
    const newState = !isLogin;
    setIsLogin(newState);
    const newUrl = newState ? "/login?register=false" : "/login?register=true";
    console.log("🔁 Toggle cliqué. Redirection vers :", newUrl);
    router.push(newUrl); // Redirection sans rechargement
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-center text-3xl font-bold text-gold mb-6">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("📩 Formulaire soumis en mode :", isLogin ? "Connexion" : "Inscription");
          }}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-gold"
              onChange={(e) => console.log("📝 Username :", e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-gold"
            onChange={(e) => console.log("📧 Email :", e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-gold"
            onChange={(e) => console.log("🔑 Mot de passe :", e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-gold hover:bg-red text-black py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <button
            onClick={handleToggle}
            className="text-gold hover:text-red underline ml-1 transition-colors duration-200"
          >
            {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </div>
  );
}