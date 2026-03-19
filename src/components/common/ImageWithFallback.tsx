"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { PosterPlaceholder } from "@/src/components/common/PosterPlaceholder";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  fallback?: ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  fill = true,
  sizes,
  className = "object-cover",
  fallback,
}: ImageWithFallbackProps) {
  const [broken, setBroken] = useState<boolean>(false);

  const shouldShowPlaceholder =
    broken || !src || src === "N/A" || src === "null";

  return (
    <>
      {shouldShowPlaceholder ? (
        fallback ? (
          <div
            className={`${fill ? "absolute inset-0" : ""} ${className}`}
          >
            {fallback}
          </div>
        ) : (
          <PosterPlaceholder fill={fill} className={className} />
        )
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className={className}
          onError={() => setBroken(true)}
          unoptimized={src.startsWith("http")}
        />
      )}
    </>
  );
}
