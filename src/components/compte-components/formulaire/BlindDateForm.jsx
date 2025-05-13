'use client';
import { useState } from 'react';

export default function FormulaireBlindDate() {
  const [formData, setFormData] = useState({
    ageMin: '',
    ageMax: '',
    religionLevel: '',
    prays: '',
    hijab: '',
    smokes: '',
    wantsKids: '',
    lifestyle: '',
    personality: '',
    dealBreakers: '',
    mustHaves: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  // Fonction pour gérer l'envoi du formulaire
  // ✅ Récupération de l'ID utilisateur
  // ✅ Envoi des préférences à l'API Gateway
  // ✅ Affichage d'un message de succès ou d'erreur
  // ✅ Gestion des erreurs

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = localStorage.getItem("userEmail"); // ✅ Récupération ici
  
    if (!email) {
      // Si l'utilisateur n'est pas identifié, on affiche un message d'erreur
      alert("Erreur : utilisateur non identifié.");
      return;
    }
  
    try {
      const response = await fetch("https://qq0238b626.execute-api.eu-west-3.amazonaws.com/dev/updatePreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          preferences: formData
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Préférences enregistrées !");
        console.log("Réponse Lambda :", data);
      } else {
        alert("Erreur : " + data.message);
        console.error("Erreur côté Lambda :", data);
      }
  
    } catch (error) {
      console.error("Erreur fetch :", error);
      alert("Erreur lors de l’enregistrement.");
    }
  };
  // ✅ Affichage du formulaire
  // ✅ Gestion des champs de saisie
  // ✅ Gestion des sélections
 

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#1a1a1a] p-10 rounded-3xl border border-[#c2a661] shadow-2xl space-y-6">
  <h2 className="text-3xl font-bold text-center text-[#c2a661] mb-8 uppercase">Blind Date – Tes critères sur mesure</h2>

  <div className="grid md:grid-cols-2 gap-6">
    {/* Âge min */}
    <div>
      <label className="block mb-1 text-[#c2a661] font-semibold">Âge minimum</label>
      <input
        type="number"
        name="ageMin"
        value={formData.ageMin}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
      />
    </div>

    {/* Âge max */}
    <div>
      <label className="block mb-1 text-[#c2a661] font-semibold">Âge maximum</label>
      <input
        type="number"
        name="ageMax"
        value={formData.ageMax}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
      />
    </div>

    {/* Selects */}
    {[
      { name: "religionLevel", label: "Pratique religieuse" },
      { name: "prays", label: "Doit prier ?" },
      { name: "hijab", label: "Hijab accepté ?" },
      { name: "smokes", label: "Fume ?" },
      { name: "wantsKids", label: "Souhaite des enfants ?" },
    ].map((field) => (
      <div key={field.name}>
        <label className="block mb-1 text-[#c2a661] font-semibold">{field.label}</label>
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
        >
          <option value="">-- Sélectionner --</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
          <option value="peu importe">Peu importe</option>
          {field.name === "smokes" && <option value="occasionnel">Occasionnellement</option>}
          {field.name === "wantsKids" && <option value="indécis">Indécis(e)</option>}
          {field.name === "religionLevel" && (
            <>
              <option value="pas important">Peu important</option>
              <option value="modéré">Modéré</option>
              <option value="important">Important</option>
              <option value="fondamental">Fondamental</option>
            </>
          )}
        </select>
      </div>
    ))}

    {/* Input texte */}
    <div className="md:col-span-2">
      <label className="block mb-1 text-[#c2a661] font-semibold">Style de vie</label>
      <input
        type="text"
        name="lifestyle"
        value={formData.lifestyle}
        onChange={handleChange}
        placeholder="Ex : sportif, healthy, casanier..."
        className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block mb-1 text-[#c2a661] font-semibold">Type de personnalité recherchée</label>
      <input
        type="text"
        name="personality"
        value={formData.personality}
        onChange={handleChange}
        placeholder="Ex : drôle, calme, ambitieux..."
        className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block mb-1 text-[#c2a661] font-semibold">Points rédhibitoires</label>
      <textarea
        name="dealBreakers"
        value={formData.dealBreakers}
        onChange={handleChange}
        rows="3"
        className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
        placeholder="Ce que tu refuses absolument (ex : fumeur, instable...)"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block mb-1 text-[#c2a661] font-semibold">Critères essentiels</label>
      <textarea
        name="mustHaves"
        value={formData.mustHaves}
        onChange={handleChange}
        rows="3"
        className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]"
        placeholder="Ce que tu veux impérativement chez ton match"
      />
    </div>
  </div>

  <div className="text-center mt-8">
    <button
      type="submit"
      className="px-10 py-4 rounded-full bg-[#c2a661] text-black font-bold hover:bg-yellow-500 transition text-lg"
    >
      Sauvegarder mes critères
    </button>
  </div>
</form>
  );
}