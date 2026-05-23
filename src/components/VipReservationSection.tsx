import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Car, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/contactInfo";

/** WhatsApp number from shared contact config (216 + local number without leading 0). */
const WHATSAPP_E164_LOCAL = CONTACT_INFO.phoneTel.replace(/\D/g, "").replace(/^216/, "");

const inputClass =
  "h-11 rounded-xl border border-border bg-muted/40 text-foreground placeholder:text-muted-foreground shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.98a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function FieldLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      {children}
    </label>
  );
}

export function VipReservationSection() {
  const { t } = useTranslation();
  const fleet = useMergedFleetCars();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleId, setVehicleId] = useState<string | undefined>(undefined);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const id = (location.state as { reserveCarId?: string } | null)?.reserveCarId;
    if (!id) return;
    setVehicleId(id);
    requestAnimationFrame(() => {
      document.getElementById("vip-reservation")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state, location.pathname, navigate]);

  const vehicleLabel = vehicleId
    ? (() => {
        const c = fleet.find((x) => x.id === vehicleId);
        return c ? `${c.brand} ${c.name}` : "";
      })()
    : "";

  const buildMessage = () =>
    t("reservation.waMessage", {
      name: name || "—",
      phone: phone || "—",
      vehicle: vehicleLabel || "—",
      pickup: pickupDate || "—",
      returnDate: returnDate || "—",
    });

  const validateReservation = (): boolean => {
    if (!name.trim() || !phone.trim()) {
      toast.error(t("reservation.toastRequired"), {
        description: t("reservation.toastRequiredDesc"),
      });
      return false;
    }
    if (!vehicleId) {
      toast.error(t("reservation.toastVehicle"), { description: t("reservation.toastVehicleDesc") });
      return false;
    }
    if (!pickupDate || !returnDate) {
      toast.error(t("reservation.toastDates"), { description: t("reservation.toastDatesDesc") });
      return false;
    }
    return true;
  };

  const openWhatsApp = () => {
    if (!validateReservation()) return;
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_E164_LOCAL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="vip-reservation" className="relative scroll-mt-24 border-t border-border bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" aria-hidden />
      <div className="container relative mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">{t("reservation.badge")}</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            <span className="text-foreground">{t("reservation.titleReserve")} </span>
            <span className="bg-gradient-to-r from-primary via-neon-blue to-neon-violet bg-clip-text text-transparent">
              {t("reservation.titleVehicle")}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-glass-border/50 bg-glass/30 p-6 shadow-[0_0_40px_hsl(351_96%_44%/0.06)] backdrop-blur-xl md:p-10"
        >
          <div className="space-y-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-8 md:gap-y-5">
              <div>
                <FieldLabel icon={User}>{t("reservation.fullName")}</FieldLabel>
                <Input
                  className={inputClass}
                  placeholder={t("reservation.placeholderName")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <FieldLabel icon={Phone}>{t("reservation.phone")}</FieldLabel>
                <Input
                  className={inputClass}
                  type="tel"
                  placeholder={t("reservation.placeholderPhone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel icon={Car}>{t("reservation.vehicle")}</FieldLabel>
                <Select
                  value={vehicleId ?? ""}
                  onValueChange={(v) => setVehicleId(v === "" ? undefined : v)}
                >
                  <SelectTrigger
                    className={cn(
                      inputClass,
                      "h-11 [&>span]:text-left data-[placeholder]:text-muted-foreground",
                    )}
                  >
                    <SelectValue placeholder={t("reservation.selectVehicle")} />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card text-card-foreground">
                    {fleet.map((car) => (
                      <SelectItem
                        key={car.id}
                        value={car.id}
                        className="focus:bg-muted focus:text-foreground"
                      >
                        {car.brand} {car.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FieldLabel icon={Calendar}>{t("reservation.pickupDate")}</FieldLabel>
                <div className="relative">
                  <Input
                    className={cn(inputClass, "pr-10 [color-scheme:dark]")}
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/80" />
                </div>
              </div>
              <div>
                <FieldLabel icon={Calendar}>{t("reservation.returnDate")}</FieldLabel>
                <div className="relative">
                  <Input
                    className={cn(inputClass, "pr-10 [color-scheme:dark]")}
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/80" />
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={openWhatsApp}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <WhatsAppIcon className="h-5 w-5 text-emerald-400" />
                {t("reservation.whatsapp")}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">{t("reservation.whatsappHint")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
