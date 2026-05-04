// Three intro screens (PantallaInicio) — one per tipo
function IntroRomantica({ regalo, onIniciar }) {
  const t = window.TOKENS;
  return (
    <div style={{
      minHeight: "100%", padding: "70px 24px 40px",
      background: `linear-gradient(135deg, #fde8ee 0%, #f9dde5 50%, #fce7f3 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", textAlign: "center", fontFamily: t.font.body,
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {["🌸", "💕", "🌺"].map((e, i) => (
          <span key={i} style={{
            position: "absolute", fontSize: 36, opacity: 0.12,
            top: `${15 + i * 30}%`, right: `${5 + i * 5}%`,
            animation: `rm-float 3s ${i}s ease-in-out infinite`,
          }}>{e}</span>
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 56, marginBottom: 20, animation: "rm-float 3s ease-in-out infinite" }}>💝</div>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: t.rosa[400], marginBottom: 14 }}>
          ✦ Especialmente para ti ✦
        </p>
        <h1 style={{
          fontFamily: t.font.display, fontSize: 44, fontStyle: "italic",
          color: t.rosa[800], margin: 0, lineHeight: 1.05, fontWeight: 400,
        }}>{regalo.nombre}</h1>
        {regalo.mensaje && (
          <p style={{
            fontFamily: t.font.display, fontSize: 16, color: t.rosa[700], opacity: 0.9,
            margin: "18px auto 0", maxWidth: 280, lineHeight: 1.5, fontStyle: "italic",
          }}>{regalo.mensaje}</p>
        )}
        <p style={{ fontFamily: t.font.script, fontSize: 32, color: t.dorado[500], margin: "24px 0 32px" }}>
          Con todo mi amor
        </p>
        <button onClick={onIniciar} style={{
          background: t.rosa[500], color: "white", padding: "14px 36px", borderRadius: 999,
          border: 0, cursor: "pointer", fontSize: 13, fontWeight: 600,
          letterSpacing: 0.5, boxShadow: `0 8px 24px ${t.rosa.profundo}55`,
          display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 20 }}>▶</span>
          <span>Toca para comenzar</span>
        </button>
        <p style={{ marginTop: 14, fontSize: 11, color: t.rosa[400], opacity: 0.8 }}>
          {regalo.fotos.length} fotos · La música comenzará al tocar
        </p>
      </div>
    </div>
  );
}

function IntroCinematica({ regalo, onIniciar }) {
  const t = window.TOKENS;
  return (
    <div style={{
      minHeight: "100%", padding: "70px 24px 40px",
      background: `linear-gradient(135deg, #0a0a0f 0%, #1a1028 50%, #0a0a0f 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", textAlign: "center", fontFamily: t.font.body,
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {["✦", "✧", "✦", "✧"].map((s, i) => (
          <span key={i} style={{
            position: "absolute",
            top: `${20 + i * 20}%`, left: `${10 + i * 25}%`,
            fontSize: 12 + i * 4, color: "rgba(232,200,80,0.25)",
            animation: "rm-pulse 2s ease-in-out infinite",
            animationDelay: `${i * 0.4}s`,
          }}>{s}</span>
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>🎬</div>
        <p style={{
          fontSize: 10.5, letterSpacing: 4, textTransform: "uppercase",
          color: "rgba(232,200,80,0.7)", marginBottom: 16,
        }}>✦ Un mensaje especial ✦</p>
        <h1 style={{
          fontFamily: t.font.display, fontSize: 44, fontStyle: "italic",
          color: "white", margin: 0, lineHeight: 1.05, fontWeight: 400,
          textShadow: "0 2px 16px rgba(232,200,80,0.2)",
        }}>{regalo.nombre}</h1>
        {regalo.mensaje && (
          <p style={{
            fontFamily: t.font.display, fontSize: 15.5, color: "rgba(255,255,255,0.7)",
            margin: "18px auto 0", maxWidth: 280, lineHeight: 1.5, fontStyle: "italic",
          }}>{regalo.mensaje}</p>
        )}
        <p style={{ fontFamily: t.font.script, fontSize: 32, color: "#f0d080", margin: "26px 0 36px" }}>
          Con todo mi amor
        </p>
        <button onClick={onIniciar} style={{
          background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(232,200,80,0.5)", color: "#f0d080",
          padding: "14px 36px", borderRadius: 999,
          cursor: "pointer", fontSize: 13, fontWeight: 500,
          letterSpacing: 0.5, display: "inline-flex", flexDirection: "column",
          alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 20 }}>▶</span>
          <span>Toca para comenzar</span>
        </button>
        <p style={{ marginTop: 14, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          {regalo.fotos.length} fotos · La música comenzará al tocar
        </p>
      </div>
    </div>
  );
}

function IntroElegante({ regalo, onIniciar }) {
  const t = window.TOKENS;
  return (
    <div style={{
      minHeight: "100%", padding: "70px 24px 40px",
      background: `linear-gradient(135deg, #fdf8f2 0%, #f5eedd 50%, #fdf8f2 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", textAlign: "center", fontFamily: t.font.body,
    }}>
      <div style={{
        position: "absolute", inset: 16, borderRadius: 14,
        border: `1px solid ${t.dorado[500]}40`, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 22, borderRadius: 12,
        border: `1px solid ${t.dorado[500]}20`, pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 52, marginBottom: 22 }}>✨</div>
        <p style={{
          fontSize: 10.5, letterSpacing: 4, textTransform: "uppercase",
          color: t.dorado[500], marginBottom: 16,
        }}>✦ Con todo mi amor ✦</p>
        <h1 style={{
          fontFamily: t.font.display, fontSize: 44, fontStyle: "italic",
          color: t.rosa[900], margin: 0, lineHeight: 1.05, fontWeight: 400,
        }}>{regalo.nombre}</h1>
        {regalo.mensaje && (
          <p style={{
            fontFamily: t.font.display, fontSize: 15.5, color: t.rosa[700], opacity: 0.85,
            margin: "18px auto 0", maxWidth: 280, lineHeight: 1.5, fontStyle: "italic",
          }}>{regalo.mensaje}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "26px auto", maxWidth: 200 }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${t.dorado[500]}80)` }} />
          <span style={{ color: t.dorado[500], fontSize: 14 }}>❧</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.dorado[500]}80, transparent)` }} />
        </div>
        <p style={{ fontFamily: t.font.script, fontSize: 30, color: t.dorado[500], margin: "0 0 32px" }}>
          Para siempre tu hijo
        </p>
        <button onClick={onIniciar} style={{
          background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)",
          border: `1px solid ${t.dorado[500]}66`, color: t.dorado[600],
          padding: "14px 36px", borderRadius: 999,
          cursor: "pointer", fontSize: 13, fontWeight: 500,
          letterSpacing: 0.5, display: "inline-flex", flexDirection: "column",
          alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 20 }}>▶</span>
          <span>Toca para comenzar</span>
        </button>
        <p style={{ marginTop: 14, fontSize: 11, color: t.dorado[600], opacity: 0.6 }}>
          {regalo.fotos.length} fotos · La música comenzará al tocar
        </p>
      </div>
    </div>
  );
}

window.IntroRomantica = IntroRomantica;
window.IntroCinematica = IntroCinematica;
window.IntroElegante = IntroElegante;
