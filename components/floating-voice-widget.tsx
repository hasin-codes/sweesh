"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingVoiceWidgetProps {
  isListening?: boolean
  isProcessing?: boolean
  audioLevel?: number
  onCancel?: () => void
  onStartRecording?: () => void
  onStopRecording?: () => void
  onShow?: () => void
}

export function FloatingVoiceWidget({
  isListening = false,
  isProcessing = false,
  audioLevel = 0,
  onCancel,
  onStartRecording,
  onStopRecording,
  onShow,
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


    // Push-to-talk with keyboard (Alt+M) - only when widget is visible
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault()
        e.stopPropagation() // Prevent global handler from firing
        onStartRecording?.()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        e.preventDefault()
        e.stopPropagation() // Prevent global handler from firing
        onStopRecording?.()
      }
    }

    window.addEventListener("keydown", handleEscape)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("click", handleClickOutside)
    
    return () => {
      window.removeEventListener("keydown", handleEscape)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("click", handleClickOutside)
    }
  }, [onCancel, onStartRecording, onStopRecording])

  // Global Alt+M listener to show widget
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "m" || e.key === "M")) {
        // Use the repeat property to only trigger on the first press, not repeats
        if (e.repeat) {
          return
        }
        e.preventDefault()
        console.log('Alt+M pressed globally - showing widget')
        onShow?.()
      }
    }

    document.addEventListener("keydown", handleGlobalKeyDown)
    
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [onShow])

  return (
    <div
      className="floating-widget-container fixed right-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        width: "190px",
        height: "64px",
        backgroundColor: "transparent",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="flex items-center gap-3 px-3 shadow-lg select-none backdrop-blur-md bg-white/20"
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
          userSelect: "none",
        }}
      >
        {/* Left Orb */}
        <div className="relative flex-shrink-0">
          <div
            className={cn("h-12 w-12 rounded-full", isListening && !isProcessing && "animate-pulse")}
            style={{
              background: "radial-gradient(circle at 30% 30%, #dc2626, #ea580c)",
              boxShadow: "0 0 12px rgba(220, 38, 38, 0.4)",
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
                background: "linear-gradient(to top, #dc2626, #ea580c)",
                opacity: isProcessing ? 0.3 : 1,
              }}
            />
          ))}
        </div>

        {/* Push-to-talk indicator */}
        <div className="text-xs text-gray-600 font-medium">
          {isListening ? "Release Alt+M" : "Hold Alt+M"}
        </div>
      </div>
    </div>
  )
}
