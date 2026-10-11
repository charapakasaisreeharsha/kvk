-- Run this in the Supabase SQL Editor before using local audio files.
-- Audio files themselves belong in public/audio in this repository. This column
-- stores only their local URL, such as /audio/book-name.mp3.

alter table public.archive
  add column if not exists audio_file text;
