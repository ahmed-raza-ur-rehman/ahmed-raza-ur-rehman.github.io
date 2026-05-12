"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ThumbsUp, MessageCircle } from "lucide-react";

// LinkedIn icon (deprecated in lucide-react)
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const linkedInPosts = [
  {
    id: 1,
    content: "73 out of 100. Alhamdulillah. Not because 73 is good. But because I walked out thinking I barely got 15, only the ones I was completely sure about. Then I saw the percentile - 98.5th among 40,700+ students from 119 universities. These were absolute fundamentals that the industry expects.",
    image: "/images/certs/1777616185012.jpg",
    date: "May 2026",
    likes: 128,
    comments: 34,
    url: "#",
    tags: ["#NSCT", "#HEC", "#NationalSkillsTest"],
  },
  {
    id: 2,
    content: "I have completed the AI Developer Path on AMD Academy. Thanks AMD for this opportunity. Also completed courses on AMD Instinct Accelerators and running GPT-OSS 120B with vLLM on MI300X GPU.",
    image: "/images/certs/1778157924960.jpeg",
    date: "May 2026",
    likes: 45,
    comments: 8,
    url: "https://amdai.netexam.com/LinkedInShareArticle/31042_Course_166289_696358.html",
    tags: ["#AMD", "#AI", "#MachineLearning"],
  },
  {
    id: 3,
    content: "Thanks Meta for this opportunity. Learned a lot about how it's ALRIGHT to jump between roles, to just start as something. To work on something Greater than yourself. To be just Present. To showcase. Even if it's something very little. What matters is you dream Big.",
    date: "May 2026",
    likes: 62,
    comments: 12,
    url: "#",
    tags: ["#Meta", "#CareerGrowth"],
  },
  {
    id: 4,
    content: "View my verified achievement from OPSWAT. Introduction to Critical Infrastructure Protection (ICIP). This certification covers security standards and best practices for protecting essential infrastructure systems.",
    image: "/images/certs/1777094006081.jpeg",
    date: "Jan 2026",
    likes: 38,
    comments: 5,
    url: "https://www.credly.com/badges/326fc125-0ca6-4823-9ec5-366da9735c49/linked_in",
    tags: ["#OPSWAT", "#Cybersecurity", "#CIP"],
  },
  {
    id: 5,
    content: "I'm happy to share that I've obtained a new certification: Basic use of Google Workspace for Education Fundamentals from Google! This covers essential tools for educational productivity and collaboration.",
    date: "2024",
    likes: 52,
    comments: 7,
    url: "#",
    tags: ["#Google", "#GoogleWorkspace", "#Education"],
  },
  {
    id: 6,
    content: "Very disappointed with the management of GDG Data Science Hackathon 2026 organized by GDG on Campus COMSATS Wah. We received official confirmation but after traveling 150km, were informed the event was shifted to May 12th with NO prior notice. Students spent money, fuel, and hours traveling because they trusted official GDG communication.",
    image: "/images/certs/1777525590042.jpeg",
    date: "May 2026",
    likes: 89,
    comments: 23,
    url: "#",
    tags: ["#GDG", "#Hackathon", "#StudentRights"],
  },
];

function PostCard({ post, index }: { post: typeof linkedInPosts[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = post.content.length > 150;
  const displayContent = expanded || !shouldTruncate 
    ? post.content 
    : post.content.slice(0, 150) + "...";

  return (
    <motion.div
      className="glass rounded-xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center text-black font-bold text-sm">
          AR
        </div>
        <div>
          <p className="font-semibold text-sm">Ahmed Raza Ur Rehman</p>
          <p className="text-xs text-gray-400">{post.date}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 flex-1">
        <p className="text-sm text-gray-300 leading-relaxed">
          {displayContent}
          {shouldTruncate && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-neon-green ml-1 hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>
        {post.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-neon-green/70">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div className="aspect-video relative">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 flex items-center justify-between border-t border-white/10 mt-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <ThumbsUp className="w-4 h-4" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </span>
        </div>
        <a 
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon-green hover:text-neon-cyan transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export function LinkedInActivity() {
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
            <div className="text-[#0A66C2]"><LinkedInIcon /></div>
          </div>
          <p className="text-neon-green font-mono text-sm mb-4">Recent Activity</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            LinkedIn <span className="gradient-text">Updates</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Latest certifications, achievements, and professional updates from my LinkedIn profile. 
            Including NSCT results, AMD AI Academy completion, and more.
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linkedInPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View Profile CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://linkedin.com/in/ahmed-raza-ur-rehman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-full hover:bg-[#0A66C2]/90 transition-colors"
          >
            <LinkedInIcon />
            View LinkedIn Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
