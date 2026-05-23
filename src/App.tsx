import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import DriveXIntro from "@/components/DriveXIntro";
import { IntroGateProvider } from "@/contexts/IntroGateContext";
import { PageLoader } from "@/components/PageLoader";
import { JsonLd } from "@/seo/JsonLd";
import { localBusinessSchema } from "@/seo/schemas";
import { LegacyCarRedirect } from "@/components/LegacyRedirects";
import { ROUTES } from "@/seo/seoConfig";

const Index = lazyWithRetry(() => import("./pages/Index.tsx"));
const VipFleet = lazyWithRetry(() => import("./pages/VipFleet.tsx"));
const VipFindCarQuizPage = lazyWithRetry(() => import("./pages/VipFindCarQuizPage.tsx"));
const About = lazyWithRetry(() => import("./pages/About.tsx"));
const Contact = lazyWithRetry(() => import("./pages/Contact.tsx"));
const Reservation = lazyWithRetry(() => import("./pages/Reservation.tsx"));
const CarDetail = lazyWithRetry(() => import("./pages/CarDetail.tsx"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <IntroGateProvider>
        <TooltipProvider>
          <JsonLd schema={localBusinessSchema} />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <DriveXIntro />
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={ROUTES.home} element={<Index />} />
                <Route path={ROUTES.about} element={<About />} />
                <Route path={ROUTES.fleet} element={<VipFleet />} />
                <Route path={`${ROUTES.fleet}/voiture/:carId`} element={<CarDetail />} />
                <Route path={`${ROUTES.fleet}/trouver`} element={<VipFindCarQuizPage />} />
                <Route path={ROUTES.reservation} element={<Reservation />} />
                <Route path={ROUTES.contact} element={<Contact />} />

                {/* Legacy URLs → SEO-friendly redirects */}
                <Route path="/about" element={<Navigate to={ROUTES.about} replace />} />
                <Route path="/vip-fleet" element={<Navigate to={ROUTES.fleet} replace />} />
                <Route path="/vip-fleet/car/:carId" element={<LegacyCarRedirect />} />
                <Route path="/car/:carId" element={<LegacyCarRedirect />} />
                <Route path="/vip-fleet/find-car" element={<Navigate to={ROUTES.fleetFind} replace />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </IntroGateProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
