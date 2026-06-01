"use client";

import { usePathname } from "next/navigation";
import { useSiteConfig } from "@/components/SiteConfigProvider";
import { pageKey } from "@/config/siteStructure";
import UnavailablePanel from "@/components/UnavailablePanel";

/**
 * Wraps the page body in layout.tsx. When the active site version disables the
 * current route, renders the friendly UnavailablePanel instead of the page —
 * inside the normal shell, never a 404. Until config is ready it renders the
 * page as-is (matches the server render), so there is no hydration mismatch.
 */
export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const { ready, effective } = useSiteConfig();

  // Never guard the admin/control-center itself.
  if (pathname.startsWith("/admin")) return <>{children}</>;

  if (ready && !effective(pageKey(pathname))) {
    return <UnavailablePanel />;
  }
  return <>{children}</>;
}
