import { Star, Clock, Calendar, Award } from "lucide-react";
import { ImageWithFallback } from "@/src/components/common/ImageWithFallback";
import { BackButton } from "@/src/components/common/BackButton";
import { DetailField } from "@/src/components/common/DetailField";
import { FavoriteButton } from "./FavoriteButton";
import type { MovieDetail as MovieDetailType } from "@/src/types/movie";

interface MovieDetailProps {
  movie: MovieDetailType;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const genres = movie.Genre.split(", ");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <BackButton label="Back to results" />

      <div className="flex flex-col gap-8 md:flex-row">
        <div
          className="animate-fade-in-up relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-xl md:w-80"
        >
          <ImageWithFallback
            src={movie.Poster}
            alt={movie.Title}
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>

        <div className="animate-fade-in-up flex flex-1 flex-col gap-5" style={{ animationDelay: "100ms" }}>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {movie.Title}
            </h1>
            <FavoriteButton
              movie={{
                Title: movie.Title,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type as "movie" | "series" | "episode",
                Poster: movie.Poster,
              }}
              size="default"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {movie.Year}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {movie.Runtime}
              </span>
              {movie.Rated !== "N/A" && (
                <span className="rounded border border-white/20 px-1.5 py-0.5 text-xs">
                  {movie.Rated}
                </span>
              )}
          </div>

          {movie.imdbRating !== "N/A" && (
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-2xl font-bold">{movie.imdbRating}</span>
              <span className="text-sm text-muted">/ 10</span>
              {movie.imdbVotes !== "N/A" && (
                <span className="text-sm text-muted">
                  ({movie.imdbVotes} votes)
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          {movie.Plot !== "N/A" && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                Plot
              </h2>
              <p className="leading-relaxed text-foreground/80">{movie.Plot}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {movie.Director !== "N/A" && (
              <DetailField label="Director" value={movie.Director} />
            )}
            {movie.Writer !== "N/A" && (
              <DetailField label="Writer" value={movie.Writer} />
            )}
            {movie.Actors !== "N/A" && (
              <DetailField label="Actors" value={movie.Actors} />
            )}
            {movie.Language !== "N/A" && (
              <DetailField label="Language" value={movie.Language} />
            )}
            {movie.Country !== "N/A" && (
              <DetailField label="Country" value={movie.Country} />
            )}
            {movie.BoxOffice !== "N/A" && movie.BoxOffice && (
              <DetailField label="Box Office" value={movie.BoxOffice} />
            )}
          </div>

          {movie.Awards !== "N/A" && (
            <div className="flex items-start gap-2 rounded-lg bg-white/5 p-4">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm">{movie.Awards}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
