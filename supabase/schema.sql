-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.opportunities (
  id text primary key,
  title text not null,
  institution text not null,
  institution_type text not null
    check (institution_type in ('hospital', 'clinic', 'nonprofit', 'research', 'other')),
  image_url text not null,
  city text not null,
  state text not null,
  tags text[] not null default '{}',
  description text not null,
  requirements text[] not null default '{}',
  schedule text not null,
  contact_email text not null,
  contact_phone text not null,
  apply_url text not null,
  deadline date not null,
  created_at timestamptz not null default now()
);

alter table public.opportunities enable row level security;

create policy "Anyone can read opportunities"
  on public.opportunities
  for select
  to anon, authenticated
  using (true);

-- Writes go through the service role in API routes (bypasses RLS).
-- Add authenticated admin policies later when you add login.
