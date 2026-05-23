import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbCrumb } from "@/seo/schemas";
import { cn } from "@/lib/utils";

interface BreadCrumbProps {
  crumbs: BreadcrumbCrumb[];
  className?: string;
}

/** Accessible breadcrumb trail (French labels). */
export function BreadCrumb({ crumbs, className }: BreadCrumbProps) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-sm text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
              ) : null}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
