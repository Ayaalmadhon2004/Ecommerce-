import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal carousel scrolling for a card container.
 * Attach `trackRef` and `onScroll` to the scrollable element, and call
 * `scrollTrack(-1 | 1)` from the arrow buttons. `edges` tells whether the
 * track is at its start/end so the arrows can be disabled.
 * Pass any values that change the track's content (e.g. loaded items) as `deps`.
 */
export default function useHorizontalScroll(deps = []) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 1;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setEdges((prev) =>
      prev.start === start && prev.end === end ? prev : { start, end }
    );
  }, []);

  const scrollTrack = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateEdges, ...deps]);

  return { trackRef, edges, scrollTrack, updateEdges };
}
