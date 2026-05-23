import { Navigate, useParams } from "react-router-dom";
import { ROUTES } from "@/seo/seoConfig";

/** Redirects /vip-fleet/car/:carId and /car/:carId to the SEO fleet detail URL. */
export function LegacyCarRedirect() {
  const { carId } = useParams<{ carId: string }>();
  if (!carId) return <Navigate to={ROUTES.fleet} replace />;
  return <Navigate to={ROUTES.fleetCar(carId)} replace />;
}
