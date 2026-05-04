"use client";

import { useEffect, useRef, useState } from "react";
import { RegaloConFotos } from "@/types/regalo";
import SlideFoto from "./SlideFoto";
import BotonWhatsapp from "./BotonWhatsapp";
import { getRegaloUrl } from "@/lib/utils";

interface PresentacionRegaloProps {
  regalo: RegaloConFotos;
}

function serializarParaScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function escaparHtml(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nombreArchivoSeguro(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function generarHtmlDescargable(regalo: RegaloConFotos) {
  const data = {
    nombreMama: regalo.nombre_mama,
    mensajeGeneral: regalo.mensaje_general || "",
    cancionUrl: regalo.cancion_url,
    tipo: regalo.tipo_presentacion,
    fotos: [...regalo.fotos]
      .sort((a, b) => a.orden - b.orden)
      .map((foto) => ({
        url: foto.foto_url,
        frase: foto.frase,
      })),
  };

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Regalo para ${escaparHtml(data.nombreMama)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Lato:wght@400;700&family=Great+Vibes&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;font-family:Lato,system-ui,sans-serif;background:#fde8ee;color:#fff}button{font:inherit}
.app{position:relative;width:100vw;height:100vh;overflow:hidden;background:#fde8ee}.intro,.slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:28px}.intro{z-index:5;background:linear-gradient(135deg,#fde8ee,#f9dde5,#fce7f3);color:#7f1d3a}.intro h1{font-family:"Great Vibes",cursive;font-size:64px;margin:0 0 12px}.intro h2{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:34px;margin:0 0 18px}.intro p{max-width:520px;margin:0 auto 28px;line-height:1.6}.start{border:0;border-radius:999px;background:#c4627a;color:white;padding:15px 28px;font-weight:700;box-shadow:0 12px 32px rgba(196,98,122,.35);cursor:pointer}
.slide{opacity:0;transition:opacity .8s ease;background:#111}.slide.active{opacity:1}.slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.slide::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.76),rgba(0,0,0,.14),rgba(0,0,0,.35))}.frase{position:relative;z-index:2;align-self:flex-end;margin-bottom:74px;max-width:780px;font-family:"Cormorant Garamond",serif;font-style:italic;font-size:clamp(26px,5vw,52px);line-height:1.08;text-shadow:0 3px 20px rgba(0,0,0,.55)}
.top{position:absolute;z-index:3;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:22px;background:linear-gradient(to bottom,rgba(0,0,0,.4),transparent)}.brand{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:24px}.audio{border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.15);color:white;border-radius:999px;padding:8px 12px;cursor:pointer}
.nav{position:absolute;z-index:3;top:50%;transform:translateY(-50%);width:46px;height:46px;border:0;border-radius:999px;background:rgba(255,255,255,.18);color:white;font-size:30px;cursor:pointer;backdrop-filter:blur(8px)}.prev{left:16px}.next{right:16px}.dots{position:absolute;z-index:3;left:0;right:0;bottom:28px;display:flex;justify-content:center;gap:9px}.dot{width:8px;height:8px;border-radius:99px;background:rgba(255,255,255,.45)}.dot.active{width:24px;background:white}.petal{position:absolute;z-index:1;top:-30px;color:rgba(255,255,255,.6);animation:fall 8s linear infinite;pointer-events:none}@keyframes fall{to{transform:translateY(110vh) rotate(240deg)}}@media(max-width:640px){.intro h1{font-size:48px}.intro h2{font-size:28px}.frase{margin-inline:26px}.top{padding:18px 16px}.brand{font-size:20px}}
</style>
</head>
<body>
<div id="app" class="app"></div>
<script>
const regalo=${serializarParaScript(data)};
let actual=0;
let iniciado=false;
let timer=null;
let audio=null;
const app=document.getElementById("app");
function esc(v){return String(v||"").replace(/[&<>"']/g,function(c){return c==="&"?"&amp;":c==="<"?"&lt;":c===">"?"&gt;":c==='"'?"&quot;":"&#39;"})}
function petalos(){return Array.from({length:12},(_,i)=>'<span class="petal" style="left:'+((i*17)%100)+'%;animation-delay:'+(i*.7)+'s">🌸</span>').join("")}
function renderIntro(){app.innerHTML='<div class="intro">'+petalos()+'<div><h1>¡Gran Feliz Día Mamá!</h1><h2>Para '+esc(regalo.nombreMama)+'</h2><p>'+esc(regalo.mensajeGeneral)+'</p><button class="start" onclick="iniciar()">Presiona para continuar</button></div></div>'}
function renderSlides(){app.innerHTML='<div class="top"><div class="brand">Para '+esc(regalo.nombreMama)+'</div>'+(regalo.cancionUrl?'<button class="audio" onclick="toggleAudio()">Música</button>':'')+'</div>'+regalo.fotos.map((f,i)=>'<section class="slide '+(i===actual?'active':'')+'"><img src="'+esc(f.url)+'" alt=""><div class="frase">'+esc(f.frase)+'</div></section>').join("")+(regalo.fotos.length>1?'<button class="nav prev" onclick="mover(-1)">‹</button><button class="nav next" onclick="mover(1)">›</button>':'')+'<div class="dots">'+regalo.fotos.map((_,i)=>'<span class="dot '+(i===actual?'active':'')+'"></span>').join("")+'</div>'}
function iniciar(){iniciado=true;if(regalo.cancionUrl){audio=new Audio(regalo.cancionUrl);audio.loop=true;audio.play().catch(()=>{})}renderSlides();timer=setInterval(()=>mover(1),6000)}
function mover(dir){actual=(actual+dir+regalo.fotos.length)%regalo.fotos.length;renderSlides()}
function toggleAudio(){if(!audio)return;if(audio.paused)audio.play().catch(()=>{});else audio.pause()}
renderIntro();
</script>
</body>
</html>`;
}

export default function PresentacionRegalo({ regalo }: PresentacionRegaloProps) {
  const [iniciado, setIniciado] = useState(false);
  const [slideActual, setSlideActual] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [mostrarControles, setMostrarControles] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const fotos = regalo.fotos.sort((a, b) => a.orden - b.orden);
  const tipo = regalo.tipo_presentacion;

  const iniciar = async () => {
    setIniciado(true);
    if (audioRef.current && regalo.cancion_url) {
      try {
        await audioRef.current.play()
        setReproduciendo(true);
      } catch (e) {
        console.log("Audio bloqueado por el navegador:", e);
      }
    }
    // Empieza el carrusel automático
    timerRef.current = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % fotos.length);
    }, 6000);
  };

  const toggleMusica = async () => {
    if (!audioRef.current) return;
    if (reproduciendo) {
      audioRef.current.pause();
      setReproduciendo(false);
    } else {
      await audioRef.current.play();
      setReproduciendo(true);
    }
  };

  const irASlide = (idx: number) => {
    setSlideActual(idx);
    // Reset timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % fotos.length);
    }, 6000);
  };

  const slideAnterior = () => irASlide((slideActual - 1 + fotos.length) % fotos.length);
  const slideSiguiente = () => irASlide((slideActual + 1) % fotos.length);

  const descargarHtml = () => {
    const html = generarHtmlDescargable(regalo);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const nombre = nombreArchivoSeguro(regalo.nombre_mama) || "mama";

    link.href = href;
    link.download = `regalo-${nombre}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(href);
  };

  // Ocultar controles automáticamente
  const mostrarControlesToucando = () => {
    setMostrarControles(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setMostrarControles(false), 4000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, []);

  const url = getRegaloUrl(regalo.codigo);

  // ─── PANTALLA DE INICIO ────────────────────────────────────────────────────
  if (!iniciado) {
    return (
      <>
        {regalo.cancion_url && (
          <audio ref={audioRef} src={regalo.cancion_url} loop preload="auto" />
        )}
        <PantallaInicio regalo={regalo} tipo={tipo} onIniciar={iniciar} />
      </>
    );
  }

  // ─── PRESENTACIÓN ────────────────────────────────────────────────────────
  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      onClick={mostrarControlesToucando}
      onTouchStart={mostrarControlesToucando}
      style={{
        background: tipo === "cinematica"
          ? "#0a0a0f"
          : tipo === "elegante"
          ? "#fdf8f2"
          : "#fde8ee",
      }}
    >
      {/* Audio */}
      {regalo.cancion_url && (
        <audio ref={audioRef} src={regalo.cancion_url} loop preload="auto" />
      )}

      {/* Slides */}
      <div className="absolute inset-0">
        {fotos.map((foto, idx) => (
          <SlideFoto
            key={foto.id}
            fotoUrl={foto.foto_url}
            frase={foto.frase}
            orden={idx}
            total={fotos.length}
            tipo={tipo}
            visible={idx === slideActual}
          />
        ))}
      </div>

      {/* Controles - aparecen al tocar */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: mostrarControles ? 1 : 0 }}
      >
        {/* Barra superior */}
        <div
          className="absolute top-0 left-0 right-0 px-5 pt-safe-top pt-10 pb-4 flex items-center justify-between pointer-events-auto"
          style={{
            background:
              tipo === "cinematica"
                ? "transparent"
                : "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
          }}
        >
          <span
            className={`font-display text-lg italic ${tipo === "elegante" ? "text-rose-800" : "text-white"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Para {regalo.nombre_mama}
          </span>

          {regalo.cancion_url && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleMusica(); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                tipo === "elegante"
                  ? "bg-yellow-100/80 text-yellow-800 border border-yellow-300"
                  : "bg-white/15 backdrop-blur text-white"
              }`}
            >
              {reproduciendo ? "⏸" : "▶"} Música
            </button>
          )}
        </div>

        {/* Flechas laterales */}
        {fotos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); slideAnterior(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto transition-all"
              style={{
                background: tipo === "elegante" ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className={tipo === "elegante" ? "text-yellow-700" : "text-white"}>‹</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); slideSiguiente(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto transition-all"
              style={{
                background: tipo === "elegante" ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className={tipo === "elegante" ? "text-yellow-700" : "text-white"}>›</span>
            </button>
          </>
        )}

        {/* Barra inferior con acciones */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
          <BotonWhatsapp codigo={regalo.codigo} nombreMama={regalo.nombre_mama} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              descargarHtml();
            }}
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Descargar HTML
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PANTALLA DE INICIO ─────────────────────────────────────────────────────
function PantallaInicio({
  regalo,
  tipo,
  onIniciar,
}: {
  regalo: RegaloConFotos;
  tipo: string;
  onIniciar: () => void;
}) {
  const esCinematica = tipo === "cinematica";
  const esElegante = tipo === "elegante";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: esCinematica
          ? "linear-gradient(135deg, #0a0a0f 0%, #1a1028 50%, #0a0a0f 100%)"
          : esElegante
          ? "linear-gradient(135deg, #fdf8f2 0%, #f5eedd 50%, #fdf8f2 100%)"
          : "linear-gradient(135deg, #fde8ee 0%, #f9dde5 50%, #fce7f3 100%)",
      }}
    >
      {/* Decoración */}
      {esCinematica ? (
        <div className="absolute inset-0 pointer-events-none">
          {["✦", "✧", "✦", "✧"].map((star, i) => (
            <span
              key={i}
              className="absolute text-yellow-400/20 animate-pulse"
              style={{ top: `${20 + i * 20}%`, left: `${10 + i * 25}%`, fontSize: `${12 + i * 4}px` }}
            >
              {star}
            </span>
          ))}
        </div>
      ) : esElegante ? (
        <div className="absolute inset-4 rounded-xl border border-yellow-600/20 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 pointer-events-none">
          {["🌸", "💕", "🌺"].map((e, i) => (
            <span
              key={i}
              className="absolute text-4xl opacity-10 animar-flotar"
              style={{ top: `${15 + i * 30}%`, right: `${5 + i * 5}%`, animationDelay: `${i}s` }}
            >
              {e}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 text-center max-w-sm mx-auto animar-entrada">
        {/* Emoji decorativo */}
        <div className="text-6xl mb-6 animar-flotar">
          {esCinematica ? "🎬" : esElegante ? "✨" : "💝"}
        </div>

        {/* Subtítulo */}
        <p
          className={`text-sm uppercase tracking-widest mb-4 ${
            esCinematica ? "text-yellow-400/70" : esElegante ? "text-yellow-700/60" : "text-rose-400"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {esCinematica ? "✦ Un mensaje especial ✦" : esElegante ? "✦ Con todo mi amor ✦" : "✦ Especialmente para ti ✦"}
        </p>

        {/* Nombre */}
        <h1
          className={`text-4xl md:text-5xl mb-4 ${
            esCinematica ? "text-white" : esElegante ? "text-rose-900" : "text-rose-800"
          }`}
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          {regalo.nombre_mama}
        </h1>

        {/* Mensaje general */}
        {regalo.mensaje_general && (
          <p
            className={`text-base leading-relaxed mb-8 ${
              esCinematica ? "text-white/70" : esElegante ? "text-rose-700/80" : "text-rose-700"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {regalo.mensaje_general}
          </p>
        )}

        {/* Script decorativo */}
        <p
          className={`text-3xl mb-10 ${esCinematica ? "text-yellow-300" : ""}`}
          style={{
            fontFamily: "var(--font-script)",
            color: esCinematica ? undefined : "var(--dorado)",
          }}
        >
          Con todo mi amor
        </p>

        {/* Botón toca para comenzar */}
        <div
          onClick={onIniciar}
          className={`inline-flex flex-col items-center gap-2 px-10 py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
            esCinematica
              ? "border border-yellow-400/50 text-yellow-400"
              : esElegante
              ? "border border-yellow-600/40 text-yellow-800"
              : "bg-rose-500 text-white shadow-lg shadow-rose-300/40"
          }`}
          style={esCinematica || esElegante ? { backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.05)" } : {}}
        >
          <span className="text-2xl animate-pulse">▶</span>
          <span className="text-sm font-medium tracking-wide">Toca para comenzar</span>
        </div>

        <p className={`mt-4 text-xs ${esCinematica ? "text-white/40" : "text-rose-400/60"}`}>
          {regalo.fotos.length} foto{regalo.fotos.length !== 1 ? "s" : ""} · La música comenzará al tocar
        </p>
      </div>
    </div>
  );
}
