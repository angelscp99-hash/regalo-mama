// Desktop Crear page — wide form with photo grid on left, settings on right.

function DesktopCrear({ state, setState, onBack, onGenerar, mode = "crear" }) {
  const t = window.TOKENS;
  const L = window.LIMITES;
  const [showFrases, setShowFrases] = React.useState(false);
  const [activeFotoIdx, setActiveFotoIdx] = React.useState(0);
  const fotosInputRef = React.useRef(null);
  const musicaInputRef = React.useRef(null);
  const [viewportW, setViewportW] = React.useState(window.innerWidth);
  const fotosCount = state.fotos.length;
  const isEdit = mode === "editar";
  const isNarrow = viewportW < 900;

  React.useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const formatSize = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const agregarFotosReales = (files) => {
    const disponibles = L.MAX_FOTOS - state.fotos.length;
    const seleccionadas = Array.from(files || [])
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, disponibles);

    if (!seleccionadas.length) return;

    const nuevas = seleccionadas.map((file, i) => ({
      label: file.name,
      tone: ["rose", "blush", "cream", "sepia"][((state.fotos.length + i) % 4)],
      src: URL.createObjectURL(file),
      fileName: file.name,
      size: formatSize(file.size),
      frase: window.SAMPLE_FRASES[(state.fotos.length + i) % window.SAMPLE_FRASES.length],
    }));

    setState({ ...state, fotos: [...state.fotos, ...nuevas] });
    setActiveFotoIdx(state.fotos.length);
  };

  const subirMusicaReal = (file) => {
    if (!file) return;
    setState({
      ...state,
      cancion: {
        name: file.name,
        size: formatSize(file.size),
        url: URL.createObjectURL(file),
      },
    });
  };

  return (
    <div style={{ minHeight: "100%", background: t.crema.body, fontFamily: t.font.body, color: t.texto.oscuro }}>
      <window.DesktopHeader onStart={onGenerar} />

      {/* Page header */}
      <section style={{ padding: isNarrow ? "28px 18px 18px" : "40px 80px 24px", maxWidth: 1180, margin: "0 auto" }}>
        <button onClick={onBack} style={{
          background: "transparent", border: 0, color: t.rosa[700], cursor: "pointer",
          fontSize: 13, padding: 0, marginBottom: 16, fontFamily: t.font.body,
        }}>← Volver al inicio</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <window.Eyebrow t={t}>{isEdit ? "Modo edición" : "Paso 1 de 1"}</window.Eyebrow>
            <h1 style={{ fontFamily: t.font.display, fontSize: isNarrow ? 38 : 56, color: t.rosa[900], fontWeight: 400, margin: "6px 0 4px", fontStyle: "italic", lineHeight: 1.05 }}>
              {isEdit ? `Editar regalo de ${state.nombre || "mamá"}` : "Crear regalo para mamá"}
            </h1>
            <p style={{ fontSize: 14.5, color: t.rosa[700], opacity: 0.75, margin: 0 }}>
              {isEdit
                ? "Cambia fotos, frases, canción o estilo. Tus cambios se guardan al regalo existente."
                : "Sube fotos, escribe frases, agrega música. Verás cómo se ve en tiempo real."}
            </p>
          </div>
          <Stepper t={t} fotos={fotosCount} hasMusic={!!state.cancion} hasMessage={!!state.mensaje} />
        </div>
      </section>

      {/* Two columns */}
      <section style={{
        padding: isNarrow ? "14px 18px 48px" : "20px 80px 80px",
        maxWidth: 1180,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isNarrow ? "1fr" : "1.4fr 1fr",
        gap: isNarrow ? 20 : 32,
        alignItems: "start",
      }}>
        {/* LEFT: Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Datos de mamá */}
          <FormCard t={t} num="01" title="Sobre mamá" subtitle={`Nombre obligatorio · mensaje opcional (máx ${L.MAX_MENSAJE_CHARS} car.)`}>
            <Field label="Nombre de mamá *" hint={`${(state.nombre || "").length} / ${L.MAX_NOMBRE_CHARS}`}>
              <Input t={t}
                value={state.nombre}
                onChange={(e) => setState({ ...state, nombre: e.target.value.slice(0, L.MAX_NOMBRE_CHARS) })}
                placeholder="Ej. María, Mamita, Madre..."
              />
            </Field>
            <Field label="Mensaje de apertura (opcional)" hint={`${(state.mensajeGeneral || "").length} / ${L.MAX_MENSAJE_CHARS}`}>
              <textarea
                value={state.mensajeGeneral || ""}
                onChange={(e) => setState({ ...state, mensajeGeneral: e.target.value.slice(0, L.MAX_MENSAJE_CHARS) })}
                placeholder="Un mensaje que mamá verá antes de ver las fotos..."
                style={{
                  ...inputBase(t), minHeight: 110, resize: "vertical",
                  fontFamily: t.font.body, lineHeight: 1.6,
                }}
              />
            </Field>
          </FormCard>

          {/* Fotos */}
          <FormCard t={t} num="02" title="Las fotos" subtitle={`${state.fotos.length} / ${L.MAX_FOTOS} · JPG, PNG o WEBP · máx ${L.MAX_PESO_IMAGEN_MB} MB c/u`}>
            <input
              ref={fotosInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                agregarFotosReales(e.target.files);
                e.target.value = "";
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 12 }}>
              {state.fotos.map((foto, idx) => (
                <FotoTile key={idx} foto={foto} idx={idx} active={idx === activeFotoIdx}
                  onClick={() => setActiveFotoIdx(idx)} t={t} />
              ))}
              {state.fotos.length < L.MAX_FOTOS && (
                <button type="button" onClick={() => fotosInputRef.current && fotosInputRef.current.click()} style={{
                  aspectRatio: "1", borderRadius: 12,
                  border: `2px dashed ${t.dorado[500]}77`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 4, cursor: "pointer", color: t.dorado[600], fontSize: 10,
                  background: `${t.crema[100]}88`, textAlign: "center", padding: 6,
                }}>
                  <span style={{ fontSize: 28 }}>＋</span>
                  <span style={{ letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>Agregar</span>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>{L.MAX_FOTOS - state.fotos.length} restantes</span>
                </button>
              )}
            </div>

            {/* Active photo frase editor */}
            {state.fotos[activeFotoIdx] && (
              <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: `${t.rosa[50]}cc`, border: `1px solid ${t.rosa.suave}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, color: t.rosa.profundo, fontWeight: 700, textTransform: "uppercase" }}>
                    Frase para foto #{activeFotoIdx + 1}
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => {
                      const nf = [...state.fotos];
                      const random = window.SAMPLE_FRASES[Math.floor(Math.random() * window.SAMPLE_FRASES.length)];
                      nf[activeFotoIdx] = { ...nf[activeFotoIdx], frase: random };
                      setState({ ...state, fotos: nf });
                    }} style={miniBtn(t)}>✨ Generar</button>
                    <button onClick={() => setShowFrases(!showFrases)} style={miniBtn(t)}>
                      📖 Ver banco
                    </button>
                  </div>
                </div>
                <textarea
                  value={state.fotos[activeFotoIdx].frase || ""}
                  onChange={(e) => {
                    const nf = [...state.fotos];
                    nf[activeFotoIdx] = { ...nf[activeFotoIdx], frase: e.target.value.slice(0, L.MAX_FRASE_CHARS) };
                    setState({ ...state, fotos: nf });
                  }}
                  placeholder="Escribe una frase especial para esta foto"
                  rows={2}
                  style={{ ...inputBase(t), background: "white", resize: "none", fontFamily: t.font.body }}
                />
                <div style={{ textAlign: "right", fontSize: 10, color: t.rosa[400], marginTop: 4, fontFamily: "ui-monospace,Menlo,monospace" }}>
                  {(state.fotos[activeFotoIdx].frase || "").length} / {L.MAX_FRASE_CHARS}
                </div>
                {showFrases && (
                  <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "white", border: `1px solid ${t.rosa.suave}`, maxHeight: 220, overflowY: "auto" }}>
                    <div style={{ fontSize: 10, color: t.rosa[600], marginBottom: 8, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
                      Banco de frases · {window.SAMPLE_FRASES.length} sugerencias
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {window.SAMPLE_FRASES.map((f, i) => (
                        <button key={i} onClick={() => {
                          const nf = [...state.fotos];
                          nf[activeFotoIdx] = { ...nf[activeFotoIdx], frase: f };
                          setState({ ...state, fotos: nf });
                          setShowFrases(false);
                        }} style={chipBtn(t)}>{f.length > 44 ? f.slice(0, 44) + "…" : f}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </FormCard>

          {/* Música */}
          <FormCard t={t} num="03" title="La canción" subtitle={`MP3 · máx. ${L.MAX_PESO_CANCION_MB} MB · sonará en bucle (opcional)`}>
            <input
              ref={musicaInputRef}
              type="file"
              accept="audio/mpeg,.mp3"
              style={{ display: "none" }}
              onChange={(e) => {
                subirMusicaReal(e.target.files && e.target.files[0]);
                e.target.value = "";
              }}
            />
            {state.cancion ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: 18, borderRadius: 14,
                background: `linear-gradient(135deg, ${t.rosa[50]} 0%, ${t.crema[100]} 100%)`,
                border: `1px solid ${t.rosa.suave}`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `linear-gradient(135deg, ${t.rosa.profundo}, ${t.dorado[500]})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 26,
                }}>♪</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.rosa[800], fontFamily: "ui-monospace,Menlo,monospace" }}>
                    {state.cancion.name}
                  </div>
                  <div style={{ fontSize: 12, color: t.rosa[500], marginTop: 2 }}>{state.cancion.size} · 3:24</div>
                  {/* Waveform */}
                  <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 8, height: 22 }}>
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div key={i} style={{
                        width: 2, borderRadius: 1,
                        height: `${30 + Math.abs(Math.sin(i * 0.7)) * 70}%`,
                        background: i < 22 ? t.rosa.profundo : t.rosa.suave,
                      }} />
                    ))}
                  </div>
                  {state.cancion.url && (
                    <audio
                      src={state.cancion.url}
                      controls
                      style={{ width: "100%", marginTop: 10, height: 32 }}
                    />
                  )}
                </div>
                <button type="button" onClick={() => musicaInputRef.current && musicaInputRef.current.click()} style={miniBtn(t)}>Cambiar</button>
              </div>
            ) : (
              <button type="button" onClick={() => musicaInputRef.current && musicaInputRef.current.click()} style={{
                padding: 28, borderRadius: 14,
                border: `2px dashed ${t.dorado[500]}77`,
                background: `${t.crema[100]}88`,
                textAlign: "center",
                width: "100%",
                cursor: "pointer",
              }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎵</div>
                <div style={{ fontSize: 14, color: t.rosa[800], fontWeight: 700, marginBottom: 4 }}>
                  Arrastra un MP3 aquí o haz clic para subir
                </div>
                <div style={{ fontSize: 12, color: t.rosa[600], opacity: 0.75 }}>
                  Su canción favorita · su himno · esa que ella siempre canta
                </div>
              </button>
            )}
          </FormCard>

          {/* Estilo */}
          <FormCard t={t} num="04" title="El estilo visual" subtitle="Tres aestéticas — elige la que más le va">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { id: "romantica", emoji: "🌸", nombre: "Romántica", desc: "Rosa, suave, emotiva" },
                { id: "cinematica", emoji: "🎬", nombre: "Cinemática", desc: "Oscura, dramática" },
                { id: "elegante", emoji: "✨", nombre: "Elegante", desc: "Crema, serif, sobria" },
              ].map((est) => {
                const active = state.tipo === est.id;
                return (
                  <button key={est.id}
                    onClick={() => setState({ ...state, tipo: est.id })}
                    style={{
                      padding: 16, borderRadius: 14,
                      border: active ? `2px solid ${t.rosa.profundo}` : `1px solid ${t.rosa.suave}`,
                      background: active ? `${t.rosa[50]}` : "white",
                      cursor: "pointer", textAlign: "left",
                      boxShadow: active ? `0 6px 18px ${t.rosa.profundo}33` : "none",
                      transition: "all 0.2s",
                    }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{est.emoji}</div>
                    <div style={{ fontFamily: t.font.display, fontStyle: "italic", fontSize: 18, color: t.rosa[900], fontWeight: 600 }}>
                      {est.nombre}
                    </div>
                    <div style={{ fontSize: 11.5, color: t.rosa[600], opacity: 0.85, marginTop: 4 }}>{est.desc}</div>
                    {active && (
                      <div style={{ fontSize: 10, color: t.rosa.profundo, fontWeight: 700, marginTop: 8, letterSpacing: 1, textTransform: "uppercase" }}>
                        ✓ Seleccionado
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </FormCard>
        </div>

        {/* RIGHT: Preview */}
        <div style={{ position: isNarrow ? "relative" : "sticky", top: isNarrow ? 0 : 96 }}>
          <PreviewPanel t={t} state={state} activeFotoIdx={activeFotoIdx} onGenerar={onGenerar} />
        </div>
      </section>
    </div>
  );
}

function PreviewPanel({ t, state, activeFotoIdx, onGenerar }) {
  const SlideComp = state.tipo === "romantica" ? window.SlideRomantica
                  : state.tipo === "cinematica" ? window.SlideCinematica
                  : window.SlideElegante;
  const foto = state.fotos[activeFotoIdx] || state.fotos[0];
  const puedeGenerar = state.fotos.length > 0;

  return (
    <div style={{ ...window.cardStyle(t), padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10.5, letterSpacing: 1.8, textTransform: "uppercase", color: t.dorado[500], fontWeight: 700 }}>
            Vista previa en vivo
          </div>
          <div style={{ fontFamily: t.font.display, fontSize: 22, fontStyle: "italic", color: t.rosa[800] }}>
            Cómo lo verá mamá
          </div>
        </div>
        <div style={{
          fontSize: 10, padding: "4px 10px", borderRadius: 999,
          background: t.rosa[50], color: t.rosa.profundo, fontWeight: 700,
          border: `1px solid ${t.rosa.suave}`,
        }}>
          {state.tipo === "romantica" ? "🌸" : state.tipo === "cinematica" ? "🎬" : "✨"} {state.tipo}
        </div>
      </div>

      {/* Phone mock */}
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 16px" }}>
        <div style={{
          width: 240, height: 480, borderRadius: 30, overflow: "hidden",
          background: "#000", padding: 6,
          boxShadow: `0 30px 60px ${t.rosa.profundo}33, 0 12px 24px rgba(0,0,0,0.12)`,
        }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", position: "relative",
            background: state.tipo === "cinematica" ? "#0a0a0f" : (state.tipo === "elegante" ? "#fdf8f2" : "#fde8ee") }}>
            {foto ? (
              <SlideComp foto={foto} idx={activeFotoIdx} total={state.fotos.length} />
            ) : (
              <EmptyPhonePreview t={t} />
            )}
          </div>
        </div>
      </div>

      {/* Foto navigator dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
        {state.fotos.length ? state.fotos.map((_, i) => (
          <div key={i} style={{
            width: i === activeFotoIdx ? 22 : 6, height: 6, borderRadius: 999,
            background: i === activeFotoIdx ? t.rosa.profundo : t.rosa.suave,
            transition: "width 0.2s",
          }} />
        )) : <span style={{ fontSize: 11, color: t.rosa[400] }}>Sube fotos para ver la presentación</span>}
      </div>

      {/* Summary */}
      <div style={{ borderTop: `1px solid ${t.rosa.suave}`, paddingTop: 14, marginBottom: 16 }}>
        <SummaryRow t={t} icon="👤" label="Para" value={state.nombre || "Sin nombre"} />
        <SummaryRow t={t} icon="📸" label="Fotos" value={`${state.fotos.length} foto${state.fotos.length === 1 ? "" : "s"}`} />
        <SummaryRow t={t} icon="🎵" label="Música" value={state.cancion ? state.cancion.name : "Sin canción"} mono={!!state.cancion} />
        <SummaryRow t={t} icon="✨" label="Estilo" value={state.tipo} />
      </div>

      <button disabled={!puedeGenerar} onClick={puedeGenerar ? onGenerar : undefined} style={{
        ...window.primaryBtn(t, "lg"), width: "100%",
        opacity: puedeGenerar ? 1 : 0.45,
        cursor: puedeGenerar ? "pointer" : "not-allowed",
      }}>
        {state.isEdit ? "💾 Guardar cambios" : "💝 Generar regalo"}
      </button>
      <p style={{ fontSize: 11, color: t.rosa[500], textAlign: "center", marginTop: 10, opacity: 0.8 }}>
        {puedeGenerar
          ? (state.isEdit ? "Los cambios se publican al instante" : "Recibirás un enlace único para compartir por WhatsApp")
          : "Agrega al menos una foto para habilitar la presentación"}
      </p>
    </div>
  );
}

function EmptyPhonePreview({ t }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 28, textAlign: "center",
      background: "linear-gradient(135deg, #fde8ee 0%, #f9dde5 50%, #fce7f3 100%)",
    }}>
      <div style={{ fontSize: 42, marginBottom: 14 }}>📸</div>
      <div style={{
        fontFamily: t.font.display,
        fontStyle: "italic",
        fontSize: 24,
        color: t.rosa[900],
        lineHeight: 1.15,
      }}>
        Tu presentación aparecerá aquí
      </div>
      <p style={{ fontSize: 12, color: t.rosa[600], lineHeight: 1.5, marginTop: 10 }}>
        Carga fotos para ver cada slide con su frase.
      </p>
    </div>
  );
}

