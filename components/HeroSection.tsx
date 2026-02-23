"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { useLang } from "@/contexts/LangContext"
import { ArrowDown } from "lucide-react"
import {
  siTypescript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siPostgresql,
  siDocker,
  siGit,
  siTailwindcss,
} from "simple-icons"

type TechIcon =
  | { type: "si"; path: string; hex: string }
  | { type: "text"; label: string; color: string }

// Java SVG path (Duke logo simplified — standard viewBox 0 0 24 24)
const JAVA_PATH =
  "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.774-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.981.623-10.522-.568 2.082-1.006 3.772-.892 3.772-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.366 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.191-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"

// NetSuite — stylized "N" path (custom, viewBox 0 0 24 24)
const NETSUITE_PATH =
  "M4 3h3.5l9 13.5V3H20v18h-3.5L7.5 7.5V21H4V3z"

const TECH_ICONS: Record<string, TechIcon> = {
  TypeScript:     { type: "si", path: siTypescript.path,   hex: siTypescript.hex },
  React:          { type: "si", path: siReact.path,         hex: siReact.hex },
  "Next.js":      { type: "si", path: siNextdotjs.path,     hex: siNextdotjs.hex },
  "Node.js":      { type: "si", path: siNodedotjs.path,     hex: siNodedotjs.hex },
  Python:         { type: "si", path: siPython.path,        hex: siPython.hex },
  PostgreSQL:     { type: "si", path: siPostgresql.path,    hex: siPostgresql.hex },
  Docker:         { type: "si", path: siDocker.path,        hex: siDocker.hex },
  Git:            { type: "si", path: siGit.path,           hex: siGit.hex },
  "Tailwind CSS": { type: "si", path: siTailwindcss.path,   hex: siTailwindcss.hex },
  Java:           { type: "si", path: JAVA_PATH,            hex: "007396" },
  "React Native": { type: "si", path: siReact.path,         hex: "61DAFB" },
  NetSuite:       { type: "si", path: NETSUITE_PATH,        hex: "26A69A" },
}

export default function HeroSection() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  // Typing effect for the name
  const FULL_NAME = "Rafael Nunes Neumann"
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [nameVisible, setNameVisible] = useState(false)

  useEffect(() => {
    const startDelay = setTimeout(() => setNameVisible(true), 900)
    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    if (!nameVisible) return

    const typingSpeed = isDeleting ? 40 : 65
    const atEnd = !isDeleting && displayed.length === FULL_NAME.length
    const atStart = isDeleting && displayed.length === 0

    if (atEnd) {
      // Pause at the end before deleting
      const pause = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(pause)
    }
    if (atStart) {
      // Pause at empty before typing again
      const pause = setTimeout(() => setIsDeleting(false), 500)
      return () => clearTimeout(pause)
    }

    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? FULL_NAME.slice(0, displayed.length - 1)
          : FULL_NAME.slice(0, displayed.length + 1)
      )
    }, typingSpeed)
    return () => clearTimeout(timeout)
  }, [nameVisible, displayed, isDeleting])

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 } as never,
    },
  }
  const item: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } as never },
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid"
      >
        {/* Ambient blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[hsl(var(--primary)/0.12)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[hsl(var(--accent)/0.12)] blur-3xl pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.p
            variants={item}
            className="text-sm font-semibold tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-4"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight"
          >
            {/* Line 1: "Rafael" gradient + rest up to "Nunes" */}
            <span className="block">
              <span className="gradient-text">
                {displayed.slice(0, Math.min(displayed.length, 6))}
              </span>
              <span className="text-[hsl(var(--foreground))]">
                {displayed.length > 6 ? displayed.slice(6, Math.min(displayed.length, 13)) : ""}
              </span>
              {/* Cursor on line 1 while still on first line */}
              {displayed.length <= 13 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-[3px] h-[0.8em] ml-1 align-middle bg-[hsl(var(--primary))] rounded-sm"
                />
              )}
            </span>
            {/* Line 2: "Neumann" */}
            <span className="block text-[hsl(var(--foreground))]">
              {displayed.length > 13 ? displayed.slice(13) : ""}
              {/* Cursor on line 2 once we get there */}
              {displayed.length > 13 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-[3px] h-[0.8em] ml-1 align-middle bg-[hsl(var(--primary))] rounded-sm"
                />
              )}
            </span>
          </motion.h1>

          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[hsl(var(--primary)/0.5)]" />
            <p className="text-xl sm:text-2xl font-light text-[hsl(var(--muted-foreground))]">
              {t.hero.role}
            </p>
            <div className="h-px w-12 bg-[hsl(var(--accent)/0.5)]" />
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary)/0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg"
            >
              {t.hero.cta}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-semibold text-sm hover:bg-[hsl(var(--muted))] transition-all duration-300 cursor-pointer"
            >
              {t.nav.contact}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[hsl(var(--muted-foreground))]"
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 lg:py-32" ref={ref}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text */}
            <div>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-3">
                01 /
              </p>
              <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
                {t.about.title}
              </h2>
              <div className="space-y-4">
                {t.about.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    className="text-[hsl(var(--muted-foreground))] leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-lg font-bold mb-6 text-[hsl(var(--foreground))]">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {t.about.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.05 * i, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--muted))] text-sm font-medium text-[hsl(var(--foreground))] cursor-default border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--primary)/0.08)] transition-all duration-200"
                  >
                    {(() => {
                      const icon = TECH_ICONS[skill]
                      if (!icon) return <span>⚙️</span>
                      if (icon.type === "si") return (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 flex-shrink-0"
                          style={{ fill: `#${icon.hex}` }}
                        >
                          <path d={icon.path} />
                        </svg>
                      )
                      return (
                        <span
                          className="h-4 w-4 flex-shrink-0 flex items-center justify-center rounded text-[10px] font-black leading-none"
                          style={{ color: icon.color }}
                        >
                          {icon.label}
                        </span>
                      )
                    })()}
                    {skill}
                  </motion.div>
                ))}
              </div>

              {/* Code decoration */}
              <div className="mt-6 pt-6 border-t border-[hsl(var(--border))] font-mono text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                <p><span className="text-[hsl(var(--primary))]">const</span> dev = {`{`}</p>
                <p className="pl-4">name: <span className="text-[hsl(var(--accent))]">"Rafael Neumann"</span>,</p>
                <p className="pl-4">role: <span className="text-[hsl(var(--accent))]">"Software Developer"</span>,</p>
                <p className="pl-4">passion: <span className="text-[hsl(var(--accent))]">"Building great things"</span></p>
                <p>{`}`}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
