'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: ''
  });

  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://qq0238b626.execute-api.eu-west-3.amazonaws.com/dev/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Inscription réussie ! Redirection en cours...');
        console.log('➡️ Redirection dans 1.5 sec...');
        setTimeout(() => {
            window.location.href = '/login?register=false';
          }, 1500);
      } else {
        setMessage(data.message || 'Erreur lors de l’inscription');
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="userName"
            onChange={handleChange}
            type="text"
            placeholder="Nom d'utilisateur"
            required
            className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
          />
        </div>

        <div className="form-group">
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
          />
        </div>

        <div className="form-group">
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Mot de passe"
            required
            className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-yellow-400 hover:bg-red-600 hover:text-white py-3 rounded-lg font-bold transition duration-300"
        >
          S'inscrire
        </button>
      </form>

      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </>
  );
}