'use client';

import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className="bg-black text-white px-4 py-3 flex items-center justify-between relative z-50">
      {/* Logo */}
      <div className="logo flex items-center">
        <img
          src="/images/logo1.png"
          alt="Feel & Match Logo"
          className="logo-img object-contain"
        />
      </div>

      {/* Menu desktop seulement */}
      <nav className="nav-links flex">
        <Link href="/" className="hover:text-gold">Accueil</Link>
        <Link href="#contact" className="hover:text-gold">Contact</Link>
        <Link href="/login?register=false" className="hover:text-gold">Se connecter</Link>
        <Link href="/login?register=true" className="hover:text-gold">S'inscrire</Link>
      </nav>
    </header>
  );
}

export default Header;