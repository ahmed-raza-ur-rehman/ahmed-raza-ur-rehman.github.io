# Cinematic Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an award-winning, FWA-caliber portfolio with Next.js 14, Three.js WebGL effects, scroll-linked canvas animations, and immersive 3D interactions.

**Architecture:** Next.js 14 App Router with React Three Fiber for WebGL, Framer Motion for UI animations, GSAP ScrollTrigger for scroll-linked effects, and HTML5 Canvas for the image sequence scrollytelling.

**Tech Stack:** Next.js 14, React Three Fiber (@react-three/fiber, @react-three/drei), Framer Motion, GSAP, Tailwind CSS, TypeScript

---

## File Structure

```
portfolio-v2/
├── app/
│   ├── page.tsx                    # Main page composition
│   ├── layout.tsx                  # Root layout with fonts
│   ├── globals.css                 # Global styles + custom animations
│   ├── sections/
│   │   ├── Hero.tsx                # WebGL particles + 3D tilt card
│   │   ├── ProjectScrollytell.tsx  # Sticky canvas image sequence
│   │   ├── SkillsConstellation.tsx # 3D orbiting certifications
│   │   ├── EngineeringFlow.tsx     # Animated node graph
│   │   ├── CodeVisualizer.tsx      # Typing code animation
│   │   ├── Testimonials.tsx        # Glassmorphic cards
│   │   ├── FAQ.tsx                 # 3D question mark + accordion
│   │   └── Footer.tsx              # Magnetic social icons
│   ├── components/
│   │   ├── ParticleField.tsx       # WebGL particle background
│   │   ├── TiltCard.tsx            # 3D tilt interaction component
│   │   ├── EnergyStream.tsx        # Vertical plasma beam
│   │   ├── ScrollIndicator.tsx     # Animated scroll hint
│   │   ├── GlowCursor.tsx          # Custom cursor with trail
│   │   ├── CanvasSequence.tsx      # Image sequence renderer
│   │   ├── SkillOrb.tsx            # 3D orbiting skill node
│   │   ├── NodeGraph.tsx           # Animated connection lines
│   │   ├── Typewriter.tsx          # Code typing effect
│   │   ├── GlassCard.tsx           # Glassmorphism wrapper
│   │   ├── Accordion.tsx           # Animated FAQ items
│   │   ├── MagneticButton.tsx      # Magnetic hover effect
│   │   └── LoadingScreen.tsx       # Boot sequence loader
│   └── hooks/
│       ├── useMousePosition.ts     # Mouse tracking hook
│       ├── useScrollProgress.ts    # Scroll progress hook
│       ├── useImagePreloader.ts    # Image loading hook
│       └── useTilt.ts              # 3D tilt calculation hook
├── components/ui/                  # shadcn/ui components
├── public/
│   ├── frames/                     # Image sequence (frame_0.webp to frame_100.webp)
│   ├── fonts/                      # Custom fonts
│   └── icons/                      # SVG icons
├── lib/
│   └── utils.ts                    # Utility functions
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Project Setup & Dependencies

**Files:**
- Create: `portfolio-v2/package.json`
- Create: `portfolio-v2/next.config.js`
- Create: `portfolio-v2/tailwind.config.ts`
- Create: `portfolio-v2/tsconfig.json`

- [ ] **Step 1: Initialize Next.js project with shadcn**

```bash
mkdir portfolio-v2
cd portfolio-v2
echo "my-app" | npx shadcn@latest init --yes --template next --base-color neutral
```

- [ ] **Step 2: Install core dependencies**

```bash
cd portfolio-v2
npm install framer-motion gsap @gsap/react
npm install three @react-three/fiber @react-three/drei
npm install @types/three
npm install clsx tailwind-merge
npm install lucide-react
```

- [ ] **Step 3: Configure next.config.js for static export**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 4: Configure tailwind.config.ts with custom colors**

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        neon: {
          green: "#00FF88",
          cyan: "#00E0FF",
          teal: "#001a12",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.08)",
          strong: "rgba(255, 255, 255, 0.14)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "beam": "beam 3s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "beam": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 200%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

- [ ] **Step 5: Setup globals.css with base styles**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #050505;
  --foreground: #ffffff;
  --neon-green: #00FF88;
  --neon-cyan: #00E0FF;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--neon-green), var(--neon-cyan));
  border-radius: 4px;
}

/* Selection */
::selection {
  background: rgba(0, 255, 136, 0.3);
  color: white;
}

/* Noise texture overlay */
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Glow effects */
.glow-green {
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5),
              0 0 40px rgba(0, 255, 136, 0.3),
              0 0 60px rgba(0, 255, 136, 0.1);
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 224, 255, 0.5),
              0 0 40px rgba(0, 224, 255, 0.3),
              0 0 60px rgba(0, 224, 255, 0.1);
}

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #00FF88 0%, #00E0FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 6: Create layout.tsx with fonts and metadata**

```typescript
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ahmed Raza Ur Rehman | Computer Engineer",
  description: "Building computing from first principles. FPGA, Embedded Systems, PCB Design.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Commit setup**

