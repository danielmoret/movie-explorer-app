"use client";

import { X } from "lucide-react";
import { Button } from "@/src/components/common/Button";
import type { MovieType } from "@/src/types/movie";
import { YEAR_OPTIONS } from "@/src/utils/years";

const TYPE_OPTIONS: { label: string; value: MovieType | "" }[] = [
  { label: "All", value: "" },
  { label: "Movies", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Episodes", value: "episode" },
];

interface SearchFiltersProps {
  type: string;
  year: string;
  onTypeChange: (type: string) => void;
  onYearChange: (year: string) => void;
  onReset: () => void;
}

const selectClasses =
  "h-9 appearance-none rounded-full border border-white/10 bg-card pl-4 pr-9 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_0.625rem_center] bg-no-repeat";

export function SearchFilters({
  type,
  year,
  onTypeChange,
  onYearChange,
  onReset,
}: SearchFiltersProps) {
  const hasFilters = type !== "" || year !== "";

  return (
    <div className="flex items-center gap-3">
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className={selectClasses}
      >
        {TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        className={selectClasses}
      >
        <option value="">Any year</option>
        {YEAR_OPTIONS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          aria-label="Reset filters"
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
