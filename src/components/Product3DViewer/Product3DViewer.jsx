import { useEffect, useRef, useState } from "react";
import styles from "./Product3DViewer.module.css";

/**
 * Reusable 3D product viewer built on <model-viewer>.
 *
 * Props (stable contract):
 *  - src      {string}  path/URL of a .glb file (required)
 *  - poster   {string}  fallback / loading image
 *  - alt      {string}  accessible description of the product
 *  - color    {string?} optional CSS colour used to tint the base material
 *  - hotspots {Array?}  optional [{ position, normal, label }] annotations
 *  - ar       {bool?}   enable the AR button on supported devices
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

// Any CSS colour -> [r, g, b, a] in 0..1, or null
const parseColor = (value) => {
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#000";
    ctx.fillStyle = value;
    const hex = ctx.fillStyle;
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return null;
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1];
  } catch {
    return null;
  }
};

export default function Product3DViewer({ src, poster, alt, color, hotspots, ar }) {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [libReady, setLibReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [arSupported, setArSupported] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);

  const label = alt
    ? `3D view of ${alt}. Drag or use arrow keys to rotate, plus and minus to zoom.`
    : "3D product view";
  const canRender = !!src && !failed;

  // Lazy: wait until the viewer scrolls into view (or the user clicks the button).
  useEffect(() => {
    if (!canRender || inView) return undefined;
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [canRender, inView]);

  // Load the web component only when needed (the import registers <model-viewer>).
  useEffect(() => {
    if (!inView || libReady || failed) return undefined;
    if (!hasWebGL()) {
      setFailed(true);
      return undefined;
    }
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => !cancelled && setLibReady(true))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [inView, libReady, failed]);

  // Wire native events of the custom element.
  useEffect(() => {
    if (!viewer) return undefined;
    const onLoad = () => {
      setLoaded(true);
      const rgba = color && parseColor(color);
      const material = viewer.model?.materials?.[0];
      if (rgba && material) material.pbrMetallicRoughness.setBaseColorFactor(rgba);
    };
    const onError = () => setFailed(true);
    // Stop auto-rotate for good once the user takes control.
    const onCamera = (e) => {
      if (e.detail?.source === "user-interaction") setInteracted(true);
    };
    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", onError);
    viewer.addEventListener("camera-change", onCamera);
    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
      viewer.removeEventListener("camera-change", onCamera);
    };
  }, [viewer, color]);

  // AR support is only known after the model loaded (model-viewer.canActivateAR).
  useEffect(() => {
    if (!viewer || !ar) return undefined;
    const check = () => setArSupported(!!viewer.canActivateAR);
    viewer.addEventListener("load", check);
    check();
    return () => viewer.removeEventListener("load", check);
  }, [viewer, ar]);

  // Fallback: no model, load error or no WebGL -> plain poster image.
  if (!canRender) {
    return poster ? (
      <div className={styles.wrapper}>
        <img className={styles.poster} src={poster} alt={alt || ""} />
      </div>
    ) : null;
  }

  return (
    <div className={styles.wrapper} ref={wrapRef}>
      {libReady ? (
        <model-viewer
          ref={setViewer}
          className={styles.viewer}
          src={src}
          poster={poster}
          alt={label}
          aria-label={label}
          tabindex="0"
          camera-controls
          touch-action="pan-y"
          auto-rotate={!reduceMotion && !interacted}
          auto-rotate-delay="0"
          shadow-intensity="1"
          ar={ar ? true : undefined}
          ar-modes={ar ? "webxr scene-viewer quick-look" : undefined}
          ar-scale={ar ? "auto" : undefined}
          ar-placement={ar ? "floor" : undefined}
        >
          {ar && (
            <button type="button" slot="ar-button" className={styles.arBtn}>
              <i className="fa-solid fa-expand" aria-hidden="true"></i> View in your space
            </button>
          )}
          {Array.isArray(hotspots) &&
            hotspots.map((h, i) => (
              <button
                key={h.label || i}
                type="button"
                slot={`hotspot-${i}`}
                className={styles.hotspot}
                data-position={h.position}
                data-normal={h.normal}
              >
                {h.label}
              </button>
            ))}
        </model-viewer>
      ) : (
        poster && <img className={styles.poster} src={poster} alt={alt || ""} />
      )}

      {!inView && (
        <button type="button" className={styles.loadBtn} onClick={() => setInView(true)}>
          <i className="fa-solid fa-cube" aria-hidden="true"></i> View in 3D
        </button>
      )}
      {ar && loaded && !arSupported && (
        <p className={styles.arHint}>
          <i className="fa-solid fa-mobile-screen" aria-hidden="true"></i> Open this page on your
          phone to view in AR
        </p>
      )}
      {inView && !loaded && (
        <span className={styles.status} role="status">
          Loading 3D model...
        </span>
      )}
    </div>
  );
}
