export const frasesParaMama: string[] = [
  "Eres la razón de mis sonrisas más genuinas.",
  "Contigo aprendí que el amor no tiene límites.",
  "Tu abrazo es el lugar más seguro del mundo.",
  "Gracias por enseñarme a amar con todo el corazón.",
  "Eres mi mayor ejemplo de fortaleza y ternura.",
  "En cada logro mío, hay un pedacito de ti.",
  "Tu voz es la melodía más hermosa de mi vida.",
  "Juntos hemos construido los mejores recuerdos.",
  "Eres la luz que ilumina cada uno de mis días.",
  "Tu amor incondicional es mi mayor tesoro.",
  "Gracias por estar siempre, en las buenas y en las malas.",
  "Eres mi roca, mi refugio, mi hogar.",
  "Con tu guía aprendí lo que verdaderamente importa.",
  "Eres la persona más especial en todo mi universo.",
  "Tu sonrisa es capaz de sanar cualquier herida.",
  "Cada día contigo es un regalo que atesoro.",
  "Gracias por creer en mí cuando yo no podía.",
  "Tu amor me ha dado alas para volar.",
  "Eres y serás siempre mi héroe favorita.",
  "En tus ojos veo todo el amor del mundo.",
  "Gracias por cada sacrificio que hiciste por nosotros.",
  "Tu presencia transforma cualquier lugar en hogar.",
  "Me enseñaste que el amor verdadero es acción.",
  "Eres mi primera maestra y mi mejor amiga.",
  "Tu corazón es el más grande que conozco.",
  "Gracias por todas las noches que velaste por mí.",
  "Tu fuerza me inspira a ser mejor cada día.",
  "Eres la autora de mis mejores historias.",
  "Tu amor es la base sobre la que construí mi vida.",
  "Gracias, mamá, por todo lo que eres y das.",
];

/**
 * Devuelve una frase aleatoria del banco de frases
 */
export function obtenerFraseAleatoria(): string {
  const idx = Math.floor(Math.random() * frasesParaMama.length);
  return frasesParaMama[idx];
}

/**
 * Devuelve N frases únicas aleatorias
 */
export function obtenerFrasesAleatorias(n: number): string[] {
  const shuffled = [...frasesParaMama].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, frasesParaMama.length));
}
