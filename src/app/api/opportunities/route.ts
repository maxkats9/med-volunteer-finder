import { NextResponse } from "next/server";
import { createOpportunity } from "@/lib/opportunities";
import type { OpportunityInput } from "@/types/opportunity";

function validateInput(body: unknown): OpportunityInput | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  const location = data.location as Record<string, unknown> | undefined;
  const contact = data.contact as Record<string, unknown> | undefined;

  if (
    typeof data.title !== "string" ||
    typeof data.institution !== "string" ||
    typeof data.institutionType !== "string" ||
    typeof data.imageUrl !== "string" ||
    typeof data.description !== "string" ||
    typeof data.schedule !== "string" ||
    typeof data.applyUrl !== "string" ||
    typeof data.deadline !== "string" ||
    !location ||
    typeof location.city !== "string" ||
    typeof location.state !== "string" ||
    !contact ||
    typeof contact.email !== "string" ||
    typeof contact.phone !== "string" ||
    !Array.isArray(data.tags) ||
    !Array.isArray(data.requirements)
  ) {
    return null;
  }

  return {
    title: data.title,
    institution: data.institution,
    institutionType: data.institutionType as OpportunityInput["institutionType"],
    imageUrl: data.imageUrl,
    location: { city: location.city, state: location.state },
    tags: data.tags as string[],
    description: data.description,
    requirements: data.requirements as string[],
    schedule: data.schedule,
    contact: { email: contact.email, phone: contact.phone },
    applyUrl: data.applyUrl,
    deadline: data.deadline,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = validateInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Invalid opportunity data" },
        { status: 400 },
      );
    }

    const opportunity = await createOpportunity(input);
    return NextResponse.json(opportunity, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create opportunity";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
