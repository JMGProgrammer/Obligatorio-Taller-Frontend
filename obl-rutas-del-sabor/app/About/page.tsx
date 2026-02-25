"use client";
import { useState } from "react";

const IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    alt: "Equipo trabajando",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    alt: "Oficina moderna",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    alt: "Colaboración",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80",
    alt: "Reunión de equipo",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    alt: "Trabajo en equipo",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    alt: "Brainstorming",
  },
];

const STATS = [
  { value: "2020", label: "Fundada" },
  { value: "10k+", label: "Usuarios" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Valoración" },
];

const VALUES = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Seguridad primero",
    desc: "Tus datos están protegidos con los más altos estándares de la industria.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Rendimiento",
    desc: "Construido para ser rápido desde el primer día, sin sacrificar la calidad.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Comunidad",
    desc: "Un ecosistema de usuarios que crecen juntos y se apoyan mutuamente.",
  },
];

export default function AboutPage() {
  const [current, setCurrent] = useState(0);
  const total = IMAGES.length;
  const visible = 3;
  const maxIndex = total - visible;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Info card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
          <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-10 md:p-14">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <span className="w-2 h-2 bg-gray-900 rounded-full" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Quiénes somos
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
                Construimos herramientas
                <br />
                <span className="text-gray-400">que importan de verdad.</span>
              </h1>

              <p className="text-gray-500 text-base leading-relaxed mb-4">
                Somos un equipo pequeño con una visión grande. Desde 2020
                trabajamos para crear una plataforma que simplifique el día a
                día de personas y equipos, sin curvas de aprendizaje
                innecesarias ni complejidades que no agregan valor.
              </p>
              <p className="text-gray-400 text-base leading-relaxed mb-10">
                Creemos que la tecnología debería desaparecer en el fondo y
                dejar que las personas hagan lo que mejor saben hacer. Por eso
                cada decisión de diseño empieza por la misma pregunta: ¿esto le
                hace la vida más fácil al usuario?
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm"
                  >
                    <p className="text-xl font-semibold text-gray-900">
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
          <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8 md:p-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-tight">
              Nuestros valores
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white mb-4 shadow-md shadow-gray-900/15">
                    {v.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
          <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8 md:p-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                Nuestro espacio
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-xs text-gray-400 tabular-nums w-12 text-center">
                  {current + 1} / {maxIndex + 1}
                </span>
                <button
                  onClick={next}
                  disabled={current === maxIndex}
                  className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Carousel track */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(calc(-${current} * (33.333% + 5.5px)))`,
                }}
              >
                {IMAGES.map((img) => (
                  <div
                    key={img.id}
                    className="min-w-[calc(33.333%-11px)] aspect-video rounded-2xl overflow-hidden shadow-md shadow-gray-200/60 flex-shrink-0"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 mt-5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-gray-900" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative depth layers */}
        <div className="h-2 mx-6 bg-gray-200 rounded-b-3xl opacity-50" />
        <div className="h-1.5 mx-10 bg-gray-100 rounded-b-3xl opacity-30" />
      </div>
    </main>
  );
}
