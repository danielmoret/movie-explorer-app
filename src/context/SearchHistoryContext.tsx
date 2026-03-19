"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "search-history";
const MAX_ITEMS = 10;

type SearchHistoryContextType = {
  recentSearches: string[];
  addSearch: (query: string) => void;
};

const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

const EMPTY: string[] = [];
let cachedRaw: string | null = null;
let cachedParsed: string[] = EMPTY;

function normalizeQuery(query: string) {
  return query.trim().replace(/\s+/g, " ").toLowerCase();
}

function getSnapshot(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      cachedParsed = Array.isArray(parsed)
        ? parsed.filter((v) => typeof v === "string" && v.trim().length > 0)
        : EMPTY;
    } catch {
      cachedParsed = EMPTY;
    }
  }
  return cachedParsed;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function setHistory(items: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("search-history-changed"));
}

function subscribe(callback: () => void) {
  window.addEventListener("search-history-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("search-history-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

export function SearchHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const recentSearches = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const addSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (trimmed.length === 0) return;

    const normalized = normalizeQuery(trimmed);
    if (!normalized) return;

    const current = getSnapshot();
    const next = [
      trimmed,
      ...current.filter((q) => normalizeQuery(q) !== normalized),
    ].slice(0, MAX_ITEMS);

    setHistory(next);
  }, []);

  return (
    <SearchHistoryContext.Provider value={{ recentSearches, addSearch }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  }
  return context;
}

