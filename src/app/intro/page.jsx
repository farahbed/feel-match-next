'use client';
import VideoPage from '@/components/home-components/VideoPage';
import { useRouter } from 'next/navigation';

export default function Intro() {
  const router = useRouter();

  const handleEnterClick = () => {
    localStorage.setItem("hasSeenIntroVideo", "true");
    router.push("/");
  };

  return <VideoPage onEnterClick={handleEnterClick} />;
}
