import { cn } from "@/lib/utils";

interface CarImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Hero / above-the-fold images should not lazy-load. */
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}

/** Fleet photo — uses catalog JPEG/PNG from /public (no WebP unless you add matching .webp files). */
export function CarImage({ src, alt, className, loading = "lazy", width = 800, height = 600 }: CarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("block", className)}
      loading={loading}
      decoding="async"
    />
  );
}
