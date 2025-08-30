'use client';
import { useState } from 'react';
import BlindDateForm from './BlindDateForm';
import SpeedDatingForm from './SpeedDatingForm';

export default function MatchForm() {
  const [formType, setFormType] = useState('blind');

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#c2a661] mb-8">
        Choisissez votre expérience
      </h1>
  
      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-3 rounded-full font-semibold transition ${
            formType === 'speed' ? 'bg-[#c2a661] text-black' : 'bg-gray-700 text-white hover:bg-[#c2a661] hover:text-black'
          }`}
          onClick={() => setFormType('speed')}
        >
          Speed Dating
        </button>
        <button
          className={`px-6 py-3 rounded-full font-semibold transition ${
            formType === 'blind' ? 'bg-[#c2a661] text-black' : 'bg-gray-700 text-white hover:bg-[#c2a661] hover:text-black'
          }`}
          onClick={() => setFormType('blind')}
        >
          Blind Date
        </button>
      </div>
  
      {formType === 'speed' ? <SpeedDatingForm /> : <BlindDateForm />}
    </div>
  );
}