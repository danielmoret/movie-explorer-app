import type { Metadata } from "next";
import { MovieDetailContent } from "@/src/components/movies/MovieDetailContent";
import { getMovieById } from "@/src/lib/omdb";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await getMovieById(id);
    return {
      title: `${movie.Title} (${movie.Year}) | Movie Explorer`,
      description: movie.Plot !== "N/A" ? movie.Plot : undefined,
    };
  } catch {
    return {
      title: "Movie Details | Movie Explorer",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  return <MovieDetailContent imdbId={id} />;
}
