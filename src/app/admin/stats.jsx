'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsPage() {
  const [stats, setStats] = useState({
    users: 0,
    messagesSent: 0,
    activeUsers: 0,
    eventsOrganized: 0,  // Ajout du nombre d'événements organisés
  });

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Simuler des données statistiques
    const fetchedStats = {
      users: 200,
      messagesSent: 350,
      activeUsers: 120,
      eventsOrganized: 50,  // Nombre d'événements organisés
    };

    setStats(fetchedStats);

    // Exemple de données pour le graphique (utilisateurs, messages, événements)
    const data = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],  // Mois
      datasets: [
        {
          label: 'Utilisateurs',
          data: [50, 60, 70, 80, 90], // Nombre d'utilisateurs par mois
          backgroundColor: '#6d5c3d', // Couleur de la barre (doré-brun)
          borderColor: '#6d5c3d', // Bordure de la barre
          borderWidth: 1,
        },
        {
          label: 'Messages envoyés',
          data: [100, 120, 150, 180, 200], // Messages envoyés par mois
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Couleur de la barre (rouge)
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Événements organisés',  // Troisième barre
          data: [10, 15, 20, 25, 30],  // Événements organisés par mois
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Couleur de la barre (bleu)
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(data); // Mettre à jour les données du graphique
  }, []);

  return (
    <div className="p-6 text-white">
      <h3 className="text-3xl font-semibold mb-4">Statistiques du site</h3>

      {/* Affichage des données simples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661] hover:border-yellow-400">
          <h4 className="text-xl font-semibold">Utilisateurs Totals</h4>
          <p className="text-3xl">{stats.users}</p>
        </div>
        <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661] hover:border-yellow-400">
          <h4 className="text-xl font-semibold">Messages envoyés</h4>
          <p className="text-3xl">{stats.messagesSent}</p>
        </div>
        <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661] hover:border-yellow-400">
          <h4 className="text-xl font-semibold">Utilisateurs actifs</h4>
          <p className="text-3xl">{stats.activeUsers}</p>
        </div>
        <div className="bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661] hover:border-yellow-400">
          <h4 className="text-xl font-semibold">Événements organisés</h4>
          <p className="text-3xl">{stats.eventsOrganized}</p>
        </div>
      </div>

      {/* Graphique des données */}
      <div className="mt-8 bg-black p-6 rounded-lg shadow-lg border-2 border-[#c2a661]">
        <h4 className="text-xl font-semibold">Graphique de l'activité</h4>
        {/* Afficher le graphique */}
        {chartData.labels ? (
          <Bar data={chartData} />
        ) : (
          <p>Chargement des données...</p>  /* Affiche un message de chargement si chartData est vide */
        )}
      </div>
    </div>
  );
}