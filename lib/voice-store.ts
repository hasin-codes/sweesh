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

let isProcessingUpdate = false;

// PHASE 1: BROADCAST STATE CHANGES
useVoiceStore.subscribe(async (currentState, previousState) => {
  if (typeof window === "undefined") return;

  if (isProcessingUpdate) return;

  if (!isEqual(currentState, previousState)) {
    try {
      const { emit } = await import("@tauri-apps/api/event");
      emit("voice-store-update", currentState);
    } catch (error) {
      console.warn("Failed to emit voice store update:", error);
    }
  }
});

// PHASE 2: LISTEN FOR STATE CHANGES
if (typeof window !== "undefined") {
  (async () => {
    try {
      const { listen } = await import("@tauri-apps/api/event");
      listen("voice-store-update", (event) => {
        const newState = event.payload as VoiceStore; // ✅ typed payload

        if (!isEqual(useVoiceStore.getState(), newState)) {
          console.log("Received voice store update from another window");
          isProcessingUpdate = true;
          useVoiceStore.setState(newState); // ✅ safe cast
          isProcessingUpdate = false;
        }
      });
    } catch (error) {
      console.warn("Failed to set up voice store listener:", error);
    }
  })();
}

// --- PHASE 3: INITIAL STATE HYDRATION --------------------------

let hasHydrated = false;

const initializeStoreSync = async () => {
  if (typeof window === "undefined") return;

  try {
    const { emit, listen } = await import("@tauri-apps/api/event");

    // Request current state from other windows
    await emit("get-voice-store-request");

    // Respond to state requests
    await listen("get-voice-store-request", () => {
      console.log("Received voice store request, responding with current state");
      emit("get-voice-store-response", { state: useVoiceStore.getState() });
    });

    // Hydrate new window with received state
    await listen<{ state: VoiceStore }>("get-voice-store-response", (event) => {
      if (!hasHydrated) {
        console.log("Hydrating voice store with state from another window");
        const newState = event.payload.state;
        isProcessingUpdate = true;
        useVoiceStore.setState(newState);
        isProcessingUpdate = false;
        hasHydrated = true;
      }
    });
  } catch (error) {
    console.warn("Failed to initialize store sync:", error);
  }
};

if (typeof window !== "undefined") {
  initializeStoreSync();
}

export default useVoiceStore;
