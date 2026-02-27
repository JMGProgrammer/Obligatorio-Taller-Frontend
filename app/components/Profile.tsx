"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
const PRICE_LABELS: Record<string, string> = {
  ECONOMICO: "$",
  MEDIO: "$$",
  ALTO: "$$$",
};
const CATEGORY_LABELS: Record<string, string> = {
  ENTRADA: "Entrada",
  PRINCIPAL: "Principal",
  POSTRE: "Postre",
  BEBIDA: "Bebida",
  OTROS: "Otros",
};
const LOCAL_TYPES = ["RESTAURANTE", "CAFETERIA", "BAR", "FOOD_TRUCK", "OTROS"];
const PRICE_RANGES = ["ECONOMICO", "MEDIO", "ALTO"];
const DISH_CATEGORIES = ["ENTRADA", "PRINCIPAL", "POSTRE", "BEBIDA", "OTROS"];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile edit
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add menu
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [addMode, setAddMode] = useState<"local" | "dish" | null>(null);

  // Add local form
  const [localName, setLocalName] = useState("");
  const [localType, setLocalType] = useState("RESTAURANTE");
  const [localPrice, setLocalPrice] = useState("ECONOMICO");
  const [localCity, setLocalCity] = useState("");
  const [localZone, setLocalZone] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [localHours, setLocalHours] = useState("");
  const [localPhotos, setLocalPhotos] = useState("");
  const [localDesc, setLocalDesc] = useState("");
  const [addingLocal, setAddingLocal] = useState(false);
  const [addLocalError, setAddLocalError] = useState("");

  // Add dish form
  const [dishName, setDishName] = useState("");
  const [dishCategory, setDishCategory] = useState("PRINCIPAL");
  const [dishLocalId, setDishLocalId] = useState("");
  const [dishCity, setDishCity] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishDesc, setDishDesc] = useState("");
  const [addingDish, setAddingDish] = useState(false);
  const [addDishError, setAddDishError] = useState("");

  // Delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setEditName(parsed.name ?? "");
      setEditUsername(parsed.username ?? "");
      // Fetch full user data (locals + dishes)
      fetchUserData(parsed.id, token);
    } else {
      setLoading(false);
    }
  }, [router]);

  const fetchUserData = async (userId: number, token: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      // API returns { item: {...}, locals: [...], dishes: [...] }
      setUserData({
        locals: data.locals ?? data.item?.locals ?? [],
        dishes: data.dishes ?? data.item?.dishes ?? [],
      });
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    const updated = { ...user, name: editName, username: editUsername };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddLocal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingLocal(true);
    setAddLocalError("");
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch(`${BASE_URL}/locals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: localName,
          type: localType,
          priceRange: localPrice,
          city: localCity,
          zone: localZone,
          address: localAddress,
          hours: localHours,
          description: localDesc || undefined,
          photos: localPhotos ? [localPhotos] : [],
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setAddMode(null);
      setShowAddMenu(false);
      setLocalName("");
      setLocalCity("");
      setLocalZone("");
      setLocalAddress("");
      setLocalHours("");
      setLocalPhotos("");
      setLocalDesc("");
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        fetchUserData(u.id, token);
      }
    } catch (err: any) {
      setAddLocalError("No se pudo crear el local. Revisá los datos.");
    } finally {
      setAddingLocal(false);
    }
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingDish(true);
    setAddDishError("");
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch(`${BASE_URL}/dishes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: dishName,
          category: dishCategory,
          localId: Number(dishLocalId),
          city: dishCity,
          price: dishPrice ? Number(dishPrice) : undefined,
          description: dishDesc || undefined,
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setAddMode(null);
      setShowAddMenu(false);
      setDishName("");
      setDishLocalId("");
      setDishCity("");
      setDishPrice("");
      setDishDesc("");
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        fetchUserData(u.id, localStorage.getItem("token")!);
      }
    } catch {
      setAddDishError("No se pudo crear el plato. Revisá los datos.");
    } finally {
      setAddingDish(false);
    }
  };

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm";
  const selectClass =
    "w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 shadow-sm";

  if (loading)
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </main>
    );

  const locals = userData?.locals ?? [];
  const dishes = userData?.dishes ?? [];

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
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Profile card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="w-12 h-12 bg-gray-900 rounded-2xl mb-4 flex items-center justify-center shadow-lg shadow-gray-900/20">
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
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    Mi cuenta
                  </h1>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Información de tu perfil
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Add button */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowAddMenu((v) => !v);
                        setAddMode(null);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-gray-900 text-white shadow-md shadow-gray-900/15 hover:bg-gray-800 active:scale-[0.97] transition-all"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Añadir
                    </button>
                    {showAddMenu && !addMode && (
                      <div className="absolute right-0 top-10 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 p-1 z-10 min-w-[140px]">
                        <button
                          onClick={() => setAddMode("local")}
                          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          🏪 Local
                        </button>
                        <button
                          onClick={() => setAddMode("dish")}
                          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          🍽️ Plato
                        </button>
                      </div>
                    )}
                  </div>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-500 border border-gray-200 bg-white hover:border-gray-400 hover:text-gray-900 transition-all shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Editar
                    </button>
                  )}
                </div>
              </div>

              {saveSuccess && (
                <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 text-sm text-green-600 mb-6 flex items-center gap-2">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Perfil actualizado correctamente
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Username
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 shadow-sm">
                      @{user?.username ?? "—"}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Nombre
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 shadow-sm">
                      {user?.name ?? "—"}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Contraseña
                  </label>
                  {editing ? (
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Nueva contraseña (opcional)"
                        className={inputClass + " pr-12"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-xl"
                      >
                        {showPassword ? (
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
                  ) : (
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm">
                      <span className="text-sm text-gray-400 tracking-widest">
                        ••••••••
                      </span>
                    </div>
                  )}
                </div>
                {editing && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 bg-gray-900 text-white rounded-2xl py-3.5 text-sm font-medium shadow-lg shadow-gray-900/20 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      disabled={saving}
                      className="flex-1 bg-white text-gray-600 border border-gray-200 rounded-2xl py-3.5 text-sm font-medium hover:border-gray-400 hover:text-gray-900 active:scale-[0.98] transition-all shadow-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Local form */}
          {addMode === "local" && (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
              <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Nuevo local
                  </h2>
                  <button
                    onClick={() => {
                      setAddMode(null);
                      setShowAddMenu(false);
                    }}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
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
                </div>
                <form onSubmit={handleAddLocal} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={localName}
                        onChange={(e) => setLocalName(e.target.value)}
                        required
                        placeholder="Nombre del local"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Tipo
                      </label>
                      <select
                        value={localType}
                        onChange={(e) => setLocalType(e.target.value)}
                        className={selectClass}
                      >
                        {LOCAL_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {TYPE_LABELS[t]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Rango de precio
                      </label>
                      <select
                        value={localPrice}
                        onChange={(e) => setLocalPrice(e.target.value)}
                        className={selectClass}
                      >
                        {PRICE_RANGES.map((p) => (
                          <option key={p} value={p}>
                            {PRICE_LABELS[p]}{" "}
                            {p.charAt(0) + p.slice(1).toLowerCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={localCity}
                        onChange={(e) => setLocalCity(e.target.value)}
                        required
                        placeholder="Ciudad"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Zona
                      </label>
                      <input
                        type="text"
                        value={localZone}
                        onChange={(e) => setLocalZone(e.target.value)}
                        placeholder="Zona / Barrio"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={localAddress}
                        onChange={(e) => setLocalAddress(e.target.value)}
                        placeholder="Dirección"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Horario
                      </label>
                      <input
                        type="text"
                        value={localHours}
                        onChange={(e) => setLocalHours(e.target.value)}
                        placeholder="08:00 - 20:00"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        URL de foto
                      </label>
                      <input
                        type="text"
                        value={localPhotos}
                        onChange={(e) => setLocalPhotos(e.target.value)}
                        placeholder="https://..."
                        className={inputClass}
                      />
                      {localPhotos && (
                        <div className="mt-2 w-full h-24 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                          <img
                            src={localPhotos}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Descripción
                    </label>
                    <textarea
                      value={localDesc}
                      onChange={(e) => setLocalDesc(e.target.value)}
                      rows={2}
                      placeholder="Breve descripción del local..."
                      className={inputClass + " resize-none"}
                    />
                  </div>
                  {addLocalError && (
                    <p className="text-xs text-red-400">{addLocalError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={addingLocal}
                    className="w-full bg-gray-900 text-white rounded-2xl py-3.5 text-sm font-medium shadow-lg shadow-gray-900/20 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {addingLocal ? "Creando..." : "Crear local"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Add Dish form */}
          {addMode === "dish" && (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
              <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Nuevo plato
                  </h2>
                  <button
                    onClick={() => {
                      setAddMode(null);
                      setShowAddMenu(false);
                    }}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
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
                </div>
                <form onSubmit={handleAddDish} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        required
                        placeholder="Nombre del plato"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Categoría
                      </label>
                      <select
                        value={dishCategory}
                        onChange={(e) => setDishCategory(e.target.value)}
                        className={selectClass}
                      >
                        {DISH_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {CATEGORY_LABELS[c]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        ID del local *
                      </label>
                      <input
                        type="number"
                        value={dishLocalId}
                        onChange={(e) => setDishLocalId(e.target.value)}
                        required
                        placeholder="ID del local"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={dishCity}
                        onChange={(e) => setDishCity(e.target.value)}
                        required
                        placeholder="Ciudad"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Precio
                      </label>
                      <input
                        type="number"
                        value={dishPrice}
                        onChange={(e) => setDishPrice(e.target.value)}
                        placeholder="890"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={dishDesc}
                        onChange={(e) => setDishDesc(e.target.value)}
                        placeholder="Descripción breve"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  {addDishError && (
                    <p className="text-xs text-red-400">{addDishError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={addingDish}
                    className="w-full bg-gray-900 text-white rounded-2xl py-3.5 text-sm font-medium shadow-lg shadow-gray-900/20 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {addingDish ? "Creando..." : "Crear plato"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Posts section */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-tight">
                Mis publicaciones
              </h2>

              {/* Locals */}
              {locals.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    Locales ({locals.length})
                  </p>
                  <div className="space-y-3">
                    {locals.map((local: any) => (
                      <div
                        key={local.id}
                        className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-all group"
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
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => router.push(`/Locals/${local.id}`)}
                        >
                          <p className="text-sm font-semibold text-gray-900 truncate group-hover:underline underline-offset-2">
                            {local.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-400">
                              {TYPE_LABELS[local.type] ?? local.type}
                            </span>
                            {local.ratingAverage != null && (
                              <span className="text-xs text-gray-400">
                                · ⭐ {local.ratingAverage?.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            if (!confirm("¿Eliminár este local?")) return;
                            setDeletingId(local.id);
                            // API doesn't have DELETE, so just refresh
                            setDeletingId(null);
                          }}
                          disabled={deletingId === local.id}
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all shrink-0 border border-transparent hover:border-red-100"
                          title="Eliminar"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dishes */}
              {dishes.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    Platos ({dishes.length})
                  </p>
                  <div className="space-y-3">
                    {dishes.map((dish: any) => (
                      <div
                        key={dish.id}
                        className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-all group"
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
                              🍽️
                            </div>
                          )}
                        </div>
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => router.push(`/Dishes/${dish.id}`)}
                        >
                          <p className="text-sm font-semibold text-gray-900 truncate group-hover:underline underline-offset-2">
                            {dish.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-400">
                              {CATEGORY_LABELS[dish.category] ?? dish.category}
                            </span>
                            {dish.price && (
                              <span className="text-xs text-gray-400">
                                · ${dish.price}
                              </span>
                            )}
                            {dish.ratingAverage != null && (
                              <span className="text-xs text-gray-400">
                                · ⭐ {dish.ratingAverage?.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => confirm("¿Eliminár este plato?")}
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all shrink-0 border border-transparent hover:border-red-100"
                          title="Eliminar"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {locals.length === 0 && dishes.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-3xl mb-3">📭</p>
                  <p className="text-sm font-medium text-gray-700">
                    Todavía no publicaste nada
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Usá el botón "Añadir" para crear tu primer local o plato
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="h-2 mx-6 bg-gray-200 rounded-b-3xl shadow-md opacity-60" />
          <div className="h-1.5 mx-10 bg-gray-100 rounded-b-3xl shadow opacity-40" />
        </div>
      </main>
    </>
  );
}
