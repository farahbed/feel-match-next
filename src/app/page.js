'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SpeedDatingHomePage from '@/components/home-components/SpeedDatingHomePage';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenVideo = localStorage.getItem("hasSeenIntroVideo");
    if (hasSeenVideo !== "true") {
      router.replace("/intro");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return <SpeedDatingHomePage />;
}
