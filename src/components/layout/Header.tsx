"use client";

import Link from "next/link";
import { Film, Heart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useFavorites } from "@/src/context/FavoritesContext";

export function Header() {
  const { favorites } = useFavorites();
  const count = favorites.length;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-accent" />
          <span className="text-lg font-semibold tracking-tight">
            Movie Explorer
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/favorites"
            className="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              Favorites
            </span>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
