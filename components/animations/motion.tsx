'use client';
import { motion } from 'framer-motion';

export const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export function Stagger({ children }: { children: React.ReactNode }) {
  return <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={{ initial: {}, animate: { transition: { staggerChildren: 0.08 } } }}>{children}</motion.div>;
}
