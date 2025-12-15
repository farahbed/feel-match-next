'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { hasMatchedToday, markMatchedToday } from '@/lib/storage';
import { useRouter } from 'next/navigation';

// Thème
const GOLD = '#c2a661';
const SURFACE = '#1b1d22';
const SURFACE_2 = '#15171b';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';
const DANGER = '#EF4444';

// Règles
const ROUNDS = 3;
const MAX_PICKS = 2;

// Storage
const DAILY_KEY = 'dailyMatchState_v1'; // { date, step, matches, chosenKeys }

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export default function MatchFinder({
  profiles = [],
  onFinished,
  onValidate,
  redirectTo = '/conversations',
  debug = true,
}) {
  const router = useRouter();
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const finishedSentRef = useRef(false);

  const log = (...args) => debug && console.log('[MatchFinder]', ...args);
  const warn = (...args) => debug && console.warn('[MatchFinder]', ...args);

  // ✅ INIT SYNCHRONE : on lit localStorage AVANT le 1er render (pas de race)
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return { step: 0, matches: [], chosenKeys: [] };
    }
    const raw = localStorage.getItem(DAILY_KEY);
    const saved = raw ? safeParse(raw, null) : null;

    if (saved?.date === today) {
      const step = typeof saved.step === 'number' ? saved.step : 0;
      const matches = Array.isArray(saved.matches) ? saved.matches : [];
      const chosenKeys = Array.isArray(saved.chosenKeys) ? saved.chosenKeys : [];
      return { step, matches, chosenKeys };
    }
    return { step: 0, matches: [], chosenKeys: [] };
  });

  const [animating, setAnimating] = useState(false);
  const [userPhoto, setUserPhoto] = useState('/default-avatar.png');

  const { step, matches, chosenKeys } = state;

  const finished = matches.length >= ROUNDS;

  const [blockedToday, setBlockedToday] = useState(() => {
    try {
      return typeof window !== 'undefined' ? hasMatchedToday() : false;
    } catch {
      return false;
    }
  });

  const currentProfile = useMemo(() => profiles[step] || null, [profiles, step]);

  // ✅ canLaunch strict : pas plus de 3 tirages, et pas si déjà fait aujourd’hui
  const canLaunch = !animating && !!currentProfile && !finished && !blockedToday;

  // Photo user
  useEffect(() => {
    try {
      const photo = localStorage.getItem('userPhotoUrl');
      if (photo && !photo.startsWith('blob:')) setUserPhoto(photo);
    } catch {}
  }, []);

  // ✅ PERSIST : maintenant c’est safe, car state est déjà restauré dès le début
  useEffect(() => {
    try {
      const payload = { date: today, step, matches, chosenKeys };
      localStorage.setItem(DAILY_KEY, JSON.stringify(payload));
      log('PERSIST', payload);
    } catch (e) {
      warn('PERSIST error', e);
    }
  }, [today, step, matches, chosenKeys]);



  const handleFindNext = () => {
    log('CLICK handleFindNext', { canLaunch, step, animating, finished, blockedToday });
    if (!canLaunch) return;

    setAnimating(true);

    setTimeout(() => {
      const base = profiles[step];
      if (!base) {
        setAnimating(false);
        return;
      }

      const match = {
        ...base,
        compatibility: Math.min(99, Math.max(60, Math.floor(Math.random() * 35) + 65)),
      };

      setTimeout(() => {
        setAnimating(false);

        setState((prev) => {
          const updatedMatches = [...prev.matches, match];
          const nextStep = Math.min(prev.step + 1, ROUNDS);
          log('setState => matches', updatedMatches.map(m => m.id ?? m.name), 'step', nextStep);
          return { ...prev, matches: updatedMatches, step: nextStep };
        });
      }, 900);
    }, 700);
  };

  const toggleSelect = (match) => {
    const key = match?.id ?? match?.name;
    if (!key) return;

    setState((prev) => {
      const already = prev.chosenKeys.includes(key);
      let nextChosen = prev.chosenKeys;

      if (already) nextChosen = prev.chosenKeys.filter((x) => x !== key);
      else if (prev.chosenKeys.length < MAX_PICKS) nextChosen = [...prev.chosenKeys, key];

      log('toggleSelect', { key, nextChosen });
      return { ...prev, chosenKeys: nextChosen };
    });
  };

  const handleValidate = () => {
    const selected = matches.filter((m) => chosenKeys.includes(m.id ?? m.name));
    log('CLICK validate', { chosenKeys, selected: selected.map(m => m.id ?? m.name) });

    if (selected.length === 0) return;

    if (typeof onValidate === 'function') onValidate(selected);

    // ✅ suite : page conversations
    router.push(redirectTo);
  };

  return (
    <div className="text-center space-y-8" style={{ color: TEXT }}>
      <header className="space-y-2">
        <h2 className="text-2xl font-extrabold">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)` }}
          >
            Tirage {Math.min(matches.length, ROUNDS)}/{ROUNDS}
          </span>
        </h2>

        <div className="text-xs" style={{ color: MUTED }}>
          step:{step} matches:{matches.length} chosen:{chosenKeys.length} blockedToday:{String(blockedToday)}
        </div>
      </header>

      {/* Zone anim centrale */}
      {!finished && (
        <>
          <div className="flex flex-col items-center justify-center space-y-6" style={{ minHeight: '14rem' }}>
            {animating && (
              <p className="text-sm animate-pulse" style={{ color: GOLD }}>
                Recherche de compatibilité…
              </p>
            )}

            <div className="relative flex items-center justify-center w-full h-32 gap-2">
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
                </div>
              )}

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

          <button
            type="button"
            onClick={handleFindNext}
            disabled={!canLaunch}
            className="py-3 px-6 rounded-full font-bold shadow-lg transition border disabled:opacity-60"
            style={{ background: GOLD, color: '#15171B', borderColor: 'transparent' }}
          >
            Lancer le match
          </button>
        </>
      )}

      {/* Matchs tirés + sélection */}
      {matches.length > 0 && (
        <section className="flex flex-col items-center space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {matches.map((match, idx) => {
              const key = match.id ?? match.name ?? `m-${idx}`;
              const selected = chosenKeys.includes(key);
              const disabled = !selected && chosenKeys.length >= MAX_PICKS;

              return (
                <article
                  key={key}
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

                  <p className="text-sm font-bold mb-2" style={{ color: GOLD }}>
                    Compatibilité : {match.compatibility ?? '—'}%
                  </p>

                  <button
                    type="button"
                    onClick={() => toggleSelect(match)}
                    disabled={disabled}
                    className="w-full py-2 mt-3 rounded-full font-semibold transition border"
                    style={{
                      background: selected ? DANGER : GOLD,
                      color: selected ? '#fff' : '#15171B',
                      borderColor: selected ? DANGER : 'transparent',
                      opacity: disabled ? 0.6 : 1,
                      cursor: disabled ? 'not-allowed' : 'pointer',
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

      {/* Suite */}
      {finished && (
        <div className="pt-2 space-y-3 text-sm" style={{ color: MUTED }}>
          <div>Tirages terminés. Sélectionne puis valide pour continuer.</div>

          <button
            type="button"
            onClick={handleValidate}
            disabled={chosenKeys.length === 0}
            className="py-3 px-6 rounded-full font-bold shadow-lg transition border disabled:opacity-60"
            style={{ background: GOLD, color: '#15171B', borderColor: 'transparent' }}
          >
            Valider mes {chosenKeys.length} match{chosenKeys.length > 1 ? 's' : ''}
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-move-line { animation: moveLine 1.2s linear infinite; }
        @keyframes moveLine {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}