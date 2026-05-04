"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { RegaloConFotos, TipoPresentacion } from "@/types/regalo";
import { obtenerFraseAleatoria } from "@/lib/frases";
import { fileToBase64 } from "@/lib/utils";
import { validarImagen, validarCancion, LIMITES } from "@/lib/validations";
import LayoutPrincipal from "@/components/LayoutPrincipal";

interface FotoEdicion {
  id?: string;
  preview: string;
  frase: string;
  url?: string;
  archivo?: File;
  eliminar?: boolean;
}

export default function EditarPage({ params }: { params: { codigo: string } }) {
  const router = useRouter();
  const inputFotosRef = useRef<HTMLInputElement>(null);
  const inputCancionRef = useRef<HTMLInputElement>(null);

  const [regalo, setRegalo] = useState<RegaloConFotos | null>(null);
  const [cargandoRegalo, setCargandoRegalo] = useState(true);
  const [nombreMama, setNombreMama] = useState("");
  const [mensajeGeneral, setMensajeGeneral] = useState("");
  const [tipo, setTipo] = useState<TipoPresentacion>("romantica");
  const [fotos, setFotos] = useState<FotoEdicion[]>([]);
  const [nuevaCancion, setNuevaCancion] = useState<File | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase
        .from("regalos")
        .select("*, fotos(*)")
        .eq("codigo", params.codigo)
        .single();

      if (error || !data) {
        setError("Regalo no encontrado.");
        setCargandoRegalo(false);
        return;
      }

      const r = data as RegaloConFotos;
      setRegalo(r);
      setNombreMama(r.nombre_mama);
      setMensajeGeneral(r.mensaje_general || "");
      setTipo(r.tipo_presentacion);
      setFotos(
        r.fotos
          .sort((a, b) => a.orden - b.orden)
          .map((f) => ({
            id: f.id,
            preview: f.foto_url,
            frase: f.frase,
            url: f.foto_url,
          }))
      );
      setCargandoRegalo(false);
    };
    cargar();
  }, [params.codigo]);

  const agregarFotos = async (archivos: FileList) => {
    const nuevasFotos: FotoEdicion[] = [];
    const activas = fotos.filter((f) => !f.eliminar);
    for (const archivo of Array.from(archivos)) {
      if (activas.length + nuevasFotos.length >= LIMITES.MAX_FOTOS) break;
      const err = validarImagen(archivo);
      if (err) { setError(err); continue; }
      const preview = await fileToBase64(archivo);
      nuevasFotos.push({ archivo, preview, frase: obtenerFraseAleatoria() });
    }
    setFotos((prev) => [...prev, ...nuevasFotos]);
  };

  const marcarEliminar = (idx: number) => {
    setFotos((prev) => prev.map((f, i) => i === idx ? { ...f, eliminar: true } : f));
  };

  const actualizarFrase = (idx: number, frase: string) => {
    setFotos((prev) => prev.map((f, i) => i === idx ? { ...f, frase } : f));
  };

  const guardar = async () => {
    if (!regalo) return;
    setGuardando(true);
    setError("");

    try {
      const prefix = regalo.codigo;

      // Subir nueva canción si hay
      let cancionUrl: string | undefined = undefined;
      if (nuevaCancion) {
        const fd = new FormData();
        fd.append("archivo", nuevaCancion);
        fd.append("bucket", "canciones-regalos");
        const ext = nuevaCancion.name.split(".").pop();
        fd.append("path", `${prefix}/cancion.${ext}`);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al subir canción");
        cancionUrl = data.url;
      }

      // Subir fotos nuevas una a una
      const fotosActivas = fotos.filter((f) => !f.eliminar);
      const fotosPayload: { id?: string; url?: string; frase: string; orden: number }[] = [];

      for (let i = 0; i < fotosActivas.length; i++) {
        const foto = fotosActivas[i];
        if (foto.archivo) {
          const fd = new FormData();
          fd.append("archivo", foto.archivo);
          fd.append("bucket", "imagenes-regalos");
          const ext = foto.archivo.name.split(".").pop();
          fd.append("path", `${prefix}/foto_nueva_${Date.now()}_${i}.${ext}`);
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || `Error al subir foto ${i + 1}`);
          fotosPayload.push({ url: data.url, frase: foto.frase, orden: i });
        } else {
          fotosPayload.push({ id: foto.id, frase: foto.frase, orden: i });
        }
      }

      const idsEliminar = fotos.filter((f) => f.eliminar && f.id).map((f) => f.id!);

      const res = await fetch(`/api/regalos/${regalo.codigo}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_mama: nombreMama,
          mensaje_general: mensajeGeneral,
          tipo_presentacion: tipo,
          cancion_url: cancionUrl,
          ids_eliminar: idsEliminar,
          fotos: fotosPayload,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");

      setExito(true);
      setTimeout(() => router.push(`/regalo/${regalo.codigo}`), 2000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoRegalo) {
    return (
      <LayoutPrincipal>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-rosa-400 text-center">
            <span className="text-4xl animar-brillar block mb-3">💝</span>
            <p>Cargando regalo...</p>
          </div>
        </div>
      </LayoutPrincipal>
    );
  }

  if (exito) {
    return (
      <LayoutPrincipal>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center animar-entrada">
            <span className="text-6xl block mb-4">✅</span>
            <h2 className="text-2xl text-rosa-800 font-display italic mb-2">¡Guardado con éxito!</h2>
            <p className="text-rosa-500 text-sm">Redirigiendo al regalo...</p>
          </div>
        </div>
      </LayoutPrincipal>
    );
  }

  const fotosActivas = fotos.filter((f) => !f.eliminar);

  return (
    <LayoutPrincipal>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-rosa-900 italic mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Editar regalo
          </h1>
          <p className="text-rosa-400 text-sm">Para {regalo?.nombre_mama}</p>
        </div>

        <div className="space-y-6">
          {/* Nombre */}
          <div className="tarjeta-elegante p-5">
            <label className="block text-sm font-semibold text-rosa-800 mb-2">Nombre de mamá</label>
            <input type="text" value={nombreMama} onChange={(e) => setNombreMama(e.target.value)}
              className="input-elegante" maxLength={LIMITES.MAX_NOMBRE_CHARS} />
          </div>

          {/* Mensaje */}
          <div className="tarjeta-elegante p-5">
            <label className="block text-sm font-semibold text-rosa-800 mb-2">Mensaje de apertura</label>
            <textarea value={mensajeGeneral} onChange={(e) => setMensajeGeneral(e.target.value)}
              className="input-elegante resize-none" rows={3} maxLength={LIMITES.MAX_MENSAJE_CHARS} />
          </div>

          {/* Tipo */}
          <div className="tarjeta-elegante p-5">
            <label className="block text-sm font-semibold text-rosa-800 mb-3">Estilo</label>
            <div className="flex gap-3">
              {(["romantica", "cinematica", "elegante"] as TipoPresentacion[]).map((t) => (
                <button key={t} type="button" onClick={() => setTipo(t)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border-2 transition-all ${
                    tipo === t ? "border-rosa-400 bg-rosa-50" : "border-transparent bg-white/50"
                  }`}>
                  {t === "romantica" ? "🌸 Romántica" : t === "cinematica" ? "🎬 Cinemática" : "✨ Elegante"}
                </button>
              ))}
            </div>
          </div>

          {/* Fotos */}
          <div className="tarjeta-elegante p-5">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-rosa-800">
                Fotos ({fotosActivas.length}/{LIMITES.MAX_FOTOS})
              </label>
              {fotosActivas.length < LIMITES.MAX_FOTOS && (
                <button type="button" onClick={() => inputFotosRef.current?.click()}
                  className="text-xs border border-rosa-200 rounded-full px-3 py-1 text-rosa-600">
                  + Agregar
                </button>
              )}
            </div>
            <input ref={inputFotosRef} type="file" accept="image/jpeg,image/png,image/webp"
              multiple className="hidden" onChange={(e) => e.target.files && agregarFotos(e.target.files)} />

            <div className="space-y-3">
              {fotos.map((foto, idx) =>
                foto.eliminar ? null : (
                  <div key={idx} className="flex gap-3 p-3 bg-white/50 rounded-xl">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={foto.preview} alt="" fill className="object-cover" />
                      <button onClick={() => marcarEliminar(idx)}
                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                        ×
                      </button>
                    </div>
                    <div className="flex-1">
                      <textarea value={foto.frase} onChange={(e) => actualizarFrase(idx, e.target.value)}
                        className="input-elegante text-sm resize-none" rows={2}
                        maxLength={LIMITES.MAX_FRASE_CHARS} />
                      <button type="button" onClick={() => actualizarFrase(idx, obtenerFraseAleatoria())}
                        className="text-xs text-rosa-400 mt-1">✨ Frase aleatoria</button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Canción */}
          <div className="tarjeta-elegante p-5">
            <label className="block text-sm font-semibold text-rosa-800 mb-3">Cambiar canción</label>
            <input ref={inputCancionRef} type="file" accept="audio/mpeg,.mp3"
              className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { const err = validarCancion(f); if (!err) setNuevaCancion(f); else setError(err); }
              }} />
            {nuevaCancion ? (
              <div className="flex items-center gap-2 p-3 bg-rosa-50 rounded-xl">
                <span>🎵</span>
                <p className="text-sm flex-1 truncate">{nuevaCancion.name}</p>
                <button onClick={() => setNuevaCancion(null)} className="text-xs text-red-400">Quitar</button>
              </div>
            ) : (
              <button onClick={() => inputCancionRef.current?.click()}
                className="w-full border-2 border-dashed border-rosa-200 rounded-xl p-4 text-sm text-rosa-400 hover:border-rosa-400 transition-colors">
                {regalo?.cancion_url ? "🔄 Cambiar canción" : "🎵 Agregar canción"}
              </button>
            )}
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>}

          <button onClick={guardar} disabled={guardando}
            className="btn-primario w-full py-4 disabled:opacity-60">
            {guardando ? "Guardando..." : "💾 Guardar cambios"}
          </button>
        </div>
      </div>
    </LayoutPrincipal>
  );
}
