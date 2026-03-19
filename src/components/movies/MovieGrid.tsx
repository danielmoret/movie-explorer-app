import type { MovieSearchResult } from "@/src/types/movie";
import { MovieCard } from "./MovieCard";
import { MovieListItem } from "./MovieListItem";

interface MovieGridProps {
  movies: MovieSearchResult[];
  view?: "grid" | "list";
}

export function MovieGrid({ movies, view = "grid" }: MovieGridProps) {
  if (movies.length === 0) return null;

  return (
    <div
      className={
        view === "list"
          ? "flex flex-col gap-3"
          : "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      }
    >
      {movies.map((movie, index) => (
        <div
          key={`${movie.imdbID}-${index}`}
          className="animate-fade-in-up"
        >
          {view === "list" ? (
            <MovieListItem movie={movie} />
          ) : (
            <MovieCard movie={movie} />
          )}
        </div>
      ))}
    </div>
  );
}
