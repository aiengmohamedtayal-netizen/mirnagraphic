import type { Variants, Transition } from "framer-motion";

// ─── Shared Transitions ───
const springSmooth: Transition = { type: "spring", stiffness: 280, damping: 26 };
const springSnappy: Transition = { type: "spring", stiffness: 400, damping: 28 };

// ─── Scroll Reveal Variants ───
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springSmooth },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: springSmooth },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: springSmooth },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: springSmooth },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: springSmooth },
};

// ─── Orchestration ───
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// ─── Interactive States ───
export const hoverLift = {
  whileHover: { y: -8, transition: springSnappy },
  whileTap: { scale: 0.97, transition: springSnappy },
};

export const hoverScale = {
  whileHover: { scale: 1.04, transition: springSnappy },
  whileTap: { scale: 0.96, transition: springSnappy },
};

export const cardHover = {
  whileHover: { y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(15, 76, 129, 0.15)", transition: springSnappy },
  whileTap: { scale: 0.98, transition: springSnappy },
};

export const buttonHover = {
  whileHover: { y: -2, scale: 1.02, boxShadow: "0 10px 20px -5px rgba(15, 76, 129, 0.25)", transition: springSnappy },
  whileTap: { scale: 0.96, transition: springSnappy },
};

// ─── Page Transitions ───
// ─── Semantic Reveals ───
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95, clipPath: "inset(10% 10% 10% 10%)" },
  visible: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

export const timelineReveal: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "100%", transition: { duration: 1.5, ease: "easeInOut" } },
};

export const statsCounter: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// ─── Page Transitions ───
export const pageTransition: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, filter: "blur(8px)", y: -10, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

// ─── Accordion ───
export const accordionContent: Variants = {
  collapsed: { opacity: 0, height: 0, overflow: "hidden" },
  expanded: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
  },
};

// ─── Counter Animation Helper ───
export const counterSpring: Transition = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  duration: 2,
};

// ─── Viewport Trigger Defaults ───
export const viewportOnce = { once: true, margin: "-80px" as const };
