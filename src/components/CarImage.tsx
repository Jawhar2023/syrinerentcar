import { cn } from "@/lib/utils";
import { carImageSources } from "@/lib/seoImages";

interface CarImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Hero / above-the-fold images should not lazy-load. */
  loading?: "lazy" | "eager";
}

/** Fleet photo with optional WebP source and lazy loading. */
export function CarImage({ src, alt, className, loading = "lazy" }: CarImageProps) {
  const { webp, fallback } = carImageSources(src);

  if (!webp) {
    return <img src={fallback} alt={alt} className={className} loading={loading} decoding="async" />;
  }

  return (
    <picture>
      <source type="image/webp" srcSet={webp} />
      <img src={fallback} alt={alt} className={cn(className)} loading={loading} decoding="async" />
    </picture>
  );
}
