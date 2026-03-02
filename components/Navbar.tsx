"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X, FileText } from "lucide-react"
import { useLang } from "@/contexts/LangContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ResumeModal from "@/components/ResumeModal"

export default function Navbar() {
  const { t, lang, toggle: toggleLang } = useLang()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact", label: t.nav.contact },
  ]

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
    <motion.header
      initial={mounted ? { y: -80, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[hsl(var(--background)/0.85)] backdrop-blur-xl border-b border-[hsl(var(--border))] shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => handleNav("#hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg font-bold gradient-text cursor-pointer"
          >
            RNN
            <span className="text-[hsl(var(--primary))]">.</span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleNav(link.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}

            {/* Resume button — desktop */}
            <motion.button
              onClick={() => setResumeOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(var(--primary)/0.35)" }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg transition-all duration-200 cursor-pointer"
            >
              <FileText size={14} />
              {t.resume.button}
            </motion.button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="h-9 px-3 rounded-full border border-[hsl(var(--border))] text-xs font-semibold text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all duration-200 cursor-pointer"
            >
              {lang === "pt" ? "EN" : "PT"}
            </motion.button>

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="h-9 w-9 rounded-full border border-[hsl(var(--border))] flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-all duration-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={16} className="text-[hsl(var(--foreground))]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={16} className="text-[hsl(var(--foreground))]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden h-9 w-9 rounded-full border border-[hsl(var(--border))] flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-all duration-200 cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background)/0.95)] backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-lg transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Resume button — mobile */}
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.07 }}
                onClick={() => { setMobileOpen(false); setResumeOpen(true) }}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-all duration-200 cursor-pointer"
              >
                <FileText size={15} />
                {t.resume.button}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

    <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
  </>
  )
}
