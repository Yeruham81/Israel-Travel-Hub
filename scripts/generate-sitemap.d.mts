/** Type declarations for the Node-only sitemap generator. */
export const DEFAULT_CANONICAL_ORIGIN: string;
export function collectSitemapPaths(dir?: string): Promise<string[]>;
export function normalizeOrigin(value: string): string;
export function buildSitemap(paths: string[], origin: string): string;
export function buildRobots(origin: string): string;
