"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import SpeedDatingHomePage from './components/home/SpeedDatingHomePage';
import VideoPage from './components/home/VideoPage';

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 5000); // Redirection après 5 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showVideo ? (
        <VideoPage />
      ) : (
        <>
          <Header />
          <SpeedDatingHomePage />
          <Footer />
        </>
      )}
    </>
  );
}
 