import Link from "next/link";
import LayoutPrincipal from "@/components/LayoutPrincipal";

export default function HomePage() {
  return (
    <LayoutPrincipal>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-5xl opacity-10 animar-flotar">🌸</div>
          <div className="absolute top-1/4 right-8 text-4xl opacity-10 animar-flotar" style={{ animationDelay: "1s" }}>💐</div>
          <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 animar-flotar" style={{ animationDelay: "2s" }}>🌺</div>
          <div className="absolute bottom-10 right-10 text-5xl opacity-10 animar-flotar" style={{ animationDelay: "0.5s" }}>💕</div>
        </div>

        <div className="relative z-10 max-w-lg mx-auto text-center animar-entrada">
          {/* Etiqueta */}
          <div className="inline-flex items-center gap-2 bg-rosa-50 text-rosa-600 text-xs font-semibold px-4 py-2 rounded-full border border-rosa-200 mb-8 uppercase tracking-widest">
            <span>✨</span> Día de la Madre
          </div>

          {/* Título */}
          <h1
            className="text-5xl md:text-7xl text-rosa-900 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Un regalo{" "}
            <em className="text-rosa-600 not-italic">
              que llega
            </em>
            <br />
            al corazón
          </h1>

          {/* Subtítulo script */}
          <p
            className="text-3xl text-dorado-500 mb-6"
            style={{ fontFamily: "var(--font-script)", color: "var(--dorado)" }}
          >
            Para mamá, con todo el amor
          </p>

          {/* Descripción */}
          <p className="text-rosa-700/80 text-base leading-relaxed mb-10 max-w-sm mx-auto">
            Crea una presentación personalizada con tus fotos favoritas,
            mensajes especiales y su canción favorita. Compártela en segundos
            por WhatsApp.
          </p>

          {/* CTA */}
          <Link href="/crear" className="btn-primario inline-block text-base">
            💝 Crear mi regalo ahora
          </Link>

          <p className="mt-4 text-xs text-rosa-400">
            Gratis · Listo en minutos · Sin registro
          </p>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <div className="divisor-floral mb-12">
            <span>🌸</span>
          </div>

          <h2
            className="text-center text-3xl md:text-4xl text-rosa-900 mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Así de sencillo
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                icon: "📸",
                titulo: "Sube tus fotos",
                desc: "Elige de 1 a 10 fotos especiales con mamá y escribe una frase para cada una.",
              },
              {
                num: "02",
                icon: "🎵",
                titulo: "Agrega música",
                desc: "Sube su canción favorita en MP3. Sonará de fondo durante toda la presentación.",
              },
              {
                num: "03",
                icon: "💌",
                titulo: "Comparte el amor",
                desc: "Recibe un enlace único. Compártelo por WhatsApp y deja que la magia haga su trabajo.",
              },
            ].map((paso) => (
              <div key={paso.num} className="text-center tarjeta-elegante p-6">
                <div className="text-xs font-bold text-dorado-500 tracking-widest mb-3 uppercase"
                  style={{ color: "var(--dorado)" }}>
                  {paso.num}
                </div>
                <div className="text-4xl mb-3">{paso.icon}</div>
                <h3
                  className="text-lg text-rosa-800 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {paso.titulo}
                </h3>
                <p className="text-sm text-rosa-600/80 leading-relaxed">
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estilos de presentación */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-center text-3xl md:text-4xl text-rosa-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Elige tu estilo
          </h2>
          <p className="text-center text-rosa-600/80 text-sm mb-12">
            Tres presentaciones diseñadas con amor
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                tipo: "romantica",
                nombre: "Romántica",
                emoji: "🌸",
                desc: "Tonos rosados, pétalos animados y un carrusel suave y emotivo.",
                colores: ["#f9dde5", "#e8a0b0", "#c4627a"],
              },
              {
                tipo: "cinematica",
                nombre: "Cinemática",
                emoji: "🎬",
                desc: "Fondo oscuro, letras grandes y transiciones dramáticas de película.",
                colores: ["#1a1a2e", "#16213e", "#e8c040"],
              },
              {
                tipo: "elegante",
                nombre: "Elegante",
                emoji: "✨",
                desc: "Blanco marfil, tipografía serif clásica y detalles en dorado.",
                colores: ["#fdf8f2", "#e8d5a3", "#c9a84c"],
              },
            ].map((estilo) => (
              <div key={estilo.tipo} className="tarjeta-elegante p-6 text-center">
                {/* Mini preview de colores */}
                <div className="flex justify-center gap-1 mb-4">
                  {estilo.colores.map((c, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-white/60 shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="text-3xl mb-2">{estilo.emoji}</div>
                <h3
                  className="text-lg text-rosa-800 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {estilo.nombre}
                </h3>
                <p className="text-xs text-rosa-600/70 leading-relaxed">
                  {estilo.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/crear" className="btn-primario inline-block">
              Empezar ahora →
            </Link>
          </div>
        </div>
      </section>
    </LayoutPrincipal>
  );
}
