"use client"

import { useEffect } from "react"

export function Titlebar() {
  useEffect(() => {
    // Import Tauri window API dynamically
    const setupTitlebar = async () => {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window')
        const appWindow = getCurrentWindow()

        // Set up titlebar button event listeners
        const minimizeBtn = document.getElementById('titlebar-minimize')
        const maximizeBtn = document.getElementById('titlebar-maximize')
        const closeBtn = document.getElementById('titlebar-close')

        minimizeBtn?.addEventListener('click', () => appWindow.minimize())
        maximizeBtn?.addEventListener('click', () => appWindow.toggleMaximize())
        closeBtn?.addEventListener('click', () => appWindow.close())
      } catch (error) {
        console.warn('Tauri API not available:', error)
      }
    }

    setupTitlebar()
  }, [])

  return (
    <div className="titlebar">
      <div data-tauri-drag-region className="flex items-center gap-2 px-3">
        <img src="/icons/app-icon.png" alt="Sweesh" width={16} height={16} />
        <span className="text-sm font-medium text-foreground">Sweesh</span>
      </div>
      <div className="controls">
        <button id="titlebar-minimize" title="minimize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 13H5v-2h14z" />
          </svg>
        </button>
        <button id="titlebar-maximize" title="maximize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 4h16v16H4zm2 4v10h12V8z" />
          </svg>
        </button>
        <button id="titlebar-close" title="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
