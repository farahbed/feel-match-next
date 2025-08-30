'use client';
import { useState, useEffect } from 'react';

export default function Profil() {
  const [profil, setProfil] = useState({
    citation: "",
    nom: "Nom d'utilisateur",
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
  const [isProfileUpdated, setIsProfileUpdated] = useState(false); // Pour notification de succès
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // Contrôler si le bouton sauvegarder doit être activé
  const [errors, setErrors] = useState({}); // Pour gérer les erreurs de validation

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

  // Vérifier si tous les champs obligatoires sont remplis
  useEffect(() => {
    const allRequiredFieldsFilled =
      profil.nom && profil.bio && profil.recherche && profil.projet;
    setIsSaveEnabled(allRequiredFieldsFilled);
  }, [profil]);

  // Validation des champs obligatoires avant sauvegarde
  const validateForm = () => {
    const newErrors = {};
    if (!profil.nom) newErrors.nom = "Le nom est obligatoire.";
    if (!profil.bio) newErrors.bio = "La bio est obligatoire.";
    if (!profil.recherche) newErrors.recherche = "Le champ 'Recherche' est obligatoire.";
    if (!profil.projet) newErrors.projet = "Le projet commun est obligatoire.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateForm()) {
      return; // Ne pas sauvegarder si des erreurs existent
    }

    // Sauvegarder les modifications dans le localStorage
    localStorage.setItem('userName', profil.nom);
    localStorage.setItem('userBio', profil.bio);
    localStorage.setItem('userSearch', profil.recherche);
    localStorage.setItem('userProject', profil.projet);
    localStorage.setItem('userPhotos', JSON.stringify(profil.photos));

    setIsProfileUpdated(true); // Afficher la notification de mise à jour
    setTimeout(() => setIsProfileUpdated(false), 3000);  // Réinitialiser la notification après 3 secondes
  };

  return (
    <div className="profil-page p-8 bg-black text-white">
      {/* Mode d'édition */}
      {!editMode && (
        <div className="mode-toggle mb-6 text-center">
          <button 
            onClick={() => setEditMode(true)} 
            className="bg-[#c2a661] text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
          >
            ✏️ Modifier mon profil
          </button>
        </div>
      )}

      {/* Citation */}
      <section className="profil-citation mb-6">
        {editMode ? (
          <textarea
            name="citation"
            value={profil.citation}
            onChange={handleChange}
            className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg"
            rows="2"
            placeholder="Votre citation ici..."
          />
        ) : (
          <blockquote className="text-3xl italic">{profil.citation || "Votre citation ici..."}</blockquote>
        )}
      </section>

      {/* Infos Profil */}
      <section className="profil-infos mb-6">
        {editMode ? (
          <>
            <input
              name="nom"
              placeholder="Nom"
              value={profil.nom}
              onChange={handleChange}
              className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
            />
            {errors.nom && <p className="text-red-500">{errors.nom}</p>}
            <input
              name="age"
              placeholder="Âge"
              value={profil.age}
              onChange={handleChange}
              type="number"
              className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
            />
            <input
              name="ville"
              placeholder="Ville"
              value={profil.ville}
              onChange={handleChange}
              className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
            />
            <input
              name="taille"
              placeholder="Taille"
              value={profil.taille}
              onChange={handleChange}
              className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
            />
            <input
              name="metier"
              placeholder="Métier"
              value={profil.metier}
              onChange={handleChange}
              className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
            />
            <input
              name="enfant"
              placeholder="Enfant"
              value={profil.enfant}
              onChange={handleChange}
              className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg mb-4"
            />
          </>
        ) : (
          <>
            <h2 className="text-3xl">{profil.nom || "Nom"}, {profil.age || "--"} ans, {profil.ville || "Ville"}</h2>
            <p className="text-2xl">{profil.taille || "--"}, {profil.metier || "Métier"}, {profil.enfant || "Sans enfant"}</p>
          </>
        )}
      </section>

      {/* Recherche */}
      <section className="profil-recherche mb-6">
        <h3 className="text-3xl font-semibold">🔍 Ce que je recherche :</h3>
        {editMode ? (
          <textarea
            name="recherche"
            value={profil.recherche}
            onChange={handleChange}
            className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg"
            rows="2"
            placeholder="Décrivez ce que vous recherchez..."
          />
        ) : (
          <p className="text-2xl">{profil.recherche || "Indiquez ce que vous recherchez..."}</p>
        )}
        {errors.recherche && <p className="text-red-500">{errors.recherche}</p>}
      </section>

      {/* Projet */}
      <section className="profil-projet mb-6">
        <h3 className="text-3xl font-semibold">👩👨 Mon projet commun :</h3>
        {editMode ? (
          <textarea
            name="projet"
            value={profil.projet}
            onChange={handleChange}
            className="input-edit w-full p-4 bg-gray-700 text-white rounded-lg"
            rows="2"
            placeholder="Décrivez votre projet commun..."
          />
        ) : (
          <p className="text-2xl">{profil.projet || "Parlez de votre projet commun..."}</p>
        )}
        {errors.projet && <p className="text-red-500">{errors.projet}</p>}
      </section>

      {/* Galerie */}
      <div className="profil-galerie-section mb-6">
        <h3 className="text-3xl font-semibold">📸 Ma Galerie</h3>

        {editMode && profil.photos.length < 5 && (
          <label className="upload-label bg-[#c2a661] text-black py-2 px-4 rounded-lg mb-4 hover:bg-yellow-500 transition-all duration-300">
            ➕ Ajouter des photos
            <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden-file-input" />
          </label>
        )}

        <div className="galerie-grid grid grid-cols-2 gap-4">
          {profil.photos.map((photo, index) => (
            <div key={index} className="profile-gallery relative">
              <img src={photo} alt={`Photo ${index + 1}`} className="profile-gallery-img w-full h-auto rounded-lg shadow-lg" />
              {editMode && (
                <button
                  onClick={() => handleDeletePhoto(photo)}
                  className="delete-photo-button absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation après modification */}
      {isProfileUpdated && <div className="notification text-green-500 text-center mt-4">Profil mis à jour avec succès !</div>}

      {/* Sauvegarder le profil */}
      {editMode && (
        <div className="text-center mt-4">
          <button 
            onClick={handleSaveProfile} 
            className={`btn-save ${isSaveEnabled ? "bg-[#c2a661]" : "bg-gray-500 cursor-not-allowed"} text-black py-3 px-8 rounded-lg hover:bg-yellow-500 transition-all duration-300`} 
            disabled={!isSaveEnabled}
          >
            Sauvegarder le profil
          </button>
        </div>
      )}
    </div>
  );
}