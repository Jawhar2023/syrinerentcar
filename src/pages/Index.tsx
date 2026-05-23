import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SimpleProcessSection from "@/components/SimpleProcessSection";
import CarShowcase from "@/components/CarShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import { HomeLocationSection } from "@/components/HomeLocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schemas";
import { ROUTES } from "@/seo/seoConfig";

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
        <HeroSection />

        <section id="cars" aria-labelledby="fleet-preview-heading">
          <h2 id="fleet-preview-heading" className="sr-only">
            Véhicules disponibles à la location
          </h2>
          <CarShowcase sourceCars={fleet} cardSize="large" showPromoToolbar />
        </section>

        <section aria-labelledby="reviews-heading">
          <h2 id="reviews-heading" className="sr-only">
            Avis clients Google
          </h2>
          <TestimonialsSection />
        </section>

        <HomeLocationSection />

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" className="sr-only">
            Comment louer une voiture chez Syrine Rent Car
          </h2>
          <SimpleProcessSection />
        </section>

        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">
            Pourquoi Syrine Rent a Car
          </h2>
          <FeaturesSection />
        </section>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default Index;
