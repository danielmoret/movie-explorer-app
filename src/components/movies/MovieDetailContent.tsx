"use client";

import { useRouter } from "next/navigation";
import { useMovieDetail } from "@/src/hooks/useMovieDetail";
import { MovieDetail } from "./MovieDetail";
import { StateMessage } from "@/src/components/common/StateMessage";
import { OmdbDetailError } from "@/src/lib/omdb";

interface MovieDetailContentProps {
  imdbId: string;
}

export function MovieDetailContent({ imdbId }: MovieDetailContentProps) {
  const router = useRouter();
  const { movie, isLoading, isError, error } = useMovieDetail(imdbId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (isError || !movie) {
    const description =
      error instanceof OmdbDetailError && error.type === "invalid_id"
        ? "Movie not found."
        : "This movie couldn't be loaded right now. Try again later.";

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <StateMessage
          variant="error"
          description={description}
          action={{ label: "Go back home", onClick: () => router.push("/") }}
        />
      </div>
    );
  }

  return <MovieDetail movie={movie} />;
}
