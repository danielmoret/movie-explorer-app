import type { Metadata } from "next";
import { FavoritesContent } from "@/src/components/movies/FavoritesContent";

export const metadata: Metadata = {
  title: "Favorites | Movie Explorer",
  description: "Your favorite movies and series",
};

export default function FavoritesPage() {
  return <FavoritesContent />;
}
