'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConversationProps {
  onTranscriptUpdate?: (speaker: string, message: string) => void;
  onNavigate?: (path: string) => void;
  autoStart?: boolean;
}

export function Conversation({ onTranscriptUpdate, onNavigate, autoStart = false }: ConversationProps = {}) {
  const router = useRouter();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Client Tools - Fungsi yang bisa dipanggil oleh Agent
  const conversation = useConversation({
    // Client Tools untuk navigasi halaman
    clientTools: {
      // Tool untuk navigasi halaman
      navigateToPage: ({ path }: { path: string }) => {
        console.log('� NAVIGATETEPAGE CALLED! Path:', path);
        console.log('🔍 Current location:', window.location.href);
        console.log('🔍 Router object exists:', !!router);
        
        // Force console to show
        alert(`🔄 Agent requesting navigation to: ${path}`);
        
        // Immediate feedback to user
        let pageName = '';
        let viewName = '';
        
        if (path.includes('ticket')) {
          pageName = 'pemesanan tiket';
          viewName = 'ticket-booking';
        } else if (path.includes('navigation')) {
          pageName = 'navigasi stasiun';
          viewName = 'navigation';
        } else if (path.includes('help')) {
          pageName = 'bantuan';
          viewName = 'help';
        } else {
          pageName = path;
          viewName = 'landing';
        }
        
        console.log('📍 Page name determined:', pageName);
        console.log('📍 View name determined:', viewName);
        
        // Update transcript immediately
        if (onTranscriptUpdate) {
          console.log('📝 Updating transcript...');
          onTranscriptUpdate('System', `✅ Membuka halaman ${pageName}...`);
        } else {
          console.log('⚠️ onTranscriptUpdate not available');
        }
        
        try {
          console.log('🚀 Attempting navigation...');
          
          // Call callback first (this changes the view)
          if (onNavigate) {
            console.log('� Calling onNavigate callback...');
            onNavigate(path);
          } else {
            console.log('⚠️ onNavigate callback not available');
          }
          
          console.log('✅ Navigation completed');
          
        } catch (error) {
          console.error('❌ Navigation error:', error);
          alert(`❌ Navigation error: ${error}`);
        }
        
        return `Halaman ${pageName} berhasil dibuka. Silakan gunakan fitur yang tersedia.`;
      },
      
      // Tool untuk memberikan informasi menu
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

      // Tool untuk meminta akses webcam
      requestWebcamAccess: async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          if (onTranscriptUpdate) {
            onTranscriptUpdate('KAI Pandu', '✅ Akses webcam berhasil diaktifkan.');
          }
          return 'Akses webcam berhasil diaktifkan.';
        } catch (error) {
          if (onTranscriptUpdate) {
            onTranscriptUpdate('KAI Pandu', '❌ Gagal mengaktifkan webcam. Izin diperlukan.');
          }
          return 'Gagal mengaktifkan webcam. Pastikan izin kamera diberikan.';
        }
      },

      // Tool untuk konfirmasi pemesanan
      confirmTicketBooking: ({ from, to, date, passenger }: { 
        from: string; 
        to: string; 
        date: string; 
        passenger: string; 
      }) => {
        const confirmation = `✅ Konfirmasi Pemesanan:
📍 Dari: ${from}
📍 Ke: ${to}  
📅 Tanggal: ${date}
👥 Penumpang: ${passenger} orang

Pemesanan Anda sedang diproses...`;
        
        console.log('🎫 Ticket booking confirmed:', { from, to, date, passenger });
        
        if (onTranscriptUpdate) {
          onTranscriptUpdate('KAI Pandu', confirmation);
        }
        
        return confirmation;
      }
    },

    // Event handlers
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
      
      // Update transcript dengan pesan yang diterima
      if (onTranscriptUpdate && message.message) {
        const speaker = message.source === 'ai' ? 'KAI Pandu' : 'Anda';
        onTranscriptUpdate(speaker, message.message);
      }
    },
    
    onError: (error) => {
      console.error('❌ Conversation error:', error);
      const errorMessage = typeof error === 'string' 
        ? error 
        : (error as any)?.message || 'Terjadi kesalahan pada percakapan';
      setError(errorMessage);
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  });

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsPermissionGranted(true);
      setError(null);
      return true;
    } catch (error) {
      console.error('❌ Microphone permission denied:', error);
      setError('Izin mikrofon diperlukan untuk menggunakan KAI Pandu');
      setIsPermissionGranted(false);
      return false;
    }
  }, []);

  // Start conversation
  const startConversation = useCallback(async () => {
    try {
      setError(null);
      
      // Request microphone permission first
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }

      console.log('🎤 Starting conversation with agent...');
      
      // Start session with agent
      const sessionId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
        connectionType: 'webrtc', // Better for real-time voice
      });

      setConversationId(sessionId);
      console.log('✅ Conversation started with ID:', sessionId);
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'KAI Pandu siap membantu Anda');
      }

    } catch (error: any) {
      console.error('❌ Failed to start conversation:', error);
      setError(error.message || 'Gagal memulai percakapan');
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Gagal terhubung ke KAI Pandu. Silakan coba lagi.');
      }
    }
  }, [conversation, requestMicrophonePermission, onTranscriptUpdate]);

  // Stop conversation
  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setConversationId(null);
      console.log('🛑 Conversation ended');
      
      if (onTranscriptUpdate) {
        onTranscriptUpdate('System', 'Percakapan dengan KAI Pandu dihentikan');
      }
    } catch (error: any) {
      console.error('❌ Failed to stop conversation:', error);
      setError(error.message || 'Gagal menghentikan percakapan');
    }
  }, [conversation, onTranscriptUpdate]);

  // Auto-start conversation if requested
  useEffect(() => {
    if (autoStart && !conversationId && !error) {
      const timer = setTimeout(() => {
        startConversation();
      }, 1000); // Delay 1 detik untuk auto-start
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, conversationId, error, startConversation]);

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
                : 'bg-green-600 text-white hover:bg-green-700'
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
