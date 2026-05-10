"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const nodes = [
  { id: "idea", label: "IDEA", icon: "💡", tools: ["Problem Analysis", "Requirements"], x: 0 },
  { id: "design", label: "DESIGN", icon: "📐", tools: ["KiCad", "Proteus", "Xilinx ISE"], x: 1 },
  { id: "prototype", label: "PROTOTYPE", icon: "🔧", tools: ["STM32", "Verilog", "PCB Etching"], x: 2 },
  { id: "test", label: "TEST", icon: "📊", tools: ["Logic Analyzer", "Oscilloscope", "Simulation"], x: 3 },
  { id: "deploy", label: "DEPLOY", icon: "🚀", tools: ["Documentation", "CI/CD", "Release"], x: 4 },
]

export function EngineeringFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(1000)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate positions based on container width
  const getX = (index: number) => {
    const padding = containerWidth * 0.15
    const availableWidth = containerWidth - padding * 2
    const spacing = availableWidth / (nodes.length - 1)
    return padding + spacing * index
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-neon-green font-mono text-sm mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            The <span className="gradient-text">Flow</span>
          </h2>
        </motion.div>

        {/* Node graph */}
        <div ref={containerRef} className="relative h-40">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FF88" />
                <stop offset="100%" stopColor="#00E0FF" />
              </linearGradient>
            </defs>
            {nodes.slice(0, -1).map((_, i) => (
              <motion.line
                key={i}
                x1={getX(i)}
                y1={40}
                x2={getX(i + 1)}
                y2={40}
                stroke="url(#flowGrad)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              />
            ))}
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0 flex justify-between items-start">
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                className="flex flex-col items-center absolute"
                style={{ left: getX(i), transform: "translateX(-50%)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <motion.div
                  className={`
                    w-20 h-20 rounded-full glass flex items-center justify-center
                    cursor-pointer transition-all duration-300
                    ${activeNode === node.id ? "border-neon-green glow-green" : "border-white/10"}
                  `}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: activeNode === node.id
                      ? "0 0 30px rgba(0, 255, 136, 0.5)"
                      : "0 0 0px rgba(0, 255, 136, 0)",
                  }}
                >
                  <span className="text-2xl">{node.icon}</span>
                </motion.div>
                <p className="mt-4 font-mono text-sm text-neon-green">{node.label}</p>

                {/* Tools popup */}
                <motion.div
                  className="absolute top-28 glass rounded-xl p-3 text-center opacity-0 pointer-events-none whitespace-nowrap"
                  animate={{ opacity: activeNode === node.id ? 1 : 0, y: activeNode === node.id ? 0 : -10 }}
                >
                  {node.tools.map((tool) => (
                    <p key={tool} className="text-xs text-gray-400">{tool}</p>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
