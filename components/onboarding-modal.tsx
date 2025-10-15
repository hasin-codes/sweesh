"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SettingsStore } from "@/lib/settings-store"
import { SignInButton, SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { Check, User, Key } from "lucide-react"

interface OnboardingModalProps {
  onComplete: () => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const { toast } = useToast()
  const { user, isLoaded } = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Auto-advance to step 2 when user is signed in
  useEffect(() => {
    if (isLoaded && user && currentStep === 1) {
      setCurrentStep(2)
    }
  }, [isLoaded, user, currentStep])

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
      
      // Verify the API key was saved
      const savedApiKey = store.getApiKey()
      console.log("API key saved successfully:", savedApiKey ? "Yes" : "No")
      
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

  const steps = [
    { id: 1, title: "Create Account", icon: User },
    { id: 2, title: "Setup API Key", icon: Key }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-lg mx-4 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Welcome to Sweesh</h1>
          <p className="text-muted-foreground">
            Speak it, see it, send it — instantly.
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id || (step.id === 1 && user)
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'bg-background border-muted-foreground/30 text-muted-foreground'
                  }
                `}>
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-0.5 mx-2 transition-all duration-300
                    ${isCompleted ? 'bg-green-500' : 'bg-muted-foreground/30'}
                  `} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step Labels */}
        <div className="flex justify-center space-x-16">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <p className={`
                text-sm font-medium transition-colors duration-300
                ${currentStep === step.id ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-muted-foreground">
                    Sign up to start recording and managing your voice transcriptions.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <SignUpButton mode="modal">
                  <Button className="w-full py-3 text-base font-medium" size="lg">
                    Create Account
                  </Button>
                </SignUpButton>
                
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full py-3 text-base font-medium" size="lg">
                    Sign In
                  </Button>
                </SignInButton>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Already have an account? Click "Sign In" above.
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Key className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Setup Voice Transcription
                  </h2>
                  <p className="text-muted-foreground">
                    Add your API key to enable voice-to-text functionality.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Get Your Free API Key
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

              <div className="pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading || !apiKey.trim()}
                  className="w-full py-3 text-base font-medium"
                  size="lg"
                >
                  {isLoading ? "Setting up..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
