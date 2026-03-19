import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { QueryProvider } from "@/src/context/QueryProvider";
import { FavoritesProvider } from "@/src/context/FavoritesContext";
import { SearchHistoryProvider } from "@/src/context/SearchHistoryContext";
import { Header } from "@/src/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Popcornly",
  description: "Busca y explora películas usando la API de OMDb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <SearchHistoryProvider>
                <Header />
                <main className="flex-1">{children}</main>
              </SearchHistoryProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
