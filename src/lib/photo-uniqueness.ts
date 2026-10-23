/**
 * Identifies the same photograph when WordPress/Vite creates differently sized copies.
 * Use alongside a visual review: unrelated filenames can still contain the same image,
 * and identical-looking crops are not necessarily byte-identical.
 */
export function photoIdentity(src: string): string {
  const withoutQuery = src.split(/[?#]/)[0]!.replaceAll("\\", "/").toLowerCase();
  const lastSlash = withoutQuery.lastIndexOf("/");
  const directory = withoutQuery.slice(0, lastSlash + 1);
  const basename = withoutQuery.slice(lastSlash + 1);
  const stem = basename
    .replace(/\.(?:webp|avif|jpe?g|png)$/i, "")
    .replace(/\.(?:jpe?g|png)$/i, "")
    .replace(/(?:[-_]\d+x\d+|[-_](?:card|tile|feature|thumb|thumbnail|small|medium|large|sm)(?:[-_]optimized)?)+$/gi, "")
    .replace(/(?:[-_]optimized)$/i, "")
    .replace(/[-_]+/g, "-");
  return directory + stem;
}

export function repeatedPhotos(sources: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const source of sources) {
    if (!source) continue;
    const key = photoIdentity(source);
    if (seen.has(key)) repeated.add(key);
    else seen.add(key);
  }
  return [...repeated];
}
