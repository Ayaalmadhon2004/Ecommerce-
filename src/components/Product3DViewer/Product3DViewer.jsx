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
 *  - hotspots {Array?}  optional [{ position, normal, label, description?,
 *                       cameraOrbit?, cameraTarget? }] annotations; clicking one
 *                       flies the camera to it and opens an annotation card
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

/* ---- hotspots: helpers ---- */
const HOTSPOT_ZOOM = 0.55; // fraction of the default camera radius when focused
const toNums = (str) =>
  String(str || "")
    .split(/\s+/)
    .map((n) => parseFloat(n))
    .filter((n) => !Number.isNaN(n));

// Camera orbit that looks at a hotspot from the side its normal faces.
const hotspotOrbit = (h, radius) => {
  const [nx = 0, ny = 0, nz = 1] = toNums(h.normal);
  const theta = (Math.atan2(nx, nz) * 180) / Math.PI;
  const phi = (Math.acos(Math.max(-1, Math.min(1, ny / (Math.hypot(nx, ny, nz) || 1)))) * 180) / Math.PI;
  const clampedPhi = Math.max(45, Math.min(100, phi));
  return `${theta.toFixed(1)}deg ${clampedPhi.toFixed(1)}deg ${(radius * HOTSPOT_ZOOM).toFixed(3)}m`;
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
  const [activeHotspot, setActiveHotspot] = useState(null);
  const defaultView = useRef(null);

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

  // Live colour swap: ease the base colour to the new `color` after load.
  useEffect(() => {
    if (!viewer || !loaded) return undefined;
    const to = color && parseColor(color);
    const pbr = viewer.model?.materials?.[0]?.pbrMetallicRoughness;
    if (!to || !pbr) return undefined;
    const from = [...pbr.baseColorFactor];
    if (from.every((v, i) => Math.abs(v - to[i]) < 0.001)) return undefined;
    if (reduceMotion) {
      pbr.setBaseColorFactor(to);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 300);
      pbr.setBaseColorFactor(from.map((v, i) => v + (to[i] - v) * t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [viewer, loaded, color, reduceMotion]);

  /* ---- hotspots: camera fly-to, reset, Escape ---- */
  const resetView = () => {
    setActiveHotspot(null);
    const def = defaultView.current;
    if (!viewer || !def) return;
    viewer.cameraTarget = def.target;
    viewer.cameraOrbit = def.orbit;
    if (reduceMotion) viewer.jumpCameraToGoal();
  };

  const resetRef = useRef(resetView);
  resetRef.current = resetView;

  const flyToHotspot = (i) => {
    const h = hotspots?.[i];
    if (!viewer || !h) return;
    if (activeHotspot === i) return resetView();
    if (!defaultView.current) {
      // Remember the framing the viewer chose before we move the camera.
      const o = viewer.getCameraOrbit();
      const t = viewer.getCameraTarget();
      defaultView.current = {
        orbit: `0deg 75deg ${o.radius}m`,
        target: `${t.x}m ${t.y}m ${t.z}m`,
        radius: o.radius,
      };
    }
    setInteracted(true); // stop auto-rotate so it does not fight the fly-to
    setActiveHotspot(i);
    viewer.interpolationDecay = 120;
    viewer.cameraTarget = h.cameraTarget || h.position;
    viewer.cameraOrbit = h.cameraOrbit || hotspotOrbit(h, defaultView.current.radius);
    if (reduceMotion) viewer.jumpCameraToGoal();
  };

  useEffect(() => {
    if (activeHotspot === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") resetRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeHotspot]);

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
                className={`${styles.hotspot} ${activeHotspot === i ? styles.hotspotActive : ""}`}
                data-position={h.position}
                data-normal={h.normal}
                data-visibility-attribute="visible"
                aria-label={`Hotspot ${i + 1} of ${hotspots.length}: ${h.label}`}
                aria-pressed={activeHotspot === i}
                onClick={() => flyToHotspot(i)}
              >
                <span className={styles.hotspotNum} aria-hidden="true">{i + 1}</span>
                <span className={styles.hotspotTip} aria-hidden="true">{h.label}</span>
              </button>
            ))}
        </model-viewer>
      ) : (
        poster && <img className={styles.poster} src={poster} alt={alt || ""} />
      )}

      {activeHotspot !== null && hotspots?.[activeHotspot] && (
        <div className={styles.hotspotCard} role="region" aria-live="polite" aria-label="Product detail">
          <strong className={styles.hotspotCardTitle}>{hotspots[activeHotspot].label}</strong>
          {hotspots[activeHotspot].description && (
            <p className={styles.hotspotCardText}>{hotspots[activeHotspot].description}</p>
          )}
          <button type="button" className={styles.hotspotReset} onClick={resetView}>
            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset view
          </button>
        </div>
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
