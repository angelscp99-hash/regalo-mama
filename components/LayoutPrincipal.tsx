"use client";

import Link from "next/link";

interface LayoutPrincipalProps {
  children: React.ReactNode;
  mostrarNav?: boolean;
}

export default function LayoutPrincipal({
  children,
  mostrarNav = true,
}: LayoutPrincipalProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {mostrarNav && (
        <header className="py-4 px-6 flex items-center justify-between border-b border-rosa-100/50">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💝</span>
            <span
              className="font-display text-xl text-rosa-700 italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Regalo Mamá
            </span>
          </Link>
          <Link
            href="/crear"
            className="text-sm text-rosa-600 hover:text-rosa-800 font-medium transition-colors"
          >
            Crear regalo →
          </Link>
        </header>
      )}
      <main className="flex-1">{children}</main>
      {mostrarNav && (
        <footer className="py-6 text-center text-xs text-rosa-400 border-t border-rosa-100/50">
          <p>Hecho con 💗 para las mamás del mundo</p>
        </footer>
      )}
    </div>
  );
}
