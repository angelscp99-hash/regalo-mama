import { v4 as uuidv4 } from "uuid";

/**
 * Genera un codigo unico de 10 caracteres alfanumerico.
 */
export function generarCodigo(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const uuid = uuidv4().replace(/-/g, "");
  let codigo = "";
  for (let i = 0; i < 10; i++) {
    const idx = parseInt(uuid[i * 3], 16) % chars.length;
    codigo += chars[idx];
  }
  return codigo;
}

/**
 * Obtiene la URL base del sitio.
 */
export function getSiteUrl(siteOrigin?: string): string {
  return (
    siteOrigin ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000"
  );
}

/**
 * Construye la URL completa de un regalo.
 */
export function getRegaloUrl(codigo: string, siteOrigin?: string): string {
  return `${getSiteUrl(siteOrigin)}/regalo/${codigo}`;
}

/**
 * Construye el mensaje de WhatsApp.
 */
export function getMensajeWhatsapp(codigo: string, nombreMama: string, siteOrigin?: string): string {
  const url = getRegaloUrl(codigo, siteOrigin);
  return encodeURIComponent(`Mira este regalo especial para ${nombreMama}:\n${url}`);
}

/**
 * Formatea el tamano de un archivo.
 */
export function formatearTamano(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Convierte File a base64.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
