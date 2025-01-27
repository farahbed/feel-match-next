import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SpeedDatingHomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <header className="w-full bg-gradient-to-r from-black via-red-800 to-gold-700 text-center py-6">
        <h1 className="text-4xl font-bold text-gold-500">Speed Dating Élégant</h1>
        <p className="text-lg mt-2 text-red-200">
          Des rencontres sur mesure dans une ambiance raffinée
        </p>
      </header>

      <main className="flex flex-col items-center gap-8 mt-12">
        <Card className="w-4/5 max-w-md bg-black border-gold-700">
          <CardContent>
            <h2 className="text-2xl font-semibold text-gold-500">
              Trouver l'amour avec style
            </h2>
            <p className="mt-4 text-red-300">
              Remplissez notre formulaire détaillé et laissez-nous organiser une
              rencontre parfaite pour vous.
            </p>
            <Button className="mt-6 bg-red-800 hover:bg-gold-700 text-black font-bold rounded-lg">
              Commencez Maintenant
            </Button>
          </CardContent>
        </Card>

        <Card className="w-4/5 max-w-md bg-black border-red-500">
          <CardContent>
            <h2 className="text-2xl font-semibold text-gold-500">
              Comment ça marche ?
            </h2>
            <ol className="list-decimal mt-4 text-red-300 pl-6">
              <li>Créez votre profil</li>
              <li>Répondez à notre formulaire personnalisé</li>
              <li>Laissez-nous organiser votre prochain rendez-vous</li>
            </ol>
          </CardContent>
        </Card>
      </main>

      <footer className="w-full bg-gradient-to-r from-gold-700 via-red-800 to-black text-center py-4">
        <p className="text-red-200">
          &copy; 2025 Speed Dating Élégant. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default SpeedDatingHomePage;