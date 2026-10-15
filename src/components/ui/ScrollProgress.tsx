"use client";

import { motion } from "framer-motion";
import { useScroll } from "framer-motion";

/** Progress bar tipis di atas layar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-[3px] origin-left z-[80] bg-gradient-to-r from-orange via-orange-bright to-teal"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
