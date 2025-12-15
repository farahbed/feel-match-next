'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { addMessage, getConversationById } from '@/lib/storage';

const GOLD = '#c2a661';
const BG = '#0f1115';
const SURFACE = '#15171B';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function ConversationDetail() {
  const router = useRouter();
  const params = useParams();
  const id = useMemo(() => String(params?.id || ''), [params]);

  const [conv, setConv] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!id) return;
    setConv(getConversationById(id));
  }, [id]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const msg = addMessage(id, { from: 'me', text: t });
    if (!msg) return;
    setConv(getConversationById(id));
    setText('');
  };

  if (!conv) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG, color: TEXT }}>
        <div className="rounded-xl border px-6 py-4 text-sm" style={{ background: SURFACE, borderColor: BORDER, color: MUTED }}>
          Conversation introuvable.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push('/conversations')}
            className="px-4 py-2 rounded-full font-semibold border"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            ← Conversations
          </button>
          <div className="font-semibold" style={{ color: GOLD }}>
            {conv.title}
          </div>
        </div>

        {/* messages */}
        <div className="rounded-xl border p-4 space-y-3" style={{ background: SURFACE, borderColor: BORDER }}>
          {(conv.messages || []).map((m) => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] rounded-2xl px-4 py-2 text-sm"
                style={{
                  background: m.from === 'me' ? GOLD : '#0f1115',
                  color: m.from === 'me' ? '#15171B' : TEXT,
                  border: m.from === 'me' ? 'none' : `1px solid ${BORDER}`,
                }}
              >
                <div>{m.text}</div>
                <div className="text-[11px] mt-1" style={{ color: m.from === 'me' ? '#15171B' : MUTED, opacity: 0.8 }}>
                  {m.at ? new Date(m.at).toLocaleString() : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* input */}
        <div className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écris un message…"
            className="flex-1 rounded-xl px-4 py-3 outline-none border"
            style={{ background: '#0f1115', borderColor: BORDER, color: TEXT }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
          />
          <button
            onClick={send}
            className="px-5 py-3 rounded-xl font-bold"
            style={{ background: GOLD, color: '#15171B' }}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}