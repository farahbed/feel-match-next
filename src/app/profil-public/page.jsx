'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const GOLD = '#c2a661';
const BG = '#0f1115';
const SURFACE = '#15171B';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function ProfilPublic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const usernameFromQuery = searchParams.get('user') || '';

  const [mounted, setMounted] = useState(false);
  const [profil, setProfil] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);

    const nom = localStorage.getItem('userName') || usernameFromQuery || "Nom d'utilisateur";
    const citation = localStorage.getItem('userCitation') || '';
    const bio = localStorage.getItem('userBio') || '';
    const recherche = localStorage.getItem('userSearch') || '';
    const projet = localStorage.getItem('userProject') || '';
    let photoUrl = localStorage.getItem('userPhotoUrl') || '';
    if (photoUrl.startsWith('blob:')) {
      photoUrl = '';
      localStorage.removeItem('userPhotoUrl');
    }
    const rawPhotos = JSON.parse(localStorage.getItem('userPhotos') || '[]');
    const photos = Array.isArray(rawPhotos)
      ? rawPhotos.filter((p) => typeof p === 'string' && !p.startsWith('blob:'))
      : [];

    const age = localStorage.getItem('userAge') || '';
    const ville = localStorage.getItem('userCity') || '';
    const taille = localStorage.getItem('userHeight') || '';
    const metier = localStorage.getItem('userJob') || '';
    const enfant = localStorage.getItem('userKids') || '';

    setProfil({
      nom, citation, bio, recherche, projet, photoUrl, photos,
      age, ville, taille, metier, enfant,
    });
  }, [usernameFromQuery]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}/profil-public`;
    const q = profil?.nom ? `?user=${encodeURIComponent(profil.nom)}` : '';
    return base + q;
  }, [profil?.nom]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (!mounted || !profil) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG, color: TEXT }}>
        <div className="rounded-xl border px-6 py-4 text-sm" style={{ background: SURFACE, borderColor: BORDER, color: MUTED }}>
          Chargement…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>
      <div className="mx-auto max-w-4xl px-4 py-8">

        {/* 🔙 Bouton retour */}
        <button
          onClick={() => router.push('/compte')}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition"
          style={{
            background: 'transparent',
            color: GOLD,
            border: `1px solid ${GOLD}`,
          }}
        >
          ← Retour à mon compte
        </button>

        {/* En-tête */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div
              className="w-28 h-28 rounded-full overflow-hidden shadow-sm"
              style={{ boxShadow: '0 0 0 2px ' + GOLD }}
            >
              <img
                src={profil.photoUrl || '/default-avatar.png'}
                alt="avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold" style={{ color: TEXT }}>
            {profil.nom || "Nom d'utilisateur"}
          </h2>

          <p className="text-sm italic mt-1" style={{ color: profil.bio ? MUTED : '#7a7c85' }}>
            {profil.bio || 'Aucune bio renseignée.'}
          </p>

          {/* CTA partager */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-full font-semibold transition"
              style={{ background: GOLD, color: '#15171B' }}
            >
              Copier le lien du profil
            </button>
            {copied && <span className="text-xs" style={{ color: GOLD }}>Lien copié ✅</span>}
          </div>
        </div>

        {/* Citation */}
        <Card>
          <blockquote className="text-center text-lg italic" style={{ color: MUTED }}>
            “{profil.citation || 'Aucune citation…'}”
          </blockquote>
        </Card>

        {/* Infos + Recherche */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <SectionTitle>Infos rapides</SectionTitle>
            <ul className="grid gap-2 sm:grid-cols-2">
              <InfoItem label="Âge" value={profil.age} />
              <InfoItem label="Ville" value={profil.ville} />
              <InfoItem label="Taille" value={profil.taille} />
              <InfoItem label="Métier" value={profil.metier} />
              <InfoItem label="Enfant(s)" value={profil.enfant} />
            </ul>
          </Card>

          <Card>
            <SectionTitle>🔍 Ce que je recherche</SectionTitle>
            <p style={{ color: profil.recherche ? TEXT : MUTED }}>
              {profil.recherche || 'Non renseigné'}
            </p>
          </Card>
        </div>

        {/* Projet */}
        <Card>
          <SectionTitle>👫 Mon projet commun</SectionTitle>
          <p style={{ color: profil.projet ? TEXT : MUTED }}>
            {profil.projet || 'Non renseigné'}
          </p>
        </Card>

        {/* Galerie */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle>📸 Galerie</SectionTitle>
            <span className="text-sm" style={{ color: MUTED }}>
              {profil.photos?.length || 0}
            </span>
          </div>

          {profil.photos?.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {profil.photos.map((src, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg"
                  style={{ background: '#0f1115', border: '1px solid ' + BORDER }}
                >
                  <img
                    src={src}
                    alt={`photo ${index + 1}`}
                    className="h-40 w-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: MUTED }}>Aucune photo pour le moment.</p>
          )}
        </Card>
      </div>
    </div>
  );
}

/* --- UI helpers --- */
function Card({ children }) {
  return (
    <div
      className="rounded-xl p-6 shadow-sm mb-6"
      style={{ background: SURFACE, border: '1px solid ' + BORDER }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 className="mb-3 text-lg font-semibold" style={{ color: TEXT }}>{children}</h3>;
}

function InfoItem({ label, value }) {
  return (
    <li
      className="flex items-center justify-between rounded-md px-3 py-2"
      style={{ background: '#0f1115', border: '1px solid ' + BORDER }}
    >
      <span className="text-sm" style={{ color: MUTED }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: TEXT }}>{value || '—'}</span>
    </li>
  );
}