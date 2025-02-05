'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src="/images/Img2.png"
            alt="Feel & Match Logo"
            className="logo-img"
          />
        </div>
        <div
          className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') toggleMenu();
          }}
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <Link href="#home">Accueil</Link>
          </li>
          <li>
            <Link href="#about">À Propos</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
        <div className="cta-button">
          <Link href="/speed-dating" className="button-cta">
            Commencez Maintenant
          </Link>
        </div>
      </header>

      <style jsx>{`
        :root {
          --color-bg: #171717;
          --color-highlight: #a18721;
          --color-accent: #500808;
          --color-text: #f8f8f8;
          --color-border: #444444;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-bg);
          padding: 1rem 1.5rem;
          top: 0;
          z-index: 1000;
        }

        .logo-img {
          max-height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
        }

        .nav-links li {
          display: inline-block;
        }

        .nav-links a {
          text-decoration: none;
          color: gold; /* Onglets dorés tout le temps */
          font-size: 20px;
          font-weight: 500;
          font-family: 'Alumni Sans Pinstripe', sans-serif;
          position: relative;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: red; /* Onglets rouges au survol */
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background-color: gold;
          bottom: -2px;
          left: 0;
          transition: width 0.3s;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .menu-icon {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 0.4rem;
        }

        .menu-icon .menu-bar {
          width: 1.5rem;
          height: 0.2rem;
          background-color: gold; /* Onglet doré */
        }

        .menu-icon.open .menu-bar:nth-child(1) {
          transform: rotate(45deg) translate(0.3rem, 0.3rem);
        }

        .menu-icon.open .menu-bar:nth-child(2) {
          opacity: 0;
        }

        .menu-icon.open .menu-bar:nth-child(3) {
          transform: rotate(-45deg) translate(0.3rem, -0.3rem);
        }

        .nav-links.open {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 60px;
          right: 20px;
          background-color: var(--color-bg);
          padding: 1rem;
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
          gap: 0.6rem;
        }

        .cta-button {
          margin-left: auto;
        }

        .button-cta {
          background-color: var(--color-highlight);
          color: var(--color-bg);
          padding: 0.6rem 1.2rem;
          border-radius: 0.3rem;
          text-decoration: none;
          font-weight: bold;
        }

        .button-cta:hover {
          background-color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .menu-icon {
            display: flex;
          }

          .nav-links {
            display: none;
          }

          .nav-links.open {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default Header;