'use client';
import { useState } from 'react';

export default function Profil() {
  const [profil, setProfil] = useState({
    citation: "",
    nom: "",
    age: "",
    ville: "",
    taille: "",
    metier: "",
    enfant: "",
    recherche: "",
    projet: "",
    photos: [],
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (profil.photos.length + files.length > 5) {
      alert("Vous pouvez ajouter au maximum 5 photos !");
      return;
    }

    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setProfil((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
    }));
  };

  // Fonction pour supprimer une photo
  const handleDeletePhoto = (photo) => {
    setProfil((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p !== photo),
    }));
  };

  return (
    <div className="profil-page">
      <div className="mode-toggle">
        <button onClick={() => setEditMode(!editMode)} className="edit-button">
          {editMode ? "✅ Enregistrer" : "✏️ Modifier mon profil"}
        </button>
      </div>

      <section className="profil-citation">
        {editMode ? (
          <textarea
            name="citation"
            value={profil.citation}
            onChange={handleChange}
            className="input-edit"
            rows="2"
            placeholder="Votre citation ici..."
          />
        ) : (
          <blockquote>{profil.citation || "Votre citation ici..."}</blockquote>
        )}
      </section>

      <section className="profil-infos">
        {editMode ? (
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
              type="number"
              className="input-edit"
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
          </>
        ) : (
          <>
            <h2>{profil.nom || "Nom"}, {profil.age || "--"} ans, {profil.ville || "Ville"}</h2>
            <p>{profil.taille || "--"}, {profil.metier || "Métier"}, {profil.enfant || "Sans enfant"}</p>
          </>
        )}
      </section>

      <section className="profil-recherche">
        <h3>🔍 Ce que je recherche :</h3>
        {editMode ? (
          <textarea
            name="recherche"
            value={profil.recherche}
            onChange={handleChange}
            className="input-edit"
            rows="2"
            placeholder="Décrivez ce que vous recherchez..."
          />
        ) : (
          <p>{profil.recherche || "Indiquez ce que vous recherchez..."}</p>
        )}
      </section>

      <section className="profil-projet">
        <h3>👩👨 Mon projet commun :</h3>
        {editMode ? (
          <textarea
            name="projet"
            value={profil.projet}
            onChange={handleChange}
            className="input-edit"
            rows="2"
            placeholder="Décrivez votre projet commun..."
          />
        ) : (
          <p>{profil.projet || "Parlez de votre projet commun..."}</p>
        )}
      </section>

      <div className="profil-galerie-section">
  <h3>📸 Ma Galerie</h3>

  {editMode && profil.photos.length < 5 && (
    <label className="upload-label">
      ➕ Ajouter des photos
      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden-file-input" />
    </label>
  )}

  <div className="galerie-grid">
    {profil.photos.map((photo, index) => (
      <div key={index} className="profile-gallery relative">
        <img src={photo} alt={`Photo ${index + 1}`} className="profile-gallery-img" />
        {editMode && (
          <button
            onClick={() => handleDeletePhoto(photo)}
            className="delete-photo-button"
          >
            ❌
          </button>
        )}
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
