/** Fleet & admin prices are stored as numbers; displayed in Tunisian dinar (TND). */
export function formatPriceEUR(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceEURCompact(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
