'use client';
import React from 'react';

/**
 * CompteHeader — Dark + Gold
 * - Respecte showAvatar / showDetails
 * - Styles sombres cohérents (surfaces anthracite)
 * - Accent or (#E2C275) + bouton "Changer" lisible en dark
 */
const GOLD = '#E2C275';

export default function CompteHeader({
  user,
  onPhotoChange,
  showAvatar = true,
  showDetails = true,
}) {
  const name = user?.name || "Nom d'utilisateur";
  const bio = user?.bio || 'Aucune bio renseignée.';
  const photo = user?.photoUrl || '/default-avatar.png';

  return (
    <div className="text-center mb-6">
      {showAvatar && (
        <div className="relative inline-block mb-3">
          {/* Anneau or discret + fond sombre */}
          <div className="rounded-full p-[2px]" style={{ background: GOLD }}>
            <div
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{ background: '#1B1D22', border: '1px solid #262930' }}
            >
              <img
                src={photo}
                alt="Photo de profil"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/default-avatar.png'; }}
              />
            </div>
          </div>

          {/* Bouton changer (dark-friendly) */}
          {onPhotoChange && (
            <label
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-full px-3 py-1 text-xs font-medium shadow-sm"
              style={{
                border: `1px solid ${GOLD}`,
                background: GOLD,
                color: '#15171B',
              }}
            >
              Changer
              <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
            </label>
          )}
        </div>
      )}

      {showDetails && (
        <div className="px-3">
          {/* Nom en gradient or très léger */}
          <h2 className="text-2xl font-extrabold leading-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, #E7E7EA 70%)`,
              }}
            >
              {name}
            </span>
          </h2>

          <p className="text-sm italic mt-1" style={{ color: '#A8AAB2' }}>
            {bio}
          </p>
        </div>
      )}
    </div>
  );
}