"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageSlider from "./ImageSlider";
import VideoLoader from "../home/Loader";

const SpeedDatingHomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {loading ? (
        <VideoLoader onFinish={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen bg-black text-white flex flex-col items-center">
          <main className="flex flex-col items-center gap-8 mt-12">
            <section className="text-center py-16" data-aos="fade-up">
              <h2 className="text-[3.5rem] text-gold font-cursive" data-aos="fade-down">
                Feel <span className="text-red-dark">&</span> Match
              </h2>
              <p className="text-[1.8rem] font-sans text-gray-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Votre site de rencontre spécialisé dans les speed dating innovants...
              </p>
            </section>

            <ImageSlider />

            {/* Nouvelle section ajoutée */}
            <section className="text-center py-16 max-w-2xl mx-auto">
              <h2 className="text-gold font-bold">BLIND DATE</h2>
              <p className="mt-4 text-red-light leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                Imaginez un rendez-vous où tout est organisé pour vous...
              </p>
              <p className="mt-3 text-red-light leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                Un moment unique où le hasard est maîtrisé...
              </p>
              <p className="mt-3 text-red-light leading-relaxed" data-aos="fade-up" data-aos-delay="600">
                Une rencontre où vous laissez la magie opérer.
              </p>

              <h2 className="text-gold font-bold mt-10">SPEED DATING</h2>
              <p className="mt-4 text-red-light leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                Dix minutes pour capter une énergie...
              </p>
              <p className="mt-3 text-red-light leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                Un enchaînement de rencontres ciblées, rapides et efficaces.
              </p>
              <p className="mt-3 text-red-light leading-relaxed" data-aos="fade-up" data-aos-delay="600">
                Quelques instants pour séduire, quelques secondes pour décider.
              </p>
            </section>

            {/* Card Section */}
            <section className="flex justify-center w-full mt-12" data-aos="zoom-in">
              <Card sx={{ width: "80%", backgroundColor: "#000", border: "1px solid #a18721" }}>
                <CardContent className="text-center">
                  <h2 className="text-gold font-bold">Trouver l'amour avec style</h2>
                  <p className="mt-4 text-red-light">
                    Remplissez notre formulaire détaillé et laissez-nous organiser une rencontre parfaite pour vous.
                  </p>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#a18721", color: "#000" }} data-aos="fade-up" data-aos-delay="500">
                    Blind Date
                  </Button>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: "#a18721", color: "#000" }} data-aos="fade-up" data-aos-delay="500">
                    Speed Dating
                  </Button>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default SpeedDatingHomePage;
