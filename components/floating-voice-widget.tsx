"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingVoiceWidgetProps {
  isListening?: boolean
  isProcessing?: boolean
  audioLevel?: number
  onCancel?: () => void
}

export function FloatingVoiceWidget({
  isListening = false,
  isProcessing = false,
  audioLevel = 0,
  onCancel,
}: FloatingVoiceWidgetProps) {
  const [bars, setBars] = useState<number[]>(Array(8).fill(0.3))

  useEffect(() => {
    if (!isListening || isProcessing) {
      setBars(Array(8).fill(0.3))
      return
    }

    const interval = setInterval(() => {
      setBars(
        Array(8)
          .fill(0)
          .map(() => Math.random() * (audioLevel || 0.5) + 0.2),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [isListening, isProcessing, audioLevel])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel?.()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      // Hide popup when clicking outside
      const target = e.target as HTMLElement
      if (!target.closest('.floating-widget-container')) {
        onCancel?.()
      }
    }

    window.addEventListener("keydown", handleEscape)
    window.addEventListener("click", handleClickOutside)
    
    return () => {
      window.removeEventListener("keydown", handleEscape)
      window.removeEventListener("click", handleClickOutside)
    }
  }, [onCancel])

  return (
    <div
      className="floating-widget-container w-full h-full flex items-center justify-center"
      style={{
        width: "190px",
        height: "64px",
        backgroundColor: "transparent",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="flex items-center gap-3 bg-white px-3 shadow-lg"
        style={{
          borderTopLeftRadius: "64px",
          borderBottomLeftRadius: "64px",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          height: "64px",
          width: "190px",
          minWidth: "190px",
          minHeight: "64px",
        }}
      >
        {/* Left Orb */}
        <div className="relative flex-shrink-0">
          <div
            className={cn("h-12 w-12 rounded-full", isListening && !isProcessing && "animate-pulse")}
            style={{
              background: "radial-gradient(circle at 30% 30%, #6B21A8, #2563EB)",
              boxShadow: "0 0 12px rgba(107, 33, 168, 0.4)",
              animation: isListening && !isProcessing ? "pulse 1.2s infinite ease-in-out" : "none",
            }}
          >
            {isProcessing && (
              <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
          </div>
        </div>

        {/* Right Equalizer */}
        <div className="flex items-center justify-center gap-[3px] flex-1 h-full">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full transition-all duration-100"
              style={{
                height: `${height * 32}px`,
                background: "linear-gradient(to top, #9333EA, #EC4899)",
                opacity: isProcessing ? 0.3 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
