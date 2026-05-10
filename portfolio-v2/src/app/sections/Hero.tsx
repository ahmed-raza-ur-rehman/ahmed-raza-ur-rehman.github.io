"use client";

import { motion } from "framer-motion";
import { ParticleField } from "../components/ParticleField";
import { EnergyStream } from "../components/EnergyStream";
import { TiltCard } from "../components/TiltCard";
import { MagneticButton } from "../components/MagneticButton";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <ParticleField />
      <EnergyStream />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-neon-green font-mono text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Computer Engineer | Hardware | Systems
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Building{" "}
              <span className="gradient-text">Computing</span>
              <br />
              From First Principles
            </motion.h1>

            <motion.p
              className="text-gray-400 text-lg max-w-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Final-year Computer Engineering student at IST, Islamabad.
              I work from transistors upward: HDL, FPGAs, firmware, circuits,
              and the systems around them.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <MagneticButton
                className="px-8 py-4 bg-gradient-to-r from-neon-green to-neon-cyan text-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-green/30 transition-shadow"
              >
                View Projects
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors"
              >
                Download CV
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: "3.49", label: "GPA" },
                { value: "12+", label: "Projects" },
                { value: "12", label: "Certifications" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Card */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <TiltCard className="w-full max-w-md" maxTilt={20}>
              <div className="glass rounded-3xl p-8 relative overflow-hidden group">
                {/* Card content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>

                  <div className="font-mono text-sm text-gray-400 mb-4">
                    <span className="text-neon-green">$</span> whoami
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center text-black font-bold text-xl">
                        AR
                      </div>
                      <div>
                        <div className="font-semibold">Ahmed Raza Ur Rehman</div>
                        <div className="text-sm text-gray-500">Computer Engineer</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Institution:</span>
                        <span>IST Islamabad</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Focus:</span>
                        <span>FPGA & Embedded</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span>Islamabad, PK</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-gray-500 mb-2">Tech Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {["Verilog", "STM32", "PCB", "Python", "FPGA"].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </section>
  );
}
