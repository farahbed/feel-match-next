'use client';

export default function VideoPage({ onEnterClick }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
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

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 text-center pb-8">
        <h1 className="text-white text-5xl font-bold">Bienvenue sur Feel & Match</h1>
        <p className="text-white text-lg mt-4">Cliquez pour entrer</p>
        <button
          onClick={onEnterClick}
          className="px-6 py-3 bg-gold text-black font-bold rounded-lg text-lg border-2 border-gold hover:bg-transparent hover:text-gold hover:border-gold transition-all"
        >
          Entrer
        </button>
      </div>
    </div>
  );
}
