'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import ImageSlider from './ImageSlider';
import CallToActionSection from './CallToAction';
import OptionEvent from './OptionEvent';

export default function SpeedDatingIntro() {
  const router = useRouter();
  const ctaRef = useRef(null);

  // CTA principal -> page d’accueil speed-dating
  const handleEnterSite = () => {
    router.push('/speed-dating-home');
  };

  // OptionEvent : ouvre directement l’onglet formulaire
  const goToForm = () => {
    router.push('/compte?tab=formulaire');
  };

  const scrollToCta = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center text-center px-4"
      style={{
        background:
          'radial-gradient(1200px 600px at 50% -10%, rgba(194,166,97,0.08), transparent 60%), #000',
      }}
    >
      <main className="flex flex-col items-center gap-12 w-full max-w-6xl mx-auto">
        {/* Titre principal */}
        <section className="w-full pt-16" aria-labelledby="intro-title">
          <h1
            id="intro-title"
            className="text-[2.75rem] sm:text-[3.5rem] leading-tight mt-8 drop-shadow-lg tracking-wide font-cursive"
          >
            <span className="text-gold">Feel</span>{' '}
            <span className="text-red-dark">&</span>{' '}
            <span className="text-gold">Match</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mt-6 mb-8 leading-relaxed">
            Une expérience unique ! <br />
            Marre des rendez-vous qui manquent de piment ? <br />
            Marre des applications de rencontre ? <br />
            Découvrez notre concept innovant qui révolutionne les rencontres.
          </p>

          {/* Bouton pour scroller vers le slider (optionnel) */}
          <button
            onClick={scrollToCta}
            className="mt-2 inline-flex items-center justify-center px-5 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-black transition"
            aria-label="Voir comment ça marche"
          >
            Voir comment ça marche ↓
          </button>
        </section>

        {/* Image Slider */}
        <section className="w-full" aria-label="Moments Feel & Match">
          <div className="w-full flex justify-center">
            <ImageSlider />
          </div>
        </section>

        {/* Option Event : Blind Date / Speed Dating */}
        <section className="w-full" aria-label="Choisissez votre format">
          <OptionEvent
            onBlindClick={goToForm}
            onSpeedClick={goToForm}
            blindHref="/compte?tab=formulaire"
            speedHref="/compte?tab=formulaire"
          />
        </section>

        {/* Call to Action */}
        <section className="w-full flex justify-center" ref={ctaRef} aria-label="Appel à l’action">
          <CallToActionSection onButtonClick={handleEnterSite} />
        </section>
      </main>
    </div>
  );
}