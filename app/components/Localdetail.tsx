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
const PRICE_LABELS: Record<string, string> = {
  ECONOMICO: "$ Económico",
  MEDIO: "$$ Medio",
  ALTO: "$$$ Alto",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? "text-gray-900" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-400 ml-1.5">
        {rating?.toFixed(1) ?? "—"}
      </span>
    </div>
  );
}

function InteractiveStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className={`w-7 h-7 transition-transform duration-100 hover:scale-110 ${s <= (hovered || value) ? "text-gray-900" : "text-gray-200"}`}
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function LocalDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [local, setLocal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Review form
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetch_ = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/locals/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setLocal(data.item ?? data);
      } catch (err) {
        setError("No se pudo cargar el local.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0) {
      setReviewError("El rating es obligatorio.");
      return;
    }
    setSubmitting(true);
    setReviewError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/locals/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          rating: reviewRating,
          comment: reviewComment || undefined,
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setReviewSuccess(true);
      setReviewRating(0);
      setReviewComment("");
    } catch (err) {
      setReviewError("No se pudo enviar la reseña. Checkea si estas logeado.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </main>
    );

  if (error || !local)
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <p className="text-sm text-red-400 mb-4">
            {error || "Local no encontrado"}
          </p>
          <button
            onClick={() => router.back()}
            className="text-xs text-gray-500 underline"
          >
            Volver
          </button>
        </div>
      </main>
    );

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
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors"
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

          {/* Main card: image left + info right */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="flex flex-col md:flex-row min-h-[420px]">
                {/* Left: Image 50% */}
                <div className="w-full md:w-1/2 bg-gray-100 relative min-h-[280px] md:min-h-0">
                  {local.photos?.[0] ? (
                    <img
                      src={local.photos[0]}
                      alt={local.name}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl absolute inset-0">
                      🏪
                    </div>
                  )}
                  {/* Price overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                    {PRICE_LABELS[local.priceRange] ?? local.priceRange}
                  </div>
                </div>

                {/* Right: Info 50% */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Type badge */}
                    <span className="inline-block text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1 mb-4">
                      {TYPE_LABELS[local.type] ?? local.type}
                    </span>

                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
                      {local.name}
                    </h1>
                    <StarRating rating={local.ratingAverage} />

                    <div className="mt-6 space-y-2.5">
                      {local.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <svg
                            className="w-4 h-4 mt-0.5 shrink-0 text-gray-300"
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
                          <span>
                            {[local.address, local.zone, local.city]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      {local.hours && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg
                            className="w-4 h-4 shrink-0 text-gray-300"
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

                  {/* Author */}
                  {local.creator && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
                        Publicado por
                      </p>
                      <button
                        onClick={() =>
                          router.push(`/Users/${local.creator.id}`)
                        }
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center shadow-md shadow-gray-900/15 group-hover:shadow-gray-900/25 transition-shadow">
                          <span className="text-white text-sm font-semibold">
                            {local.creator.name?.[0]?.toUpperCase() ??
                              local.creator.username?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:underline underline-offset-2">
                            {local.creator.name ?? local.creator.username}
                          </p>
                          <p className="text-xs text-gray-400">
                            @{local.creator.username}
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-1">
            <div className="bg-white rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] p-8 md:p-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-tight">
                Dejá tu reseña
              </h2>

              {reviewSuccess ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 text-sm text-green-600 mb-6">
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
                  ¡Reseña enviada correctamente!
                </div>
              ) : (
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                      Rating <span className="text-red-400">*</span>
                    </label>
                    <InteractiveStars
                      value={reviewRating}
                      onChange={setReviewRating}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                      Comentario{" "}
                      <span className="text-gray-300">(opcional)</span>
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={3}
                      placeholder="Contá tu experiencia..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all shadow-sm resize-none"
                    />
                  </div>
                  {reviewError && (
                    <p className="text-xs text-red-400">{reviewError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-gray-900 text-white rounded-2xl px-6 py-3 text-sm font-medium shadow-lg shadow-gray-900/20 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Enviando..." : "Enviar reseña"}
                  </button>
                </form>
              )}

              {/* Existing reviews */}
              {local.reviews?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Reseñas ({local.reviews.length})
                  </h3>
                  {local.reviews.map((r: any, i: number) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= r.rating ? "text-gray-900" : "text-gray-200"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        {r.user && (
                          <span className="text-xs text-gray-400">
                            @{r.user.username}
                          </span>
                        )}
                      </div>
                      {r.comment && (
                        <p className="text-sm text-gray-600">{r.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Depth layers */}
          <div className="h-2 mx-6 bg-gray-200 rounded-b-3xl opacity-50" />
        </div>
      </main>
    </>
  );
}
