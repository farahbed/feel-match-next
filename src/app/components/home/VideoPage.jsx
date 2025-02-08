"use client";

import React from "react";

const VideoPage = ({ onEnterClick }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vidéo qui couvre tout l'écran */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/LoaderVideo.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>

      {/* Bouton centré sur l'écran */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
        onClick={onEnterClick} // Appel de la fonction pour changer l'état
        className="px-6 py-3 bg-gold text-black font-bold rounded-lg text-lg border-2 border-gold hover:bg-transparent hover:text-gold hover:border-gold transition-all"
        >
        Entrer
        </button>

      </div>
    </div>
  );
};

export default VideoPage;
