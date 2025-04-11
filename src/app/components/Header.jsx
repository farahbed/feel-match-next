'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("🔔 Header monté"); // Log à l'affichage initial du composant
  }, []);

  const handleMenuToggle = () => {
    console.log("🧭 Menu burger cliqué - ancien état :", isOpen);
    setIsOpen(!isOpen);
    console.log("🔄 Nouveau état attendu :", !isOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-black text-white relative">
      <div className="logo">
        <img src="/images/logo1.png" alt="Feel & Match Logo" className="logo-img" />
      </div>

      <nav className="hidden md:flex space-x-8">
        <Link href="#home" className="hover:text-gold" onClick={() => console.log("🏠 Lien Accueil cliqué")}>
          Accueil
        </Link>
        <Link href="#contact" className="hover:text-gold" onClick={() => console.log("📞 Lien Contact cliqué")}>
          Contact
        </Link>
        <Link href="/login?register=false" className="hover:text-gold" onClick={() => console.log("🔐 Lien Connexion cliqué")}>
          Se connecter
        </Link>
        <Link href="/login?register=true" className="hover:text-gold" onClick={() => console.log("📝 Lien Inscription cliqué")}>
          S'inscrire
        </Link>
      </nav>

      <div className="md:hidden">
        <button onClick={handleMenuToggle}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 right-4 bg-black p-4 rounded-lg shadow-lg flex flex-col space-y-4 z-50">
          <Link href="#home" className="hover:text-gold" onClick={() => console.log("🏠 (mobile) Accueil cliqué")}>
            Accueil
          </Link>
          <Link href="#contact" className="hover:text-gold" onClick={() => console.log("📞 (mobile) Contact cliqué")}>
            Contact
          </Link>
          <Link href="/login" className="hover:text-gold" onClick={() => console.log("🔐 (mobile) Connexion cliqué")}>
            Se connecter
          </Link>
          <Link href="/register" className="hover:text-gold" onClick={() => console.log("📝 (mobile) Inscription cliqué")}>
            S'inscrire
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;