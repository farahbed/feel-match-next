// components/Footer.js
'use client';

import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li>
            <Link href="/about">À propos</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/terms">Mentions légales</Link>
          </li>
        </ul>
        <p className="footer-text">
          © {new Date().getFullYear()} Feel & Match. Tous droits réservés.
        </p>
      </div>

      <style jsx>{`
        :root {
          --color-bg: #171717;
          --color-text: #f8f8f8;
          --color-accent: #500808;
        }

        .footer {
          background-color: var(--color-bg);
          color: var(--color-text);
          padding: 2rem;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .footer-links li {
          display: inline;
          margin-right: 1.5rem;
        }

        .footer-links a {
          text-decoration: none;
          color: var(--color-text);
          font-weight: bold;
          font-size: 1rem;
        }

        .footer-links a:hover {
          color: var(--color-accent);
        }

        .footer-text {
          font-size: 0.9rem;
          margin-top: 1rem;
        }
      `}</style>
    </footer>
  );
}

export default Footer;