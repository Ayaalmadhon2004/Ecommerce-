import { useCallback } from "react";

const CART_SELECTOR = "[data-cart-icon]";
const FLIGHT_MS = 700;
const IMG_SIZE = 90;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function pulse(el) {
  if (!el || typeof el.animate !== "function") return;
  el.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.35)", offset: 0.4 },
      { transform: "scale(0.92)", offset: 0.7 },
      { transform: "scale(1)" },
    ],
    { duration: 400, easing: "ease-out" }
  );
}

/**
 * Animates a clone of `sourceImg` along a curved path to the header cart icon
 * (`[data-cart-icon]`), pulses the icon, then calls `onLand`.
 * Falls back to calling `onLand` immediately when motion is reduced or the
 * source/target/Web Animations API is unavailable.
 */
export function flyToCart(sourceImg, onLand) {
  const target = document.querySelector(CART_SELECTOR);
  if (
    prefersReducedMotion() ||
    !sourceImg ||
    !target ||
    typeof Element.prototype.animate !== "function"
  ) {
    onLand();
    if (!prefersReducedMotion()) pulse(target);
    return;
  }

  const from = sourceImg.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const size = Math.min(IMG_SIZE, Math.max(from.width, 40));

  // Viewport coordinates + position: fixed, so scroll position is irrelevant.
  const startX = from.left + from.width / 2 - size / 2;
  const startY = from.top + from.height / 2 - size / 2;
  const dx = to.left + to.width / 2 - size / 2 - startX;
  const dy = to.top + to.height / 2 - size / 2 - startY;
  // Quadratic Bezier control point, lifted upward to create an arc.
  const cx = dx / 2;
  const cy = dy / 2 - Math.max(80, Math.abs(dy) * 0.35);

  const clone = document.createElement("img");
  clone.src = sourceImg.currentSrc || sourceImg.src;
  clone.alt = "";
  clone.setAttribute("aria-hidden", "true");
  Object.assign(clone.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: "contain",
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    pointerEvents: "none",
    zIndex: "9999",
    willChange: "transform, opacity",
  });
  document.body.appendChild(clone);

  const frames = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    transform: `translate(${2 * (1 - t) * t * cx + t * t * dx}px, ${
      2 * (1 - t) * t * cy + t * t * dy
    }px) scale(${1 - 0.8 * t})`,
    opacity: t === 1 ? 0.4 : 1,
    offset: t,
  }));

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clone.remove();
    onLand();
    pulse(target);
  };

  try {
    const anim = clone.animate(frames, {
      duration: FLIGHT_MS,
      easing: "ease-in-out",
      fill: "forwards",
    });
    anim.onfinish = finish;
    anim.oncancel = finish;
  } catch {
    finish();
  }
}

/**
 * Returns `addToCart(product, event)`. Pass the click event of the Add to Cart
 * button: the first <img> in the closest [data-product-card] (or the button's
 * parent) flies to the cart and `handleCart(product)` runs when it lands.
 */
export default function useFlyToCart(handleCart) {
  return useCallback(
    (product, event) => {
      const btn = event && event.currentTarget;
      if (event && event.stopPropagation) event.stopPropagation();
      const card =
        btn && btn.closest
          ? btn.closest("[data-product-card]") || btn.parentElement
          : null;
      const img = card ? card.querySelector("img") : null;
      flyToCart(img, () => handleCart(product));
    },
    [handleCart]
  );
}
