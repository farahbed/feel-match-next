"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Pour la redirection

const VideoPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simule un chargement de 2 secondes, tu peux le remplacer par un vrai chargement si besoin
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Remplacer ce délai par un chargement réel si nécessaire
  }, []);

  // Fonction de redirection vers SpeedDatingHomePage
  const handleEnterSite = () => {
    router.push('/speed-dating-home'); // Redirection vers la page SpeedDatingHomePage
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      {loading ? (
        <div className="loader">Chargement...</div> // Message de chargement ou animation vidéo
      ) : (
        <div>
          {/* Contenu de la VideoPage une fois le chargement terminé */}
          <video
            src="/path/to/your/video.mp4" // Remplace avec ton propre fichier vidéo
            autoPlay
            loop
            muted
            className="w-full h-auto"
          ></video>
          <button
            onClick={handleEnterSite}
            className="mt-8 px-6 py-3 bg-gold text-black font-bold"
          >
            Entrer sur le site
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;

