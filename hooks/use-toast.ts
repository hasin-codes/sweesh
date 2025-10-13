"use client"

import { useCallback } from "react"

type ToastOptions = {
  title?: string
  description?: string
}

export function useToast() {
  const toast = useCallback((options: ToastOptions) => {
    const { title, description } = options || {}
    // Fallback toast: log to console so calls are non-fatal in absence of a UI toaster
    if (title || description) {
      console.log("[toast]", title ?? "", description ?? "")
    } else {
      console.log("[toast]")
    }
  }, [])

  return { toast }
}

export type { ToastOptions }


