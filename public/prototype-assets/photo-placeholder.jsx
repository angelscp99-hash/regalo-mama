// PhotoPlaceholder — subtly-striped SVG placeholder for missing imagery.
// Use everywhere we'd show a real photo of mom.
function PhotoPlaceholder({ label = "foto-mama.jpg", tone = "rose", style = {}, rounded = 16, src, imageUrl }) {
  const palettes = {
    rose:   { a: "#f5d0d9", b: "#ecbcc8", text: "#9a5868", stripe: "rgba(154,88,104,0.08)" },
    cream:  { a: "#f5e9d4", b: "#ead8b8", text: "#8a6f3d", stripe: "rgba(138,111,61,0.10)" },
    night:  { a: "#1d1729", b: "#0f0c1a", text: "rgba(232,200,80,0.7)", stripe: "rgba(232,200,80,0.07)" },
    blush:  { a: "#fbe4e9", b: "#f4cdd6", text: "#a6566c", stripe: "rgba(166,86,108,0.07)" },
    sepia:  { a: "#e8d8c0", b: "#d4bd9c", text: "#6b4d2a", stripe: "rgba(107,77,42,0.10)" },
  };
  const p = palettes[tone] || palettes.rose;
  const id = React.useId();
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      borderRadius: rounded, overflow: "hidden",
      background: `linear-gradient(135deg, ${p.a} 0%, ${p.b} 100%)`,
      ...style,
    }}>
      {(src || imageUrl) && (
        <img
          src={src || imageUrl}
          alt={label}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 3,
          }}
        />
      )}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id={`stripe-${id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={p.stripe} strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#stripe-${id})`} />
      </svg>
      {!(src || imageUrl) && <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 6, padding: 12, textAlign: "center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.text} strokeWidth="1.4" opacity="0.7">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="11" r="2" />
          <path d="M21 17l-5-5-9 9" />
        </svg>
        <div style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          fontSize: 9, color: p.text, opacity: 0.85,
          letterSpacing: 0.3, fontWeight: 500,
        }}>{label}</div>
      </div>}
    </div>
  );
}

window.PhotoPlaceholder = PhotoPlaceholder;
