'use client';
import { useState } from 'react';

export default function Compte() {
  const [section, setSection] = useState('profil'); // Affiche profil par défaut

  const renderContent = () => {
    switch (section) {
      case 'profil':
        return (
          <div className="card">
            <h2 className="section-title">Mon Profil</h2>
            <p className="section-text">Bienvenue sur votre profil utilisateur !</p>
          </div>
        );
      case 'edit-profil':
        return (
          <div className="card">
            <h2 className="section-title">Modifier Profil</h2>
            <p className="section-text">Formulaire pour modifier votre profil.</p>
          </div>
        );
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
    <div className="compte-container">
      <nav className="nav-container">
        <div className="nav-links">
          <button onClick={() => setSection('profil')}>Mon Profil</button>
          <button onClick={() => setSection('edit-profil')}>Modifier Profil</button>
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
  );
}
