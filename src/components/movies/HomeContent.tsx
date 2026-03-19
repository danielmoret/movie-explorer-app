"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { SearchFilters } from "./SearchFilters";
import { MovieGrid } from "./MovieGrid";
import { Button } from "@/src/components/common/Button";
import { Pagination } from "@/src/components/common/Pagination";
import { useMovieSearch } from "@/src/hooks/useMovieSearch";
import { StateMessage } from "@/src/components/common/StateMessage";
import { OmdbSearchError } from "@/src/lib/omdb";
import { SkeletonGrid, SkeletonList } from "@/src/components/common/SkeletonCard";
import type { MovieType } from "@/src/types/movie";
import { PopcornlyIcon } from "../icons/PopcornlyIcon";
import { useSearchHistory } from "@/src/context/SearchHistoryContext";
import { LayoutGrid, List } from "lucide-react";

const emptyMessage = "Something went wrong, please try again later.";

export function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const type = (searchParams.get("type") ?? "") as MovieType | "";
  const year = searchParams.get("year") ?? "";
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  const { movies, totalResults, totalPages, isLoading, isError, error } =
    useMovieSearch({
      query,
      page,
      type: type || undefined,
      year: year || undefined,
    });

  const { recentSearches, addSearch } = useSearchHistory();

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
    addSearch(newQuery);
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

  const handleViewChange = (newView: "grid" | "list") => {
    updateParams({ view: newView, page: "1" });
  };

  const renderContent = () => {
    if (isLoading) {
      return view === "list" ? <SkeletonList /> : <SkeletonGrid />;
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
        return (
          <StateMessage
            variant="error"
            description={emptyMessage}
          />
        );
      }

      return (
        <StateMessage
          variant="error"
          description={emptyMessage}
        />
      );
    }

    return (
      <>
        <MovieGrid movies={movies} view={view} />
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
          <PopcornlyIcon className="animate-fade-in-up h-24 w-24 text-accent" />
          <h1 className="animate-fade-in-up anim-delay-75 text-4xl font-bold tracking-tight sm:text-5xl">
            Discover Movies & Series
          </h1>
          <p className="animate-fade-in-up anim-delay-150 max-w-md text-lg text-muted">
            Search through thousands of movies, series and episodes. Find your
            next favorite to watch.
          </p>
          <div className="animate-fade-in-up anim-delay-225 w-full flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              onPickRecent={handleSearch}
              recentSearches={recentSearches}
              isLoading={isLoading}
              defaultValue={query}
            />
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <SearchBar
              onSearch={handleSearch}
              onPickRecent={handleSearch}
              recentSearches={recentSearches}
              isLoading={isLoading}
              defaultValue={query}
            />
            <SearchFilters
              type={type}
              year={year}
              onTypeChange={handleTypeChange}
              onYearChange={handleYearChange}
              onReset={handleResetFilters}
            />
            <div className="flex items-center gap-2">
              <Button
                variant={view === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("grid")}
              >
                <LayoutGrid className="mr-1 h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={view === "list" ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("list")}
              >
                <List className="mr-1 h-4 w-4" />
                List
              </Button>
            </div>
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
