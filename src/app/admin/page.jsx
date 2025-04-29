'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatsPage from './stats';
import { User, MessageSquare, BarChart2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [section, setSection] = useState('utilisateurs');
  const [message, setMessage] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      router.push('/login');
    }
  }, []);

  const handleSendMessage = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ user: "Admin", content: message, timestamp: new Date().toISOString() });
    localStorage.setItem('messages', JSON.stringify(messages));

    setMessage(""); // Clear message field
    setSection('utilisateurs'); // Go back to users list
  };

  const handleReply = (messageIndex, reply) => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = [...storedMessages];

    // Add reply to message
    updatedMessages[messageIndex].reply = reply;

    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const renderContent = () => {
    switch (section) {
      case 'utilisateurs':
        return (
          <div className="p-6 text-white">
            <h3 className="text-3xl font-semibold mb-4">Liste des utilisateurs</h3>
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Rôle</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Farah B', email: 'farah@email.com', role: 'user' },
                  { name: 'Amine L', email: 'amine@email.com', role: 'admin' },
                  { name: 'Sophie J', email: 'sophie@email.com', role: 'user' },
                ].map((user, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-yellow-400 hover:text-yellow-600 px-4 py-2 rounded-lg"
                        onClick={() => setSection('message')}
                      >
                        Envoyer un message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'message':
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        return (
          <div className="p-6 text-white">
            <h3 className="text-3xl font-semibold mb-4">Messagerie</h3>
            {storedMessages.length === 0 ? (
              <p>Aucun message pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {storedMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${msg.user === 'Admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-4 rounded-lg shadow-lg ${msg.user === 'Admin' ? 'bg-[#c2a661] text-black' : 'bg-red-600 text-white'} mx-2`}
                    >
                      <p><strong>{msg.user} :</strong> {msg.content}</p>
                      <p className="text-sm text-gray-300">{new Date(msg.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <textarea
              className="w-full p-4 mt-4 rounded-lg bg-gray-700 text-white"
              rows="3"
              placeholder="Répondre à ce message..."
              onChange={(e) => handleReply(index, e.target.value)} 
            ></textarea>
            <button
              className="mt-2 bg-[#c2a661] text-black py-2 px-6 rounded-lg hover:bg-[#c2a661]"
            >
              Répondre
            </button>
          </div>
        );
        case 'stats':
          return <StatsPage />;  // Show StatsPage when 'stats' section is selected
        default:
          return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-black font-sans">
      {/* Sidebar */}
      <aside className="w-52 bg-black shadow-xl p-4 flex flex-col gap-4 rounded-tr-2xl rounded-br-2xl border-r border-yellow-400">
        <h2 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wide">Admin</h2>
        <button
          onClick={() => setSection('utilisateurs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all font-medium shadow-sm ${section === 'utilisateurs' ? 'bg-[#c2a661] text-black' : 'text-white hover:bg-red-600 hover:text-[#c2a661]'}`}
        >
          <User size={18} /> Utilisateurs
        </button>
        <button
          onClick={() => setSection('message')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all font-medium shadow-sm ${section === 'message' ? 'bg-[#c2a661] text-black' : 'text-white hover:bg-red-600 hover:text-[#c2a661]'}`}
        >
          <MessageSquare size={18} /> Messagerie
        </button>
        <button
          onClick={() => setSection('stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all font-medium shadow-sm ${section === 'stats' ? 'bg-[#c2a661] text-black' : 'text-white hover:bg-red-600 hover:text-[#c2a661]'}`}
        >
          <BarChart2 size={18} /> Statistiques
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 text-white bg-black rounded-tl-2xl">
        {renderContent()}
      </main>
    </div>
  );
}