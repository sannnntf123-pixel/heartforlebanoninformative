type StaggerOptions = {
  /** Delay of the first item, in seconds. */
  start?: number;
  /** Extra delay added per item, in seconds. */
  step?: number;
  /** Items per row; the stagger restarts on each row. */
  columns?: number;
};

/**
 * WOW.js `data-wow-delay` value for the item at `index`, so cards in a row
 * reveal one after another (".3s", ".5s", ".7s", ...).
 */
export const staggerDelay = (
  index: number,
  { start = 0.3, step = 0.2, columns = 3 }: StaggerOptions = {}
): string => `${(start + (index % columns) * step).toFixed(1)}s`;
