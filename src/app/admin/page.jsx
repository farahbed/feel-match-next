'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatsPage from './stats';
import AdminMessagerie from './AdminMessagerie';
import { User, MessageSquare, BarChart2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [section, setSection] = useState('utilisateurs');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      router.push('/login');
    }
  }, []);

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
                        Voir les messages
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'message':
        return <AdminMessagerie />;

      case 'stats':
        return <StatsPage />;

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