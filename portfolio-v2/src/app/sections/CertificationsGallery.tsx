"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Award, X, Calendar, Building2, BadgeCheck } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    issuerLogo: "🎓",
    date: "April 30, 2026",
    image: "/images/certs/1777563714433.jpg",
    credentialId: "253faca1-954e-4e86-b80c-e34d9b9480a8",
    url: "https://learn.deeplearning.ai/certificates/253faca1-954e-4e86-b80c-e34d9b9480a8",
    category: "Machine Learning",
    description: "Comprehensive course covering supervised learning algorithms including linear regression, logistic regression, and neural networks. Taught by Andrew Ng.",
    skills: ["Python", "TensorFlow", "Scikit-learn", "Neural Networks"],
  },
  {
    id: 2,
    name: "Introduction to Critical Infrastructure Protection (ICIP)",
    issuer: "OPSWAT",
    issuerLogo: "🛡️",
    date: "January 23, 2026",
    image: "/images/certs/1769146931415.jpg",
    credentialId: "QN1szzX0KQ",
    url: "https://learn.opswatacademy.com/certificate/QN1szzX0KQ",
    category: "Cybersecurity",
    description: "Professional certification in critical infrastructure protection, covering security standards and best practices for protecting essential systems.",
    skills: ["CIP", "Security Standards", "Risk Assessment"],
  },
  {
    id: 3,
    name: "Python Top 10%",
    issuer: "Credmark",
    issuerLogo: "🏆",
    date: "May 12, 2026",
    image: "/images/certs/1778572642643.jpg",
    credentialId: "CM-2605-EID4HSA",
    url: "#",
    category: "Programming",
    description: "Achieved top 10% ranking in Credmark's Python programming assessment, demonstrating advanced Python skills and problem-solving abilities.",
    skills: ["Python", "Data Structures", "Algorithms"],
  },
  {
    id: 4,
    name: "Cyber Security & Ethical Hacking",
    issuer: "AJK TEVTA",
    issuerLogo: "🔒",
    date: "December 30, 2025",
    image: "/images/certs/1778082664622.jpg",
    credentialId: "RIU-0500-30484",
    url: "#",
    category: "Cybersecurity",
    description: "3-month vocational training course in Cyber Security & Ethical Hacking at Riphah International University Islamabad. Grade: B (79%)",
    skills: ["Ethical Hacking", "Network Security", "Penetration Testing"],
  },
  {
    id: 5,
    name: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    issuerLogo: "🌐",
    date: "September 11, 2023",
    image: "/images/certs/1694437415391.jpg",
    credentialId: "JS-2023-0911",
    url: "#",
    category: "Web Development",
    description: "Professional JavaScript programming certification covering core language concepts, data types, functions, and program execution.",
    skills: ["JavaScript", "ES6+", "DOM Manipulation"],
  },
  {
    id: 6,
    name: "Python Primers: From First Programs to Projects",
    issuer: "Microsoft Learn",
    issuerLogo: "💻",
    date: "2024",
    image: "/images/certs/1705113896979.jpg",
    credentialId: "MS-2024-PYTHON",
    url: "#",
    category: "Programming",
    description: "Microsoft Student Ambassador program covering Python fundamentals through project-based learning.",
    skills: ["Python", "Project Development", "Microsoft Azure"],
  },
  {
    id: 7,
    name: "Python Programming Language",
    issuer: "MindLuster",
    issuerLogo: "🐍",
    date: "August 5, 2023",
    image: "/images/certs/1691231829887.jpg",
    credentialId: "807989031",
    url: "#",
    category: "Programming",
    description: "Comprehensive Python programming course covering syntax, data structures, and practical applications.",
    skills: ["Python", "Programming Fundamentals"],
  },
  {
    id: 8,
    name: "Flutter Development",
    issuer: "MindLuster",
    issuerLogo: "📱",
    date: "August 5, 2023",
    image: "/images/certs/1691231813721.jpg",
    credentialId: "8079897294",
    url: "#",
    category: "Mobile Development",
    description: "Cross-platform mobile app development using Flutter framework and Dart programming language.",
    skills: ["Flutter", "Dart", "Mobile UI/UX"],
  },
  {
    id: 9,
    name: "Higher Secondary School Certificate",
    issuer: "AJK Board of Education",
    issuerLogo: "📜",
    date: "January 12, 2024",
    image: "/images/certs/1778086256624.jpg",
    credentialId: "AK-00086218",
    url: "#",
    category: "Education",
    description: "HSSC in Science General from Govt Model Science College, Muzaffarabad. Total Marks: 815/1100",
    skills: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
  {
    id: 10,
    name: "Secondary School Certificate",
    issuer: "AJK Board of Education",
    issuerLogo: "📜",
    date: "March 21, 2022",
    image: "/images/certs/1778086445650.jpg",
    credentialId: "AK-15809270",
    url: "#",
    category: "Education",
    description: "SSC in Science from K.H. Khurshid School System. Total Marks: 984/1100 (A+ Grade in Computer Science)",
    skills: ["Science", "Mathematics", "Computer Science"],
  },
  {
    id: 11,
    name: "National Skills Competition Test (NSCT)",
    issuer: "Higher Education Commission Pakistan",
    issuerLogo: "🇵🇰",
    date: "April 4, 2026",
    image: "/images/certs/1777616185012.jpg",
    credentialId: "NSCT-2026-0404",
    url: "#",
    category: "Assessment",
    description: "Scored 73/100 with 98.5th percentile among 40,700+ students from 119 universities. Tested on Operating Systems, Software Engineering, Data Structures, Networks, Programming, Database, Cyber Security, Web Development, and AI/ML.",
    skills: ["Operating Systems", "Data Structures", "Networks", "Cyber Security", "AI/ML"],
  },
  {
    id: 12,
    name: "Professional Profile",
    issuer: "Portfolio",
    issuerLogo: "👤",
    date: "2026",
    image: "/images/certs/1777617736533.jpg",
    credentialId: "N/A",
    url: "#",
    category: "Profile",
    description: "Computer Engineer specializing in Full Stack Web Development and Embedded Systems based in Islamabad, Pakistan.",
    skills: ["Full Stack", "Embedded Systems", "Computer Engineering"],
  },
];

