"use client"

import { useState, useEffect, useRef } from "react"
import { Topbar } from "@/components/topbar"
import { TranscriptionCard } from "@/components/transcription-card"
import { SettingsModal } from "@/components/settings-modal"
import { FloatingVoiceWidget } from "@/components/floating-voice-widget"
import { useToast } from "@/hooks/use-toast"
import { SettingsStore } from "@/lib/settings-store"

interface Transcript {
  id: number
  file: string
  text: string
  date: string
}

export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0.5)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const { toast } = useToast()

  const [transcripts, setTranscripts] = useState<Transcript[]>([
    {
      id: 1,
      file: "record_001.wav",
      text: "This is a test transcription of the first recording. The voice widget is working perfectly and capturing audio as expected.",
      date: "Oct 13, 2025",
    },
    {
      id: 2,
      file: "record_002.wav",
      text: "Voice widget prototype is working great! The floating UI appears smoothly and the equalizer bars respond to audio levels in real-time.",
      date: "Oct 13, 2025",
    },
    {
      id: 3,
      file: "record_003.wav",
      text: "Testing the dashboard integration with multiple transcription entries to see how the grid layout handles various content lengths.",
      date: "Oct 12, 2025",
    },
  ])

  const ensureFloatingWindow = async () => {
    const tauri = (window as any).__TAURI__
    if (!tauri?.invoke) return
    
    try {
      await tauri.invoke('show_floating_widget')
    } catch (error) {
      console.error('Failed to show floating widget:', error)
    }
  }

  const startRecording = async () => {
    if (mediaRecorderRef.current?.state === "recording") return
    
    const tauri = (window as any).__TAURI__
    if (tauri?.invoke) {
      await tauri.invoke('request_microphone_permission')
    }
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" })
    mediaRecorderRef.current = mediaRecorder
    audioChunksRef.current = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunksRef.current.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
      setIsProcessing(true)
      
      const store = SettingsStore.getInstance()
      const apiKey = store.getApiKey()
      
      if (!apiKey) {
        toast({ title: "API Key Required", description: "Please set your Whisper API key in settings." })
        setIsProcessing(false)
        return
      }
      
      const form = new FormData()
      form.append("file", blob, `record_${Date.now()}.webm`)
      form.append("apiKey", apiKey)
      const res = await fetch("/api/transcribe", { method: "POST", body: form })
      const data = await res.json()
      
      if (data.text) {
        await navigator.clipboard.writeText(data.text)
      }
      
      const newTranscript: Transcript = {
        id: Date.now(),
        file: `record_${String(transcripts.length + 1).padStart(3, "0")}.webm`,
        text: data.text || "",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }
      setTranscripts((prev) => [newTranscript, ...prev])
      toast({ title: "Transcribed & copied", description: "Text copied to clipboard." })
      setIsProcessing(false)
    }

    mediaRecorder.start(100)
    setIsListening(true)
    await ensureFloatingWindow()
    try { (window as any).__TAURI__?.event?.emit("voice:start") } catch {}

    // Setup analyser for audio level visualization
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioContextRef.current = audioContext
    const source = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser
    source.connect(analyser)

    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const updateLevel = () => {
      analyser.getByteTimeDomainData(dataArray)
      let sum = 0
      for (let i = 0; i < dataArray.length; i++) {
        const v = (dataArray[i] - 128) / 128
        sum += v * v
      }
      const rms = Math.sqrt(sum / dataArray.length)
      const level = Math.min(1, Math.max(0.1, rms * 2))
      setAudioLevel(level)
      try { (window as any).__TAURI__?.event?.emit("voice:level", level) } catch {}
      animationFrameRef.current = requestAnimationFrame(updateLevel)
    }
    updateLevel()
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setIsListening(false)
    try { (window as any).__TAURI__?.event?.emit("voice:stop") } catch {}
    ;(async () => {
      try {
        const tauri = (window as any).__TAURI__
        if (tauri?.invoke) {
          await tauri.invoke('hide_floating_widget')
        }
      } catch (error) {
        console.error('Failed to hide floating widget:', error)
      }
    })()
  }

  // Handle Alt + M push-to-talk recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault()
        if (!isListening && !isProcessing) startRecording()
      }
      if (e.key === "Escape" && (isListening || isProcessing)) {
        e.preventDefault()
        stopRecording()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt" && isListening) {
        e.preventDefault()
        stopRecording()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isListening, isProcessing])

  // audioLevel is updated from analyser during recording

  const handleAddRecording = () => {
    toast({
      title: "Start speaking...",
      description: "Press Alt + M to begin recording",
    })
  }

  const handleDeleteTranscript = (id: number) => {
    setTranscripts((prev) => prev.filter((t) => t.id !== id))
    toast({
      title: "Transcript deleted",
      description: "The recording has been removed.",
    })
  }

  const handleCancel = () => {
    setIsListening(false)
    setIsProcessing(false)
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Topbar onSettings={() => setShowSettings(true)} onAddRecording={handleAddRecording} />

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Transcriptions</h2>
          <p className="text-muted-foreground">
            Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Alt + M</kbd> to start a new recording
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {transcripts.map((transcript) => (
            <TranscriptionCard key={transcript.id} {...transcript} onDelete={handleDeleteTranscript} />
          ))}
        </div>
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}
