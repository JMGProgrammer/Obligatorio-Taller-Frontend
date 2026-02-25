"use client";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Acerca de", href: "/About" },
  { label: "Contacto", href: "/Contact" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-gray-100 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/70 px-1 py-1">
          <div className="bg-white rounded-[14px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] px-5 py-3 flex items-center justify-between">
            {/* Left: Logo + Nav links */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/20 group-hover:shadow-gray-900/50 transition-shadow">
                  <svg
                    className="w-4 h-4 text-white"
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
                <span className="text-lg font-semibold text-gray-900 tracking-tight">
                  Rutas del Sabor
                </span>
              </button>

              {/* Nav links */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <button
                      key={link.href}
                      onClick={() => router.push(link.href)}
                      className={`px-3.5 py-2 rounded-xl text-sm transition-all duration-150 ${
                        active
                          ? "bg-gray-100 text-gray-900 font-medium shadow-sm"
                          : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right: Auth buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/login")}
                className="hidden sm:block px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150 font-medium"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-gray-900 text-white rounded-xl px-4 py-2 text-sm font-medium shadow-md shadow-gray-900/15 hover:bg-gray-800 hover:shadow-gray-900/25 active:scale-[0.97] transition-all duration-150"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
