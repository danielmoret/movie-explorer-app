"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "@/src/context/FavoritesContext";
import { MovieGrid } from "./MovieGrid";
import { StateMessage } from "@/src/components/common/StateMessage";
import { Heart } from "lucide-react";

export function FavoritesContent() {
  const router = useRouter();
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="animate-fade-in-up mb-8 text-3xl font-bold tracking-tight">Favorites</h1>
        <StateMessage
          variant="empty"
          icon={Heart}
          message="No favorites yet"
          description="Start adding movies to your favorites by clicking the heart icon."
          action={{ label: "Explore movies", onClick: () => router.push("/") }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="animate-fade-in-up mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
        <p className="text-sm text-muted">
          {favorites.length} {favorites.length === 1 ? "movie" : "movies"}
        </p>
      </div>
      <MovieGrid movies={favorites} />
    </div>
  );
}
