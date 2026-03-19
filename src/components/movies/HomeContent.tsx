"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { SearchFilters } from "./SearchFilters";
import { MovieGrid } from "./MovieGrid";
import { Pagination } from "@/src/components/common/Pagination";
import { useMovieSearch } from "@/src/hooks/useMovieSearch";
import { StateMessage } from "@/src/components/common/StateMessage";
import { OmdbSearchError } from "@/src/lib/omdb";
import { SkeletonGrid } from "@/src/components/common/SkeletonCard";
import { Film } from "lucide-react";
import type { MovieType } from "@/src/types/movie";

export function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const type = (searchParams.get("type") ?? "") as MovieType | "";
  const year = searchParams.get("year") ?? "";

  const { movies, totalResults, totalPages, isLoading, isError, error } =
    useMovieSearch({
      query,
      page,
      type: type || undefined,
      year: year || undefined,
    });

  const updateParams = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          sp.set(key, value);
        } else {
          sp.delete(key);
        }
      }
      router.push(`/?${sp.toString()}`);
    },
    [searchParams, router]
  );

  const handleSearch = (newQuery: string) => {
    updateParams({ q: newQuery, page: "1" });
  };

  const handleTypeChange = (newType: string) => {
    updateParams({ type: newType, page: "1" });
  };

  const handleYearChange = (newYear: string) => {
    updateParams({ year: newYear, page: "1" });
  };

  const handleResetFilters = () => {
    updateParams({ type: "", year: "", page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonGrid />;
    }

    if (isError) {
      if (error instanceof OmdbSearchError) {
        if (error.type === "no_results") {
          return (
            <StateMessage
              variant="empty"
              description="No movies found, try a different search term."
            />
          );
        }
        if (error.type === "too_many") {
          return (
            <StateMessage
              variant="empty"
              description="Too many results, try a more specific search."
            />
          );
        }
      }

      return (
        <StateMessage
          variant="error"
          description="Something went wrong, please try again later."
        />
      );
    }

    return (
      <>
        <MovieGrid movies={movies} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {!query ? (
        <section className="flex flex-col items-center justify-center gap-6 py-24 text-center">
          <Film className="animate-fade-in-up h-16 w-16 text-accent" />
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight sm:text-5xl" style={{ animationDelay: "75ms" }}>
            Discover Movies & Series
          </h1>
          <p className="animate-fade-in-up max-w-md text-lg text-muted" style={{ animationDelay: "150ms" }}>
            Search through thousands of movies, series and episodes. Find your
            next favorite to watch.
          </p>
          <div className="animate-fade-in-up w-full flex justify-center" style={{ animationDelay: "225ms" }}>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} defaultValue={query} />
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} defaultValue={query} />
            <SearchFilters
              type={type}
              year={year}
              onTypeChange={handleTypeChange}
              onYearChange={handleYearChange}
              onReset={handleResetFilters}
            />
            {totalResults > 0 && (
              <p className="text-sm text-muted">
                {totalResults} results for &quot;{query}&quot;
              </p>
            )}
          </div>
          {renderContent()}
        </section>
      )}
    </div>
  );
}
