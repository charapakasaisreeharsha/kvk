-- Run this once in the Supabase SQL Editor before deploying the gallery manager.
-- The bucket is public because the public Gallery page displays its images.

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_path text not null unique,
  caption text not null check (char_length(caption) between 1 and 1000),
  alt_text text not null check (char_length(alt_text) between 1 and 200),
  display_layout text not null default 'landscape' check (display_layout in ('landscape', 'portrait')),
  created_at timestamptz not null default now()
);

alter table public.gallery_images enable row level security;

create policy "Public can view gallery images"
  on public.gallery_images for select using (true);
create policy "Authenticated users can manage gallery images"
  on public.gallery_images for all to authenticated
  using (true) with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery-images',
  'gallery-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view gallery files"
  on storage.objects for select
  using (bucket_id = 'gallery-images');
create policy "Authenticated users can upload gallery files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery-images');
create policy "Authenticated users can update gallery files"
  on storage.objects for update to authenticated
  using (bucket_id = 'gallery-images');
create policy "Authenticated users can delete gallery files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'gallery-images');
