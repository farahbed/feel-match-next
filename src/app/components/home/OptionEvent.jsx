import React from "react";

const OptionEvent = () => {
  return (
    <section className="w-full py-16 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Blind Date */}
        <div>
          <h2 className="text-gold text-3xl font-bold">Blind Date</h2>
          <p className="mt-4 text-red-dark leading-relaxed">
            Vivez un rendez-vous unique où le destin frappe à votre porte. Grâce à notre formulaire, nous vous mettons en relation avec une personne qui correspond à vos attentes. Pas de surprises, juste des connexions authentiques sur mesure.
          </p>
          <p className="mt-3 text-red-dark leading-relaxed">
            Un rendez-vous mystère, où l'excitation et la curiosité se mêlent. Oubliez les mauvaises rencontres, ici chaque instant est un pas vers celui ou celle qui vous correspond vraiment.
          </p>
        </div>

        {/* Speed Dating */}
        <div>
          <h2 className="text-gold font-bold">Speed Dating</h2>
          <p className="mt-4 text-red-dark leading-relaxed">
            En seulement quelques minutes, plongez dans une série de rencontres captivantes. Chaque rendez-vous est conçu pour révéler la meilleure version de vous-même, et chaque rencontre vous rapproche de votre match idéal. Rapide, fun, et efficace – c'est l'occasion de créer des connexions authentiques, sans perdre de temps.
          </p>
          <p className="mt-3 text-red-dark leading-relaxed">
            Chaque rencontre est une chance, chaque seconde compte. Tendez vers l'amour, avec des moments de partage instantanés et intenses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OptionEvent;