import { cars as catalogCars } from "@/data/cars";
import type { Car } from "@/data/cars";

export const DRIVEX_KEYS = {
  bookings: "drivex-bookings-v1",
  customCars: "drivex-custom-cars-v1",
  customers: "drivex-customers-v1",
  hiddenCatalogIds: "drivex-hidden-catalog-ids-v1",
  catalogOverrides: "drivex-catalog-overrides-v1",
} as const;

const KEY_BOOKINGS = DRIVEX_KEYS.bookings;
const KEY_CUSTOM_CARS = DRIVEX_KEYS.customCars;
const KEY_CUSTOMERS = DRIVEX_KEYS.customers;
const KEY_HIDDEN_CATALOG = DRIVEX_KEYS.hiddenCatalogIds;
const KEY_CATALOG_OVERRIDES = DRIVEX_KEYS.catalogOverrides;

export type BookingStatus = "pending" | "active" | "completed" | "cancelled";

export interface BookingRecord {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleId: string;
  vehicleLabel: string;
  pickupDate: string;
  returnDate: string;
  pickupLoc: string;
  returnLoc: string;
  status: BookingStatus;
  createdAt: string;
  amount: number;
  /** Base64 data URL (`data:application/pdf;base64,...`) — client-signed copy */
  contractPdfClient?: string;
  /** Base64 data URL — owner / agency copy */
  contractPdfOwner?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  /** National ID / CIN */
  cin?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  source: "manual" | "booking";
}

function notify() {
  window.dispatchEvent(new CustomEvent("drivex-storage"));
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("drivexStorage write failed", e);
    throw new Error("storage-unavailable");
  }
  notify();
}

export function subscribeDrivex(cb: () => void) {
  const fn = () => cb();
  window.addEventListener("drivex-storage", fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener("drivex-storage", fn);
    window.removeEventListener("storage", fn);
  };
}

export function getBookings(): BookingRecord[] {
  return readJSON(KEY_BOOKINGS, []);
}

export function getCustomCars(): Car[] {
  return readJSON(KEY_CUSTOM_CARS, []);
}

export function getCustomers(): CustomerRecord[] {
  return readJSON(KEY_CUSTOMERS, []);
}

export function getCustomerById(id: string): CustomerRecord | undefined {
  return getCustomers().find((c) => c.id === id);
}

function estimateAmount(
  fleet: Car[],
  vehicleId: string,
  pickupDate: string,
  returnDate: string,
): number {
  const car = fleet.find((c) => c.id === vehicleId);
  const price = car?.pricePerDay ?? 0;
  const d1 = new Date(pickupDate);
  const d2 = new Date(returnDate);
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return price;
  const ms = Math.max(0, d2.getTime() - d1.getTime());
  const days = Math.max(1, Math.ceil(ms / 86400000));
  return Math.round(days * price);
}

export interface NewBookingInput {
  customerName: string;
  email: string;
  phone: string;
  vehicleId: string;
  vehicleLabel: string;
  pickupDate: string;
  returnDate: string;
  pickupLoc: string;
  returnLoc: string;
  fleet: Car[];
}

