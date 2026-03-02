"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, FileText, ExternalLink } from "lucide-react"
import { useLang } from "@/contexts/LangContext"

interface ResumeModalProps {
  open: boolean
  onClose: () => void
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const { t, lang } = useLang()
  const [loaded, setLoaded] = useState(false)

  // Reset loaded state whenever the modal opens or language changes
  useEffect(() => {
    if (open) setLoaded(false)
  }, [open, lang])

  // Close on ESC key
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const pdfFile = lang === "pt" ? "/Résumé 2025 port.pdf" : "/Résumé 2025.pdf"
  const downloadName = lang === "pt" ? "Rafael_Neumann_Curriculo.pdf" : "Rafael_Neumann_Resume.pdf"

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[hsl(var(--primary)/0.15)] flex items-center justify-center">
                    <FileText size={16} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {t.resume.view}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {t.resume.fileName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Open in new tab */}
                  <motion.a
                    href={pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all duration-200 cursor-pointer"
                    title="Open in new tab"
                  >
                    <ExternalLink size={13} />
                    <span className="hidden sm:inline">
                      {lang === "pt" ? "Abrir" : "Open"}
                    </span>
                  </motion.a>

                  {/* Download */}
                  <motion.a
                    href={pdfFile}
                    download={downloadName}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(var(--primary)/0.35)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-all duration-200 cursor-pointer shadow-lg"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">{t.resume.download}</span>
                  </motion.a>

                  {/* Close */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-8 w-8 rounded-full border border-[hsl(var(--border))] flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-all duration-200 cursor-pointer ml-1"
                    aria-label={t.resume.close}
                  >
                    <X size={15} />
                  </motion.button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="relative flex-1 overflow-hidden bg-[hsl(var(--muted)/0.4)]">
                {/* Loading state */}
                <AnimatePresence>
                  {!loaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[hsl(var(--background))] z-10"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        className="h-8 w-8 rounded-full border-2 border-[hsl(var(--primary)/0.3)] border-t-[hsl(var(--primary))]"
                      />
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {t.resume.loading}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <iframe
                  key={pdfFile}
                  src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-full border-0"
                  onLoad={() => setLoaded(true)}
                  title={t.resume.view}
                />
              </div>

              {/* Mobile footer — download button for small screens */}
              <div className="sm:hidden flex items-center justify-center gap-3 px-5 py-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] flex-shrink-0">
                <motion.a
                  href={pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all duration-200"
                >
                  <ExternalLink size={14} />
                  {lang === "pt" ? "Abrir" : "Open"}
                </motion.a>
                <motion.a
                  href={pdfFile}
                  download={downloadName}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-all duration-200"
                >
                  <Download size={14} />
                  {t.resume.download}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
