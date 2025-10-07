'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RotateCw, AlertTriangle, Send, MessageSquareText } from 'lucide-react';

const GOLD = '#c2a661';
const API = process.env.NEXT_PUBLIC_API_URL; // ex: https://xxxx.execute-api.eu-west-3.amazonaws.com/dev

export default function MessagerieUser() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const userEmail = useMemo(() => (typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null), []);
  const listRef = useRef(null);
  const pollRef = useRef(null);

  // ---- Helpers
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (!listRef.current) return;
      listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  };

  const formatTime = (ts) => {
    try {
      const d = typeof ts === 'number' ? new Date(ts) : new Date(Number(ts));
      return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch { return ''; }
  };

  const saveLocalThread = (msgs) => {
    try { localStorage.setItem('thread_admin', JSON.stringify(msgs)); } catch {}
  };
  const loadLocalThread = () => {
    try {
      const raw = localStorage.getItem('thread_admin');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  };

  // ---- Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!userEmail || !API) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/getMessages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userA: userEmail, userB: 'admin@email.com' }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Erreur serveur');
      const data = await res.json(); // [{ sender, content, timestamp }, ...]
      const mapped = data.map((m, i) => ({
        id: i + 1,
        sender: m.sender === userEmail ? 'Moi' : m.sender,
        rawSender: m.sender,
        content: m.content,
        time: formatTime(m.timestamp),
        ts: Number(m.timestamp) || Date.now(),
      }));

      // Construire la conversation Admin
      const adminConv = {
        id: 'admin',
        name: 'Admin',
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=Admin`,
        messages: mapped.sort((a, b) => a.ts - b.ts),
      };

      setConversations([adminConv]);

      // Auto-sélection si rien sélectionné
      setSelectedConversation((prev) => prev ?? adminConv);

      // Persistance locale
      saveLocalThread(adminConv.messages);
    } catch (e) {
      setError('Impossible de charger les messages.');
      // fallback offline si dispo
      const offline = loadLocalThread();
      if (offline) {
        const adminConv = {
          id: 'admin',
          name: 'Admin',
          avatar: `https://api.dicebear.com/6.x/initials/svg?seed=Admin`,
          messages: offline,
        };
        setConversations([adminConv]);
        setSelectedConversation((prev) => prev ?? adminConv);
      }
    } finally {
      setLoading(false);
    }
  }, [API, userEmail]);

  // init + polling
  useEffect(() => {
    if (!userEmail) return;
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 10000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [userEmail, fetchMessages]);

  // scroll à chaque changement du thread
  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages?.length]);

  const handleSend = async () => {
    if (!selectedConversation || !newMessage.trim() || !API) return;
    const content = newMessage.trim();
    const sender = userEmail;
    const recipient = 'admin@email.com';

    // Optimistic UI
    const optimisticMsg = {
      id: (selectedConversation.messages.at(-1)?.id || 0) + 1,
      sender: 'Moi',
      rawSender: sender,
      content,
      time: formatTime(Date.now()),
      ts: Date.now(),
      optimistic: true,
    };

    const updatedConv = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, optimisticMsg],
    };
    setSelectedConversation(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.id === updatedConv.id ? updatedConv : c))
    );
    saveLocalThread(updatedConv.messages);
    setNewMessage('');
    scrollToBottom();

    // Envoi API
    setSending(true);
    try {
      const res = await fetch(`${API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, recipient, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Erreur API');

      // Remplacer le message optimiste par la version “confirmée” (si nécessaire)
      setSelectedConversation((prev) => {
        if (!prev) return prev;
        const msgs = prev.messages.map((m) =>
          m.optimistic && m.content === content ? { ...m, optimistic: false } : m
        );
        const next = { ...prev, messages: msgs };
        saveLocalThread(next.messages);
        return next;
      });
    } catch (e) {
      // Rollback en cas d’échec
      setSelectedConversation((prev) => {
        if (!prev) return prev;
        const msgs = prev.messages.filter((m) => !(m.optimistic && m.content === content));
        return { ...prev, messages: msgs };
      });
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, messages: c.messages.filter((m) => !(m.optimistic && m.content === content)) }
            : c
        )
      );
      setError("Erreur lors de l'envoi du message.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!userEmail) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] bg-black text-white p-8">
        <AlertTriangle className="w-10 h-10 text-yellow-500 mb-3" />
        <p className="text-center text-gray-300">
          Tu dois être connecté pour utiliser la messagerie.
        </p>
        <a
          href="/login"
          className="mt-4 px-5 py-2 rounded-full font-semibold"
          style={{ background: GOLD, color: '#15171B' }}
        >
          Se connecter
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-black">
      {/* HEADER */}
      <div className="bg-black sticky top-0 z-20 p-4 border-b flex items-center justify-between"
           style={{ borderColor: GOLD }}>
        {!selectedConversation ? (
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: GOLD }}>
            Messagerie
          </h1>
        ) : (
          <>
            <button
              onClick={() => setSelectedConversation(null)}
              className="text-sm font-semibold"
              style={{ color: GOLD }}
            >
              ← Retour
            </button>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: GOLD }}>
              {selectedConversation.name}
            </h2>
            <button
              onClick={fetchMessages}
              title="Actualiser"
              className="p-2 rounded-full hover:bg-white/5"
            >
              <RotateCw className="w-5 h-5" style={{ color: GOLD }} />
            </button>
          </>
        )}
      </div>

      {/* LISTE DES CONVERSATIONS */}
      {!selectedConversation && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-black via-[#3b2702] to-black">
          {loading && conversations.length === 0 ? (
            <div className="grid gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquareText className="w-10 h-10 mb-2 text-gray-500" />
              <p>Aucune conversation pour le moment.</p>
              <button
                onClick={fetchMessages}
                className="mt-4 px-4 py-2 rounded-full font-semibold"
                style={{ background: GOLD, color: '#15171B' }}
              >
                Actualiser
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => {
                const last = conv.messages.at(-1);
                return (
                  <div
                    key={conv.id}
                    className="flex items-center p-4 sm:p-5 rounded-3xl bg-[#1f1f1f] shadow-md hover:shadow-yellow-500/30 cursor-pointer transition-all"
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 object-cover mr-4 sm:mr-5"
                      style={{ borderColor: GOLD }}
                      onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/6.x/initials/svg?seed=${conv.name}`; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold" style={{ color: GOLD }}>{conv.name}</h3>
                        <span className="text-xs text-gray-400">{last?.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm truncate">
                        {last ? last.content : 'Aucun message'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}
        </div>
      )}

      {/* THREAD */}
      {selectedConversation && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {selectedConversation.messages.map((msg) => (
              <div
                key={msg.id + '-' + msg.ts}
                className={`flex ${msg.sender === 'Moi' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] sm:max-w-md p-3 sm:p-4 rounded-3xl border ${
                    msg.sender === 'Moi'
                      ? 'text-black'
                      : 'text-white'
                  }`}
                  style={{
                    background: msg.sender === 'Moi' ? GOLD : '#2a2a2a',
                    borderColor: msg.optimistic ? 'rgba(255,255,255,.2)' : 'transparent',
                    opacity: msg.optimistic ? 0.8 : 1,
                  }}
                >
                  <p className="text-sm sm:text-base break-words">{msg.content}</p>
                  <span className="text-[10px] sm:text-xs text-black/70 dark:text-gray-300 block text-right mt-1">
                    {msg.time}{msg.optimistic ? ' • …' : ''}
                  </span>
                </div>
              </div>
            ))}
            {selectedConversation.messages.length === 0 && (
              <p className="text-center text-gray-400">Commence la discussion 👋</p>
            )}
          </div>

          {/* INPUT */}
          <div className="p-3 sm:p-4 bg-[#1a1a1a] flex items-center gap-2 sticky bottom-0">
            <textarea
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écris ton message… (Enter pour envoyer)"
              className="flex-1 border rounded-2xl p-2 px-3 resize-none text-sm sm:text-base bg-black text-white focus:outline-none focus:ring-2"
              style={{ borderColor: GOLD }}
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold disabled:opacity-50"
              style={{ background: GOLD, color: '#15171B' }}
              title="Envoyer"
            >
              <Send className="w-4 h-4" />
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}