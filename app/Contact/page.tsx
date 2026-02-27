"use client";
import { useState } from "react";

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600";

const TYPES = [
  { value: "feedback", label: "Feedback general" },
  { value: "bug", label: "Reportar un problema" },
  { value: "suggestion", label: "Sugerencia" },
  { value: "other", label: "Otro" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError("");
  //     try {
  //       // Replace with your actual contact endpoint
  //       await new Promise((res) => setTimeout(res, 1200));
  //       setSuccess(true);
  //       setName("");
  //       setEmail("");
  //       setMessage("");
  //       setType("feedback");
  //     } catch {
  //       setError("No se pudo enviar el mensaje. Intentá de nuevo.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      {/* Fondo fijo detrás de TODO (header incluido) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      />
      {/* Overlay blur */}
      <div className="fixed inset-0 -z-10 backdrop-blur-sm bg-white/20" />
      <main className="min-h-screen px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-10 md:p-14">
              {/* Header */}
              <div className="mb-10">
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Contactanos
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Tu opinión nos ayuda a mejorar. Contanos qué pensás o qué
                  problema tuviste.
                </p>
              </div>

              {success ? (
                /* Success state */
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-900/20 mb-5">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    ¡Mensaje enviado!
                  </h2>
                  <p className="text-sm text-gray-400 mb-8 max-w-xs">
                    Gracias por escribirnos. Te responderemos a la brevedad
                    posible.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-gray-100 border border-gray-200 text-gray-700 rounded-2xl px-6 py-2.5 text-sm font-medium hover:bg-gray-200 transition-all shadow-sm"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Tu nombre"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="tu@email.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Type selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Tipo de mensaje
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TYPES.map((t) => (
                        <button
                          type="button"
                          key={t.value}
                          onClick={() => setType(t.value)}
                          className={`py-2.5 px-3 rounded-2xl text-xs font-medium border transition-all duration-150 shadow-sm ${
                            type === t.value
                              ? "bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/15"
                              : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Mensaje
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="Contanos qué pasó o qué pensás..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm resize-none"
                    />
                    <p className="text-xs text-gray-300 mt-1.5 text-right">
                      {message.length} caracteres
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-red-500">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white rounded-2xl py-3.5 text-sm font-medium tracking-wide shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-gray-900/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Depth layers */}
          <div className="h-2 mx-6 bg-gray-200 rounded-b-3xl shadow-md opacity-60" />
          <div className="h-1.5 mx-10 bg-gray-100 rounded-b-3xl shadow opacity-40" />
        </div>
      </main>
    </>
  );
}
