export const LIMITES = {
  MAX_FOTOS: 10,
  MIN_FOTOS: 1,
  MAX_PESO_IMAGEN_MB: 5,
  MAX_PESO_CANCION_MB: 15,
  MAX_NOMBRE_CHARS: 60,
  MAX_MENSAJE_CHARS: 300,
  MAX_FRASE_CHARS: 150,
};

export const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp"];
export const TIPOS_AUDIO = ["audio/mpeg", "audio/mp3"];

export interface ErrorValidacion {
  campo: string;
  mensaje: string;
}

export function validarImagen(archivo: File): string | null {
  if (!TIPOS_IMAGEN.includes(archivo.type)) {
    return "Solo se permiten imágenes JPG, PNG o WEBP.";
  }
  const maxBytes = LIMITES.MAX_PESO_IMAGEN_MB * 1024 * 1024;
  if (archivo.size > maxBytes) {
    return `La imagen no puede superar ${LIMITES.MAX_PESO_IMAGEN_MB} MB.`;
  }
  return null;
}

export function validarCancion(archivo: File): string | null {
  if (!TIPOS_AUDIO.includes(archivo.type) && !archivo.name.endsWith(".mp3")) {
    return "Solo se permiten archivos MP3.";
  }
  const maxBytes = LIMITES.MAX_PESO_CANCION_MB * 1024 * 1024;
  if (archivo.size > maxBytes) {
    return `La canción no puede superar ${LIMITES.MAX_PESO_CANCION_MB} MB.`;
  }
  return null;
}

export function validarFormulario(data: {
  nombre_mama: string;
  fotos: { archivo: File | null; url?: string }[];
  cancion?: File | null;
}): ErrorValidacion[] {
  const errores: ErrorValidacion[] = [];

  if (!data.nombre_mama.trim()) {
    errores.push({ campo: "nombre_mama", mensaje: "El nombre de mamá es obligatorio." });
  } else if (data.nombre_mama.length > LIMITES.MAX_NOMBRE_CHARS) {
    errores.push({
      campo: "nombre_mama",
      mensaje: `El nombre no puede superar ${LIMITES.MAX_NOMBRE_CHARS} caracteres.`,
    });
  }

  const fotosValidas = data.fotos.filter((f) => f.archivo || f.url);
  if (fotosValidas.length < LIMITES.MIN_FOTOS) {
    errores.push({ campo: "fotos", mensaje: "Debes agregar al menos 1 foto." });
  }
  if (fotosValidas.length > LIMITES.MAX_FOTOS) {
    errores.push({
      campo: "fotos",
      mensaje: `No puedes agregar más de ${LIMITES.MAX_FOTOS} fotos.`,
    });
  }

  data.fotos.forEach((foto, idx) => {
    if (foto.archivo) {
      const error = validarImagen(foto.archivo);
      if (error) {
        errores.push({ campo: `foto_${idx}`, mensaje: `Foto ${idx + 1}: ${error}` });
      }
    }
  });

  if (data.cancion) {
    const error = validarCancion(data.cancion);
    if (error) {
      errores.push({ campo: "cancion", mensaje: error });
    }
  }

  return errores;
}
