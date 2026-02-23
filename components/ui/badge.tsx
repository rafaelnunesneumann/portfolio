"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "secondary" | "outline" }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)]",
    secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border-transparent",
    outline: "border-[hsl(var(--border))] text-[hsl(var(--foreground))] bg-transparent",
  }
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
