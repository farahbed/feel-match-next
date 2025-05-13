'use client';
import { useState } from 'react';

export default function FormulaireSpeedDating() {
  const [formData, setFormData] = useState({
    age: '',
    ville: '',
    disponibilite: '',
    langue: '',
    intentions: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire Speed Dating soumis :", formData);
    alert("Préférences enregistrées !");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl px-4 sm:px-6 md:px-10 mx-auto bg-[#1a1a1a] p-8 sm:p-10 rounded-3xl border border-[#c2a661] shadow-2xl space-y-6"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#c2a661] mb-6 uppercase">
        Speed Dating – Infos rapides
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-[#c2a661] font-semibold">Âge</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
          />
        </div>

        <div>
          <label className="block mb-1 text-[#c2a661] font-semibold">Ville</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            placeholder="Ex : Paris, Lyon..."
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-1 text-[#c2a661] font-semibold">Disponibilité</label>
          <select
            name="disponibilite"
            value={formData.disponibilite}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
          >
            <option value="">-- Choisir --</option>
            <option value="semaine">En semaine</option>
            <option value="weekend">Le week-end</option>
            <option value="soirée">En soirée</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-1 text-[#c2a661] font-semibold">Langue préférée</label>
          <input
            type="text"
            name="langue"
            value={formData.langue}
            onChange={handleChange}
            placeholder="Français, Arabe, Anglais..."
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-1 text-[#c2a661] font-semibold">Intentions</label>
          <textarea
            name="intentions"
            value={formData.intentions}
            onChange={handleChange}
            placeholder="Ex : rencontre sérieuse, discussion, faire connaissance..."
            rows="3"
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
          />
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 text-sm sm:text-lg rounded-full bg-[#c2a661] text-black font-bold hover:bg-yellow-500 transition"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}