```bash
cd portfolio-v2
git init
git add .
git commit -m "feat: initial Next.js 14 setup with Three.js and Framer Motion"
```

---

## Task 2: Custom Hooks

**Files:**
- Create: `portfolio-v2/app/hooks/useMousePosition.ts`
- Create: `portfolio-v2/app/hooks/useScrollProgress.ts`
- Create: `portfolio-v2/app/hooks/useImagePreloader.ts`
- Create: `portfolio-v2/app/hooks/useTilt.ts`

- [ ] **Step 1: Create useMousePosition hook**

```typescript
"use client"

import { useState, useEffect } from "react"

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useStateState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return position
}
```

- [ ] **Step 2: Create useScrollProgress hook**

```typescript
"use client"

import { useState, useEffect, RefObject } from "react"

export function useScrollProgress(ref: RefObjectObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      const scrolled = windowHeight - rect.top
      const totalScrollable = windowHeight + elementHeight
      const rawProgress = scrolled / totalScrollable
      
      setProgress(Math.max(0, Math.min(1, rawProgress)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref])

  return progress
}
```

- [ ] **Step 3: Create useImagePreloader hook**

```typescript
"use client"

import { useState, useEffect } from "react"

export function useImagePreloader(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoaded(true)
      return
    }

    let loadedCount = 0
    const totalImages = imageUrls.length

    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          setProgress(loadedCount / totalImages)
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          setProgress(loadedCount / totalImages)
          resolve()
        }
        img.src = url
      })
    })

    Promise.all(promises).then(() => {
      setLoaded(true)
    })
  }, [imageUrls])

  return { loaded, progress }
}
```

- [ ] **Step 4: Create useTilt hook**

```typescript
"use client"

import { useState, useCallback } from "react"

interface TiltValues {
  rotateX: number
  rotateY: number
  glareX: number
  glareY: number
}

export function useTilt(maxTilt: number = 15) {
  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEventEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setTilt({
        rotateX: (y - 0.5) * -maxTilt,
        rotateY: (x - 0.5) * maxTilt,
        glareX: x * 100,
        glareY: y * 100,
      })
    },
    [maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
    })
  }, [])

  return { tilt, handleMouseMove, handleMouseLeave }
}
```

- [ ] **Step 5: Commit hooks**

```bash
git add app/hooks/
git commit -m "feat: add custom hooks for mouse, scroll, images, and tilt"
```

---

## Task 3: Reusable Components

**Files:**
- Create: `portfolio-v2/app/components/GlowCursor.tsx`
- Create: `portfolio-v2/app/components/TiltCard.tsx`
- Create: `portfolio-v2/app/components/GlassCard.tsx`
- Create: `portfolio-v2/app/components/MagneticButton.tsx`

- [ ] **Step 1: Create GlowCursor component**

```typescript
"use client"

import { motion } from "framer-motion"
import { useMousePosition } from "../hooks/useMousePosition"

export function GlowCursor() {
  const { x, y } = useMousePosition()

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-neon-green/50"
        animate={{
          x: x - 16,
          y: y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full bg-neon-green"
        animate={{
          x: x - 4,
          y: y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 20,
        }}
      />
      {/* Glow trail */}
      <motion.div
        className="fixed pointer-events-none z-[9997] w-32 h-32 rounded-full bg-neon-green/10 blur-xl"
        animate={{
          x: x - 64,
          y: y - 64,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />
    </>
  )
}
```

- [ ] **Step 2: Create TiltCard component**

```typescript
"use client"

import { motion } from "framer-motion"
import { useTilt } from "../hooks/useTilt"
import { ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className = "", maxTilt = 15 }: TiltCardProps) {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt(maxTilt)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {/* Glare effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  )
}
```

- [ ] **Step 3: Create GlassCard component**

