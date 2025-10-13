"use client"

import { useEffect, useState } from "react"
import { FloatingVoiceWidget } from "@/components/floating-voice-widget"

export default function FloatingPage() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0.5)

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

    // Simple drag move
    let moving = false
    const down = () => (moving = true)
    const up = () => (moving = false)
    const move = async (e: MouseEvent) => {
      if (!moving) return
      try {
        await tauri?.window?.appWindow?.setPosition({ x: e.screenX, y: e.screenY })
      } catch {}
    }
    document.addEventListener("mousedown", down)
    document.addEventListener("mouseup", up)
    document.addEventListener("mousemove", move)

    return () => {
      unsubs.forEach((u) => u())
      document.removeEventListener("mousedown", down)
      document.removeEventListener("mouseup", up)
      document.removeEventListener("mousemove", move)
    }
  }, [])

  return (
    <FloatingVoiceWidget
      isListening={isListening}
      isProcessing={isProcessing}
      audioLevel={audioLevel}
      onCancel={() => setIsListening(false)}
    />
  )
}


