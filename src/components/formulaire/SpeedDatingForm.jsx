'use client';
import { useEffect, useMemo, useState } from 'react';

const GOLD = '#c2a661';
const SURFACE = '#15171b';
const SURFACE_2 = '#1b1d22';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function SpeedDatingForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const [data, setData] = useState({
    // ÉTAPE 1 — Identité & contact
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    // ÉTAPE 2 — Événement & préférences
    dateSouhaitee: '',
    creneau: '',
    genre: '',
    recherche: '',
    trancheAge: '',
    attentes: '',
    disponibilites: '',
    // Consentements
    acceptRgpd: false,
    acceptReglement: false,
    newsletter: false,
  });

  // Chargement du brouillon
  useEffect(() => {
    try {
      const saved = localStorage.getItem('speedDatingDraft');
      if (saved) setData(prev => ({ ...prev, ...JSON.parse(saved) }));
      // préremplir email depuis le compte si existant
      const accountEmail = localStorage.getItem('userEmail');
      if (accountEmail && !data.email) {
        setData(prev => ({ ...prev, email: accountEmail }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave
  useEffect(() => {
    localStorage.setItem('speedDatingDraft', JSON.stringify(data));
  }, [data]);

  const inputStyle =
    'w-full p-3 rounded-xl bg-black/60 text-white border border-gray-600 focus:border-[#c2a661] placeholder:text-gray-400';
  const sectionStyle = 'grid grid-cols-1 sm:grid-cols-2 gap-6';

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setData(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }));
  };

  // Validations
  const emailOk = (v) => /\S+@\S+\.\S+/.test(v || '');
  const phoneOk = (v) => !v || /^[0-9 +().-]{8,}$/.test(v); // souple

  const stepValid = useMemo(() => {
    if (step === 1) {
      return (
        data.prenom?.trim() &&
        data.email?.trim() &&
        emailOk(data.email) &&
        data.ville?.trim() &&
        phoneOk(data.telephone)
      );
    }
    if (step === 2) {
      return (
        data.dateSouhaitee &&
        data.creneau &&
        data.genre &&
        data.recherche &&
        data.trancheAge &&
        data.acceptRgpd &&
        data.acceptReglement
      );
    }
    return true;
  }, [step, data]);

  const next = () => {
    if (!stepValid) {
      setToast({ type: 'error', msg: 'Complète les champs requis avant de continuer.' });
      return;
    }
    setStep(s => Math.min(2, s + 1));
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submit = async (e) => {
    e.preventDefault();
    if (!stepValid) {
      setToast({ type: 'error', msg: 'Complète les champs requis avant de valider.' });
      return;
    }

    setSubmitting(true);
    try {
      // 🔗 Brancher ton endpoint ici si besoin (AWS/API)
      // const res = await fetch('https://.../speed-register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      // if (!res.ok) throw new Error('Erreur serveur');

      // Simu UI-only
      await new Promise(r => setTimeout(r, 800));

      localStorage.setItem('speedDatingSubmittedAt', new Date().toISOString());
      setToast({ type: 'success', msg: 'Pré-inscription enregistrée !' });
    } catch {
      setToast({ type: 'error', msg: 'Erreur lors de l’envoi.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-4xl mx-auto rounded-3xl border shadow-2xl space-y-6"
      style={{ background: SURFACE, borderColor: GOLD, color: TEXT }}
    >
      {/* Barre d’entête */}
      <div className="rounded-2xl p-4 border-b" style={{ background: SURFACE_2, borderColor: BORDER }}>
        <div className="flex items-center justify-between text-sm">
          <h3 className="text-xl font-bold">Inscription Speed Dating</h3>
          <div className="flex items-center gap-2">
            <span style={{ color: MUTED }}>Étape {step}/2</span>
            <div className="w-32 h-1.5 bg-[#0f1115] rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${(step / 2) * 100}%`,
                  background: GOLD,
                  transition: 'width .3s',
                }}
              />
            </div>
          </div>
        </div>
        <p className="text-sm mt-1" style={{ color: MUTED }}>
          Nous te recontactons avec les détails (lieu, horaire, paiement).
        </p>
      </div>

      {/* Étape 1 */}
      {step === 1 && (
        <div className="px-6 pb-2">
          <div className={sectionStyle}>
            <div className="sm:col-span-2">
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Prénom *
              </label>
              <input name="prenom" placeholder="Ex. Lina" value={data.prenom} onChange={change} className={inputStyle} />
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Nom
              </label>
              <input name="nom" placeholder="(facultatif)" value={data.nom} onChange={change} className={inputStyle} />
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="vous@exemple.com"
                value={data.email}
                onChange={change}
                className={inputStyle}
              />
              {!emailOk(data.email) && data.email && (
                <p className="text-xs mt-1 text-red-400">Email invalide.</p>
              )}
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Téléphone
              </label>
              <input
                name="telephone"
                placeholder="+33 ..."
                value={data.telephone}
                onChange={change}
                className={inputStyle}
              />
              {!phoneOk(data.telephone) && data.telephone && (
                <p className="text-xs mt-1 text-red-400">Numéro non valide.</p>
              )}
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Ville *
              </label>
              <input name="ville" placeholder="Ex. Paris" value={data.ville} onChange={change} className={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* Étape 2 */}
      {step === 2 && (
        <div className="px-6 pb-2">
          <div className={sectionStyle}>
            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Date souhaitée *
              </label>
              <input
                name="dateSouhaitee"
                type="date"
                value={data.dateSouhaitee}
                onChange={change}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Créneau préféré *
              </label>
              <select name="creneau" value={data.creneau} onChange={change} className={inputStyle}>
                <option value="">Choisir…</option>
                <option value="18-20">18h–20h</option>
                <option value="20-22">20h–22h</option>
                <option value="22-00">22h–00h</option>
              </select>
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Tu es… *
              </label>
              <select name="genre" value={data.genre} onChange={change} className={inputStyle}>
                <option value="">Choisir…</option>
                <option value="femme">Femme</option>
                <option value="homme">Homme</option>
              </select>
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Tu souhaites rencontrer… *
              </label>
              <select name="recherche" value={data.recherche} onChange={change} className={inputStyle}>
                <option value="">Choisir…</option>
                <option value="femme">Des femmes</option>
                <option value="homme">Des hommes</option>
              </select>
            </div>

            <div>
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Tranche d’âge visée *
              </label>
              <select name="trancheAge" value={data.trancheAge} onChange={change} className={inputStyle}>
                <option value="">Choisir…</option>
                <option value="18-25">18–25</option>
                <option value="25-35">25–35</option>
                <option value="35-45">35–45</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Tes attentes
              </label>
              <textarea
                name="attentes"
                placeholder="Ce que tu attends de l’événement (ambiance, intentions, etc.)"
                value={data.attentes}
                onChange={change}
                className={inputStyle + ' min-h-[100px]'}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm block mb-2" style={{ color: MUTED }}>
                Disponibilités (autres dates/heures possibles)
              </label>
              <textarea
                name="disponibilites"
                placeholder="Ex. aussi dispo le jeudi soir, samedi après-midi…"
                value={data.disponibilites}
                onChange={change}
                className={inputStyle + ' min-h-[80px]'}
              />
            </div>

            {/* Consentements */}
            <div className="sm:col-span-2 grid gap-3">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="acceptRgpd"
                  checked={data.acceptRgpd}
                  onChange={change}
                  className="mt-1"
                />
                <span style={{ color: MUTED }}>
                  J’accepte que mes données soient utilisées pour l’organisation de l’événement (RGPD). *
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="acceptReglement"
                  checked={data.acceptReglement}
                  onChange={change}
                  className="mt-1"
                />
                <span style={{ color: MUTED }}>
                  J’ai lu et j’accepte le règlement de participation (respect, confidentialité, ponctualité). *
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={data.newsletter}
                  onChange={change}
                  className="mt-1"
                />
                <span style={{ color: MUTED }}>
                  Je souhaite recevoir les prochains événements et offres (facultatif).
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-6 pb-6">
        {step > 1 ? (
          <button type="button" onClick={prev} className="px-4 py-2 underline" style={{ color: TEXT }}>
            ← Précédent
          </button>
        ) : (
          <span />
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            disabled={!stepValid}
            className="ml-auto px-4 py-2 rounded-full font-semibold transition border disabled:opacity-50"
            style={{
              background: stepValid ? GOLD : '#444',
              color: stepValid ? '#15171B' : '#ccc',
              borderColor: 'transparent',
            }}
          >
            Suivant →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting || !stepValid}
            className="ml-auto px-6 py-3 rounded-full font-bold transition border disabled:opacity-50"
            style={{ background: GOLD, color: '#15171B', borderColor: 'transparent' }}
          >
            {submitting ? 'Envoi…' : 'Valider'}
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-5 z-50">
          <div
            className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            style={{
              background: toast.type === 'success' ? '#16a34a' : '#b91c1c',
              color: '#fff',
            }}
          >
            {toast.msg}
          </div>
        </div>
      )}
    </form>
  );
}