"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Award, X } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    image: "/images/certs/1691231813721.jpg",
    credentialId: "253faca1",
    url: "https://www.coursera.org/account/accomplishments/specialization/253faca1",
  },
  {
    id: 2,
    name: "Cyber Security Fundamentals",
    issuer: "AJK TEVTA",
    date: "2024",
    image: "/images/certs/1691231829887.jpg",
    credentialId: "004297",
    url: "#",
  },
  {
    id: 3,
    name: "Build a Small Simulated Network With Cisco Packet Tracer",
    issuer: "Coursera",
    date: "Dec 2024",
    image: "/images/certs/1694437415391.jpg",
    credentialId: "98IN23TNN3S2",
    url: "https://www.coursera.org/account/accomplishments/records/98IN23TNN3S2",
  },
  {
    id: 4,
    name: "Foundations of Cybersecurity",
    issuer: "Google",
    date: "Dec 2024",
    image: "/images/certs/1705113896979.jpg",
    credentialId: "909GRJA0CX29",
    url: "https://www.coursera.org/account/accomplishments/verify/909GRJA0CX29",
  },
  {
    id: 5,
    name: "Python Programming",
    issuer: "Coursera",
    date: "2024",
    image: "/images/certs/1769146931415.jpg",
    credentialId: "4J4CDL87HMDQ",
    url: "https://www.coursera.org/account/accomplishments/records/4J4CDL87HMDQ",
  },
  {
    id: 6,
    name: "Google Workspace for Education Fundamentals",
    issuer: "Google",
    date: "2024",
    image: "/images/certs/1777094006081.jpg",
    credentialId: "192271010",
    url: "#",
  },
  {
    id: 7,
    name: "Mobile App Development with Glide",
    issuer: "Coursera",
    date: "Jul 2023",
    image: "/images/certs/1777563714433.jpg",
    credentialId: "LYFT6LEUHBUA",
    url: "https://www.coursera.org/account/accomplishments/records/LYFT6LEUHBUA",
  },
  {
    id: 8,
    name: "WordPress Website Creation",
    issuer: "Coursera",
    date: "Jul 2023",
    image: "/images/certs/1777565140936.jpg",
    credentialId: "QZ3FC9P7JHC6",
    url: "https://www.coursera.org/account/accomplishments/records/QZ3FC9P7JHC6",
  },
  {
    id: 9,
    name: "UI/UX Design with Moqups",
    issuer: "Coursera",
    date: "Jul 2023",
    image: "/images/certs/1777616185012.jpg",
    credentialId: "398Y9B4ETSN2",
    url: "https://www.coursera.org/account/accomplishments/records/398Y9B4ETSN2",
  },
  {
    id: 10,
    name: "JavaScript ES6",
    issuer: "Coursera",
    date: "2024",
    image: "/images/certs/1777617736533.jpg",
    credentialId: "LBT6JQFGV2MG",
    url: "https://www.coursera.org/account/accomplishments/records/LBT6JQFGV2MG",
  },
  {
    id: 11,
    name: "3D Modeling with SketchUp",
    issuer: "Coursera",
    date: "Jul 2023",
    image: "/images/certs/1778082664622.jpg",
    credentialId: "M7NEHZSJ3RYM",
    url: "https://www.coursera.org/account/accomplishments/records/M7NEHZSJ3RYM",
  },
  {
    id: 12,
    name: "OPSWAT Introduction to Critical Infrastructure Protection",
    issuer: "OPSWAT",
    date: "Jan 2026",
    image: "/images/certs/1778572642643.jpg",
    credentialId: "QN1szzX0KQ",
    url: "https://learn.opswatacademy.com/certificate/QN1szzX0KQ",
  },
];

export function CertificationsGallery() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-neon-green" />
          </div>
          <p className="text-neon-green font-mono text-sm mb-4">Credentials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Certifications <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications from Google, Coursera, DeepLearning.AI, OPSWAT, and more.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCert(cert)}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs text-neon-green font-mono">{cert.issuer}</p>
                  <p className="text-sm font-medium line-clamp-2">{cert.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full glass rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedCert(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-[16/10] relative">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-full h-full object-contain bg-black/50"
                />
              </div>
              <div className="p-6">
                <p className="text-neon-green font-mono text-sm mb-2">{selectedCert.issuer}</p>
                <h3 className="text-xl font-bold mb-2">{selectedCert.name}</h3>
                <p className="text-gray-400 text-sm mb-4">Issued: {selectedCert.date}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-mono">ID: {selectedCert.credentialId}</p>
                  <a
                    href={selectedCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green text-black font-medium rounded-full hover:bg-neon-green/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
