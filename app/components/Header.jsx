"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Acerca de", href: "/About" },
  { label: "Contacto", href: "/Contact" },
  { label: "Locales y Platillos", href: "/Dashboard" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-200/70 px-1 py-1">
          <div className="bg-white/30 backdrop-blur-md rounded-[14px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] px-5 py-3 flex items-center justify-between">
            {/* Left: Logo + Nav links */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/20 group-hover:shadow-gray-900/30 transition-shadow">
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
                <span className="text-sm font-semibold text-gray-900 tracking-tight">
                  MyApp
                </span>
              </button>

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

            {/* Right: Auth area */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-1">
                  {/* Account icon */}
                  <button
                    onClick={() => router.push("/ProfilePage")}
                    title="Mi cuenta"
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 shadow-sm border ${
                      pathname === "/ProfilePage"
                        ? "bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/15"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900 hover:shadow-md"
                    }`}
                  >
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                  {/* Logout icon */}
                  <button
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-white text-gray-400 border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all duration-150 shadow-sm hover:shadow-md"
                  >
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
