"use client"

interface Settings {
  apiKey: string
  autoSave: boolean
  darkMode: boolean
  saveLocation: string
}

const defaultSettings: Settings = {
  apiKey: "",
  autoSave: false,
  darkMode: false,
  saveLocation: "",
}

export class SettingsStore {
  private static instance: SettingsStore
  private settings: Settings = defaultSettings

  static getInstance(): SettingsStore {
    if (!SettingsStore.instance) {
      SettingsStore.instance = new SettingsStore()
    }
    return SettingsStore.instance
  }

  async loadSettings(): Promise<Settings> {
    try {
      if (typeof window !== "undefined") {
        const savedSettings = localStorage.getItem('sweesh-settings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          this.settings = { ...this.settings, ...parsedSettings }
        }
      }
    } catch (error) {
      console.log("Settings not found, using defaults")
    }
    return this.settings
  }

  async saveSettings(newSettings: Partial<Settings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings }
    
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem('sweesh-settings', JSON.stringify(this.settings))
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  getSettings(): Settings {
    return this.settings
  }

  getApiKey(): string {
    return this.settings.apiKey
  }
}


