"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpeedDatingHomePage from "./components/home/SpeedDatingHomePage";
import VideoPage from "./components/home/VideoPage";


export default function Home() {
  const [showVideo, setShowVideo] = useState(true);

  const handleEnterClick = () => {
    setShowVideo(false); // Cache la vidéo et affiche la page d'accueil
  };

  return (
    <>
      {showVideo ? (
        <VideoPage onEnterClick={handleEnterClick} /> // Passe handleEnterClick en prop
      ) : (
        <>
          <Header />
          <SpeedDatingHomePage /> {/* Affiche la page d'accueil après vidéo */}
          <Footer />
        </>
      )}
    </>
  );
}
