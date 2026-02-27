"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600";

const BASE_URL = "https://api-react-taller-production.up.railway.app/api";

const TYPES = ["RESTAURANTE", "CAFETERIA", "BAR", "FOOD_TRUCK", "OTROS"];
const PRICE_RANGES = ["ECONOMICO", "MEDIO", "ALTO"];
const DISH_CATEGORIES = ["ENTRADA", "PRINCIPAL", "POSTRE", "BEBIDA", "OTROS"];
const RATINGS = [1, 2, 3, 4, 5];

const TYPE_LABELS: Record<string, string> = {
  RESTAURANTE: "Restaurante",
  CAFETERIA: "Cafetería",
  BAR: "Bar",
  FOOD_TRUCK: "Food Truck",
  OTROS: "Otros",
};
const PRICE_LABELS: Record<string, string> = {
  ECONOMICO: "$",
  MEDIO: "$$",
  ALTO: "$$$",
};
const TYPE_ICONS: Record<string, string> = {
  RESTAURANTE: "🍽️",
  CAFETERIA: "☕",
  BAR: "🍺",
  FOOD_TRUCK: "🚚",
  OTROS: "🏪",
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
      <span className="text-xs text-gray-400 ml-1">
        {rating?.toFixed(1) ?? "—"}
      </span>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 whitespace-nowrap shadow-sm ${active ? "bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/15" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"}`}
    >
      {label}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="h-44 bg-gray-100" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
            <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
            <div className="h-3 bg-gray-100 rounded-lg w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LocalCard({ local }: { local: any }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/Locals/${local.id}`)}
      className="bg-white rounded-2xl shadow-md shadow-gray-200/60 border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/80 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      <div className="h-44 bg-gray-100 overflow-hidden relative">
        {local.photos?.[0] ? (
          <img
            src={local.photos[0]}
            alt={local.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {TYPE_ICONS[local.type] ?? "🏪"}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
          {PRICE_LABELS[local.priceRange] ?? local.priceRange}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
            {local.name}
          </h3>
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-2 py-0.5 shrink-0">
            {TYPE_LABELS[local.type] ?? local.type}
          </span>
        </div>
        <StarRating rating={local.ratingAverage} />
        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">
            {[local.address, local.zone, local.city].filter(Boolean).join(", ")}
          </span>
        </div>
        {local.hours && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{local.hours}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DishCard({ dish }: { dish: any }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/Dishes/${dish.id}`)}
      className="bg-white rounded-2xl shadow-md shadow-gray-200/60 border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/80 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      <div className="h-44 bg-gray-100 overflow-hidden relative">
        {dish.photo ? (
          <img
            src={dish.photo}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {CATEGORY_ICONS[dish.category] ?? "🍴"}
          </div>
        )}
        {dish.price && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
            ${dish.price}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
            {dish.name}
          </h3>
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-2 py-0.5 shrink-0">
            {CATEGORY_LABELS[dish.category] ?? dish.category}
          </span>
        </div>
        <StarRating rating={dish.ratingAverage} />
        {dish.description && (
          <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        )}
        {dish.city && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{dish.city}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function LocalesTab() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [locals, setLocals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLocals = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (type) params.set("type", type);
      if (priceRange) params.set("priceRange", priceRange);
      if (rating) params.set("rating", rating);
      if (city) params.set("city", city);
      if (zone) params.set("zone", zone);
      const res = await fetch(`${BASE_URL}/locals?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setLocals(
        Array.isArray(data)
          ? data
          : (data.items ?? data.locals ?? data.data ?? []),
      );
    } catch (err) {
      setError("No se pudieron cargar los locales.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [q, type, priceRange, rating, city, zone]);

  useEffect(() => {
    const t = setTimeout(fetchLocals, q ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchLocals, q]);
  const clearFilters = () => {
    setQ("");
    setType("");
    setPriceRange("");
    setRating("");
    setCity("");
    setZone("");
  };
  const hasFilters = q || type || priceRange || rating || city || zone;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
        <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] px-8 py-7">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400">
              Explorá los locales disponibles
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-gray-900 underline underline-offset-2 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <div className="relative mb-5">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, tipo, zona..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 w-14 shrink-0">Tipo</span>
              <div className="flex gap-2 flex-wrap">
                {TYPES.map((t) => (
                  <FilterPill
                    key={t}
                    label={TYPE_LABELS[t]}
                    active={type === t}
                    onClick={() => setType(type === t ? "" : t)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 w-14 shrink-0">
                Precio
              </span>
              <div className="flex gap-2 flex-wrap">
                {PRICE_RANGES.map((p) => (
                  <FilterPill
                    key={p}
                    label={`${PRICE_LABELS[p]} ${p.charAt(0) + p.slice(1).toLowerCase()}`}
                    active={priceRange === p}
                    onClick={() => setPriceRange(priceRange === p ? "" : p)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 w-14 shrink-0">
                Rating
              </span>
              <div className="flex gap-2 flex-wrap">
                {RATINGS.map((r) => (
                  <FilterPill
                    key={r}
                    label={`${r}★ o más`}
                    active={rating === String(r)}
                    onClick={() =>
                      setRating(rating === String(r) ? "" : String(r))
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 w-14 shrink-0">Lugar</span>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ciudad"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all w-32 shadow-sm"
                />
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="Zona"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all w-32 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-md border border-gray-100">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={fetchLocals}
            className="mt-4 text-xs text-gray-500 underline underline-offset-2"
          >
            Reintentar
          </button>
        </div>
      ) : locals.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-md border border-gray-100">
          <p className="text-3xl mb-3">🍽️</p>
          <p className="text-sm font-medium text-gray-700">
            No se encontraron locales
          </p>
          <p className="text-xs text-gray-400 mt-1">Probá con otros filtros</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 px-1">
            {locals.length} resultado{locals.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locals.map((local) => (
              <LocalCard key={local.id} local={local} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DishesTab() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDishes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (category) params.set("category", category);
      if (city) params.set("city", city);
      const res = await fetch(`${BASE_URL}/dishes?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setDishes(
        Array.isArray(data)
          ? data
          : (data.items ?? data.dishes ?? data.data ?? []),
      );
    } catch (err) {
      setError("No se pudieron cargar los platos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [q, category, city]);

  useEffect(() => {
    const t = setTimeout(fetchDishes, q ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchDishes, q]);
  const clearFilters = () => {
    setQ("");
    setCategory("");
    setCity("");
  };
  const hasFilters = q || category || city;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
        <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] px-8 py-7">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400">
              Explorá los platos disponibles
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-gray-900 underline underline-offset-2 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <div className="relative mb-5">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, categoría..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 w-14 shrink-0">
                Categoría
              </span>
              <div className="flex gap-2 flex-wrap">
                {DISH_CATEGORIES.map((c) => (
                  <FilterPill
                    key={c}
                    label={CATEGORY_LABELS[c]}
                    active={category === c}
                    onClick={() => setCategory(category === c ? "" : c)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 w-14 shrink-0">
                Ciudad
              </span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all w-32 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-md border border-gray-100">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={fetchDishes}
            className="mt-4 text-xs text-gray-500 underline underline-offset-2"
          >
            Reintentar
          </button>
        </div>
      ) : dishes.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-md border border-gray-100">
          <p className="text-3xl mb-3">🍴</p>
          <p className="text-sm font-medium text-gray-700">
            No se encontraron platos
          </p>
          <p className="text-xs text-gray-400 mt-1">Probá con otros filtros</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 px-1">
            {dishes.length} resultado{dishes.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"locales" | "platos">("locales");
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
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    Explorar
                  </h1>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Encontrá locales y platos cerca tuyo
                  </p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 gap-1">
                  <button
                    onClick={() => setActiveTab("locales")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === "locales" ? "bg-white text-gray-900 shadow-md shadow-gray-200/60" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    <span>🏪</span> Locales
                  </button>
                  <button
                    onClick={() => setActiveTab("platos")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === "platos" ? "bg-white text-gray-900 shadow-md shadow-gray-200/60" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    <span>🍽️</span> Platos
                  </button>
                </div>
              </div>
            </div>
          </div>
          {activeTab === "locales" ? <LocalesTab /> : <DishesTab />}
        </div>
      </main>
    </>
  );
}
