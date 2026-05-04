"use client";

import { useEffect, useRef, useState } from "react";

interface ReproductorMusicaProps {
  url: string;
  autoplay?: boolean;
  className?: string;
}

export default function ReproductorMusica({
  url,
  autoplay = false,
  className = "",
}: ReproductorMusicaProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => setCargando(false);
    audio.addEventListener("canplay", onCanPlay);
    return () => audio.removeEventListener("canplay", onCanPlay);
  }, []);

  const toggleReproduccion = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (reproduciendo) {
      audio.pause();
      setReproduciendo(false);
    } else {
      try {
        await audio.play();
        setReproduciendo(true);
      } catch (err) {
        console.error("Error al reproducir:", err);
      }
    }
  };

  // Exponer método para iniciar desde afuera (al tocar la pantalla)
  useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setReproduciendo(true))
        .catch(() => {});
    }
  }, [autoplay]);

  return (
    <>
      <audio ref={audioRef} src={url} loop preload="auto" />
      <button
        onClick={toggleReproduccion}
        disabled={cargando}
        className={`flex items-center gap-2 transition-all duration-300 ${className}`}
        aria-label={reproduciendo ? "Pausar música" : "Reproducir música"}
      >
        {cargando ? (
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <span className="text-sm">⏳</span>
          </span>
        ) : (
          <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
            {reproduciendo ? "⏸" : "▶️"}
          </span>
        )}
        <span className="text-xs text-white/80">
          {reproduciendo ? "Música" : "Reproducir"}
        </span>
      </button>
    </>
  );
}
