// src/lib/storage.js
// Stockage local simple pour la démo (localStorage)

const LAST_MATCH_DATE_KEY = 'lastMatchDate';
const CONVERSATIONS_KEY = 'conversations_v1'; // [{id, createdAt, match, messages:[] }]

export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function hasMatchedToday() {
  if (typeof window === 'undefined') return false;
  const last = localStorage.getItem(LAST_MATCH_DATE_KEY);
  return last === getToday();
}

export function markMatchedToday() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_MATCH_DATE_KEY, getToday());
}

// -------- Conversations --------

export function getConversations() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveConversations(list) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(list));
}

export function getConversationById(id) {
  const list = getConversations();
  return list.find((c) => c.id === id) || null;
}

export function ensureConversationForMatch(match) {
  const list = getConversations();

  // évite doublons : une conversation par match.id (si dispo)
  const existing = list.find((c) => c?.match?.id != null && match?.id != null && c.match.id === match.id);
  if (existing) return existing;

  const id = `c_${Date.now()}_${match?.id ?? Math.random().toString(16).slice(2)}`;

  const convo = {
    id,
    createdAt: new Date().toISOString(),
    match,
    messages: [
      {
        id: `m_${Date.now()}`,
        role: 'system',
        text: `Conversation créée avec ${match?.name ?? 'ce profil'}.`,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const updated = [convo, ...list];
  saveConversations(updated);
  return convo;
}

export function createConversationsFromSelected(selectedMatches = []) {
  const created = [];
  selectedMatches.forEach((m) => {
    const convo = ensureConversationForMatch(m);
    created.push(convo);
  });
  return created;
}

export function addMessage(conversationId, { role = 'me', text }) {
  if (!text?.trim()) return null;

  const list = getConversations();
  const idx = list.findIndex((c) => c.id === conversationId);
  if (idx === -1) return null;

  const msg = {
    id: `m_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    role,
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  const updated = [...list];
  updated[idx] = {
    ...updated[idx],
    messages: [...(updated[idx].messages || []), msg],
  };

  saveConversations(updated);
  return msg;
}