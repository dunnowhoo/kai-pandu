'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConversationProps {
  onTranscriptUpdate?: (speaker: string, message: string) => void;
  autoStart?: boolean;
}

export function Conversation({ onTranscriptUpdate, autoStart = false }: ConversationProps = {}) {
  const router = useRouter();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    clientTools: {
      navigateToPage: ({ path }: { path: string }) => {
        let pageName = '';
        let targetUrl = '';
        
        if (path.includes('ticket') || path === 'ticket') {
          pageName = 'pemesanan tiket';
          targetUrl = '/pandu-app/tiket';
        } else if (path.includes('navigation') || path === 'navigation') {
          pageName = 'navigasi stasiun';
          targetUrl = '/pandu-app/navigasi';
        } else if (path.includes('help') || path === 'help') {
          pageName = 'bantuan';
          targetUrl = '/pandu-app/bantuan';
        } else {
          pageName = 'beranda';
          targetUrl = '/pandu-app';
        }
        
        console.log('📍 Target URL:', targetUrl);
        
        if (onTranscriptUpdate) {
          onTranscriptUpdate('System', `✅ Membuka halaman ${pageName}...`);
        }
        
        try {
          router.push(targetUrl);
          console.log('✅ Navigation completed to:', targetUrl);
        } catch (error) {
          console.error('❌ Navigation error:', error);
        }
        
        return `Halaman ${pageName} berhasil dibuka. Silakan gunakan fitur yang tersedia.`;
      },
      
      showMenuOptions: () => {
        const menuInfo = `Menu KAI Pandu:
1. 🎫 Pesan Tiket - untuk pemesanan tiket kereta api
2. 🧭 Navigasi Stasiun - bantuan arah di dalam stasiun  
3. ❓ Bantuan - informasi dan dukungan umum
4. 📷 Akses Webcam - aktifkan kamera untuk fitur tambahan

Silakan pilih menu yang Anda inginkan.`;

        if (onTranscriptUpdate) {
          onTranscriptUpdate('KAI Pandu', menuInfo);
        }
        return menuInfo;
      },

      requestWebcamAccess: async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          console.log('✅ Webcam stream:', stream);
          if (onTranscriptUpdate) {
            onTranscriptUpdate('KAI Pandu', '✅ Akses webcam berhasil diaktifkan.');
          }
          return 'Akses webcam berhasil diaktifkan.';
        } catch (error) {
          console.error('❌ Webcam error:', error);
          if (onTranscriptUpdate) {
            onTranscriptUpdate('KAI Pandu', '❌ Gagal mengaktifkan webcam. Izin diperlukan.');
          }
          return 'Gagal mengaktifkan webcam. Pastikan izin kamera diberikan.';
        }
      },

      submitTicketSearch: ({ from, to, date }: { 
        from: string; 
        to: string; 
        date: string; 
      }) => {
        const confirmation = `✅ Memproses pencarian tiket:
📍 Dari: ${from}
📍 Ke: ${to}  
📅 Tanggal: ${date}

Mencari jadwal kereta untuk Anda...`;
        
        console.log('🔍 Submitting ticket search:', { from, to, date });
        
        // Dispatch event to fill form and trigger search
        const searchData = { from, to, date };
        
        const event = new CustomEvent('submitTicketSearch', { 
          detail: searchData 
        });
        window.dispatchEvent(event);
        
        if (onTranscriptUpdate) {
          onTranscriptUpdate('KAI Pandu', confirmation);
        }
        
        return confirmation;
      }
    },

    onConnect: () => {
      console.log('✅ Connected to ElevenLabs agent');
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Terhubung ke KAI Pandu');
      }
    },
    
    onDisconnect: () => {
      console.log('❌ Disconnected from ElevenLabs agent');
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Terputus dari KAI Pandu');
      }
      setConversationId(null);
    },
    
    onMessage: (message) => {
      console.log('💬 Message received:', message);
      
      if (message.message && typeof message.message === 'string') {
        const msg = message.message;
        
        if (msg.includes('navigateToPage') && msg.includes('print(')) {
          console.warn('⚠️ Agent returned Python code instead of calling function!');
          
          let path = '';
          if (msg.includes("path='ticket'") || msg.includes('path="ticket"')) {
            path = 'ticket';
          } else if (msg.includes("path='navigation'") || msg.includes('path="navigation"')) {
            path = 'navigation';
          } else if (msg.includes("path='help'") || msg.includes('path="help"')) {
            path = 'help';
          }
          
          if (path) {
            console.log('🔧 Fallback: Manually calling navigateToPage with path:', path);
            
            let targetUrl = '';
            let pageName = '';
            
            if (path === 'ticket') {
              targetUrl = '/pandu-app/tiket';
              pageName = 'pemesanan tiket';
            } else if (path === 'navigation') {
              targetUrl = '/pandu-app/navigasi';
              pageName = 'navigasi stasiun';
            } else if (path === 'help') {
              targetUrl = '/pandu-app/help';
              pageName = 'bantuan';
            }
            
            if (targetUrl) {
              if (onTranscriptUpdate) {
                onTranscriptUpdate('System', `✅ Membuka halaman ${pageName}...`);
              }
              router.push(targetUrl);
            }
            return;
          }
        }
      }
      
      if (onTranscriptUpdate && message.message) {
        const speaker = message.source === 'ai' ? 'KAI Pandu' : 'Anda';
        onTranscriptUpdate(speaker, message.message);
      }
    },
    
    onError: (error) => {
      console.error('❌ Conversation error:', error);
      const errorMessage = typeof error === 'string' 
        ? error 
        : (error as Error)?.message || 'Terjadi kesalahan pada percakapan';
      setError(errorMessage);
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  });

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setIsPermissionGranted(true);
      setError(null);
      console.log('✅ Media stream granted:', stream);
      return true;
    } catch (error) {
      console.error('❌ Media permission denied:', error);
      setError('Izin mikrofon dan kamera diperlukan untuk menggunakan KAI Pandu');
      setIsPermissionGranted(false);
      return false;
    }
  }, []);

  const startConversation = useCallback(async () => {
    try {
      setError(null);
      
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }

      console.log('🎤 Starting conversation with agent...');
      
      const sessionId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
        connectionType: 'webrtc', 
      });

      setConversationId(sessionId);
      console.log('✅ Conversation started with ID:', sessionId);
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'KAI Pandu siap membantu Anda');
      }

    } catch (error) {
      console.error('❌ Failed to start conversation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Gagal memulai percakapan';
      setError(errorMessage);
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Gagal terhubung ke KAI Pandu. Silakan coba lagi.');
      }
    }
  }, [conversation, requestMicrophonePermission, onTranscriptUpdate]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setConversationId(null);
      console.log('🛑 Conversation ended');
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Percakapan dengan KAI Pandu dihentikan');
      }
    } catch (error) {
      console.error('❌ Failed to stop conversation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Gagal menghentikan percakapan';
      setError(errorMessage);
    }
  }, [conversation, onTranscriptUpdate]);

  useEffect(() => {
    if (autoStart && !conversationId && !error && isPermissionGranted) {
      console.log('🚀 Auto-starting conversation...');
      const timer = setTimeout(() => {
        startConversation();
      }, 500); 
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, conversationId, error, isPermissionGranted, startConversation]);

  return (
    <div className="space-y-4">
      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
            <span>⚠️</span>
            Error
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Permission Request */}
      {!isPermissionGranted && !error && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-2">
            <span>🎤</span>
            Izin Mikrofon Diperlukan
          </div>
          <p className="text-blue-600 text-sm mb-3">
            KAI Pandu memerlukan akses mikrofon untuk percakapan suara. Klik tombol di bawah untuk memberikan izin.
          </p>
          <button 
            onClick={requestMicrophonePermission}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Berikan Izin Mikrofon
          </button>
        </div>
      )}

      {/* Conversation Controls */}
      {isPermissionGranted && (
        <div className="flex gap-3 justify-center">
          <button
            onClick={startConversation}
            disabled={conversation.status === 'connected'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              conversation.status === 'connected'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
            }`}
          >
            {conversation.status === 'connected' ? 'Terhubung' : 'Mulai KAI Pandu'}
          </button>
          
          <button
            onClick={stopConversation}
            disabled={conversation.status !== 'connected'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              conversation.status !== 'connected'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            Hentikan
          </button>
        </div>
      )}

      {/* Status Display */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            conversation.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <span className="text-sm text-gray-600">
            Status: {conversation.status === 'connected' ? 'Terhubung' : 'Terputus'}
          </span>
        </div>
        
        {conversation.status === 'connected' && (
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              conversation.isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className="text-xs text-gray-500">
              KAI Pandu {conversation.isSpeaking ? 'sedang berbicara' : 'sedang mendengarkan'}
            </span>
          </div>
        )}

        {conversationId && (
          <div className="text-xs text-gray-400">
            Session ID: {conversationId.slice(0, 8)}...
          </div>
        )}
      </div>
    </div>
  );
}
