const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Formats a whole-dollar amount, e.g. 4407 -> "$4,407". */
export const formatCurrency = (amount: number): string =>
  currencyFormatter.format(amount);

/** Percentage of `goal` reached, clamped to 0-100 and rounded. */
export const progressPercent = (raised: number, goal: number): number =>
  goal > 0 ? Math.min(100, Math.max(0, Math.round((raised / goal) * 100))) : 0;
