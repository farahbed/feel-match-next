'use client';

import { useState, useEffect } from 'react';

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
export default function MatchFinder({ onFinished, profiles = [] }) {
  const [step, setStep] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [chosenMatches, setChosenMatches] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [userPhoto, setUserPhoto] = useState('/default-avatar.png');

  useEffect(() => {
    const photo = localStorage.getItem('userPhotoUrl');
    if (photo) setUserPhoto(photo);
  }, []);

  const handleFindNext = () => {
    if (step >= 3) return;
    setAnimating(true);
    setTimeout(() => {
        const match = {
            ...profiles[step],
            compatibility: Math.floor(Math.random() * 30) + 65
          };
      setCurrentMatch(match);

      setTimeout(() => {
        const updatedMatches = [...matches, match];
        setMatches(updatedMatches);
        setAnimating(false);
        setStep(step + 1);

        if (step + 1 === 3 && onFinished) {
          onFinished(updatedMatches);
        }
      }, 2000);
    }, 2000);
  };

  const toggleSelectMatch = (id) => {
    if (chosenMatches.includes(id)) {
      setChosenMatches(chosenMatches.filter(matchId => matchId !== id));
    } else {
      if (chosenMatches.length < 2) {
        setChosenMatches([...chosenMatches, id]);
      }
    }
  };

  return (
    <div className="text-white text-center space-y-8">
      <h2 className="text-2xl font-bold text-[#c2a661]">Tirage {step}/3</h2>

      {step < 3 && (
        <div className="flex flex-col items-center justify-center space-y-6 h-56">
          {animating && <p className="text-sm text-yellow-400 animate-pulse">Recherche de compatibilité...</p>}

          <div className="relative flex items-center justify-center w-full h-32">
            <div className="w-28 h-28 rounded-full border-4 border-[#c2a661] bg-black shadow-lg flex items-center justify-center">
              <img src={userPhoto} alt="you" className="w-20 h-20 rounded-full" />
            </div>

            {animating && (
              <div className="mx-4 w-24 h-12 flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-[#c2a661] via-red-600 to-[#c2a661] animate-pulse rounded-full relative overflow-hidden">
                  <div className="absolute w-full h-full bg-[url('/electro-line.svg')] bg-no-repeat bg-center bg-contain animate-[pulse_1s_infinite]" />
                </div>
              </div>
            )}

            <div className="w-28 h-28 rounded-full border-4 border-red-600 bg-black shadow-lg flex items-center justify-center">
              {currentMatch && (
                <img src={currentMatch.image} alt={currentMatch.name} className="w-20 h-20 rounded-full" />
              )}
            </div>
          </div>
        </div>
      )}

      {step < 3 && !animating && (
        <button
          onClick={handleFindNext}
          className="bg-[#c2a661] hover:bg-yellow-500 text-black py-3 px-6 rounded-full font-bold shadow-lg transition"
        >
          Lancer le match
        </button>
      )}

      {matches.length > 0 && (
        <div className="flex flex-col items-center space-y-6">
          {step === 3 && (
            <div className="w-28 h-28 rounded-full border-4 border-[#c2a661] bg-black shadow-lg">
              <img src={userPhoto} alt="you-final" className="w-24 h-24 rounded-full mx-auto mt-1" />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg bg-[#1f1f1f] shadow transform transition duration-500 hover:scale-105 ${chosenMatches.includes(match.id) ? 'ring-4 ring-[#c2a661]' : ''}`}
              >
                <img src={match.image} alt={match.name} className="w-20 h-20 rounded-full mx-auto mb-2 border border-[#c2a661]" />
                <h3 className="text-lg text-center font-semibold">{match.name}, {match.age} ans</h3>
                <p className="text-sm italic mt-1 mb-2">{match.phrase}</p>
                <p className="text-sm text-yellow-400 font-bold mb-2">Compatibilité : {match.compatibility}%</p>
                <div className="mt-4 space-y-2 text-xs text-gray-300 text-left">
                  <div className="flex gap-1 items-start">
                    <span className="text-[#c2a661]">❤</span>
                    <span>{match.preferences?.heart?.join(', ')}</span>
                  </div>
                  <div className="flex gap-1 items-start">
                    <span className="text-[#c2a661]">🔍</span>
                    <span>{match.preferences?.search?.join(', ')}</span>
                  </div>
                  <div className="flex gap-1 items-start">
                    <span className="text-[#c2a661]">👩👨</span>
                    <span>{match.preferences?.duo?.join(', ')}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleSelectMatch(match.id)}
                  disabled={!chosenMatches.includes(match.id) && chosenMatches.length >= 2}
                  className={`w-full py-2 mt-2 rounded-full font-semibold ${chosenMatches.includes(match.id) ? 'bg-red-600 text-white' : 'bg-[#c2a661] text-black hover:bg-yellow-500'} transition`}
                >
                  {chosenMatches.includes(match.id) ? 'Annuler' : 'Je choisis ce match'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {chosenMatches.length === 2 && (
        <div className="mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">
            Valider mes 2 choix
          </button>
        </div>
      )}
    </div>
  );
}
