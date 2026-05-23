import { useMemo, useSyncExternalStore } from "react";
import type { Car } from "@/data/cars";
import {
  computeMergedFleetCars,
  DRIVEX_KEYS,
  getBookings,
  getCustomers,
  subscribeDrivex,
  type BookingRecord,
  type CustomerRecord,
} from "@/lib/drivexStorage";

function snapBookings() {
  return localStorage.getItem(DRIVEX_KEYS.bookings) ?? "[]";
}

/** Any fleet-related key change must bump this snapshot so the merged list refreshes. */
function snapFleet() {
  return [
    localStorage.getItem(DRIVEX_KEYS.customCars) ?? "[]",
    localStorage.getItem(DRIVEX_KEYS.hiddenCatalogIds) ?? "[]",
    localStorage.getItem(DRIVEX_KEYS.catalogOverrides) ?? "{}",
  ].join("\n");
}

function snapCustomers() {
  return localStorage.getItem(DRIVEX_KEYS.customers) ?? "[]";
}

export function useMergedFleetCars(): Car[] {
  const raw = useSyncExternalStore(subscribeDrivex, snapFleet, () => "\n\n");
  return useMemo(() => computeMergedFleetCars(), [raw]);
}

export function useDrivexBookings(): BookingRecord[] {
  const raw = useSyncExternalStore(subscribeDrivex, snapBookings, () => "[]");
  return useMemo(() => {
    try {
      return JSON.parse(raw) as BookingRecord[];
    } catch {
      return getBookings();
    }
  }, [raw]);
}

export function useDrivexCustomers(): CustomerRecord[] {
  const raw = useSyncExternalStore(subscribeDrivex, snapCustomers, () => "[]");
  return useMemo(() => {
    try {
      return JSON.parse(raw) as CustomerRecord[];
    } catch {
      return getCustomers();
    }
  }, [raw]);
}
