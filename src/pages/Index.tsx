import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SimpleProcessSection from "@/components/SimpleProcessSection";
import CarShowcase from "@/components/CarShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schemas";
import { PAGES, ROUTES } from "@/seo/seoConfig";

const Index = () => {
  const fleet = useMergedFleetCars();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <JsonLd schema={breadcrumbSchema([{ name: "Accueil", path: ROUTES.home }])} />

      <header>
        <Navbar variant="default" />
      </header>

      <main>
        <HeroSection seoH1={PAGES.home.h1} />

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" className="sr-only">
            Comment louer une voiture chez Syrine Rent Car
          </h2>
          <SimpleProcessSection />
        </section>

        <section id="features" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">
            Avantages de la location à M&apos;saken
          </h2>
          <FeaturesSection />
        </section>

        <section id="cars" aria-labelledby="fleet-preview-heading">
          <h2 id="fleet-preview-heading" className="sr-only">
            Véhicules disponibles à la location
          </h2>
          <CarShowcase sourceCars={fleet} cardSize="large" showPromoToolbar />
        </section>

        <section id="reviews" aria-labelledby="reviews-heading">
          <h2 id="reviews-heading" className="sr-only">
            Avis clients Google
          </h2>
          <TestimonialsSection />
        </section>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default Index;
