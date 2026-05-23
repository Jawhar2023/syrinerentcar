import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, History, IdCard, LogOut, Mail, MapPin, Phone } from "lucide-react";
import { useDrivexBookings, useDrivexCustomers } from "@/hooks/useDrivexData";
import { toast } from "sonner";
import type { BookingStatus } from "@/lib/drivexStorage";
import { logoutAdmin } from "@/lib/adminAuth";
import { formatPriceEUR } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

const statusLabelFr: Record<BookingStatus, string> = {
  pending: "En attente",
  active: "Actif",
  completed: "Terminé",
  cancelled: "Annulé",
};

const statusClass: Record<BookingStatus, string> = {
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  completed: "bg-primary/15 text-primary border-primary/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function dash(v: string | undefined) {
  const t = v?.trim();
  return t ? t : "—";
}

export default function AdminCustomerProfile() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const customers = useDrivexCustomers();
  const bookings = useDrivexBookings();

  const customer = useMemo(
    () => customers.find((c) => c.id === customerId),
    [customers, customerId],
  );

  const customerBookings = useMemo(() => {
    if (!customer) return [];
    const email = customer.email.toLowerCase();
    return bookings
      .filter((b) => b.email.toLowerCase() === email)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [bookings, customer]);

  const totalRevenueEUR = useMemo(
    () =>
      customerBookings.reduce((s, b) => s + (b.status === "cancelled" ? 0 : b.amount), 0),
    [customerBookings],
  );

  const isLoyal = customerBookings.length >= 2 || totalRevenueEUR >= 500;

  if (!customerId || !customer) {
    return (
      <div className="min-h-screen bg-background px-6 py-12 text-foreground">
        <p className="text-muted-foreground">Client introuvable.</p>
        <Link
          to="/admin"
          state={{ defaultTab: "customers" }}
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la gestion des clients
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-sidebar/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div>
            <Link
              to="/admin"
              state={{ defaultTab: "customers" }}
              className="inline-flex items-center gap-2 text-sm font-medium text-red-500 transition-colors hover:text-red-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la gestion des clients
            </Link>
            <h1 className="font-display mt-6 text-2xl font-bold tracking-tight sm:text-3xl">Profil Client</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              logoutAdmin();
              toast.success("Déconnexion");
              navigate("/admin/login", { replace: true });
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left column */}
          <aside className="w-full shrink-0 space-y-4 lg:w-[320px]">
            <div className="rounded-2xl border border-border bg-card/50 p-6 shadow-sm">
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/80 via-neon-violet/70 to-primary text-2xl font-bold text-white shadow-inner">
                {initialsFromName(customer.name)}
              </div>
              <h2 className="text-center font-display text-xl font-semibold text-foreground">{customer.name}</h2>
              <div className="mt-3 flex justify-center">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium",
                    isLoyal
                      ? "border-neon-violet/40 bg-neon-violet/15 text-neon-violet"
                      : "border-border bg-muted/50 text-muted-foreground",
                  )}
                >
                  {isLoyal ? "Client Fidèle" : "Client"}
                </span>
              </div>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex gap-3">
                  <IdCard className="mt-0.5 h-4 w-4 shrink-0 text-red-500/90" aria-hidden />
                  <span className="text-muted-foreground">
                    <span className="text-foreground/80">CIN: </span>
                    {dash(customer.cin)}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-red-500/90" aria-hidden />
                  <a href={`mailto:${customer.email}`} className="break-all text-primary hover:underline">
                    {customer.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-red-500/90" aria-hidden />
                  <a href={`tel:${customer.phone}`} className="text-foreground hover:underline">
                    {dash(customer.phone)}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500/90" aria-hidden />
                  <span className="text-muted-foreground">{dash(customer.address)}</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Réservations
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-foreground">{customerBookings.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Montant total (hors annulés)
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-emerald-400">
                  {formatPriceEUR(totalRevenueEUR)}
                </p>
              </div>
            </div>
          </aside>

          {/* Rental history */}
          <section className="min-w-0 flex-1 rounded-2xl border border-border bg-card/40 p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-foreground">Historique des locations</h3>
              <History className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            </div>

            {customerBookings.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">Aucune location enregistrée</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Véhicule
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Période
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Prix total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerBookings.map((row) => (
                      <tr key={row.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium text-foreground">{row.vehicleLabel}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.pickupDate} → {row.returnDate}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">
                          {formatPriceEUR(row.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                              statusClass[row.status],
                            )}
                          >
                            {statusLabelFr[row.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
