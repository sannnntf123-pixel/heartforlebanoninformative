"use client";
import Pagination from "@/components/ui/Pagination";
import { allCauses, causeCategories, CauseCategory } from "@/data/causes";
import { staggerDelay } from "@/lib/animation";
import { useMemo, useState } from "react";
import { CauseBoxCard } from "./CauseCards";

type Filter = "All" | CauseCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "All", label: "All Categories" },
  ...causeCategories.map((category) => ({ value: category, label: category })),
];

/** Category tabs that filter the full list of causes. */
const CausesTabs = () => {
  const [active, setActive] = useState<Filter>("All");

  const visibleCauses = useMemo(
    () => (active === "All" ? allCauses : allCauses.filter((c) => c.category === active)),
    [active]
  );

  return (
    <>
      <div className="cuases-tab-header">
        <ul className="nav mb-4" role="tablist">
          {filters.map((filter, index) => (
            <li
              key={filter.value}
              className="nav-item wow fadeInUp"
              data-wow-delay={staggerDelay(index, { columns: filters.length })}
              role="presentation"
            >
              <button
                type="button"
                role="tab"
                aria-selected={active === filter.value}
                className={`nav-link ${active === filter.value ? "active" : ""}`}
                onClick={() => setActive(filter.value)}
              >
                {filter.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content" role="tabpanel">
        <div className="row">
          {visibleCauses.map((cause, index) => (
            <div
              key={cause.id}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={staggerDelay(index)}
            >
              <CauseBoxCard cause={cause} shadow />
            </div>
          ))}
          {visibleCauses.length === 0 && (
            <p className="text-center">No causes in this category yet.</p>
          )}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default CausesTabs;
