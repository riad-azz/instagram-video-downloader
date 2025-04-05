import React from "react";

export const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const controller = new AbortController();
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange, { signal: controller.signal });
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      controller.abort();
    };
  }, []);

  return !!isMobile;
}
