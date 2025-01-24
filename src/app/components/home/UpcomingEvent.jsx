"use client";

import React, { useState } from "react";

const styles = {
  event: {
    backgroundColor: "var(--color-red-dark)", // Rouge foncé pour le fond
    padding: "2rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px", // Coins arrondis pour un design moderne
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    margin: "2rem 1rem",
  },
  h2: {
    fontSize: "2.5rem",
    color: "var(--color-highlight)", // Couleur dorée
    margin: "1rem 0",
    fontFamily: "'Tangerine', cursive", // Police élégante pour le titre
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Effet ombré
  },
  p: {
    margin: "0.5rem 0",
    fontSize: "1.5rem",
    color: "var(--color-text)", // Texte clair
    fontWeight: "500",
    fontFamily: "'Red Hat Text', sans-serif", // Police Red Hat Text pour le texte principal
  },
  cta: {
    display: "inline-block",
    marginTop: "1.5rem",
    padding: "0.8rem 2rem",
    backgroundColor: "var(--color-highlight)", // Fond doré
    color: "var(--color-text)", // Texte clair
    border: "none",
    borderRadius: "30px", // Arrondi pour bouton
    fontWeight: "bold",
    fontSize: "1.2rem",
    fontFamily: "'Red Hat Text', sans-serif", // Police Red Hat Text pour le bouton
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  ctaHover: {
    backgroundColor: "rgb(135, 112, 22)", // Doré plus sombre au hover
    transform: "scale(1.05)",
  },
  img: {
    width: "100%",
    maxWidth: "400px", // Taille maximale pour l'image
    borderRadius: "12px",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    objectFit: "cover", // Remplissage sans déformation
  },
  shortText: {
    fontFamily: "'Alumni', sans-serif", // Alumni en italique pour les phrases courtes
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.4rem",
  },
};

function UpcomingEvent() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section style={styles.event}>
      <h2 style={styles.h2}>Prochain événement</h2>
      <img src="/images/Imgb.webp" alt="Event Image" style={styles.img} />
      <p style={styles.p}>Date : 01.01.2025</p>
      <p style={styles.p}>Lieu : 1 rue de Paris, 75000 Paris</p>
      <a
        href="#"
        style={ctaHovered ? { ...styles.cta, ...styles.ctaHover } : styles.cta}
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
      >
        En savoir plus
      </a>
      <p style={styles.shortText}>
        "Tout le monde se cherche, et si peu se trouvent."
      </p>
    </section>
  );
}

export default UpcomingEvent;
