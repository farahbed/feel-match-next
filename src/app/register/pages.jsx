'use client';

import { useState } from "react";

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false);  // Toujours `false` pour la page d'inscription

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-center text-3xl font-bold text-gold mb-6">Inscription</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-gold"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-gold"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-gold"
          />
          <button
            type="submit"
            className="w-full bg-gold hover:bg-red text-black py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}