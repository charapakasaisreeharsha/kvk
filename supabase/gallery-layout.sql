-- Run this once if you already ran gallery.sql before the layout selector was added.
alter table public.gallery_images
  add column if not exists display_layout text;

update public.gallery_images
  set display_layout = 'landscape'
  where display_layout is null;

alter table public.gallery_images
  alter column display_layout set default 'landscape',
  alter column display_layout set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'gallery_images_display_layout_check'
  ) then
    alter table public.gallery_images
      add constraint gallery_images_display_layout_check
      check (display_layout in ('landscape', 'portrait'));
  end if;
end $$;
