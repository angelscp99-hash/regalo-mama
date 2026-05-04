import Link from "next/link";
import LayoutPrincipal from "@/components/LayoutPrincipal";

export default function NotFound() {
  return (
    <LayoutPrincipal>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm animar-entrada">
          <span className="text-6xl block mb-6">🌸</span>
          <h1
            className="text-4xl text-rosa-800 mb-4"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            Regalo no encontrado
          </h1>
          <p className="text-rosa-500 mb-8 text-sm leading-relaxed">
            Este enlace no existe o el regalo fue eliminado. Pero nunca es tarde
            para crear uno nuevo 💝
          </p>
          <Link href="/crear" className="btn-primario inline-block">
            Crear un regalo
          </Link>
        </div>
      </div>
    </LayoutPrincipal>
  );
}
