'use client';
import { useEffect, useState } from 'react';
import BlindDateForm from './BlindDateForm';
import SpeedDatingForm from './SpeedDatingForm';

const GOLD = '#c2a661';

export default function MatchForm() {
  const [formType, setFormType] = useState('blind');

  // mémorise le dernier onglet utilisé
  useEffect(() => {
    const saved = localStorage.getItem('matchFormType');
    if (saved === 'speed' || saved === 'blind') setFormType(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('matchFormType', formType);
  }, [formType]);

  const Tab = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={[
        'px-6 py-3 rounded-full font-semibold transition border',
        active ? 'text-black' : 'text-white hover:text-black',
      ].join(' ')}
      style={{
        background: active ? GOLD : '#2b2d31',
        borderColor: active ? 'transparent' : '#3a3d45',
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen p-8 space-y-10" style={{ background:'#0f1115', color:'#E7E7EA' }}>
      <h1 className="text-3xl font-extrabold text-center">
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage:`linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, #E7E7EA 70%)` }}
        >
          Choisissez votre expérience
        </span>
      </h1>

      <div className="flex justify-center gap-3 mb-2">
        <Tab active={formType==='speed'} onClick={() => setFormType('speed')}>Speed Dating</Tab>
        <Tab active={formType==='blind'} onClick={() => setFormType('blind')}>Blind Date</Tab>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        {formType === 'speed' ? <SpeedDatingForm /> : <BlindDateForm />}
      </div>
    </div>
  );
}