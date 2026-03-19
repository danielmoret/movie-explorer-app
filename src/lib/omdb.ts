import { OMDB_BASE_URL } from "@/src/constants";
import type {
  OmdbSearchResult,
  OmdbDetailResult,
  MovieSearchResponse,
  MovieDetail,
  MovieType,
} from "@/src/types/movie";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export class OmdbSearchError extends Error {
  constructor(
    message: string,
    public readonly type: "no_results" | "too_many" | "api_error"
  ) {
    super(message);
    this.name = "OmdbSearchError";
  }
}

function buildUrl(params: Record<string, string | number | undefined>): string {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", API_KEY ?? "");

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

export async function searchMovies(
  query: string,
  page: number = 1,
  type?: MovieType
): Promise<MovieSearchResponse> {
  const url = buildUrl({ s: query, page, type });
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`OMDb request failed with status ${res.status}`);
  }

  const data: OmdbSearchResult = await res.json();

  if (data.Response === "False") {
    if (data.Error === "Movie not found!") {
      throw new OmdbSearchError(data.Error, "no_results");
    }
    if (data.Error === "Too many results.") {
      throw new OmdbSearchError(data.Error, "too_many");
    }
    throw new OmdbSearchError(data.Error, "api_error");
  }

  return data;
}

export class OmdbDetailError extends Error {
  constructor(
    message: string,
    public readonly type: "invalid_id" | "api_error"
  ) {
    super(message);
    this.name = "OmdbDetailError";
  }
}

export async function getMovieById(imdbId: string): Promise<MovieDetail> {
  const url = buildUrl({ i: imdbId, plot: "full" });
  const res = await fetch(url);

  if (!res.ok) {
    throw new OmdbDetailError(
      `OMDb request failed with status ${res.status}`,
      "api_error"
    );
  }

  const data: OmdbDetailResult = await res.json();

  if (data.Response === "False") {
    if (data.Error === "Incorrect IMDb ID.") {
      throw new OmdbDetailError(data.Error, "invalid_id");
    }
    throw new OmdbDetailError(data.Error, "api_error");
  }

  return data;
}
