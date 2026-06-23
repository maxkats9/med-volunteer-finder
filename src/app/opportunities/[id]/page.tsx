import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOpportunityById } from "@/lib/opportunities";

const institutionLabels = {
  hospital: "Hospital",
  clinic: "Clinic",
  nonprofit: "Nonprofit",
  research: "Research",
  other: "Other",
} as const;

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);
  if (!opportunity) return { title: "Not Found" };
  return {
    title: `${opportunity.title} | MedVolunteer`,
    description: opportunity.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);

  if (!opportunity) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/opportunities"
        className="text-sm font-medium text-teal-600 hover:text-teal-700"
      >
        ← Back to opportunities
      </Link>

      <div className="relative mt-6 h-56 w-full overflow-hidden rounded-lg bg-gray-100 sm:h-72">
        <Image
          src={opportunity.imageUrl}
          alt={opportunity.institution}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-600">
          {institutionLabels[opportunity.institutionType]}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900 sm:text-3xl">
          {opportunity.title}
        </h1>
        <p className="mt-2 text-lg text-gray-600">{opportunity.institution}</p>
        <p className="text-gray-500">
          {opportunity.location.city}, {opportunity.location.state}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Description
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700">
            {opportunity.description}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Requirements
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
            {opportunity.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Schedule
          </h2>
          <p className="mt-2 text-gray-700">{opportunity.schedule}</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Contact & Apply
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">Email:</dt>
              <dd>
                <a
                  href={`mailto:${opportunity.contact.email}`}
                  className="text-teal-600 hover:underline"
                >
                  {opportunity.contact.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">Phone:</dt>
              <dd>
                <a
                  href={`tel:${opportunity.contact.phone.replace(/\D/g, "")}`}
                  className="text-teal-600 hover:underline"
                >
                  {opportunity.contact.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">Deadline:</dt>
              <dd className="text-gray-700">{formatDate(opportunity.deadline)}</dd>
            </div>
          </dl>

          <a
            href={opportunity.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            Apply now
          </a>
        </div>
      </section>
    </article>
  );
}
