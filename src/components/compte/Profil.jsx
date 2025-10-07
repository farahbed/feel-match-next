"use client";
import { useEffect, useMemo, useState } from "react";

/**
 * Profil — Dark + Gold Premium v3 (UI only)
 * - Hero: bandeau dégradé or + avatar anneau doré + nom gradient
 * - Relief doux (cartes anthracite, bordures fines, lueurs subtiles)
 * - Micro-animations (shimmer sur CTA, fade-up, hover gallery)
 * - Pills (infos rapides), toast de sauvegarde
 * - Calcul visuel "profil complété" (UI uniquement)
 */

const GOLD = "#E2C275";
const GOLD_SOFT = "#E2C27599";
const SURFACE = "#15171B";
const SURFACE_2 = "#1B1D22";
const BORDER = "#262930";
const TEXT = "#E7E7EA";
const TEXT_MUTED = "#A8AAB2";
const PRIMARY = "#6F74EE";
const GREEN = "#34D399";
const DANGER = "#EF4444";
const GALLERY_LIMIT = 6;

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export default function Profil({ onSaved }) {
  const [editMode, setEditMode] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [warnings, setWarnings] = useState({});

  const [profil, setProfil] = useState({
    citation: "",
    nom: "Nom d'utilisateur",
    bio: "",
    age: "",
    ville: "",
    taille: "",
    metier: "",
    enfant: "",
    recherche: "",
    projet: "",
    photos: [],
    photoUrl: "",
  });

  const [snapshot, setSnapshot] = useState(null);

  // Charger depuis localStorage (UI/demo)
  useEffect(() => {
    const rawPhotos = JSON.parse(localStorage.getItem("userPhotos") || "[]");
    const photos = Array.isArray(rawPhotos)
      ? rawPhotos.filter((p) => typeof p === "string" && !p.startsWith("blob:"))
      : [];

    let photoUrl = localStorage.getItem("userPhotoUrl") || "";
    if (photoUrl.startsWith("blob:")) {
      photoUrl = "";
      localStorage.removeItem("userPhotoUrl");
    }

    const storedData = {
      nom: localStorage.getItem("userName") || "Nom d'utilisateur",
      bio: localStorage.getItem("userBio") || "",
      citation: localStorage.getItem("userCitation") || "",
      recherche: localStorage.getItem("userSearch") || "",
      projet: localStorage.getItem("userProject") || "",
      photoUrl,
      photos,
      age: localStorage.getItem("userAge") || "",
      ville: localStorage.getItem("userCity") || "",
      taille: localStorage.getItem("userHeight") || "",
      metier: localStorage.getItem("userJob") || "",
      enfant: localStorage.getItem("userKids") || "",
    };
    setProfil((prev) => ({ ...prev, ...storedData }));
  }, []);

  // Validation douce (affiche conseils seulement)
  const softValidate = (p) => {
    const w = {};
    if (!p.nom?.trim()) w.nom = "Astuce : ajoute un nom/pseudo pour être plus visible.";
    if (!p.bio?.trim()) w.bio = "Astuce : une bio synthétique aide à matcher.";
    if (!p.recherche?.trim()) w.recherche = "Astuce : précise ce que tu recherches pour attirer les bons profils.";
    if (!p.projet?.trim()) w.projet = "Astuce : parle de ton projet commun pour montrer tes intentions.";
    return w;
  };
  useEffect(() => setWarnings(softValidate(profil)), [profil]);

  // % completion (UI): 6 critères
  const completion = useMemo(() => {
    const parts = [
      !!profil.photoUrl,
      !!profil.nom?.trim(),
      !!profil.bio?.trim(),
      !!profil.recherche?.trim(),
      !!profil.projet?.trim(),
      (profil.photos || []).length >= 1,
    ];
    const score = parts.reduce((a, b) => a + (b ? 1 : 0), 0);
    return Math.round((score / parts.length) * 100);
  }, [profil]);

  const missingTips = useMemo(() => {
    const tips = [];
    if (!profil.photoUrl) tips.push("Ajoute une photo de profil");
    if (!(profil.photos || []).length) tips.push("Ajoute 1+ photo dans la galerie");
    if (!profil.bio?.trim()) tips.push("Écris une courte bio");
    if (!profil.recherche?.trim()) tips.push("Précise ce que tu recherches");
    if (!profil.projet?.trim()) tips.push("Décris ton projet commun");
    return tips.slice(0, 3); // 3 tips max
  }, [profil]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil((prev) => ({ ...prev, [name]: value }));
  };
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setProfil((prev) => ({ ...prev, photoUrl: dataUrl }));
  };
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (profil.photos.length + files.length > GALLERY_LIMIT) {
      alert(`Vous pouvez ajouter au maximum ${GALLERY_LIMIT} photos.`);
      return;
    }
    const dataUrls = await Promise.all(files.map(readFileAsDataURL));
    setProfil((prev) => ({ ...prev, photos: [...prev.photos, ...dataUrls] }));
  };
  const handleDeletePhoto = (photo) => {
    setProfil((prev) => ({ ...prev, photos: prev.photos.filter((p) => p !== photo) }));
  };
  const startEdit = () => { setSnapshot(profil); setEditMode(true); };
  const cancelEdit = () => { if (snapshot) setProfil(snapshot); setEditMode(false); setWarnings({}); };
  const handleSave = () => {
    // Save (UI/local)
    localStorage.setItem("userName", profil.nom || "");
    localStorage.setItem("userBio", profil.bio || "");
    localStorage.setItem("userCitation", profil.citation || "");
    localStorage.setItem("userSearch", profil.recherche || "");
    localStorage.setItem("userProject", profil.projet || "");
    localStorage.setItem("userPhotoUrl", profil.photoUrl || "");
    localStorage.setItem("userPhotos", JSON.stringify(profil.photos || []));
    localStorage.setItem("userAge", profil.age || "");
    localStorage.setItem("userCity", profil.ville || "");
    localStorage.setItem("userHeight", profil.taille || "");
    localStorage.setItem("userJob", profil.metier || "");
    localStorage.setItem("userKids", profil.enfant || "");

    if (typeof onSaved === "function") onSaved();
    setIsProfileUpdated(true);
    setTimeout(() => setIsProfileUpdated(false), 1600);
    setEditMode(false);
  };

  return (
    <div>
      {/* TOP BAR */}
      <div className="sticky top-0 z-10" style={{ borderBottom: `1px solid ${BORDER}`, background: "#15171Bcc", backdropFilter: "blur(8px)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full" style={{ background: SURFACE_2 }} />
            <h1 className="text-lg font-semibold" style={{ color: TEXT }}>Mon profil</h1>
          </div>
          <div className="flex items-center gap-2">
            {!editMode ? (
              <Button variant="gold-outline" onClick={startEdit}>✏️ Modifier</Button>
            ) : (
              <>
                <Button variant="subtle" onClick={cancelEdit}>Annuler</Button>
                <Button variant="gold" onClick={handleSave}>Sauvegarder</Button>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* HERO */}
        <Card className="mb-6 overflow-hidden animate-fade-up">
          {/* Bandeau or */}
          <div className="h-16 w-full" style={{
            background: `linear-gradient(90deg, transparent, ${GOLD_SOFT}, transparent)`
          }} />
          <div className="relative -mt-10 px-6 pb-6 sm:px-8">
            {/* Glow d'ambiance */}
            <div className="pointer-events-none absolute -top-8 right-6 h-40 w-40 rounded-full blur-2xl" style={{ background: `${GOLD}14` }} />
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
              {/* Avatar orné */}
              <div className="relative w-28 shrink-0">
                <div className="absolute -inset-1 rounded-2xl opacity-60 blur"
                     style={{ background: `radial-gradient(60% 60% at 50% 50%, ${GOLD}30, transparent)` }} />
                <div className="rounded-2xl p-[2px]" style={{ background: GOLD }}>
                  <div className="rounded-2xl" style={{ background: SURFACE_2 }}>
                    <Avatar url={profil.photoUrl} editable={editMode} onUpload={handleAvatarUpload} />
                  </div>
                </div>
              </div>

              {/* Nom / citation */}
              <div className="flex-1 w-full">
                {editMode ? (
                  <Input
                    name="nom"
                    value={profil.nom}
                    onChange={handleChange}
                    placeholder="Votre nom ou pseudo"
                    label="Nom / Pseudo"
                  />
                ) : (
                  <h2 className="text-2xl font-extrabold leading-tight">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)`
                      }}
                    >
                      {profil.nom || "Nom d'utilisateur"}
                    </span>
                  </h2>
                )}
                {warnings.nom && <FieldWarn>{warnings.nom}</FieldWarn>}

                <div className="mt-2">
                  {editMode ? (
                    <Textarea
                      name="citation"
                      value={profil.citation}
                      onChange={handleChange}
                      placeholder="« Une touche d’élégance, un brin de mystère… »"
                      label="Citation (accroche)"
                      rows={2}
                    />
                  ) : (
                    <p className="italic" style={{ color: TEXT_MUTED }}>
                      “{profil.citation || "Ajoutez une citation accrocheuse à votre profil."}”
                    </p>
                  )}
                </div>
              </div>

              {/* Ring de complétion */}
              <div className="mt-2 sm:mt-0 sm:ml-auto">
                <CompletionRing value={completion} />
              </div>
            </div>

            {/* Pills infos rapides */}
            {!editMode && (
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ["Âge", profil.age],
                  ["Ville", profil.ville],
                  ["Métier", profil.metier],
                  ["Taille", profil.taille],
                ]
                  .filter(([, v]) => v)
                  .map(([label, v], i) => <Pill key={i} label={label} value={v} />)}
              </div>
            )}

            {/* Tips manquants */}
            {!editMode && missingTips.length > 0 && (
              <div className="mt-3 text-sm" style={{ color: TEXT_MUTED }}>
                À améliorer : {missingTips.join(" · ")}
              </div>
            )}
          </div>
        </Card>

        {/* À propos + Infos rapides */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="animate-fade-up delay-100">
            <SectionTitle>À propos de moi</SectionTitle>
            {editMode ? (
              <>
                <Textarea
                  name="bio"
                  value={profil.bio}
                  onChange={handleChange}
                  placeholder="Écrivez une petite bio..."
                  rows={4}
                />
                {warnings.bio && <FieldWarn>{warnings.bio}</FieldWarn>}
              </>
            ) : (
              <p style={{ color: "#D6D7DC" }}>{profil.bio || "Aucune bio renseignée."}</p>
            )}
          </Card>

          <Card className="animate-fade-up delay-150">
            <SectionTitle>Infos rapides</SectionTitle>
            {editMode ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="age" value={profil.age} onChange={handleChange} placeholder="Ex. 25" label="Âge" />
                <Input name="ville" value={profil.ville} onChange={handleChange} placeholder="Ex. Paris" label="Ville" />
                <Input name="taille" value={profil.taille} onChange={handleChange} placeholder="Ex. 1.70 m" label="Taille" />
                <Input name="metier" value={profil.metier} onChange={handleChange} placeholder="Ex. Styliste" label="Métier" />
                <Input name="enfant" value={profil.enfant} onChange={handleChange} placeholder="Ex. Sans enfant" label="Enfant(s)" />
              </div>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                <InfoItem label="Âge" value={profil.age} />
                <InfoItem label="Ville" value={profil.ville} />
                <InfoItem label="Taille" value={profil.taille} />
                <InfoItem label="Métier" value={profil.metier} />
                <InfoItem label="Enfant(s)" value={profil.enfant} />
              </ul>
            )}
          </Card>
        </div>

        {/* Recherche & Projet */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="animate-fade-up delay-200">
            <SectionTitle>🔍 Ce que je recherche</SectionTitle>
            {editMode ? (
              <>
                <Textarea
                  name="recherche"
                  value={profil.recherche}
                  onChange={handleChange}
                  placeholder="Décrivez ce que vous recherchez..."
                  rows={4}
                />
                {warnings.recherche && <FieldWarn>{warnings.recherche}</FieldWarn>}
              </>
            ) : (
              <p style={{ color: "#D6D7DC" }}>{profil.recherche || "Indiquez ce que vous recherchez..."}</p>
            )}
          </Card>

          <Card className="animate-fade-up delay-300">
            <SectionTitle>👫 Mon projet commun</SectionTitle>
            {editMode ? (
              <>
                <Textarea
                  name="projet"
                  value={profil.projet}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet commun..."
                  rows={4}
                />
                {warnings.projet && <FieldWarn>{warnings.projet}</FieldWarn>}
              </>
            ) : (
              <p style={{ color: "#D6D7DC" }}>{profil.projet || "Parlez de votre projet commun..."}</p>
            )}
          </Card>
        </div>

        {/* Galerie */}
        <Card className="mt-6 animate-fade-up delay-400">
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle>📸 Ma galerie</SectionTitle>
            <span className="text-sm" style={{ color: TEXT_MUTED }}>
              {profil.photos.length}/{GALLERY_LIMIT}
            </span>
          </div>

          {editMode && profil.photos.length < GALLERY_LIMIT && (
            <label
              className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition"
              style={{ border: `1px solid ${BORDER}`, background: SURFACE_2, color: TEXT }}
            >
              ➕ Ajouter des photos
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
            </label>
          )}

          {profil.photos.length === 0 ? (
            <p style={{ color: TEXT_MUTED }}>
              {editMode
                ? "Ajoutez vos plus belles photos (portrait lumineux, sourire, activité…)."
                : "Aucune photo pour le moment."}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {profil.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg transition"
                  style={{ border: `1px solid ${BORDER}`, background: SURFACE_2 }}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      onError={(e) => { e.currentTarget.src = "/default-avatar.png"; }}
                    />
                  </div>
                  {editMode && (
                    <button
                      onClick={() => handleDeletePhoto(photo)}
                      className="absolute right-2 top-2 rounded-full px-2 py-1 text-xs text-white hover:brightness-110"
                      style={{ background: DANGER }}
                      title="Supprimer"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Lien public */}
        {!editMode && (
          <div className="mt-6 text-center">
            <a
              href={`/profil-public?user=${encodeURIComponent(profil.nom || "profil")}`}
              className="underline hover:opacity-90"
              style={{ color: PRIMARY }}
            >
              Voir mon profil public
            </a>
          </div>
        )}

        <Toast show={isProfileUpdated} text="✅ Profil mis à jour avec succès !" />
      </main>

      {/* Animations locales */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          60% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up .6s ease both; }
        .delay-100 { animation-delay: .1s; }
        .delay-150 { animation-delay: .15s; }
        .delay-200 { animation-delay: .2s; }
        .delay-300 { animation-delay: .3s; }
        .delay-400 { animation-delay: .4s; }
      `}</style>
    </div>
  );
}

/* ================== UI PRIMITIVES ================== */

function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border shadow-sm ${className}`}
      style={{
        borderColor: BORDER,
        background: `linear-gradient(180deg, ${SURFACE}, ${SURFACE})`,
        boxShadow: "0 1px 2px rgba(0,0,0,.35), 0 0 0 0.5px rgba(226,194,117,0.08)"
      }}
    >
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  let styles = {};
  let classes = "relative inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ";

  if (variant === "gold") {
    styles = { background: GOLD, color: "#15171B" };
    classes += "overflow-hidden hover:brightness-105 active:scale-[0.98]";
  } else if (variant === "gold-outline") {
    styles = { color: GOLD, borderColor: GOLD, background: "transparent" };
    classes += "border hover:bg-[#E2C27514] active:scale-[0.98]";
  } else if (variant === "subtle") {
    styles = { background: SURFACE_2, color: TEXT, borderColor: BORDER };
    classes += "border hover:brightness-105 active:scale-[0.98]";
  } else {
    styles = { background: PRIMARY, color: "#fff" };
    classes += "hover:brightness-105 active:scale-[0.98]";
  }

  return (
    <button className={classes + " " + className} style={styles} {...props}>
      {variant === "gold" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[120%]"
          style={{
            background: `linear-gradient(110deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%)`,
            animation: "shimmer 2.2s infinite"
          }}
        />
      )}
      {children}
    </button>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="mb-3 text-lg font-semibold" style={{ color: TEXT }}>
      <span
        className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
        style={{ background: GOLD, boxShadow: `0 0 6px ${GOLD}80` }}
      />
      {children}
    </h3>
  );
}

function FieldWarn({ children }) {
  return <p className="mt-1 text-sm" style={{ color: "#FBBF24" }}>{children}</p>;
}

function Input({ label, className = "", ...props }) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm font-medium" style={{ color: "#C9CAD1" }}>{label}</span>}
      <input
        {...props}
        className="rounded-md px-3 py-2 text-sm outline-none focus:ring-2"
        style={{
          border: `1px solid ${BORDER}`,
          background: SURFACE_2,
          color: TEXT,
          boxShadow: "none",
        }}
      />
    </label>
  );
}

function Textarea({ label, rows = 3, className = "", ...props }) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm font-medium" style={{ color: "#C9CAD1" }}>{label}</span>}
      <textarea
        rows={rows}
        {...props}
        className="min-h-[84px] rounded-md px-3 py-2 text-sm outline-none focus:ring-2"
        style={{
          border: `1px solid ${BORDER}`,
          background: SURFACE_2,
          color: TEXT,
          boxShadow: "none",
        }}
      />
    </label>
  );
}

function Avatar({ url, editable, onUpload }) {
  const src = url || "/default-avatar.png";
  return (
    <div className="relative">
      <div className="aspect-square w-28 overflow-hidden rounded-2xl">
        <img
          src={src}
          alt="Photo de profil"
          className="h-full w-full object-cover"
          onError={(e) => { e.currentTarget.src = "/default-avatar.png"; }}
        />
      </div>
      {editable && (
        <label
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-full px-3 py-1 text-xs font-medium shadow-sm"
          style={{ border: `1px solid ${GOLD}`, color: "#15171B", background: GOLD }}
        >
          Changer
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <li
      className="flex items-center justify-between rounded-md px-3 py-2"
      style={{ border: `1px solid ${BORDER}`, background: SURFACE_2 }}
    >
      <span className="text-sm" style={{ color: TEXT_MUTED }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: TEXT }}>{value || "—"}</span>
    </li>
  );
}

function Pill({ label, value }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ border: `1px solid ${GOLD}`, color: TEXT, background: `${GOLD}14` }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: GOLD, boxShadow: `0 0 6px ${GOLD}80` }}
      />
      {label}: <span style={{ color: TEXT }}>{value}</span>
    </span>
  );
}

function CompletionRing({ value = 0, size = 64, stroke = 6, color = GOLD }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} className="block">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#2A2D35" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .6s ease" }} />
        <text x="50%" y="50%" dy="4" textAnchor="middle" fontSize="12" fill={TEXT}>{Math.round(value)}%</text>
      </svg>
      <div className="text-xs" style={{ color: TEXT_MUTED }}>
        <div className="font-semibold" style={{ color: TEXT }}>Profil complété</div>
        <div>Plus c’est rempli, meilleur est le matching ✨</div>
      </div>
    </div>
  );
}

function Toast({ show, text }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2 text-sm
      border shadow transition-all ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      style={{ background: SURFACE, borderColor: BORDER, color: GREEN }}
    >
      {text}
    </div>
  );
}