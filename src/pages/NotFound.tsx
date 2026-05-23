import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar variant="default" />
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-12">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">{t("notFound.title")}</h1>
          <p className="mb-4 text-xl text-muted-foreground">{t("notFound.message")}</p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            {t("notFound.backHome")}
          </Link>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default NotFound;