function SummaryRow({ icon, label, value, mono, t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 12.5 }}>
      <span style={{ fontSize: 14, width: 20 }}>{icon}</span>
      <span style={{ color: t.rosa[600], opacity: 0.7, width: 60 }}>{label}</span>
      <span style={{
        flex: 1, color: t.rosa[900], fontWeight: 600,
        fontFamily: mono ? "ui-monospace,Menlo,monospace" : "inherit",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{value}</span>
    </div>
  );
}

function FotoTile({ foto, idx, active, onClick, t }) {
  return (
    <div onClick={onClick} style={{
      position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden",
      cursor: "pointer", border: active ? `2px solid ${t.rosa.profundo}` : `1px solid ${t.rosa.suave}`,
      boxShadow: active ? `0 8px 20px ${t.rosa.profundo}55` : "none",
      transform: active ? "scale(1.02)" : "none", transition: "all 0.2s",
    }}>
      <window.PhotoPlaceholder tone={foto.tone} label={foto.label} src={foto.src} />
      <div style={{
        position: "absolute", top: 4, left: 4,
        background: "rgba(0,0,0,0.6)", color: "white",
        fontSize: 9, padding: "2px 6px", borderRadius: 4,
        fontWeight: 700, letterSpacing: 0.5,
      }}>{idx + 1}</div>
      {foto.frase && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "16px 6px 4px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          color: "white", fontSize: 9, lineHeight: 1.2,
          textOverflow: "ellipsis", overflow: "hidden",
          whiteSpace: "nowrap", fontStyle: "italic",
        }}>{foto.frase}</div>
      )}
    </div>
  );
}

