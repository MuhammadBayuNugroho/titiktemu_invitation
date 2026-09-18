"use client";

import React, { useState, useEffect, useRef } from "react";
import { Disc3, VolumeX } from "lucide-react";
import type { TemplateConfig } from "@/types/invitation";

interface MusicPlayerProps {
  musicUrl?: string;
  config: TemplateConfig;
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({
  musicUrl,
  config,
  autoPlayTrigger = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (musicUrl && autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked by browser policy until manual interaction
          setIsPlaying(false);
        });
    }
  }, [musicUrl, autoPlayTrigger]);

  if (!musicUrl) return null;

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
          className="group flex h-12 w-12 items-center justify-center rounded-full border shadow-xl backdrop-blur-md transition-all active:scale-90 cursor-pointer"
          style={{
            backgroundColor: isPlaying ? config.colors.primary : config.colors.background,
            borderColor: config.colors.primary,
            color: isPlaying ? "#ffffff" : config.colors.primary,
          }}
        >
          {isPlaying ? (
            <Disc3 className="h-6 w-6 animate-spin text-white" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );
}
