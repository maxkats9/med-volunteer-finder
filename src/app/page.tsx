import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Find your next{" "}
          <span className="text-teal-600">healthcare volunteer</span> role
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          MedVolunteer connects aspiring and experienced volunteers with
          opportunities at hospitals, clinics, research centers, and community
          health organizations across the country.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/opportunities"
            className="inline-flex rounded-md bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            Browse opportunities
          </Link>
          <Link
            href="/admin"
            className="inline-flex rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400"
          >
            Add a listing
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-3">
        {[
          {
            title: "Search & filter",
            text: "Filter by state, city, institution type, or keyword to find the right fit.",
          },
          {
            title: "Detailed listings",
            text: "Review requirements, schedules, contacts, and application deadlines.",
          },
          {
            title: "Easy to extend",
            text: "Sample JSON data today — ready to plug in Supabase or an admin workflow.",
          },
        ].map((item) => (
          <div key={item.title} className="text-center">
            <h2 className="text-sm font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
