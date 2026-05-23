import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { VipReservationSection } from "@/components/VipReservationSection";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import { PAGES, ROUTES } from "@/seo/seoConfig";

const Reservation = () => {
  const crumbs = [
    { name: "Accueil", path: ROUTES.home },
    { name: "Réservation", path: ROUTES.reservation },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead page="reservation" />
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <header>
        <Navbar variant="default" />
      </header>

      <main className="relative z-10 pt-20">
        <section
          className="border-b border-border/40 bg-muted/10"
          aria-labelledby="reservation-page-heading"
        >
          <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
            <BreadCrumb crumbs={crumbs} className="mb-6" />
            <h1
              id="reservation-page-heading"
              className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              {PAGES.reservation.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Complétez le formulaire ci-dessous pour envoyer votre demande de location par WhatsApp. Notre
              équipe à M&apos;saken vous répond rapidement.
            </p>
          </div>
        </section>

        <section aria-label="Formulaire de réservation">
          <VipReservationSection />
        </section>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default Reservation;
