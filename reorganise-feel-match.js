// reorganise-feel-match.js
const fs = require("fs");
const path = require("path");

const base = "src";

// Liste des déplacements (ancien chemin relatif => nouveau chemin relatif)
const moves = [
  // Fichiers à renommer/déplacer
  ["components/page-home/VideoPage.jsx", "app/intro/VideoSection.jsx"],
  ["components/page-home/CallToActionSection.jsx", "components/home/CallToAction.jsx"],
  ["components/page-home/ImageSlider.jsx", "components/home/ImageSlider.jsx"],
  ["components/page-home/OptionEvent.jsx", "components/home/OptionEvent.jsx"],
  ["components/page-home/SpeedDatingHome.jsx", "components/home/SpeedDatingIntro.jsx"],

  ["components/page-compte/Messagerie.jsx", "components/compte/Messagerie.jsx"],
  ["components/page-compte/ParametresUser.jsx", "components/compte/ParametresUser.jsx"],
  ["components/page-compte/Profil.jsx", "components/compte/Profil.jsx"],

  ["components/page-compte/formulaire/BlindDateForm.jsx", "components/formulaire/BlindDateForm.jsx"],
  ["components/page-compte/formulaire/MatchForm.jsx", "components/formulaire/MatchForm.jsx"],
  ["components/page-compte/formulaire/SpeedDatingForm.jsx", "components/formulaire/SpeedDatingForm.jsx"],

  ["components/page-compte/match/MatchFinder.jsx", "components/match/MatchFinder.jsx"],
  ["components/page-compte/match/PageMatch.jsx", "components/match/PageMatch.jsx"]
];

// Création récursive du dossier si nécessaire
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Effectuer tous les déplacements
moves.forEach(([srcRel, destRel]) => {
  const src = path.join(base, srcRel);
  const dest = path.join(base, destRel);
  if (fs.existsSync(src)) {
    ensureDir(dest);
    fs.renameSync(src, dest);
    console.log(`✅ Déplacé : ${srcRel} → ${destRel}`);
  } else {
    console.warn(`⚠️ Introuvable : ${srcRel}`);
  }
});

// Supprimer les dossiers vides (optionnel)
["components/page-home", "components/page-compte"].forEach(folder => {
  const fullPath = path.join(base, folder);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`🧹 Supprimé dossier vide : ${folder}`);
  }
});