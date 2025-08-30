'use client';

import { useEffect, useState } from 'react';

export default function VideoSection() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 50); // dès qu’on scrolle un peu, on cache
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/LoaderVideo.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-5xl font-bold z-10">
        Bienvenue sur Feel & Match
      </div>
    </section>
  );
}