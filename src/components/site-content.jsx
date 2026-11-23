import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";
import { SiteContentContext } from "@/lib/site-content-context";

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    if (window.location.pathname === "/admin") return undefined;
    let active = true;
    apiRequest("/content")
      .then((value) => {
        if (active) setContent(value);
      })
      .catch((error) => {
        console.error("Could not load editable website content:", error);
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => content, [content]);
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}
