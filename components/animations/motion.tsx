'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function useMotionPresets() {
  const reduced = useReducedMotion();

  const fadeInUp = reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.01 } }
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } };

  const stagger = reduced ? 0 : 0.08;

  return { fadeInUp, stagger, reduced };
}

export function Stagger({ children }: { children: React.ReactNode }) {
  const { stagger } = useMotionPresets();
  return <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={{ initial: {}, animate: { transition: { staggerChildren: stagger } } }}>{children}</motion.div>;
}
