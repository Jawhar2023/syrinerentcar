import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type ModuleDefault<T> = { default: T };

/**
 * Retry lazy imports once (full reload) when a deployed chunk hash is stale.
 * Prevents "MIME type text/html" errors after Vercel redeploys.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<ModuleDefault<T>>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      const key = "vite:chunk-reload";
      const reloaded = sessionStorage.getItem(key);

      if (!reloaded) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return new Promise<ModuleDefault<T>>(() => {});
      }

      sessionStorage.removeItem(key);
      throw error;
    }
  });
}
