'use client';

import React from "react";
import { useRouter } from "next/navigation";
import ImageSlider from "./ImageSlider";
import CallToActionSection from "./CallToAction";
import OptionEvent from "./OptionEvent";

const SpeedDatingIntro = () => {
  const router = useRouter();

  const handleEnterSite = () => {
    router.push("/speed-dating-home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <main className="flex flex-col items-center justify-center gap-12 w-full max-w-4xl mx-auto">
        
        {/* Titre principal */}
        <section className="w-full py-16">
          <h2 className="text-[3.5rem] text-gold font-cursive leading-tight mt-8 drop-shadow-lg tracking-wide">
            Feel <span className="text-red-dark">&</span> Match
          </h2>

          <p className="text-[1.5rem] font-sans text-gray-300 max-w-2xl mx-auto mt-6 mb-8 leading-relaxed">
            Une expérience unique ! <br />
            Marre des rendez-vous qui manquent de piment ? <br />
            Marre des applications de rencontre ? <br />
            Découvrez notre concept innovant qui révolutionne les rencontres.
          </p>
        </section>

        {/* Image Slider */}
        <div className="w-full flex justify-center">
          <ImageSlider />
        </div>

        {/* Option Event : Blind Date / Speed Dating */}
        <OptionEvent />

        {/* Call to Action */}
        <div className="w-full flex justify-center">
          <CallToActionSection onButtonClick={handleEnterSite} />
        </div>
      </main>
    </div>
  );
};

export default SpeedDatingIntro;