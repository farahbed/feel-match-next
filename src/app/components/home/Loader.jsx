import React, { useEffect } from "react";

const VideoLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Masquer le loader après quelques secondes
    }, 4000); // Ajuste la durée selon ta vidéo

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <video
        autoPlay
        muted
        playsInline
        onEnded={onFinish} // Cache le loader quand la vidéo est terminée
        className="absolute w-full h-full object-cover"
      >
        <source src="/LoaderVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoLoader;
