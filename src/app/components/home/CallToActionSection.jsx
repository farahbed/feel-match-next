import React from "react";

const CallToActionSection = ({ onButtonClick }) => {
  console.log("✅ CallToActionSection est rendu");

  return (
    <section 
      className="cta-container flex justify-center items-center w-full mt-16 min-h-[500px]" 
      data-aos="zoom-in"
    >
      <div className="bg-black border-2 border-gold p-8 text-center w-4/5">
        <h2 className="text-gold font-bold">Trouver l'amour avec style</h2>
        <p className="mt-4 text-gold">
          Vous êtes à un clic de rencontrer la personne qui vous correspond vraiment. Remplissez notre formulaire et laissez-nous créer la rencontre de vos rêves !
        </p>
        <div className="mt-8 flex justify-center">
          <button
            className="cta-button px-6 py-3 bg-gold text-black font-bold text-lg rounded-lg hover:bg-gold-dark transition-all"
            data-aos-delay="500"
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