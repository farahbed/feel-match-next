'use client';
import { useEffect, useMemo, useState } from 'react';

const GOLD = '#c2a661';
const SURFACE = '#15171b';
const SURFACE_2 = '#1b1d22';
const BORDER = '#262930';
const TEXT = '#E7E7EA';
const MUTED = '#A8AAB2';

export default function BlindDateForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    genre:'', recherche:'', age:'', taille:'', origine:'', profession:'',
    enfants:'', veutEnfants:'', relationRecente:'', attentes:'',
    animaux:'', animalType:'', famille:'', cuisine:'', logement:'',
    agePartenaire:'', taillePartenaire:'', originePartenaire:'',
    physique:'', valeursPartenaire:'', qualitesRecherchees:'',
    activites:'', rdvIdeal:'', langageAmour:'', valeurs:'',
    lieuVie:'', styleVie:'', peur:''
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('blindDateDraft');
      if (saved) setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem('blindDateDraft', JSON.stringify(formData));
  }, [formData]);

  const inputStyle = 'w-full p-3 rounded-xl bg-black/60 text-white border border-gray-600 focus:border-[#c2a661] placeholder:text-gray-400';
  const sectionStyle = 'grid grid-cols-1 sm:grid-cols-2 gap-6';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (name === 'animaux') {
        const next = { ...prev, animaux:value };
        if (value !== 'oui') next.animalType = '';
        return next;
      }
      if (name === 'enfants' && value !== 'oui') {
        return { ...prev, enfants:value, veutEnfants:'' };
      }
      if (type === 'checkbox') {
        const arr = Array.isArray(prev[name]) ? prev[name] : [];
        return { ...prev, [name]: checked ? [...arr, value] : arr.filter(v => v!==value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const isStepValid = useMemo(() => {
    if (step===1) return !!formData.genre && !!formData.recherche && !!formData.age && !!formData.profession;
    if (step===2) return !!formData.qualitesRecherchees || !!formData.valeursPartenaire || !!formData.physique;
    if (step===3) return !!formData.rdvIdeal || !!formData.langageAmour || !!formData.valeurs;
    return true;
  }, [step, formData]);

  const nextStep = () => {
    if (!isStepValid) return setToast({type:'error', msg:'Complète les champs essentiels avant de continuer.'});
    setStep(s => Math.min(3, s+1));
  };
  const prevStep = () => setStep(s => Math.max(1, s-1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid) return setToast({type:'error', msg:'Complète les champs essentiels avant de valider.'});
    const email = localStorage.getItem('userEmail');
    if (!email) return setToast({type:'error', msg:'Erreur : utilisateur non identifié.'});

    setSubmitting(true);
    try {
      const r = await fetch('https://qq0238b626.execute-api.eu-west-3.amazonaws.com/dev/updatePreferences', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, preferences: formData })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.message || 'Erreur');
      setToast({type:'success', msg:'Préférences enregistrées !'});
      // localStorage.removeItem('blindDateDraft');
    } catch (e2) {
      setToast({type:'error', msg:'Erreur lors de l’enregistrement.'});
    } finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto rounded-3xl border shadow-2xl space-y-6" style={{ background:SURFACE, borderColor:GOLD }}>
      <div className="rounded-2xl p-4 border-b" style={{ background:SURFACE_2, borderColor:BORDER }}>
        <div className="flex items-center justify-between text-sm" style={{ color: TEXT }}>
          <span>Étape {step}/3</span>
          <div className="flex-1 mx-3 h-2 rounded-full overflow-hidden" style={{ background:'#0f1115' }}>
            <div className="h-full" style={{ width:`${(step/3)*100}%`, background:GOLD, transition:'width .3s' }} />
          </div>
          <span className="text-[12px]" style={{ color: MUTED }}>Blind Date</span>
        </div>
      </div>

      <div className="px-6 pb-2">
        {step===1 && (
          <div className={sectionStyle}>
            <h3 className="text-xl font-bold text-[#c2a661] sm:col-span-2">Étape 1 – À propos de toi</h3>
            <select name="genre" value={formData.genre} onChange={handleChange} className={inputStyle}>
              <option value="">Tu es ? *</option><option value="femme">Femme</option><option value="homme">Homme</option>
            </select>
            <select name="recherche" value={formData.recherche} onChange={handleChange} className={inputStyle}>
              <option value="">Que recherches-tu ? *</option><option value="femme">Femmes</option><option value="homme">Hommes</option>
            </select>
            <input name="age" type="number" min="18" max="99" placeholder="Quel âge as-tu ? *" value={formData.age} onChange={handleChange} className={inputStyle}/>
            <input name="taille" placeholder="Quelle est ta taille ? (ex. 1.75 m)" value={formData.taille} onChange={handleChange} className={inputStyle}/>
            <input name="origine" placeholder="Ton origine" value={formData.origine} onChange={handleChange} className={inputStyle}/>
            <input name="profession" placeholder="Profession *" value={formData.profession} onChange={handleChange} className={inputStyle}/>
            <select name="enfants" value={formData.enfants} onChange={handleChange} className={inputStyle}>
              <option value="">As-tu des enfants ?</option><option value="oui">Oui</option><option value="non">Non</option>
            </select>
            <select name="veutEnfants" value={formData.veutEnfants} onChange={handleChange} className={inputStyle} disabled={formData.enfants!== 'oui' && formData.enfants!=='non'}>
              <option value="">{formData.enfants ? 'Souhaites-tu en avoir ?' : 'Choisis d’abord “enfants”'}</option>
              <option value="oui">Oui</option><option value="non">Non</option><option value="peu importe">Peu importe</option>
            </select>
            <input name="relationRecente" placeholder="Date de ta dernière relation sérieuse ?" value={formData.relationRecente} onChange={handleChange} className={inputStyle}/>
            <textarea name="attentes" placeholder="Qu'attends-tu de cette expérience ?" value={formData.attentes} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <select name="animaux" value={formData.animaux} onChange={handleChange} className={inputStyle}>
              <option value="">As-tu des animaux ?</option><option value="oui">Oui</option><option value="non">Non</option>
            </select>
            <input name="animalType" placeholder="Si oui, lequel ?" value={formData.animalType} onChange={handleChange} className={inputStyle} disabled={formData.animaux!=='oui'}/>
            <textarea name="famille" placeholder="Ton rapport à la famille" value={formData.famille} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <select name="cuisine" value={formData.cuisine} onChange={handleChange} className={inputStyle}>
              <option value="">Aimes-tu cuisiner ?</option><option value="oui">Oui</option><option value="non">Non</option>
            </select>
            <select name="logement" value={formData.logement} onChange={handleChange} className={inputStyle}>
              <option value="">Chez toi tu es plutôt...</option>
              <option value="maniaque">Maniaque</option><option value="soigné">Soigné</option><option value="bordélique">Bordélique</option>
            </select>
          </div>
        )}

        {step===2 && (
          <div className={sectionStyle}>
            <h3 className="text-xl font-bold text-[#c2a661] sm:col-span-2">Étape 2 – Partenaire idéal(e)</h3>
            <input name="agePartenaire" placeholder="Âge souhaité du partenaire" value={formData.agePartenaire} onChange={handleChange} className={inputStyle}/>
            <input name="taillePartenaire" placeholder="Taille souhaitée du partenaire" value={formData.taillePartenaire} onChange={handleChange} className={inputStyle}/>
            <input name="originePartenaire" placeholder="Origine souhaitée" value={formData.originePartenaire} onChange={handleChange} className={inputStyle}/>
            <textarea name="physique" placeholder="Décris physiquement ton/ta partenaire" value={formData.physique} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <textarea name="valeursPartenaire" placeholder="Valeurs importantes chez lui/elle" value={formData.valeursPartenaire} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <textarea name="qualitesRecherchees" placeholder="Qualités recherchées" value={formData.qualitesRecherchees} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          </div>
        )}

        {step===3 && (
          <div className={sectionStyle}>
            <h3 className="text-xl font-bold text-[#c2a661] sm:col-span-2">Étape 3 – Vision du couple</h3>
            <textarea name="activites" placeholder="Activités à faire ensemble" value={formData.activites} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <textarea name="rdvIdeal" placeholder="Décris ton 1er rendez-vous idéal" value={formData.rdvIdeal} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <select name="langageAmour" value={formData.langageAmour} onChange={handleChange} className={inputStyle}>
              <option value="">Langage de l'amour</option>
              <option value="paroles">Paroles valorisantes</option>
              <option value="temps">Moments de qualité</option>
              <option value="cadeaux">Cadeaux</option>
              <option value="services">Services rendus</option>
              <option value="contact">Contact physique</option>
            </select>
            <textarea name="valeurs" placeholder="Valeurs et objectifs de vie" value={formData.valeurs} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
            <select name="lieuVie" value={formData.lieuVie} onChange={handleChange} className={inputStyle}>
              <option value="">Lieu de vie idéal</option>
              <option value="ville">Ville</option><option value="campagne">Campagne</option><option value="mer">Bord de mer</option>
            </select>
            <select name="styleVie" value={formData.styleVie} onChange={handleChange} className={inputStyle}>
              <option value="">Style de couple</option>
              <option value="stable">Stable</option><option value="aventureux">Aventureux</option><option value="mixte">Mixte</option>
            </select>
            <textarea name="peur" placeholder="Ta plus grande peur en couple ?" value={formData.peur} onChange={handleChange} className={`${inputStyle} sm:col-span-2`} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 pb-6">
        {step>1 ? (
          <button type="button" onClick={prevStep} className="px-4 py-2 underline" style={{ color: TEXT }}>
            ← Précédent
          </button>
        ) : <span />}

        {step<3 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isStepValid}
            className="ml-auto px-4 py-2 rounded-full font-semibold transition border disabled:opacity-50"
            style={{ background: isStepValid ? GOLD : '#444', color: isStepValid ? '#15171B' : '#ccc', borderColor:'transparent' }}
          >
            Suivant →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting || !isStepValid}
            className="ml-auto px-6 py-3 rounded-full font-bold transition border disabled:opacity-50"
            style={{ background:GOLD, color:'#15171B', borderColor:'transparent' }}
          >
            {submitting ? 'Envoi…' : 'Valider'}
          </button>
        )}
      </div>

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-5 z-50">
          <div className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg" style={{ background: toast.type==='success' ? '#16a34a' : '#b91c1c', color:'#fff' }}>
            {toast.msg}
          </div>
        </div>
      )}
    </form>
  );
}