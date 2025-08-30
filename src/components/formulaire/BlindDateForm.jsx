
// Formulaire Blind Date 100% complet basé sur le PDF
'use client';
import { useState } from 'react';

export default function FormulaireBlindDate() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (checked ? [...(prev[name] || []), value] : prev[name].filter(v => v !== value))
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("Erreur : utilisateur non identifié.");
    try {
      const response = await fetch("https://qq0238b626.execute-api.eu-west-3.amazonaws.com/dev/updatePreferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, preferences: formData })
      });
      const data = await response.json();
      response.ok ? alert("Préférences enregistrées !") : alert("Erreur : " + data.message);
    } catch (error) {
      alert("Erreur lors de l’enregistrement.");
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const inputStyle = "w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]";
  const sectionStyle = "grid grid-cols-1 sm:grid-cols-2 gap-6";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-[#1a1a1a] p-8 rounded-3xl border border-[#c2a661] shadow-2xl space-y-6">
      {step === 1 && (
        <div className={sectionStyle}>
          <h3 className="text-xl font-bold text-[#c2a661] sm:col-span-2">Étape 1 – À propos de toi</h3>
          <select name="genre" onChange={handleChange} className={inputStyle}>
            <option value="">Tu es ?</option>
            <option value="femme">Femme</option>
            <option value="homme">Homme</option>
          </select>
          <select name="recherche" onChange={handleChange} className={inputStyle}>
            <option value="">Que recherches-tu ?</option>
            <option value="femme">Femmes</option>
            <option value="homme">Hommes</option>
          </select>
          <input name="age" placeholder="Quel âge as-tu ?" onChange={handleChange} className={inputStyle} />
          <input name="taille" placeholder="Quelle est ta taille ?" onChange={handleChange} className={inputStyle} />
          <input name="origine" placeholder="Ton origine" onChange={handleChange} className={inputStyle} />
          <input name="profession" placeholder="Profession" onChange={handleChange} className={inputStyle} />
          <select name="enfants" onChange={handleChange} className={inputStyle}>
            <option value="">As-tu des enfants ?</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
          <select name="veutEnfants" onChange={handleChange} className={inputStyle}>
            <option value="">Souhaites-tu en avoir ?</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
            <option value="peu importe">Peu importe</option>
          </select>
          <input name="relationRecente" placeholder="Date de ta dernière relation sérieuse ?" onChange={handleChange} className={inputStyle} />
          <textarea name="attentes" placeholder="Qu'attends-tu de cette expérience ?" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <select name="animaux" onChange={handleChange} className={inputStyle}>
            <option value="">As-tu des animaux ?</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
          <input name="animalType" placeholder="Si oui, lequel ?" onChange={handleChange} className={inputStyle} />
          <textarea name="famille" placeholder="Ton rapport à la famille" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <select name="cuisine" onChange={handleChange} className={inputStyle}>
            <option value="">Aimes-tu cuisiner ?</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
          <select name="logement" onChange={handleChange} className={inputStyle}>
            <option value="">Chez toi tu es plutôt...</option>
            <option value="maniaque">Maniaque</option>
            <option value="soigné">Soigné</option>
            <option value="bordélique">Bordélique</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div className={sectionStyle}>
          <h3 className="text-xl font-bold text-[#c2a661] sm:col-span-2">Étape 2 – Partenaire idéal(e)</h3>
          <input name="agePartenaire" placeholder="Âge souhaité du partenaire" onChange={handleChange} className={inputStyle} />
          <input name="taillePartenaire" placeholder="Taille souhaitée du partenaire" onChange={handleChange} className={inputStyle} />
          <input name="originePartenaire" placeholder="Origine souhaitée" onChange={handleChange} className={inputStyle} />
          <textarea name="physique" placeholder="Décris physiquement ton/ta partenaire" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <textarea name="valeursPartenaire" placeholder="Valeurs importantes chez lui/elle" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <textarea name="qualitesRecherchees" placeholder="Qualités recherchées" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
        </div>
      )}

      {step === 3 && (
        <div className={sectionStyle}>
          <h3 className="text-xl font-bold text-[#c2a661] sm:col-span-2">Étape 3 – Vision du couple</h3>
          <textarea name="activites" placeholder="Activités à faire ensemble" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <textarea name="rdvIdeal" placeholder="Décris ton 1er rendez-vous idéal" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <select name="langageAmour" onChange={handleChange} className={inputStyle}>
            <option value="">Langage de l'amour</option>
            <option value="paroles">Paroles valorisantes</option>
            <option value="temps">Moments de qualité</option>
            <option value="cadeaux">Cadeaux</option>
            <option value="services">Services rendus</option>
            <option value="contact">Contact physique</option>
          </select>
          <textarea name="valeurs" placeholder="Valeurs et objectifs de vie" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          <select name="lieuVie" onChange={handleChange} className={inputStyle}>
            <option value="">Lieu de vie idéal</option>
            <option value="ville">Ville</option>
            <option value="campagne">Campagne</option>
            <option value="mer">Bord de mer</option>
          </select>
          <select name="styleVie" onChange={handleChange} className={inputStyle}>
            <option value="">Style de couple</option>
            <option value="stable">Stable</option>
            <option value="aventureux">Aventureux</option>
            <option value="mixte">Mixte</option>
          </select>
          <textarea name="peur" placeholder="Ta plus grande peur en couple ?" onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
        </div>
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 text-white underline">← Précédent</button>}
        {step < 3
          ? <button type="button" onClick={nextStep} className="ml-auto px-4 py-2 text-white underline">Suivant →</button>
          : <button type="submit" className="ml-auto px-6 py-3 bg-[#c2a661] text-black font-bold rounded-full">Valider</button>}
      </div>
    </form>
  );
}
