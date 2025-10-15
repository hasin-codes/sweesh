"use client"

import { Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface TranscriptionCardProps {
  id: number
  file: string
  text: string
  date: string
  onDelete?: (id: number) => void
  onClick?: (id: number) => void
}

export function TranscriptionCard({ id, file, text, date, onDelete, onClick }: TranscriptionCardProps) {
  const { toast } = useToast()

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: "Copied", description: "Transcription copied to clipboard." })
    } catch {
      toast({ title: "Copy failed", description: "Could not copy to clipboard." })
    }
  }

  return (
    <Card
      className="relative overflow-hidden p-0 transition-transform duration-200 cursor-pointer hover:-translate-y-0.5 ring-inset ring-2 ring-black/30 dark:ring-white/20 bg-card"
      onClick={() => onClick?.(id)}
    >
      {/* Gradient header (no top margin, follows rounded corners) */}
      <div
        className="w-full h-24 rounded-t-xl border-b border-border"
        style={{
          backgroundImage: `
            radial-gradient(circle 60px at 10% 40%, rgba(255, 255, 255, 0.16) 0%, transparent 100%),
            radial-gradient(circle 40px at 30% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
            radial-gradient(circle 50px at 50% 30%, rgba(255, 255, 255, 0.14) 0%, transparent 100%),
            radial-gradient(circle 70px at 70% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 100%),
            radial-gradient(circle 30px at 90% 60%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
            linear-gradient(to right, #c40000, #ff4500)
          `,
          backgroundSize: "cover"
        }}
      />

      {/* Bottom content area (same bg as card) */}
      <div className="px-6 py-4 space-y-3">
        <div className="min-w-0">
          <p className="font-medium text-sm text-foreground truncate">{file}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{text}</p>

        {/* Footer: large date label and Copy/Delete actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums">
              {new Date(date).getDate().toString().padStart(2, "0")}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(date).toLocaleString(undefined, { month: "short" })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="default" size="sm" className="h-8 text-xs" onClick={handleCopy}>
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              Copy
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(id)
                }}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
