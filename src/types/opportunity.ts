export type InstitutionType =
  | "hospital"
  | "clinic"
  | "nonprofit"
  | "research"
  | "other";

export interface Opportunity {
  id: string;
  title: string;
  institution: string;
  institutionType: InstitutionType;
  imageUrl: string;
  location: {
    city: string;
    state: string;
  };
  tags: string[];
  description: string;
  requirements: string[];
  schedule: string;
  contact: {
    email: string;
    phone: string;
  };
  applyUrl: string;
  deadline: string;
}

export type OpportunityInput = Omit<Opportunity, "id">;