function FormCard({ t, num, title, subtitle, children }) {
  return (
    <div style={{ ...window.cardStyle(t), padding: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 18 }}>
        <span style={{
          fontFamily: t.font.display, fontSize: 36, fontStyle: "italic",
          color: t.dorado[500], lineHeight: 1, opacity: 0.7,
        }}>{num}</span>
        <div>
          <h3 style={{ fontFamily: t.font.display, fontSize: 24, color: t.rosa[800], margin: 0, fontStyle: "italic", fontWeight: 600 }}>{title}</h3>
          <div style={{ fontSize: 12, color: t.rosa[600], opacity: 0.75, marginTop: 2 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, color: "#7a5a5a" }}>{label}</span>
        {hint && <span style={{ fontSize: 11, color: "#a08070", fontFamily: "ui-monospace,Menlo,monospace" }}>{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Stepper({ t, fotos, hasMusic, hasMessage }) {
  const items = [
    { ok: !!hasMessage, label: "Mensaje" },
    { ok: fotos > 0, label: `${fotos} fotos` },
    { ok: hasMusic, label: "Música" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 18px", ...window.cardStyle(t) }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              background: it.ok ? t.rosa.profundo : t.crema[200],
              color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700,
            }}>{it.ok ? "✓" : i + 1}</span>
            <span style={{ fontSize: 12, color: it.ok ? t.rosa[800] : t.rosa[500], fontWeight: it.ok ? 700 : 400 }}>{it.label}</span>
          </div>
          {i < items.length - 1 && <div style={{ width: 16, height: 1, background: t.rosa.suave }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function inputBase(t) {
  return {
    width: "100%", boxSizing: "border-box",
    padding: "12px 14px",
    border: `1px solid ${t.rosa.suave}`,
    borderRadius: 10,
    background: "white",
    fontSize: 14, color: t.rosa[900],
    outline: "none",
    fontFamily: t.font.body,
  };
}
function Input({ t, ...p }) { return <input {...p} style={inputBase(t)} />; }
function miniBtn(t) {
  return {
    background: "white", color: t.rosa.profundo, border: `1px solid ${t.rosa.suave}`,
    fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999, cursor: "pointer",
    letterSpacing: 0.3, fontFamily: t.font.body,
  };
}
function chipBtn(t) {
  return {
    background: "white", color: t.rosa[800], border: `1px solid ${t.rosa.suave}`,
    fontSize: 11, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
    fontFamily: t.font.body, lineHeight: 1.3,
  };
}

window.DesktopCrear = DesktopCrear;
