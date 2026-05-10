"use client"

// SkillsConstellation component
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const certifications = [
  { name: "Machine Learning", issuer: "DeepLearning.AI", credentialId: "253faca1..." },
  { name: "Cyber Security", issuer: "AJK TEVTA", credentialId: "004297" },
  { name: "Cisco Packet Tracer", issuer: "Coursera", credentialId: "98IN23TNN3S2" },
  { name: "Foundations of Cybersecurity", issuer: "Google", credentialId: "909GRJA0CX29" },
  { name: "Python Programming", issuer: "Coursera", credentialId: "4J4CDL87HMDQ" },
  { name: "Google Workspace", issuer: "Google", credentialId: "192271010" },
  { name: "Mobile App Dev", issuer: "Coursera", credentialId: "LYFT6LEUHBUA" },
  { name: "WordPress Development", issuer: "Coursera", credentialId: "QZ3FC9P7JHC6" },
  { name: "UI/UX Design", issuer: "Coursera", credentialId: "398Y9B4ETSN2" },
  { name: "JavaScript ES6", issuer: "Coursera", credentialId: "LBT6JQFGV2MG" },
  { name: "3D Modeling", issuer: "Coursera", credentialId: "M7NEHZSJ3RYM" },
  { name: "Critical Infrastructure", issuer: "OPSWAT", credentialId: "QN1szzX0KQ" },
]

function SkillOrb({ cert, index, total }: { cert: typeof certifications[0]; index: number; total: number }) {
  const radius = 250
  const angle = (index / total) * Math.PI * 2
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.5

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring" }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        whileHover={{ scale: 1.2 }}
      >
        {/* Orb glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl bg-neon-green/30 group-hover:bg-neon-green/60 transition-all"
        />
        
        {/* Orb content */}
        <div className="relative px-4 py-2 rounded-full glass border border-white/10 hover:border-neon-green/50 transition-colors">
          <span className="text-sm font-medium whitespace-nowrap">{cert.name}</span>
        </div>

        {/* Tooltip */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="glass rounded-xl p-4 text-center">
            <p className="font-semibold text-neon-green mb-1">{cert.name}</p>
            <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
            <p className="text-xs text-gray-500 font-mono">ID: {cert.credentialId}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function SkillsConstellation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-neon-green font-mono text-sm mb-4">Certifications & Skills</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            The <span className="gradient-text">Nexus</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            12 professional certifications across Machine Learning, Cybersecurity,
            Networking, and Software Development.
          </p>
        </motion.div>

        {/* Constellation */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Central IST Badge */}
          <motion.div
            className="absolute z-10"
            style={{ rotateY }}
          >
            <div className="w-32 h-32 rounded-full glass flex flex-col items-center justify-center border-2 border-neon-green/30 glow-green">
              <span className="text-3xl font-display font-bold gradient-text">3.49</span>
              <span className="text-xs text-gray-400">GPA</span>
              <span className="text-xs text-neon-green mt-1">IST</span>
            </div>
          </motion.div>

          {/* Orbiting skills */}
          <div className="absolute inset-0">
            {certifications.map((cert, i) => (
              <SkillOrb key={cert.name} cert={cert} index={i} total={certifications.length} />
            ))}
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FF88" />
                <stop offset="100%" stopColor="#00E0FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Education timeline */}
        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { year: "2022-2026", title: "BS Computer Engineering", place: "IST Islamabad", score: "3.49/4.0" },
            { year: "2020-2022", title: "HSSC Computer Science", place: "GM College", score: "815" },
            { year: "2018-2020", title: "SSC Computer Science", place: "KH Khurshid", score: "984" },
          ].map((edu, i) => (
            <div key={i} className="glass rounded-xl p-6 text-center">
              <p className="text-neon-green font-mono text-sm mb-2">{edu.year}</p>
              <h4 className="font-semibold mb-1">{edu.title}</h4>
              <p className="text-gray-400 text-sm mb-2">{edu.place}</p>
              <p className="text-2xl font-display font-bold gradient-text">{edu.score}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
