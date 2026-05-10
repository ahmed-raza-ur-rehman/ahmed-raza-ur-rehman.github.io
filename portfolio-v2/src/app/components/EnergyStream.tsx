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

      {/* Plasma threads */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="plasma" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF88" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E0FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${50 + i * 5}% 0 Q ${50 + i * 10}% 50% ${50 + i * 5}% 100%`}
            stroke="url(#plasma)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
