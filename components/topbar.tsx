"use client"

import { Plus, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopbarProps {
  onSettings: () => void
  onAddRecording: () => void
}

export function Topbar({ onSettings, onAddRecording }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-blue-600" />
          <h1 className="text-xl font-bold text-foreground">Sweesh</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onAddRecording} className="hover:bg-accent">
            <Plus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onSettings} className="hover:bg-accent">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
