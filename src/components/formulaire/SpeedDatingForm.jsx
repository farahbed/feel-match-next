'use client';
import { useState } from 'react';

export default function FormulaireSpeedDating() {
  const [formData, setFormData] = useState({
    prenom: '',
    age: '',
    ville: '',
    taille: '',
    corpulence: '',
    enfants: '',
    qualities: [],
    confession: '',
    partenaireConfession: '',
    animaux: '',
    typeAnimaux: '',
    accepteAnimaux: '',
    relationIdeale: [],
    disponibilite: '',
    preferenceSoiree: '',
    intolerances: [],
    descriptionPartenaire: '',
    trancheAge: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => {
        const updatedList = checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value);

        if ((name === 'qualities' && updatedList.length > 3) ||
            (name === 'relationIdeale' && updatedList.length > 2)) {
          return prev;
        }

        return {
          ...prev,
          [name]: updatedList
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire Speed Dating soumis :", formData);
    alert("Préférences enregistrées !");
  };

  const isMaxSelected = (name, max) => formData[name].length >= max;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl px-4 sm:px-6 md:px-10 mx-auto bg-[#1a1a1a] p-8 sm:p-10 rounded-3xl border border-[#c2a661] shadow-2xl space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#c2a661] mb-6 uppercase">
        Speed Dating – Questionnaire complet
      </h2>

      <div className="space-y-4">
        <label className="block text-[#c2a661] font-semibold">Quel est votre prénom ?</label>
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />

        <label className="block text-[#c2a661] font-semibold">Quel âge avez-vous ?</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />

        <label className="block text-[#c2a661] font-semibold">Où habitez-vous ?</label>
        <input type="text" name="ville" value={formData.ville} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />

        <label className="block text-[#c2a661] font-semibold">Quelle est votre disponibilité ?</label>
        <select name="disponibilite" value={formData.disponibilite} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Semaine">En semaine</option>
          <option value="Week-end">Le week-end</option>
          <option value="Soirée">En soirée</option>
        </select>

        <label className="block text-[#c2a661] font-semibold">Quelle est votre taille ? (en cm)</label>
        <input type="text" name="taille" value={formData.taille} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />

        <label className="block text-[#c2a661] font-semibold">Quelle est votre corpulence ?</label>
        <select name="corpulence" value={formData.corpulence} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Fit">Fit</option>
          <option value="Mince">Mince</option>
          <option value="Normale">Normale</option>
          <option value="Ronde">Ronde</option>
          <option value="Indifférent">Indifférent</option>
        </select>

        <label className="block text-[#c2a661] font-semibold">Avez-vous des enfants ?</label>
        <select name="enfants" value={formData.enfants} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>

        <label className="block text-[#c2a661] font-semibold">Quelles qualités recherchez-vous chez votre partenaire ? (3 choix maximum)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['Ambitieux(se)', 'Attentionné(e)', 'Drôle', 'Dynamique', 'Généreux(se)', 'Indépendant(e)', 'Loyal(e)', 'Romantique', 'Sociable', 'Discret(ète)', 'Extraverti(e)', 'Réservé(e)'].map((qualite) => (
            <label key={qualite} className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                name="qualities"
                value={qualite}
                checked={formData.qualities.includes(qualite)}
                onChange={handleChange}
                disabled={!formData.qualities.includes(qualite) && isMaxSelected('qualities', 3)}
              />
              <span>{qualite}</span>
            </label>
          ))}
        </div>

        <label className="block text-[#c2a661] font-semibold">Quelle est votre confession ?</label>
        <select name="confession" value={formData.confession} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Chrétien">Chrétien</option>
          <option value="Musulman">Musulman</option>
          <option value="Juif">Juif</option>
          <option value="Athée">Athée</option>
          <option value="Astrologie">Astrologie</option>
          <option value="Autres">Autres</option>
          <option value="Indifférent">Indifférent</option>
        </select>

        <label className="block text-[#c2a661] font-semibold">Vous souhaitez rencontrer un partenaire…</label>
        <select name="partenaireConfession" value={formData.partenaireConfession} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Chrétien">Chrétien</option>
          <option value="Musulman">Musulman</option>
          <option value="Juif">Juif</option>
          <option value="Athée">Athée</option>
          <option value="Astrologie">Astrologie</option>
          <option value="Autres">Autres</option>
          <option value="Indifférent">Indifférent</option>
        </select>

        <label className="block text-[#c2a661] font-semibold">Avez-vous des animaux de compagnie ?</label>
        <select name="animaux" value={formData.animaux} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
        {formData.animaux === 'Oui' && (
          <input type="text" name="typeAnimaux" value={formData.typeAnimaux} onChange={handleChange} placeholder="Si oui, lequel ?" className="w-full p-3 mt-2 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />
        )}

        <label className="block text-[#c2a661] font-semibold">Êtes-vous ouvert(e) à ce que votre partenaire ait des animaux ?</label>
        <select name="accepteAnimaux" value={formData.accepteAnimaux} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>

        <label className="block text-[#c2a661] font-semibold">Quelle est votre vision d’une relation idéale ? (1 ou 2 choix maximum)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Relation sérieuse', 'Mariage / engagement', 'Relation libre', 'Pas de relation sérieuse', 'Amitié qui évolue', 'Je ne sais pas encore'].map((val) => (
            <label key={val} className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                name="relationIdeale"
                value={val}
                checked={formData.relationIdeale.includes(val)}
                onChange={handleChange}
                disabled={!formData.relationIdeale.includes(val) && isMaxSelected('relationIdeale', 2)}
              />
              <span>{val}</span>
            </label>
          ))}
        </div>

        <label className="block text-[#c2a661] font-semibold">Plutôt soirées Netflix à deux ou sorties entre amis ?</label>
        <input type="text" name="preferenceSoiree" value={formData.preferenceSoiree} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />

        <label className="block text-[#c2a661] font-semibold">Y a-t-il des choses que vous ne pourriez pas accepter chez un partenaire ?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Alcool', 'Cigarette', 'Drogue', 'Autres', 'Indifférent'].map((val) => (
            <label key={val} className="text-white">
              <input type="checkbox" name="intolerances" value={val} onChange={handleChange} className="mr-2" /> {val}
            </label>
          ))}
        </div>

        <label className="block text-[#c2a661] font-semibold">Décrivez-moi votre partenaire idéal(e)</label>
        <textarea name="descriptionPartenaire" value={formData.descriptionPartenaire} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]" />

        <label className="block text-[#c2a661] font-semibold">Quelle tranche d’âge souhaitez-vous rencontrer ?</label>
        <select name="trancheAge" value={formData.trancheAge} onChange={handleChange} className="w-full p-3 rounded-xl bg-black text-white border border-gray-600 focus:border-[#c2a661]">
          <option value="">-- Choisir --</option>
          <option value="20-30 ans">20 - 30 ans</option>
          <option value="30-40 ans">30 - 40 ans</option>
          <option value="40-50 ans">40 - 50 ans</option>
          <option value="50+ ans">50 ans et plus</option>
        </select>
      </div>

      <div className="text-center mt-8">
        <button type="submit" className="w-full sm:w-auto px-6 py-3 text-sm sm:text-lg rounded-full bg-[#c2a661] text-black font-bold hover:bg-yellow-500 transition">
          Enregistrer
        </button>
      </div>
    </form>
  );
}