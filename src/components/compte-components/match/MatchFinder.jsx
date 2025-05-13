'use client';

import { useState, useEffect } from 'react';

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

          <div className="relative flex items-center justify-center w-full h-32 gap-1">
            {/* Cercle utilisateur */}
            <div className="w-28 h-28 rounded-full border-4 border-[#c2a661] bg-black shadow-lg flex items-center justify-center z-10">
              <img src={userPhoto} alt="you" className="w-20 h-20 rounded-full" />
            </div>

            {/* ECG + cœur animé */}
            {animating && (
              <div className="mx-1 w-52 h-24 overflow-hidden relative z-0">
                <div className="absolute top-0 left-0 w-[200%] h-full flex animate-move-line">
                  {/* ECG visible 2x pour effet fluide */}
                  {[1, 2].map((_, i) => (
                    <svg key={i} viewBox="0 0 260 100" preserveAspectRatio="none" className="w-1/2 h-full">
                      <path
                        d="M0,50 
                          L20,50 
                          L30,10 
                          L40,90 
                          L50,30 
                          C60,20 70,20 80,50 
                          C90,80 110,80 120,50 
                          C130,20 140,20 150,50 
                          L160,70 
                          L170,30 
                          L180,60 
                          L190,40 
                          L200,50 
                          L210,10 
                          L220,90 
                          L230,50 
                          L250,50"
                        fill="none"
                        stroke="#e3342f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ))}
                </div>

                {/* Cœur au centre devant */}
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 animate-pulse drop-shadow-[0_0_8px_#c2a661] z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c2a661"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 4.6c-1.8-1.6-4.6-1.5-6.4.3L12 7.3l-2.4-2.4C7.8 3.1 5 3 3.2 4.6c-2 1.8-2.1 4.9-.2 6.8l8.2 8.2c.3.3.8.3 1.1 0l8.2-8.2c1.9-1.9 1.8-5-.2-6.8z" />
                </svg>
              </div>
            )}

            {/* Cercle du match */}
            <div className="w-28 h-28 rounded-full border-4 border-[#c2a661] bg-black shadow-lg flex items-center justify-center z-10">
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

      {/* Affichage des résultats + sélection */}
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
                  <div className="flex gap-1 items-start"><span className="text-[#c2a661]">❤</span><span>{match.preferences?.heart?.join(', ')}</span></div>
                  <div className="flex gap-1 items-start"><span className="text-[#c2a661]">🔍</span><span>{match.preferences?.search?.join(', ')}</span></div>
                  <div className="flex gap-1 items-start"><span className="text-[#c2a661]">👩👨</span><span>{match.preferences?.duo?.join(', ')}</span></div>
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