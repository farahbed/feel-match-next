"use client";

import React, { useEffect } from "react";
import { Card, CardContent, Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageSlider from "./ImageSlider";

const styles = {
  section: {
    textAlign: "center",
    padding: "4rem 0",
  },
  title: {
    fontSize: "3.5rem",
    color: "var(--color-highlight)",
    fontFamily: "'Tangerine', cursive",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  highlight: {
    color: "var(--color-red-dark)",
  },
  description: {
    fontSize: "1.8rem",
    fontFamily: "'Red Hat Text', sans-serif",
    color: "var(--color-text)",
    maxWidth: "800px",
    margin: "auto",
  },
};

const SpeedDatingHomePage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <main className="flex flex-col items-center gap-8 mt-12">
        <section style={styles.section} data-aos="fade-up">
          <h2 style={styles.title} data-aos="fade-down" data-aos-duration="1500">
            Feel <span style={styles.highlight}>&</span> Match
          </h2>
          <p style={styles.description} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
            Votre site de rencontre spécialisé dans les speed dating innovants...
          </p>
        </section>

        <ImageSlider />

        {/* Nouvelle section ajoutée */}
        <section style={{ textAlign: "center", padding: "4rem 0", maxWidth: "800px", margin: "auto" }}>
          <h2 style={{ color: "#a18721", fontWeight: "bold" }}>BLIND DATE</h2>
          <p style={{ marginTop: "16px", color: "#e57373", lineHeight: "1.6" }} data-aos="fade-up" data-aos-delay="200">
            Imaginez un rendez-vous où tout est organisé pour vous, où chaque détail a été pensé afin de
            maximiser vos chances de rencontrer une personne qui vous correspond réellement.
          </p>
          <p style={{ marginTop: "12px", color: "#e57373", lineHeight: "1.6" }} data-aos="fade-up" data-aos-delay="400">
            Un moment unique où le hasard est maîtrisé, où l’excitation de la découverte se mêle à la
            garantie d’une compatibilité bien étudiée.
          </p>
          <p style={{ marginTop: "12px", color: "#e57373", lineHeight: "1.6" }} data-aos="fade-up" data-aos-delay="600">
            Une rencontre où vous laissez la magie opérer.
          </p>

          <h2 style={{ color: "#a18721", fontWeight: "bold", marginTop: "2.5rem" }}>SPEED DATING</h2>
          <p style={{ marginTop: "16px", color: "#e57373", lineHeight: "1.6" }} data-aos="fade-up" data-aos-delay="200">
            Dix minutes pour capter une énergie, ressentir une connexion et savoir si vous voulez aller
            plus loin. Un concept dynamique où l’intensité de l’instant joue un rôle clé.
          </p>
          <p style={{ marginTop: "12px", color: "#e57373", lineHeight: "1.6" }} data-aos="fade-up" data-aos-delay="400">
            Un enchaînement de rencontres ciblées, rapides et efficaces.
          </p>
          <p style={{ marginTop: "12px", color: "#e57373", lineHeight: "1.6" }} data-aos="fade-up" data-aos-delay="600">
            Quelques instants pour séduire, quelques secondes pour décider.
          </p>
        </section>

        {/* Card Section */}
        <section
          style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "3rem" }}
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <Card
            sx={{
              width: "80%",
              backgroundColor: "#000",
              border: "1px solid #a18721",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <h2 style={{ color: "#a18721", fontWeight: "bold" }}>Trouver l'amour avec style</h2>
              <p style={{ marginTop: "16px", color: "#e57373" }}>
                Remplissez notre formulaire détaillé et laissez-nous organiser une rencontre parfaite
                pour vous.
              </p>
              <Button
                variant="contained"
                sx={{ marginTop: "16px", backgroundColor: "#a18721", color: "#000" }}
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="500"
              >
                Blind Date
              </Button>
              <Button
                variant="contained"
                sx={{ marginTop: "16px", backgroundColor: "#a18721", color: "#000" }}
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="500"
              >
                Speed Dating
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default SpeedDatingHomePage;

