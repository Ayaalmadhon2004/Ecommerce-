import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Spin360Viewer.module.css";

/**
 * 360 degree "turntable" viewer for products without a 3D model.
 *
 * Data format (on the product object, see src/components/data/):
 *   images360: ["/img/p1/01.jpg", "/img/p1/02.jpg", ... ]  // 24-36 frames
 * Frames must be ordered by rotation angle, evenly spaced over one full turn.
 *
 * Props:
 *  - frames {string[]} ordered frame URLs (required, >= 2 to be interactive)
 *  - alt    {string}   product description for assistive tech
 *
 * Interaction: drag/swipe horizontally, or focus and use left/right arrows.
 * Frames load lazily once the viewer is near the viewport; it auto-spins one
 * turn on first view unless the user prefers reduced motion.
 */

const PX_PER_FRAME = 12;
const SPIN_INTERVAL_MS = 60;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Spin360Viewer({ frames, alt }) {
  const list = Array.isArray(frames) ? frames.filter(Boolean) : [];
  const count = list.length;
  const wrapRef = useRef(null);
  const drag = useRef(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [dragging, setDragging] = useState(false);

  const step = useCallback(
    (delta) => setIndex((i) => (((i + delta) % count) + count) % count),
    [count]
  );

  // Lazy: only start loading frames when the viewer approaches the viewport.
  useEffect(() => {
    if (inView || count < 2) return undefined;
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
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
  }, [inView, count]);

  // Preload all frames once visible.
  useEffect(() => {
    if (!inView) return undefined;
    let cancelled = false;
    setLoadedCount(0);
    list.forEach((src) => {
      const img = new Image();
      const done = () => !cancelled && setLoadedCount((n) => n + 1);
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, count]);

  const ready = count > 0 && loadedCount >= count;

  // Auto-spin one full turn the first time all frames are ready.
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined;
    setSpinning(true);
    let turned = 0;
    const id = setInterval(() => {
      turned += 1;
      step(1);
      if (turned >= count) {
        clearInterval(id);
        setSpinning(false);
      }
    }, SPIN_INTERVAL_MS);
    return () => {
      clearInterval(id);
      setSpinning(false);
    };
  }, [ready, count, step]);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, rest: 0 };
    setDragging(true);
    setSpinning(false);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const total = e.clientX - drag.current.x + drag.current.rest;
    const moved = Math.trunc(total / PX_PER_FRAME);
    if (moved !== 0) {
      step(-moved);
      drag.current = { x: e.clientX, rest: total - moved * PX_PER_FRAME };
    }
  };
  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSpinning(false);
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSpinning(false);
      step(1);
    }
  };

  if (count === 0) return null;
  // A single frame is just an image.
  if (count === 1) {
    return (
      <div className={styles.wrapper}>
        <img className={styles.frame} src={list[0]} alt={alt || ""} draggable={false} />
      </div>
    );
  }

  const label = `360 degree view of ${alt || "product"}. Drag or use left and right arrow keys to rotate.`;

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrapper} ${styles.interactive} ${dragging ? styles.dragging : ""}`}
      role="img"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img className={styles.frame} src={list[index]} alt="" draggable={false} />
      {inView && !ready && (
        <span className={styles.status} role="status">
          Loading 360 view {Math.round((loadedCount / count) * 100)}%
        </span>
      )}
      {ready && !spinning && (
        <span className={styles.hint} aria-hidden="true">
          <i className="fa-solid fa-arrows-left-right" aria-hidden="true"></i> Drag to rotate
        </span>
      )}
    </div>
  );
}
