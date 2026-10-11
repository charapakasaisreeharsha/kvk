-- Run this in the Supabase SQL Editor after archive-audio.sql.
-- It creates three Telugu speech entries which use local files in public/.

insert into public.archive (
  title,
  author,
  description,
  language,
  category,
  cover_file,
  audio_file,
  views,
  downloads
)
select
  entry.title,
  'Prof. K. V. Krishna Murthy',
  'Yogataaraavali — Adi Shankaracharya Commentary',
  'Telugu',
  'Speeches',
  '/book-covers/Yogataaraavali_ Adi Shankaracharya Commentary.png',
  entry.audio_file,
  0,
  0
from (
  values
    ('యోగ తారావళి - మొదటి భాగం', '/audio/యోగ తారావళి - మొదటి భాగం.mp3'),
    ('యోగ తారావళి - రెండవ భాగం', '/audio/యోగ తారావళి - రెండవ భాగం.mp3'),
    ('యోగ తారావళి - మూడవ భాగం', '/audio/యోగ తారావళి - మూడవ భాగం.mp3')
) as entry(title, audio_file)
where not exists (
  select 1 from public.archive as existing where existing.title = entry.title
);
