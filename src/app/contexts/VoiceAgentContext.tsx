'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Conversation } from '../components/conversation';

interface VoiceAgentContextType {
  isActive: boolean;
  showWidget: boolean;
  transcript: Array<{speaker: string, text: string}>;
  startAgent: () => void;
  stopAgent: () => void;
  toggleWidget: () => void;
  addToTranscript: (speaker: string, message: string) => void;
}

const VoiceAgentContext = createContext<VoiceAgentContextType | undefined>(undefined);

export function VoiceAgentProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [transcript, setTranscript] = useState<Array<{speaker: string, text: string}>>([]);
  const [shouldStartConversation, setShouldStartConversation] = useState(false);

  const addToTranscript = useCallback((speaker: string, message: string) => {
    setTranscript(prev => [...prev, { speaker, text: message }]);
  }, []);

  const startAgent = useCallback(() => {
    setIsActive(true);
    setShowWidget(true);
    setShouldStartConversation(false);
    addToTranscript('KAI Pandu', 'Klik tombol "Mulai KAI Pandu" untuk memulai percakapan suara.');
  }, [addToTranscript]);

  const stopAgent = useCallback(() => {
    setIsActive(false);
    setShowWidget(false);
    setShouldStartConversation(false);
    setTranscript([]);
  }, []);

  const toggleWidget = useCallback(() => {
    setShowWidget(prev => !prev);
  }, []);

  return (
    <VoiceAgentContext.Provider 
      value={{ 
        isActive, 
        showWidget, 
        transcript, 
        startAgent, 
        stopAgent, 
        toggleWidget,
        addToTranscript 
      }}
    >
      {children}
      
      {/* Global Voice Agent Widget - Always rendered when active */}
      {isActive && (
        <>
          {/* Floating Widget */}
          <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            showWidget ? 'translate-y-0' : 'translate-y-[calc(100%+100px)]'
          }`}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-96">
              {/* Widget Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚄</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">KAI Pandu</h3>
                    <p className="text-xs text-purple-100">Voice Assistant</p>
                  </div>
                </div>
                <button 
                  onClick={toggleWidget}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Transcript */}
              <div className="max-h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {transcript.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.speaker === 'KAI Pandu' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.speaker === 'KAI Pandu' 
                        ? 'bg-white text-gray-800 border border-gray-200' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conversation Component */}
              <div className="p-4 border-t">
                <Conversation 
                  onTranscriptUpdate={addToTranscript}
                  autoStart={shouldStartConversation}
                />
              </div>

              {/* Close Button */}
              <div className="p-3 border-t bg-gray-50 rounded-b-2xl">
                <button
                  onClick={stopAgent}
                  className="w-full py-2 px-4 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                >
                  Tutup KAI Pandu
                </button>
              </div>
            </div>
          </div>

          {/* Floating Button - Always visible */}
          <button
            onClick={toggleWidget}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform"
          >
            <span className="text-3xl">🚄</span>
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping"></div>
            )}
          </button>
        </>
      )}
    </VoiceAgentContext.Provider>
  );
}

export function useVoiceAgent() {
  const context = useContext(VoiceAgentContext);
  if (context === undefined) {
    throw new Error('useVoiceAgent must be used within a VoiceAgentProvider');
  }
  return context;
}
