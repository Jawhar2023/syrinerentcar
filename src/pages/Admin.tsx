import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  DollarSign,
  UserCheck,
  Activity,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Settings2,
  Upload,
  Tag,
  Pencil,
  FileText,
  FileDown,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Car as CarType } from "@/data/cars";
import { useDrivexBookings, useDrivexCustomers, useMergedFleetCars } from "@/hooks/useDrivexData";
import {
  addCustomCar,
  addCustomerManual,
  updateCustomer,
  deleteBooking,
  deleteCustomer,
  isCustomCarId,
  removeVehicleFromFleet,
  setCatalogOverride,
  updateBookingStatus,
  updateCustomCar,
  setBookingContractPdf,
  type BookingRecord,
  type BookingStatus,
  type CustomerRecord,
} from "@/lib/drivexStorage";
import { downloadBookingsExportExcel } from "@/lib/bookingExcelExport";
import { getBookingCountsByVehicleType, getMonthlyBookingStats, getTotalRevenueEUR } from "@/lib/bookingAnalytics";
import { formatPriceEUR, formatPriceEURCompact } from "@/lib/formatPrice";
import { logoutAdmin } from "@/lib/adminAuth";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function formatReceivedAt(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function dash(v: string) {
  const t = v?.trim();
  return t ? t : "—";
}

function BookingReservationDetails({ b }: { b: BookingRecord }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{t("admin.bookingFullName")}</p>
        <p className="text-sm text-foreground">{dash(b.customerName)}</p>
      </div>
      <div className="space-y-1">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("admin.bookingEmail")}
        </p>
        <a href={`mailto:${b.email}`} className="text-sm text-primary hover:underline break-all">
          {dash(b.email)}
        </a>
      </div>
      <div className="space-y-1">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("admin.bookingPhone")}
        </p>
        <a href={`tel:${b.phone}`} className="text-sm text-foreground">
          {dash(b.phone)}
        </a>
      </div>
      <div className="space-y-1 sm:col-span-2 lg:col-span-1">
        <p className="text-xs font-medium text-muted-foreground">{t("admin.bookingVehicle")}</p>
        <p className="text-sm text-foreground">
          {dash(b.vehicleLabel)}
          <span className="ml-2 font-mono text-xs text-muted-foreground">({b.vehicleId})</span>
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{t("admin.bookingPickup")}</p>
        <p className="text-sm text-foreground">{dash(b.pickupDate)}</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{t("admin.bookingReturn")}</p>
        <p className="text-sm text-foreground">{dash(b.returnDate)}</p>
      </div>
      <div className="space-y-1 sm:col-span-2">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("admin.bookingPickupLoc")}
        </p>
        <p className="text-sm text-foreground break-words">{dash(b.pickupLoc)}</p>
      </div>
      <div className="space-y-1 sm:col-span-2">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("admin.bookingReturnLoc")}
        </p>
        <p className="text-sm text-foreground break-words">{dash(b.returnLoc)}</p>
      </div>
    </div>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, id: "overview" },
  { icon: Car, id: "cars" },
  { icon: CalendarCheck, id: "bookings" },
  { icon: Users, id: "customers" },
  { icon: BarChart3, id: "analytics" },
  { icon: FileText, id: "contracts" },
] as const;

