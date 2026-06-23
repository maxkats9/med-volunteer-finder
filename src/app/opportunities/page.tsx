import OpportunitiesClient from "@/app/opportunities/OpportunitiesClient";
import {
  getAllOpportunities,
  getFilterOptions,
} from "@/lib/opportunities";

export const metadata = {
  title: "Browse Opportunities | MedVolunteer",
  description: "Find medical and healthcare volunteer opportunities near you.",
};

export const revalidate = 60;

export default async function OpportunitiesPage() {
  const opportunities = await getAllOpportunities();
  const { states, cities, institutionTypes } = getFilterOptions(opportunities);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Volunteer Opportunities
        </h1>
        <p className="mt-2 text-gray-600">
          Browse openings at hospitals, clinics, and community health organizations.
        </p>
      </div>

      <OpportunitiesClient
        opportunities={opportunities}
        states={states}
        cities={cities}
        institutionTypes={institutionTypes}
      />
    </div>
  );
}
