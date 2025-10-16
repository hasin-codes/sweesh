"use client"

import { useState, useEffect, useRef } from "react"
import { Topbar } from "@/components/topbar"
import { TranscriptionCard } from "@/components/transcription-card"
import { TranscriptionModal } from "@/components/transcription-modal"
import { SettingsModal } from "@/components/settings-modal"
import { OnboardingModal } from "@/components/onboarding-modal"
import { FloatingVoiceWidget } from "@/components/floating-voice-widget"
import { AuroraBorder } from "@/components/aurora-border"
import { useToast } from "@/hooks/use-toast"
import { SettingsStore } from "@/lib/settings-store"
import useVoiceStore from "@/lib/voice-store"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"


export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [floatingWindowVisible, setFloatingWindowVisible] = useState(false)
  const [hasCheckedApiKey, setHasCheckedApiKey] = useState(false)
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [selectedTranscription, setSelectedTranscription] = useState<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const { toast } = useToast()

  // Use the synchronized store instead of local state
  const {
    isListening,
    isProcessing,
    audioLevel,
    transcripts,
    setIsListening,
    setIsProcessing,
    setAudioLevel,
    addTranscript,
    updateTranscript,
    deleteTranscript,
  } = useVoiceStore()

  const showVoicePopup = async () => {
    // For web version, show the floating widget directly in the main window
    console.log('Showing voice popup in main window...')
    setFloatingWindowVisible(true)
  }

  const startRecording = async () => {
    if (mediaRecorderRef.current?.state === "recording") return
    
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
      
      try {
        const res = await fetch("/api/transcribe", { method: "POST", body: form })
        
        if (!res.ok) {
          throw new Error(`API request failed with status: ${res.status}`)
        }
        
        const data = await res.json()
        
        if (data.text) {
          await navigator.clipboard.writeText(data.text)
        }
        
        const newTranscript = {
          file: `record_${String(transcripts.length + 1).padStart(3, "0")}.webm`,
          text: data.text || "",
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }
        addTranscript(newTranscript)
        toast({ title: "Transcribed & copied", description: "Text copied to clipboard." })
      } catch (error) {
        console.error("Transcription error:", error)
        toast({ 
          title: "Transcription failed", 
          description: error instanceof Error ? error.message : "Unknown error occurred" 
        })
      } finally {
        setIsProcessing(false)
      }
    }

    mediaRecorder.start(100)
    setIsListening(true)
    
    // Play recording start sound
    const audio = new Audio('/sound/active.mp3')
    audio.volume = 0.7
    audio.play().catch(console.error)
    
    await showVoicePopup()

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
    // Stop all tracks in the media stream to release microphone access
    if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
    setIsListening(false)
    setFloatingWindowVisible(false)
  }

  // Check for API key on app startup
  useEffect(() => {
    const checkApiKey = async () => {
      if (hasCheckedApiKey) return
      
      try {
        const store = SettingsStore.getInstance()
        await store.loadSettings()
        const apiKey = store.getApiKey()
        
        if (!apiKey || apiKey.trim() === "") {
          console.log("No API key found, showing onboarding dialog")
          setIsFirstTimeSetup(true)
          setShowSettings(true)
          setIsOnboardingComplete(false)
        } else {
          console.log("API key found, onboarding complete")
          setIsOnboardingComplete(true)
        }
        
        setHasCheckedApiKey(true)
      } catch (error) {
        console.error("Failed to check API key:", error)
        setHasCheckedApiKey(true)
        setIsOnboardingComplete(false)
      }
    }
    
    checkApiKey()
  }, [hasCheckedApiKey])

  // Debug: Monitor onboarding completion state
  useEffect(() => {
    console.log("Onboarding state changed:", {
      hasCheckedApiKey,
      isOnboardingComplete,
      isFirstTimeSetup,
      showSettings
    })
  }, [hasCheckedApiKey, isOnboardingComplete, isFirstTimeSetup, showSettings])

  // Handle Escape key to stop recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (isListening || isProcessing)) {
        e.preventDefault()
        stopRecording()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
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
    deleteTranscript(id)
    toast({
      title: "Transcript deleted",
      description: "The recording has been removed.",
    })
  }

  const handleUpdateTranscript = (id: number, newText: string) => {
    updateTranscript(id, { text: newText })
  }

  const handleTranscriptionClick = (id: number) => {
    setSelectedTranscription(id)
  }

  const selectedTranscriptionData = selectedTranscription 
    ? transcripts.find(t => t.id === selectedTranscription)
    : null

  const handleCancel = () => {
    setIsListening(false)
    setIsProcessing(false)
  }

  return (
    <div className="relative min-h-screen bg-background">
      <AuroraBorder active={isListening} audioLevel={audioLevel} />
      <Topbar onSettings={() => setShowSettings(true)} onAddRecording={handleAddRecording} />

      <main className="max-w-6xl mx-auto pl-20 pr-6 pt-32 pb-8">
        <SignedIn>
          {isOnboardingComplete ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Your Transcriptions</h2>
                <p className="text-muted-foreground">
                  Click the system tray icon or press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Alt + M</kbd> to show the voice widget and start recording
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {transcripts.map((transcript) => (
                  <TranscriptionCard 
                    key={transcript.id} 
                    {...transcript} 
                    onDelete={handleDeleteTranscript}
                    onClick={handleTranscriptionClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-foreground">Welcome to Sweesh</h1>
                  <p className="text-lg text-muted-foreground">
                    Please complete the setup to start using Sweesh.
                  </p>
                </div>
              </div>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          {/* Onboarding modal will handle the authentication flow */}
        </SignedOut>
      </main>

      {/* Show onboarding modal for unauthenticated users */}
      <SignedOut>
        <OnboardingModal onComplete={() => {
          setShowSettings(false)
          setIsFirstTimeSetup(false)
          setIsOnboardingComplete(true)
        }} />
      </SignedOut>

      {showSettings && isFirstTimeSetup && (
        <OnboardingModal onComplete={() => {
          setShowSettings(false)
          setIsFirstTimeSetup(false)
          setIsOnboardingComplete(true)
        }} />
      )}

      {/* Show onboarding modal for authenticated users who haven't completed setup */}
      <SignedIn>
        {!isOnboardingComplete && hasCheckedApiKey && (
          <OnboardingModal onComplete={() => {
            setShowSettings(false)
            setIsFirstTimeSetup(false)
            setIsOnboardingComplete(true)
          }} />
        )}
      </SignedIn>
      
      {showSettings && !isFirstTimeSetup && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}

      {selectedTranscriptionData && (
        <TranscriptionModal
          isOpen={!!selectedTranscription}
          onClose={() => setSelectedTranscription(null)}
          transcription={selectedTranscriptionData}
          onDelete={handleDeleteTranscript}
          onUpdate={handleUpdateTranscript}
        />
      )}

      <SignedIn>
        {isOnboardingComplete && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${floatingWindowVisible ? 'block' : 'hidden'}`}>
            <div className="pointer-events-auto">
              <FloatingVoiceWidget
                isListening={isListening}
                isProcessing={isProcessing}
                audioLevel={audioLevel}
                onCancel={() => {
                  setIsListening(false)
                  setFloatingWindowVisible(false)
                  stopRecording()
                }}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onShow={() => {
                  console.log('Showing voice popup in main window...')
                  setFloatingWindowVisible(true)
                }}
              />
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  )
}
