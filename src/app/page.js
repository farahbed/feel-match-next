'use client';

import { useEffect, useRef, useState } from 'react';
import VideoSection from './intro/VideoSection';
import SpeedDatingIntro from '@/components/home/SpeedDatingIntro';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.4; // 40% de hauteur
      if (window.scrollY > scrollThreshold && showVideo) {
        setShowVideo(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showVideo]);

  const handleReplayClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowVideo(true);
  };

  return (
    <main className="w-full overflow-x-hidden relative">
      {showVideo && (
        <div ref={videoRef}>
          <VideoSection />
        </div>
      )}

      <SpeedDatingIntro />

      {!showVideo && (
        <button
          onClick={handleReplayClick}
          className="fixed bottom-6 right-6 bg-black/70 text-white rounded-full p-3 shadow-lg hover:bg-gold hover:text-black transition-all z-50"
          title="Revoir la vidéo d’intro"
        >
          🎬
        </button>
      )}
    </main>
  );
}