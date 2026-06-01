"use client";

/* ------------------------------------------------------------------ */
/*  Gate primitives — flash-free, hydration-safe visibility wrappers   */
/* ------------------------------------------------------------------ */
/*                                                                      */
/*  These render a transparent (display:contents) wrapper that always   */
/*  outputs its children. Hiding is done by CSS keyed off the           */
/*  `data-hc-off` attribute that the pre-hydration script sets on        */
/*  <html> before first paint:                                          */
/*                                                                      */
/*    html[data-hc-off~="<key>"] [data-gate="<key>"] { display:none }    */
/*                                                                      */
/*  Because the wrapper is always rendered (server === first client      */
/*  render), there is no hydration mismatch; because CSS does the hide,  */
/*  there is no flash. A client component can safely wrap server-         */
/*  rendered children passed via the `children` prop.                    */
/* ------------------------------------------------------------------ */

import { sectionKey, subKey, moduleKey, adKey } from "@/config/siteStructure";

const transparent: React.CSSProperties = { display: "contents" };

export function Gate({
  keyName,
  children,
}: {
  keyName: string;
  children: React.ReactNode;
}) {
  return (
    <div data-gate={keyName} style={transparent}>
      {children}
    </div>
  );
}

/** Gate a major section (or, with `sub`, a subsection) of a page. */
export function SectionGate({
  page,
  id,
  sub,
  children,
}: {
  page: string;
  id: string;
  sub?: string;
  children: React.ReactNode;
}) {
  const key = sub ? subKey(page, id, sub) : sectionKey(page, id);
  return (
    <div data-gate={key} style={transparent}>
      {children}
    </div>
  );
}

/** Gate a named module component. */
export function ModuleGate({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div data-gate={moduleKey(name)} style={transparent}>
      {children}
    </div>
  );
}

/** Gate a named ad / sponsor format. */
export function AdGate({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div data-gate={adKey(name)} style={transparent}>
      {children}
    </div>
  );
}
