"use client";
import { useRouter } from "next/navigation";

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1 w-full max-w-md">
        <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] px-8 py-10 flex flex-col items-center text-center gap-6">
          {/* Meme icon area */}
          <div className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
              🚫
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-sm shadow-md">
              🔒
            </div>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">
              Acceso denegado
            </span>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight leading-snug">
              Error al redirigir,
              <br />
              <span className="text-gray-400">Página no encontrada.</span>
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Necesitás estar logueado para ver esto. <br />
              Qué hacés acá sin cuenta, wacho? 👀
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-100" />

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => router.push("/login")}
              className="flex-1 bg-gray-900 text-white rounded-2xl px-4 py-3 text-sm font-medium shadow-md shadow-gray-900/15 hover:bg-gray-800 hover:shadow-gray-900/25 active:scale-[0.97] transition-all duration-150"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => router.push("/register")}
              className="flex-1 bg-white text-gray-700 rounded-2xl px-4 py-3 text-sm font-medium border border-gray-200 hover:border-gray-400 hover:text-gray-900 hover:shadow-md shadow-sm active:scale-[0.97] transition-all duration-150"
            >
              Registrarse
            </button>
          </div>

          {/* Back link */}
          <button
            onClick={() => router.push("/")}
            className="text-xs text-gray-300 hover:text-gray-500 underline underline-offset-2 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
