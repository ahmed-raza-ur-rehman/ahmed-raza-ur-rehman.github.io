"use client";

import { motion } from "framer-motion";

export function EnergyStream() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main beam */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 h-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #00FF88 20%, #00E0FF 50%, #00FF88 80%, transparent 100%)",
          filter: "blur(8px)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Core beam */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #ffffff 30%, #ffffff 70%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* Orbiting particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 w-2 h-2 rounded-full bg-neon-green"
          style={{
            boxShadow: "0 0 20px #00FF88, 0 0 40px #00FF88",
          }}
          animate={{
            y: ["-10%", "110%"],
            x: [Math.sin(i) * 30, Math.sin(i + 1) * 30],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}

      {/* Plasma threads - using CSS-based animation instead of SVG path percentages */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-px"
            style={{
              left: `${50 + i * 5}%`,
              background: `linear-gradient(180deg, transparent 0%, rgba(0, 255, 136, ${0.1 + i * 0.1}) 30%, rgba(0, 224, 255, ${0.2 + i * 0.1}) 50%, rgba(0, 255, 136, ${0.1 + i * 0.1}) 70%, transparent 100%)`,
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
