export function HeroRoadDivider() {
  const segmentCount = 20;

  return (
    <div className="relative w-full overflow-hidden py-3 md:py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/85 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/85 to-transparent md:w-32" />

      <div className="h-10 overflow-hidden opacity-90 md:h-12">
        <div
          className="flex gap-8 animate-[road-move_3s_linear_infinite] will-change-transform"
          style={{ width: "200%" }}
        >
          {Array.from({ length: segmentCount }).map((_, i) => (
            <div
              key={`a-${i}`}
              className="h-1 w-24 shrink-0 rounded-full bg-primary shadow-[0_0_14px_hsl(351_96%_44%/0.45)]"
            />
          ))}
          {Array.from({ length: segmentCount }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-1 w-24 shrink-0 rounded-full bg-primary shadow-[0_0_14px_hsl(351_96%_44%/0.45)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
