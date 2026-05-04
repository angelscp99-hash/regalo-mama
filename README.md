# 💝 Regalo Mamá

Plataforma web para crear presentaciones personalizadas del Día de la Madre con fotos, frases, música y enlace compartible por WhatsApp.

## Stack

- **Next.js 14** con App Router
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (base de datos + storage)
- **Vercel** (despliegue)

---

## 🚀 Instalación local

```bash
git clone https://github.com/tu-usuario/regalo-mama.git
cd regalo-mama
npm install
cp .env.example .env.local
# Edita .env.local con tus variables
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Configurar Supabase

### 1. Crear proyecto

Ve a [supabase.com](https://supabase.com) → New Project.

### 2. SQL de tablas

Ejecuta en **SQL Editor**:

```sql
-- Tabla de regalos
CREATE TABLE regalos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT UNIQUE NOT NULL,
  nombre_mama TEXT NOT NULL,
  mensaje_general TEXT,
  cancion_url TEXT,
  tipo_presentacion TEXT NOT NULL DEFAULT 'romantica',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de fotos
CREATE TABLE fotos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regalo_id UUID NOT NULL REFERENCES regalos(id) ON DELETE CASCADE,
  foto_url TEXT NOT NULL,
  frase TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_regalos_codigo ON regalos(codigo);
CREATE INDEX idx_fotos_regalo_id ON fotos(regalo_id);
CREATE INDEX idx_fotos_orden ON fotos(orden);
```

### 3. Crear buckets de Storage

En **Storage → New bucket** crea:

| Bucket | Público |
|---|---|
| `imagenes-regalos` | ✅ Sí |
| `canciones-regalos` | ✅ Sí |

### 4. Políticas de Storage (RLS)

Para cada bucket, en **Policies → New policy → For full customization**:

```sql
-- SELECT (lectura pública)
CREATE POLICY "Lectura pública" ON storage.objects
FOR SELECT USING (bucket_id IN ('imagenes-regalos', 'canciones-regalos'));

-- INSERT (solo desde el servidor con service role)
CREATE POLICY "Subida desde servidor" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'service_role');
```

---

## 🔑 Variables de entorno

Copia `.env.example` a `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Encuentra las claves en: **Project Settings → API**.

---

## 🌐 Despliegue en Vercel

1. Sube el código a GitHub
2. Ve a [vercel.com](https://vercel.com) → Import Project
3. Agrega las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` ← usa tu dominio de Vercel
4. Deploy

---

## 📁 Estructura del proyecto

```
regalo-mama/
├── app/
│   ├── page.tsx              # Página de inicio
│   ├── crear/page.tsx        # Formulario de creación
│   ├── regalo/[codigo]/      # Presentación del regalo
│   ├── editar/[codigo]/      # Edición del regalo
│   └── api/
│       ├── regalos/          # POST crear, PATCH editar
│       └── upload/           # Subida de archivos
├── components/
│   ├── FormularioRegalo.tsx  # Formulario principal
│   ├── PresentacionRegalo.tsx# Presentación con 3 estilos
│   ├── SlideFoto.tsx         # Slides individuales
│   ├── VistaPrevia.tsx       # Preview en el formulario
│   ├── BotonWhatsapp.tsx     # Botón compartir
│   ├── ReproductorMusica.tsx # Control de audio
│   └── LayoutPrincipal.tsx   # Layout con nav/footer
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   ├── utils.ts              # Utilidades (código, URLs)
│   ├── frases.ts             # Banco de 30 frases
│   └── validations.ts        # Validaciones de archivos
├── types/
│   └── regalo.ts             # Tipos TypeScript
└── styles/
    └── globals.css           # Estilos globales + fuentes
```

---

## 🎨 Tipos de presentación

| Estilo | Descripción |
|---|---|
| 🌸 Romántica | Fondo rosa suave, marcos blancos, pétalos flotantes |
| 🎬 Cinemática | Fondo oscuro, barras de cine, texto grande dorado |
| ✨ Elegante | Marfil clásico, marcos dorados, tipografía serif |

---

## 📱 Notas importantes

- La música **no se reproduce automáticamente** en móviles (restricción del navegador). Comienza al primer toque del usuario.
- Los códigos son de 10 caracteres alfanuméricos generados con UUID para dificultar la adivinanza.
- Las claves privadas de Supabase solo se usan en API routes (server-side).

---

## 🛠 Comandos útiles

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run lint     # Linting
```

---

Hecho con 💗 para las mamás del mundo.
