// Three slide variants — port of components/SlideFoto.tsx
function SlideRomantica({ foto, idx, total }) {
  const t = window.TOKENS;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(135deg, #fde8ee 0%, #f9dde5 50%, #fce7f3 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "clamp(56px, 8vh, 96px) clamp(20px, 5vw, 72px) clamp(92px, 12vh, 132px)",
      gap: "clamp(16px, 3vh, 28px)", fontFamily: t.font.body,
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {["🌸", "🌺", "💮", "🌸", "💕"].map((p, i) => (
          <span key={i} style={{
            position: "absolute", fontSize: 22, opacity: 0.2,
            top: `${10 + i * 18}%`, left: `${5 + i * 20}%`,
            animation: `rm-float ${3 + i}s ${i * 0.7}s ease-in-out infinite`,
          }}>{p}</span>
        ))}
      </div>
      <div style={{
        position: "relative", width: "min(76vw, 520px)", maxHeight: "58vh", aspectRatio: "3/4",
        borderRadius: 24, overflow: "hidden",
        boxShadow: "0 12px 40px rgba(196,98,122,0.3)",
        border: "4px solid rgba(255,255,255,0.85)",
      }}>
        <window.PhotoPlaceholder tone={foto.tone} label={foto.label} src={foto.src} rounded={20} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(154,39,79,0.3), transparent)",
        }} />
      </div>
      <div style={{
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)",
        borderRadius: 18, padding: "clamp(12px, 2vw, 20px) clamp(18px, 3vw, 28px)", maxWidth: "min(82vw, 720px)",
      }}>
        <p style={{
          fontFamily: t.font.display, fontSize: "clamp(18px, 3vw, 34px)", color: t.rosa[800],
          fontStyle: "italic", textAlign: "center", margin: 0, lineHeight: 1.4,
        }}>"{foto.frase}"</p>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: 999,
            background: i === idx ? t.rosa.profundo : `${t.rosa.profundo}40`,
            transform: i === idx ? "scale(1.4)" : "scale(1)",
            transition: "all 0.5s",
          }} />
        ))}
      </div>
    </div>
  );
}

function SlideCinematica({ foto, idx, total }) {
  const t = window.TOKENS;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", fontFamily: t.font.body }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <window.PhotoPlaceholder tone="night" label={foto.label} src={foto.src} rounded={0} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65))",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 50, background: "rgba(0,0,0,0.8)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "rgba(0,0,0,0.8)" }} />

      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
        padding: "0 clamp(24px, 7vw, 110px) clamp(110px, 15vh, 170px)",
      }}>
        <div style={{
          color: "rgba(232,200,80,0.7)", fontSize: 10.5,
          letterSpacing: 5, textTransform: "uppercase",
          fontFamily: "ui-monospace, Menlo, monospace", marginBottom: 14,
        }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <p style={{
          color: "white", fontFamily: t.font.display, fontSize: "clamp(28px, 5vw, 64px)",
          fontStyle: "italic", textAlign: "center", margin: 0, lineHeight: 1.2,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)", marginBottom: 18,
        }}>{foto.frase}</p>
        <div style={{ width: 64, height: 2, background: "#e8c040", opacity: 0.7 }} />
      </div>

      <div style={{
        position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: 2, height: i === idx ? 22 : 8,
            background: i === idx ? "#e8c040" : "rgba(232,200,80,0.3)",
            borderRadius: 2, transition: "all 0.5s",
          }} />
        ))}
      </div>
    </div>
  );
}

function SlideElegante({ foto, idx, total }) {
  const t = window.TOKENS;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(135deg, #fdf8f2 0%, #f5eedd 50%, #fdf8f2 100%)`,
      fontFamily: t.font.body,
    }}>
      <div style={{
        position: "absolute", inset: 14, borderRadius: 10,
        border: `1px solid ${t.dorado[500]}66`, pointerEvents: "none",
        boxShadow: `inset 0 0 0 4px ${t.dorado[500]}1a`,
      }} />
      {[
        { top: 18, left: 18 }, { top: 18, right: 18 },
        { bottom: 18, left: 18 }, { bottom: 18, right: 18 },
      ].map((pos, i) => (
        <div key={i} style={{ position: "absolute", ...pos, color: t.dorado[500], opacity: 0.5, fontSize: 18 }}>✦</div>
      ))}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(58px, 8vh, 94px) clamp(26px, 6vw, 90px) clamp(90px, 12vh, 128px)",
        gap: "clamp(14px, 2.4vh, 26px)",
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 6, textTransform: "uppercase",
          color: t.dorado[500], opacity: 0.9, fontFamily: t.font.body,
        }}>
          ✦ {idx + 1} de {total} ✦
        </div>
        <div style={{
          position: "relative", width: "min(68vw, 440px)", maxHeight: "48vh", aspectRatio: "1/1",
          overflow: "hidden", borderRadius: 4,
          boxShadow: `0 0 0 6px #fdf8f2, 0 0 0 7px ${t.dorado[500]}66, 0 8px 32px rgba(0,0,0,0.12)`,
        }}>
          <window.PhotoPlaceholder tone="sepia" label={foto.label} src={foto.src} rounded={2} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", maxWidth: "min(68vw, 440px)" }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${t.dorado.claro})` }} />
          <span style={{ color: t.dorado[500] }}>❧</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${t.dorado.claro})` }} />
        </div>
        <p style={{
          fontFamily: t.font.display, fontSize: "clamp(18px, 2.5vw, 32px)", color: t.texto.medio,
          fontStyle: "italic", textAlign: "center", margin: 0,
          maxWidth: "min(76vw, 620px)", lineHeight: 1.45,
        }}>"{foto.frase}"</p>
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === idx ? 18 : 5, height: 5, borderRadius: 3,
              background: i === idx ? t.dorado[500] : `${t.dorado[500]}40`,
              transition: "all 0.7s",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

window.SlideRomantica = SlideRomantica;
window.SlideCinematica = SlideCinematica;
window.SlideElegante = SlideElegante;
