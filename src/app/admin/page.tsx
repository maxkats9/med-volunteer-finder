import OpportunityForm from "@/components/OpportunityForm";

export const metadata = {
  title: "Admin | MedVolunteer",
  description: "Add new volunteer opportunity listings.",
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Add Listing</h1>
        <p className="mt-2 text-gray-600">
          Create a new volunteer opportunity. Listings are saved to{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
            src/data/opportunities.json
          </code>{" "}
          for now — swap the data layer in{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
            src/lib/opportunities.ts
          </code>{" "}
          for Supabase when you are ready for production.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <OpportunityForm />
      </div>
    </div>
  );
}
