import type { BookingRecord } from "@/lib/drivexStorage";

export type MonthlyBookingPoint = {
  month: string;
  revenue: number;
  bookings: number;
};

/** Last 12 calendar months from `createdAt`. Revenue sums `amount` for non-cancelled bookings. */
export function getMonthlyBookingStats(bookings: BookingRecord[]): MonthlyBookingPoint[] {
  const now = new Date();
  const rows: { y: number; m: number; label: string; revenue: number; bookings: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    rows.push({
      y: d.getFullYear(),
      m: d.getMonth(),
      label: d.toLocaleString("fr-FR", { month: "short", year: "2-digit" }),
      revenue: 0,
      bookings: 0,
    });
  }
  for (const b of bookings) {
    const d = new Date(b.createdAt);
    if (Number.isNaN(d.getTime())) continue;
    const row = rows.find((r) => r.y === d.getFullYear() && r.m === d.getMonth());
    if (row) {
      row.bookings += 1;
      if (b.status !== "cancelled") {
        row.revenue += b.amount;
      }
    }
  }
  return rows.map(({ label, revenue, bookings }) => ({ month: label, revenue, bookings }));
}

const TYPE_META: Record<
  string,
  { label: string; color: string }
> = {
  luxury: { label: "Luxe", color: "hsl(45, 100%, 50%)" },
  sport: { label: "Sport", color: "hsl(0, 80%, 55%)" },
  electric: { label: "Électrique", color: "hsl(351, 96%, 44%)" },
  economy: { label: "Économique", color: "hsl(150, 60%, 45%)" },
};

/** Booking counts by fleet vehicle type (for pie chart). */
export function getBookingCountsByVehicleType(
  bookings: BookingRecord[],
  fleet: { id: string; type: string }[],
): { name: string; value: number; color: string }[] {
  const counts: Record<string, number> = {};
  for (const b of bookings) {
    const car = fleet.find((c) => c.id === b.vehicleId);
    if (!car) continue;
    counts[car.type] = (counts[car.type] ?? 0) + 1;
  }
  return Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([type, value]) => ({
      name: TYPE_META[type]?.label ?? type,
      value,
      color: TYPE_META[type]?.color ?? "hsl(220, 20%, 50%)",
    }));
}

/** Total revenue (€) from bookings that are not cancelled. */
export function getTotalRevenueEUR(bookings: BookingRecord[]): number {
  return bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.amount, 0);
}
