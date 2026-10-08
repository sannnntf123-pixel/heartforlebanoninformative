import { staggerDelay } from "@/lib/animation";

export type FilterOption<T extends string> = { value: T; label: string };

type FilterTabsProps<T extends string> = {
  options: FilterOption<T>[];
  active: T;
  onChange: (value: T) => void;
  /** Theme wrapper class, e.g. "cuases-tab-header" or "event-tab-header". */
  className: string;
};

/** Pill-style tab buttons used to filter a list client-side. */
const FilterTabs = <T extends string>({ options, active, onChange, className }: FilterTabsProps<T>) => (
  <div className={className}>
    <ul className="nav mb-4" role="tablist">
      {options.map((option, index) => (
        <li
          key={option.value}
          className="nav-item wow fadeInUp"
          data-wow-delay={staggerDelay(index, { columns: options.length })}
          role="presentation"
        >
          <button
            type="button"
            role="tab"
            aria-selected={active === option.value}
            className={`nav-link ${active === option.value ? "active" : ""}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default FilterTabs;
