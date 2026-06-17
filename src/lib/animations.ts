import { Variants } from 'framer-motion';

export const splashRise: Variants = {
  hidden: { y: 26, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const pop: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { type: 'spring', stiffness: 400, damping: 15 },
    },
  },
};

export const heart: Variants = {
  tap: {
    scale: [1, 1.45, 0.9, 1],
    transition: { duration: 0.35 },
  },
};

export const sheetUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const slideUp: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
