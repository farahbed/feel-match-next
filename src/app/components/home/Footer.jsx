"use client";

import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerLinks}>
        <a href="#cookies" style={styles.link}>Cookies</a>
        <a href="#conditions" style={styles.link}>Conditions générales</a>
        <a href="#account" style={styles.link}>Mon compte</a>
        <a href="#privacy" style={styles.link}>Politique de confidentialité</a>
      </div>
      <div style={styles.socialMedia}>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.icon}
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--color-border)',
    padding: '2rem 0',
    textAlign: 'center',
    color: 'var(--color-text)',
    fontSize: '1rem',
    fontFamily: 'Luxurious Script',
  },
  footerLinks: {
    marginBottom: '1.5rem',
  },
  link: {
    color: 'var(--color-highlight)',
    textDecoration: 'none',
    margin: '0 1rem',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  icon: {
    fontSize: '2rem',
    color: 'var(--color-text)',
    transition: 'color 0.3s ease',
  },
};

export default Footer;