const ADMIN_NAV_KEYS: Record<(typeof sidebarItems)[number]["id"], string> = {
  overview: "admin.navOverview",
  cars: "admin.navCars",
  bookings: "admin.navBookings",
  customers: "admin.navCustomers",
  analytics: "admin.navAnalytics",
  contracts: "admin.navContracts",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-amber-500/20 text-amber-400",
  completed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
};

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const tab = (location.state as { defaultTab?: string } | null)?.defaultTab;
    if (tab && sidebarItems.some((s) => s.id === tab)) {
      setActiveTab(tab);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background flex">
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        className="fixed left-0 top-0 bottom-0 z-40 border-r border-border bg-sidebar flex flex-col"
      >
        <div className="h-16 flex items-center px-4 gap-2 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display text-base font-bold leading-tight">
              <span className="text-primary">Dhokkar</span>{" "}
              <span className="text-foreground">Rent A Car</span>
            </span>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-sidebar-accent text-primary font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{t(ADMIN_NAV_KEYS[item.id])}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-1 border-t border-border p-2">
          <button
            type="button"
            onClick={() => {
              logoutAdmin();
              navigate("/admin/login", { replace: true });
              toast.success(t("admin.logoutToast"));
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-destructive"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{t("admin.logout")}</span>}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent/50"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 transition-all duration-300" style={{ marginLeft: collapsed ? 72 : 240 }}>
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground capitalize">
              {t(ADMIN_NAV_KEYS[activeTab as keyof typeof ADMIN_NAV_KEYS] ?? "admin.navOverview")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="admin" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← {t("admin.backToSite")}
            </Link>
          </div>
        </header>

        <div className="p-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "cars" && <CarsTab />}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "contracts" && <ContractsTab />}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-xl p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs text-emerald-400 font-medium">{change}</span>
    </div>
    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const chartTooltipStyle = {
  background: "hsl(230, 25%, 8%)",
  border: "1px solid hsl(230, 20%, 20%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 96%)",
} as const;

const OverviewTab = () => {
  const bookings = useDrivexBookings();
  const fleet = useMergedFleetCars();
  const totalBookings = bookings.length;
  const revenue = getTotalRevenueEUR(bookings);
  const monthlyChart = useMemo(() => getMonthlyBookingStats(bookings), [bookings]);
  const pieByType = useMemo(
    () => getBookingCountsByVehicleType(bookings, fleet),
    [bookings, fleet],
  );
  const pending = bookings.filter((b) => b.status === "pending").length;
  const recent = bookings.slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarCheck}
          label="Total bookings (saved)"
          value={String(totalBookings)}
          change="live"
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={DollarSign}
          label="Chiffre d'affaires (hors annulés)"
          value={formatPriceEUR(revenue)}
          change="live"
          color="bg-emerald-500/10 text-emerald-400"
        />
        <StatCard
          icon={UserCheck}
          label="Pending requests"
          value={String(pending)}
          change="live"
          color="bg-neon-violet/10 text-neon-violet"
        />
        <StatCard
          icon={Activity}
          label="Fleet (catalog + yours)"
          value={String(fleet.length)}
          change="live"
          color="bg-amber-500/10 text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">Revenus (12 derniers mois)</h3>
          <p className="mb-4 text-xs text-muted-foreground">Basé sur les réservations enregistrées (date de demande), hors annulées.</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyChart}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(351, 96%, 44%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(351, 96%, 44%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 16%)" />
              <XAxis dataKey="month" stroke="hsl(220, 15%, 55%)" fontSize={11} interval={0} angle={-35} textAnchor="end" height={56} />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} tickFormatter={(v) => `${v} TND`} />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value: number, name: string) =>
                  name === "revenue"
                    ? [formatPriceEURCompact(value), "Revenus"]
                    : [value, "Réservations"]
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke="hsl(351, 96%, 44%)"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">Réservations par catégorie</h3>
          <p className="mb-4 text-xs text-muted-foreground">Répartition selon le type de véhicule réservé.</p>
          {pieByType.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">Aucune réservation pour afficher le graphique.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    strokeWidth={0}
                    nameKey="name"
                  >
                    {pieByType.map((entry, index) => (
                      <Cell key={`${entry.name}-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2 flex-wrap">
                {pieByType.map((t) => (
                  <div key={t.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    {t.name} ({t.value})
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-display text-lg font-bold text-foreground">Recent bookings</h3>
          <p className="text-xs text-muted-foreground mt-1">From “Réservez votre véhicule” on VIP Fleet</p>
        </div>
        <div className="overflow-x-auto">
          {recent.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No bookings yet. Submit the reservation form on the site to see entries here.
            </p>
          ) : (
            <table className="w-full min-w-[1100px] text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">ID</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Nom</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Email</th>
                  <th className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">Téléphone</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Véhicule</th>
                  <th className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">Prise</th>
                  <th className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">Restitution</th>
                  <th className="text-left p-3 text-muted-foreground font-medium max-w-[140px]">Lieu prise</th>
                  <th className="text-left p-3 text-muted-foreground font-medium max-w-[140px]">Lieu retour</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Statut</th>
                  <th className="text-right p-3 text-muted-foreground font-medium whitespace-nowrap">Montant</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors align-top">
                    <td className="p-3 font-mono text-primary whitespace-nowrap">{b.id}</td>
                    <td className="p-3 text-foreground">{b.customerName}</td>
                    <td className="p-3 text-muted-foreground break-all max-w-[160px]">{b.email}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{b.phone}</td>
                    <td className="p-3 text-muted-foreground">{b.vehicleLabel}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{b.pickupDate}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{b.returnDate}</td>
                    <td className="p-3 text-muted-foreground max-w-[140px] break-words">{dash(b.pickupLoc)}</td>
                    <td className="p-3 text-muted-foreground max-w-[140px] break-words">{dash(b.returnLoc)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${statusColors[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-semibold text-foreground whitespace-nowrap">
                      {formatPriceEUR(b.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const carTypes = ["luxury", "sport", "electric", "economy"] as const;

const CATEGORY_LABELS: Record<(typeof carTypes)[number], string> = {
  economy: "Économique",
  luxury: "Luxe",
  sport: "Sport / performance",
  electric: "Électrique",
};

const FUEL_OPTIONS = ["Essence", "Diesel", "Électrique", "Hybride"] as const;
const GEAR_OPTIONS = [
  { value: "Manuelle", label: "Manuelle" },
  { value: "Automatique", label: "Automatique" },
] as const;

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

function normalizeCategory(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "-");
}

function mapFuelToForm(ft: string): (typeof FUEL_OPTIONS)[number] {
  if ((FUEL_OPTIONS as readonly string[]).includes(ft)) return ft as (typeof FUEL_OPTIONS)[number];
  const m: Record<string, (typeof FUEL_OPTIONS)[number]> = {
    Gasoline: "Essence",
    Electric: "Électrique",
    Hybrid: "Hybride",
  };
  return m[ft] ?? "Essence";
}

function mapGearToForm(t: string): (typeof GEAR_OPTIONS)[number]["value"] {
  const s = t.toLowerCase();
  if (s.includes("manuel") || s.includes("manual")) return "Manuelle";
  return "Automatique";
}

const CarsTab = () => {
  const merged = useMergedFleetCars();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [photoData, setPhotoData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [form, setForm] = useState({
    name: "",
    brand: "",
    registration: "",
    type: "luxury",
    pricePerDay: "",
    fuelType: "Essence" as (typeof FUEL_OPTIONS)[number],
    transmission: "Automatique" as (typeof GEAR_OPTIONS)[number]["value"],
    horsepower: "180",
    acceleration: "7.5s",
    rating: "4.5",
    reviews: "0",
    seats: "5",
  });

  const resetVehicleForm = () => {
    setEditingCar(null);
    setPhotoData("");
    setImageUrl("");
    setForm({
      name: "",
      brand: "",
      registration: "",
      type: "luxury",
      pricePerDay: "",
      fuelType: "Essence",
      transmission: "Automatique",
      horsepower: "180",
      acceleration: "7.5s",
      rating: "4.5",
      reviews: "0",
      seats: "5",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openEdit = (car: CarType) => {
    setEditingCar(car);
    setForm({
      name: car.name,
      brand: car.brand,
      registration: car.registration ?? "",
      type: car.type,
      pricePerDay: String(car.pricePerDay),
      fuelType: mapFuelToForm(car.fuelType),
      transmission: mapGearToForm(car.transmission),
      horsepower: String(car.horsepower),
      acceleration: car.acceleration,
      rating: String(car.rating),
      reviews: String(car.reviews),
      seats: String(car.seats),
    });
    if (car.image.startsWith("data:")) {
      setPhotoData(car.image);
      setImageUrl("");
    } else {
      setPhotoData("");
      setImageUrl(car.image);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    setOpen(true);
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return merged;
    return merged.filter((c) => `${c.brand} ${c.name} ${c.type}`.toLowerCase().includes(s));
  }, [merged, q]);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>(carTypes);
    merged.forEach((c) => {
      if (c.type?.trim()) set.add(normalizeCategory(c.type));
    });
    if (form.type?.trim()) set.add(normalizeCategory(form.type));
    return [...set];
  }, [merged, form.type]);

  const previewSrc = photoData || imageUrl.trim() || undefined;

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Fichier non valide", { description: "Choisissez une image (JPG, PNG, WebP…)." });
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast.error("Image trop lourde", { description: "Taille maximum : 2 Mo." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoData(reader.result as string);
      setImageUrl("");
    };
    reader.readAsDataURL(file);
  };

  const submitCar = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.pricePerDay);
    const finalImage = photoData || imageUrl.trim() || (editingCar?.image ?? "");
    if (!form.brand.trim() || !form.name.trim()) {
      toast.error("Champs requis", { description: "Indiquez la marque et le modèle." });
      return;
    }
    if (!editingCar && !form.registration.trim()) {
      toast.error("Immatriculation", { description: "L’immatriculation est obligatoire pour un nouveau véhicule." });
      return;
    }
    if (Number.isNaN(price) || price <= 0) {
      toast.error("Prix invalide", { description: "Indiquez un prix journalier valide en TND." });
      return;
    }
    if (!finalImage) {
      toast.error("Image requise", { description: "Importez une image ou collez une URL." });
      return;
    }

    const patchBase = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      registration: form.registration.trim() || undefined,
      type: normalizeCategory(form.type || "economy"),
      pricePerDay: price,
      horsepower: Number(form.horsepower) || 150,
      acceleration: form.acceleration || "8.0s",
      fuelType: form.fuelType,
      image: finalImage,
      rating: Number(form.rating) || 4.5,
      reviews: Number(form.reviews) || 0,
      available: true,
      seats: Number(form.seats) || 5,
      transmission: form.transmission,
    };

    if (editingCar) {
      if (isCustomCarId(editingCar.id)) {
        const full: CarType = { ...editingCar, ...patchBase, id: editingCar.id };
        updateCustomCar(editingCar.id, full);
      } else {
        setCatalogOverride(editingCar.id, patchBase);
      }
      toast.success("Véhicule mis à jour");
    } else {
      addCustomCar({
        ...patchBase,
        registration: form.registration.trim(),
      });
      toast.success("Véhicule ajouté", { description: "Il apparaît dans la flotte et le tableau." });
    }
    setOpen(false);
    resetVehicleForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Rechercher un véhicule…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="glass rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary w-full sm:w-64"
          />
        </div>
        <Button
          type="button"
          className="flex items-center gap-2 bg-primary text-primary-foreground shadow-md shadow-primary/20"
          onClick={() => {
            resetVehicleForm();
            setOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Nouveau véhicule
        </Button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) resetVehicleForm();
        }}
      >
        <DialogContent
          className={cn(
            "max-h-[92vh] gap-0 overflow-hidden border-border p-0 sm:max-w-[720px]",
            "bg-card shadow-2xl",
          )}
        >
          <form onSubmit={submitCar} className="flex max-h-[92vh] flex-col">
            <DialogHeader className="space-y-1 border-b border-border bg-muted/20 px-6 py-5 text-left">
              <DialogTitle className="font-display text-xl tracking-tight">
                {editingCar ? "Modifier le véhicule" : "Nouveau véhicule"}
              </DialogTitle>
              <DialogDescription>
                {editingCar
                  ? "Mettez à jour les informations ; les changements s’appliquent sur la page VIP Fleet."
                  : "Ajoutez un nouveau véhicule à la flotte"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid max-h-[min(70vh,560px)] gap-0 overflow-y-auto md:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6 border-border p-6 md:border-r">
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Car className="h-4 w-4 text-primary" aria-hidden />
                    Informations générales
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="nv-brand">
                        Marque <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nv-brand"
                        className="h-11 rounded-lg border-border bg-muted/40"
                        placeholder="Ex : Renault, Peugeot…"
                        value={form.brand}
                        onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="nv-model">
                        Modèle <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nv-model"
                        className="h-11 rounded-lg border-border bg-muted/40"
                        placeholder="Ex : Clio, 208…"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="nv-reg">
                        Immatriculation
                        {!editingCar && <span className="text-destructive"> *</span>}
                        {editingCar && (
                          <span className="ml-1 text-xs font-normal text-muted-foreground">(optionnel pour le catalogue)</span>
                        )}
                      </Label>
                      <Input
                        id="nv-reg"
                        className="h-11 rounded-lg border-border bg-muted/40"
                        value={form.registration}
                        onChange={(e) => setForm((f) => ({ ...f, registration: e.target.value }))}
                        required={!editingCar}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Settings2 className="h-4 w-4 text-primary" aria-hidden />
                    Spécifications techniques
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Carburant</Label>
                      <Select
                        value={form.fuelType}
                        onValueChange={(v) => setForm((f) => ({ ...f, fuelType: v as (typeof FUEL_OPTIONS)[number] }))}
                      >
                        <SelectTrigger className="h-11 rounded-lg border-border bg-muted/40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FUEL_OPTIONS.map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Boîte</Label>
                      <Select
                        value={form.transmission}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, transmission: v as (typeof GEAR_OPTIONS)[number]["value"] }))
                        }
                      >
                        <SelectTrigger className="h-11 rounded-lg border-border bg-muted/40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GEAR_OPTIONS.map((g) => (
                            <SelectItem key={g.value} value={g.value}>
                              {g.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6 p-6">
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Tag className="h-4 w-4 text-primary" aria-hidden />
                    Tarification et catégorie
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="nv-price">
                        Prix journalier (TND) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nv-price"
                        type="number"
                        min={1}
                        step={1}
                        className="h-11 rounded-lg border-border bg-muted/40"
                        placeholder="0"
                        value={form.pricePerDay}
                        onChange={(e) => setForm((f) => ({ ...f, pricePerDay: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Catégorie</Label>
                      <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                        <SelectTrigger className="h-11 rounded-lg border-border bg-muted/40">
                          <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((t) => (
                            <SelectItem key={t} value={t}>
                              {CATEGORY_LABELS[t as keyof typeof CATEGORY_LABELS] ?? t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="nv-new-category">Nouvelle catégorie</Label>
                      <div className="flex gap-2">
                        <Input
                          id="nv-new-category"
                          className="h-11 rounded-lg border-border bg-muted/40"
                          placeholder="Ex : suv"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-11 shrink-0"
                          onClick={() => {
                            const normalized = normalizeCategory(newCategory);
                            if (!normalized) return;
                            setForm((f) => ({ ...f, type: normalized }));
                            setNewCategory("");
                            toast.success(`Catégorie "${normalized}" ajoutée`);
                          }}
                        >
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Upload className="h-4 w-4 text-primary" aria-hidden />
                    Image du véhicule
                  </h4>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    onChange={onPhotoChange}
                  />
                  <div
                    className={cn(
                      "relative flex min-h-[160px] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/25 transition-colors",
                      previewSrc && "border-primary/40 bg-muted/40",
                    )}
                  >
                    {previewSrc ? (
                      <>
                        <img src={previewSrc} alt="Aperçu" className="max-h-48 w-full object-contain" />
                        <button
                          type="button"
                          className="absolute right-2 top-2 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-destructive shadow-sm hover:bg-background"
                          onClick={() => {
                            setPhotoData("");
                            setImageUrl("");
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                        >
                          Retirer
                        </button>
                      </>
                    ) : (
                      <div
                        className="flex w-full flex-col items-center gap-3 py-8 text-center"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const file = e.dataTransfer.files?.[0];
                          if (!file?.type.startsWith("image/")) return;
                          if (file.size > MAX_PHOTO_BYTES) {
                            toast.error("Image trop lourde", { description: "Taille maximum : 2 Mo." });
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPhotoData(reader.result as string);
                            setImageUrl("");
                          };
                          reader.readAsDataURL(file);
                        }}
                      >
                        <Upload className="h-10 w-10 text-muted-foreground/40" aria-hidden />
                        <p className="text-sm text-muted-foreground">Glissez-déposez ou choisissez un fichier</p>
                        <Button
                          type="button"
                          variant="secondary"
                          className="rounded-lg"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Choisir une photo
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG, WebP — max. 2 Mo</p>
                      </div>
                    )}
                  </div>
                  {previewSrc && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full rounded-lg"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Changer la photo
                    </Button>
                  )}
                  <div className="mt-4 space-y-1.5">
                    <Label htmlFor="nv-img-url" className="text-xs text-muted-foreground">
                      Ou URL de l&apos;image
                    </Label>
                    <Input
                      id="nv-img-url"
                      className="h-10 rounded-lg border-border bg-muted/30 text-sm"
                      placeholder="https://…"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        if (e.target.value.trim()) setPhotoData("");
                      }}
                      disabled={!!photoData}
                    />
                    {photoData && (
                      <p className="text-[11px] text-muted-foreground">Effacez la photo importée pour utiliser une URL.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:justify-end">
              <Button type="button" variant="outline" className="min-w-[100px] rounded-lg" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="min-w-[160px] rounded-lg font-semibold shadow-md shadow-primary/25">
                {editingCar ? "Enregistrer" : "Ajouter le véhicule"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-muted-foreground font-medium">Véhicule</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Prix / jour</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Note</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Statut</th>
                <th className="text-right p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => (
                <tr key={car.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={car.image} alt={car.name} className="h-10 w-16 object-cover rounded-md ring-1 ring-border" />
                      <div>
                        <p className="font-semibold text-foreground">{car.name}</p>
                        <p className="text-xs text-muted-foreground">{car.brand}</p>
                        {car.registration && (
                          <p className="text-[11px] text-muted-foreground/80">{car.registration}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{CATEGORY_LABELS[car.type as keyof typeof CATEGORY_LABELS] ?? car.type}</td>
                  <td className="p-4 font-semibold text-primary tabular-nums">
                    {formatPriceEUR(car.pricePerDay)}
                  </td>
                  <td className="p-4 text-muted-foreground">{car.rating} ★</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        car.available ? "bg-emerald-500/20 text-emerald-400" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {car.available ? "Disponible" : "Indisponible"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title={car.available ? "Marquer indisponible" : "Marquer disponible"}
                        className={cn(
                          "rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors",
                          car.available
                            ? "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
                            : "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25",
                        )}
                        onClick={() => {
                          const nextAvailable = !car.available;
                          if (isCustomCarId(car.id)) {
                            updateCustomCar(car.id, { ...car, available: nextAvailable });
                          } else {
                            setCatalogOverride(car.id, { available: nextAvailable });
                          }
                          toast.success(nextAvailable ? "Véhicule marqué disponible" : "Véhicule marqué indisponible");
                        }}
                      >
                        {car.available ? "Indisponible" : "Disponible"}
                      </button>
                      <button
                        type="button"
                        title="Modifier"
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                        onClick={() => openEdit(car)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Retirer de la flotte"
                        className="rounded-lg p-2 text-destructive/90 transition-colors hover:bg-destructive/10"
                        onClick={() => {
                          if (!confirm(`Retirer « ${car.brand} ${car.name} » de la flotte ?`)) return;
                          removeVehicleFromFleet(car.id);
                          toast.success("Véhicule retiré de la flotte");
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BOOKING_FILTERS: Array<"all" | BookingStatus> = ["all", "pending", "active", "completed", "cancelled"];

const BookingsTab = () => {
  const bookings = useDrivexBookings();
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="p-5 border-b border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">All bookings</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Synced from the VIP reservation form</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {BOOKING_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === s ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 gap-2"
            title="Exporter toutes les réservations vers un fichier Excel"
            onClick={() => {
              downloadBookingsExportExcel(bookings);
              toast.success("Export téléchargé", { description: `${bookings.length} ligne(s).` });
            }}
          >
            <FileDown className="h-4 w-4" />
            Exporter tout
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No bookings for this filter.</p>
        ) : (
          filtered.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-border bg-muted/15 p-5 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-sm font-semibold text-primary">{b.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Reçu le {formatReceivedAt(b.createdAt)} · Montant estimé{" "}
                    <span className="font-semibold text-foreground">{formatPriceEUR(b.amount)}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Statut</span>
                  <Select
                    value={b.status}
                    onValueChange={(v) => {
                      updateBookingStatus(b.id, v as BookingStatus);
                      toast.success("Status updated");
                    }}
                  >
                    <SelectTrigger className="h-9 w-[150px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="active">active</SelectItem>
                      <SelectItem value="completed">completed</SelectItem>
                      <SelectItem value="cancelled">cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      deleteBooking(b.id);
                      toast.success("Booking removed");
                    }}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Détails (formulaire « Réservez votre véhicule »)
              </p>
              <BookingReservationDetails b={b} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CustomersTab = () => {
  const navigate = useNavigate();
  const customers = useDrivexCustomers();
  const bookings = useDrivexBookings();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cin, setCin] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setDialogMode("add");
    setEditingId(null);
    setName("");
    setEmail("");
    setPhone("");
    setCin("");
    setAddress("");
    setNotes("");
  };

  const openAdd = () => {
    resetForm();
    setOpen(true);
  };

  const rows = useMemo(() => {
    const emailCounts = new Map<string, number>();
    for (const b of bookings) {
      const k = b.email.toLowerCase();
      emailCounts.set(k, (emailCounts.get(k) ?? 0) + 1);
    }
    const s = q.trim().toLowerCase();
    let list = customers.map((c) => ({
      ...c,
      bookingsFromForm: emailCounts.get(c.email.toLowerCase()) ?? 0,
    }));
    if (s) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s) ||
          (c.phone && c.phone.includes(s)) ||
          (c.address && c.address.toLowerCase().includes(s)) ||
          (c.cin && c.cin.toLowerCase().includes(s)),
      );
    }
    return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [customers, bookings, q]);

  const openEdit = (c: CustomerRecord) => {
    setDialogMode("edit");
    setEditingId(c.id);
    setName(c.name);
    setEmail(c.email);
    setPhone(c.phone ?? "");
    setCin(c.cin ?? "");
    setAddress(c.address ?? "");
    setNotes(c.notes ?? "");
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (dialogMode === "edit" && editingId) {
        updateCustomer(editingId, {
          name,
          email,
          phone: phone || undefined,
          cin: cin || undefined,
          address: address || undefined,
          notes: notes || undefined,
        });
        toast.success("Client mis à jour");
      } else {
        addCustomerManual({
          name,
          email,
          phone: phone || undefined,
          cin: cin || undefined,
          address: address || undefined,
          notes: notes || undefined,
        });
        toast.success("Customer added");
      }
      setOpen(false);
      resetForm();
    } catch (err) {
      const msg = (err as Error).message;
      if (msg === "duplicate-email") {
        toast.error("Email déjà utilisé", { description: "Un autre client possède cette adresse e-mail." });
      } else {
        toast.error("Impossible d'enregistrer le client");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Customers</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manual entries plus contacts created from reservation forms
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="glass rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none w-full sm:w-48"
              />
            </div>
            <Button type="button" className="gap-2" onClick={openAdd}>
              <Plus className="w-4 h-4" />
              Add customer
            </Button>
          </div>
        </div>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) resetForm();
          }}
        >
          <DialogContent>
            <form onSubmit={submit}>
              <DialogHeader>
                <DialogTitle>{dialogMode === "edit" ? "Modifier le client" : "New customer"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="cu-name">Name</Label>
                  <Input id="cu-name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cu-email">Email</Label>
                  <Input id="cu-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cu-phone">Phone</Label>
                  <Input id="cu-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cu-cin">CIN / ID</Label>
                  <Input id="cu-cin" value={cin} onChange={(e) => setCin(e.target.value)} placeholder="Ex. 14513200" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cu-address">Adresse</Label>
                  <Input
                    id="cu-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ville, rue…"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="cu-notes">Notes</Label>
                  <Input id="cu-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{dialogMode === "edit" ? "Enregistrer" : "Save"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="overflow-x-auto">
          {rows.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              {customers.length === 0 && !q.trim()
                ? "No customers yet. Add one above or receive contacts from reservation forms."
                : "No customers match your search."}
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Adresse</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Source</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Form bookings</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Joined</th>
                  <th className="text-right p-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr
                    key={c.id}
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/25"
                    onClick={() => navigate(`/admin/customers/${c.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/admin/customers/${c.id}`);
                      }
                    }}
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                        {c.phone && <p className="text-xs text-muted-foreground">{c.phone}</p>}
                      </div>
                    </td>
                    <td className="max-w-[200px] p-4 text-xs text-muted-foreground">
                      {c.address?.trim() ? c.address : "—"}
                    </td>
                    <td className="p-4 capitalize text-muted-foreground">{c.source}</td>
                    <td className="p-4 text-muted-foreground">{c.bookingsFromForm}</td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {c.createdAt.slice(0, 10)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          title="Modifier"
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(c);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Supprimer"
                          className="p-1.5 rounded-lg hover:bg-muted/50 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCustomer(c.id);
                            toast.success("Customer removed");
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const MAX_CONTRACT_PDF_BYTES = 4 * 1024 * 1024;

function readPdfAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const okType = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!okType) {
      reject(new Error("not-pdf"));
      return;
    }
    if (file.size > MAX_CONTRACT_PDF_BYTES) {
      reject(new Error("too-large"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("read-fail"));
    reader.readAsDataURL(file);
  });
}

function triggerDownloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function ContractPdfSlot({
  bookingId,
  kind,
  title,
  dataUrl,
}: {
  bookingId: string;
  kind: "client" | "owner";
  title: string;
  dataUrl?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const url = await readPdfAsDataUrl(file);
      try {
        setBookingContractPdf(bookingId, kind, url);
      } catch {
        toast.error("Stockage plein ou indisponible — essayez un PDF plus petit.");
        return;
      }
      toast.success(`PDF ${title} enregistré`);
    } catch (err) {
      const msg = (err as Error).message;
      if (msg === "too-large") toast.error("PDF trop volumineux (max. 4 Mo)");
      else if (msg === "not-pdf") toast.error("Choisissez un fichier PDF");
      else toast.error("Impossible de lire le fichier");
    }
  };

  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={onFile}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant={dataUrl ? "outline" : "default"}
          className="rounded-lg"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-4 w-4" />
          {dataUrl ? "Remplacer" : "Importer PDF"}
        </Button>
        {dataUrl ? (
          <>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="rounded-lg"
              onClick={() =>
                triggerDownloadDataUrl(
                  dataUrl,
                  `contrat-${bookingId}-${kind === "client" ? "client" : "proprietaire"}.pdf`,
                )
              }
            >
              <FileDown className="mr-1.5 h-4 w-4" />
              Télécharger
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                setBookingContractPdf(bookingId, kind, undefined);
                toast.success("Fichier retiré");
              }}
            >
              Retirer
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}

const ContractsTab = () => {
  const navigate = useNavigate();
  const bookings = useDrivexBookings();
  const customers = useDrivexCustomers();
  const fleet = useMergedFleetCars();

  const contractNumberById = useMemo(() => {
    const ch = [...bookings].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return new Map(ch.map((b, i) => [b.id, String(i + 1).padStart(5, "0")]));
  }, [bookings]);

  const sorted = useMemo(
    () => [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [bookings],
  );

  const cinFor = (email: string) =>
    customers.find((c) => c.email.toLowerCase() === email.toLowerCase())?.cin?.trim();

  const immatFor = (vehicleId: string) => fleet.find((c) => c.id === vehicleId)?.registration?.trim();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Contrats de location</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Importez un PDF pour le client et un pour l&apos;agence / propriétaire. Les fichiers sont stockés localement dans ce
          navigateur (données du tableau de bord).
        </p>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-xl border border-border bg-muted/20 py-12 text-center text-sm text-muted-foreground">
          Aucune réservation — ajoutez-en depuis le site ou l&apos;onglet Réservations.
        </p>
      ) : (
        <div className="space-y-4">
          {sorted.map((b) => {
            const num = contractNumberById.get(b.id) ?? "00000";
            const edited = (() => {
              try {
                return new Date(b.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              } catch {
                return b.createdAt.slice(0, 10);
              }
            })();

            return (
              <div
                key={b.id}
                className="rounded-2xl border border-border bg-card/40 p-5 shadow-sm md:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-primary px-2.5 py-1 font-mono text-xs font-bold text-primary-foreground">
                        CONTRAT #{num}
                      </span>
                      <span className="text-xs text-muted-foreground">Édité le {edited}</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Locataire</p>
                        <p className="mt-1 font-medium text-foreground">{dash(b.customerName)}</p>
                        <p className="text-xs text-muted-foreground">
                          CIN : {dash(cinFor(b.email))}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Véhicule</p>
                        <p className="mt-1 font-medium text-foreground">{dash(b.vehicleLabel)}</p>
                        <p className="text-xs text-muted-foreground">
                          Immat. : {immatFor(b.vehicleId) ? immatFor(b.vehicleId) : "—"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm">
                      <span className="text-muted-foreground">Montant : </span>
                      <span className="font-semibold tabular-nums text-primary">{formatPriceEUR(b.amount)}</span>
                      <span className="ml-2 inline-flex rounded-full border border-border px-2 py-0.5 text-[10px] capitalize text-muted-foreground">
                        {b.status}
                      </span>
                    </p>
                  </div>

                  <div className="w-full shrink-0 space-y-3 lg:max-w-md">
                    <ContractPdfSlot bookingId={b.id} kind="client" title="Copie client" dataUrl={b.contractPdfClient} />
                    <ContractPdfSlot
                      bookingId={b.id}
                      kind="owner"
                      title="Copie agence / propriétaire"
                      dataUrl={b.contractPdfOwner}
                    />
                  </div>
                </div>

                <div className="mt-4 border-t border-border/60 pt-4">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={() => navigate("/admin", { state: { defaultTab: "bookings" } })}
                  >
                    Voir la réservation dans l&apos;onglet Réservations
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AnalyticsTab = () => {
  const bookings = useDrivexBookings();
  const monthlyChart = useMemo(() => getMonthlyBookingStats(bookings), [bookings]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Données issues des réservations enregistrées (12 derniers mois, date de demande). Revenus hors réservations annulées.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">Tendances des réservations</h3>
          <p className="mb-4 text-xs text-muted-foreground">Nombre de demandes par mois.</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 16%)" />
              <XAxis
                dataKey="month"
                stroke="hsl(220, 15%, 55%)"
                fontSize={11}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={56}
              />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value: number, name: string) =>
                  name === "bookings" ? [value, "Réservations"] : [value, name]
                }
              />
              <Bar
                dataKey="bookings"
                name="bookings"
                fill="hsl(270, 60%, 55%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">Évolution du chiffre d'affaires</h3>
          <p className="mb-4 text-xs text-muted-foreground">Revenus cumulés par mois (hors annulés).</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 16%)" />
              <XAxis
                dataKey="month"
                stroke="hsl(220, 15%, 55%)"
                fontSize={11}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={56}
              />
              <YAxis stroke="hsl(220, 15%, 55%)" fontSize={12} tickFormatter={(v) => `${v} TND`} />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value: number, name: string) =>
                  name === "revenue" ? [formatPriceEURCompact(value), "Revenus"] : [value, name]
                }
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke="hsl(351, 96%, 44%)"
                strokeWidth={2}
                dot={{ fill: "hsl(351, 96%, 44%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Admin;
