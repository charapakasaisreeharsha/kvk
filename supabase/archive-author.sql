-- Run this in the Supabase SQL Editor before deploying the author filter.
-- Existing works are assigned to the portfolio's primary author.
alter table public.archive add column if not exists author text;

update public.archive
set author = 'Prof. K. V. Krishna Murthy'
where author is null or btrim(author) = '';

alter table public.archive alter column author set default 'Prof. K. V. Krishna Murthy';
alter table public.archive alter column author set not null;

create index if not exists archive_author_idx on public.archive (author);
