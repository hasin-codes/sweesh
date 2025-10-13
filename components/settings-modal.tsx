"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { toast } = useToast()

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
      // Tauri shell deep link to Windows mic settings; no-op on web
      // @ts-ignore
      if (window.__TAURI__?.shell?.open) {
        await window.__TAURI__.shell.open("ms-settings:privacy-microphone")
      } else {
        // Fallback: try to navigate (may be blocked by browser)
        window.location.href = "ms-settings:privacy-microphone"
      }
    } catch (err) {
      toast({ title: "Unable to open settings", description: "Open Settings > Privacy > Microphone manually." })
    }
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
            <Input id="api-key" type="password" placeholder="Enter your Whisper API key" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="save-location">File Save Location</Label>
            <Input id="save-location" type="text" placeholder="Choose local directory" />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Auto Save Audio Files</Label>
              <p className="text-xs text-muted-foreground">Automatically save recordings locally</p>
            </div>
            <Switch id="auto-save" />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Toggle dark theme</p>
            </div>
            <Switch id="dark-mode" />
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
          <Button onClick={onClose}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
