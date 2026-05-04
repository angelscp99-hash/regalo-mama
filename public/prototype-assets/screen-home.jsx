// Home / landing screen — port of app/page.tsx, designed for mobile (390 wide).
function HomeScreen({ onStart }) {
  const t = window.TOKENS;
  return (
    <div style={{
      minHeight: "100%",
      background: t.crema.body,
      fontFamily: t.font.body,
      color: t.texto.oscuro,
      position: "relative",
      paddingTop: 56, // status bar
    }}>
      {/* Header */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderBottom: `1px solid ${t.rosa.suave}80`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>💝</span>
          <span style={{
            fontFamily: t.font.display, fontSize: 18,
            fontStyle: "italic", color: t.rosa[700],
          }}>Regalo Mamá</span>
        </div>
        <button onClick={onStart} style={{
          fontSize: 12, color: t.rosa.profundo, fontWeight: 500,
          background: "transparent", border: 0, cursor: "pointer",
        }}>Crear regalo →</button>
      </header>

      {/* Decorative floating glyphs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { e: "🌸", top: "8%", left: "6%", size: 36, d: 0 },
          { e: "💐", top: "22%", right: "6%", size: 30, d: 1 },
          { e: "🌺", bottom: "30%", left: "10%", size: 28, d: 2 },
          { e: "💕", bottom: "12%", right: "8%", size: 36, d: 0.5 },
        ].map((g, i) => (
          <span key={i} style={{
            position: "absolute", top: g.top, left: g.left, right: g.right, bottom: g.bottom,
            fontSize: g.size, opacity: 0.12,
            animation: `rm-float 3s ${g.d}s ease-in-out infinite`,
          }}>{g.e}</span>
        ))}
      </div>

      {/* Hero */}
      <section style={{
        position: "relative", padding: "40px 28px 56px",
        textAlign: "center", zIndex: 1,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: t.rosa[50], color: t.rosa.profundo,
          fontSize: 10, fontWeight: 700, letterSpacing: 2,
          padding: "6px 14px", borderRadius: 999,
          border: `1px solid ${t.rosa.suave}`,
          textTransform: "uppercase", marginBottom: 28,
        }}>
          <span>✦</span> Día de la Madre
        </div>

        <h1 style={{
          fontFamily: t.font.display, fontSize: 48, lineHeight: 1.05,
          color: t.rosa[900], fontWeight: 400, margin: 0,
          letterSpacing: -0.5,
        }}>
          Un regalo{" "}
          <em style={{ color: t.rosa.profundo, fontStyle: "italic" }}>que llega</em>
          <br />
          al corazón
        </h1>

        <p style={{
          fontFamily: t.font.script, fontSize: 32, color: t.dorado[500],
          margin: "16px 0 16px",
        }}>
          Para mamá, con todo el amor
        </p>

        <p style={{
          color: t.rosa[700], opacity: 0.8, fontSize: 13.5, lineHeight: 1.6,
          maxWidth: 280, margin: "0 auto 28px",
        }}>
          Crea una presentación personalizada con tus fotos favoritas,
          mensajes especiales y su canción favorita. Compártela en segundos por WhatsApp.
        </p>

        <button onClick={onStart} style={{
          background: `linear-gradient(135deg, ${t.rosa.profundo} 0%, #9e3f58 100%)`,
          color: "white", padding: "14px 30px", borderRadius: 999,
          border: 0, cursor: "pointer", fontWeight: 700, fontSize: 14,
          letterSpacing: 0.5, boxShadow: `0 4px 20px ${t.rosa.profundo}55`,
          fontFamily: t.font.body,
        }}>💝 Crear mi regalo ahora</button>

        <p style={{ marginTop: 12, fontSize: 11, color: t.rosa[400] }}>
          Gratis · Listo en minutos · Sin registro
        </p>
      </section>

      {/* Cómo funciona */}
      <section style={{ padding: "40px 24px", background: "rgba(255,255,255,0.5)" }}>
        <Divider />
        <h2 style={{
          fontFamily: t.font.display, fontSize: 28, color: t.rosa[900],
          textAlign: "center", margin: "20px 0 28px", fontWeight: 400, fontStyle: "italic",
        }}>
          Así de sencillo
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { num: "01", icon: "📸", titulo: "Sube tus fotos", desc: "De 1 a 10 fotos especiales con mamá. Una frase para cada una." },
            { num: "02", icon: "🎵", titulo: "Agrega música", desc: "Su canción favorita en MP3 sonará durante la presentación." },
            { num: "03", icon: "💌", titulo: "Comparte el amor", desc: "Recibe un enlace único. Compártelo por WhatsApp." },
          ].map((paso) => (
            <div key={paso.num} style={{
              ...cardStyle(t),
              padding: 20,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                fontFamily: t.font.display, fontSize: 28, fontStyle: "italic",
                color: t.dorado[500], minWidth: 38, opacity: 0.8,
              }}>{paso.num}</div>
              <div style={{ fontSize: 26 }}>{paso.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: t.font.display, fontSize: 17, color: t.rosa[800],
                  margin: 0, marginBottom: 2, fontStyle: "italic",
                }}>{paso.titulo}</h3>
                <p style={{ fontSize: 12, color: t.rosa[700], opacity: 0.75, margin: 0, lineHeight: 1.45 }}>
                  {paso.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Estilos */}
      <section style={{ padding: "40px 24px" }}>
        <h2 style={{
          fontFamily: t.font.display, fontSize: 28, color: t.rosa[900],
          textAlign: "center", margin: "0 0 6px", fontWeight: 400, fontStyle: "italic",
        }}>Elige tu estilo</h2>
        <p style={{ textAlign: "center", fontSize: 12, color: t.rosa[700], opacity: 0.7, margin: "0 0 24px" }}>
          Tres presentaciones diseñadas con amor
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { tipo: "romantica", nombre: "Romántica", emoji: "🌸", desc: "Tonos rosados, pétalos animados.", colores: ["#f9dde5", "#e8a0b0", "#c4627a"] },
            { tipo: "cinematica", nombre: "Cinemática", emoji: "🎬", desc: "Fondo oscuro, transiciones de película.", colores: ["#1a1a2e", "#16213e", "#e8c040"] },
            { tipo: "elegante", nombre: "Elegante", emoji: "✨", desc: "Marfil clásico, detalles dorados.", colores: ["#fdf8f2", "#e8d5a3", "#c9a84c"] },
          ].map((est) => (
            <div key={est.tipo} style={{
              ...cardStyle(t), padding: 16,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ fontSize: 32 }}>{est.emoji}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: t.font.display, fontSize: 17, color: t.rosa[800],
                  margin: 0, marginBottom: 4, fontStyle: "italic",
                }}>{est.nombre}</h3>
                <p style={{ fontSize: 11.5, color: t.rosa[700], opacity: 0.7, margin: 0, lineHeight: 1.45 }}>
                  {est.desc}
                </p>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {est.colores.map((c, i) => (
                  <div key={i} style={{
                    width: 14, height: 14, borderRadius: 999,
                    background: c, border: "1px solid rgba(255,255,255,0.7)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={onStart} style={{
            background: `linear-gradient(135deg, ${t.rosa.profundo} 0%, #9e3f58 100%)`,
            color: "white", padding: "12px 28px", borderRadius: 999,
            border: 0, cursor: "pointer", fontWeight: 700, fontSize: 13,
            letterSpacing: 0.5, boxShadow: `0 4px 16px ${t.rosa.profundo}40`,
            fontFamily: t.font.body,
          }}>Empezar ahora →</button>
        </div>
      </section>

      <footer style={{
        padding: "24px 16px 36px", textAlign: "center",
        fontSize: 10.5, color: t.rosa[400],
        borderTop: `1px solid ${t.rosa.suave}80`,
      }}>
        Hecho con 💗 para las mamás del mundo
      </footer>
    </div>
  );
}

function Divider() {
  const t = window.TOKENS;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      color: t.dorado[500], fontSize: 14,
    }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${t.dorado[500]}66, transparent)` }} />
      <span>🌸</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${t.dorado[500]}66, transparent)` }} />
    </div>
  );
}

function cardStyle(t) {
  return {
    background: "rgba(253,248,242,0.9)",
    backdropFilter: "blur(12px)",
    border: `1px solid ${t.dorado[500]}33`,
    borderRadius: 18,
    boxShadow: `0 4px 30px ${t.rosa.profundo}14, 0 1px 0 rgba(255,255,255,0.8) inset`,
  };
}

window.HomeScreen = HomeScreen;
window.cardStyle = cardStyle;
