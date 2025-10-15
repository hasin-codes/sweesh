"use client"

export function Titlebar() {
  return (
    <div className="titlebar">
      <div className="flex items-center gap-2 px-3">
        <img src="/icons/app-icon.png" alt="Sweesh" width={16} height={16} />
        <span className="text-sm font-medium text-foreground">Sweesh</span>
      </div>
    </div>
  )
}
