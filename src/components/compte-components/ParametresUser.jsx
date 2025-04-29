'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ParametresUser() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <div className="flex flex-col p-8 bg-black min-h-screen text-white space-y-6">
      <h1 className="text-4xl font-bold text-[#c2a661] text-center mb-8">Paramètres</h1>

      {/* Liste des sections */}
      {sections.map(({ id, title, content }) => (
        <div key={id} className="border-b border-[#c2a661] pb-4">
          <button
            onClick={() => toggleSection(id)}
            className="flex justify-between items-center w-full py-4 text-left"
          >
            <span className="text-2xl font-bold text-[#c2a661]">{title}</span>
            <ChevronDown
              className={`w-8 h-8 text-[#c2a661] transition-transform duration-300 ${openSection === id ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ${openSection === id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="mt-4 space-y-6 text-gray-300">
              {content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const sections = [
  {
    id: 'email',
    title: 'Modifier mon Email',
    content: (
      <>
        <p className="text-gray-400">Modifie ton adresse email. Entre ton mot de passe actuel pour confirmer.</p>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#c2a661]">Mot de passe actuel</label>
            <input type="password" placeholder="Mot de passe actuel" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#c2a661]">Nouvel Email</label>
            <input type="email" placeholder="Nouvel Email" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
          </div>
          <button className="w-full bg-[#c2a661] text-black font-bold p-3 rounded-full hover:bg-yellow-500 hover:shadow-[0_4px_14px_0_#c2a661] transition-all mt-4">Enregistrer</button>
        </div>
      </>
    ),
  },
  {
    id: 'password',
    title: 'Modifier mon Mot de Passe',
    content: (
      <>
        <p className="text-gray-400">Change ton mot de passe pour protéger ton compte.</p>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#c2a661]">Mot de passe actuel</label>
            <input type="password" placeholder="Mot de passe actuel" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#c2a661]">Nouveau mot de passe</label>
            <input type="password" placeholder="Nouveau mot de passe" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#c2a661]">Confirmer nouveau mot de passe</label>
            <input type="password" placeholder="Confirmer nouveau mot de passe" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
          </div>
          <button className="w-full bg-[#c2a661] text-black font-bold p-3 rounded-full hover:bg-yellow-500 hover:shadow-[0_4px_14px_0_#c2a661] transition-all mt-4">Enregistrer</button>
        </div>
      </>
    ),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    content: (
      <>
        <p className="text-gray-400">Choisis comment recevoir tes notifications Feel & Match.</p>
        <div className="flex flex-col space-y-4 mt-4">
          <label className="flex items-center"><input type="checkbox" className="mr-2" />Recevoir par Email</label>
          <label className="flex items-center"><input type="checkbox" className="mr-2" />Recevoir par SMS</label>
          <label className="flex items-center"><input type="checkbox" className="mr-2" />Ne pas recevoir de notifications</label>
        </div>
        <button className="w-full bg-[#c2a661] text-black font-bold p-3 rounded-full hover:bg-yellow-500 hover:shadow-[0_4px_14px_0_#c2a661] transition-all mt-6">Enregistrer</button>
      </>
    ),
  },
  {
    id: 'preferences',
    title: 'Préférences de Match',
    content: (
      <>
        <p className="text-gray-400">Définis ta distance maximale et tranche d'âge pour tes matchs idéaux.</p>
        <label className="block mt-2 mb-1">Distance maximale (km)</label>
        <input type="range" min="10" max="200" className="w-full" />
        <label className="block mt-4 mb-1">Âge minimum</label>
        <input type="number" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
        <label className="block mt-4 mb-1">Âge maximum</label>
        <input type="number" className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none placeholder:text-gray-400" />
        <label className="block mt-4 mb-1">Genre recherché</label>
        <select className="w-full p-4 rounded-full border border-[#c2a661] bg-black text-white focus:ring-2 focus:ring-[#c2a661] focus:outline-none">
          <option>Femme</option>
          <option>Homme</option>
          <option>Tous</option>
        </select>
        <button className="w-full bg-[#c2a661] text-black font-bold p-3 rounded-full hover:bg-yellow-500 hover:shadow-[0_4px_14px_0_#c2a661] transition-all mt-6">Enregistrer</button>
      </>
    ),
  },
  {
    id: 'support',
    title: 'Assistance Feel & Match',
    content: (
      <>
        <p className="text-gray-400">Besoin d'aide ? Notre équipe est là pour toi !</p>
        <button className="w-full bg-[#c2a661] text-black font-bold p-3 rounded-full hover:bg-yellow-500 hover:shadow-[0_4px_14px_0_#c2a661] transition-all mt-6">Contacter l'assistance</button>
      </>
    ),
  },
  {
    id: 'danger',
    title: 'Zone Danger',
    content: (
      <>
        <p className="text-gray-400">Attention : Cette action est définitive. Tu perdras toutes tes données.</p>
        <button className="w-full bg-red-600 text-white font-bold p-3 rounded-full hover:bg-red-700 hover:shadow-[0_4px_14px_0_red] transition-all mt-6">Supprimer mon compte</button>
      </>
    ),
  },
];
