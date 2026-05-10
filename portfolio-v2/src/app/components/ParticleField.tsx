"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(50));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-neon-green"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 255, 136, 0.5)`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
}

export function ParticleField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black to-transparent" />
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <ParticleBackground />
    </div>
  );
}
