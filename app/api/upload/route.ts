import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceClient();
    const formData = await request.formData();

    const archivo = formData.get("archivo") as File;
    const bucket = formData.get("bucket") as string;
    const path = formData.get("path") as string;

    if (!archivo || !bucket || !path) {
      return NextResponse.json({ error: "Faltan parámetros." }, { status: 400 });
    }

    const bytes = await archivo.arrayBuffer();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, bytes, { contentType: archivo.type, upsert: true });

    if (error) throw new Error(error.message);

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error al subir archivo";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
