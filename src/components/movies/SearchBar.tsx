"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MAX_SEARCH_LENGTH } from "@/src/constants";
import { Button } from "@/src/components/common/Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

export function SearchBar({ onSearch, isLoading, placeholder = "Search movies, series, episodes...", defaultValue = "" }: SearchBarProps) {
  const [input, setInput] = useState(defaultValue);

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
      </div>
    </form>
  );
}
