/** Lightweight fallback while lazy routes load. */
export function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
