// Desktop Compartir page — celebratory, link share, preview embed.

function DesktopCompartir({ regalo, onView, onEdit, onNew }) {
  const t = window.TOKENS;
  const [copied, setCopied] = React.useState(false);
  const shortCode = (regalo.codigo || "a3f7b29c-8d12-4e67-9b4a-2c5e8d1f6a3b").slice(0, 8);
  const url = "regalomama.app/regalo/" + shortCode;

  const copy = () => {
    navigator.clipboard?.writeText("https://" + url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100%", background: t.crema.body, fontFamily: t.font.body, color: t.texto.oscuro }}>
      <window.DesktopHeader onStart={onNew} />

      {/* Confetti / celebration */}
      <section style={{ padding: "60px 80px 40px", textAlign: "center", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {Array.from({ length: 20 }).map((_, i) => {
            const e = ["💝", "🌸", "✨", "💕", "🌺"][i % 5];
            return (
              <span key={i} style={{
                position: "absolute",
                top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                fontSize: 16 + Math.random() * 16, opacity: 0.18,
                animation: `rm-float ${2 + Math.random() * 2}s ${Math.random()}s ease-in-out infinite`,
              }}>{e}</span>
            );
          })}
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "white", color: t.rosa.profundo,
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            padding: "7px 16px", borderRadius: 999,
            border: `1px solid ${t.rosa.suave}`, textTransform: "uppercase", marginBottom: 18,
          }}>✓ Regalo listo</div>
          <h1 style={{
            fontFamily: t.font.display, fontSize: 64, lineHeight: 1.05,
            color: t.rosa[900], fontWeight: 400, margin: 0, letterSpacing: -0.5,
          }}>
            <em style={{ fontStyle: "italic" }}>¡Listo!</em> Tu regalo para {regalo.nombre}
          </h1>
          <p style={{ fontFamily: t.font.script, fontSize: 36, color: t.dorado[500], margin: "8px 0 0" }}>
            está esperando ser compartido
          </p>
        </div>
      </section>

      {/* Two columns: share + preview */}
      <section style={{ padding: "0 80px 80px", maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32, alignItems: "start" }}>
        {/* LEFT — Share */}
        <div style={{ ...window.cardStyle(t), padding: 32 }}>
          <window.Eyebrow t={t}>Comparte el enlace</window.Eyebrow>
          <h2 style={{ fontFamily: t.font.display, fontSize: 32, color: t.rosa[900], margin: "6px 0 18px", fontStyle: "italic", fontWeight: 500 }}>
            Tu enlace único
          </h2>

          {/* URL bar */}
          <div style={{
            display: "flex", alignItems: "center",
            background: `${t.crema[100]}`, borderRadius: 12,
            border: `1px solid ${t.rosa.suave}`,
            padding: 4, marginBottom: 16,
          }}>
            <div style={{
              flex: 1, padding: "12px 14px",
              fontFamily: "ui-monospace,Menlo,monospace",
              fontSize: 13.5, color: t.rosa[800],
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              <span style={{ color: t.rosa[400] }}>https://</span>{url}
            </div>
            <button onClick={copy} style={{
              ...window.primaryBtn(t, "sm"),
              padding: "10px 18px", fontSize: 12.5,
            }}>
              {copied ? "✓ Copiado" : "📋 Copiar"}
            </button>
          </div>

          {/* Channels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            <ShareBtn icon="💬" label="WhatsApp" sub="El más popular" featured />
            <ShareBtn icon="📧" label="Email" sub="Adjunta enlace" />
            <ShareBtn icon="📱" label="SMS" sub="Mensaje directo" />
            <ShareBtn icon="📋" label="Copiar texto" sub="Con mensaje sugerido" />
          </div>

          {/* QR code */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: 18, borderRadius: 12,
            background: `${t.rosa[50]}`, border: `1px solid ${t.rosa.suave}`,
          }}>
            <FakeQR color={t.rosa[900]} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.dorado[500], letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>
                ¿En persona?
              </div>
              <div style={{ fontSize: 14, color: t.rosa[800], fontWeight: 700, marginBottom: 4 }}>
                Escanea este código QR
              </div>
              <div style={{ fontSize: 12, color: t.rosa[600], opacity: 0.8, lineHeight: 1.4 }}>
                Imprímelo en una tarjeta y entrégaselo a mamá. Lo escanea con su cámara y se abre el regalo.
              </div>
            </div>
          </div>

          {/* Acciones secundarias */}
          <div style={{ display: "flex", gap: 10, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${t.rosa.suave}` }}>
            <button onClick={onEdit} style={window.ghostBtn(t)}>✎ Editar regalo</button>
            <button onClick={onNew} style={{ ...window.ghostBtn(t), borderColor: `${t.rosa.profundo}66`, color: t.rosa.profundo }}>
              + Crear otro
            </button>
          </div>
        </div>

        {/* RIGHT — Preview */}
        <div style={{ position: "sticky", top: 96 }}>
          <div style={{ ...window.cardStyle(t), padding: 24, textAlign: "center" }}>
            <window.Eyebrow t={t}>Lo que verá mamá</window.Eyebrow>
            <h3 style={{ fontFamily: t.font.display, fontSize: 24, color: t.rosa[900], margin: "6px 0 18px", fontStyle: "italic" }}>
              Vista previa
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: 260, height: 520, borderRadius: 32, overflow: "hidden",
                background: "#000", padding: 7,
                boxShadow: `0 30px 60px ${t.rosa.profundo}44`,
              }}>
                <div style={{ width: "100%", height: "100%", borderRadius: 26, overflow: "hidden", position: "relative",
                  background: regalo.tipo === "cinematica" ? "#0a0a0f" : "#fdf8f2" }}>
                  {regalo.tipo === "romantica" && <window.IntroRomantica regalo={regalo} onIniciar={() => {}} />}
                  {regalo.tipo === "cinematica" && <window.IntroCinematica regalo={regalo} onIniciar={() => {}} />}
                  {regalo.tipo === "elegante" && <window.IntroElegante regalo={regalo} onIniciar={() => {}} />}
                </div>
              </div>
            </div>
            <button onClick={onView} style={{ ...window.primaryBtn(t, "md"), width: "100%", marginTop: 18 }}>
              ▶ Ver presentación completa
            </button>
            <p style={{ fontSize: 11, color: t.rosa[500], marginTop: 8, opacity: 0.8 }}>
              {regalo.fotos.length} fotos · {regalo.cancion ? regalo.cancion.name : "sin música"}
            </p>
          </div>

          {/* Tip */}
          <div style={{
            marginTop: 16, padding: 16, borderRadius: 12,
            background: `linear-gradient(135deg, ${t.dorado[300]}33, ${t.crema[100]})`,
            border: `1px solid ${t.dorado[400]}55`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.dorado[600], letterSpacing: 1.3, textTransform: "uppercase", marginBottom: 6 }}>
              💡 Consejo
            </div>
            <div style={{ fontSize: 13, color: t.rosa[800], lineHeight: 1.5 }}>
              Envíalo el 10 de mayo a las 8:00 AM con un audio de WhatsApp diciéndole <em>"feliz día, mami"</em>. Funciona siempre.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShareBtn({ icon, label, sub, featured }) {
  const t = window.TOKENS;
  return (
    <button style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 16px",
      background: featured ? `linear-gradient(135deg, #25D366, #128C7E)` : "white",
      color: featured ? "white" : t.rosa[900],
      border: featured ? "0" : `1px solid ${t.rosa.suave}`,
      borderRadius: 12, cursor: "pointer", textAlign: "left",
      fontFamily: t.font.body,
      boxShadow: featured ? "0 6px 16px rgba(37,211,102,0.4)" : "none",
    }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 11, opacity: featured ? 0.9 : 0.65, marginTop: 1 }}>{sub}</div>
      </div>
    </button>
  );
}

function FakeQR({ color }) {
  const cells = [];
  for (let i = 0; i < 21 * 21; i++) {
    const r = Math.floor(i / 21), c = i % 21;
    // Position markers
    const inMarker = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
    const isMarkerPx = inMarker && (
      (r === 0 || r === 6 || c === 0 || c === 6 || r === 14 || r === 20 || c === 14 || c === 20) ||
      ((r >= 2 && r <= 4) && (c >= 2 && c <= 4)) ||
      ((r >= 2 && r <= 4) && (c >= 16 && c <= 18)) ||
      ((r >= 16 && r <= 18) && (c >= 2 && c <= 4))
    );
    const fill = isMarkerPx || (!inMarker && Math.random() > 0.5);
    cells.push(fill);
  }
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(21, 4px)",
      gap: 0, padding: 8, background: "white", borderRadius: 8,
      border: `1px solid ${window.TOKENS.rosa.suave}`,
    }}>
      {cells.map((f, i) => (
        <div key={i} style={{ width: 4, height: 4, background: f ? color : "white" }} />
      ))}
    </div>
  );
}

window.DesktopCompartir = DesktopCompartir;
