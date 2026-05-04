// Crear / formulario screen — port of components/FormularioRegalo.tsx, simplified for prototype.
function CrearScreen({ state, setState, onBack, onGenerar }) {
  const t = window.TOKENS;
  const TIPOS = [
    { id: "romantica", nombre: "Romántica", emoji: "🌸", desc: "Rosa, suave" },
    { id: "cinematica", nombre: "Cinemática", emoji: "🎬", desc: "Oscura, dramática" },
    { id: "elegante", nombre: "Elegante", emoji: "✨", desc: "Marfil, dorado" },
  ];

  const [generating, setGenerating] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.nombre || state.fotos.length === 0) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); onGenerar(); }, 1100);
  };

  const setField = (k, v) => setState((s) => ({ ...s, [k]: v }));

  const addFoto = () => {
    if (state.fotos.length >= 10) return;
    const next = window.SAMPLE_PHOTOS[state.fotos.length % window.SAMPLE_PHOTOS.length];
    setState((s) => ({ ...s, fotos: [...s.fotos, { ...next, id: Date.now() + Math.random() }] }));
  };
  const removeFoto = (i) => setState((s) => ({ ...s, fotos: s.fotos.filter((_, ix) => ix !== i) }));
  const updateFrase = (i, v) => setState((s) => ({
    ...s, fotos: s.fotos.map((f, ix) => ix === i ? { ...f, frase: v } : f),
  }));
  const randomFrase = (i) => updateFrase(i, window.SAMPLE_FRASES[Math.floor(Math.random() * window.SAMPLE_FRASES.length)]);

  return (
    <div style={{ minHeight: "100%", background: t.crema.body, fontFamily: t.font.body, paddingTop: 56 }}>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", borderBottom: `1px solid ${t.rosa.suave}80`, background: t.crema.body,
      }}>
        <button onClick={onBack} style={{
          background: "transparent", border: 0, cursor: "pointer", fontSize: 13,
          color: t.rosa.profundo, display: "flex", alignItems: "center", gap: 4,
        }}>← Atrás</button>
        <span style={{ fontFamily: t.font.display, fontSize: 16, fontStyle: "italic", color: t.rosa[700] }}>Regalo Mamá</span>
        <span style={{ width: 50 }} />
      </header>

      <div style={{ padding: "24px 20px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 36, display: "block", marginBottom: 8 }}>💝</span>
          <h1 style={{
            fontFamily: t.font.display, fontSize: 30, color: t.rosa[900],
            margin: 0, fontStyle: "italic", fontWeight: 400,
          }}>Crear regalo para mamá</h1>
          <p style={{ color: t.rosa[500], fontSize: 12, marginTop: 6 }}>Un recuerdo eterno en minutos</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Nombre */}
          <div style={{ ...window.cardStyle(t), padding: 18 }}>
            <Label>✦ Nombre de mamá *</Label>
            <Input
              value={state.nombre}
              onChange={(e) => setField("nombre", e.target.value)}
              placeholder="Ej: María, Mamita, Madre..."
              maxLength={40}
            />
          </div>

          {/* Estilo */}
          <div style={{ ...window.cardStyle(t), padding: 18 }}>
            <Label>✦ Estilo de presentación *</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
              {TIPOS.map((tt) => {
                const active = state.tipo === tt.id;
                return (
                  <button key={tt.id} type="button" onClick={() => setField("tipo", tt.id)}
                    style={{
                      padding: 10, borderRadius: 14,
                      border: active ? `2px solid ${t.rosa.medio}` : "2px solid transparent",
                      background: active ? t.rosa[50] : "rgba(255,255,255,0.5)",
                      cursor: "pointer", textAlign: "center",
                      boxShadow: active ? `0 4px 12px ${t.rosa.profundo}20` : "none",
                      transition: "all 0.2s",
                    }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{tt.emoji}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: t.rosa[800] }}>{tt.nombre}</div>
                    <div style={{ fontSize: 10, color: t.rosa[500], marginTop: 1 }}>{tt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mensaje */}
          <div style={{ ...window.cardStyle(t), padding: 18 }}>
            <Label>✦ Mensaje de apertura (opcional)</Label>
            <Textarea
              value={state.mensaje}
              onChange={(e) => setField("mensaje", e.target.value)}
              placeholder="Un mensaje que mamá verá antes de las fotos..."
              maxLength={200}
              rows={3}
            />
            <p style={{ fontSize: 10, color: t.rosa[300], textAlign: "right", marginTop: 4 }}>
              {state.mensaje.length}/200
            </p>
          </div>

          {/* Fotos */}
          <div style={{ ...window.cardStyle(t), padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Label compact>✦ Fotos ({state.fotos.length}/10) *</Label>
              {state.fotos.length < 10 && (
                <button type="button" onClick={addFoto} style={{
                  fontSize: 11, fontWeight: 500, color: t.rosa.profundo,
                  border: `1px solid ${t.rosa.suave}`, borderRadius: 999,
                  padding: "5px 12px", background: "transparent", cursor: "pointer",
                }}>+ Agregar</button>
              )}
            </div>

            {state.fotos.length === 0 ? (
              <button type="button" onClick={addFoto} style={{
                width: "100%", border: `2px dashed ${t.rosa[200]}`, borderRadius: 18,
                padding: 28, background: "transparent", cursor: "pointer",
                textAlign: "center", color: t.rosa[500],
              }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>📸</div>
                <div style={{ fontSize: 13 }}>Toca para agregar fotos</div>
                <div style={{ fontSize: 10.5, color: t.rosa[300], marginTop: 4 }}>JPG, PNG o WEBP · Máx 5 MB</div>
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {state.fotos.map((f, i) => (
                  <div key={f.id} style={{
                    display: "flex", gap: 10, padding: 10,
                    background: "rgba(255,255,255,0.5)", borderRadius: 14,
                  }}>
                    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                      <window.PhotoPlaceholder tone={f.tone} label={f.label} rounded={10} />
                      <button type="button" onClick={() => removeFoto(i)} style={{
                        position: "absolute", top: -5, right: -5, width: 20, height: 20,
                        borderRadius: 999, background: "#ef4444", color: "white",
                        border: "1.5px solid white", fontSize: 12, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1, padding: 0,
                      }}>×</button>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: t.rosa[500], marginBottom: 4 }}>
                        Foto {i + 1} — Frase
                      </div>
                      <Textarea
                        value={f.frase} onChange={(e) => updateFrase(i, e.target.value)}
                        rows={2} maxLength={100} small
                      />
                      <button type="button" onClick={() => randomFrase(i)} style={{
                        fontSize: 10.5, color: t.rosa[400], background: "transparent",
                        border: 0, cursor: "pointer", marginTop: 4, padding: 0,
                      }}>✨ Generar frase automática</button>
                    </div>
                  </div>
                ))}
                {state.fotos.length < 10 && (
                  <button type="button" onClick={addFoto} style={{
                    width: "100%", border: `2px dashed ${t.rosa[200]}`, borderRadius: 14,
                    padding: 12, background: "transparent", cursor: "pointer",
                    fontSize: 12, color: t.rosa[400],
                  }}>+ Agregar más fotos ({10 - state.fotos.length} restantes)</button>
                )}
              </div>
            )}
          </div>

          {/* Canción */}
          <div style={{ ...window.cardStyle(t), padding: 18 }}>
            <Label>✦ Canción de fondo (opcional)</Label>
            {state.cancion ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: 12, background: t.rosa[50], borderRadius: 14,
              }}>
                <span style={{ fontSize: 20 }}>🎵</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: t.rosa[800], whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {state.cancion.name}
                  </div>
                  <div style={{ fontSize: 10, color: t.rosa[400] }}>{state.cancion.size}</div>
                </div>
                <button type="button" onClick={() => setField("cancion", null)} style={{
                  fontSize: 11, color: "#ef4444", background: "transparent", border: 0, cursor: "pointer",
                }}>Quitar</button>
              </div>
            ) : (
              <button type="button" onClick={() => setField("cancion", { name: "para-mama-eterna.mp3", size: "3.4 MB" })}
                style={{
                  width: "100%", border: `2px dashed ${t.rosa[200]}`, borderRadius: 18,
                  padding: 18, background: "transparent", cursor: "pointer",
                  textAlign: "center", color: t.rosa[500],
                }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>🎵</div>
                <div style={{ fontSize: 12.5 }}>Toca para subir una canción MP3</div>
                <div style={{ fontSize: 10, color: t.rosa[300], marginTop: 4 }}>Solo MP3 · Máx 8 MB</div>
              </button>
            )}
          </div>

          <button type="submit" disabled={generating || !state.nombre || state.fotos.length === 0} style={{
            background: `linear-gradient(135deg, ${t.rosa.profundo} 0%, #9e3f58 100%)`,
            color: "white", padding: "16px", borderRadius: 999,
            border: 0, cursor: "pointer", fontWeight: 700, fontSize: 14,
            letterSpacing: 0.5, boxShadow: `0 4px 20px ${t.rosa.profundo}55`,
            fontFamily: t.font.body, opacity: (generating || !state.nombre || state.fotos.length === 0) ? 0.5 : 1,
          }}>{generating ? "Creando tu regalo... 💝" : "💝 Generar regalo"}</button>
        </form>
      </div>
    </div>
  );
}

function Label({ children, compact }) {
  const t = window.TOKENS;
  return <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: t.rosa[800], marginBottom: compact ? 0 : 10 }}>{children}</label>;
}
function Input(props) {
  const t = window.TOKENS;
  return <input {...props} style={{
    background: "rgba(255,255,255,0.85)",
    border: `1px solid ${t.dorado[500]}40`, borderRadius: 10,
    padding: "10px 13px", fontSize: 13.5, color: t.texto.oscuro,
    width: "100%", fontFamily: t.font.body, outline: "none", boxSizing: "border-box",
    ...(props.style || {}),
  }} />;
}
function Textarea({ small, ...props }) {
  const t = window.TOKENS;
  return <textarea {...props} style={{
    background: "rgba(255,255,255,0.85)",
    border: `1px solid ${t.dorado[500]}40`, borderRadius: 10,
    padding: "9px 12px", fontSize: small ? 12 : 13.5, color: t.texto.oscuro,
    width: "100%", fontFamily: t.font.body, outline: "none", resize: "none", boxSizing: "border-box",
    lineHeight: 1.4,
  }} />;
}

window.CrearScreen = CrearScreen;