export function addBooking(input: NewBookingInput): BookingRecord {
  const id = `BK-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const amount = estimateAmount(input.fleet, input.vehicleId, input.pickupDate, input.returnDate);
  const record: BookingRecord = {
    id,
    customerName: input.customerName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    vehicleId: input.vehicleId,
    vehicleLabel: input.vehicleLabel,
    pickupDate: input.pickupDate,
    returnDate: input.returnDate,
    pickupLoc: input.pickupLoc,
    returnLoc: input.returnLoc,
    status: "pending",
    createdAt,
    amount,
  };
  const list = getBookings();
  list.unshift(record);
  writeJSON(KEY_BOOKINGS, list);
  upsertCustomerFromBooking(record);
  return record;
}

function upsertCustomerFromBooking(b: BookingRecord) {
  const customers = getCustomers();
  const email = b.email.toLowerCase();
  const idx = customers.findIndex((c) => c.email.toLowerCase() === email);
  if (idx >= 0) {
    const prev = customers[idx];
    customers[idx] = {
      ...prev,
      name: b.customerName || prev.name,
      phone: b.phone || prev.phone,
    };
  } else {
    customers.push({
      id: `cust-${Date.now()}`,
      name: b.customerName,
      email,
      phone: b.phone,
      createdAt: b.createdAt,
      source: "booking",
    });
  }
  writeJSON(KEY_CUSTOMERS, customers);
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  const list = getBookings();
  const i = list.findIndex((b) => b.id === id);
  if (i < 0) return;
  list[i] = { ...list[i], status };
  writeJSON(KEY_BOOKINGS, list);
}

export type BookingContractPdfKind = "client" | "owner";

/** Attach or remove a contract PDF (data URL). Pass `undefined` to clear. */
export function setBookingContractPdf(id: string, kind: BookingContractPdfKind, dataUrl: string | undefined) {
  const list = getBookings();
  const i = list.findIndex((b) => b.id === id);
  if (i < 0) return;
  const key = kind === "client" ? "contractPdfClient" : "contractPdfOwner";
  const next: BookingRecord = { ...list[i] };
  if (dataUrl === undefined) {
    delete next[key];
  } else {
    next[key] = dataUrl;
  }
  list[i] = next;
  writeJSON(KEY_BOOKINGS, list);
}

export function deleteBooking(id: string) {
  const list = getBookings().filter((b) => b.id !== id);
  writeJSON(KEY_BOOKINGS, list);
}

export function addCustomCar(car: Omit<Car, "id"> & { id?: string }) {
  const id = car.id ?? `c-${Date.now()}`;
  const full: Car = { ...car, id } as Car;
  const list = getCustomCars();
  list.push(full);
  writeJSON(KEY_CUSTOM_CARS, list);
  return full;
}

export function deleteCustomCar(id: string) {
  const list = getCustomCars().filter((c) => c.id !== id);
  writeJSON(KEY_CUSTOM_CARS, list);
}

export function isCustomCarId(id: string): boolean {
  return getCustomCars().some((c) => c.id === id);
}

export function getHiddenCatalogIds(): string[] {
  return readJSON(KEY_HIDDEN_CATALOG, []);
}

export function hideCatalogCar(id: string) {
  const ids = getHiddenCatalogIds();
  if (ids.includes(id)) return;
  ids.push(id);
  writeJSON(KEY_HIDDEN_CATALOG, ids);
}

/** Partial overrides for built-in catalog vehicles (by catalog id). */
export function getCatalogOverrides(): Record<string, Partial<Car>> {
  return readJSON(KEY_CATALOG_OVERRIDES, {});
}

export function setCatalogOverride(id: string, patch: Partial<Car>) {
  const all = { ...getCatalogOverrides() };
  all[id] = { ...(all[id] ?? {}), ...patch };
  writeJSON(KEY_CATALOG_OVERRIDES, all);
}

export function clearCatalogOverride(id: string) {
  const all = { ...getCatalogOverrides() };
  delete all[id];
  writeJSON(KEY_CATALOG_OVERRIDES, all);
}

/** Merge catalog + hidden ids + overrides + custom cars (same logic as the fleet hook). */
export function computeMergedFleetCars(): Car[] {
  const hidden = new Set(getHiddenCatalogIds());
  const overrides = getCatalogOverrides();
  const custom = getCustomCars();
  const base = catalogCars
    .filter((c) => !hidden.has(c.id))
    .map((c) => {
      const o = overrides[c.id];
      return o ? ({ ...c, ...o } as Car) : c;
    });
  return [...base, ...custom];
}

export function updateCustomCar(id: string, next: Car) {
  const list = getCustomCars();
  const i = list.findIndex((c) => c.id === id);
  if (i < 0) return;
  list[i] = { ...next, id };
  writeJSON(KEY_CUSTOM_CARS, list);
}

/** Remove from fleet: custom entry deleted; catalog id is hidden. */
export function removeVehicleFromFleet(id: string) {
  if (isCustomCarId(id)) {
    deleteCustomCar(id);
    return;
  }
  if (catalogCars.some((c) => c.id === id)) {
    hideCatalogCar(id);
    clearCatalogOverride(id);
  }
}

export function isCatalogCarId(id: string): boolean {
  return catalogCars.some((c) => c.id === id);
}

export function addCustomerManual(input: {
  name: string;
  email: string;
  phone?: string;
  cin?: string;
  address?: string;
  notes?: string;
}): CustomerRecord {
  const email = input.email.trim().toLowerCase();
  const customers = getCustomers();
  if (customers.some((c) => c.email.toLowerCase() === email)) {
    throw new Error("duplicate-email");
  }
  const record: CustomerRecord = {
    id: `cust-${Date.now()}`,
    name: input.name.trim(),
    email,
    phone: input.phone?.trim(),
    cin: input.cin?.trim(),
    address: input.address?.trim(),
    notes: input.notes?.trim(),
    createdAt: new Date().toISOString(),
    source: "manual",
  };
  customers.push(record);
  writeJSON(KEY_CUSTOMERS, customers);
  return record;
}

export function deleteCustomer(id: string) {
  const list = getCustomers().filter((c) => c.id !== id);
  writeJSON(KEY_CUSTOMERS, list);
}

export function updateCustomer(
  id: string,
  patch: {
    name: string;
    email: string;
    phone?: string;
    cin?: string;
    address?: string;
    notes?: string;
  },
) {
  const customers = getCustomers();
  const i = customers.findIndex((c) => c.id === id);
  if (i < 0) throw new Error("not-found");
  const prev = customers[i];
  const email = patch.email.trim().toLowerCase();
  if (customers.some((c, j) => j !== i && c.email.toLowerCase() === email)) {
    throw new Error("duplicate-email");
  }

  const oldEmailLower = prev.email.toLowerCase();
  const nameTrim = patch.name.trim();

  customers[i] = {
    ...prev,
    name: nameTrim,
    email,
    phone: patch.phone?.trim(),
    cin: patch.cin?.trim(),
    address: patch.address?.trim(),
    notes: patch.notes?.trim(),
  };
  writeJSON(KEY_CUSTOMERS, customers);

  const bookings = getBookings();
  let bookingWrites = false;
  for (let j = 0; j < bookings.length; j++) {
    if (bookings[j].email.toLowerCase() !== oldEmailLower) continue;
    bookings[j] = {
      ...bookings[j],
      email,
      customerName: nameTrim,
    };
    bookingWrites = true;
  }
  if (bookingWrites) {
    writeJSON(KEY_BOOKINGS, bookings);
  }
}
