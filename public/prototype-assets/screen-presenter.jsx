// Presenter shell — wraps slides with chrome (top bar, side arrows, share button)
function Presenter({ regalo, onShare, onExit }) {
  const t = window.TOKENS;
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [showCtrls, setShowCtrls] = React.useState(true);
  const audioRef = React.useRef(null);
  const ctrlsTimer = React.useRef(null);

  const total = regalo.fotos.length;
  React.useEffect(() => {
    if (!playing || total < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [playing, total]);

  React.useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing, regalo.cancion]);

  React.useEffect(() => {
    setIdx(0);
  }, [total]);

  const tap = () => {
    setShowCtrls(true);
    if (ctrlsTimer.current) clearTimeout(ctrlsTimer.current);
    ctrlsTimer.current = setTimeout(() => setShowCtrls(false), 3500);
  };
  React.useEffect(() => {
    tap();
    return () => ctrlsTimer.current && clearTimeout(ctrlsTimer.current);
  }, []);

  const isCine = regalo.tipo === "cinematica";
  const isEleg = regalo.tipo === "elegante";
  const SlideComp = regalo.tipo === "romantica" ? window.SlideRomantica
                  : regalo.tipo === "cinematica" ? window.SlideCinematica
                  : window.SlideElegante;

  const bg = isCine ? "#0a0a0f" : isEleg ? "#fdf8f2" : "#fde8ee";
  const cancionUrl = regalo.cancion && regalo.cancion.url;

  return (
    <div onClick={tap} style={{
      position: "relative", width: "100%", height: "100%", overflow: "hidden",
      background: bg, fontFamily: t.font.body, userSelect: "none",
    }}>
      {cancionUrl && (
        <audio ref={audioRef} src={cancionUrl} loop preload="auto" />
      )}

      {total ? regalo.fotos.map((f, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0, transition: "opacity 1s",
          opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? "auto" : "none",
        }}>
          <SlideComp foto={f} idx={i} total={total} />
        </div>
      )) : (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: 32,
          background: "linear-gradient(135deg, #fde8ee 0%, #f9dde5 50%, #fce7f3 100%)",
        }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📸</div>
          <h1 style={{
            fontFamily: t.font.display,
            fontStyle: "italic",
            color: t.rosa[900],
            fontWeight: 400,
            fontSize: "clamp(34px, 6vw, 72px)",
            margin: 0,
          }}>
            Aún no hay fotos
          </h1>
          <p style={{ color: t.rosa[700], maxWidth: 420, lineHeight: 1.6 }}>
            Regresa al creador y carga imágenes para armar la presentación.
          </p>
        </div>
      )}

      {/* Controls overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        opacity: showCtrls ? 1 : 0, transition: "opacity 0.5s",
      }}>
        {/* Top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "60px 18px 12px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: isCine ? "transparent" : "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
          pointerEvents: "auto",
        }}>
          <button onClick={(e) => { e.stopPropagation(); onExit(); }} style={{
            ...glassPill(isEleg, t),
            padding: "6px 12px", fontSize: 12, gap: 4,
          }}>← Salir</button>
          <span style={{
            fontFamily: t.font.display, fontSize: 16, fontStyle: "italic",
            color: isEleg ? t.rosa[800] : "white",
            textShadow: isCine ? "0 1px 4px rgba(0,0,0,0.5)" : "none",
          }}>Para {regalo.nombre}</span>
          {cancionUrl ? (
            <button onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }} style={{
              ...glassPill(isEleg, t),
              padding: "6px 12px", fontSize: 11, gap: 4,
            }}>
              {playing ? "⏸" : "▶"} Música
            </button>
          ) : <span style={{ width: 60 }} />}
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + total) % total); tap(); }}
              style={{ ...arrowStyle(isEleg, t), left: 12 }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % total); tap(); }}
              style={{ ...arrowStyle(isEleg, t), right: 12 }}>›</button>
          </>
        )}

        {/* Share button */}
        <div style={{
          position: "absolute", bottom: 38, left: 0, right: 0,
          display: "flex", justifyContent: "center", pointerEvents: "auto",
        }}>
          <button onClick={(e) => { e.stopPropagation(); onShare(); }} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#22c55e", color: "white",
            border: 0, padding: "11px 22px", borderRadius: 999,
            fontWeight: 700, fontSize: 12.5, cursor: "pointer",
            boxShadow: "0 8px 20px rgba(34,197,94,0.45)",
            fontFamily: t.font.body,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Compartir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

function glassPill(isEleg, t) {
  return {
    display: "inline-flex", alignItems: "center",
    background: isEleg ? "rgba(201,168,76,0.18)" : "rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)",
    color: isEleg ? t.dorado[600] : "white",
    border: 0, borderRadius: 999, cursor: "pointer", fontWeight: 500,
  };
}
function arrowStyle(isEleg, t) {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    width: 38, height: 38, borderRadius: 999,
    background: isEleg ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)", border: 0, cursor: "pointer",
    color: isEleg ? t.dorado[600] : "white",
    fontSize: 24, lineHeight: 1, pointerEvents: "auto",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
}

window.Presenter = Presenter;
