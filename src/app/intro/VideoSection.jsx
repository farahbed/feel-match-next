'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const slides = [
  {
    image: '/hero/silhouette.jpeg',
    title: "Et si une rencontre ne commençait pas par une photo ?",
    subtitle: "Laisse la magie du mystère opérer avant les apparences.",
  },
  {
    image: '/hero/hands.jpeg',
    title: "Si la première chose que tu découvrais, c’était ses mots, ses silences, ses gestes…",
    subtitle: "Ici, les connexions se tissent avant les swipes.",
  },
  {
    image: '/hero/coffee.jpeg',
    title: "Une histoire peut commencer simplement… autour d’un café.",
    subtitle:
      "Rencontres authentiques, blind dates, speed dating élégants. Feel & Match crée la scène, à vous d’écrire la suite.",
    showCtas: true,
  },
];

export default function VideoSection() {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  // Disparition au scroll
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Avance automatique sans boucle
  useEffect(() => {
    if (current >= slides.length - 1) return;

    const timer = setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, 6000);

    return () => clearTimeout(timer);
  }, [current]);

  // Dot clic
  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* IMAGE */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover brightness-75 contrast-[1.05] scale-[1.05]"
            />

            {/* PELLICULE */}
            <div className="film-grain"></div>
            <div className="film-flicker"></div>

            {/* VIGNETTE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0,rgba(0,0,0,0.9)_70%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

            {/* TEXTE */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-amber-200/80">
                Feel &amp; Match
              </p>

              <h1 className="max-w-3xl text-2xl md:text-4xl font-light leading-snug">
                {slide.title}
              </h1>

              {slide.subtitle && (
                <p className="mt-4 max-w-xl text-sm md:text-base text-amber-50/80">
                  {slide.subtitle}
                </p>
              )}

              {slide.showCtas && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="rounded-full bg-amber-300 px-10 py-3 text-sm font-medium text-black shadow-lg shadow-amber-500/40 transition hover:bg-amber-200">
                    Commencer l&apos;expérience
                  </button>
                  <button className="rounded-full border border-amber-200/70 px-10 py-3 text-sm font-medium text-amber-100/90 backdrop-blur-sm hover:bg-amber-50/10">
                    Découvrir le concept
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* DOTS CLIQUABLES */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 w-6 rounded-full transition-all ${
              index === current ? 'bg-amber-300' : 'bg-amber-100/30'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-6 text-[0.7rem] uppercase tracking-[0.18em] text-amber-50/80 pointer-events-none">
        cinematic intro
      </div>
    </section>
  );
}