const categories = ["All", "Machine Learning", "Cybersecurity", "Programming", "Web Development", "Mobile Development", "Education", "Assessment"];

export function CertificationsGallery() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCerts = activeCategory === "All" 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4 p-3 rounded-full glass">
            <Award className="w-6 h-6 text-neon-green" />
          </div>
          <p className="text-neon-green font-mono text-sm mb-4">Credentials & Achievements</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Certifications <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications from DeepLearning.AI, Cisco, Microsoft, OPSWAT, and more. 
            Including academic achievements and competitive assessments.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-neon-green text-black"
                  : "glass text-gray-300 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer glass hover:border-neon-green/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCert(cert)}
              layout
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-black/60 backdrop-blur-sm text-neon-green border border-neon-green/30">
                    {cert.category}
                  </span>
                </div>

                {/* Issuer Logo Overlay */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-2xl">{cert.issuerLogo}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-neon-green font-mono mb-1">{cert.issuer}</p>
                <h3 className="text-sm font-semibold line-clamp-2 mb-2 group-hover:text-neon-green transition-colors">
                  {cert.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {cert.date}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-green/10 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: "12+", label: "Certifications" },
            { value: "98.5th", label: "NSCT Percentile" },
            { value: "Top 10%", label: "Python (Credmark)" },
            { value: "A+", label: "SSC Computer Science" },
          ].map((stat, index) => (
            <div key={index} className="text-center glass rounded-xl p-6">
              <div className="text-3xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass rounded-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors border border-white/10"
                  onClick={() => setSelectedCert(null)}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image */}
                <div className="aspect-[16/10] relative bg-black/50">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{selectedCert.issuerLogo}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-neon-green/20 text-neon-green">
                          {selectedCert.category}
                        </span>
                        <BadgeCheck className="w-4 h-4 text-neon-green" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">{selectedCert.name}</h3>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-neon-green" />
                      <div>
                        <p className="text-xs text-gray-400">Issued By</p>
                        <p className="text-sm font-medium">{selectedCert.issuer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-neon-green" />
                      <div>
                        <p className="text-xs text-gray-400">Issue Date</p>
                        <p className="text-sm font-medium">{selectedCert.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedCert.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-3">Skills & Topics</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-500">Credential ID</p>
                      <p className="text-sm font-mono text-gray-300">{selectedCert.credentialId}</p>
                    </div>
                    {selectedCert.url !== "#" && (
                      <a
                        href={selectedCert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-green/30 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify Credential
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
