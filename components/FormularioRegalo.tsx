"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FotoFormulario, TipoPresentacion } from "@/types/regalo";
import { obtenerFraseAleatoria } from "@/lib/frases";
import { validarFormulario, validarImagen, validarCancion, LIMITES } from "@/lib/validations";
import { fileToBase64 } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import VistaPrevia from "./VistaPrevia";

const TIPOS: { id: TipoPresentacion; nombre: string; emoji: string; desc: string }[] = [
  { id: "romantica", nombre: "Romántica", emoji: "🌸", desc: "Rosa, suave y emotiva" },
  { id: "cinematica", nombre: "Cinemática", emoji: "🎬", desc: "Oscura, dramática y elegante" },
  { id: "elegante", nombre: "Elegante", emoji: "✨", desc: "Marfil, dorado y clásica" },
];

type UploadPreparado = {
  tipo: "foto" | "cancion";
  index?: number;
  bucket: string;
  path: string;
  token: string;
  publicUrl: string;
};

async function leerRespuestaJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || "El servidor devolvio una respuesta invalida.");
  }
}

export default function FormularioRegalo() {
  const router = useRouter();
  const inputFotosRef = useRef<HTMLInputElement>(null);
  const inputCancionRef = useRef<HTMLInputElement>(null);

  const [nombreMama, setNombreMama] = useState("");
  const [mensajeGeneral, setMensajeGeneral] = useState("");
  const [tipo, setTipo] = useState<TipoPresentacion>("romantica");
  const [fotos, setFotos] = useState<FotoFormulario[]>([]);
  const [cancion, setCancion] = useState<File | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // ─── Agregar fotos ────────────────────────────────────────────────────────
  const agregarFotos = async (archivos: FileList) => {
    const nuevasFotos: FotoFormulario[] = [];
    for (const archivo of Array.from(archivos)) {
      if (fotos.length + nuevasFotos.length >= LIMITES.MAX_FOTOS) break;
      const err = validarImagen(archivo);
      if (err) {
        setErrores((prev) => ({ ...prev, fotos: err }));
        continue;
      }
      const preview = await fileToBase64(archivo);
      nuevasFotos.push({
        archivo,
        preview,
        frase: obtenerFraseAleatoria(),
      });
    }
    setFotos((prev) => [...prev, ...nuevasFotos]);
    setErrores((prev) => ({ ...prev, fotos: "" }));
  };

  const eliminarFoto = (idx: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const actualizarFrase = (idx: number, frase: string) => {
    setFotos((prev) => prev.map((f, i) => (i === idx ? { ...f, frase } : f)));
  };

  const generarFraseAleatoria = (idx: number) => {
    actualizarFrase(idx, obtenerFraseAleatoria());
  };

  // ─── Agregar canción ──────────────────────────────────────────────────────
  const agregarCancion = (archivo: File) => {
    const err = validarCancion(archivo);
    if (err) {
      setErrores((prev) => ({ ...prev, cancion: err }));
      return;
    }
    setCancion(archivo);
    setErrores((prev) => ({ ...prev, cancion: "" }));
  };

  // ─── Enviar formulario ────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const erroresValidacion = validarFormulario({ nombre_mama: nombreMama, fotos });
    if (erroresValidacion.length > 0) {
      const mapa: Record<string, string> = {};
      erroresValidacion.forEach((e) => (mapa[e.campo] = e.mensaje));
      setErrores(mapa);
      return;
    }

    setCargando(true);
    try {
      const archivos = [
        ...fotos
          .filter((foto) => foto.archivo)
          .map((foto, idx) => ({
            tipo: "foto" as const,
            index: idx,
            nombre: foto.archivo!.name,
            contentType: foto.archivo!.type,
            size: foto.archivo!.size,
          })),
        ...(cancion
          ? [
              {
                tipo: "cancion" as const,
                nombre: cancion.name,
                contentType: cancion.type,
                size: cancion.size,
              },
            ]
          : []),
      ];

      const prepareRes = await fetch("/api/regalos/upload-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archivos }),
      });
      const prepareData = await leerRespuestaJson(prepareRes);
      if (!prepareRes.ok) throw new Error(prepareData.error || "Error preparando archivos");

      const uploads = prepareData.uploads as UploadPreparado[];

      for (const upload of uploads) {
        const archivo =
          upload.tipo === "foto"
            ? fotos[upload.index ?? 0]?.archivo
            : cancion;

        if (!archivo) continue;

        const { error: uploadError } = await supabase.storage
          .from(upload.bucket)
          .uploadToSignedUrl(upload.path, upload.token, archivo, {
            contentType: archivo.type,
          });

        if (uploadError) {
          throw new Error(
            `Error al subir ${upload.tipo === "foto" ? "foto" : "musica"}: ${uploadError.message}`
          );
        }
      }

      const fotosSubidas = fotos.map((foto, idx) => {
        const upload = uploads.find((item) => item.tipo === "foto" && item.index === idx);
        return {
          foto_url: upload?.publicUrl || foto.url,
          frase: foto.frase,
          orden: idx,
        };
      });

      const cancionSubida = uploads.find((item) => item.tipo === "cancion");

      const res = await fetch("/api/regalos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: prepareData.codigo,
          nombre_mama: nombreMama,
          mensaje_general: mensajeGeneral,
          tipo_presentacion: tipo,
          cancion_url: cancionSubida?.publicUrl || null,
          fotos: fotosSubidas,
        }),
      });
      const data = await leerRespuestaJson(res);

      if (!res.ok) throw new Error(data.error || "Error al crear el regalo");
      router.push(`/regalo/${data.codigo}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-10 animar-entrada">
        <span
          className="text-4xl mb-4 block"
          style={{ animation: "flotar 3s ease-in-out infinite" }}
        >
          💝
        </span>
        <h1
          className="text-4xl text-rosa-900 mb-2"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          Crear regalo para mamá
        </h1>
        <p className="text-rosa-500 text-sm">
          Un recuerdo eterno en minutos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nombre */}
        <div className="tarjeta-elegante p-6 animar-entrada" style={{ animationDelay: "0.1s" }}>
          <label className="block text-sm font-semibold text-rosa-800 mb-3">
            ✦ Nombre de mamá *
          </label>
          <input
            type="text"
            value={nombreMama}
            onChange={(e) => setNombreMama(e.target.value)}
            placeholder="Ej: María, Mamita, Madre..."
            maxLength={LIMITES.MAX_NOMBRE_CHARS}
            className="input-elegante"
          />
          {errores.nombre_mama && (
            <p className="mt-2 text-xs text-red-500">{errores.nombre_mama}</p>
          )}
        </div>

        {/* Tipo de presentación */}
        <div className="tarjeta-elegante p-6 animar-entrada" style={{ animationDelay: "0.15s" }}>
          <label className="block text-sm font-semibold text-rosa-800 mb-4">
            ✦ Estilo de presentación *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTipo(t.id)}
                className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                  tipo === t.id
                    ? "border-rosa-400 bg-rosa-50 shadow-md"
                    : "border-transparent bg-white/50 hover:border-rosa-200"
                }`}
              >
                <span className="text-2xl block mb-1">{t.emoji}</span>
                <span className="text-xs font-semibold text-rosa-800 block">
                  {t.nombre}
                </span>
                <span className="text-xs text-rosa-500 block leading-tight mt-0.5">
                  {t.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mensaje general */}
        <div className="tarjeta-elegante p-6 animar-entrada" style={{ animationDelay: "0.2s" }}>
          <label className="block text-sm font-semibold text-rosa-800 mb-3">
            ✦ Mensaje de apertura (opcional)
          </label>
          <textarea
            value={mensajeGeneral}
            onChange={(e) => setMensajeGeneral(e.target.value)}
            placeholder="Un mensaje que mamá verá antes de ver las fotos..."
            maxLength={LIMITES.MAX_MENSAJE_CHARS}
            rows={3}
            className="input-elegante resize-none"
          />
          <p className="text-right text-xs text-rosa-300 mt-1">
            {mensajeGeneral.length}/{LIMITES.MAX_MENSAJE_CHARS}
          </p>
        </div>

        {/* Fotos */}
        <div className="tarjeta-elegante p-6 animar-entrada" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-rosa-800">
              ✦ Fotos ({fotos.length}/{LIMITES.MAX_FOTOS}) *
            </label>
            {fotos.length < LIMITES.MAX_FOTOS && (
              <button
                type="button"
                onClick={() => inputFotosRef.current?.click()}
                className="text-xs text-rosa-600 hover:text-rosa-800 font-medium border border-rosa-200 rounded-full px-3 py-1 transition-colors"
              >
                + Agregar
              </button>
            )}
          </div>

          <input
            ref={inputFotosRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && agregarFotos(e.target.files)}
          />

          {fotos.length === 0 ? (
            <button
              type="button"
              onClick={() => inputFotosRef.current?.click()}
              className="w-full border-2 border-dashed border-rosa-200 rounded-2xl p-10 text-center hover:border-rosa-400 transition-colors group"
            >
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                📸
              </span>
              <p className="text-sm text-rosa-500">
                Toca para agregar fotos
              </p>
              <p className="text-xs text-rosa-300 mt-1">
                JPG, PNG o WEBP · Máx {LIMITES.MAX_PESO_IMAGEN_MB} MB cada una
              </p>
            </button>
          ) : (
            <div className="space-y-4">
              {fotos.map((foto, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-white/50 rounded-xl">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={foto.preview} alt={`Foto ${idx + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => eliminarFoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>

                  {/* Frase */}
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-rosa-500 mb-1 block">
                      Foto {idx + 1} — Frase
                    </label>
                    <textarea
                      value={foto.frase}
                      onChange={(e) => actualizarFrase(idx, e.target.value)}
                      maxLength={LIMITES.MAX_FRASE_CHARS}
                      rows={2}
                      className="input-elegante text-sm resize-none"
                      placeholder="Escribe una frase especial..."
                    />
                    <button
                      type="button"
                      onClick={() => generarFraseAleatoria(idx)}
                      className="text-xs text-rosa-400 hover:text-rosa-600 mt-1 transition-colors"
                    >
                      ✨ Generar frase automática
                    </button>
                  </div>
                </div>
              ))}

              {fotos.length < LIMITES.MAX_FOTOS && (
                <button
                  type="button"
                  onClick={() => inputFotosRef.current?.click()}
                  className="w-full border-2 border-dashed border-rosa-200 rounded-xl p-4 text-center text-sm text-rosa-400 hover:border-rosa-400 transition-colors"
                >
                  + Agregar más fotos ({LIMITES.MAX_FOTOS - fotos.length} restantes)
                </button>
              )}
            </div>
          )}

          {errores.fotos && (
            <p className="mt-2 text-xs text-red-500">{errores.fotos}</p>
          )}
        </div>

        {/* Canción */}
        <div className="tarjeta-elegante p-6 animar-entrada" style={{ animationDelay: "0.3s" }}>
          <label className="block text-sm font-semibold text-rosa-800 mb-4">
            ✦ Canción de fondo (opcional)
          </label>
          <input
            ref={inputCancionRef}
            type="file"
            accept="audio/mpeg,.mp3"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && agregarCancion(e.target.files[0])}
          />

          {cancion ? (
            <div className="flex items-center gap-3 p-3 bg-rosa-50 rounded-xl">
              <span className="text-2xl">🎵</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-rosa-800 truncate">
                  {cancion.name}
                </p>
                <p className="text-xs text-rosa-400">
                  {(cancion.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCancion(null)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Quitar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputCancionRef.current?.click()}
              className="w-full border-2 border-dashed border-rosa-200 rounded-2xl p-6 text-center hover:border-rosa-400 transition-colors group"
            >
              <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
                🎵
              </span>
              <p className="text-sm text-rosa-500">Toca para subir una canción MP3</p>
              <p className="text-xs text-rosa-300 mt-1">
                Solo MP3 · Máx {LIMITES.MAX_PESO_CANCION_MB} MB
              </p>
            </button>
          )}

          {errores.cancion && (
            <p className="mt-2 text-xs text-red-500">{errores.cancion}</p>
          )}
        </div>

        {/* Vista previa */}
        <div className="animar-entrada" style={{ animationDelay: "0.35s" }}>
          <h3 className="text-sm font-semibold text-rosa-800 mb-3">✦ Vista previa</h3>
          <VistaPrevia
            nombreMama={nombreMama}
            mensajeGeneral={mensajeGeneral}
            fotos={fotos}
            tipo={tipo}
          />
        </div>

        {/* Error global */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Botón enviar */}
        <button
          type="submit"
          disabled={cargando}
          className="btn-primario w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {cargando ? "Creando tu regalo... 💝" : "💝 Generar regalo"}
        </button>
      </form>
    </div>
  );
}
