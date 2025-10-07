'use client';

import { useState, useEffect, useMemo } from 'react';

// Thème (cohérent dark + gold)
const GOLD = '#c2a661';
const SURFACE = '#1b1d22';
const SURFACE_2 = '#15171b';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';
const DANGER = '#EF4444';

// 🔒 Règle métier : 3 tirages et basta
const ROUNDS = 3;
const MAX_PICKS = 2;

export default function MatchFinder({
  onFinished,
  profiles = [],
}) {
  const [step, setStep] = useState(0);                 // 0..3
  const [animating, setAnimating] = useState(false);
  const [matches, setMatches] = useState([]);          // tirages révélés
  const [chosenMatches, setChosenMatches] = useState([]); // ids choisis (max 2)
  const [userPhoto, setUserPhoto] = useState('/default-avatar.png');

  useEffect(() => {
    const photo = localStorage.getItem('userPhotoUrl');
    if (photo && !photo.startsWith('blob:')) setUserPhoto(photo);
  }, []);

  const finished = step >= ROUNDS;                     // ⛔️ Plus de tirage possible
  const hasEnoughProfiles = profiles.length >= ROUNDS; // optionnel : prévenir si < 3

  const currentProfile = useMemo(() => {
    if (!hasEnoughProfiles) return profiles[step] || null;
    return profiles[step] || null;
  }, [profiles, step, hasEnoughProfiles]);

  const canLaunch = !finished && !animating && (!!currentProfile || hasEnoughProfiles);

  const handleFindNext = () => {
    if (!canLaunch) return;
    setAnimating(true);

    // Petite phase "recherche"
    setTimeout(() => {
      const base = profiles[step];
      if (!base) {
        // Sécurité si pas assez de profils
        setAnimating(false);
        // On passe quand même au prochain step pour bloquer le bouton si on veut
        setStep(prev => {
          const next = prev + 1;
          if (next >= ROUNDS && typeof onFinished === 'function') {
            onFinished(matches);
          }
          return next;
        });
        return;
      }

      const match = {
        ...base,
        compatibility: Math.min(99, Math.max(60, Math.floor(Math.random() * 35) + 65)),
      };

      // Petite latence avant révélation
      setTimeout(() => {
        setMatches(prev => {
          const updated = [...prev, match];
          return updated;
        });

        setAnimating(false);
        setStep(prev => {
          const next = prev + 1;
          // Si on vient d’achever le 3e tirage → fini
          if (next >= ROUNDS && typeof onFinished === 'function') {
            // matches n’est pas encore mis à jour dans ce scope, on recompose à partir de l’état courant + match
            onFinished([...matches, match]);
          }
          return next;
        });
      }, 1000);
    }, 800);
  };

  const toggleSelectMatch = (id) => {
    if (!id) return;
    setChosenMatches(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_PICKS) return prev; // limite 2
      return [...prev, id];
    });
  };

  return (
    <div className="text-center space-y-8" style={{ color: TEXT }}>
      {/* En-tête + état */}
      <header className="space-y-2">
        <h2 className="text-2xl font-extrabold">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)`,
            }}
          >
            Tirage {Math.min(step, ROUNDS)}/{ROUNDS}
          </span>
        </h2>
        {!hasEnoughProfiles && (
          <p className="text-sm" style={{ color: MUTED }}>
            (Démo) Moins de {ROUNDS} profils fournis — le tirage s’arrêtera plus tôt.
          </p>
        )}
      </header>

      {/* Zone anim centrale (uniquement si pas encore fini) */}
      {!finished && (
        <div className="flex flex-col items-center justify-center space-y-6" style={{ minHeight: '14rem' }}>
          {animating && (
            <p className="text-sm animate-pulse" style={{ color: GOLD }}>
              Recherche de compatibilité…
            </p>
          )}

          <div className="relative flex items-center justify-center w-full h-32 gap-2" aria-live="polite" aria-busy={animating ? 'true' : 'false'}>
            {/* Vous */}
            <div
              className="rounded-full border-4 shadow-lg flex items-center justify-center z-10"
              style={{ width: 112, height: 112, borderColor: GOLD, background: SURFACE_2 }}
            >
              <img
                src={userPhoto}
                alt="Votre photo"
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
              />
            </div>

            {/* ECG animé */}
            {animating && (
              <div className="mx-1 w-56 h-24 overflow-hidden relative z-0">
                <div className="absolute top-0 left-0 w-[200%] h-full flex animate-move-line">
                  {[1, 2].map((_, i) => (
                    <svg key={i} viewBox="0 0 260 100" preserveAspectRatio="none" className="w-1/2 h-full">
                      <path
                        d="M0,50 L20,50 L30,10 L40,90 L50,30 C60,20 70,20 80,50 C90,80 110,80 120,50 C130,20 140,20 150,50 L160,70 L170,30 L180,60 L190,40 L200,50 L210,10 L220,90 L230,50 L250,50"
                        fill="none"
                        stroke="#e3342f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ))}
                </div>
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 animate-pulse drop-shadow-[0_0_8px_#c2a661] z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6c-1.8-1.6-4.6-1.5-6.4.3L12 7.3l-2.4-2.4C7.8 3.1 5 3 3.2 4.6c-2 1.8-2.1 4.9-.2 6.8l8.2 8.2c.3.3.8.3 1.1 0l8.2-8.2c1.9-1.9 1.8-5-.2-6.8z" />
                </svg>
              </div>
            )}

            {/* Match courant (quand dispo) */}
            <div
              className="rounded-full border-4 shadow-lg flex items-center justify-center z-10"
              style={{ width: 112, height: 112, borderColor: GOLD, background: SURFACE_2 }}
            >
              {currentProfile ? (
                <img
                  src={currentProfile.image || '/default-avatar.png'}
                  alt={currentProfile.name || 'Match'}
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
                />
              ) : (
                <div className="text-xs" style={{ color: MUTED }}>En attente…</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA LANCER — masqué dès que 3/3 atteints */}
      {!finished && (
        <button
          onClick={handleFindNext}
          disabled={!canLaunch}
          className="relative overflow-hidden py-3 px-6 rounded-full font-bold shadow-lg transition border disabled:opacity-60"
          style={{ background: GOLD, color: '#15171B', borderColor: 'transparent' }}
          aria-label={`Lancer le match ${step + 1}`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%]"
            style={{
              background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%)',
              animation: 'shimmer 2.2s infinite',
            }}
          />
          Lancer le match
        </button>
      )}

      {/* Liste des 1–3 matchs tirés + sélection */}
      {matches.length > 0 && (
        <section className="flex flex-col items-center space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {matches.map((match) => {
              const selected = chosenMatches.includes(match.id);
              return (
                <article
                  key={match.id || match.name}
                  className={`p-4 rounded-2xl transition duration-300 border ${selected ? 'ring-4' : ''}`}
                  style={{
                    background: SURFACE,
                    borderColor: BORDER,
                    boxShadow: selected
                      ? `0 0 0 2px ${GOLD} inset, 0 0 20px ${GOLD}22`
                      : '0 1px 2px rgba(0,0,0,.35)',
                  }}
                >
                  <img
                    src={match.image || '/default-avatar.png'}
                    alt={match.name || 'Profil'}
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border"
                    style={{ borderColor: GOLD }}
                    onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
                  />
                  <h3 className="text-lg text-center font-semibold">
                    {match.name || 'Profil'}{match.age ? `, ${match.age} ans` : ''}
                  </h3>
                  {match.phrase && (
                    <p className="text-sm italic mt-1 mb-2" style={{ color: MUTED }}>
                      {match.phrase}
                    </p>
                  )}
                  {typeof match.compatibility === 'number' && (
                    <p className="text-sm font-bold mb-2" style={{ color: GOLD }}>
                      Compatibilité : {match.compatibility}%
                    </p>
                  )}

                  <div className="mt-4 space-y-2 text-xs text-left" style={{ color: TEXT }}>
                    {!!match.preferences?.heart?.length && (
                      <div className="flex gap-2 items-start">
                        <span className="shrink-0" style={{ color: GOLD }}>❤</span>
                        <span className="opacity-90">{match.preferences.heart.join(', ')}</span>
                      </div>
                    )}
                    {!!match.preferences?.search?.length && (
                      <div className="flex gap-2 items-start">
                        <span className="shrink-0" style={{ color: GOLD }}>🔍</span>
                        <span className="opacity-90">{match.preferences.search.join(', ')}</span>
                      </div>
                    )}
                    {!!match.preferences?.duo?.length && (
                      <div className="flex gap-2 items-start">
                        <span className="shrink-0" style={{ color: GOLD }}>👩👨</span>
                        <span className="opacity-90">{match.preferences.duo.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSelectMatch(match.id)}
                    disabled={!selected && chosenMatches.length >= MAX_PICKS}
                    aria-pressed={selected}
                    className={`w-full py-2 mt-3 rounded-full font-semibold transition border ${
                      selected ? 'text-white' : 'text-black hover:brightness-105'
                    }`}
                    style={{
                      background: selected ? DANGER : GOLD,
                      borderColor: selected ? DANGER : 'transparent',
                      opacity: !selected && chosenMatches.length >= MAX_PICKS ? 0.6 : 1,
                    }}
                  >
                    {selected ? 'Annuler' : 'Je choisis ce match'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Message final après 3/3 */}
      {finished && (
        <div className="pt-2 text-sm" style={{ color: MUTED }}>
          Tirages du jour terminés. Revenez demain ✨
        </div>
      )}

      {/* Anim shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          60% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </div>
  );
}