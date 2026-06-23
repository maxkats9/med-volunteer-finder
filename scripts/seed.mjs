import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvFile(filename) {
  try {
    const content = readFileSync(join(root, filename), "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional if vars are already set
  }
}

loadEnvFile(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const seedPath = join(root, "src", "data", "opportunities.json");
const opportunities = JSON.parse(readFileSync(seedPath, "utf-8"));

const rows = opportunities.map((o) => ({
  id: o.id,
  title: o.title,
  institution: o.institution,
  institution_type: o.institutionType,
  image_url: o.imageUrl,
  city: o.location.city,
  state: o.location.state,
  tags: o.tags,
  description: o.description,
  requirements: o.requirements,
  schedule: o.schedule,
  contact_email: o.contact.email,
  contact_phone: o.contact.phone,
  apply_url: o.applyUrl,
  deadline: o.deadline,
}));

async function seed() {
  const { error: deleteError } = await supabase
    .from("opportunities")
    .delete()
    .neq("id", "");

  if (deleteError) {
    console.error("Failed to clear existing rows:", deleteError.message);
    console.error("Did you run supabase/schema.sql in the SQL Editor first?");
    process.exit(1);
  }

  const { error: insertError } = await supabase.from("opportunities").insert(rows);

  if (insertError) {
    console.error("Failed to insert seed data:", insertError.message);
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} opportunities into Supabase.`);
}

seed();
