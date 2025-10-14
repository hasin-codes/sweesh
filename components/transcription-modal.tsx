"use client"

import { useState } from "react"
import { Copy, Trash2, Edit3, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface TranscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  transcription: {
    id: number
    file: string
    text: string
    date: string
  }
  onDelete: (id: number) => void
  onUpdate: (id: number, newText: string) => void
}

export function TranscriptionModal({
  isOpen,
  onClose,
  transcription,
  onDelete,
  onUpdate,
}: TranscriptionModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(transcription.text)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcription.text)
      toast({ title: "Copied", description: "Transcription copied to clipboard." })
    } catch {
      toast({ title: "Copy failed", description: "Could not copy to clipboard." })
    }
  }

  const handleDelete = () => {
    onDelete(transcription.id)
    onClose()
    toast({ title: "Transcript deleted", description: "The recording has been removed." })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedText(transcription.text)
  }

  const handleSave = () => {
    onUpdate(transcription.id, editedText)
    setIsEditing(false)
    toast({ title: "Saved", description: "Transcription updated successfully." })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedText(transcription.text)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient matching transcription card */}
        <div
          className="w-full h-24 rounded-t-lg border-b border-border"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, rgba(255,99,71,0.75) 0%, rgba(255,140,0,0.65) 35%, rgba(220,38,38,0.6) 70%, transparent 100%), conic-gradient(from 220deg at 60% 40%, rgba(255,140,0,0.35), rgba(255,69,58,0.35), rgba(220,38,38,0.35))",
          }}
        >
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/90 font-medium">{transcription.date}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="default" size="sm" className="h-8 text-xs bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={handleCopy}>
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy
              </Button>
              {!isEditing ? (
                <Button variant="default" size="sm" className="h-8 text-xs bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={handleEdit}>
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                  Edit
                </Button>
              ) : (
                <Button variant="default" size="sm" className="h-8 text-xs bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={handleSave}>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </Button>
              )}
              <Button variant="default" size="sm" className="h-8 text-xs bg-red-500/20 hover:bg-red-500/30 text-white border-red-500/30" onClick={handleDelete}>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-b border-border"></div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full min-h-[200px] p-4 bg-muted/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Edit your transcription..."
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {transcription.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
