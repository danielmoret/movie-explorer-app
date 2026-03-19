# Popcornly — Movie Explorer App
Popcornly is a web application built with **Next.js (App Router)** that consumes the **OMDb API** to search for movies/series, view details, filter results, and manage favorites.

## Features

- Home with a prominent **hero** + search bar
- Search with validation:
  - only queries with content trigger requests
  - maximum **50** characters
- Results in a responsive **grid** with:
  - poster (visual fallback when missing)
  - title, year, and type (Movie/Series/Episode)
- **Pagination** (10 results per page)
- **Details view** by `imdbId` using `plot=full`
- Friendly error handling (no results, too many results, API failures)

**PLUS**
- Filters:
  - type (`movie` / `series` / `episode`)
  - year (`y`)
- Favorites (save/view/remove with `localStorage`)
- **Dark mode** with a persistent toggle
- **Skeleton loading** + smooth animations
- **Search history** (last 10, deduplicated) shown in a dropdown inside the `SearchBar`

## Demo / Deploy
- [Vercel Deploy (Popcornly)](https://movie-explorer-app-nu.vercel.app/)

## Requirements

- Node.js 18+
- Free OMDb account to obtain an API key (Select FREE):
  - https://www.omdbapi.com/apikey.aspx

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy the example:

```bash
copy .env.example .env
```

Edit `.env`:

```env
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

### 3) Run the project

```bash
npm run dev
```

Open:
- http://localhost:3000

## Build / Production

```bash
npm run build
npm run start
```

## Main Routes

- `/` Home (search, filters, pagination)
- `/movies/[id]` Details (where `id` is `imdbId`)
- `/favorites` Favorites list

## Quick Test (for evaluation)

1. Home:
   - search for a valid term (e.g. `batman`) and press `Enter` or the button.
   - verify pagination and poster grid.
2. Details:
   - open a movie and go back using the back button.
3. Search history (PLUS):
   - return to Home, focus the search bar.
   - a dropdown with the last 10 searches should appear.
4. Favorites (PLUS):
   - click the heart icon and open `/favorites`.
   - verify the count updates and the back button is present.
5. Dark mode:
   - use the header toggle.
6. Poster fallback:
   - when OMDb returns no poster, a visual placeholder is shown.

## Technical Notes (OMDb)

- Search:
  - `?apikey={KEY}&s={QUERY}&page={PAGE}&type={type}&y={year}`
- Detail:
  - `?apikey={KEY}&i={IMDB_ID}&plot=full`
