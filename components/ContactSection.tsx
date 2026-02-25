"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import emailjs from "@emailjs/browser"
import { useLang } from "@/contexts/LangContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  MessageCircle,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

const SOCIALS = [
  {
    key: "email" as const,
    icon: Mail,
    href: "mailto:rafaelnunesneumann123@gmail.com",
    color: "hover:text-blue-500 hover:border-blue-500/50",
    bg: "hover:bg-blue-500/10",
  },
  {
    key: "whatsapp" as const,
    icon: MessageCircle,
    href: "https://wa.me/5531999440231",
    color: "hover:text-green-500 hover:border-green-500/50",
    bg: "hover:bg-green-500/10",
  },
  {
    key: "linkedin" as const,
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rafael-neumann/",
    color: "hover:text-sky-500 hover:border-sky-500/50",
    bg: "hover:bg-sky-500/10",
  },
  {
    key: "github" as const,
    icon: Github,
    href: "https://github.com/rafaelnunesneumann",
    bg: "hover:bg-purple-500/10",
  },
]

export default function ContactSection() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus("sending")
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus("success")
      reset()
    } catch (error){
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[hsl(var(--muted)/0.3)] relative overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[hsl(var(--accent)/0.08)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[hsl(var(--primary))] mb-3">
            04 /
          </p>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">{t.contact.title}</h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-xl">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {SOCIALS.map((social, i) => {
                const Icon = social.icon
                const label = t.contact.socials[social.key]
                return (
                  <motion.a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-all duration-300 cursor-pointer group ${social.bg} ${social.color}`}
                  >
                    <Icon size={24} className="transition-colors duration-300" />
                    <span className="text-sm font-semibold transition-colors duration-300">
                      {label}
                    </span>
                  </motion.a>
                )
              })}
            </div>

            {/* Extra info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
            >
              <div className="font-mono text-sm text-[hsl(var(--muted-foreground))] space-y-1">
                <p>
                  <span className="text-[hsl(var(--primary))]">status</span>:{" "}
                  <span className="text-green-500">"available for opportunities"</span>
                </p>
                <p>
                  <span className="text-[hsl(var(--primary))]">location</span>:{" "}
                  <span className="text-[hsl(var(--accent))]">"Brasil 🇧🇷"</span>
                </p>
                <p>
                  <span className="text-[hsl(var(--primary))]">response_time</span>:{" "}
                  <span className="text-[hsl(var(--accent))]">"&lt; 24h"</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-8 shadow-sm space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
                  {t.contact.form.name}
                </label>
                <Input
                  {...register("name")}
                  placeholder={t.contact.form.name}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">Nome inválido</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
                  {t.contact.form.email}
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder={t.contact.form.email}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">E-mail inválido</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
                  {t.contact.form.message}
                </label>
                <Textarea
                  {...register("message")}
                  rows={5}
                  placeholder={t.contact.form.message}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">Mensagem muito curta</p>
                )}
              </div>

              {/* Status messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-500/10 px-4 py-3 rounded-xl"
                >
                  <CheckCircle size={16} />
                  {t.contact.form.success}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-500/10 px-4 py-3 rounded-xl"
                >
                  <AlertCircle size={16} />
                  {t.contact.form.error}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px hsl(var(--primary)/0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md"
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t.contact.form.send}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
