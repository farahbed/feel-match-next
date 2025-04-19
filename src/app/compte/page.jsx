'use client';
import { useState } from 'react';
import Profil from '../components/Profil';

export default function Compte() {
  const [section, setSection] = useState('profil');
  const [user, setUser] = useState({
    name: "Nom d'utilisateur",
    photoUrl: '',
    bio: "Je suis une passionnée de voyages et de découvertes culinaires.",
  });
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        photoUrl: newPhotoUrl,
      }));
    }
  };

  const renderContent = () => {
    switch (section) {
      case 'profil':
        return <Profil />;
      case 'matchs':
        return (
          <div className="card">
            <h2 className="section-title">Mes Matchs</h2>
            <p className="section-text">Ici vos matchs s'afficheront !</p>
          </div>
        );
      case 'evenements':
        return (
          <div className="card">
            <h2 className="section-title">Événements</h2>
            <p className="section-text">Vos événements à venir ici.</p>
          </div>
        );
      case 'achats':
        return (
          <div className="card">
            <h2 className="section-title">Achats</h2>
            <p className="section-text">Historique de vos achats.</p>
          </div>
        );
      case 'parametres':
        return (
          <div className="card">
            <h2 className="section-title">Paramètres</h2>
            <p className="section-text">Paramètres du compte.</p>
          </div>
        );
      default:
        return (
          <div className="card">
            <h2 className="section-title">Mon Profil</h2>
            <p className="section-text">Bienvenue sur votre profil utilisateur !</p>
          </div>
        );
    }
  };

  return (
    <div className="compte-page">
      {/* Partie haute : avatar + nom + bio */}
      <div className="profil-header">
        <div className="photo-container">
          <img
            src={user.photoUrl || '/default-avatar.png'}
            alt="Photo de profil"
            className="profil-photo"
            onClick={() => document.getElementById('photo-upload').click()}
          />
          <button
            className="edit-photo-button"
            onClick={() => document.getElementById('photo-upload').click()}
          >
            ✏️
          </button>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="profil-bio">
          {isEditingName ? (
            <>
              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
                }
                className="input-edit"
              />
              <button className="save-button" onClick={() => setIsEditingName(false)}>
                Enregistrer
              </button>
            </>
          ) : (
            <div className="bio-display">
              <h2>{user.name}</h2>
              <button className="edit-button" onClick={() => setIsEditingName(true)}>
                ✏️
              </button>
            </div>
          )}

          {isEditingBio ? (
            <>
              <textarea
                value={user.bio}
                onChange={(e) =>
                  setUser((prevUser) => ({ ...prevUser, bio: e.target.value }))
                }
                className="input-edit"
              />
              <button className="save-button" onClick={() => setIsEditingBio(false)}>
                Sauvegarder
              </button>
            </>
          ) : (
            <div className="bio-display">
              <p>{user.bio || "Aucune bio renseignée."}</p>
              <button className="edit-button" onClick={() => setIsEditingBio(true)}>
                ✏️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Partie basse : navigation + contenu */}
      <div className="compte-container">
        <nav className="nav-container">
          <div className="nav-links">
            <button onClick={() => setSection('profil')}>Mon Profil</button>
            <button onClick={() => setSection('matchs')}>Mes Matchs</button>
            <button onClick={() => setSection('evenements')}>Événements</button>
            <button onClick={() => setSection('achats')}>Achats</button>
            <button onClick={() => setSection('parametres')}>Paramètres</button>
          </div>
        </nav>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
