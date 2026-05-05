export const metadata = {
  title: "Regalo Mama",
};

export default function HomePage() {
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
        title="Prototipo Regalo Mama"
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
