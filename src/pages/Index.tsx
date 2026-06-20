import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SimpleProcessSection from "@/components/SimpleProcessSection";
import CarShowcase from "@/components/CarShowcase";
import { PromoBannerSection } from "@/components/PromoBannerSection";
import FeaturesSection from "@/components/FeaturesSection";
import { HomeLocationSection } from "@/components/HomeLocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { breadcrumbSchema, faqPageSchema } from "@/seo/schemas";
import { FAQ_ITEMS_FR, ROUTES } from "@/seo/seoConfig";

const Index = () => {
  const fleet = useMergedFleetCars();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="home" />
      <JsonLd schema={breadcrumbSchema([{ name: "Accueil", path: ROUTES.home }])} />
      <JsonLd schema={faqPageSchema(FAQ_ITEMS_FR)} />

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

        <PromoBannerSection />

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

        <FaqSection />
        <InternalLinksSection />
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default Index;
