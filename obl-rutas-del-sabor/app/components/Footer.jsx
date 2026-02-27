export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white/30 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-200/70 px-1 py-1">
          <div className="bg-white/30 rounded-[14px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Rutas del Sabor
                </span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-5">
                {["Términos", "Privacidad", "Soporte"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-xs text-gray-600">
                © {year} Rutas del Sabor. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
