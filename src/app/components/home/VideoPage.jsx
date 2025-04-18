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

      {/* Contenu en bas de la page */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 text-center pb-8">
        <h1 className="text-white text-5xl font-bold">
          Bienvenue sur notre site de rencontre
        </h1>
        <p className="text-white text-lg mt-4">
          Cliquez sur le bouton pour entrer
        </p>
        <button
          onClick={onEnterClick} // Appel de la fonction pour changer l'état
          className="video-page-button px-6 py-3 bg-gold text-black font-bold rounded-lg text-lg border-2 border-gold hover:bg-transparent hover:text-gold hover:border-gold transition-all"
        >
          Entrer
        </button>
      </div>
    </div>
  );
};

export default VideoPage;