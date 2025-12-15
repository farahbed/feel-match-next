// src/lib/storage.js

const LAST_MATCH_DATE_KEY = 'lastMatchDate';
const CONVERSATIONS_KEY = 'conversations_v1';

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/** Match quotidien */
export function hasMatchedToday() {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(LAST_MATCH_DATE_KEY) === todayISO();
  } catch {
    return false;
  }
}

export function markMatchedToday() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LAST_MATCH_DATE_KEY, todayISO());
  } catch {}
}

/** Conversations */
export function getConversations() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveConversations(list) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(list));
  } catch {}
}

export function getConversationById(id) {
  const list = getConversations();
  return list.find((c) => c.id === id) || null;
}

function makeId() {
  return `c_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function matchKey(match) {
  return String(match?.id ?? match?.userId ?? match?.email ?? match?.name ?? 'unknown');
}

/**
 * Crée 1 conversation par match validé
 * - évite les doublons (même matchKey)
 */
export function createConversationsFromSelected(selectedMatches) {
  const existing = getConversations();

  const created = [];
  selectedMatches.forEach((m) => {
    const key = matchKey(m);
    const already = existing.find((c) => c.matchKey === key);

    if (!already) {
      const conv = {
        id: makeId(),
        matchKey: key,
        title: m?.name ? `Conversation avec ${m.name}` : 'Conversation',
        match: m,
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: makeId(),
            from: 'system',
            text: '✨ Match validé ! Tu peux démarrer la conversation.',
            at: new Date().toISOString(),
          },
        ],
      };
      existing.unshift(conv);
      created.push(conv);
    } else {
      created.push(already);
    }
  });

  saveConversations(existing);
  return created; // retourne les conversations (nouvelles ou existantes)
}

export function addMessage(conversationId, { from = 'me', text }) {
  const list = getConversations();
  const idx = list.findIndex((c) => c.id === conversationId);
  if (idx === -1) return null;

  const msg = {
    id: makeId(),
    from,
    text,
    at: new Date().toISOString(),
  };

  list[idx] = {
    ...list[idx],
    messages: [...(list[idx].messages || []), msg],
  };

  saveConversations(list);
  return msg;
}