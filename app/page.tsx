import { Suspense } from "react";
import { HomeContent } from "@/src/components/movies/HomeContent";

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
