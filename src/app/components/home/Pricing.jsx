"use client";

import React, { useState } from 'react';

const Pricing = () => {
  const styles = {
    price: {
      padding: '3rem 0',
      backgroundColor: 'var(--color-bg)', // Fond de la section
      textAlign: 'center',
    },
    h2: {
      fontSize: '2.5rem',
      color: 'var(--color-highlight)', // Doré
      marginBottom: '2rem',
    },
    pricingOptions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '2rem',
      flexWrap: 'wrap', // Permet de gérer le contenu sur plusieurs lignes si nécessaire
    },
    option: {
      backgroundColor: 'var(--color-bg)', // Fond noir pour les cartes
      color: 'var(--color-text)', // Texte noir
      border: '5px solid var(--color-highlight)', // Bordure dorée autour de la carte
      padding: '2rem',
      borderRadius: '12px',
      width: '250px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile pour un effet de profondeur
      transition: 'box-shadow 0.3s ease', // Transition de l'ombre uniquement
      cursor: 'pointer',
    },
    optionHover: {
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Ombre plus forte au survol
      transform: 'scale(1.05)', // Agrandissement de la carte au survol
    },
    optionText: {
      color: 'var(--color-text)', // Texte noir pour les titres
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    priceText: {
      fontSize: '2rem',
      color: 'var(--color-accent)', // Accent doré pour le prix
      margin: '1rem 0',
    },
    cta: {
      marginTop: '1rem',
      padding: '0.8rem 1.5rem',
      backgroundColor: 'var(--color-upcoming-bg)', // Fond noir
      color: 'var(--color-bg)', // Texte blanc
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s, transform 0.3s ease-in-out',
      cursor: 'pointer',
      border: '5px solid var(--color-highlight)', // Bordure noire pour plus de contraste
    },
    ctaHover: {
      backgroundColor: 'color.scale(var(--color-highlight), $lightness: -10%)', // Assombrissement du noir au survol
    },
    ctaActive: {
      backgroundColor: 'color.scale(var(--color-highlight), $lightness: -20%)',
      transform: 'translateY(0)', // Effet de pression lors du clic
    },
  };

  const [hoveredOption, setHoveredOption] = useState(null);
  const [ctaState, setCtaState] = useState({});

  // Fonction pour gérer l'état du bouton sur le survol, le clic, etc.
  const handleCtaState = (state) => {
    setCtaState(state);
  };

  return (
    <section style={styles.price}>
      <h2 style={styles.h2}>Nos Tarifs</h2>
      <div style={styles.pricingOptions}>
        <div
          style={{ ...styles.option, ...(hoveredOption === 'early' ? styles.optionHover : {}) }}
          onMouseEnter={() => setHoveredOption('early')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <h3 style={styles.optionText}>Early Ticket</h3>
          <p style={styles.priceText}>20€</p>
          <button
            style={{ ...styles.cta, ...ctaState }}
            onMouseOver={() => handleCtaState(styles.ctaHover)}
            onMouseOut={() => handleCtaState(styles.cta)}
            onMouseDown={() => handleCtaState(styles.ctaActive)}
            onMouseUp={() => handleCtaState(styles.ctaHover)}
          >
            Acheter maintenant
          </button>
        </div>
        <div
          style={{ ...styles.option, ...(hoveredOption === 'last' ? styles.optionHover : {}) }}
          onMouseEnter={() => setHoveredOption('last')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <h3 style={styles.optionText}>Last Ticket</h3>
          <p style={styles.priceText}>35€</p>
          <button
            style={{ ...styles.cta, ...ctaState }}
            onMouseOver={() => handleCtaState(styles.ctaHover)}
            onMouseOut={() => handleCtaState(styles.cta)}
            onMouseDown={() => handleCtaState(styles.ctaActive)}
            onMouseUp={() => handleCtaState(styles.ctaHover)}
          >
            Acheter maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
