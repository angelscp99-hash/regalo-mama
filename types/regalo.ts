export type TipoPresentacion = "romantica" | "cinematica" | "elegante";

export interface Foto {
  id: string;
  regalo_id: string;
  foto_url: string;
  frase: string;
  orden: number;
  created_at: string;
}

export interface Regalo {
  id: string;
  codigo: string;
  nombre_mama: string;
  mensaje_general: string | null;
  cancion_url: string | null;
  tipo_presentacion: TipoPresentacion;
  created_at: string;
  updated_at: string;
  fotos?: Foto[];
}

export interface RegaloConFotos extends Regalo {
  fotos: Foto[];
}

// Para el formulario de creación/edición
export interface FotoFormulario {
  archivo: File | null;
  preview: string;
  frase: string;
  url?: string; // URL existente al editar
  id?: string;  // ID existente al editar
}

export interface FormularioData {
  nombre_mama: string;
  mensaje_general: string;
  tipo_presentacion: TipoPresentacion;
  cancion: File | null;
  fotos: FotoFormulario[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
