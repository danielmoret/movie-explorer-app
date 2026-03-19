"use client";

import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/src/lib/omdb";
import type { MovieSearchResult, MovieType } from "@/src/types/movie";
import { PAGE_SIZE } from "@/src/constants";

interface UseMovieSearchParams {
  query: string;
  page: number;
  type?: MovieType
}

interface UseMovieSearchReturn {
  movies: MovieSearchResult[];
  totalResults: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useMovieSearch({
  query,
  page,
  type,
}: UseMovieSearchParams): UseMovieSearchReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", query, page, type],
    queryFn: () => searchMovies(query, page, type),
    enabled: query.trim().length > 0,
  });

  const totalResults = data ? parseInt(data.totalResults, 10) : 0;

  return {
    movies: data?.Search ?? [],
    totalResults,
    totalPages: Math.ceil(totalResults / PAGE_SIZE),
    isLoading,
    isError,
    error: error as Error | null,
  };
}
