export const metadata = {
  title: "Prototipo Regalo Mamá",
};

export default function PrototypePage() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#1a1518",
      }}
    >
      <iframe
        title="Prototipo Regalo Mamá"
        src="/prototype-assets/index.html"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </main>
  );
}
