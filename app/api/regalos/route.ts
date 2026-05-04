import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { generarCodigo } from "@/lib/utils";

type FotoJson = {
  foto_url: string;
  frase?: string;
  orden: number;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceClient();
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      const {
        codigo,
        nombre_mama,
        mensaje_general,
        tipo_presentacion,
        cancion_url,
        fotos,
      } = body as {
        codigo: string;
        nombre_mama: string;
        mensaje_general?: string;
        tipo_presentacion?: string;
        cancion_url?: string | null;
        fotos: FotoJson[];
      };

      if (!codigo || !nombre_mama) {
        return NextResponse.json({ error: "Faltan datos obligatorios." }, { status: 400 });
      }

      if (!Array.isArray(fotos) || fotos.length === 0) {
        return NextResponse.json({ error: "Debes agregar al menos una foto." }, { status: 400 });
      }

      const { data: regalo, error: regaloError } = await supabase
        .from("regalos")
        .insert({
          codigo,
          nombre_mama,
          mensaje_general: mensaje_general || null,
          tipo_presentacion: tipo_presentacion || "romantica",
          cancion_url: cancion_url || null,
        })
        .select()
        .single();

      if (regaloError) throw new Error(regaloError.message);

      const fotosInsert = fotos.map((foto, index) => ({
        regalo_id: regalo.id,
        foto_url: foto.foto_url,
        frase: foto.frase || "",
        orden: typeof foto.orden === "number" ? foto.orden : index,
      }));

      const { error: fotosError } = await supabase.from("fotos").insert(fotosInsert);
      if (fotosError) {
        await supabase.from("regalos").delete().eq("id", regalo.id);
        throw new Error(fotosError.message);
      }

      return NextResponse.json({ codigo, id: regalo.id });
    }

    const formData = await request.formData();

    const nombre_mama = formData.get("nombre_mama") as string;
    const mensaje_general = formData.get("mensaje_general") as string;
    const tipo_presentacion = formData.get("tipo_presentacion") as string;
    const totalFotos = parseInt(formData.get("total_fotos") as string, 10);
    const cancionFile = formData.get("cancion") as File | null;

    if (!nombre_mama) {
      return NextResponse.json({ error: "El nombre de mamá es obligatorio." }, { status: 400 });
    }

    // Generar código único
    let codigo = generarCodigo();
    // Verificar unicidad
    let intentos = 0;
    while (intentos < 5) {
      const { data: existe } = await supabase
        .from("regalos")
        .select("id")
        .eq("codigo", codigo)
        .single();
      if (!existe) break;
      codigo = generarCodigo();
      intentos++;
    }

    // Subir canción
    let cancion_url: string | null = null;
    if (cancionFile && cancionFile.size > 0) {
      const ext = cancionFile.name.split(".").pop();
      const path = `${codigo}/cancion.${ext}`;
      const bytes = await cancionFile.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from("canciones-regalos")
        .upload(path, bytes, { contentType: cancionFile.type, upsert: true });

      if (uploadError) throw new Error(`Error al subir canción: ${uploadError.message}`);

      const { data: urlData } = supabase.storage
        .from("canciones-regalos")
        .getPublicUrl(path);
      cancion_url = urlData.publicUrl;
    }

    // Crear regalo
    const { data: regalo, error: regaloError } = await supabase
      .from("regalos")
      .insert({
        codigo,
        nombre_mama,
        mensaje_general: mensaje_general || null,
        tipo_presentacion: tipo_presentacion || "romantica",
        cancion_url,
      })
      .select()
      .single();

    if (regaloError) throw new Error(regaloError.message);

    // Subir fotos
    const fotosInsert = [];
    for (let i = 0; i < totalFotos; i++) {
      const fotoFile = formData.get(`foto_${i}`) as File | null;
      const frase = (formData.get(`frase_${i}`) as string) || "";

      if (!fotoFile || fotoFile.size === 0) continue;

      const ext = fotoFile.name.split(".").pop();
      const path = `${codigo}/foto_${i}.${ext}`;
      const bytes = await fotoFile.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from("imagenes-regalos")
        .upload(path, bytes, { contentType: fotoFile.type, upsert: true });

      if (uploadError) throw new Error(`Error al subir foto ${i + 1}: ${uploadError.message}`);

      const { data: urlData } = supabase.storage
        .from("imagenes-regalos")
        .getPublicUrl(path);

      fotosInsert.push({
        regalo_id: regalo.id,
        foto_url: urlData.publicUrl,
        frase,
        orden: i,
      });
    }

    if (fotosInsert.length === 0) {
      // Rollback: eliminar regalo
      await supabase.from("regalos").delete().eq("id", regalo.id);
      return NextResponse.json({ error: "Debes agregar al menos una foto." }, { status: 400 });
    }

    const { error: fotosError } = await supabase.from("fotos").insert(fotosInsert);
    if (fotosError) throw new Error(fotosError.message);

    return NextResponse.json({ codigo, id: regalo.id });
  } catch (err: unknown) {
    console.error("Error en API /regalos:", err);
    const msg = err instanceof Error ? err.message : "Error interno del servidor";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
