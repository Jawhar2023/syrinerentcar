import { cn } from "@/lib/utils";

interface CarImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Hero / above-the-fold images should not lazy-load. */
  loading?: "lazy" | "eager";
}

/** Fleet photo — uses catalog JPEG/PNG from /public (no WebP unless you add matching .webp files). */
export function CarImage({ src, alt, className, loading = "lazy" }: CarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("block", className)}
      loading={loading}
      decoding="async"
    />
  );
}
