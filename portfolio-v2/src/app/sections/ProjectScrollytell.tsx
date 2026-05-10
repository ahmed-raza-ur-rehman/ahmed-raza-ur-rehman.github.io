"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "FPGA Signal Processor",
    description: "High-speed digital signal processing on Xilinx Artix-7 FPGA. Implemented FFT, filtering, and real-time data acquisition.",
    tech: ["Verilog", "Vivado", "MATLAB"],
    color: "#00FF88",
  },
  {
    id: 2,
    title: "STM32 Motor Controller",
    description: "Closed-loop BLDC motor control system with sensorless commutation and CAN bus communication.",
    tech: ["C/C++", "STM32Cube", "FreeRTOS"],
    color: "#00E0FF",
  },
  {
    id: 3,
    title: "IoT Environmental Monitor",
    description: "Wireless sensor network for air quality monitoring with LoRaWAN connectivity and cloud dashboard.",
    tech: ["ESP32", "LoRa", "MQTT", "InfluxDB"],
    color: "#00FF88",
  },
  {
    id: 4,
    title: "RISC-V Core Implementation",
    description: "5-stage pipelined RISC-V processor core with hazard detection and branch prediction.",
    tech: ["SystemVerilog", "RISC-V", "QuestaSim"],
    color: "#00E0FF",
  },
];

// Canvas-based project visualization
function ProjectCanvas({ progress, project }: { progress: number; project: typeof projects[0] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw animated visualization based on project
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const baseRadius = Math.min(rect.width, rect.height) * 0.25;

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `${project.color}20`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw animated inner elements based on progress
    const animatedProgress = (progress * projects.length) % 1;
    const rotation = progress * Math.PI * 4;

    // Draw rotating elements
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + rotation;
      const x = centerX + Math.cos(angle) * baseRadius * 0.7;
      const y = centerY + Math.sin(angle) * baseRadius * 0.7;

      ctx.beginPath();
      ctx.arc(x, y, 4 + animatedProgress * 4, 0, Math.PI * 2);
      ctx.fillStyle = project.color;
      ctx.globalAlpha = 0.6 + animatedProgress * 0.4;
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Draw center element
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `${project.color}40`;
    ctx.fill();

    // Draw project number
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(project.id), centerX, centerY);

    // Draw tech stack indicators
    const techY = rect.height - 60;
    project.tech.forEach((tech, i) => {
      const x = centerX + (i - (project.tech.length - 1) / 2) * 80;
      ctx.fillStyle = `${project.color}30`;
      ctx.fillRect(x - 35, techY - 12, 70, 24);
      ctx.strokeStyle = project.color;
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 35, techY - 12, 70, 24);
      
      ctx.fillStyle = "#fff";
      ctx.font = "10px system-ui";
      ctx.fillText(tech, x, techY);
    });

  }, [progress, project]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function ProjectScrollytell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update active project based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-neon-green font-mono text-sm mb-4">Featured Work</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Engineering <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Scroll to explore selected hardware and embedded systems projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Canvas visualization */}
            <div className="relative h-[400px] glass rounded-2xl overflow-hidden">
              <ProjectCanvas progress={scrollYProgress.get()} project={projects[activeIndex]} />
              
              {/* Progress indicator */}
              <div className="absolute top-4 right-4 flex gap-2">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === activeIndex ? "bg-neon-green" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project details */}
            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-30 translate-x-4"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="text-4xl font-display font-bold"
                      style={{ color: project.color }}
                    >
                      0{project.id}
                    </span>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full border"
                        style={{
                          borderColor: `${project.color}40`,
                          backgroundColor: `${project.color}10`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
