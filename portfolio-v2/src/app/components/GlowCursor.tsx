"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";

export function GlowCursor() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-neon-green/50"
        animate={{
          x: x - 16,
          y: y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full bg-neon-green"
        animate={{
          x: x - 4,
          y: y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 20,
        }}
      />
      {/* Glow trail */}
      <motion.div
        className="fixed pointer-events-none z-[9997] w-32 h-32 rounded-full bg-neon-green/10 blur-xl"
        animate={{
          x: x - 64,
          y: y - 64,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />
    </>
  );
}
