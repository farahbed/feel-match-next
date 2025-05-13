'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Profil from '../../components/compte-components/Profil';
import MessagerieUser from '@/components/compte-components/Messagerie';
import ParametresUser from '@/components/compte-components/ParametresUser';
import PageMatch from '@/components/compte-components/match/PageMatch';
import MatchForm from '@/components/compte-components/formulaire/MatchForm';
import '../../components/Header';

export default function Compte() {
  const [section, setSection] = useState('profil');
  const [user, setUser] = useState({
    name: "Nom d'utilisateur",
    photoUrl: '',
    bio: "Je suis une passionnée de voyages et de découvertes culinaires.",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
  
    // Si pas connecté → redirige vers /login
    if (!token || !role) {
      router.push('/login');
      return;
    }
  
    const savedName = localStorage.getItem('userName');
    const savedBio = localStorage.getItem('userBio');
    const savedPhoto = localStorage.getItem('userPhotoUrl');
  
    setUser(prev => ({
      ...prev,
      name: savedName || prev.name,
      bio: savedBio || prev.bio,
      photoUrl: savedPhoto || prev.photoUrl
    }));
  }, []);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        photoUrl: newPhotoUrl,
      }));
      localStorage.setItem('userPhotoUrl', newPhotoUrl);
    }
  };

  const renderContent = () => {
    switch (section) {
      case 'profil':
        return <Profil />;
      case 'matchs':
        return <PageMatch />;
      case 'evenements':
        return (
          <div className="card bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661] hover:border-yellow-500 transition-all duration-300">
            <h2 className="section-title text-[#c2a661] text-3xl">Événements</h2>
            <p className="section-text text-white">Vos événements à venir ici.</p>
          </div>
        );
      case 'formulaire':
        return <MatchForm />;
      case 'achats':
        return (
          <div className="card bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661] hover:border-yellow-500 transition-all duration-300">
            <h2 className="section-title text-[#c2a661] text-3xl">Achats</h2>
            <p className="section-text text-white">Vos achats récents ici.</p>
          </div>
        );
        case 'parametres':
          return <ParametresUser />; // Utilisation de ton nouveau composant
      case 'message':
        return <MessagerieUser />; // Utilisation de ton nouveau composant
      default:
        return null;
    }
  };

  return (
    <div className="compte-page bg-black p-8 min-h-screen">
      {/* Partie haute : avatar + nom + bio */}
      <div className="profil-header mb-6 text-center">
        <div className="photo-container mb-4 relative inline-block">
          <img
            src={user.photoUrl || '/default-avatar.png'}
            alt="Photo de profil"
            className="profil-photo w-24 h-24 rounded-full border-4 border-[#c2a661]"
            onClick={() => document.getElementById('photo-upload').click()}
          />
          <button
            className="absolute bottom-0 right-0 bg-[#c2a661] text-black rounded-full p-1 text-sm"
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
          <h2 className="text-2xl text-[#c2a661]">{user.name}</h2>
          <p className="text-white">{user.bio || "Aucune bio renseignée."}</p>
        </div>
      </div>

      {/* Partie basse : contenu */}
      <div className="compte-container flex flex-col md:flex-row">
        <nav className="nav-container flex md:flex-col mb-4 md:mb-0 md:mr-8">
          <div className="nav-links space-x-2 md:space-x-0 md:space-y-2">
            <button onClick={() => setSection('profil')} className={`block w-full p-2 rounded ${section === 'profil' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Mon Profil</button>
            <button onClick={() => setSection('matchs')} className={`block w-full p-2 rounded ${section === 'matchs' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Mes Matchs</button>
            <button onClick={() => setSection('formulaire')} className={`block w-full p-2 rounded ${section === 'formulaire' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Mes Formulaires</button>
            <button onClick={() => setSection('evenements')} className={`block w-full p-2 rounded ${section === 'evenements' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Événements</button>
            <button onClick={() => setSection('achats')} className={`block w-full p-2 rounded ${section === 'achats' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Achats</button>
            <button onClick={() => setSection('parametres')} className={`block w-full p-2 rounded ${section === 'parametres' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Paramètres</button>
            <button onClick={() => setSection('message')} className={`block w-full p-2 rounded ${section === 'message' ? 'bg-[#c2a661] text-black' : 'bg-gray-800 text-white'}`}>Messagerie</button>
          </div>
        </nav>

        <main className="flex-1 p-6 bg-black rounded-2xl">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}