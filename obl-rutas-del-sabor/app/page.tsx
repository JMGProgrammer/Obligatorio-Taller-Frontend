"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="flex items-center justify-center px-6 py-24 md:py-36">
        <div className="w-full max-w-4xl">
          {/* Card stack effect */}
          <div className="relative">
            {/* Decorative layers behind */}
            <div className="absolute inset-0 translate-y-4 mx-8 bg-gray-200 rounded-3xl opacity-50" />
            <div className="absolute inset-0 translate-y-2 mx-4 bg-gray-100 rounded-3xl shadow-lg opacity-70" />

            {/* Main hero card */}
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
              <div className="bg-white rounded-[22px] shadow-[inset_0_2px_12px_rgba(0,0,0,0.04)] px-10 py-16 md:px-20 md:py-24 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
                  <span className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    Bienvenido
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
                  Una necesidad,
                  <br />
                  <span className="text-gray-400">mil sabores.</span>
                </h1>

                {/* Subheadline */}
                <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
                  Accedé a todos los locales que quieras desde la palma de tu
                  mano, vívelo, sin complicaciones.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => router.push("/register")}
                    className="w-full sm:w-auto bg-gray-900 text-white rounded-2xl px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-gray-900/30 active:scale-[0.98] transition-all duration-200"
                  >
                    Comenzá ahora
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 rounded-2xl px-8 py-3.5 text-sm font-medium tracking-wide shadow-sm hover:border-gray-400 hover:shadow-md active:scale-[0.98] transition-all duration-200"
                  >
                    Ya tengo cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats / trust row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { value: "100%", label: "Seguro" },
              { value: "24/7", label: "Disponible" },
              { value: "Sin costos", label: "Para empezar" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-md shadow-gray-200/60 p-4 text-center border border-gray-100"
              >
                <p className="text-lg font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
