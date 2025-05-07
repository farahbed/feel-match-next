'use client';

import { useState, useEffect } from 'react';
import MatchFinder from './MatchFinder';

const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Yassine',
    age: 30,
    phrase: 'Je suis un homme simple, qui cherche une femme sincère.',
    image: '/default-avatar.png',
    preferences: {
      heart: ['Voyages', 'Cuisine', 'Spiritualité'],
      search: ['Femme sincère', 'Valeurs partagées'],
      duo: ['Discussions profondes', 'Aventures à deux']
    }
  },
  {
    id: 2,
    name: 'Imane',
    age: 28,
    phrase: 'Prêt(e) à construire une belle histoire à deux.',
    image: '/default-avatar.png',
    preferences: {
      heart: ['Lecture', 'Randonnée', 'Traditions'],
      search: ['Homme stable', 'Pratiquant'],
      duo: ['Moments simples', 'Échanges sincères']
    }
  },
  {
    id: 3,
    name: 'Mehdi',
    age: 32,
    phrase: 'L’amour commence par la compatibilité.',
    image: '/default-avatar.png',
    preferences: {
      heart: ['Design', 'Sport', 'Spiritualité'],
      search: ['Femme douce', 'Respectueuse'],
      duo: ['Activités créatives', 'Sport à deux']
    }
  }
];

export default function PageMatch() {
  const [hasMatchedToday, setHasMatchedToday] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);

  useEffect(() => {
    const lastMatchDate = localStorage.getItem('lastMatchDate');
    const today = new Date().toISOString().split('T')[0];
    if (lastMatchDate === today) {
      setHasMatchedToday(true);
    }

    const current = JSON.parse(localStorage.getItem('currentMatches')) || [];
    const past = JSON.parse(localStorage.getItem('pastMatches')) || [];
    setCurrentMatches(current);
    setPastMatches(past);
  }, []);

  const handleSelect = (id) => {
    if (selected.includes(id)) return;
    if (selected.length >= 2) return;
    setSelected([...selected, id]);

    const selectedProfile = suggestions.find((p) => p.id === id);
    const updatedCurrent = [...currentMatches, selectedProfile];
    setCurrentMatches(updatedCurrent);
    localStorage.setItem('currentMatches', JSON.stringify(updatedCurrent));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-12 font-elegant">
      <h1 className="text-3xl font-bold text-[#c2a661] text-center">Trouve ton Match</h1>

      {/* Matchs en cours */}
      <section>
        <h2 className="text-xl font-semibold text-[#c2a661] mb-4">Matchs en cours</h2>
        {currentMatches.length === 0 ? (
          <p className="text-gray-400">Tu n'as pas encore de match actif.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {currentMatches.map((match) => (
              <div key={match.id} className="p-4 rounded-2xl bg-gradient-to-b from-[#1f1f1f] to-black shadow-xl border border-[#c2a661]">
                <img src={match.image} alt={match.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-[#c2a661]" />
                <h3 className="text-xl text-center font-bold text-[#c2a661]">{match.name}, {match.age} ans</h3>
                <p className="italic text-sm text-gray-300 text-center mt-2">"{match.phrase}"</p>
                <div className="mt-3 space-y-1 text-sm text-center text-gray-400">
                  <p>❤ {match.preferences?.heart?.join(', ')}</p>
                  <p>🔍 {match.preferences?.search?.join(', ')}</p>
                  <p>👩👨 {match.preferences?.duo?.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Anciens Matchs */}
      <section>
        <h2 className="text-xl font-semibold text-[#c2a661] mb-4">Anciens Matchs</h2>
        {pastMatches.length === 0 ? (
          <p className="text-gray-400">Aucun ancien match pour l'instant.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {pastMatches.map((match) => (
              <div key={match.id} className="p-4 rounded-2xl bg-[#0f0f0f] shadow border border-gray-700">
                <img src={match.image} alt={match.name} className="w-24 h-24 rounded-full mx-auto mb-2 border border-gray-600" />
                <h3 className="text-lg text-center font-semibold text-gray-400">{match.name}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tirage du match */}
      <section className="pt-8">
        <h2 className="text-xl font-semibold text-[#c2a661] mb-6 text-center">Tirer mon match du jour</h2>
                <MatchFinder
        profiles={MOCK_PROFILES}
        onFinished={(matches) => {
            setSuggestions(matches);
            setHasMatchedToday(true);
            localStorage.setItem('lastMatchDate', new Date().toISOString().split('T')[0]);
        }}
        />
      </section>
    </div>
  );
}