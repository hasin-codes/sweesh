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
      const tauri = (window as any).__TAURI__
      if (tauri?.store) {
        const apiKey = await tauri.store.get("apiKey") || ""
        const autoSave = await tauri.store.get("autoSave") || false
        const darkMode = await tauri.store.get("darkMode") || false
        const saveLocation = await tauri.store.get("saveLocation") || ""
        
        this.settings = { apiKey, autoSave, darkMode, saveLocation }
      }
    } catch (error) {
      console.log("Settings not found, using defaults")
    }
    return this.settings
  }

  async saveSettings(newSettings: Partial<Settings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings }
    
    try {
      const tauri = (window as any).__TAURI__
      if (tauri?.store) {
        for (const [key, value] of Object.entries(newSettings)) {
          await tauri.store.set(key, value)
        }
        await tauri.store.save()
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


