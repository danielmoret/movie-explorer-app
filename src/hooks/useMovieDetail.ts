"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/src/lib/omdb";

export function useMovieDetail(imdbId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", imdbId],
    queryFn: () => getMovieById(imdbId),
    enabled: !!imdbId,
  });

  return {
    movie: data ?? null,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
