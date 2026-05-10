"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is your main area of expertise?",
    answer: "I specialize in computer engineering with a focus on embedded systems, FPGA design, and hardware-software integration. My experience spans from low-level RTL design to high-level system architecture.",
  },
  {
    question: "What programming languages do you work with?",
    answer: "I work with a variety of languages including Verilog and SystemVerilog for hardware design, C/C++ for embedded systems, Python for scripting and machine learning, and JavaScript/TypeScript for web applications.",
  },
  {
    question: "Are you available for internships or freelance work?",
    answer: "Yes, I'm currently seeking internship opportunities in hardware engineering, embedded systems, or FPGA design. I'm also open to freelance projects related to my expertise.",
  },
  {
    question: "What tools and software do you use?",
    answer: "For hardware design, I use Xilinx Vivado, ModelSim, and Altium Designer. For embedded development, I use STM32CubeIDE, PlatformIO, and various debugging tools. I'm also proficient in MATLAB, Python ecosystem, and version control with Git.",
  },
  {
    question: "What is your educational background?",
    answer: "I'm a final-year Computer Engineering student at the Institute of Space Technology (IST), Islamabad, with a current GPA of 3.49/4.0. I have also completed 12 professional certifications in areas like Machine Learning, Cybersecurity, and Networking.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="border-b border-white/10 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={onToggle}
      >
        <span className="text-lg font-medium pr-8 group-hover:text-neon-green transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-neon-green transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <HelpCircle className="w-6 h-6 text-neon-green" />
            </motion.div>
            <p className="text-neon-green font-mono text-sm mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400">
              Have questions? Here are some answers to common inquiries.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="glass rounded-2xl p-2">
            <div className="px-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">
              Still have questions? Feel free to reach out.
            </p>
            <a
              href="mailto:ahmadrazarehman033@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-green/30 transition-shadow"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
