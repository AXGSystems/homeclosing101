import type { MetadataRoute } from "next";

// HC101 is a PRIVATE, ultra-admin-only environment. We publish NO sitemap — an
// empty set means zero URLs are advertised to any crawler or AI indexer.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
