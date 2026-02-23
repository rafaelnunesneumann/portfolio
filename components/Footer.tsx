"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="text-lg font-black gradient-text cursor-default"
          >
            RNN<span className="text-[hsl(var(--primary))]">.</span>
          </motion.p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/rafaelnunesneumann" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/rafael-neumann/" },
              { icon: Mail, href: "mailto:rafaelnunesneumann123@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.5)] transition-all duration-200"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
