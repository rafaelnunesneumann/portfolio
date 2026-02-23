"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useLang } from "@/contexts/LangContext"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const PROJECT_EMOJIS = ["🦷", "📚"]

export default function ProjectsSection() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[hsl(var(--muted)/0.3)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-3">
            02 /
          </p>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">{t.projects.title}</h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-xl">{t.projects.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px timeline-line hidden sm:block" />

          <div className="space-y-12">
            {t.projects.items.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="relative sm:pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * i + 0.2, type: "spring" }}
                  className="absolute left-0 top-6 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--card))] border-2 border-[hsl(var(--primary))] shadow-md text-2xl z-10"
                >
                  {PROJECT_EMOJIS[i % PROJECT_EMOJIS.length]}
                </motion.div>

                {/* Year badge — mobile only */}
                <div className="flex items-center gap-2 mb-4 sm:hidden">
                  <Calendar size={14} className="text-[hsl(var(--primary))]" />
                  <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                    {project.year}
                  </span>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px hsl(var(--primary)/0.12)" }}
                  transition={{ duration: 0.25 }}
                  className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm hover:border-[hsl(var(--primary)/0.4)] transition-colors duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-52 md:h-auto min-h-[200px] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Calendar size={11} />
                        {project.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techs.map((tech) => (
                          <Badge key={tech} variant="default" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
