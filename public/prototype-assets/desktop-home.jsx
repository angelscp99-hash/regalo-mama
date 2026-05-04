// Desktop screens — wide-layout redesigns of every flow step.

function DesktopHome({ onStart }) {
  const t = window.TOKENS;
  return (
    <div style={{ minHeight: "100%", background: t.crema.body, fontFamily: t.font.body, color: t.texto.oscuro }}>
      <DesktopHeader onStart={onStart} />

      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 80px 100px", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[
            { e: "🌸", top: "12%", left: "8%", size: 56, d: 0 },
            { e: "💐", top: "20%", right: "12%", size: 44, d: 1 },
            { e: "🌺", bottom: "20%", left: "14%", size: 48, d: 2 },
            { e: "💕", bottom: "28%", right: "8%", size: 56, d: 0.5 },
          ].map((g, i) => (
            <span key={i} style={{
              position: "absolute", top: g.top, left: g.left, right: g.right, bottom: g.bottom,
              fontSize: g.size, opacity: 0.1,
              animation: `rm-float 3s ${g.d}s ease-in-out infinite`,
            }}>{g.e}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: t.rosa[50], color: t.rosa.profundo,
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              padding: "7px 16px", borderRadius: 999,
              border: `1px solid ${t.rosa.suave}`, textTransform: "uppercase", marginBottom: 28,
            }}>✦ Día de la Madre · 10 de mayo</div>
            <h1 style={{
              fontFamily: t.font.display, fontSize: 64, lineHeight: 0.98,
              color: t.rosa[900], fontWeight: 400, margin: 0, letterSpacing: -1,
            }}>
              Un regalo <em style={{ color: t.rosa.profundo, fontStyle: "italic" }}>que llega</em><br/>al corazón
            </h1>
            <p style={{ fontFamily: t.font.script, fontSize: 44, color: t.dorado[500], margin: "40px 0 18px", lineHeight: 1 }}>
              Para mamá, con todo el amor
            </p>
            <p style={{ color: t.rosa[700], opacity: 0.8, fontSize: 16, lineHeight: 1.6, maxWidth: 460, marginBottom: 32 }}>
              Crea una presentación personalizada con tus fotos favoritas, mensajes especiales y su canción favorita. Compártela en segundos por WhatsApp.
            </p>
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={onStart} style={primaryBtn(t, "lg")}>💝 Crear mi regalo ahora</button>
              <button style={ghostBtn(t)}>Ver ejemplo →</button>
            </div>
            <p style={{ marginTop: 16, fontSize: 12, color: t.rosa[400] }}>
              Gratis · Listo en 5 minutos · Sin registro · 8.420 mamás felices este año
            </p>
          </div>

          {/* Hero preview — phone with romantic slide */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 280, height: 560, borderRadius: 36, overflow: "hidden",
              background: "#000", padding: 8,
              boxShadow: `0 40px 80px ${t.rosa.profundo}33, 0 20px 40px rgba(0,0,0,0.12)`,
              transform: "rotate(-3deg)",
            }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 28, overflow: "hidden", position: "relative" }}>
                <window.SlideRomantica foto={window.SAMPLE_PHOTOS[0]} idx={0} total={5} />
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: -10, right: 20,
              ...window.cardStyle(t), padding: "10px 14px",
              display: "flex", alignItems: "center", gap: 10,
              transform: "rotate(2deg)",
            }}>
              <span style={{ fontSize: 22 }}>🎵</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.rosa[800] }}>Canción de mamá</div>
                <div style={{ fontSize: 10, color: t.rosa[500], fontFamily: "ui-monospace,Menlo,monospace" }}>0:42 / 3:24</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section style={{ padding: "80px 80px", background: "rgba(255,255,255,0.55)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow t={t}>El proceso</Eyebrow>
          <h2 style={{ fontFamily: t.font.display, fontSize: 48, color: t.rosa[900], fontWeight: 400, fontStyle: "italic", margin: "8px 0 56px" }}>
            Así de sencillo
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { num: "01", icon: "📸", titulo: "Sube tus fotos", desc: "Elige de 1 a 10 fotos especiales con mamá. Escribe una frase para cada una o usa nuestro banco de 30 frases." },
              { num: "02", icon: "🎵", titulo: "Agrega música", desc: "Sube su canción favorita en MP3. Sonará de fondo durante toda la presentación, en bucle." },
              { num: "03", icon: "💌", titulo: "Comparte el amor", desc: "Recibe un enlace único. Compártelo por WhatsApp y deja que la magia haga su trabajo." },
            ].map((p) => (
              <div key={p.num} style={{ ...window.cardStyle(t), padding: 32, textAlign: "left" }}>
                <div style={{
                  fontFamily: t.font.display, fontSize: 56, fontStyle: "italic",
                  color: t.dorado[500], opacity: 0.5, lineHeight: 1, marginBottom: 12,
                }}>{p.num}</div>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontFamily: t.font.display, fontSize: 24, color: t.rosa[800], margin: "0 0 8px", fontStyle: "italic" }}>{p.titulo}</h3>
                <p style={{ fontSize: 14, color: t.rosa[700], opacity: 0.78, lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estilos */}
      <section style={{ padding: "80px 80px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow t={t}>Tres estilos</Eyebrow>
            <h2 style={{ fontFamily: t.font.display, fontSize: 48, color: t.rosa[900], fontWeight: 400, fontStyle: "italic", margin: "8px 0 8px" }}>
              Elige tu estilo
            </h2>
            <p style={{ fontSize: 14, color: t.rosa[700], opacity: 0.7, margin: 0 }}>
              Tres presentaciones diseñadas con amor — pensadas para diferentes mamás
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { tipo: "romantica", nombre: "Romántica", emoji: "🌸", desc: "Tonos rosados, pétalos animados y un carrusel suave y emotivo. La favorita de las mamás clásicas." },
              { tipo: "cinematica", nombre: "Cinemática", emoji: "🎬", desc: "Fondo oscuro, letras grandes y transiciones dramáticas de película. Para hacer llorar de emoción." },
              { tipo: "elegante", nombre: "Elegante", emoji: "✨", desc: "Blanco marfil, tipografía serif clásica y detalles en dorado. Atemporal y sofisticada." },
            ].map((est) => (
              <StylePreviewCard key={est.tipo} estilo={est} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={onStart} style={primaryBtn(t, "lg")}>Empezar ahora →</button>
          </div>
        </div>
      </section>

      <DesktopFooter />
    </div>
  );
}

function StylePreviewCard({ estilo }) {
  const t = window.TOKENS;
  const SlideComp = estilo.tipo === "romantica" ? window.SlideRomantica
                  : estilo.tipo === "cinematica" ? window.SlideCinematica
                  : window.SlideElegante;
  return (
    <div style={{ ...window.cardStyle(t), padding: 0, overflow: "hidden" }}>
      <div style={{ position: "relative", width: "100%", height: 360, overflow: "hidden" }}>
        <SlideComp foto={window.SAMPLE_PHOTOS[1]} idx={1} total={5} />
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>{estilo.emoji}</span>
          <h3 style={{ fontFamily: t.font.display, fontSize: 24, color: t.rosa[800], margin: 0, fontStyle: "italic" }}>{estilo.nombre}</h3>
        </div>
        <p style={{ fontSize: 13, color: t.rosa[700], opacity: 0.78, lineHeight: 1.55, margin: 0 }}>{estilo.desc}</p>
      </div>
    </div>
  );
}

function DesktopHeader({ onStart }) {
  const t = window.TOKENS;
  return (
    <header style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px 80px", borderBottom: `1px solid ${t.rosa.suave}80`,
      background: "rgba(253,248,242,0.85)", backdropFilter: "blur(16px)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 26 }}>💝</span>
        <span style={{ fontFamily: t.font.display, fontSize: 22, fontStyle: "italic", color: t.rosa[700] }}>Regalo Mamá</span>
      </div>
      <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <a style={navLink(t)}>Cómo funciona</a>
        <a style={navLink(t)}>Estilos</a>
        <a style={navLink(t)}>Ejemplos</a>
        <a style={navLink(t)}>Frases</a>
        <button onClick={onStart} style={primaryBtn(t, "sm")}>Crear regalo →</button>
      </nav>
    </header>
  );
}

function DesktopFooter() {
  const t = window.TOKENS;
  return (
    <footer style={{ padding: "40px 80px", borderTop: `1px solid ${t.rosa.suave}80`, background: "rgba(255,255,255,0.4)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>💝</span>
            <span style={{ fontFamily: t.font.display, fontSize: 20, fontStyle: "italic", color: t.rosa[700] }}>Regalo Mamá</span>
          </div>
          <p style={{ fontSize: 12.5, color: t.rosa[700], opacity: 0.7, margin: 0, maxWidth: 320, lineHeight: 1.6 }}>
            Hecho con 💗 para las mamás del mundo. Un proyecto independiente, sin anuncios, sin vender datos.
          </p>
        </div>
        {[
          { h: "Producto", l: ["Crear regalo", "Estilos", "Ejemplos"] },
          { h: "Recursos", l: ["Banco de frases", "Cómo grabar audio", "Preguntas frecuentes"] },
          { h: "Legal", l: ["Privacidad", "Términos", "Contacto"] },
        ].map((c) => (
          <div key={c.h}>
            <h4 style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: t.dorado[500], margin: "0 0 12px", fontWeight: 700 }}>{c.h}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {c.l.map((x) => (
                <li key={x} style={{ fontSize: 13, color: t.rosa[700], opacity: 0.85, cursor: "pointer" }}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

function Eyebrow({ children, t }) {
  return <span style={{
    fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
    color: t.dorado[500], fontWeight: 700,
  }}>{children}</span>;
}

function primaryBtn(t, size = "md") {
  const sizes = { sm: { padding: "9px 18px", fontSize: 13 }, md: { padding: "12px 26px", fontSize: 14 }, lg: { padding: "16px 34px", fontSize: 15 } };
  return {
    background: `linear-gradient(135deg, ${t.rosa.profundo} 0%, #9e3f58 100%)`,
    color: "white", borderRadius: 999, border: 0, cursor: "pointer",
    fontWeight: 700, letterSpacing: 0.5, fontFamily: t.font.body,
    boxShadow: `0 6px 20px ${t.rosa.profundo}55`,
    ...sizes[size],
  };
}
function ghostBtn(t) {
  return {
    background: "transparent", color: t.rosa[800], border: `1.5px solid ${t.dorado[500]}66`,
    borderRadius: 999, padding: "16px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer",
    fontFamily: t.font.body,
  };
}
function navLink(t) {
  return { fontSize: 13.5, color: t.rosa[700], cursor: "pointer", textDecoration: "none" };
}

window.DesktopHome = DesktopHome;
window.DesktopHeader = DesktopHeader;
window.DesktopFooter = DesktopFooter;
window.primaryBtn = primaryBtn;
window.ghostBtn = ghostBtn;
window.navLink = navLink;
window.Eyebrow = Eyebrow;
