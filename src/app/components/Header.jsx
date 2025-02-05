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
          position: sticky;
          top: 0;
          z-index: 1000;
          animation: fadeIn 1s ease-in-out;
        }

        .logo-img {
          max-height: 100px;
          border-radius: 50%;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }

        .logo-img:hover {
          transform: scale(1.1) rotate(10deg);
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          transition: opacity 0.5s ease, transform 0.5s ease;
          opacity: 1;
        }

        .nav-links li {
          display: inline-block;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--color-text);
          font-size: 1rem;
          font-weight: 500;
          font-family: 'Alumni Sans Pinstripe', sans-serif;
          position: relative;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: var(--color-highlight);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background-color: var(--color-highlight);
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
          background-color: var(--color-highlight);
          transition: all 0.3s;
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
          opacity: 0;
          transform: translateY(-20px);
          animation: slideDown 0.5s forwards ease-out;
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
          transition: background-color 0.3s, transform 0.3s;
        }

        .button-cta:hover {
          background-color: var(--color-accent);
          transform: translateY(-3px);
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default Header;