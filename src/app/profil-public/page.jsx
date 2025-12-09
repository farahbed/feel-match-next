import { Suspense } from 'react';
import ProfilPublicClient from './ProfilPublicClient';

export default function ProfilPublicPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-[#E7E7EA]">
          <div className="rounded-xl border px-6 py-4 text-sm border-[#262930] text-[#A8AAB2] bg-[#15171B]">
            Chargement…
          </div>
        </div>
      }
    >
      <ProfilPublicClient />
    </Suspense>
  );
}