'use client';
import { useEffect, useState } from 'react';

export default function MessagerieUser() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getMessages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userA: userEmail, userB: 'admin@email.com' })
        });

        const data = await res.json();
        setMessages(data);
        setConversations([
          {
            id: 1,
            name: 'Admin',
            messages: data.map((m, i) => ({
              id: i + 1,
              sender: m.sender === userEmail ? 'Moi' : m.sender,
              content: m.content,
              time: new Date(Number(m.timestamp)).toLocaleTimeString()
            }))
          }
        ]);
      } catch (err) {
        console.error("Erreur de chargement des messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() === '' || !selectedConversation) return;

    const sender = localStorage.getItem('userEmail');
    const recipient = 'admin@email.com';

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, recipient, content: newMessage })
      });

      const data = await res.json();

      if (res.ok) {
        const now = new Date();
        const newMsg = {
          id: selectedConversation.messages.length + 1,
          sender: 'Moi',
          content: newMessage,
          time: now.toLocaleTimeString()
        };

        const updated = {
          ...selectedConversation,
          messages: [...selectedConversation.messages, newMsg]
        };

        setSelectedConversation(updated);
        setNewMessage('');
      } else {
        console.error('Erreur lors de l’envoi :', data.message);
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-black">
      {/* HEADER */}
      <div className="bg-black sticky top-0 z-20 p-4 border-b border-[#c2a661] flex items-center justify-between">
        {selectedConversation ? (
          <>
            <button onClick={handleBackToList} className="text-[#c2a661] font-bold text-lg">
              Retour
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-[#c2a661]">{selectedConversation.name}</h2>
            <div className="w-12" />
          </>
        ) : (
          <h1 className="text-3xl sm:text-4xl font-bold text-[#c2a661] text-center w-full">Messagerie</h1>
        )}
      </div>

      {/* CONVERSATION LIST */}
      {!selectedConversation && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-black via-[#3b2702] to-black">
          <div className="space-y-6">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center p-4 sm:p-6 rounded-3xl bg-[#1f1f1f] shadow-md hover:shadow-yellow-500/30 cursor-pointer transition-all duration-300"
                onClick={() => setSelectedConversation(conv)}
              >
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${conv.name}`}
                  alt={conv.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#c2a661] object-cover mr-4 sm:mr-6"
                />
                <div className="flex flex-col justify-center max-w-[70%]">
                  <h2 className="text-lg sm:text-2xl font-bold text-[#c2a661]">{conv.name}</h2>
                  <p className="text-gray-400 text-sm mt-1 truncate">
                    {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content : 'Aucun message'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MESSAGE THREAD */}
      {selectedConversation && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {selectedConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'Moi' ? 'justify-end' : 'justify-start'} transition duration-300 ease-in-out`}
              >
                <div className={`max-w-[80%] sm:max-w-md p-4 rounded-3xl ${
                  msg.sender === 'Moi'
                    ? 'bg-[#c2a661] text-black'
                    : 'bg-[#2a2a2a] text-white'
                }`}>
                  <p className="text-md">{msg.content}</p>
                  <span className="text-xs text-gray-400 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* MESSAGE INPUT */}
          <div className="p-3 sm:p-4 bg-[#1a1a1a] flex items-center gap-2 sticky bottom-0">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écris ton message..."
              className="flex-1 border border-[#c2a661] rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#c2a661] bg-black text-white text-sm sm:text-base"
            />
            <button
              onClick={handleSend}
              className="bg-[#c2a661] text-black py-2 px-4 rounded-full hover:bg-yellow-500 text-sm sm:text-base"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}