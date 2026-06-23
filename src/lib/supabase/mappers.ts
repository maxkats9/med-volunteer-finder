import type { InstitutionType, Opportunity, OpportunityInput } from "@/types/opportunity";
import type { OpportunityRow } from "@/lib/supabase/server";

export function rowToOpportunity(row: OpportunityRow): Opportunity {
  return {
    id: row.id,
    title: row.title,
    institution: row.institution,
    institutionType: row.institution_type as InstitutionType,
    imageUrl: row.image_url,
    location: { city: row.city, state: row.state },
    tags: row.tags ?? [],
    description: row.description,
    requirements: row.requirements ?? [],
    schedule: row.schedule,
    contact: { email: row.contact_email, phone: row.contact_phone },
    applyUrl: row.apply_url,
    deadline: row.deadline,
  };
}

export function inputToRow(input: OpportunityInput, id: string) {
  return {
    id,
    title: input.title,
    institution: input.institution,
    institution_type: input.institutionType,
    image_url: input.imageUrl,
    city: input.location.city,
    state: input.location.state,
    tags: input.tags,
    description: input.description,
    requirements: input.requirements,
    schedule: input.schedule,
    contact_email: input.contact.email,
    contact_phone: input.contact.phone,
    apply_url: input.applyUrl,
    deadline: input.deadline,
  };
}
