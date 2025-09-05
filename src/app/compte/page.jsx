'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Profil from '@/components/compte/Profil';
import MessagerieUser from '@/components/compte/Messagerie';
import ParametresUser from '@/components/compte/ParametresUser';
import PageMatch from '@/components/match/PageMatch';
import MatchForm from '@/components/formulaire/MatchForm';
import '@/components/Header';

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
        return <ParametresUser />;
      case 'message':
        return <MessagerieUser />;
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

      {/* Partie basse : navigation + contenu */}
      <div className="compte-container flex flex-col md:flex-row gap-6">
      <nav className="flex flex-wrap gap-2 justify-center md:flex-col md:justify-start md:w-auto mb-6 md:mb-0 md:mr-8">
  <button
    onClick={() => setSection('profil')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'profil'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Mon Profil
  </button>

  <button
    onClick={() => setSection('matchs')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'matchs'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Mes Matchs
  </button>

  <button
    onClick={() => setSection('formulaire')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'formulaire'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Mes Formulaires
  </button>

  <button
    onClick={() => setSection('evenements')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'evenements'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Événements
  </button>

  <button
    onClick={() => setSection('achats')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'achats'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Achats
  </button>

  <button
    onClick={() => setSection('parametres')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'parametres'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Paramètres
  </button>

  <button
    onClick={() => setSection('message')}
    className={`px-4 py-2 rounded-full font-semibold transition ${
      section === 'message'
        ? 'bg-[#c2a661] text-black'
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] hover:text-[#c2a661]'
    }`}
  >
    Messagerie
  </button>
</nav>

        <main className="flex-1 p-6 bg-black rounded-2xl mt-6 md:mt-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}