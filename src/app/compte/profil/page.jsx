'use client';
import { useState } from 'react';

export default function Profil() {
  // État des données du profil utilisateur
  const [profil, setProfil] = useState({
    citation: "",
    nom: "",
    age: "",
    ville: "",
    taille: "",
    metier: "",
    enfant: "",
    passions: [],
    recherche: "",
    projet: "",
  });

  // État pour savoir quelle section est en édition
  const [editSection, setEditSection] = useState(null);

  // Fonction pour mettre à jour un champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour sauvegarder et quitter l'édition
  const handleSave = () => {
    setEditSection(null);
  };

  return (
    <div className="profil-page">
      {/* Citation */}
      <section className="profil-citation">
        {editSection === 'citation' ? (
          <>
            <textarea
              name="citation"
              value={profil.citation}
              onChange={handleChange}
              className="input-edit"
              rows="2"
            />
            <button className="save-button" onClick={handleSave}>✅ Enregistrer</button>
          </>
        ) : (
          <>
            <blockquote>{profil.citation || "Votre citation ici..."}</blockquote>
            <button className="edit-button" onClick={() => setEditSection('citation')} aria-label="Modifier la citation">✏️</button>
          </>
        )}
      </section>

      {/* Infos principales */}
      <section className="profil-infos">
        {editSection === 'infos' ? (
          <>
            <input
              name="nom"
              placeholder="Nom"
              value={profil.nom}
              onChange={handleChange}
              className="input-edit"
            />
            <input
              name="age"
              placeholder="Âge"
              value={profil.age}
              onChange={handleChange}
              className="input-edit"
              type="number"
            />
            <input
              name="ville"
              placeholder="Ville"
              value={profil.ville}
              onChange={handleChange}
              className="input-edit"
            />
            <input
              name="taille"
              placeholder="Taille"
              value={profil.taille}
              onChange={handleChange}
              className="input-edit"
            />
            <input
              name="metier"
              placeholder="Métier"
              value={profil.metier}
              onChange={handleChange}
              className="input-edit"
            />
            <input
              name="enfant"
              placeholder="Enfant"
              value={profil.enfant}
              onChange={handleChange}
              className="input-edit"
            />
            <button className="save-button" onClick={handleSave}>✅ Enregistrer</button>
          </>
        ) : (
          <>
            <h2>{profil.nom || "Nom"}, {profil.age || "--"} ans, {profil.ville || "Ville"}</h2>
            <p>{profil.taille || "--"}, {profil.metier || "Métier"}, {profil.enfant || "Sans enfant"}</p>
            <button className="edit-button" onClick={() => setEditSection('infos')} aria-label="Modifier les informations">✏️</button>
          </>
        )}
      </section>

      {/* Ce que je recherche */}
      <section className="profil-recherche">
        {editSection === 'recherche' ? (
          <>
            <textarea
              name="recherche"
              value={profil.recherche}
              onChange={handleChange}
              className="input-edit"
              rows="2"
            />
            <button className="save-button" onClick={handleSave}>✅ Enregistrer</button>
          </>
        ) : (
          <>
            <h3>🔍 Ce que je recherche :</h3>
            <p>{profil.recherche || "Indiquez ce que vous recherchez..."}</p>
            <button className="edit-button" onClick={() => setEditSection('recherche')} aria-label="Modifier ce que vous recherchez">✏️</button>
          </>
        )}
      </section>

      {/* Projet commun */}
      <section className="profil-projet">
        {editSection === 'projet' ? (
          <>
            <textarea
              name="projet"
              value={profil.projet}
              onChange={handleChange}
              className="input-edit"
              rows="2"
            />
            <button className="save-button" onClick={handleSave}>✅ Enregistrer</button>
          </>
        ) : (
          <>
            <h3>👩👨 Mon projet commun :</h3>
            <p>{profil.projet || "Parlez de votre projet commun..."}</p>
            <button className="edit-button" onClick={() => setEditSection('projet')} aria-label="Modifier le projet commun">✏️</button>
          </>
        )}
      </section>
    </div>
  );
}
