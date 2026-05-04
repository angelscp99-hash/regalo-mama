"use client";

import Image from "next/image";
import { FotoFormulario, TipoPresentacion } from "@/types/regalo";

interface VistaPreviaProps {
  nombreMama: string;
  mensajeGeneral: string;
  fotos: FotoFormulario[];
  tipo: TipoPresentacion;
}

const ESTILOS = {
  romantica: {
    bg: "linear-gradient(135deg, #fde8ee 0%, #f9dde5 100%)",
    titulo: "text-rose-800",
    frase: "text-rose-700 bg-white/70",
    badge: "bg-rose-100 text-rose-600",
    indicador: "#c4627a",
    nombre: "Romántica 🌸",
  },
  cinematica: {
    bg: "linear-gradient(135deg, #0a0a0f 0%, #1a1028 100%)",
    titulo: "text-white",
    frase: "text-white/80",
    badge: "bg-yellow-900/30 text-yellow-400 border border-yellow-400/30",
    indicador: "#eab308",
    nombre: "Cinemática 🎬",
  },
  elegante: {
    bg: "linear-gradient(135deg, #fdf8f2 0%, #f5eedd 100%)",
    titulo: "text-rose-900",
    frase: "text-rose-700",
    badge: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    indicador: "var(--dorado)",
    nombre: "Elegante ✨",
  },
};

export default function VistaPrevia({
  nombreMama,
  mensajeGeneral,
  fotos,
  tipo,
}: VistaPreviaProps) {
  const estilo = ESTILOS[tipo];
  const fotosMostrar = fotos.filter((f) => f.preview).slice(0, 3);

  if (!nombreMama && fotosMostrar.length === 0) {
    return (
      <div className="tarjeta-elegante p-8 text-center text-rosa-400">
        <span className="text-4xl mb-3 block">👀</span>
        <p className="text-sm">
          Completa el formulario para ver la vista previa
        </p>
      </div>
    );
  }

  return (
    <div className="tarjeta-elegante overflow-hidden">
      <div className="px-4 py-3 border-b border-rosa-100/50 flex items-center justify-between">
        <span className="text-sm font-semibold text-rosa-800">Vista previa</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${estilo.badge}`}>
          {estilo.nombre}
        </span>
      </div>

      {/* Mini pantalla del celular */}
      <div className="p-4">
        <div
          className="mx-auto w-48 rounded-2xl overflow-hidden"
          style={{
            background: estilo.bg,
            minHeight: 280,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          {/* Header simulado */}
          <div className="px-4 pt-4 pb-2">
            <p
              className={`text-xs italic text-center ${estilo.titulo}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {nombreMama || "Para mamá"}
            </p>
          </div>

          {/* Foto principal */}
          {fotosMostrar[0] ? (
            <div className="mx-3 aspect-square rounded-xl overflow-hidden relative">
              <Image
                src={fotosMostrar[0].preview}
                alt="preview"
                fill
                className="object-cover"
              />
              {tipo === "cinematica" && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              )}
            </div>
          ) : (
            <div className="mx-3 aspect-square rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-3xl opacity-40">📸</span>
            </div>
          )}

          {/* Frase */}
          <div className="px-3 py-2">
            <p
              className={`text-xs text-center leading-relaxed rounded-lg p-2 ${estilo.frase}`}
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              {fotosMostrar[0]?.frase || "Tu frase aquí..."}
            </p>
          </div>

          {/* Indicadores */}
          {fotosMostrar.length > 0 && (
            <div className="flex justify-center gap-1 pb-4">
              {fotosMostrar.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i === 0 ? estilo.indicador : `${estilo.indicador}40`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {mensajeGeneral && (
          <p className="mt-3 text-xs text-rosa-500 text-center italic px-2">
            "{mensajeGeneral.slice(0, 60)}{mensajeGeneral.length > 60 ? "..." : ""}"
          </p>
        )}
      </div>
    </div>
  );
}
