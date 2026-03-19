"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { MAX_SEARCH_LENGTH } from "@/src/constants";
import { Button } from "@/src/components/common/Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onPickRecent?: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  defaultValue?: string;
  recentSearches?: string[];
}

export function SearchBar({
  onSearch,
  onPickRecent,
  isLoading,
  placeholder = "Search movies, series, episodes...",
  defaultValue = "",
  recentSearches = [],
}: SearchBarProps) {
  const [input, setInput] = useState<string>(defaultValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const blurTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);

  const inputNormalized = input.trim().toLowerCase();
  const filteredRecentSearches =
    inputNormalized.length === 0
      ? recentSearches
      : recentSearches.filter((q) =>
        q.toLowerCase().includes(inputNormalized)
      );

  const showDropdown = isFocused && filteredRecentSearches.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length === 0) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          maxLength={MAX_SEARCH_LENGTH}
          onFocus={() => {
            if (blurTimeoutRef.current) {
              window.clearTimeout(blurTimeoutRef.current);
              blurTimeoutRef.current = null;
            }
            setIsFocused(true);
          }}
          onBlur={() => {
            blurTimeoutRef.current = window.setTimeout(
              () => setIsFocused(false),
              120
            );
          }}
          className="h-12 w-full rounded-full border border-white/10 bg-card pl-12 pr-28 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || input.trim().length === 0}
          className="absolute right-2"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>

        {showDropdown && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg">
            <div className="p-2 text-xs font-medium text-muted">
              Recent searches
            </div>
            <div className="max-h-64 overflow-auto p-1">
              {filteredRecentSearches.map((q, i) => (
                <button
                  key={`${q}-${i}`}
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-white/10"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsFocused(false);
                    onPickRecent?.(q);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
