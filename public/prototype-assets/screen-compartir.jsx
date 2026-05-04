// Compartir / share-success screen — what user sees after generating
function CompartirScreen({ regalo, onView, onEdit, onNew }) {
  const t = window.TOKENS;
  const codigo = "k9x2m4p7q1";
  const url = `regalomama.app/r/${codigo}`;
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100%", background: t.crema.body, fontFamily: t.font.body,
      paddingTop: 56, position: "relative",
    }}>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderBottom: `1px solid ${t.rosa.suave}80`,
      }}>
        <button onClick={onNew} style={{
          background: "transparent", border: 0, cursor: "pointer", fontSize: 13,
          color: t.rosa.profundo,
        }}>← Inicio</button>
        <span style={{ fontFamily: t.font.display, fontSize: 16, fontStyle: "italic", color: t.rosa[700] }}>Regalo Mamá</span>
        <span style={{ width: 50 }} />
      </header>

      <div style={{ padding: "32px 24px 60px", textAlign: "center" }}>
        {/* Confetti / celebration */}
        <div aria-hidden style={{ position: "relative", height: 60, marginBottom: 8 }}>
          {["🌸", "✨", "💝", "🌺", "💕"].map((e, i) => (
            <span key={i} style={{
              position: "absolute", fontSize: 24,
              left: `${10 + i * 18}%`, top: `${i % 2 === 0 ? 0 : 20}%`,
              animation: `rm-float ${2 + (i % 3) * 0.5}s ${i * 0.2}s ease-in-out infinite`,
            }}>{e}</span>
          ))}
        </div>

        <h1 style={{
          fontFamily: t.font.display, fontSize: 30, color: t.rosa[900],
          margin: "0 0 8px", fontStyle: "italic", fontWeight: 400,
        }}>¡Tu regalo está listo!</h1>
        <p style={{ fontFamily: t.font.script, fontSize: 26, color: t.dorado[500], margin: "0 0 8px" }}>
          Hecho con amor para {regalo.nombre}
        </p>
        <p style={{ fontSize: 12.5, color: t.rosa[700], opacity: 0.75, margin: 0, lineHeight: 1.5 }}>
          {regalo.fotos.length} {regalo.fotos.length === 1 ? "foto" : "fotos"} ·{" "}
          Estilo {regalo.tipo}{regalo.cancion ? " · con música" : ""}
        </p>

        {/* Mini preview */}
        <div onClick={onView} style={{
          margin: "28px auto 0", width: 200, cursor: "pointer",
          ...window.cardStyle(t), padding: 16, position: "relative",
        }}>
          <MiniPreview regalo={regalo} />
          <div style={{
            marginTop: 10, fontSize: 11, color: t.rosa.profundo, fontWeight: 600,
          }}>Toca para ver la presentación →</div>
        </div>

        {/* Link */}
        <div style={{ ...window.cardStyle(t), padding: 16, marginTop: 24, textAlign: "left" }}>
          <div style={{
            fontSize: 10.5, fontWeight: 700, color: t.rosa[600],
            letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8,
          }}>✦ Tu enlace único</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 12px", background: "white", borderRadius: 10,
            border: `1px solid ${t.dorado[500]}33`,
          }}>
            <span style={{
              flex: 1, fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 11.5, color: t.texto.medio,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{url}</span>
            <button onClick={copy} style={{
              background: copied ? "#22c55e" : t.rosa[50],
              color: copied ? "white" : t.rosa.profundo,
              border: 0, borderRadius: 8, fontSize: 11, fontWeight: 600,
              padding: "6px 12px", cursor: "pointer",
              transition: "all 0.2s",
            }}>{copied ? "✓ Copiado" : "Copiar"}</button>
          </div>
        </div>

        {/* CTA WhatsApp */}
        <button style={{
          width: "100%", marginTop: 20, padding: "14px 24px",
          background: "#22c55e", color: "white", border: 0, borderRadius: 999,
          fontWeight: 700, fontSize: 14, cursor: "pointer",
          boxShadow: "0 8px 24px rgba(34,197,94,0.4)",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontFamily: t.font.body,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Compartir por WhatsApp
        </button>

        {/* Secondary actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={onView} style={secondaryBtn(t)}>👁 Ver de nuevo</button>
          <button onClick={onEdit} style={secondaryBtn(t)}>✎ Editar</button>
        </div>

        <p style={{ marginTop: 28, fontSize: 11, color: t.rosa[400], lineHeight: 1.5 }}>
          Guarda este enlace. Mamá podrá verlo cuando quiera, las veces que quiera.
        </p>
      </div>
    </div>
  );
}

function secondaryBtn(t) {
  return {
    flex: 1, padding: "11px 16px",
    background: "rgba(255,255,255,0.7)",
    color: t.rosa[800], border: `1px solid ${t.dorado[500]}33`,
    borderRadius: 999, fontWeight: 500, fontSize: 12.5, cursor: "pointer",
    fontFamily: t.font.body,
  };
}

function MiniPreview({ regalo }) {
  const t = window.TOKENS;
  const isCine = regalo.tipo === "cinematica";
  const isEleg = regalo.tipo === "elegante";
  const bg = isCine
    ? "linear-gradient(135deg, #0a0a0f, #1a1028)"
    : isEleg
    ? "linear-gradient(135deg, #fdf8f2, #f5eedd)"
    : "linear-gradient(135deg, #fde8ee, #f9dde5)";
  const f = regalo.fotos[0];
  return (
    <div style={{
      width: "100%", aspectRatio: "9/16", borderRadius: 12, overflow: "hidden",
      background: bg, padding: 8,
      display: "flex", flexDirection: "column", gap: 4,
      boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    }}>
      <div style={{
        fontSize: 9, textAlign: "center", fontFamily: t.font.display,
        fontStyle: "italic", color: isCine ? "white" : isEleg ? t.rosa[800] : t.rosa[800],
      }}>Para {regalo.nombre}</div>
      <div style={{ flex: 1, borderRadius: 8, overflow: "hidden", position: "relative" }}>
        {f && <window.PhotoPlaceholder tone={isCine ? "night" : isEleg ? "sepia" : f.tone} label="" rounded={6} />}
      </div>
      <div style={{
        fontSize: 7, textAlign: "center", fontStyle: "italic",
        fontFamily: t.font.display,
        color: isCine ? "rgba(255,255,255,0.85)" : isEleg ? t.rosa[700] : t.rosa[700],
        background: isCine ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)",
        padding: "3px 6px", borderRadius: 4,
      }}>"{(f?.frase || "").slice(0, 40)}..."</div>
    </div>
  );
}

window.CompartirScreen = CompartirScreen;
window.MiniPreview = MiniPreview;
