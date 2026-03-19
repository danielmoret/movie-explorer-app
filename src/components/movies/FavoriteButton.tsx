"use client";

import { Heart } from "lucide-react";
import { Button } from "@/src/components/common/Button";
import { useFavorites } from "@/src/context/FavoritesContext";
import type { MovieSearchResult } from "@/src/types/movie";

interface FavoriteButtonProps {
  movie: MovieSearchResult;
  size?: "sm" | "default";
  className?: string;
}

export function FavoriteButton({ movie, size = "sm", className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(movie.imdbID);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
      }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      data-active={active || undefined}
      className={`rounded-full ${className} ${size === "default" ? "h-10 w-10" : "h-8 w-8"}`}
    >
      <Heart
        className={`${size === "default" ? "h-5 w-5" : "h-4 w-4"} transition-colors ${active ? "fill-accent text-accent" : "text-white"}`}
      />
    </Button>
  );
}
