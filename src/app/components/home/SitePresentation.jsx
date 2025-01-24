"use client";

import React from 'react';

const styles = {
  sitePresentation: {
    textAlign: 'center',
    padding: '4rem 0',
    background: 'var(--background)',
    color: 'var(--foreground)',
  },
  title: {
    fontSize: '3.5rem',
    color: 'var(--color-highlight)',
    fontFamily: "'Tangerine', cursive",
    marginBottom: '1rem',
    lineHeight: '1.2',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  highlight: {
    color: 'var(--color-red-dark)',
  },
  description: {
    fontSize: '2.5rem',
    fontFamily: "'Red Hat Text', sans-serif",
    color: 'var(--color-text)',
    margin: '1.5rem 0',
  },
  quote: {
    fontSize: '3rem',
    fontFamily: "'Alumni Sans Pinstripe', sans-serif",
    fontStyle: 'italic',
    color: 'var(--color-red-dark)',
    fontWeight: 'bold',
  },
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    padding: '2rem',
  },
  img: {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  imgHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
  },
};

function SitePresentation() {
  return (
    <section style={styles.sitePresentation}>
      <h2 style={styles.title}>
        Feel <span style={styles.highlight}>&</span> Match
      </h2>
      <p style={styles.description}>Votre site de rencontre spécialisé dans les speed dating innovants...</p>
      <p style={styles.quote}>
        <i>Tout le monde se cherche, et si peu se trouvent.</i>
      </p>
      <div style={styles.gallery}>
        {['/images/Imgc.webp', '/images/Imgd.webp', '/images/Imga.webp', '/images/Img0.webp', '/images/Imgafro.webp'].map(
          (src, index) => (
            <img
              key={index}
              src={src}
              alt={`Couple ${index + 1}`}
              style={styles.img}
              onMouseOver={(e) => {
                e.target.style.transform = styles.imgHover.transform;
                e.target.style.boxShadow = styles.imgHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = styles.img.boxShadow;
              }}
            />
          )
        )}
      </div>
    </section>
  );
}

export default SitePresentation;
