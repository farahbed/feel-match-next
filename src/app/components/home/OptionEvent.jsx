import { motion } from "framer-motion";

export default function OptionEvent() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="blind-speed-container flex flex-row w-full max-w-4xl border border-gray-500 divide-x divide-gray-500">
        {/* Blind Date Block */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="w-1/2 p-8 text-center flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-gold">Blind Date</h2>
          <p className="mt-4 text-red-dark">Vivez un rendez-vous unique où le destin frappe à votre porte...</p>
          <p className="mt-3 text-red-dark">Un rendez-vous mystère, où l'excitation et la curiosité se mêlent...</p>
          <p className="mt-3 text-red-dark">Partagez un moment spécial avec un inconnu et laissez la magie opérer.</p>
          <p className="mt-3 text-red-dark">Saurez-vous reconnaître votre âme sœur dans l'ombre du mystère ?</p>
        </motion.div>

       {/* Separator */}
<div className="separator h-full"></div>

        {/* Speed Dating Block */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, delay: 0.5 }}
          className="w-1/2 p-8 text-center flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-gold">Speed Dating</h2>
          <p className="mt-4 text-red-dark">Découvrez plusieurs personnes en un temps limité...</p>
          <p className="mt-3 text-red-dark">Un moyen rapide et efficace de faire de nouvelles rencontres...</p>
          <p className="mt-3 text-red-dark">Brisez la glace en quelques minutes et laissez votre charme opérer.</p>
          <p className="mt-3 text-red-dark">Qui sait ? Un sourire, un regard, et tout peut changer.</p>
        </motion.div>
      </div>
    </div>
  );
}
