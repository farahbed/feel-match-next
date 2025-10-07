// ✅ PageMatch.jsx — version simplifiée (sans anciens matchs)
'use client';
import { useState, useEffect } from 'react';
import MatchFinder from './MatchFinder';

const GOLD = '#c2a661';
const SURFACE = '#15171b';
const SURFACE_2 = '#1b1d22';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

// ⚠️ Démo : profils mockés
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
      duo: ['Discussions profondes', 'Aventures à deux'],
    },
  },
  {
    id: 2,
    name: 'Imane',
    age: 28,
    phrase: 'Prête à construire une belle histoire à deux.',
    image: '/default-avatar.png',
    preferences: {
      heart: ['Lecture', 'Randonnée', 'Traditions'],
      search: ['Homme stable', 'Pratiquant'],
      duo: ['Moments simples', 'Échanges sincères'],
    },
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
      duo: ['Activités créatives', 'Sport à deux'],
    },
  },
];

export default function PageMatch() {
  const [hasMatchedToday, setHasMatchedToday] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);

  useEffect(() => {
    try {
      const savedCurrent = JSON.parse(localStorage.getItem('currentMatches') || '[]');
      setCurrentMatches(savedCurrent.length ? savedCurrent : [MOCK_PROFILES[0]]);
      const last = localStorage.getItem('lastMatchDate');
      if (last) setHasMatchedToday(true);
    } catch {
      setCurrentMatches([MOCK_PROFILES[0]]);
    }
  }, []);

  const onFinished = (matches) => {
    setSuggestions(matches);
    setHasMatchedToday(true);
    localStorage.setItem('lastMatchDate', new Date().toISOString().split('T')[0]);
  };

  // UI subcomponents
  const Card = ({ children, className = '' }) => (
    <div
      className={`rounded-2xl border shadow-sm ${className}`}
      style={{
        borderColor: BORDER,
        background: SURFACE,
        boxShadow: '0 1px 2px rgba(0,0,0,.35), 0 0 0 0.5px rgba(194,166,97,0.08)',
      }}
    >
      {children}
    </div>
  );

  const Title = ({ children }) => (
    <h2 className="text-xl font-semibold mb-4">
      <span
        className="bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)` }}
      >
        {children}
      </span>
    </h2>
  );

  const MatchCard = ({ m, highlight = false }) => (
    <article
      className={`p-4 rounded-2xl transition duration-300 ${highlight ? 'ring-2' : ''}`}
      style={{
        background: SURFACE_2,
        border: `1px solid ${BORDER}`,
        boxShadow: highlight ? `0 0 20px ${GOLD}22` : '0 1px 2px rgba(0,0,0,.35)',
      }}
    >
      <img
        src={m.image || '/default-avatar.png'}
        alt={m.name || 'Profil'}
        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4"
        style={{ borderColor: GOLD }}
        onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
      />
      <h3 className="text-lg text-center font-bold" style={{ color: GOLD }}>
        {m.name || 'Profil'}{m.age ? `, ${m.age} ans` : ''}
      </h3>
      {m.phrase && (
        <p className="italic text-sm text-center mt-2" style={{ color: MUTED }}>
          « {m.phrase} »
        </p>
      )}
      <div className="mt-3 space-y-1 text-sm text-center" style={{ color: TEXT }}>
        {!!m.preferences?.heart?.length && <p>❤ {m.preferences.heart.join(', ')}</p>}
        {!!m.preferences?.search?.length && <p>🔍 {m.preferences.search.join(', ')}</p>}
        {!!m.preferences?.duo?.length && <p>👩👨 {m.preferences.duo.join(', ')}</p>}
      </div>
    </article>
  );

  return (
    <div className="min-h-screen p-6 space-y-12">
      {/* En-tête principale */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)` }}
          >
            Trouve ton Match
          </span>
        </h1>
        <p className="text-sm" style={{ color: MUTED }}>
          Un tirage élégant, des rencontres authentiques ✨
        </p>
      </header>

      {/* Matchs en cours */}
      <section>
        <Title>Matchs en cours</Title>
        {currentMatches.length === 0 ? (
          <Card className="p-6 text-center">
            <p style={{ color: MUTED }}>Tu n’as pas encore de match actif.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {currentMatches.map((m) => (
              <MatchCard key={m.id || m.name} m={m} highlight />
            ))}
          </div>
        )}
      </section>

      {/* Tirage du match */}
      <section className="pt-4">
        <Title>Tirer mon match du jour</Title>
        <Card className="p-6">
          <MatchFinder
            profiles={MOCK_PROFILES}
            onFinished={onFinished}
            rounds={3}
            maxPicks={2}
          />

          {/* Résumé des suggestions tirées */}
          {suggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3" style={{ color: TEXT }}>
                Suggestions du tirage
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {suggestions.map((m) => (
                  <MatchCard key={`s-${m.id || m.name}`} m={m} />
                ))}
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}