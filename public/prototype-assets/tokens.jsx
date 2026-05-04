// Shared design tokens, lifted from styles/globals.css + tailwind.config.ts in the repo.
const TOKENS = {
  font: {
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"Lato", system-ui, sans-serif',
    script: '"Great Vibes", cursive',
  },
  rosa: {
    50: "#fff5f7", 100: "#ffe0e8", 200: "#ffb3c6", 300: "#ff80a0",
    400: "#ff4d7a", 500: "#e8325a", 600: "#c4173f", 700: "#9e0f2e",
    800: "#7a0a22", 900: "#560618",
    suave: "#f9dde5", medio: "#e8a0b0", profundo: "#c4627a",
  },
  crema: { 50: "#fdfaf6", 100: "#faf3e8", 200: "#f5e6d0", 300: "#edd4b0", 400: "#e2bc87", 500: "#d4a060", body: "#fdf8f2" },
  dorado: { 300: "#f0d080", 400: "#e8c040", 500: "#c9a84c", 600: "#b08800", claro: "#e8d5a3" },
  texto: { oscuro: "#3a2a2a", medio: "#7a5a5a" },
};

// Sample data used across all prototype screens
// Las 30 frases reales del repo (lib/frases.ts)
const SAMPLE_FRASES = [
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

// Límites reales del repo (lib/validations.ts)
const LIMITES = {
  MAX_FOTOS: 10,
  MIN_FOTOS: 1,
  MAX_PESO_IMAGEN_MB: 5,
  MAX_PESO_CANCION_MB: 15,
  MAX_NOMBRE_CHARS: 60,
  MAX_MENSAJE_CHARS: 300,
  MAX_FRASE_CHARS: 150,
};

const SAMPLE_PHOTOS = [
  { tone: "rose",  label: "mama-cumple-2019.jpg", frase: SAMPLE_FRASES[0] },
  { tone: "blush", label: "mama-cocinando.jpg",    frase: SAMPLE_FRASES[1] },
  { tone: "cream", label: "mama-y-yo-playa.jpg",  frase: SAMPLE_FRASES[2] },
  { tone: "sepia", label: "mama-jardin.jpg",      frase: SAMPLE_FRASES[3] },
  { tone: "rose",  label: "mama-navidad.jpg",     frase: SAMPLE_FRASES[4] },
];

function cardStyle(t) {
  return {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(8px)",
    border: `1px solid ${t.rosa.suave}88`,
    borderRadius: 18,
    boxShadow: `0 12px 40px ${t.rosa.profundo}1a, 0 2px 8px rgba(0,0,0,0.04)`,
  };
}

window.TOKENS = TOKENS;
window.SAMPLE_FRASES = SAMPLE_FRASES;
window.SAMPLE_PHOTOS = SAMPLE_PHOTOS;
window.LIMITES = LIMITES;
window.cardStyle = cardStyle;
