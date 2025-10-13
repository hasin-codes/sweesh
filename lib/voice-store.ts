import { create } from "zustand";
import { isEqual } from "lodash-es";

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
  addTranscript: (transcript: Omit<VoiceState['transcripts'][0], 'id'>) => void;
  updateTranscript: (id: number, updates: Partial<VoiceState['transcripts'][0]>) => void;
  deleteTranscript: (id: number) => void;
  setTranscripts: (transcripts: VoiceState['transcripts']) => void;
}

// Combined store type
type VoiceStore = VoiceState & VoiceActions;

// Create the Zustand store
const useVoiceStore = create<VoiceStore>((set, get) => ({
  // Initial state
  isListening: false,
  isProcessing: false,
  audioLevel: 0.5,
  transcripts: [
    {
      id: 1,
      file: "record_001.wav",
      text: "This is a test transcription of the first recording. The voice widget is working perfectly and capturing audio as expected.",
      date: "Oct 13, 2025",
    },
    {
      id: 2,
      file: "record_002.wav",
      text: "Voice widget prototype is working great! The floating UI appears smoothly and the equalizer bars respond to audio levels in real-time.",
      date: "Oct 13, 2025",
    },
    {
      id: 3,
      file: "record_003.wav",
      text: "Testing the dashboard integration with multiple transcription entries to see how the grid layout handles various content lengths.",
      date: "Oct 12, 2025",
    },
  ],

  // Actions
  setIsListening: (isListening) => set({ isListening }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setAudioLevel: (audioLevel) => set({ audioLevel }),
  addTranscript: (transcript) => {
    const newId = Math.max(...get().transcripts.map(t => t.id), 0) + 1;
    set(state => ({
      transcripts: [...state.transcripts, { ...transcript, id: newId }]
    }));
  },
  updateTranscript: (id, updates) => {
    set(state => ({
      transcripts: state.transcripts.map(t => 
        t.id === id ? { ...t, ...updates } : t
      )
    }));
  },
  deleteTranscript: (id) => {
    set(state => ({
      transcripts: state.transcripts.filter(t => t.id !== id)
    }));
  },
  setTranscripts: (transcripts) => set({ transcripts }),
}));

// --- STATE SYNCHRONIZATION LOGIC ---

/**
 * This flag prevents an infinite loop of updates. When a window receives an
 * update from another window, it sets this flag to `true` before applying
 * the new state. This ensures that the `subscribe` function below doesn't
 * immediately re-broadcast the same state change it just received.
 */
let isProcessingUpdate = false;

/**
 * PHASE 1: BROADCASTING STATE CHANGES
 *
 * This function runs every time the state in the current window changes.
 * It sends the new state to all other windows.
 */
useVoiceStore.subscribe(async (currentState, previousState) => {
  // Only broadcast in browser environment
  if (typeof window === 'undefined') {
    return;
  }

  console.log("Voice store state updated, broadcasting to other windows");
  if (isProcessingUpdate) {
    return;
  }

  // We use `isEqual` for a deep comparison to avoid unnecessary updates
  // for objects and arrays, which might otherwise trigger a change even
  // if their contents are identical.
  if (!isEqual(currentState, previousState)) {
    try {
      const { emit } = await import("@tauri-apps/api/event");
      emit("voice-store-update", currentState);
    } catch (error) {
      console.warn("Failed to emit voice store update:", error);
    }
  }
});

/**
 * PHASE 2: LISTENING FOR STATE CHANGES
 *
 * This listener runs whenever another window broadcasts a 'voice-store-update' event.
 * It receives the new state and updates the current window's store.
 */
if (typeof window !== 'undefined') {
  (async () => {
    try {
      const { listen } = await import("@tauri-apps/api/event");
      listen("voice-store-update", (event) => {
        const newState = event.payload;

        if (!isEqual(useVoiceStore.getState(), newState)) {
          console.log("Received voice store update from another window");
          isProcessingUpdate = true;
          // Here we could do deep merging,
          // but for the sake of simplicity,
          // we just replace the state
          useVoiceStore.setState(newState);
          isProcessingUpdate = false;
        }
      });
    } catch (error) {
      console.warn("Failed to set up voice store listener:", error);
    }
  })();
}

/**
 * PHASE 3: INITIAL STATE HYDRATION FOR NEW WINDOWS
 *
 * This logic ensures that when a new window opens, it gets the most
 * up-to-date state from an existing window.
 */

// A flag to ensure we only hydrate the state once on initial load.
let hasHydrated = false;

// Initialize event listeners when the store is first imported
const initializeStoreSync = async () => {
  // Only initialize in browser environment
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const { emit, listen } = await import("@tauri-apps/api/event");
    
    // When a new window opens, it immediately requests the current state.
    await emit("get-voice-store-request");

    // Existing windows will listen for this request and respond with their current state.
    await listen("get-voice-store-request", () => {
      console.log("Received voice store request, responding with current state");
      emit("get-voice-store-response", {
        state: useVoiceStore.getState(),
      });
    });

    // The new window listens for the response and hydrates its own state.
    await listen("get-voice-store-response", (event) => {
      if (!hasHydrated) {
        console.log("Hydrating voice store with state from another window");
        const newState = event.payload.state;

        // We set the processing flag here as well to prevent the `subscribe`
        // function from immediately broadcasting this initial state.
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

// Initialize the store sync only in browser
if (typeof window !== 'undefined') {
  initializeStoreSync();
}

export default useVoiceStore;
