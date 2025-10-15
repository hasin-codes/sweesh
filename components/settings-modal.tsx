"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { SettingsStore } from "@/lib/settings-store"

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [autoSave, setAutoSave] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [saveLocation, setSaveLocation] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      const store = SettingsStore.getInstance()
      const settings = await store.loadSettings()
      setApiKey(settings.apiKey)
      setAutoSave(settings.autoSave)
      setDarkMode(settings.darkMode)
      setSaveLocation(settings.saveLocation)
      setLoading(false)
    }
    loadSettings()
  }, [])

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      // Best-effort readback of state
      try {
        // @ts-ignore not all browsers implement permissions API fully
        const status = await navigator.permissions?.query?.({ name: "microphone" as any })
        toast({ title: "Microphone", description: `State: ${status?.state || "granted"}` })
      } catch {
        toast({ title: "Microphone enabled", description: "Permission granted." })
      }
    } catch (e: any) {
      toast({ title: "Permission blocked", description: "Open OS settings to allow microphone." })
    }
  }

  const openOsMicSettings = async () => {
    try {
      // Try to navigate to Windows mic settings (may be blocked by browser)
      window.location.href = "ms-settings:privacy-microphone"
    } catch (err) {
      toast({ title: "Unable to open settings", description: "Open Settings > Privacy > Microphone manually." })
    }
  }

  const handleSave = async () => {
    const store = SettingsStore.getInstance()
    await store.saveSettings({
      apiKey,
      autoSave,
      darkMode,
      saveLocation,
    })
    toast({ title: "Settings saved", description: "Your preferences have been saved." })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Whisper API Key</Label>
            <Input 
              id="api-key" 
              type="password" 
              placeholder="Enter your Whisper API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="save-location">File Save Location</Label>
            <Input 
              id="save-location" 
              type="text" 
              placeholder="Choose local directory"
              value={saveLocation}
              onChange={(e) => setSaveLocation(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Auto Save Audio Files</Label>
              <p className="text-xs text-muted-foreground">Automatically save recordings locally</p>
            </div>
            <Switch 
              id="auto-save" 
              checked={autoSave}
              onCheckedChange={setAutoSave}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Toggle dark theme</p>
            </div>
            <Switch 
              id="dark-mode" 
              checked={darkMode}
              onCheckedChange={setDarkMode}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2 pt-2">
            <Button onClick={requestMicPermission}>Request microphone permission</Button>
            <Button variant="outline" onClick={openOsMicSettings}>Open OS microphone settings</Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
