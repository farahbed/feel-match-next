'use client';

import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className="header">
      {/* Logo à gauche */}
      <div className="logo">
        <img
          src="/images/logo1.png"
          alt="Feel & Match Logo"
          className="logo-img"
        />
      </div>

      {/* Menu à droite */}
      <nav className="nav-links">
        <ul className="flex space-x-8 list-none">
          <li>
            <Link href="#home" className="text-white hover:text-gold">Accueil</Link>
          </li>
          <li>
            <Link href="#contact" className="text-white hover:text-gold">Contact</Link>
          </li>
          <li>
            <Link href="/login" className="text-white hover:text-gold">Se connecter</Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-gold">S'inscrire</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;