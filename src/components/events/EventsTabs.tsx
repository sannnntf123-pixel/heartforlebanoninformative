"use client";
import FilterTabs, { FilterOption } from "@/components/ui/FilterTabs";
import Pagination from "@/components/ui/Pagination";
import { allEvents, eventCategories, EventCategory } from "@/data/events";
import { useMemo, useState } from "react";
import { EventListCard } from "./EventCards";

type Filter = "All" | EventCategory;

const filters: FilterOption<Filter>[] = [
  { value: "All", label: "All Categories" },
  ...eventCategories.map((category) => ({ value: category, label: category })),
];

/** Category tabs that filter the full list of events. */
const EventsTabs = () => {
  const [active, setActive] = useState<Filter>("All");

  const visibleEvents = useMemo(
    () => (active === "All" ? allEvents : allEvents.filter((e) => e.category === active)),
    [active]
  );

  return (
    <>
      <FilterTabs
        className="event-tab-header"
        options={filters}
        active={active}
        onChange={setActive}
      />
      <div className="tab-content" role="tabpanel">
        <div className="row">
          <div className="col-xl-12">
            {visibleEvents.map((event) => (
              <EventListCard key={event.id} event={event} />
            ))}
            {visibleEvents.length === 0 && (
              <p className="text-center">No events in this category yet.</p>
            )}
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default EventsTabs;
