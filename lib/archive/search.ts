const MAX_SEARCH_LENGTH = 80;

/**
 * Keeps archive terms human-readable and removes PostgREST filter syntax,
 * markup, control characters, and oversized automated payloads.
 */
export function sanitizeArchiveSearch(value: string | undefined) {
  if (!value) return "";

  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M}\p{N}\s&'\u2019\u2013\u2014-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SEARCH_LENGTH);
}

export const archiveSearchMaxLength = MAX_SEARCH_LENGTH;
