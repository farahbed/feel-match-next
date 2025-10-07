'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import CompteHeader from '../../components/compte/CompteHeader';
import Profil from '../../components/compte/Profil';
import MessagerieUser from '../../components/compte/Messagerie';
import ParametresUser from '../../components/compte/ParametresUser';
import PageMatch from '../../components/match/PageMatch';
import MatchForm from '../../components/formulaire/MatchForm';

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export default function Compte() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // ⚙️ section persistée
  const [section, setSection] = useState('profil');

  const [user, setUser] = useState({
    name: "Nom d'utilisateur",
    photoUrl: '',
    bio: "Je suis une passionnée de voyages et de découvertes culinaires.",
  });

  // -------- Helpers
  const refreshUser = useCallback(() => {
    const savedName = localStorage.getItem('userName');
    const savedBio = localStorage.getItem('userBio');
    let savedPhoto = localStorage.getItem('userPhotoUrl');
    if (savedPhoto && savedPhoto.startsWith('blob:')) {
      savedPhoto = '';
      localStorage.removeItem('userPhotoUrl');
    }
    setUser((prev) => ({
      ...prev,
      name: savedName || prev.name,
      bio: savedBio || prev.bio,
      photoUrl: savedPhoto || prev.photoUrl,
    }));
  }, []);

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setUser((prev) => ({ ...prev, photoUrl: dataUrl }));
    localStorage.setItem('userPhotoUrl', dataUrl);
  };

  // -------- Mount (client‐only) + auth guard
  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token || !role) {
      // replace pour éviter l’historique back
      router.replace('/login');
      return;
    }

    // section sauvegardée
    const savedSection = localStorage.getItem('compteSection');
    if (savedSection) setSection(savedSection);

    refreshUser();

    // écoute changements LS (nom/bio/photo depuis Profil)
    const onStorage = (e) => {
      if (['userName', 'userBio', 'userPhotoUrl'].includes(e.key)) refreshUser();
      if (e.key === 'compteSection' && e.newValue) setSection(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [router, refreshUser]);

  // Persister l’onglet
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('compteSection', section);
  }, [section, mounted]);

  // -------- Render content
  const renderContent = () => {
    switch (section) {
      case 'profil':
        return <Profil onSaved={refreshUser} />; // avatar rendu DANS Profil
      case 'matchs':
        return <PageMatch />;
      case 'evenements':
        return (
          <div className="rounded-xl border border-[#262930] bg-[#1B1D22] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#E7E7EA] mb-1">Événements</h2>
            <p className="text-[#A8AAB2]">Vos événements à venir ici.</p>
          </div>
        );
      case 'formulaire':
        return <MatchForm />;
      case 'achats':
        return (
          <div className="rounded-xl border border-[#262930] bg-[#1B1D22] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#E7E7EA] mb-1">Achats</h2>
            <p className="text-[#A8AAB2]">Vos achats récents ici.</p>
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

  const tabs = [
    ['profil', 'Mon Profil'],
    ['matchs', 'Mes Matchs'],
    ['formulaire', 'Mes Formulaires'],
    ['evenements', 'Événements'],
    ['achats', 'Achats'],
    ['parametres', 'Paramètres'],
    ['message', 'Messagerie'],
  ];

  // Évite un flash/hydration mismatch si redirect
  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <CompteHeader
          user={user}
          onPhotoChange={handleProfilePhotoChange}
          showAvatar={section !== 'profil'}
          showDetails={section !== 'profil'}
        />

        <div className="flex flex-col gap-6 md:flex-row">
          <nav className="flex flex-wrap gap-2 md:flex-col md:w-60">
            {tabs.map(([key, label]) => {
              const active = section === key;
              return (
                <button
                  key={key}
                  onClick={() => setSection(key)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'px-4 py-2 text-sm font-medium rounded-md transition border',
                    active
                      ? 'bg-[#6F74EE] text-white border-transparent shadow'
                      : 'bg-[#1B1D22] text-[#E7E7EA] border-[#262930] hover:bg-[#20232A]',
                  ].join(' ')}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <main className="flex-1 rounded-xl border border-[#262930] bg-[#15171B] p-4 shadow-sm">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}