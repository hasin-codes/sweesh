import { create } from "zustand";
import isEqual from "lodash/isEqual"; // ✅ Corrected import (with typings)

// --- TYPES -----------------------------------------------------

// Voice widget state interface
interface VoiceState {
  isListening: boolean;
  isProcessing: boolean;
  audioLevel: number;
  transcripts: Array<{
    id: number;
    file: string;
    text: string;
    date: string;
  }>;
}

// Voice widget actions interface
interface VoiceActions {
  setIsListening: (isListening: boolean) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setAudioLevel: (audioLevel: number) => void;
  addTranscript: (transcript: Omit<VoiceState["transcripts"][0], "id">) => void;
  updateTranscript: (
    id: number,
    updates: Partial<VoiceState["transcripts"][0]>
  ) => void;
  deleteTranscript: (id: number) => void;
  setTranscripts: (transcripts: VoiceState["transcripts"]) => void;
}

// Combined store type
type VoiceStore = VoiceState & VoiceActions;

// --- STORE CREATION --------------------------------------------

const useVoiceStore = create<VoiceStore>((set, get) => ({
  // Initial state
  isListening: false,
  isProcessing: false,
  audioLevel: 0.5,
  transcripts: [],

  // Actions
  setIsListening: (isListening) => set({ isListening }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setAudioLevel: (audioLevel) => set({ audioLevel }),

  addTranscript: (transcript) => {
    const newId = Math.max(...get().transcripts.map((t) => t.id), 0) + 1;
    set((state) => ({
      transcripts: [...state.transcripts, { ...transcript, id: newId }],
    }));
  },

  updateTranscript: (id, updates) => {
    set((state) => ({
      transcripts: state.transcripts.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },

  deleteTranscript: (id) => {
    set((state) => ({
      transcripts: state.transcripts.filter((t) => t.id !== id),
    }));
  },

  setTranscripts: (transcripts) => set({ transcripts }),
}));

// --- STATE SYNCHRONIZATION LOGIC -------------------------------

// Simple localStorage-based persistence for web
if (typeof window !== "undefined") {
  // Load state from localStorage on initialization
  const savedState = localStorage.getItem('voice-store');
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      useVoiceStore.setState(parsedState);
    } catch (error) {
      console.warn("Failed to load voice store from localStorage:", error);
    }
  }

  // Save state to localStorage on changes
  useVoiceStore.subscribe((state) => {
    try {
      localStorage.setItem('voice-store', JSON.stringify(state));
    } catch (error) {
      console.warn("Failed to save voice store to localStorage:", error);
    }
  });
}

export default useVoiceStore;
