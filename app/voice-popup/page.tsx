"use client"

import { useEffect } from "react"
import { FloatingVoiceWidget } from "@/components/floating-voice-widget"
import useVoiceStore from "@/lib/voice-store"

export default function VoicePopupPage() {
  // Use the synchronized store instead of local state
  const {
    isListening,
    isProcessing,
    audioLevel,
    setIsListening,
    setIsProcessing,
    setAudioLevel,
  } = useVoiceStore()

  // Debug logging
  console.log('Voice popup page rendered with state:', { isListening, isProcessing, audioLevel })

  // No Tauri event listeners needed for web version

  return (
    <div 
      className="voice-popup-container w-full h-full bg-transparent flex items-center justify-center"
      style={{
        width: "190px",
        height: "64px",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <FloatingVoiceWidget
        isListening={isListening}
        isProcessing={isProcessing}
        audioLevel={audioLevel}
        onCancel={() => {
          setIsListening(false)
          // For web version, just close the current window/tab
          window.close()
        }}
      />
    </div>
  )
}
