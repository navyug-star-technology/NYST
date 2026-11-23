import { useContext } from "react";
import { SiteContentContext } from "@/lib/site-content-context";

export function useSiteCopy(path, fallback) {
  const content = useContext(SiteContentContext);
  const value = path.split(".").reduce((current, key) => current?.[key], content);
  return typeof value === "string" && value.length ? value : fallback;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
