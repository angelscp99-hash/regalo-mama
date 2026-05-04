import LayoutPrincipal from "@/components/LayoutPrincipal";
import FormularioRegalo from "@/components/FormularioRegalo";

export const metadata = {
  title: "Crear regalo — Regalo Mamá",
  description: "Crea un regalo digital personalizado para el Día de la Madre",
};

export default function CrearPage() {
  return (
    <LayoutPrincipal>
      <FormularioRegalo />
    </LayoutPrincipal>
  );
}
