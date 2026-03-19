"use client";

import { useState } from "react";
import Image from "next/image";
import { POSTER_FALLBACK } from "@/src/constants";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fill = true,
  sizes,
  className = "object-cover",
}: ImageWithFallbackProps) {
  const [broken, setBroken] = useState(false);

  const resolvedSrc = broken || !src || src === "N/A" ? POSTER_FALLBACK : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={() => setBroken(true)}
      unoptimized={resolvedSrc.startsWith("http")}
    />
  );
}
