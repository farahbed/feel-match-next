import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CallToActionSection = ({ onButtonClick }) => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-center w-full mt-16 px-4 min-h-[500px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black border-2 border-gold p-8 w-full max-w-2xl flex flex-col items-center text-center rounded-lg shadow-lg"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gold">Trouvez votre match maintenant</h2>
        <p className="text-gray-300 mt-4">
          Inscrivez-vous dès maintenant pour participer à nos événements de rencontres.
        </p>
        <p className="text-gray-300 mt-4">
          Rencontrez des célibataires qui partagent vos centres d'intérêt.
        </p>
        <p className="text-gray-300 mt-4">
          Vivez une expérience unique et inoubliable.
        </p>

        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-6 py-3 bg-gold text-black font-bold text-lg rounded-lg hover:bg-gold-dark hover:text-white transition-all"
            onClick={onButtonClick}
          >
            Trouvez votre match maintenant
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToActionSection;