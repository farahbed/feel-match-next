// src/app/conversations/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConversations } from '@/lib/storage';

const GOLD = '#c2a661';
const SURFACE = '#15171b';
const SURFACE_2 = '#1b1d22';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setConversations(getConversations());
  }, []);

  return (
    <div className="min-h-screen p-6" style={{ color: TEXT }}>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold" style={{ color: GOLD }}>
          Conversations
        </h1>
        <p className="text-sm mt-1" style={{ color: MUTED }}>
          Retrouve tes matchs validés et continue la discussion.
        </p>
      </header>

      {conversations.length === 0 ? (
        <div
          className="rounded-2xl border p-6"
          style={{ background: SURFACE, borderColor: BORDER }}
        >
          <p style={{ color: MUTED }}>Aucune conversation pour l’instant.</p>
          <p className="text-sm mt-2" style={{ color: MUTED }}>
            Va sur la page Match, fais ton tirage, sélectionne 1 ou 2 profils puis valide.
          </p>

          <Link
            href="/match"
            className="inline-block mt-4 px-5 py-3 rounded-full font-bold"
            style={{ background: GOLD, color: '#15171B' }}
          >
            Aller à Match
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {conversations.map((c) => {
            const m = c.match || {};
            return (
              <div
                key={c.id}
                className="rounded-2xl border p-4 flex gap-4 items-center"
                style={{ background: SURFACE, borderColor: BORDER }}
              >
                <img
                  src={m.image || '/default-avatar.png'}
                  alt={m.name || 'Profil'}
                  className="w-16 h-16 rounded-full object-cover border"
                  style={{ borderColor: GOLD }}
                  onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
                />

                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate" style={{ color: GOLD }}>
                    {m.name || 'Profil'}{m.age ? `, ${m.age} ans` : ''}
                  </div>
                  <div className="text-sm truncate" style={{ color: MUTED }}>
                    {m.phrase || '—'}
                  </div>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    <Link
                      href={`/conversations/${c.id}`}
                      className="px-4 py-2 rounded-full font-semibold border"
                      style={{ borderColor: GOLD, color: GOLD }}
                    >
                      Ouvrir la conversation
                    </Link>

                    {/* Optionnel : si tu as déjà une page profil-public */}
                    <Link
                      href={`/profil-public?id=${encodeURIComponent(m.id ?? '')}`}
                      className="px-4 py-2 rounded-full font-semibold"
                      style={{ background: SURFACE_2, color: TEXT, border: `1px solid ${BORDER}` }}
                    >
                      Voir le profil
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}