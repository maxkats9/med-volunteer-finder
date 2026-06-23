import { inputToRow, rowToOpportunity } from "@/lib/supabase/mappers";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import type { Opportunity, OpportunityInput } from "@/types/opportunity";

export async function getAllOpportunities(): Promise<Opportunity[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch opportunities: ${error.message}`);
  }

  return (data ?? []).map(rowToOpportunity);
}

export async function getOpportunityById(
  id: string,
): Promise<Opportunity | undefined> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch opportunity: ${error.message}`);
  }

  return data ? rowToOpportunity(data) : undefined;
}

export async function createOpportunity(
  input: OpportunityInput,
): Promise<Opportunity> {
  const supabase = createSupabaseAdminClient();

  const { data: existing } = await supabase.from("opportunities").select("id");
  const numericIds = (existing ?? [])
    .map((row) => Number(row.id))
    .filter((n) => !Number.isNaN(n));
  const nextId = String(Math.max(0, ...numericIds, 0) + 1);

  const row = inputToRow(input, nextId);
  const { data, error } = await supabase
    .from("opportunities")
    .insert(row)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to create opportunity: ${error.message}`);
  }

  return rowToOpportunity(data);
}

export function getFilterOptions(opportunities: Opportunity[]) {
  const states = [...new Set(opportunities.map((o) => o.location.state))].sort();
  const cities = [...new Set(opportunities.map((o) => o.location.city))].sort();
  const institutionTypes = [
    ...new Set(opportunities.map((o) => o.institutionType)),
  ].sort();

  return { states, cities, institutionTypes };
}
