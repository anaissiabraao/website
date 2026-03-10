import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { api } from "@/lib/api";

export function useAnalyticsTracker() {
  const location = useLocation();
  const siteVisitIdRef = useRef<string | null>(null);
  const enterTsRef = useRef<number>(Date.now());

  useEffect(() => {
    api
      .post<{ siteVisitId: string }>("/api/analytics/site-visit", {
        page: window.location.pathname,
        referrer: document.referrer || null,
      })
      .then((response) => {
        siteVisitIdRef.current = response.siteVisitId;
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const durationMs = Date.now() - enterTsRef.current;
    enterTsRef.current = Date.now();

    api
      .post("/api/analytics/page-view", {
        siteVisitId: siteVisitIdRef.current,
        page: location.pathname,
        durationMs,
        referrer: document.referrer || null,
      })
      .catch(() => undefined);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      api
        .post("/api/analytics/heatmap-click", {
          siteVisitId: siteVisitIdRef.current,
          page: window.location.pathname,
          x: event.clientX,
          y: event.clientY,
        })
        .catch(() => undefined);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
}
