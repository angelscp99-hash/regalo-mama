import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { generarCodigo } from "@/lib/utils";
import { LIMITES, TIPOS_AUDIO, TIPOS_IMAGEN } from "@/lib/validations";

type ArchivoUpload = {
  tipo: "foto" | "cancion";
  index?: number;
  nombre: string;
  contentType: string;
  size: number;
};

const EXTENSIONES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
};

function validarArchivo(archivo: ArchivoUpload): string | null {
  if (archivo.tipo === "foto") {
    if (!TIPOS_IMAGEN.includes(archivo.contentType)) {
      return "Solo se permiten imagenes JPG, PNG o WEBP.";
    }
    if (archivo.size > LIMITES.MAX_PESO_IMAGEN_MB * 1024 * 1024) {
      return `Cada imagen debe pesar maximo ${LIMITES.MAX_PESO_IMAGEN_MB} MB.`;
    }
    return null;
  }

  if (!TIPOS_AUDIO.includes(archivo.contentType) && !archivo.nombre.toLowerCase().endsWith(".mp3")) {
    return "Solo se permiten canciones MP3.";
  }
  if (archivo.size > LIMITES.MAX_PESO_CANCION_MB * 1024 * 1024) {
    return `La cancion debe pesar maximo ${LIMITES.MAX_PESO_CANCION_MB} MB.`;
  }
  return null;
}

async function generarCodigoUnico(supabase: ReturnType<typeof createServiceClient>) {
  let codigo = generarCodigo();
  let intentos = 0;

  while (intentos < 8) {
    const { data } = await supabase
      .from("regalos")
      .select("id")
      .eq("codigo", codigo)
      .maybeSingle();

    if (!data) return codigo;
    codigo = generarCodigo();
    intentos++;
  }

  throw new Error("No se pudo generar un codigo unico.");
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const archivos = (body.archivos || []) as ArchivoUpload[];

    if (!Array.isArray(archivos) || archivos.length === 0) {
      return NextResponse.json({ error: "No hay archivos para subir." }, { status: 400 });
    }

    const fotos = archivos.filter((archivo) => archivo.tipo === "foto");
    if (fotos.length < LIMITES.MIN_FOTOS || fotos.length > LIMITES.MAX_FOTOS) {
      return NextResponse.json(
        { error: `Debes subir entre ${LIMITES.MIN_FOTOS} y ${LIMITES.MAX_FOTOS} fotos.` },
        { status: 400 }
      );
    }

    const errorArchivo = archivos.map(validarArchivo).find(Boolean);
    if (errorArchivo) {
      return NextResponse.json({ error: errorArchivo }, { status: 400 });
    }

    const codigo = await generarCodigoUnico(supabase);

    const uploads = await Promise.all(
      archivos.map(async (archivo) => {
        const bucket = archivo.tipo === "foto" ? "imagenes-regalos" : "canciones-regalos";
        const extension = EXTENSIONES[archivo.contentType] || archivo.nombre.split(".").pop() || "bin";
        const nombreArchivo =
          archivo.tipo === "foto"
            ? `foto_${archivo.index ?? 0}.${extension}`
            : `cancion.${extension}`;
        const path = `${codigo}/${nombreArchivo}`;

        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUploadUrl(path, { upsert: true });

        if (error || !data) {
          throw new Error(error?.message || "No se pudo preparar la subida.");
        }

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

        return {
          tipo: archivo.tipo,
          index: archivo.index,
          bucket,
          path,
          token: data.token,
          publicUrl: urlData.publicUrl,
        };
      })
    );

    return NextResponse.json({ codigo, uploads });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error preparando archivos.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
