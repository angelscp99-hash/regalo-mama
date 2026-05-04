import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

interface FotoPayload {
  id?: string;
  url?: string;
  frase: string;
  orden: number;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const supabase = createServiceClient();
    const { codigo } = params;
    const body = await request.json();

    const { nombre_mama, mensaje_general, tipo_presentacion, cancion_url, ids_eliminar, fotos } = body as {
      nombre_mama: string;
      mensaje_general?: string;
      tipo_presentacion: string;
      cancion_url?: string;
      ids_eliminar: string[];
      fotos: FotoPayload[];
    };

    // Obtener regalo
    const { data: regalo, error: regaloError } = await supabase
      .from("regalos")
      .select("id, cancion_url")
      .eq("codigo", codigo)
      .single();

    if (regaloError || !regalo) {
      return NextResponse.json({ error: "Regalo no encontrado." }, { status: 404 });
    }

    // Actualizar datos del regalo
    const updateData: Record<string, unknown> = {
      nombre_mama,
      mensaje_general: mensaje_general || null,
      tipo_presentacion,
      updated_at: new Date().toISOString(),
    };

    if (cancion_url !== undefined) {
      updateData.cancion_url = cancion_url;
    }

    const { error: updateError } = await supabase
      .from("regalos")
      .update(updateData)
      .eq("id", regalo.id);
    if (updateError) throw new Error(updateError.message);

    // Eliminar fotos marcadas
    if (ids_eliminar && ids_eliminar.length > 0) {
      await supabase.from("fotos").delete().in("id", ids_eliminar);
    }

    // Actualizar frases de fotos existentes e insertar fotos nuevas
    for (const foto of fotos) {
      if (foto.id) {
        await supabase
          .from("fotos")
          .update({ frase: foto.frase, orden: foto.orden })
          .eq("id", foto.id);
      } else if (foto.url) {
        await supabase.from("fotos").insert({
          regalo_id: regalo.id,
          foto_url: foto.url,
          frase: foto.frase || "",
          orden: foto.orden,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
