import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Car images from the picture cars folder
const carImages = [
  { image: '/carss/picture cars/141a9890-96d2-4403-8fd5-7735554496dc.jpg', caption: 'Notre Flotte' },
  { image: '/carss/picture cars/254428e9-d1a1-4902-a238-77d8a9e5f887.jpg', caption: 'Véhicules Premium' },
  { image: '/carss/picture cars/2e2eef22-2868-42a2-92e6-940470a2ee87.jpg', caption: 'Confort Assuré' },
  { image: '/carss/picture cars/6a4fb71f-3179-4282-96f5-78e7e271563d.jpg', caption: 'Qualité Garantie' },
  { image: '/carss/picture cars/7b1f3519-3139-443c-806a-d750b4ff2fe7.jpg', caption: 'Service Excellence' },
  { image: '/carss/picture cars/b1147706-bcde-48bc-84bc-c7177c3b51c0.jpg', caption: 'Large Choix' },
  { image: '/carss/picture cars/c81fdae9-2ae9-483b-a764-74d82003f6ef.jpg', caption: 'Voitures Modernes' },
  { image: '/carss/picture cars/cc959ebb-9027-4526-ba12-7adc2cb93b88.jpg', caption: 'Découvrez Plus' },
];

const CarGallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(351_96%_44%/0.08),transparent)]" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-20"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Notre Collection
          </p>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Découvrez{" "}
            <span className="bg-gradient-to-r from-primary via-neon-blue to-neon-violet bg-clip-text text-transparent neon-text">
              Nos Véhicules
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-5xl"
        >
          <div className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl border border-primary/20">
            {/* Images */}
            <div className="relative w-full h-full">
              {carImages.map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-8"
                  initial={false}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 0.95,
                    zIndex: index === currentIndex ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                    loading="lazy"
                    style={{
                      filter: index === currentIndex ? 'none' : 'blur(10px)',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-6 z-10">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block rounded-xl bg-black/60 backdrop-blur-md px-6 py-3 border border-white/10"
              >
                <p className="text-white font-semibold text-base md:text-lg">
                  {carImages[currentIndex].caption}
                </p>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 right-6 z-10 flex gap-2">
              {carImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                    index === currentIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-6 grid grid-cols-4 md:grid-cols-8 gap-3">
            {carImages.map((item, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary ${
                  index === currentIndex
                    ? 'border-primary shadow-lg shadow-primary/50'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CarGallerySection;
