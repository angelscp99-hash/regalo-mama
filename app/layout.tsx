import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Regalo Mamá — Sorprende a mamá con amor",
  description:
    "Crea una presentación personalizada con fotos, frases y música para el Día de la Madre. Compártela fácilmente por WhatsApp.",
  openGraph: {
    title: "Regalo Mamá 💝",
    description: "Crea un regalo digital hermoso para mamá",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
