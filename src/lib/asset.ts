const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Resolves a path that lives in `/public` against the deploy base path.
 *
 * Needed because `next/image` with `images.unoptimized` (required for static
 * export) does NOT prepend `basePath` to the `src`, so on a GitHub Pages
 * project site (e.g. `/WebPortfolio`) raw `/foo.png` paths 404 at the domain
 * root. External URLs are returned untouched.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
