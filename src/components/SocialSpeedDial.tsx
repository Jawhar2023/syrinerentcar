import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/contactInfo";
import { FacebookBrandIcon, WhatsAppBrandIcon } from "@/components/icons/SocialContactIcons";

const { whatsapp: WA_HREF, facebook: FB_HREF, instagram: IG_HREF } = CONTACT_INFO;

const fabBase =
  "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function InstagramOfficialWhite({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function SocialSpeedDial() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              href={IG_HREF}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={cn(
                fabBase,
                "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:scale-105",
              )}
              aria-label="Instagram"
              onClick={() => setOpen(false)}
            >
              <InstagramOfficialWhite className="h-7 w-7 text-white" />
            </motion.a>
            <motion.a
              href={FB_HREF}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.03 }}
              className={cn(fabBase, "bg-[#1877F2] hover:scale-105")}
              aria-label="Facebook"
              onClick={() => setOpen(false)}
            >
              <FacebookBrandIcon className="h-7 w-7 text-white" />
            </motion.a>
            <motion.a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.06 }}
              className={cn(
                fabBase,
                "bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:scale-105 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)]",
              )}
              aria-label={t("footer.whatsapp")}
              onClick={() => setOpen(false)}
            >
              <WhatsAppBrandIcon className="h-7 w-7" />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.45, 1.45], opacity: [0.45, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              aria-hidden
            />
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.25, 1.25], opacity: [0.35, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              aria-hidden
            />
          </>
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          animate={!open ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={!open ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          className={cn(
            fabBase,
            "relative",
            open
              ? "border-2 border-white/25 bg-[#25D366] ring-2 ring-black/20 hover:scale-105"
              : "bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:scale-105 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)]",
          )}
          aria-expanded={open}
          aria-label={open ? t("footer.speedDialClose") : t("footer.speedDialOpen")}
        >
          {open ? <X className="h-7 w-7" strokeWidth={2.5} /> : <WhatsAppBrandIcon className="h-7 w-7" />}
        </motion.button>
      </div>
    </div>
  );
}
