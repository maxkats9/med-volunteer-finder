"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { InstitutionType, OpportunityInput } from "@/types/opportunity";

const institutionTypes: InstitutionType[] = [
  "hospital",
  "clinic",
  "nonprofit",
  "research",
  "other",
];

const emptyForm: OpportunityInput = {
  title: "",
  institution: "",
  institutionType: "hospital",
  imageUrl: "",
  location: { city: "", state: "" },
  tags: [],
  description: "",
  requirements: [],
  schedule: "",
  contact: { email: "", phone: "" },
  applyUrl: "",
  deadline: "",
};

export default function OpportunityForm() {
  const router = useRouter();
  const [form, setForm] = useState<OpportunityInput>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const payload: OpportunityInput = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      requirements: requirementsInput
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create listing");
      }

      setStatus("success");
      setForm(emptyForm);
      setTagsInput("");
      setRequirementsInput("");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" required>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Institution" required>
          <input
            required
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Institution type" required>
          <select
            required
            value={form.institutionType}
            onChange={(e) =>
              setForm({
                ...form,
                institutionType: e.target.value as InstitutionType,
              })
            }
            className={inputClass}
          >
            {institutionTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Image URL" required>
          <input
            required
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        <Field label="City" required>
          <input
            required
            value={form.location.city}
            onChange={(e) =>
              setForm({
                ...form,
                location: { ...form.location, city: e.target.value },
              })
            }
            className={inputClass}
          />
        </Field>
        <Field label="State" required>
          <input
            required
            maxLength={2}
            value={form.location.state}
            onChange={(e) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  state: e.target.value.toUpperCase(),
                },
              })
            }
            placeholder="CA"
            className={inputClass}
          />
        </Field>
        <Field label="Contact email" required>
          <input
            required
            type="email"
            value={form.contact.email}
            onChange={(e) =>
              setForm({
                ...form,
                contact: { ...form.contact, email: e.target.value },
              })
            }
            className={inputClass}
          />
        </Field>
        <Field label="Contact phone" required>
          <input
            required
            type="tel"
            value={form.contact.phone}
            onChange={(e) =>
              setForm({
                ...form,
                contact: { ...form.contact, phone: e.target.value },
              })
            }
            className={inputClass}
          />
        </Field>
        <Field label="Apply URL" required>
          <input
            required
            type="url"
            value={form.applyUrl}
            onChange={(e) => setForm({ ...form, applyUrl: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Deadline" required>
          <input
            required
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Tags (comma-separated)" required>
        <input
          required
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Pediatrics, Weekends, Bilingual"
          className={inputClass}
        />
      </Field>

      <Field label="Description" required>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Requirements (one per line)" required>
        <textarea
          required
          rows={4}
          value={requirementsInput}
          onChange={(e) => setRequirementsInput(e.target.value)}
          placeholder="Age 18+&#10;Background check required"
          className={inputClass}
        />
      </Field>

      <Field label="Schedule" required>
        <input
          required
          value={form.schedule}
          onChange={(e) => setForm({ ...form, schedule: e.target.value })}
          placeholder="Weekdays 9am–1pm"
          className={inputClass}
        />
      </Field>

      {status === "success" && (
        <p className="rounded-md bg-teal-50 px-4 py-3 text-sm text-teal-800">
          Listing created successfully.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
      >
        {status === "loading" ? "Saving..." : "Add listing"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-teal-600"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
