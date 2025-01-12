'use client';

import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="/images/Img2.webp" alt="Feel & Match Logo" className="logo-img" />
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
          <li><a href="#home">Accueil</a></li>
          <li><a href="#about">À Propos</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
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
          transform: scale(1.1);
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          transition: transform 0.3s ease-in-out;
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
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: var(--color-highlight);
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
      `}</style>
    </>
  );
}

export default Header;
