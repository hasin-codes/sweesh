"use client"

import Image from "next/image"
import { Plus, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopbarProps {
  onSettings: () => void
  onAddRecording: () => void
}

export function Topbar({ onSettings, onAddRecording }: TopbarProps) {
  return (
    <aside className="fixed left-3 top-1/2 -translate-y-1/2 w-12 bg-background/95 backdrop-blur border border-border rounded-xl shadow-sm z-50">
      <div className="py-2 flex flex-col items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onAddRecording} className="hover:bg-accent w-10 h-10">
          <Plus className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onSettings} className="hover:bg-accent w-10 h-10">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-accent w-10 h-10">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  )
}
