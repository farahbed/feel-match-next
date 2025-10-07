"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CallToActionSection = ({ onButtonClick }) => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center w-full py-20 px-4 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #1b1b1b 0%, #0f0f0f 100%)",
      }}
    >
      {/* Halo animé subtil */}
      <motion.div
        className="absolute inset-0 opacity-40"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(194,166,97,0.1), rgba(255,255,255,0.05), rgba(194,166,97,0.1))",
          backgroundSize: "200% 200%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-[#121212]/80 border border-[#c2a661] backdrop-blur-sm 
                   p-8 sm:p-10 max-w-2xl w-full text-center rounded-2xl shadow-[0_0_25px_rgba(194,166,97,0.25)]"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#c2a661] leading-tight">
          Trouvez votre match maintenant
        </h2>

        <div className="mt-6 space-y-3 text-gray-300 text-base sm:text-lg">
          <p>Inscrivez-vous dès maintenant pour participer à nos événements de rencontres.</p>
          <p>Rencontrez des célibataires qui partagent vos centres d’intérêt.</p>
          <p>Vivez une expérience unique et inoubliable.</p>
        </div>

        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 20px rgba(194,166,97,0.6)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={onButtonClick}
          className="mt-8 px-8 py-3 rounded-full font-semibold text-lg tracking-wide
                     bg-[#c2a661] text-black border-2 border-[#c2a661]
                     hover:bg-transparent hover:text-[#c2a661] transition-all duration-300"
        >
          💛 Trouvez votre match maintenant
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CallToActionSection;