import Image from "next/image";
import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";

const institutionLabels: Record<Opportunity["institutionType"], string> = {
  hospital: "Hospital",
  clinic: "Clinic",
  nonprofit: "Nonprofit",
  research: "Research",
  other: "Other",
};

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={opportunity.imageUrl}
          alt={opportunity.institution}
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-600">
          {institutionLabels[opportunity.institutionType]}
        </p>
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-teal-700">
          {opportunity.title}
        </h2>
        <p className="text-sm text-gray-500">{opportunity.institution}</p>
        <p className="text-sm text-gray-600">
          {opportunity.location.city}, {opportunity.location.state}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
