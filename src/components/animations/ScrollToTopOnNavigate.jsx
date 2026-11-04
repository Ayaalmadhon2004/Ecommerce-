import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets the window scroll to the top whenever the user navigates to a new
// page (or to another product on the same route), so a page never opens
// scrolled down from the previous one.
export default function ScrollToTopOnNavigate() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]);

  return null;
}
