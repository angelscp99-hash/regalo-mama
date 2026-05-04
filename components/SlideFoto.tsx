"use client";

import Image from "next/image";
import { TipoPresentacion } from "@/types/regalo";

interface SlideFotoProps {
  fotoUrl: string;
  frase: string;
  orden: number;
  total: number;
  tipo: TipoPresentacion;
  visible: boolean;
}

export default function SlideFoto({
  fotoUrl,
  frase,
  orden,
  total,
  tipo,
  visible,
}: SlideFotoProps) {
  if (tipo === "romantica") return <SlideRomantica fotoUrl={fotoUrl} frase={frase} orden={orden} total={total} visible={visible} />;
  if (tipo === "cinematica") return <SlideCinematica fotoUrl={fotoUrl} frase={frase} orden={orden} total={total} visible={visible} />;
  return <SlideElegante fotoUrl={fotoUrl} frase={frase} orden={orden} total={total} visible={visible} />;
}

// ─── ROMÁNTICA ──────────────────────────────────────────────────────────────
function SlideRomantica({ fotoUrl, frase, orden, total, visible }: Omit<SlideFotoProps, "tipo">) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Fondo degradado rosa */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200" />

      {/* Pétalos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {["🌸", "🌺", "💮", "🌸", "💕"].map((petal, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${10 + i * 18}%`,
              left: `${5 + i * 20}%`,
              animation: `flotar ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {petal}
          </span>
        ))}
      </div>

      {/* Foto con marco */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-16 gap-6">
        <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
          <Image src={fotoUrl} alt={frase} fill className="object-cover" />
          {/* Overlay degradado suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-transparent" />
        </div>

        {/* Frase */}
        <div className="text-center max-w-sm">
          <p
            className="text-xl text-rose-800 leading-relaxed px-4 py-3 bg-white/70 backdrop-blur-sm rounded-2xl"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            "{frase}"
          </p>
        </div>

        {/* Indicador */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: i === orden ? "#c4627a" : "rgba(196,98,122,0.3)",
                transform: i === orden ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CINEMÁTICA ──────────────────────────────────────────────────────────────
function SlideCinematica({ fotoUrl, frase, orden, total, visible }: Omit<SlideFotoProps, "tipo">) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-1500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Foto a pantalla completa */}
      <div className="absolute inset-0">
        <Image src={fotoUrl} alt={frase} fill className="object-cover" />
      </div>

      {/* Overlay cinematográfico oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

      {/* Barras cinemáticas */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/80" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/80" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-28">
        {/* Número de foto */}
        <div className="text-yellow-400/60 text-xs tracking-[0.4em] uppercase mb-4 font-mono">
          {String(orden + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        {/* Frase grande */}
        <p
          className="text-white text-2xl md:text-3xl text-center leading-tight mb-6"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          {frase}
        </p>

        {/* Línea dorada decorativa */}
        <div className="w-16 h-0.5 bg-yellow-400 opacity-60" />
      </div>

      {/* Indicador lateral */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="transition-all duration-500"
            style={{
              width: 2,
              height: i === orden ? 24 : 8,
              background: i === orden ? "#eab308" : "rgba(234,179,8,0.3)",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── ELEGANTE ──────────────────────────────────────────────────────────────
function SlideElegante({ fotoUrl, frase, orden, total, visible }: Omit<SlideFotoProps, "tipo">) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Fondo crema con textura */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #fdf8f2 0%, #f5eedd 50%, #fdf8f2 100%)",
        }}
      />

      {/* Marco decorativo dorado */}
      <div
        className="absolute inset-4 rounded-xl pointer-events-none"
        style={{
          border: "1px solid rgba(201,168,76,0.4)",
          boxShadow: "inset 0 0 0 4px rgba(201,168,76,0.1)",
        }}
      />

      {/* Ornamentos de esquina */}
      {["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} text-yellow-600/30 text-xl`}
          style={{ color: "var(--dorado)" }}
        >
          ✦
        </div>
      ))}

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 py-20 gap-6">
        {/* Ornamento superior */}
        <div className="text-sm tracking-[0.5em] uppercase text-yellow-700/60"
          style={{ fontFamily: "var(--font-body)", color: "var(--dorado)" }}>
          ✦ {orden + 1} de {total} ✦
        </div>

        {/* Foto con marco doble */}
        <div
          className="relative w-full max-w-xs aspect-square overflow-hidden"
          style={{
            borderRadius: "4px",
            boxShadow: "0 0 0 6px #fdf8f2, 0 0 0 7px rgba(201,168,76,0.4), 0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <Image src={fotoUrl} alt={frase} fill className="object-cover" />
        </div>

        {/* Divisor dorado */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-600/40" style={{ background: "linear-gradient(to right, transparent, var(--dorado-claro))" }} />
          <span className="text-yellow-600/60" style={{ color: "var(--dorado)" }}>❧</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-600/40" style={{ background: "linear-gradient(to left, transparent, var(--dorado-claro))" }} />
        </div>

        {/* Frase con tipografía serif */}
        <p
          className="text-center text-lg leading-relaxed max-w-xs"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--texto-medio)",
            fontStyle: "italic",
          }}
        >
          "{frase}"
        </p>

        {/* Puntos indicadores */}
        <div className="flex gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                width: i === orden ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === orden ? "var(--dorado)" : "rgba(201,168,76,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
