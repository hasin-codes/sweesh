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

  useEffect(() => {
    const unsubs: Array<() => void> = []
    const tauri = (window as any).__TAURI__

    ;(async () => {
      try {
        const u1 = await tauri?.event?.listen("voice:start", () => setIsListening(true))
        if (u1) unsubs.push(u1)
        const u2 = await tauri?.event?.listen("voice:stop", () => setIsListening(false))
        if (u2) unsubs.push(u2)
        const u3 = await tauri?.event?.listen("voice:processing", (e: any) => setIsProcessing(Boolean(e?.payload)))
        if (u3) unsubs.push(u3)
        const u4 = await tauri?.event?.listen("voice:level", (e: any) => setAudioLevel(Number(e?.payload) || 0.5))
        if (u4) unsubs.push(u4)
      } catch {}
    })()

    return () => {
      unsubs.forEach((u) => u())
    }
  }, [setIsListening, setIsProcessing, setAudioLevel])

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
          // Hide the popup when canceling
          const tauri = (window as any).__TAURI__
          if (tauri?.invoke) {
            tauri.invoke('hide_voice_popup').catch(console.error)
          }
        }}
      />
    </div>
  )
}
