"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import type { MovieSearchResult } from "@/src/types/movie";

const STORAGE_KEY = "favorites";

interface FavoritesContextType {
  favorites: MovieSearchResult[];
  addFavorite: (movie: MovieSearchResult) => void;
  removeFavorite: (imdbId: string) => void;
  isFavorite: (imdbId: string) => boolean;
  toggleFavorite: (movie: MovieSearchResult) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const EMPTY: MovieSearchResult[] = [];
let cachedRaw: string | null = null;
let cachedParsed: MovieSearchResult[] = EMPTY;

function getSnapshot(): MovieSearchResult[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedParsed = raw ? JSON.parse(raw) : EMPTY;
    } catch {
      cachedParsed = EMPTY;
    }
  }
  return cachedParsed;
}

function getServerSnapshot(): MovieSearchResult[] {
  return EMPTY;
}

function setFavorites(favorites: MovieSearchResult[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event("favorites-changed"));
}

function subscribe(callback: () => void) {
  window.addEventListener("favorites-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("favorites-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const addFavorite = useCallback((movie: MovieSearchResult) => {
    const current = getSnapshot();
    if (current.some((m) => m.imdbID === movie.imdbID)) return;
    setFavorites([movie, ...current]);
  }, []);

  const removeFavorite = useCallback((imdbId: string) => {
    const current = getSnapshot();
    setFavorites(current.filter((m) => m.imdbID !== imdbId));
  }, []);

  const isFavorite = useCallback(
    (imdbId: string) => favorites.some((m) => m.imdbID === imdbId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie: MovieSearchResult) => {
      if (isFavorite(movie.imdbID)) {
        removeFavorite(movie.imdbID);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
