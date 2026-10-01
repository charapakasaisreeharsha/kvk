-- Run this in the Supabase SQL Editor before using the announcements manager.
-- Public visitors can only read announcements. Writes require an authenticated
-- account; the Next.js API additionally verifies that session and request origin.

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 2000),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists announcements_published_at_idx
  on public.announcements (published_at desc);

alter table public.announcements enable row level security;

create policy "Public can view announcements"
  on public.announcements for select using (true);

create policy "Authenticated users can manage announcements"
  on public.announcements for all to authenticated
  using (true) with check (true);
