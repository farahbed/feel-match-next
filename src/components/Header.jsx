'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');

    setRole(storedRole);
    setUser(storedName || storedEmail || null);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // 🔐 Supprime token + infos
    setRole(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="bg-dark text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold mr-auto">Feel & Match</h1>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-6 text-sm items-center">
          <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>

          {!role && (
            <>
              <Link href="/login" className="hover:text-accent transition-colors">Se connecter</Link>
              <Link href="/login?register=true" className="hover:text-accent transition-colors">S'inscrire</Link>
            </>
          )}

          {role === 'admin' && (
            <Link href="/admin" className="hover:text-accent transition-colors">Admin</Link>
          )}

          {role === 'user' && (
            <Link href="/compte" className="hover:text-accent transition-colors">Mon Compte</Link>
          )}

          {user && (
            <span className="text-yellow-400 font-medium">Bonjour {user}</span>
          )}

          {role && (
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Se déconnecter
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="sm:hidden ml-4">
          <button onClick={toggleMenu} aria-label="Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 text-sm px-2">
          <Link href="/" onClick={toggleMenu}>Accueil</Link>

          {!role && (
            <>
              <Link href="/login" onClick={toggleMenu}>Se connecter</Link>
              <Link href="/login?register=true" onClick={toggleMenu}>S'inscrire</Link>
            </>
          )}

          {role === 'admin' && (
            <Link href="/admin" onClick={toggleMenu}>Admin</Link>
          )}

          {role === 'user' && (
            <Link href="/compte" onClick={toggleMenu}>Mon Compte</Link>
          )}

          {user && (
            <span className="text-yellow-400 font-medium px-2">Bonjour {user}</span>
          )}

          {role && (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="text-sm text-red-500 hover:underline text-left"
            >
              Se déconnecter
            </button>
          )}
        </div>
      )}
    </header>
  );
}