'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const GOLD = '#c2a661';
const BG = '#0f1115';
const SURFACE = '#15171b';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function ParametresUser() {
  const [openSection, setOpenSection] = useState(null);
  const [toast, setToast] = useState(null);

  // États par section
  const [emailForm, setEmailForm] = useState({
    currentPassword: '',
    newEmail: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirm: '',
  });

  const [notif, setNotif] = useState({
    email: false,
    sms: false,
    none: false,
  });

  const [prefs, setPrefs] = useState({
    distance: 50,
    ageMin: 22,
    ageMax: 40,
    gender: 'Tous',
  });

  // Charger valeurs depuis localStorage
  useEffect(() => {
    try {
      const sEmail = JSON.parse(localStorage.getItem('settings_email') || '{}');
      const sPwd = JSON.parse(localStorage.getItem('settings_password') || '{}');
      const sNotif = JSON.parse(localStorage.getItem('settings_notif') || '{}');
      const sPrefs = JSON.parse(localStorage.getItem('settings_prefs') || '{}');

      setEmailForm((p) => ({ ...p, ...sEmail }));
      setPasswordForm((p) => ({ ...p, ...sPwd, confirm: '' }));
      setNotif((p) => ({ email: false, sms: false, none: false, ...sNotif }));
      setPrefs((p) => ({ distance: 50, ageMin: 22, ageMax: 40, gender: 'Tous', ...sPrefs }));
    } catch {}
  }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 1800);
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  /* ===== Handlers ===== */

  // Email
  const saveEmail = () => {
    if (!emailForm.currentPassword || !emailForm.newEmail) {
      return showToast('error', 'Remplis le mot de passe et le nouvel email.');
    }
    if (!/\S+@\S+\.\S+/.test(emailForm.newEmail)) {
      return showToast('error', 'Email invalide.');
    }
    localStorage.setItem('settings_email', JSON.stringify({ newEmail: emailForm.newEmail }));
    // Tu peux aussi mettre à jour userEmail global :
    localStorage.setItem('userEmail', emailForm.newEmail);
    showToast('success', 'Email modifié (mock).');
    setEmailForm((p) => ({ ...p, currentPassword: '' }));
  };

  // Mot de passe
  const savePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirm) {
      return showToast('error', 'Tous les champs sont requis.');
    }
    if (passwordForm.newPassword.length < 6) {
      return showToast('error', 'Le mot de passe doit faire au moins 6 caractères.');
    }
    if (passwordForm.newPassword !== passwordForm.confirm) {
      return showToast('error', 'La confirmation ne correspond pas.');
    }
    localStorage.setItem('settings_password', JSON.stringify({ newPassword: '***' }));
    showToast('success', 'Mot de passe modifié (mock).');
    setPasswordForm({ currentPassword: '', newPassword: '', confirm: '' });
  };

  // Notifications
  const saveNotif = () => {
    // règle : si "none" est coché, on force email/sms à false
    const toSave = notif.none ? { email: false, sms: false, none: true } : notif;
    localStorage.setItem('settings_notif', JSON.stringify(toSave));
    showToast('success', 'Préférences de notifications enregistrées.');
  };

  const onChangeNotif = (name) => (e) => {
    const checked = e.target.checked;
    setNotif((prev) => {
      if (name === 'none') {
        return { email: false, sms: false, none: checked };
      }
      // si on coche email/sms, on décoche none
      return { ...prev, [name]: checked, none: checked ? false : prev.none };
    });
  };

  // Préférences de match
  const savePrefs = () => {
    if (Number(prefs.ageMin) > Number(prefs.ageMax)) {
      return showToast('error', "Âge minimum ne peut pas dépasser l'âge maximum.");
    }
    localStorage.setItem('settings_prefs', JSON.stringify(prefs));
    showToast('success', 'Préférences de match enregistrées.');
  };

  // Danger zone
  const deleteAccount = () => {
    if (confirm('Supprimer ton compte ? Cette action est définitive.')) {
      localStorage.clear();
      showToast('success', 'Compte supprimé (mock).');
      setTimeout(() => {
        window.location.href = '/login';
      }, 700);
    }
  };

  /* ===== UI helpers ===== */
  const Section = ({ id, title, children }) => (
    <div className="border-b" style={{ borderColor: GOLD }}>
      <button
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-2xl font-bold" style={{ color: GOLD }}>{title}</span>
        <ChevronDown
          className={`w-7 h-7 transition-transform duration-300`}
          style={{
            transform: openSection === id ? 'rotate(180deg)' : 'rotate(0deg)',
            color: GOLD,
          }}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500`}
        style={{
          maxHeight: openSection === id ? 1000 : 0,
          opacity: openSection === id ? 1 : 0,
        }}
      >
        <div className="mt-4 space-y-6" style={{ color: MUTED }}>
          {children}
        </div>
      </div>
    </div>
  );

  const inputClass =
    'w-full p-4 rounded-full border bg-transparent focus:outline-none focus:ring-2 placeholder:text-gray-400';
  const inputStyle = { borderColor: GOLD, color: TEXT, boxShadow: 'none' };
  const filledChip = (on = true) =>
    `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
      on ? 'bg-[#c2a661] text-black' : 'bg-transparent text-[#c2a661] border'
    }`;

  return (
    <div className="min-h-screen p-8 space-y-6" style={{ background: BG, color: TEXT }}>
      <h1 className="mb-4 text-center text-4xl font-extrabold">
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)` }}
        >
          Paramètres
        </span>
      </h1>

      {/* Sections */}
      <Section id="email" title="Modifier mon Email">
        <p>Modifie ton adresse email. Entre ton mot de passe actuel pour confirmer.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm" style={{ color: GOLD }}>Mot de passe actuel</label>
            <input
              type="password"
              placeholder="Mot de passe actuel"
              className={inputClass}
              style={inputStyle}
              value={emailForm.currentPassword}
              onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm" style={{ color: GOLD }}>Nouvel email</label>
            <input
              type="email"
              placeholder="nouveau@email.com"
              className={inputClass}
              style={inputStyle}
              value={emailForm.newEmail}
              onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
            />
          </div>
        </div>
        <button
          className="w-full rounded-full p-3 font-bold transition hover:brightness-110"
          style={{ background: GOLD, color: '#15171B' }}
          onClick={saveEmail}
        >
          Enregistrer
        </button>
      </Section>

      <Section id="password" title="Modifier mon Mot de Passe">
        <p>Change ton mot de passe pour protéger ton compte.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm" style={{ color: GOLD }}>Mot de passe actuel</label>
            <input
              type="password"
              className={inputClass}
              style={inputStyle}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-sm" style={{ color: GOLD }}>Nouveau</label>
            <input
              type="password"
              className={inputClass}
              style={inputStyle}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="≥ 6 caractères"
            />
          </div>
          <div>
            <label className="text-sm" style={{ color: GOLD }}>Confirmation</label>
            <input
              type="password"
              className={inputClass}
              style={inputStyle}
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              placeholder="Répéter le mot de passe"
            />
          </div>
        </div>
        <button
          className="w-full rounded-full p-3 font-bold transition hover:brightness-110"
          style={{ background: GOLD, color: '#15171B' }}
          onClick={savePassword}
        >
          Enregistrer
        </button>
      </Section>

      <Section id="notifications" title="Notifications">
        <p>Choisis comment recevoir tes notifications Feel & Match.</p>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notif.email} onChange={onChangeNotif('email')} />
            Email
            <span className={filledChip(notif.email)}>on</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notif.sms} onChange={onChangeNotif('sms')} />
            SMS
            <span className={filledChip(notif.sms)}>on</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notif.none} onChange={onChangeNotif('none')} />
            Ne pas recevoir de notifications
            <span className={filledChip(notif.none)}>on</span>
          </label>
        </div>

        <button
          className="w-full rounded-full p-3 font-bold transition hover:brightness-110"
          style={{ background: GOLD, color: '#15171B' }}
          onClick={saveNotif}
        >
          Enregistrer
        </button>
      </Section>

      <Section id="preferences" title="Préférences de Match">
        <p>Définis ta distance maximale et tranche d'âge pour tes matchs idéaux.</p>

        <div className="grid gap-6">
          <div>
            <label className="block mb-2" style={{ color: GOLD }}>
              Distance maximale : <b style={{ color: TEXT }}>{prefs.distance} km</b>
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={prefs.distance}
              onChange={(e) => setPrefs({ ...prefs, distance: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block mb-2" style={{ color: GOLD }}>Âge minimum</label>
              <input
                type="number"
                className={inputClass}
                style={inputStyle}
                value={prefs.ageMin}
                onChange={(e) => setPrefs({ ...prefs, ageMin: Number(e.target.value || 18) })}
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: GOLD }}>Âge maximum</label>
              <input
                type="number"
                className={inputClass}
                style={inputStyle}
                value={prefs.ageMax}
                onChange={(e) => setPrefs({ ...prefs, ageMax: Number(e.target.value || 99) })}
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: GOLD }}>Genre recherché</label>
              <select
                className={inputClass}
                style={inputStyle}
                value={prefs.gender}
                onChange={(e) => setPrefs({ ...prefs, gender: e.target.value })}
              >
                <option>Femme</option>
                <option>Homme</option>
                <option>Tous</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className="w-full rounded-full p-3 font-bold transition hover:brightness-110 mt-2"
          style={{ background: GOLD, color: '#15171B' }}
          onClick={savePrefs}
        >
          Enregistrer
        </button>
      </Section>

      <Section id="support" title="Assistance Feel & Match">
        <p>Besoin d'aide ? Notre équipe est là pour toi !</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="mailto:support@feel-and-match.example?subject=Assistance"
            className="w-full text-center rounded-full p-3 font-bold transition hover:brightness-110"
            style={{ background: GOLD, color: '#15171B' }}
          >
            Contacter l'assistance
          </a>
          <a
            href="/faq"
            className="w-full text-center rounded-full p-3 font-bold transition border"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Consulter la FAQ
          </a>
        </div>
      </Section>

      <Section id="danger" title="Zone Danger">
        <p>Attention : Cette action est définitive. Tu perdras toutes tes données.</p>
        <button
          className="w-full rounded-full p-3 font-bold transition hover:brightness-110"
          style={{ background: '#b91c1c', color: '#fff' }}
          onClick={deleteAccount}
        >
          Supprimer mon compte
        </button>
      </Section>

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
    </div>
  );
}