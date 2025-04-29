import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OptionEvent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="flex items-center justify-center py-16 bg-black text-white">
      <div
        ref={ref}
        className="blind-speed-container max-w-7xl w-full px-4 flex flex-col sm:flex-row justify-center items-stretch gap-12"
      >
        {/* Blind Date Block */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex-1 max-w-2xl text-center flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-gold mb-4">Blind Date</h2>
          <p className="mt-3 text-lg text-gray-200">Vivez un rendez-vous unique où le destin frappe à votre porte...</p>
          <p className="mt-3 text-lg text-gray-200">Un rendez-vous mystère, où l'excitation et la curiosité se mêlent...</p>
          <p className="mt-3 text-lg text-gray-200">Partagez un moment spécial avec un inconnu et laissez la magie opérer.</p>
          <p className="mt-3 text-lg text-gray-200">Saurez-vous reconnaître votre âme sœur dans l'ombre du mystère ?</p>
        </motion.div>

        {/* Séparateur doré */}
        <div className="separator hidden sm:block h-auto" />

        {/* Speed Dating Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 max-w-2xl text-center flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-gold mb-4">Speed Dating</h2>
          <p className="mt-3 text-lg text-gray-200">Découvrez plusieurs personnes en un temps limité...</p>
          <p className="mt-3 text-lg text-gray-200">Un moyen rapide et efficace de faire de nouvelles rencontres...</p>
          <p className="mt-3 text-lg text-gray-200">Brisez la glace en quelques minutes et laissez votre charme opérer.</p>
          <p className="mt-3 text-lg text-gray-200">Qui sait ? Un sourire, un regard, et tout peut changer.</p>
        </motion.div>
      </div>
    </div>
  );
}
