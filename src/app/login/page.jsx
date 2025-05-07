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
    setIsLogin(registerParam !== 'true'); // true => login / false => register
  }, []);

  const handleToggle = () => {
    const newState = !isLogin;
    setIsLogin(newState);
    router.push(newState ? '/login?register=false' : '/login?register=true');
    setMessage(null); // réinitialiser les messages lors du switch
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Stocke le rôle et l'email dans le navigateur
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userEmail', data.email);
        // ✅ Stocke le token dans le navigateur
        localStorage.setItem('token', data.token);
      
        // ✅ Affiche le message
        setMessage('Connexion réussie !');
      
        // ✅ Redirige selon le rôle
        if (data.role === 'admin') {
          setTimeout(() => {
            window.location.href = '/admin';
          }, 1500);
        } else {
          setTimeout(() => {
            window.location.href = '/compte';
          }, 1500);
        }
      } else {
        setMessage(data.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="login-page">
      <div className="box">
        <h2 className="text-center text-3xl font-bold mb-6 uppercase">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>

        {isLogin ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-sm font-semibold mb-1 block">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-semibold mb-1 block">Mot de passe</label>
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-yellow-400 hover:bg-red-600 hover:text-white py-3 rounded-lg font-bold transition duration-300"
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

        <p className="text-center mt-6 text-sm text-yellow-400">
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