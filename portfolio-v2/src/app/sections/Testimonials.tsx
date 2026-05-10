"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    role: "Professor, IST Islamabad",
    content: "Ahmed consistently demonstrated exceptional problem-solving skills in our FPGA design course. His final project on RISC-V implementation was among the best I've seen.",
    avatar: "SA",
  },
  {
    id: 2,
    name: "Muhammad Ali Khan",
    role: "Senior Engineer, TechCorp",
    content: "Working with Ahmed on the embedded systems project was impressive. His attention to detail and deep understanding of hardware-software integration made all the difference.",
    avatar: "MA",
  },
  {
    id: 3,
    name: "Fatima Hassan",
    role: "Project Lead, Innovation Lab",
    content: "Ahmed's IoT environmental monitoring system showed remarkable technical maturity. He delivered a production-ready solution ahead of schedule.",
    avatar: "FH",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass rounded-2xl p-8 h-full relative overflow-hidden group">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-20">
          <Quote className="w-12 h-12 text-neon-green" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-gray-300 leading-relaxed mb-6 italic">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center text-black font-bold">
              {testimonial.avatar}
            </div>

            <div>
              <h4 className="font-semibold text-white">{testimonial.name}</h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-neon-cyan/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(0, 224, 255, 0.3))"
              : "none",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-neon-green font-mono text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feedback from professors, mentors, and colleagues who have worked with me.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: "3.49", label: "Current GPA" },
            { value: "12+", label: "Projects Completed" },
            { value: "12", label: "Certifications" },
            { value: "4", label: "Years Experience" },
          ].map((stat, index) => (
            <div key={index} className="text-center glass rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
