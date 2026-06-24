"use client";
export const dynamic = 'force-dynamic'

import { useMemo, useState } from "react";
import OpportunityCard from "@/components/OpportunityCard";
import OpportunityFilters, {
  type FilterState,
} from "@/components/OpportunityFilters";
import type { InstitutionType, Opportunity } from "@/types/opportunity";

interface OpportunitiesClientProps {
  opportunities: Opportunity[];
  states: string[];
  cities: string[];
  institutionTypes: InstitutionType[];
}

export default function OpportunitiesClient({
  opportunities,
  states,
  cities: allCities,
  institutionTypes,
}: OpportunitiesClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    state: "",
    city: "",
    institutionType: "",
  });

  const citiesForState = useMemo(() => {
    if (!filters.state) return allCities;
    const citySet = new Set(
      opportunities
        .filter((o) => o.location.state === filters.state)
        .map((o) => o.location.city),
    );
    return [...citySet].sort();
  }, [filters.state, opportunities, allCities]);

  const filtered = useMemo(() => {
    const query = filters.search.toLowerCase().trim();

    return opportunities.filter((o) => {
      if (filters.state && o.location.state !== filters.state) return false;
      if (filters.city && o.location.city !== filters.city) return false;
      if (
        filters.institutionType &&
        o.institutionType !== filters.institutionType
      )
        return false;

      if (!query) return true;

      const haystack = [
        o.title,
        o.institution,
        o.location.city,
        o.location.state,
        ...o.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [opportunities, filters]);

  return (
    <div className="space-y-6">
      <OpportunityFilters
        filters={filters}
        onChange={setFilters}
        states={states}
        cities={citiesForState}
        institutionTypes={institutionTypes}
      />

      <p className="text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} found
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <p className="text-gray-600">No opportunities match your filters.</p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                search: "",
                state: "",
                city: "",
                institutionType: "",
              })
            }
            className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}
