"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const VideoPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Attendre la durée de la vidéo avant d'afficher le bouton
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Ajuste ce temps selon la durée de ta vidéo
  }, []);

  const handleEnterSite = () => {
    router.push("/speed-dating-home");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      {loading ? (
        // Affichage de la vidéo pendant le "chargement"
        <video
          src="/LoaderVideo.mp4" // Le fichier dans /public
          autoPlay
          muted
          className="w-full h-auto"
        />
      ) : (
        <div className="text-center">
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
