"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useLang } from "@/contexts/LangContext"
import { MapPin, Calendar } from "lucide-react"

const DOT_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
]

const CARD_ACCENTS = [
  "border-blue-500/40",
  "border-emerald-500/40",
  "border-purple-500/40",
]

export default function ExperienceSection() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-3">
            03 /
          </p>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">{t.experience.title}</h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-xl">{t.experience.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{ originY: 0 }}
            className="absolute left-5 top-0 bottom-0 w-px bg-[hsl(var(--border))]"
          />

          <div className="space-y-10">
            {t.experience.items.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + 0.18 * i }}
                className="relative flex gap-8"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.25 + 0.18 * i, type: "spring", stiffness: 300 }}
                    className="h-10 w-10 rounded-full overflow-hidden bg-[hsl(var(--card))] shadow-lg ring-4 ring-[hsl(var(--background))]"
                  >
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex-1 mb-2 rounded-2xl border bg-[hsl(var(--card))] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${CARD_ACCENTS[i % CARD_ACCENTS.length]}`}
                >
                  {/* Card header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[hsl(var(--primary))] mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full text-white ${DOT_COLORS[i % DOT_COLORS.length]} bg-opacity-90`}>
                        <Calendar size={11} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  {exp.bullets.length > 0 && (
                    <ul className="space-y-2.5 border-t border-[hsl(var(--border))] pt-4">
                      {exp.bullets.map((bullet, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.35, delay: 0.35 + 0.18 * i + 0.07 * j }}
                          className="flex items-start gap-2.5 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed"
                        >
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${DOT_COLORS[i % DOT_COLORS.length]}`} />
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* "Present" badge */}
                  {i === 0 && (
                    <div className="mt-4 pt-3 border-t border-[hsl(var(--border))]">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        {t.experience.current}
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
