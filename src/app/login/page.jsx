'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const registerParam = urlParams.get('register');
    setIsLogin(registerParam !== 'true'); // true => login / false => register
  }, []);

  const handleToggle = () => {
    const newState = !isLogin;
    setIsLogin(newState);
    router.push(newState ? '/login?register=false' : '/login?register=true');
  };

  return (
    <>
      <Header />

      <div className="login-page">
        <div className="box">
          <h2 className="text-center text-3xl font-bold mb-6 uppercase">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>

          <form className="flex flex-col gap-5">
            {!isLogin && (
              <div className="form-group">
                <label className="text-sm font-semibold mb-1 block">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
                />
              </div>
            )}

            <div className="form-group">
              <label className="text-sm font-semibold mb-1 block">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-semibold mb-1 block">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-yellow-400 hover:bg-red-600 hover:text-white py-3 rounded-lg font-bold transition duration-300"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-blue-500">
  {isLogin ? 'Pas encore de compte ?' : 'Déjà inscrit ?'}{' '}
  <button
    onClick={handleToggle}
    className="text-red-700 hover:underline ml-1 font-semibold"
  >
    {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
  </button>
</p>
        </div>
      </div>
    </>
  );
}