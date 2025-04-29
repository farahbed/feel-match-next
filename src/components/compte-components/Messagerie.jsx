import { useState } from 'react';

export default function MessagerieUser() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    {
      id: 1,
      name: 'Alex',
      messages: [
        { id: 1, sender: 'Moi', content: 'Salut Alex !', time: '20h00' },
        { id: 2, sender: 'Alex', content: 'Salut ! Ça va ?', time: '20h01' },
      ],
    },
    {
      id: 2,
      name: 'Sarah',
      messages: [
        { id: 1, sender: 'Moi', content: 'Coucou Sarah !', time: '19h30' },
        { id: 2, sender: 'Sarah', content: 'Hey ! Quoi de neuf ?', time: '19h32' },
      ],
    },
    {
      id: 3,
      name: 'Mohamed',
      messages: [
        { id: 1, sender: 'Moi', content: 'Salam Mohamed !', time: '18h00' },
        { id: 2, sender: 'Mohamed', content: 'Wa 3alaykom salam !', time: '18h02' },
      ],
    },
  ];

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [
        ...selectedConversation.messages,
        { id: selectedConversation.messages.length + 1, sender: 'Moi', content: newMessage, time: 'Maintenant' },
      ];
      const updatedConversation = { ...selectedConversation, messages: updatedMessages };
      setSelectedConversation(updatedConversation);
      setNewMessage('');
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex flex-col h-screen bg-black">

      {/* Header */}
      <div className="bg-black shadow-md sticky top-0 z-20 p-6 border-b border-[#c2a661] flex items-center justify-between">
        {selectedConversation ? (
          <>
            <button onClick={handleBackToList} className="text-[#c2a661] font-bold text-lg">
              Retour
            </button>
            <h2 className="text-2xl font-bold text-[#c2a661]">{selectedConversation.name}</h2>
            <div className="w-12" /> {/* espace vide pour aligner */}
          </>
        ) : (
          <h1 className="text-4xl font-bold text-[#c2a661] text-center w-full">
            Messagerie
          </h1>
        )}
      </div>

      {/* Liste des contacts */}
      {!selectedConversation && (
     <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-[#000000] via-[#3b2702] to-[#000000]">
          <div className="space-y-6">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center p-6 rounded-3xl bg-[#1f1f1f] shadow-md hover:shadow-yellow-500/30 cursor-pointer transition-all duration-300"
                onClick={() => setSelectedConversation(conv)}
              >
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${conv.name}`}
                  alt={conv.name}
                  className="w-16 h-16 rounded-full border-2 border-[#c2a661] object-cover mr-6"
                />

                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-[#c2a661]">{conv.name}</h2>
                  <p className="text-gray-400 text-md mt-1 truncate max-w-[250px]">
                    {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content : 'Aucun message'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversation */}
      {selectedConversation && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {selectedConversation.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'Moi' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-4 rounded-3xl ${msg.sender === 'Moi' ? 'bg-[#c2a661] text-black' : 'bg-red-600 text-white'}`}>
                  <p className="text-md">{msg.content}</p>
                  <span className="text-xs text-gray-200 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-[#1a1a1a] flex items-center gap-2 sticky bottom-0">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écris ton message..."
              className="flex-1 border border-[#c2a661] rounded-full p-2 px-4 focus:outline-none bg-black text-white"
            />
            <button
              onClick={handleSend}
              className="bg-[#c2a661] text-black p-2 px-4 rounded-full hover:bg-yellow-500"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}