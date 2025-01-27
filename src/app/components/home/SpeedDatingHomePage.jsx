import React from "react";
import { Card, CardContent, Button } from "@mui/material";

const SpeedDatingHomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <header className="w-full bg-gradient-to-r from-black via-red-800 to-gold-700 text-center py-6">
        <h1 className="text-4xl font-bold text-gold-500">Speed Dating Élégant</h1>
        <p className="text-lg mt-2 text-red-200">Des rencontres sur mesure dans une ambiance raffinée</p>
      </header>

      <main className="flex flex-col items-center gap-8 mt-12">
        <Card sx={{ width: "80%", backgroundColor: "#000", border: "1px solid #a18721" }}>
          <CardContent>
            <h2 style={{ color: "#a18721", fontWeight: "bold" }}>Trouver l'amour avec style</h2>
            <p style={{ marginTop: "16px", color: "#e57373" }}>
              Remplissez notre formulaire détaillé et laissez-nous organiser une rencontre parfaite pour vous.
            </p>
            <Button variant="contained" sx={{ marginTop: "16px", backgroundColor: "#a18721", color: "#000" }}>
              Commencez Maintenant
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SpeedDatingHomePage;