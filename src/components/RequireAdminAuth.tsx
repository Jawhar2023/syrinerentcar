import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export function RequireAdminAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
