"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SettingsStore } from "@/lib/settings-store"

interface OnboardingModalProps {
  onComplete: () => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({ 
        title: "API Key Required", 
        description: "Please enter your Whisper API key to continue." 
      })
      return
    }

    setIsLoading(true)
    try {
      const store = SettingsStore.getInstance()
      await store.saveSettings({ apiKey: apiKey.trim() })
      
      toast({ 
        title: "Welcome to Sweesh! 🎤", 
        description: "Your API key has been saved. You're ready to start recording!" 
      })
      
      onComplete()
    } catch (error) {
      console.error("Failed to save API key:", error)
      toast({ 
        title: "Error", 
        description: "Failed to save your API key. Please try again." 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSave()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
            🎤
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to Sweesh</h1>
          <p className="text-muted-foreground">
            Your personal voice transcription assistant
          </p>
        </div>

        {/* API Key Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Get Started with Voice Transcription
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              To enable voice transcription, you'll need a free Whisper API key from Groq.
            </p>
            <a 
              href="https://console.groq.com/keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
            >
              Get your free API key here →
            </a>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-base font-medium">
              Whisper API Key
            </Label>
            <Input 
              id="api-key" 
              type="password" 
              placeholder="Enter your API key (starts with gsk_)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="text-base py-3"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely and only used for transcription
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !apiKey.trim()}
            className="w-full py-3 text-base font-medium"
            size="lg"
          >
            {isLoading ? "Setting up..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  )
}
