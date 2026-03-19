import Link from "next/link";
import type { MovieSearchResult } from "@/src/types/movie";
import { ImageWithFallback } from "@/src/components/common/ImageWithFallback";
import { FavoriteButton } from "./FavoriteButton";

interface MovieCardProps {
  movie: MovieSearchResult;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movies/${movie.imdbID}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <ImageWithFallback
          src={movie.Poster}
          alt={movie.Title}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-opacity group-hover:opacity-80"
        />
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 has-data-active:opacity-100">
          <FavoriteButton movie={movie} className="backdrop-blur-sm bg-black/50" />
        </div>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-medium text-card-foreground">
          {movie.Title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{movie.Year}</span>
          <span className="rounded bg-slate-200 text-slate-700 px-1.5 py-0.5 capitalize dark:bg-white/10 dark:text-foreground">
            {movie.Type}
          </span>
        </div>
      </div>
    </Link>
  );
}
