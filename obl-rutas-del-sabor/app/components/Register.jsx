"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600";

const BASE_URL = "https://api-react-taller-production.up.railway.app/api/";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, password }),
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      console.log("Registration successful:", data);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      setError("El registro falló. Por favor intentá de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fondo fijo detrás de TODO (header incluido) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      />
      {/* Overlay blur */}
      <div className="fixed inset-0 -z-10 backdrop-blur-sm bg-white/20" />

      <div className="min-h-screen flex items-center justify-center p-6">
        {/* Outer card — base shadow layer */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
            {/* Inner card — second layer */}
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl mb-5 flex items-center justify-center shadow-lg shadow-gray-900/20">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Crear cuenta
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Completá los datos para comenzar
                </p>
              </div>

              {/* Form */}
              <form onSubmit={register} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Usuario
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="nombre de usuario"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="nombre completo"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 pr-12 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-xl"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? (
                        <svg
                          className="w-4.5 h-4.5 w-[18px] h-[18px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-[18px] h-[18px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-red-500">
                    {error}
                  </div>
                )}

                {/* Success message */}
                {success && (
                  <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 text-sm text-green-600">
                    ¡Cuenta creada exitosamente!
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white rounded-2xl py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-gray-900/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? "Creando cuenta..." : "Crear cuenta"}
                </button>
              </form>

              {/* Footer link */}
              <p className="text-center text-sm text-gray-400 mt-6">
                ¿Ya tenés una cuenta?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-gray-900 font-medium hover:underline underline-offset-2"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </div>

          {/* Decorative bottom shadow layer for depth */}
          <div className="h-2 mx-6 bg-gray-200 rounded-b-3xl shadow-md opacity-60" />
          <div className="h-1.5 mx-10 bg-gray-100 rounded-b-3xl shadow opacity-40" />
        </div>
      </div>
    </>
  );
}
