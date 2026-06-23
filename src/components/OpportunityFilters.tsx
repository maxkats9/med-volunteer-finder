"use client";

import type { InstitutionType } from "@/types/opportunity";

const institutionLabels: Record<InstitutionType, string> = {
  hospital: "Hospital",
  clinic: "Clinic",
  nonprofit: "Nonprofit",
  research: "Research",
  other: "Other",
};

export interface FilterState {
  search: string;
  state: string;
  city: string;
  institutionType: string;
}

interface OpportunityFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  states: string[];
  cities: string[];
  institutionTypes: InstitutionType[];
}

export default function OpportunityFilters({
  filters,
  onChange,
  states,
  cities,
  institutionTypes,
}: OpportunityFiltersProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Filters</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-500">Search</span>
          <input
            type="search"
            placeholder="Title, institution, tags..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-500">State</span>
          <select
            value={filters.state}
            onChange={(e) =>
              onChange({ ...filters, state: e.target.value, city: "" })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="">All states</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-500">City</span>
          <select
            value={filters.city}
            onChange={(e) => onChange({ ...filters, city: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-500">
            Institution type
          </span>
          <select
            value={filters.institutionType}
            onChange={(e) =>
              onChange({ ...filters, institutionType: e.target.value })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="">All types</option>
            {institutionTypes.map((type) => (
              <option key={type} value={type}>
                {institutionLabels[type]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
