// Test file to verify store synchronization
import useVoiceStore from './voice-store';

// Test function to verify store is working
export const testStoreSync = () => {
  console.log('Testing store synchronization...');
  
  // Get initial state
  const initialState = useVoiceStore.getState();
  console.log('Initial state:', initialState);
  
  // Test updating state
  useVoiceStore.getState().setIsListening(true);
  console.log('After setting isListening to true:', useVoiceStore.getState());
  
  // Test adding a transcript
  useVoiceStore.getState().addTranscript({
    file: 'test.wav',
    text: 'This is a test transcript',
    date: new Date().toLocaleDateString()
  });
  console.log('After adding transcript:', useVoiceStore.getState());
  
  // Test updating audio level
  useVoiceStore.getState().setAudioLevel(0.8);
  console.log('After setting audio level:', useVoiceStore.getState());
  
  console.log('Store sync test completed');
};

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testStoreSync = testStoreSync;
}
