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
      className={`cta-container flex justify-center items-center w-full mt-16 min-h-[500px] ${
        isVisible ? "animate-zoomIn" : "opacity-0"
      }`}
    >
      <div className="bg-black border-2 border-gold p-8 text-center w-4/5">
        <h2 className="text-gold font-bold">Trouver l'amour avec style</h2>
        <p className="mt-4 text-gold">
          Vous êtes à un clic de rencontrer la personne qui vous correspond vraiment. Remplissez notre formulaire et laissez-nous créer la rencontre de vos rêves !
        </p>
        <div className="mt-8 flex justify-center">
          <button
            className="cta-button px-6 py-3 bg-gold text-black font-bold text-lg rounded-lg hover:bg-gold-dark transition-all"
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