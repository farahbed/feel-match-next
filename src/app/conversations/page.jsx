'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getConversations } from '@/lib/storage';

const GOLD = '#c2a661';
const BG = '#0f1115';
const SURFACE = '#15171B';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function ConversationsPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setConversations(getConversations());
  }, []);

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: TEXT }}>
            Conversations
          </h1>

          <button
            onClick={() => router.push('/match')}
            className="px-4 py-2 rounded-full font-semibold border"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            ← Retour aux matchs
          </button>
        </div>

        {conversations.length === 0 ? (
          <div className="rounded-xl border p-6" style={{ background: SURFACE, borderColor: BORDER }}>
            <p style={{ color: MUTED }}>Aucune conversation pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((c) => {
              const last = (c.messages || [])[c.messages.length - 1];
              return (
                <button
                  key={c.id}
                  onClick={() => router.push(`/conversations/${c.id}`)}
                  className="w-full text-left rounded-xl border p-4 transition hover:brightness-110"
                  style={{ background: SURFACE, borderColor: BORDER }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold" style={{ color: GOLD }}>
                        {c.title || 'Conversation'}
                      </div>
                      <div className="text-sm mt-1" style={{ color: MUTED }}>
                        {last?.text || 'Aucun message'}
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: MUTED }}>
                      {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}