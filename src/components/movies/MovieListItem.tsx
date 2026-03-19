import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MovieSearchResult } from "@/src/types/movie";
import { ImageWithFallback } from "@/src/components/common/ImageWithFallback";
import { PopcornlyIcon } from "@/src/components/icons/PopcornlyIcon";
import { FavoriteButton } from "./FavoriteButton";

interface MovieListItemProps {
  movie: MovieSearchResult;
}

export function MovieListItem({ movie }: MovieListItemProps) {
  return (
    <Link
      href={`/movies/${movie.imdbID}`}
      className="group relative flex flex-row items-stretch overflow-hidden rounded-xl bg-card transition-transform hover:scale-[1.01]"
    >
      <div className="relative aspect-2/3 w-24 shrink-0 overflow-hidden sm:w-28">
        <ImageWithFallback
          src={movie.Poster}
          alt={movie.Title}
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover transition-opacity group-hover:opacity-80"
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-card text-muted">
              <PopcornlyIcon className="h-8 w-8" />
            </div>
          }
        />
        <div className="absolute right-2 top-2">
          <FavoriteButton movie={movie} className="backdrop-blur-sm bg-black/50" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-medium text-card-foreground sm:text-lg">
          {movie.Title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>{movie.Year}</span>
          <span className="h-1 w-1 rounded-full bg-muted" aria-hidden="true" />
          <span className="rounded bg-slate-200 px-1.5 py-0.5 capitalize text-slate-700 dark:bg-white/10 dark:text-foreground">
            {movie.Type}
          </span>
        </div>

        <p className="text-xs text-muted">
          Quick view item. Open to see full {movie.Type} details.
        </p>

        <div className="flex items-center justify-end pt-1">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
            Open details
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

