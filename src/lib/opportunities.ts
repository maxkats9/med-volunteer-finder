import fs from "fs";
import path from "path";
import seedData from "@/data/opportunities.json";
import type { Opportunity, OpportunityInput } from "@/types/opportunity";

const DATA_PATH = path.join(process.cwd(), "src/data/opportunities.json");

let cache: Opportunity[] | null = null;

function loadFromDisk(): Opportunity[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Opportunity[];
  } catch {
    return seedData as Opportunity[];
  }
}

function getStore(): Opportunity[] {
  if (!cache) {
    cache = loadFromDisk();
  }
  return cache;
}

function persistStore(opportunities: Opportunity[]): void {
  cache = opportunities;
  fs.writeFileSync(DATA_PATH, JSON.stringify(opportunities, null, 2), "utf-8");
}

export function getAllOpportunities(): Opportunity[] {
  return getStore();
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return getStore().find((o) => o.id === id);
}

export function createOpportunity(input: OpportunityInput): Opportunity {
  const opportunities = getStore();
  const id = String(
    Math.max(0, ...opportunities.map((o) => Number(o.id) || 0)) + 1,
  );
  const opportunity: Opportunity = { id, ...input };
  persistStore([...opportunities, opportunity]);
  return opportunity;
}

export function getFilterOptions(opportunities: Opportunity[]) {
  const states = [...new Set(opportunities.map((o) => o.location.state))].sort();
  const cities = [...new Set(opportunities.map((o) => o.location.city))].sort();
  const institutionTypes = [
    ...new Set(opportunities.map((o) => o.institutionType)),
  ].sort();

  return { states, cities, institutionTypes };
}
