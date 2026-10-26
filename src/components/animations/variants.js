// Shared Framer Motion variants so every animation uses the same timing/easing.
export const easeOut = [0.22, 1, 0.36, 1];

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Product / category cards: staggered reveal (pass `custom={index}`) plus a
// hover lift. Children can opt into the hover with `cardImageVariants`.
export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: Math.min(i, 6) * 0.07 },
  }),
  hover: { y: -6, transition: { duration: 0.25, ease: easeOut } },
};

export const cardImageVariants = {
  hover: { scale: 1.08, transition: { duration: 0.35, ease: easeOut } },
};

// Wrap a card's `viewport` so it reveals once when scrolled into view.
export const cardViewport = { once: true, amount: 0.15 };
