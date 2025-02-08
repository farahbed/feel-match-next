"use client";

import React from "react";
import { useRouter } from "next/navigation";

const VideoPage = () => {
    const router = useRouter();

    // Redirection automatique après la vidéo
    const handleVideoEnd = () => {
        router.push("/speed-dating-home");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                playsInline 
                onEnded={handleVideoEnd} // Redirige après la vidéo
            >
                <source src="/LoaderVideo.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>
        </div>
    );
};

export default VideoPage;
