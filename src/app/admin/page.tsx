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
          New listings are saved to your Supabase database and appear on the
          site within about a minute.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <OpportunityForm />
      </div>
    </div>
  );
}
