"use client";
import FilterTabs, { FilterOption } from "@/components/ui/FilterTabs";
import Pagination from "@/components/ui/Pagination";
import { allCauses, causeCategories, CauseCategory } from "@/data/causes";
import { staggerDelay } from "@/lib/animation";
import { useMemo, useState } from "react";
import { CauseBoxCard } from "./CauseCards";

type Filter = "All" | CauseCategory;

const filters: FilterOption<Filter>[] = [
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
      <FilterTabs
        className="cuases-tab-header"
        options={filters}
        active={active}
        onChange={setActive}
      />
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
