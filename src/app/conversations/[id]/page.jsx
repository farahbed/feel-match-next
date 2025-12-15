// src/app/conversations/[id]/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { addMessage, getConversationById } from '@/lib/storage';

const GOLD = '#c2a661';
const SURFACE = '#15171b';
const SURFACE_2 = '#1b1d22';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

function ProfileModal({ open, onClose, match }) {
  if (!open) return null;
  const m = match || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border p-6"
        style={{ background: SURFACE, borderColor: BORDER }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <img
            src={m.image || '/default-avatar.png'}
            alt={m.name || 'Profil'}
            className="w-20 h-20 rounded-full object-cover border"
            style={{ borderColor: GOLD }}
            onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
          />
          <div className="min-w-0">
            <div className="text-xl font-extrabold" style={{ color: GOLD }}>
              {m.name || 'Profil'}{m.age ? `, ${m.age} ans` : ''}
            </div>
            <div className="text-sm" style={{ color: MUTED }}>
              {m.phrase || '—'}
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          {!!m.preferences?.heart?.length && (
            <div>❤ {m.preferences.heart.join(', ')}</div>
          )}
          {!!m.preferences?.search?.length && (
            <div>🔍 {m.preferences.search.join(', ')}</div>
          )}
          {!!m.preferences?.duo?.length && (
            <div>👩👨 {m.preferences.duo.join(', ')}</div>
          )}
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full font-semibold border"
            style={{ borderColor: BORDER, color: TEXT }}
          >
            Fermer
          </button>

          <Link
            href={`/profil-public?id=${encodeURIComponent(m.id ?? '')}`}
            className="px-4 py-2 rounded-full font-bold"
            style={{ background: GOLD, color: '#15171B' }}
          >
            Profil complet
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConversationByIdPage() {
  const params = useParams();
  const id = useMemo(() => (typeof params?.id === 'string' ? params.id : ''), [params]);

  const [conversation, setConversation] = useState(null);
  const [text, setText] = useState('');
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    if (!id) return;
    setConversation(getConversationById(id));
  }, [id]);

  const m = conversation?.match || {};

  const handleSend = () => {
    if (!id) return;
    const msg = addMessage(id, { role: 'me', text });
    if (!msg) return;

    setText('');
    setConversation(getConversationById(id)); // refresh depuis storage
  };

  if (!conversation) {
    return (
      <div className="min-h-screen p-6" style={{ color: TEXT }}>
        <p style={{ color: MUTED }}>Conversation introuvable.</p>
        <Link href="/conversations" style={{ color: GOLD }} className="underline">
          Retour aux conversations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ color: TEXT }}>
      {/* Header profil (toujours visible) */}
      <header
        className="rounded-2xl border p-4 mb-6 flex items-center gap-4"
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
          <div className="font-extrabold truncate" style={{ color: GOLD }}>
            {m.name || 'Profil'}{m.age ? `, ${m.age} ans` : ''}
          </div>
          <div className="text-sm truncate" style={{ color: MUTED }}>
            {m.phrase || '—'}
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={() => setOpenProfile(true)}
              className="px-4 py-2 rounded-full font-semibold border"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              Voir le profil complet
            </button>

            <Link
              href="/conversations"
              className="px-4 py-2 rounded-full font-semibold"
              style={{ background: SURFACE_2, color: TEXT, border: `1px solid ${BORDER}` }}
            >
              Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        className="rounded-2xl border p-4 mb-4 space-y-3"
        style={{ background: SURFACE, borderColor: BORDER }}
      >
        {(conversation.messages || []).map((msg) => (
          <div
            key={msg.id}
            className="rounded-xl p-3"
            style={{
              background: msg.role === 'me' ? SURFACE_2 : 'rgba(194,166,97,0.08)',
              border: `1px solid ${BORDER}`,
            }}
          >
            <div className="text-xs mb-1" style={{ color: MUTED }}>
              {msg.role === 'me' ? 'Moi' : msg.role === 'system' ? 'Système' : m.name || 'Match'}
            </div>
            <div className="text-sm">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="rounded-2xl border p-4 flex gap-2"
        style={{ background: SURFACE, borderColor: BORDER }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris un message…"
          className="flex-1 rounded-xl px-4 py-3 outline-none"
          style={{ background: SURFACE_2, border: `1px solid ${BORDER}`, color: TEXT }}
        />
        <button
          onClick={handleSend}
          className="px-5 py-3 rounded-xl font-bold"
          style={{ background: GOLD, color: '#15171B' }}
        >
          Envoyer
        </button>
      </div>

      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} match={m} />
    </div>
  );
}