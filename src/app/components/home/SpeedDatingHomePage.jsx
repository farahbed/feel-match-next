"use client";

import React from "react";
import { Card, CardContent, Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

const styles = {
  sitePresentation: {
    textAlign: "center",
    padding: "4rem 0",
    background: "var(--background)",
    color: "var(--foreground)",
  },
  title: {
    fontSize: "3.5rem",
    color: "var(--color-highlight)",
    fontFamily: "'Tangerine', cursive",
    marginBottom: "1rem",
    lineHeight: "1.2",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  highlight: {
    color: "var(--color-red-dark)",
  },
  description: {
    fontSize: "2.5rem",
    fontFamily: "'Red Hat Text', sans-serif",
    color: "var(--color-text)",
    margin: "1.5rem 0",
  },
  quote: {
    fontSize: "3rem",
    fontFamily: "'Alumni Sans Pinstripe', sans-serif",
    fontStyle: "italic",
    color: "var(--color-red-dark)",
    fontWeight: "bold",
  },
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    padding: "2rem",
  },
  img: {
    width: "200px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imgHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
  },
};

const SpeedDatingHomePage = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-black via-red-800 to-gold-700 text-center py-6">
        <h1 className="text-4xl font-bold text-gold-500">Speed Dating Élégant</h1>
        <p className="text-lg mt-2 text-red-200">Des rencontres sur mesure dans une ambiance raffinée</p>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center gap-8 mt-12">
        <Card sx={{ width: "80%", backgroundColor: "#000", border: "1px solid #a18721" }}>
          <CardContent>
            <h2 style={{ color: "#a18721", fontWeight: "bold" }}>Trouver l'amour avec style</h2>
            <p style={{ marginTop: "16px", color: "#e57373" }}>
              Remplissez notre formulaire détaillé et laissez-nous organiser une rencontre parfaite pour vous.
            </p>
            <Button variant="contained" sx={{ marginTop: "16px", backgroundColor: "#a18721", color: "#000" }}>
              Commencez Maintenant
            </Button>
          </CardContent>
        </Card>

        {/* Site Presentation */}
        <section style={styles.sitePresentation} data-aos="fade-up">
          <h2 style={styles.title}>
            Feel <span style={styles.highlight}>&</span> Match
          </h2>
          <p style={styles.description}>Votre site de rencontre spécialisé dans les speed dating innovants...</p>
          <p style={styles.quote}>
            <i>Tout le monde se cherche, et si peu se trouvent.</i>
          </p>
          <div style={styles.gallery}>
            {["/images/Imgc.webp", "/images/Imgd.webp", "/images/Imga.webp", "/images/Img0.webp", "/images/Imgafro.webp"].map(
              (src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Couple ${index + 1}`}
                  style={styles.img}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                />
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpeedDatingHomePage;