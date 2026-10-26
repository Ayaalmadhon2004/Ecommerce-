import { useEffect, useState } from "react";

const supported = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

// True while the viewport matches the given CSS media query.
// Falls back to false where matchMedia is missing (SSR, jsdom).
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => supported() && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (!supported()) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
