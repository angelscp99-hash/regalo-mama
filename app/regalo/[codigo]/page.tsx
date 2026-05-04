import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RegaloConFotos } from "@/types/regalo";
import PresentacionRegalo from "@/components/PresentacionRegalo";

interface PageProps {
  params: { codigo: string };
}

async function getRegalo(codigo: string): Promise<RegaloConFotos | null> {
  const { data: regalo, error } = await supabase
    .from("regalos")
    .select("*, fotos(*)")
    .eq("codigo", codigo)
    .single();

  if (error || !regalo) return null;
  return regalo as RegaloConFotos;
}

export async function generateMetadata({ params }: PageProps) {
  const regalo = await getRegalo(params.codigo);
  if (!regalo) return { title: "Regalo no encontrado" };
  return {
    title: `Un regalo para ${regalo.nombre_mama} 💝`,
    description: `Mira este regalo especial creado con amor para ${regalo.nombre_mama}`,
  };
}

export default async function RegaloPage({ params }: PageProps) {
  const regalo = await getRegalo(params.codigo);
  if (!regalo) notFound();

  return <PresentacionRegalo regalo={regalo} />;
}
