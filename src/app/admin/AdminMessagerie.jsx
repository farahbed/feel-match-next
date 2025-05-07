'use client';
import { useEffect, useState } from 'react';

export default function AdminMessagerie() {
  const [messages, setMessages] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(false);

  const adminEmail = localStorage.getItem('userEmail'); // exemple : admin@email.com
  const userEmail = 'test@email.com'; // 👈 à remplacer plus tard dynamiquement

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getMessages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userA: userEmail, userB: adminEmail })
        });

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Erreur lors du chargement des messages', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSendReply = async () => {
    if (newReply.trim() === '') return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: adminEmail,
          recipient: userEmail,
          content: newReply
        })
      });

      if (res.ok) {
        const now = new Date();
        setMessages(prev => [
          ...prev,
          {
            sender: adminEmail,
            recipient: userEmail,
            content: newReply,
            timestamp: now.getTime().toString(),
            read: false
          }
        ]);
        setNewReply('');
      }
    } catch (err) {
      console.error('Erreur lors de l’envoi de la réponse', err);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg border border-yellow-500 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Messagerie Admin avec {userEmail}</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : messages.length === 0 ? (
        <p>Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === adminEmail ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-4 rounded-3xl ${msg.sender === adminEmail ? 'bg-[#c2a661] text-black' : 'bg-red-600 text-white'}`}>
                <p>{msg.content}</p>
                <p className="text-xs text-gray-300 text-right mt-1">{new Date(Number(msg.timestamp)).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Écris ta réponse..."
          className="flex-1 border border-[#c2a661] rounded-full p-2 px-4 focus:outline-none bg-black text-white"
        />
        <button
          onClick={handleSendReply}
          className="bg-[#c2a661] text-black py-2 px-4 rounded-full hover:bg-yellow-500"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}