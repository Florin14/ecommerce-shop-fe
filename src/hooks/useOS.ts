import { useMemo } from "react";

export function useOS() {
  return useMemo(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isMac = ua.includes("mac");
    return {
      isMac,
      mod: isMac ? "⌘" : "Ctrl",
      modKey: isMac ? "metaKey" : "ctrlKey",
    };
  }, []);
}