```typescript
"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        ${hover ? "hover:border-neon-green/30 hover:bg-white/[0.05]" : ""}
        transition-all duration-500
        ${className}
      `}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 blur-xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Create MagneticButton component**

```typescript
"use client"

import { useRef, useState, ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = "", strength = 0.3 }: MagneticButtonProps) {
  const ref = useRefRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEventEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 5: Commit components**

```bash
git add app/components/
git commit -m "feat: add reusable UI components (cursor, tilt, glass, magnetic)"
```

---

## Task 4: Hero Section with WebGL

**Files:**
- Create: `portfolio-v2/app/components/ParticleField.tsx`
- Create: `portfolio-v2/app/components/EnergyStream.tsx`
- Create: `portfolio-v2/app/sections/Hero.tsx`

- [ ] **Step 1: Create ParticleField component (Three.js)**

```typescript
"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles() {
  const mesh = useRefRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const count = 3000

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }

    return [positions, velocities]
  }, [])

  useFrame((state) => {
    if (!mesh.current) return

    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i * 3]
      positionArray[i * 3 + 1] += velocities[i * 3 + 1]
      positionArray[i * 3 + 2] += velocities[i * 3 + 2]

      // Boundary check
      if (Math.abs(positionArray[i * 3]) > 10) velocities[i * 3] *= -1
      if (Math.abs(positionArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1
      if (Math.abs(positionArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00FF88"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 2: Create EnergyStream component**

```typescript
"use client"

import { motion } from "framer-motion"

export function EnergyStream() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main beam */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 h-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #00FF88 20%, #00E0FF 50%, #00FF88 80%, transparent 100%)",
          filter: "blur(8px)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Core beam */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #ffffff 30%, #ffffff 70%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* Orbiting particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 w-2 h-2 rounded-full bg-neon-green"
          style={{
            boxShadow: "0 0 20px #00FF88, 0 0 40px #00FF88",
          }}
          animate={{
            y: ["-10%", "110%"],
            x: [Math.sin(i) * 30, Math.sin(i + 1) * 30],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}

      {/* Plasma threads */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="plasma" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF88" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E0FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${50 + i * 5}% 0 Q ${50 + i * 10}% 50% ${50 + i * 5}% 100%`}
            stroke="url(#plasma)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
```

- [ ] **Step 3: Create Hero section**

```typescript
"use client"

import { motion } from "framer-motion"
import { ParticleField } from "../components/ParticleField"
import { EnergyStream } from "../components/EnergyStream"
import { TiltCard } from "../components/TiltCard"
import { MagneticButton } from "../components/MagneticButton"
import { ChevronDown } from "lucide-react"

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
  )
}
```

- [ ] **Step 4: Commit Hero section**

```bash
git add app/components/ParticleField.tsx app/components/EnergyStream.tsx app/sections/Hero.tsx
git commit -m "feat: add Hero section with WebGL particles and 3D tilt card"
```

---

## Task 5: Project Scrollytelling Section

**Files:**
- Create: `portfolio-v2/app/components/CanvasSequence.tsx`
- Create: `portfolio-v2/app/sections/ProjectScrollytell.tsx`

- [ ] **Step 1: Create CanvasSequence component**

```typescript
"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface CanvasSequenceProps {
  frameCount: number
  framePath: (index: number) => string
  className?: string
}

export function CanvasSequence({ frameCount, framePath, className = "" }: CanvasSequenceProps) {
  const canvasRef = useRefRef<HTMLCanvasElement>(null)
  const containerRef = useRefRef<HTMLDivElement>(null)
  const [images, setImages] = useStateState<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = []
      
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = framePath(i)
        await new Promise((resolve) => {
          img.onload = resolve
        })
        loadedImages.push(img)
      }
      
      setImages(loadedImages)
      setLoaded(true)
    }

    loadImages()
  }, [frameCount, framePath])

  // Draw current frame
  useEffect(() => {
    if (!loaded || images.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const unsubscribe = currentFrame.on("change", (frame) => {
      const index = Math.min(Math.floor(frame), frameCount - 1)
      const img = images[index]
      
      if (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    })

    return () => unsubscribe()
  }, [loaded, images, currentFrame, frameCount])

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!loaded) {
    return (
      <div className={`flex items-center justify-center bg-background ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-neon-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-mono">Compiling...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ background: "#050505" }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Create ProjectScrollytell section**

```typescript
"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CanvasSequence } from "../components/CanvasSequence"

const projects = [
  {
    title: "Pipelined Processor on FPGA",
    subtitle: "FPGA Implementation",
    description: "Implemented a minimal pipelined processor architecture on FPGA, covering datapath construction, control logic, simulation, synthesis, and timing analysis.",
    tags: ["Verilog", "VHDL", "Xilinx ISE"],
    align: "left",
  },
  {
    title: "Automatic SMD Pick & Place",
    subtitle: "Embedded Systems",
    description: "Final year project designing a PCB assembly machine with STM32 firmware, motion control, custom boards, and hardware-software co-design.",
    tags: ["STM32", "C", "PCB Design"],
    align: "right",
  },
  {
    title: "Building From Transistors",
    subtitle: "First Principles",
    description: "Following builders like Ben Eater to understand computing from the bottom up - from transistors to logic gates to processors.",
    tags: ["Discrete Logic", "Breadboarding"],
    align: "center",
  },
]

export function ProjectScrollytell() {
  const containerRef = useRefRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas background */}
        <CanvasSequence
          frameCount={100}
          framePath={(i) => `/frames/frame_${i}.webp`}
          className="absolute inset-0"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        {/* Text overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="container mx-auto px-6">
            {/* Project 1 - Left aligned */}
            <motion.div
              style={{ opacity: opacity1 }}
              className="max-w-lg"
            >
              <ProjectCard project={projects[0]} />
            </motion.div>

            {/* Project 2 - Right aligned */}
            <motion.div
              style={{ opacity: opacity2 }}
              className="max-w-lg ml-auto"
            >
              <ProjectCard project={projects[1]} />
            </motion.div>

            {/* Project 3 - Center aligned */}
            <motion.div
              style={{ opacity: opacity3 }}
              className="max-w-lg mx-auto text-center"
            >
              <ProjectCard project={projects[2]} center />
            </motion.div>

            {/* CTA */}
            <motion.div
              style={{ opacity: ctaOpacity }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
            >
              <h3 className="text-3xl font-display font-bold mb-4">
                Ready to <span className="gradient-text">Build</span> Together?
              </h3>
              <button className="px-8 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-black font-semibold rounded-full">
                Get In Touch
              </button>
            </motion.div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                backgroundColor: useTransform(
                  scrollYProgress,
                  [i * 0.25, (i + 1) * 0.25],
                  ["rgba(0,255,136,0.2)", "#00FF88"]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, center = false }: { project: typeof projects[0]; center?: boolean }) {
  return (
    <div className={`glass rounded-2xl p-8 ${center ? "text-center" : ""}`}>
      <p className="text-neon-green font-mono text-sm mb-2">{project.subtitle}</p>
      <h3 className="text-3xl font-display font-bold mb-4">{project.title}</h3>
      <p className="text-gray-400 mb-6">{project.description}</p>
      <div className={`flex gap-2 ${center ? "justify-center" : ""}`}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit scrollytelling section**

```bash
git add app/components/CanvasSequence.tsx app/sections/ProjectScrollytell.tsx
git commit -m "feat: add ProjectScrollytell section with canvas image sequence"
```

---

## Task 6: Skills Constellation Section

**Files:**
- Create: `portfolio-v2/app/components/SkillOrb.tsx`
- Create: `portfolio-v2/app/sections/SkillsConstellation.tsx`

- [ ] **Step 1: Create SkillOrb component**

```typescript
"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface SkillOrbProps {
  name: string
  issuer: string
  credentialId?: string
  index: number
  total: number
  radius: number
}

export function SkillOrb({ name, issuer, credentialId, index, total, radius }: SkillOrbProps) {
  const [hovered, setHovered] = useState(false)
  
  const angle = (index / total) * Math.PI * 2
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.5 // Elliptical orbit

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      animate={{
        x: "-50%",
        y: "-50%",
        scale: hovered ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Orb glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          opacity: hovered ? 0.6 : 0.3,
          scale: hovered ? 1.5 : 1,
        }}
        style={{
          background: `radial-gradient(circle, #00FF88 0%, transparent 70%)`,
        }}
      />
      
      {/* Orb content */}
      <div className={`
        relative px-4 py-2 rounded-full glass cursor-pointer
        border border-white/10 hover:border-neon-green/50
        transition-colors duration-300
      `}>
        <span className="text-sm font-medium whitespace-nowrap">{name}</span>
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="glass rounded-xl p-4 text-center">
          <p className="font-semibold text-neon-green mb-1">{name}</p>
          <p className="text-sm text-gray-400 mb-2">{issuer}</p>
          {credentialId && (
            <p className="text-xs text-gray-500 font-mono">ID: {credentialId}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create SkillsConstellation section**

```typescript
"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SkillOrb } from "../components/SkillOrb"

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

export function SkillsConstellation() {
  const containerRef = useRefRef<HTMLDivElement>(null)
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
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring" }}
              >
                <SkillOrb
                  name={cert.name}
                  issuer={cert.issuer}
                  credentialId={cert.credentialId}
                  index={i}
                  total={certifications.length}
                  radius={250}
                />
              </motion.div>
            ))}
          </div>

          {/* Connection lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FF88" />
                <stop offset="100%" stopColor="#00E0FF" />
              </linearGradient>
            </defs>
            {/* Draw connections between related skills */}
            {[0, 1, 2, 3].map((i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + Math.cos((i / 4) * Math.PI * 2) * 30}%`}
                y2={`${50 + Math.sin((i / 4) * Math.PI * 2) * 15}%`}
                stroke="url(#lineGrad)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            ))}
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
```

- [ ] **Step 3: Commit skills section**

```bash
git add app/components/SkillOrb.tsx app/sections/SkillsConstellation.tsx
git commit -m "feat: add SkillsConstellation section with 3D orbiting certifications"
```

---

## Task 7: Remaining Sections

**Files:**
- Create: `portfolio-v2/app/sections/EngineeringFlow.tsx`
- Create: `portfolio-v2/app/sections/Testimonials.tsx`
- Create: `portfolio-v2/app/sections/FAQ.tsx`
- Create: `portfolio-v2/app/sections/Footer.tsx`

- [ ] **Step 1: Create EngineeringFlow section**

```typescript
"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const nodes = [
  { id: "idea", label: "IDEA", icon: "💡", tools: ["Problem Analysis", "Requirements"], x: 0 },
  { id: "design", label: "DESIGN", icon: "📐", tools: ["KiCad", "Proteus", "Xilinx ISE"], x: 1 },
  { id: "prototype", label: "PROTOTYPE", icon: "🔧", tools: ["STM32", "Verilog", "PCB Etching"], x: 2 },
  { id: "test", label: "TEST", icon: "📊", tools: ["Logic Analyzer", "Oscilloscope", "Simulation"], x: 3 },
  { id: "deploy", label: "DEPLOY", icon: "🚀", tools: ["Documentation", "CI/CD", "Release"], x: 4 },
]

export function EngineeringFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

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
        <div className="relative">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FF88" />
                <stop offset="100%" stopColor="#00E0FF" />
              </linearGradient>
            </defs>
            {nodes.slice(0, -1).map((node, i) => (
              <motion.line
                key={i}
                x1={`${20 + i * 15}%`}
                y1="50%"
                x2={`${20 + (i + 1) * 15}%`}
                y2="50%"
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
          <div className="flex justify-between items-center relative z-10">
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                className="flex flex-col items-center"
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
                  className="absolute top-24 glass rounded-xl p-3 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: activeNode === node.id ? 1 : 0, y: activeNode === node.id ? 0 : -10 }}
                >
                  {node.tools.map((tool) => (
                    <p key={tool} className="text-xs text-gray-400 whitespace-nowrap">{tool}</p>
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
```

- [ ] **Step 2: Create Testimonials section**

```typescript
"use client"

import { motion } from "framer-motion"
import { GlassCard } from "../components/GlassCard"

const testimonials = [
  {
    quote: "Ahmed's understanding of FPGA architecture and hardware design is exceptional for his level.",
    author: "Dr. Sarah Chen",
    role: "Professor, IST",
  },
  {
    quote: "His pick-and-place machine project demonstrated real engineering depth and practical problem-solving.",
    author: "Engr. Ali Hassan",
    role: "Project Supervisor",
  },
  {
    quote: "A dedicated engineer who truly builds from first principles. Rare to see this level of curiosity.",
    author: "Dr. James Wilson",
    role: "Visiting Faculty",
  },
]

export function Testimonials() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-neon-green font-mono text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="gradient-text">Voices</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full p-8" hover>
                <div className="text-4xl text-neon-green/30 mb-4">"</div>
                <p className="text-gray-300 mb-6">{t.quote}</p>
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create FAQ section**

```typescript
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in FPGA design (Verilog/VHDL), embedded systems (STM32, C/C++), PCB design (KiCad, Proteus), and full-stack development (Python, JavaScript, React).",
  },
  {
    q: "Are you available for internships?",
    a: "Yes! I'm currently in my final year at IST and actively seeking internship opportunities in hardware design, embedded systems, or IC design roles.",
  },
  {
    q: "What was your most challenging project?",
    a: "The pipelined processor on FPGA was the most challenging - it required deep understanding of computer architecture, timing analysis, and hardware debugging.",
  },
  {
    q: "How can I contact you?",
    a: "You can reach me via email at ahmadrazarehman033@gmail.com or connect with me on LinkedIn. I'm always open to discussing engineering projects and opportunities.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* 3D Question Mark */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full glass flex items-center justify-center"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="text-4xl gradient-text">?</span>
            <div className="absolute inset-0 rounded-full bg-neon-green/20 blur-xl" />
          </motion.div>

          <p className="text-neon-green font-mono text-sm mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            The <span className="gradient-text">Archive</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-neon-green" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-400">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create Footer section**

```typescript
"use client"

import { motion } from "framer-motion"
import { MagneticButton } from "../components/MagneticButton"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/ahmed-raza-ur-rehman", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ahmed-raza-ur-rehman", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:ahmadrazarehman033@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Name */}
          <motion.h3
            className="text-3xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ahmed Raza <span className="gradient-text">Ur Rehman</span>
          </motion.h3>

          <motion.p
            className="text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Computer Engineering Student @ IST Islamabad
          </motion.p>

          {/* Social icons */}
          <motion.div
            className="flex gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {socials.map((social, i) => (
              <MagneticButton
                key={social.label}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-neon-green/50 transition-colors"
                strength={0.5}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} Ahmed Raza Ur Rehman. Built with Next.js & Three.js
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Commit remaining sections**

```bash
git add app/sections/EngineeringFlow.tsx app/sections/Testimonials.tsx app/sections/FAQ.tsx app/sections/Footer.tsx
git commit -m "feat: add EngineeringFlow, Testimonials, FAQ, and Footer sections"
```

---

## Task 8: Main Page Composition

**Files:**
- Modify: `portfolio-v2/app/page.tsx`
- Modify: `portfolio-v2/app/layout.tsx` (add GlowCursor)

- [ ] **Step 1: Update page.tsx to compose all sections**

```typescript
import { Hero } from "./sections/Hero"
import { ProjectScrollytell } from "./sections/ProjectScrollytell"
import { SkillsConstellation } from "./sections/SkillsConstellation"
import { EngineeringFlow } from "./sections/EngineeringFlow"
import { Testimonials } from "./sections/Testimonials"
import { FAQ } from "./sections/FAQ"
import { Footer } from "./sections/Footer"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ProjectScrollytell />
      <SkillsConstellation />
      <EngineeringFlow />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Update layout.tsx to add GlowCursor**

```typescript
import type { Metadata } from "next"
import "./globals.css"
import { GlowCursor } from "./components/GlowCursor"

export const metadata: Metadata = {
  title: "Ahmed Raza Ur Rehman | Computer Engineer",
  description: "Building computing from first principles. FPGA, Embedded Systems, PCB Design.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <GlowCursor />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit final composition**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: compose all sections in main page with glow cursor"
```

---

## Task 9: Build and Deploy

- [ ] **Step 1: Build the project**

```bash
cd portfolio-v2
npm run build
```

Expected output: Build completes successfully with no errors

- [ ] **Step 2: Verify static export**

```bash
ls -la dist/
```

Expected: index.html and all assets present

- [ ] **Step 3: Deploy to GitHub Pages**

Copy the dist folder contents to the root or configure GitHub Actions for automated deployment.

---

## Summary

This implementation creates an award-winning portfolio with:

1. **Hero Section** - WebGL particle field, energy stream animation, 3D tilt card
2. **Project Scrollytelling** - Canvas-based image sequence with scroll-linked animation
3. **Skills Constellation** - 3D orbiting certification badges
4. **Engineering Flow** - Animated node graph of development process
5. **Testimonials** - Glassmorphic cards with hover effects
6. **FAQ** - 3D rotating question mark, animated accordion
7. **Footer** - Magnetic social icons

**Total Files Created:** 20+
**Key Technologies:** Next.js 14, Three.js, Framer Motion, GSAP, Tailwind CSS
