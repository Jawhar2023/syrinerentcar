import * as XLSX from "xlsx";
import type { Car } from "@/data/cars";
import type { BookingRecord } from "@/lib/drivexStorage";

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Headers matching the import parser (1st sheet = reservations). */
const TEMPLATE_HEADERS = [
  "nom",
  "email",
  "phone",
  "vehicleId",
  "vehicule",
  "pickupDate",
  "returnDate",
  "pickupLoc",
  "returnLoc",
  "montant",
  "statut",
  "date_creation",
];

/**
 * Pre-built workbook: sheet « Reservations » (header + example row) and « Vehicules_flotte » (all IDs).
 * User can edit rows, add lines, then use « Importer Excel ».
 */
export function downloadBookingsTemplateExcel(fleet: Car[]) {
  const car = fleet[0];
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + 2);
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const exampleRow: (string | number)[] = [
    "Jean Dupont",
    "client@exemple.com",
    "12345678",
    car?.id ?? "1",
    car ? `${car.brand} ${car.name}`.trim() : "Tesla Model S",
    iso(today),
    iso(end),
    "Aéroport Tunis",
    "Centre-ville Tunis",
    "",
    "pending",
    "",
  ];

  const ws = XLSX.utils.aoa_to_sheet([TEMPLATE_HEADERS, exampleRow]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reservations");

  const fleetHeader = ["vehicleId", "marque", "modele", "type", "prix_jour"];
  const fleetRows = fleet.map((c) => [c.id, c.brand, c.name, c.type, c.pricePerDay]);
  const wsFleet = XLSX.utils.aoa_to_sheet([fleetHeader, ...fleetRows]);
  XLSX.utils.book_append_sheet(wb, wsFleet, "Vehicules_flotte");

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  triggerBlobDownload(
    new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    "dhokkar-modele-reservations.xlsx",
  );
}

/** Export all booking fields for backup / edit / re-import. */
export function downloadBookingsExportExcel(bookings: BookingRecord[]) {
  const headers = [
    "id",
    "nom",
    "email",
    "phone",
    "vehicleId",
    "vehicule",
    "pickupDate",
    "returnDate",
    "pickupLoc",
    "returnLoc",
    "statut",
    "montant",
    "date_creation",
  ];
  const rows = bookings.map((b) => [
    b.id,
    b.customerName,
    b.email,
    b.phone,
    b.vehicleId,
    b.vehicleLabel,
    b.pickupDate,
    b.returnDate,
    b.pickupLoc,
    b.returnLoc,
    b.status,
    b.amount,
    b.createdAt,
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reservations");
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const stamp = new Date().toISOString().slice(0, 10);
  triggerBlobDownload(
    new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    `dhokkar-reservations-export-${stamp}.xlsx`,
  );
}
