import { PopcornlyIcon } from "@/src/components/icons/PopcornlyIcon";

interface PosterPlaceholderProps {
  fill?: boolean;
  className?: string;
}

export function PosterPlaceholder({
  fill = true,
  className = "",
}: PosterPlaceholderProps) {
  const positionClass = fill ? "absolute inset-0" : "";

  return (
    <div
      className={`${positionClass} flex flex-col items-center justify-center gap-3 bg-card text-muted ${className}`}
    >
      <PopcornlyIcon className="h-14 w-14" />

      <span className="text-sm">No poster available</span>
    </div>
  );
}

