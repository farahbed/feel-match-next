import React, { useState, useEffect, useRef } from "react";

const CallToActionSection = ({ onButtonClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // pour déclencher l'animation qu'une seule fois
        }
      },
      { threshold: 0.5 } // ajuste ce seuil selon tes besoins
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
    ref={sectionRef}
    className={`cta-container flex flex-col justify-center items-center w-full mt-16 min-h-[500px] border-red-500 ${
      isVisible ? "animate-zoomIn" : "opacity-0"
    }`}
    >

    <div className="bg-black border-2 border-gold p-8 w-4/5 flex flex-col items-center text-center border border-blue-500">
      <h2 className="text-3xl font-bold text-gold">Trouvez votre match maintenant</h2>
      <p className="text-gray-300 mt-4">
        Inscrivez-vous dès maintenant pour participer à nos événements de rencontres.
      </p>
      <p className="text-gray-300 mt-4">
        Rencontrez des célibataires qui partagent vos centres d'intérêt.
      </p>
      <p className="text-gray-300 mt-4">
        Vivez une expérience unique et inoubliable.
      </p>
  
      <div className="mt-8 w-full border border-green-500">
        <button className="cta-button px-6 py-3 bg-gold text-black font-bold text-lg rounded-lg hover:bg-gold-dark transition-all mx-auto border border-yellow-500"
        onClick={onButtonClick}
        >
          Trouvez votre match maintenant
        </button>
      </div>
    </div>
  </section>
  
  );
};

export default CallToActionSection;