"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600";

const BASE_URL = "https://api-react-taller-production.up.railway.app/api";

const TYPE_LABELS: Record<string, string> = {
  RESTAURANTE: "Restaurante",
  CAFETERIA: "Cafetería",
  BAR: "Bar",
  FOOD_TRUCK: "Food Truck",
  OTROS: "Otros",
};
const CATEGORY_LABELS: Record<string, string> = {
  ENTRADA: "Entrada",
  PRINCIPAL: "Principal",
  POSTRE: "Postre",
  BEBIDA: "Bebida",
  OTROS: "Otros",
};
const CATEGORY_ICONS: Record<string, string> = {
  ENTRADA: "🥗",
  PRINCIPAL: "🍖",
  POSTRE: "🍰",
  BEBIDA: "🥤",
  OTROS: "🍴",
};

function StarRating({ rating }: { rating: number }) {
  if (rating == null) return null;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-gray-900" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function UserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"locals" | "dishes">("locals");

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/users/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError("No se pudo cargar el perfil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading)
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </main>
    );

  if (error || !userData)
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <p className="text-4xl mb-4">👤</p>
          <p className="text-sm text-red-400 mb-4">
            {error || "Usuario no encontrado"}
          </p>
          <button
            onClick={() => router.back()}
            className="text-xs text-white underline"
          >
            Volver
          </button>
        </div>
      </main>
    );

  const user = userData.item ?? userData;
  const locals: any[] = userData.locals ?? user.locals ?? [];
  const dishes: any[] = userData.dishes ?? user.dishes ?? [];

  const initials = (user.name?.[0] ?? user.username?.[0] ?? "?").toUpperCase();

  return (
    <>
      {/* Fondo fijo detrás de TODO (header incluido) */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      />
      {/* Overlay blur */}
      <div className="fixed inset-0 -z-10 backdrop-blur-sm bg-white/20" />

      <main className="min-h-screen px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-white hover:text-gray-900 transition-colors"
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
            Volver
          </button>

          {/* Profile card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-900/20 shrink-0">
                  <span className="text-white text-2xl font-semibold">
                    {initials}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    {user.name ?? user.username}
                  </h1>
                  <p className="text-sm text-gray-400 mt-0.5">
                    @{user.username}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-900">
                      {locals.length}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">
                      Locales
                    </p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-900">
                      {dishes.length}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">
                      Platos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Publications card */}
          {(locals.length > 0 || dishes.length > 0) && (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
              <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-5 tracking-tight">
                  Publicaciones
                </h2>

                {/* Tabs */}
                {locals.length > 0 && dishes.length > 0 && (
                  <div className="flex gap-1 bg-gray-50 border border-gray-100 rounded-2xl p-1 mb-6 w-fit shadow-sm">
                    <button
                      onClick={() => setActiveTab("locals")}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeTab === "locals"
                          ? "bg-gray-900 text-white shadow-md shadow-gray-900/15"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      🏪 Locales ({locals.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("dishes")}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeTab === "dishes"
                          ? "bg-gray-900 text-white shadow-md shadow-gray-900/15"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      🍽️ Platos ({dishes.length})
                    </button>
                  </div>
                )}

                {/* Locals list */}
                {(activeTab === "locals" || dishes.length === 0) &&
                  locals.length > 0 && (
                    <div className="space-y-3">
                      {locals.map((local: any) => (
                        <div
                          key={local.id}
                          onClick={() => router.push(`/Locals/${local.id}`)}
                          className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                            {local.photos?.[0] ? (
                              <img
                                src={local.photos[0]}
                                alt={local.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">
                                🏪
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:underline underline-offset-2">
                              {local.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className="text-xs text-gray-400">
                                {TYPE_LABELS[local.type] ?? local.type}
                              </span>
                              {local.city && (
                                <span className="text-xs text-gray-300">·</span>
                              )}
                              {local.city && (
                                <span className="text-xs text-gray-400">
                                  {local.city}
                                </span>
                              )}
                            </div>
                            {local.ratingAverage != null && (
                              <div className="mt-1">
                                <StarRating rating={local.ratingAverage} />
                              </div>
                            )}
                          </div>
                          <svg
                            className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors"
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
                        </div>
                      ))}
                    </div>
                  )}

                {/* Dishes list */}
                {(activeTab === "dishes" || locals.length === 0) &&
                  dishes.length > 0 && (
                    <div className="space-y-3">
                      {dishes.map((dish: any) => (
                        <div
                          key={dish.id}
                          onClick={() => router.push(`/Dishes/${dish.id}`)}
                          className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                            {dish.photo ? (
                              <img
                                src={dish.photo}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">
                                {CATEGORY_ICONS[dish.category] ?? "🍴"}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:underline underline-offset-2">
                              {dish.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className="text-xs text-gray-400">
                                {CATEGORY_LABELS[dish.category] ??
                                  dish.category}
                              </span>
                              {dish.price && (
                                <>
                                  <span className="text-xs text-gray-300">
                                    ·
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    ${dish.price}
                                  </span>
                                </>
                              )}
                            </div>
                            {dish.ratingAverage != null && (
                              <div className="mt-1">
                                <StarRating rating={dish.ratingAverage} />
                              </div>
                            )}
                          </div>
                          <svg
                            className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors"
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
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Empty state */}
          {locals.length === 0 && dishes.length === 0 && (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
              <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-10 text-center">
                <p className="text-3xl mb-3">📭</p>
                <p className="text-sm font-medium text-gray-700">
                  Este usuario no tiene publicaciones
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Todavía no subió ningún local ni plato
                </p>
              </div>
            </div>
          )}

          <div className="h-2 mx-6 bg-gray-200 rounded-b-3xl opacity-50" />
        </div>
      </main>
    </>
  );
}
