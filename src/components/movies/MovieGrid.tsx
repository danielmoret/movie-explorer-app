import type { MovieSearchResult } from "@/src/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: MovieSearchResult[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) return null;

  //Duplicate movies are not allowed
  const unique = Array.from(
    new Map(movies.map((m) => [m.imdbID, m])).values()
  );

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {unique.map((movie, i) => (
        <div
          key={movie.imdbID}
          className="animate-fade-in-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
