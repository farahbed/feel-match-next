'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/SignupForm';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const registerParam = urlParams.get('register');
    setIsLogin(registerParam !== 'true');
  }, []);

  const handleToggle = () => {
    const newState = !isLogin;
    setIsLogin(newState);
    router.push(newState ? '/login?register=false' : '/login?register=true');
    setMessage(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        setMessage('Connexion réussie !');

        setTimeout(() => {
          window.location.href = data.role === 'admin' ? '/admin' : '/compte';
        }, 1500);
      } else {
        setMessage(data.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-black uppercase">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>

        {isLogin ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-black border-2 border-gray-300 focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="password" className="text-sm font-semibold">Mot de passe</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Mot de passe"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-black border-2 border-gray-300 focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-gold hover:bg-gold hover:text-black border-2 border-gold py-3 rounded-lg font-bold transition duration-300"
            >
              Se connecter
            </button>
          </form>
        ) : (
          <SignupForm />
        )}

        {message && (
          <p className="text-center mt-4 text-red-500">{message}</p>
        )}

        <p className="text-center mt-6 text-sm text-yellow-500">
          {isLogin ? 'Pas encore de compte ?' : 'Déjà inscrit ?'}{' '}
          <button
            onClick={handleToggle}
            className="text-red-600 hover:text-yellow-400 underline underline-offset-4 decoration-red-600 hover:decoration-yellow-400 transition duration-300 ease-in-out ml-1 font-semibold"
          >
            {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </div>
  );
}