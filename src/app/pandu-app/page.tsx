'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation } from '../components/conversation';
import Link from 'next/link';
import Script from 'next/script';

type ViewMode = 'landing' | 'ticket-booking' | 'navigation' | 'help';
type BookingStep = 'type' | 'origin' | 'destination' | 'date' | 'class' | 'payment' | 'success';
type NavPhase = 'gate' | 'platform' | 'boarding' | 'seat' | 'arrival';

export default function PanduApp() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [bookingStep, setBookingStep] = useState<BookingStep>('type');
  const [navPhase, setNavPhase] = useState<NavPhase>('gate');
  const [showConversation, setShowConversation] = useState(false);
  const [transcript, setTranscript] = useState<Array<{speaker: string, text: string}>>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Booking data
  const [selectedType, setSelectedType] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  // Add to transcript
  const addToTranscript = (speaker: string, message: string) => {
    setTranscript(prev => [...prev, {
      speaker,
      text: message,
    }]);
  };

  // Handle booking data from voice assistant
  const handleBookingData = (data: {
    from?: string;
    to?: string;
    date?: string;
    trainType?: string;
    class?: string;
  }) => {
    console.log('📝 Received booking data from voice:', data);
    
    if (data.from) {
      setSelectedOrigin(data.from);
      console.log('✅ Set origin:', data.from);
    }
    if (data.to) {
      setSelectedDestination(data.to);
      console.log('✅ Set destination:', data.to);
    }
    if (data.date) {
      setSelectedDate(data.date);
      console.log('✅ Set date:', data.date);
    }
    if (data.trainType) {
      setSelectedType(data.trainType);
      console.log('✅ Set train type:', data.trainType);
    }
    if (data.class) {
      setSelectedClass(data.class);
      console.log('✅ Set class:', data.class);
    }
    
    addToTranscript('System', `✅ Data pemesanan telah diperbarui`);
  };

  // Handle navigation from voice commands
  const handleVoiceNavigation = (path: string) => {
    console.log('� HANDLEVOICENAVIGATION CALLED!');
    console.log('�🔄 Voice navigation to:', path);
    console.log('🔍 Current view before:', currentView);
    
    // Force browser alert for debugging
    alert(`🔄 handleVoiceNavigation called with path: ${path}`);
    
    // Map paths to views with more variations
    let newView: ViewMode = currentView;
    
    if (path.includes('ticket') || path.includes('pesan') || path.includes('/ticket')) {
      newView = 'ticket-booking';
      console.log('📍 Matched ticket path');
    } else if (path.includes('navigation') || path.includes('navigasi') || path.includes('/navigation')) {
      newView = 'navigation';
      console.log('📍 Matched navigation path');
    } else if (path.includes('help') || path.includes('bantuan') || path.includes('/help')) {
      newView = 'help';
      console.log('📍 Matched help path');
    } else if (path.includes('home') || path.includes('landing') || path.includes('/landing')) {
      newView = 'landing';
      console.log('📍 Matched landing path');
    } else {
      console.log('⚠️ No path matched, keeping current view');
    }
    
    console.log('🎯 Setting view from', currentView, 'to:', newView);
    setCurrentView(newView);
    
    // Also add to transcript for user feedback
    addToTranscript('System', `📍 Berpindah ke halaman ${newView}`);
    
    console.log('✅ View changed successfully');
    
    // Force alert to confirm
    alert(`✅ View changed to: ${newView}`);
  };

  // Auto-scroll transcript
  useEffect(() => {
    const transcriptEl = document.getElementById('transcript');
    if (transcriptEl) {
      transcriptEl.scrollTop = transcriptEl.scrollHeight;
    }
  }, [transcript]);

  // Add custom event listener for navigation
  useEffect(() => {
    const handleNavigationEvent = (event: any) => {
      console.log('🎯 Custom navigation event received:', event.detail);
      const { view, path } = event.detail;
      
      alert(`🎯 Custom event navigation to view: ${view}`);
      
      if (view && ['landing', 'ticket-booking', 'navigation', 'help'].includes(view)) {
        console.log('🚀 Setting view via custom event:', view);
        setCurrentView(view as ViewMode);
        addToTranscript('System', `📍 Navigasi ke halaman ${view} via custom event`);
      }
    };
    
    window.addEventListener('navigateToView', handleNavigationEvent);
    
    return () => {
      window.removeEventListener('navigateToView', handleNavigationEvent);
    };
  }, []);

  const startPandu = () => {
    setShowConversation(true);
    setIsVoiceActive(true);
    addToTranscript('KAI Pandu', 'Halo, ini KAI Pandu. Mau pesan tiket atau mau dibimbing ke kereta?');
    
    // Show loading indicator for widget initialization
    console.log('🚀 Starting KAI Pandu voice assistant...');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden">
          
          {/* LANDING VIEW */}
          {currentView === 'landing' && (
            <div className="flex flex-col h-screen">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-white border-b">
                <Link href="/" className="text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Mode Pandu</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <button className="text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                
                {!showConversation ? (
                  <>
                    {/* Mascot */}
                    <div className="relative">
                      <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-6xl">🚄</span>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mx-4 shadow-lg">
                      <h2 className="text-xl font-bold text-gray-800 mb-3">Selamat datang di KAI Pandu!</h2>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Asisten suara pintar untuk membantu perjalanan kereta Anda. 
                        Dari pemesanan tiket hingga panduan navigasi di stasiun.
                      </p>
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={startPandu}
                      className="w-full mx-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                      </svg>
                      Mulai KAI Pandu
                    </button>

                    {/* Features */}
                    <div className="w-full mx-6 space-y-2">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Pesan tiket dengan suara</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Panduan navigasi AR</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Bantuan darurat petugas</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Conversation UI */}
                    <div className="w-full flex-1 flex flex-col">
                      {/* Chatbox */}
                      <div 
                        id="transcript"
                        className="flex-1 max-h-48 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-2xl mx-4 mb-6"
                      >
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

                      {/* Menu Tiles */}
                      <div className="px-4 space-y-4">
                        {/* Ticket Booking */}
                        <button
                          onClick={() => {
                            console.log('🎫 Button "Pesan Tiket dengan Suara" clicked');
                            addToTranscript('Anda', 'Pesan tiket dengan suara');
                            addToTranscript('KAI Pandu', 'Membuka halaman pemesanan tiket...');
                            
                            // Navigate to new tiket page
                            router.push('/pandu-app/tiket');
                          }}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <h3 className="text-lg font-semibold mb-1">Pesan Tiket dengan Suara</h3>
                              <p className="text-blue-100 text-sm">Booking mudah dengan voice assistant</p>
                            </div>
                            <div className="text-4xl">🎫</div>
                          </div>
                        </button>

                        {/* Navigation */}
                        <button
                          onClick={() => {
                            setCurrentView('navigation');
                            addToTranscript('Anda', 'Navigasi & panduan perjalanan');
                            addToTranscript('KAI Pandu', 'Saya akan membantu navigasi Anda di stasiun');
                          }}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <h3 className="text-lg font-semibold mb-1">Navigasi & Panduan Perjalanan</h3>
                              <p className="text-green-100 text-sm">AR navigation ke peron dan gerbong</p>
                            </div>
                            <div className="text-4xl">📍</div>
                          </div>
                        </button>

                        {/* Emergency Help */}
                        <button
                          onClick={() => {
                            setCurrentView('help');
                            addToTranscript('Anda', 'Panggil petugas');
                            addToTranscript('KAI Pandu', 'Bantuan sedang dalam perjalanan');
                          }}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-2xl">🚨</span>
                            <span className="text-lg font-semibold">Panggil Petugas</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* TICKET BOOKING VIEW */}
          {currentView === 'ticket-booking' && (
            <TicketBookingView
              step={bookingStep}
              onStepChange={setBookingStep}
              onBack={() => setCurrentView('landing')}
              addToTranscript={addToTranscript}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedOrigin={selectedOrigin}
              setSelectedOrigin={setSelectedOrigin}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          )}

          {/* NAVIGATION VIEW */}
          {currentView === 'navigation' && (
            <NavigationView
              phase={navPhase}
              onPhaseChange={setNavPhase}
              onBack={() => setCurrentView('landing')}
            />
          )}

          {/* HELP VIEW */}
          {currentView === 'help' && (
            <HelpView onBack={() => setCurrentView('landing')} />
          )}

          {/* Floating Voice Assistant (except on landing) */}
          {showConversation && currentView !== 'landing' && (
            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform animate-bounce"
            >
              <span className="text-3xl">🚄</span>
              {/* Active conversation indicator */}
              {showConversation && isVoiceActive && (
                <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping"></div>
              )}
            </button>
          )}

          {/* KAI Pandu Voice Assistant - React SDK */}
          {showConversation && (
            <div className="mt-4 border rounded-lg p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">KAI Pandu - Voice Assistant</h3>
              
              {/* Debug: Manual Test Buttons */}
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">🧪 Test Navigation (Debug):</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      console.log('🧪 Manual test button clicked');
                      console.log('🔍 Current view before:', currentView);
                      setCurrentView('ticket-booking');
                      console.log('🎯 View set to: ticket-booking');
                      addToTranscript('System', '📍 Direct navigation to ticket booking');
                      alert('✅ Direct navigation to ticket booking completed');
                    }}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    Direct Ticket Page
                  </button>
                  <button
                    onClick={() => {
                      console.log('🧪 Navigation test button clicked');
                      console.log('🔍 Current view before:', currentView);
                      setCurrentView('navigation');
                      console.log('🎯 View set to: navigation');
                      addToTranscript('System', '📍 Direct navigation to navigation page');
                      alert('✅ Direct navigation to navigation page completed');
                    }}
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                  >
                    Direct Navigation Page
                  </button>
                  <button
                    onClick={() => {
                      console.log('🧪 Help test button clicked');
                      console.log('🔍 Current view before:', currentView);
                      setCurrentView('help');
                      console.log('🎯 View set to: help');
                      addToTranscript('System', '📍 Direct navigation to help page');
                      alert('✅ Direct navigation to help page completed');
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                  >
                    Direct Help Page
                  </button>
                  <button
                    onClick={() => {
                      console.log('🔍 Current state:');
                      console.log('Current view:', currentView);
                      console.log('Show conversation:', showConversation);
                      console.log('Transcript length:', transcript.length);
                      console.log('handleVoiceNavigation function:', handleVoiceNavigation);
                      alert(`Current view: ${currentView}\nShow conversation: ${showConversation}`);
                    }}
                    className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
                  >
                    Log State
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Current view: <span className="font-mono bg-yellow-100 px-1">{currentView}</span>
                </div>
              </div>
              
              <Conversation 
                onTranscriptUpdate={addToTranscript}
                onNavigate={handleVoiceNavigation}
                autoStart={true}
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// TICKET BOOKING COMPONENT
function TicketBookingView({ 
  step, 
  onStepChange, 
  onBack, 
  addToTranscript,
  selectedType, setSelectedType,
  selectedOrigin, setSelectedOrigin,
  selectedDestination, setSelectedDestination,
  selectedDate, setSelectedDate,
  selectedClass, setSelectedClass,
  selectedPayment, setSelectedPayment
}: any) {
  const trainTypes = ['Antarkota', 'Commuter Line', 'LRT', 'Whoosh'];
  const stations = ['Gambir', 'Pasar Senen', 'Yogyakarta', 'Bandung', 'Surabaya'];
  const classes = ['Eksekutif', 'Bisnis', 'Ekonomi'];
  const payments = ['KAI Pay', 'Transfer Bank', 'E-Wallet', 'Kartu Kredit'];

  const getStepTitle = () => {
    switch (step) {
      case 'type': return 'Jenis Kereta';
      case 'origin': return 'Stasiun Keberangkatan';
      case 'destination': return 'Stasiun Tujuan';
      case 'date': return 'Tanggal Keberangkatan';
      case 'class': return 'Kelas Perjalanan';
      case 'payment': return 'Metode Pembayaran';
      case 'success': return 'Pemesanan Berhasil';
      default: return '';
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 'type': return '🚄';
      case 'origin': return '🏁';
      case 'destination': return '🎯';
      case 'date': return '📅';
      case 'class': return '💺';
      case 'payment': return '💳';
      case 'success': return '✅';
      default: return '🎫';
    }
  };

  const handleSelect = (value: string) => {
    switch (step) {
      case 'type':
        setSelectedType(value);
        addToTranscript('Anda', value);
        addToTranscript('KAI Pandu', 'Dari stasiun mana Anda berangkat?');
        onStepChange('origin');
        break;
      case 'origin':
        setSelectedOrigin(value);
        addToTranscript('Anda', value);
        addToTranscript('KAI Pandu', 'Ke stasiun mana tujuan Anda?');
        onStepChange('destination');
        break;
      case 'destination':
        setSelectedDestination(value);
        addToTranscript('Anda', value);
        addToTranscript('KAI Pandu', 'Tanggal berapa Anda ingin berangkat?');
        onStepChange('date');
        break;
      case 'date':
        setSelectedDate(value);
        addToTranscript('Anda', value);
        if (selectedType !== 'Commuter Line') {
          addToTranscript('KAI Pandu', 'Pilih kelas perjalanan Anda');
          onStepChange('class');
        } else {
          addToTranscript('KAI Pandu', 'Pilih metode pembayaran');
          onStepChange('payment');
        }
        break;
      case 'class':
        setSelectedClass(value);
        addToTranscript('Anda', value);
        addToTranscript('KAI Pandu', 'Pilih metode pembayaran');
        onStepChange('payment');
        break;
      case 'payment':
        setSelectedPayment(value);
        addToTranscript('Anda', value);
        addToTranscript('KAI Pandu', 'Pemesanan tiket berhasil! Tiket sudah dikirim ke email Anda.');
        onStepChange('success');
        break;
    }
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center p-4 bg-white border-b">
          <button onClick={onBack} className="text-green-600 mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-gray-800">Pemesanan Berhasil</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="text-8xl animate-bounce">✅</div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Pemesanan Berhasil!</h2>
            <p className="text-green-600">Tiket Anda sudah dipesan</p>
          </div>

          <div className="w-full bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="font-semibold text-gray-800 border-b pb-2">Detail Pemesanan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Jenis Kereta:</span>
                <span className="font-medium">{selectedType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rute:</span>
                <span className="font-medium">{selectedOrigin} → {selectedDestination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              {selectedClass && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Kelas:</span>
                  <span className="font-medium">{selectedClass}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Pembayaran:</span>
                <span className="font-medium">{selectedPayment}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-2">
                <span>Total:</span>
                <span>Rp 150.000</span>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const getOptions = () => {
    switch (step) {
      case 'type': return trainTypes;
      case 'origin': return stations;
      case 'destination': return stations.filter(s => s !== selectedOrigin);
      case 'class': return classes;
      case 'payment': return payments;
      case 'date': return ['Hari ini', 'Besok', '3 hari lagi', '1 minggu lagi'];
      default: return [];
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={onBack} className="text-blue-600 mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-gray-800">Pesan Tiket</span>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 space-y-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{getStepIcon()}</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{getStepTitle()}</h2>
          <p className="text-gray-600">Pilih salah satu opsi di bawah</p>
        </div>

        <div className="w-full space-y-3">
          {getOptions().map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className="w-full bg-white/20 backdrop-blur-sm border border-gray-200 hover:border-blue-300 hover:bg-white/30 py-4 px-6 rounded-2xl text-left transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium text-gray-800">{option}</span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// NAVIGATION COMPONENT
function NavigationView({ phase, onPhaseChange, onBack }: any) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useState<HTMLVideoElement | null>(null);

  // Start camera when component mounts or facingMode changes
  useEffect(() => {
    let currentStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        // Stop previous stream if exists
        if (currentStream) {
          currentStream.getTracks().forEach(track => track.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode, // Use selected camera
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });

        currentStream = mediaStream;
        setStream(mediaStream);
        setError('');

        // Attach stream to video element
        if (videoRef[0]) {
          videoRef[0].srcObject = mediaStream;
        }
      } catch (err: any) {
        console.error('Error accessing camera:', err);
        setError(err.message || 'Tidak dapat mengakses kamera');
      }
    };

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Update video element when stream changes
  useEffect(() => {
    if (stream && videoRef[0]) {
      videoRef[0].srcObject = stream;
    }
  }, [stream]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const capturePhoto = () => {
    if (videoRef[0]) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef[0].videoWidth;
      canvas.height = videoRef[0].videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef[0], 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `kai-navigation-${Date.now()}.jpg`;
            a.click();
            URL.revokeObjectURL(url);
          }
        }, 'image/jpeg');
      }
    }
  };

  const getPhaseStatus = () => {
    switch (phase) {
      case 'gate': return { icon: '🚪', text: 'Menuju Gate 3', instruction: 'Jalan lurus 30m, belok kiri' };
      case 'platform': return { icon: '🚉', text: 'Gambir – Peron 3', instruction: 'Peron 3 di kanan, 15m' };
      case 'boarding': return { icon: '⏱️', text: 'ETA Kereta 3 menit', instruction: 'Kereta akan tiba, siap-siap' };
      case 'seat': return { icon: '🎫', text: 'Cari Kursi 14A', instruction: 'Gerbong 5, maju 10m' };
      case 'arrival': return { icon: '🏁', text: 'Stasiun Dekat', instruction: 'Yogyakarta 5 menit lagi' };
      default: return { icon: '📍', text: 'Navigasi', instruction: 'Panduan perjalanan' };
    }
  };

  const status = getPhaseStatus();

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4 z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-300">Panduan Perjalanan</p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{status.icon}</span>
              <span className="text-sm font-medium">{status.text}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Camera Switch Button */}
            <button 
              onClick={toggleCamera}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="Switch Camera"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            {/* Close Button */}
            <button 
              onClick={onBack} 
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Camera View (Live Feed) */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        {error ? (
          <div className="text-center text-white">
            <svg className="w-24 h-24 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-400 mb-2">Kamera Error</p>
            <p className="text-xs text-white/70">{error}</p>
          </div>
        ) : !stream ? (
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm">Memuat Kamera...</p>
          </div>
        ) : (
          <video
            ref={(el) => {
              videoRef[0] = el;
              if (el && stream) {
                el.srcObject = stream;
              }
            }}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* AR Overlays */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="text-green-400 text-center animate-pulse">
          <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
          <p className="text-sm font-bold mt-2">30m</p>
        </div>
      </div>

      {/* Detected Objects */}
      <div className="absolute top-20 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Gate 3
      </div>
      <div className="absolute top-32 right-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        15m
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl z-20">
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4"></div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Instruksi Navigasi</h3>
            <p className="text-white/90">{status.instruction}</p>
          </div>

          {phase === 'boarding' && (
            <div className="bg-white/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Kereta Taksaka</span>
                <span className="text-sm">3 menit</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => {/* Repeat audio */}}
              className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
            >
              <div className="text-lg mb-1">🔄</div>
              <div className="text-xs">Ulangi</div>
            </button>
            <button
              onClick={capturePhoto}
              className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
            >
              <div className="text-lg mb-1">📸</div>
              <div className="text-xs">Foto</div>
            </button>
            <button
              onClick={() => {
                const phases: NavPhase[] = ['gate', 'platform', 'boarding', 'seat', 'arrival'];
                const currentIndex = phases.indexOf(phase);
                if (currentIndex < phases.length - 1) {
                  onPhaseChange(phases[currentIndex + 1]);
                }
              }}
              className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
            >
              <div className="text-lg mb-1">➡️</div>
              <div className="text-xs">Next</div>
            </button>
            <button
              onClick={onBack}
              className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
            >
              <div className="text-lg mb-1">🛑</div>
              <div className="text-xs">Stop</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// HELP COMPONENT
function HelpView({ onBack }: any) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={onBack} className="text-red-600 mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-gray-800">Bantuan Darurat</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        {/* Pulsing Emergency Icon */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-red-800">Bantuan Dipanggil</h2>
          <p className="text-red-600">Petugas sedang menuju lokasi Anda</p>
          <p className="text-sm text-gray-600">Tetap di posisi saat ini</p>
        </div>

        {/* Confirmation Card */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">Petugas: Bapak Ahmad Hidayat</p>
              <p className="text-sm text-gray-600">Stasiun Gambir - Dekat Gate 3, Peron 2</p>
            </div>
          </div>
        </div>

        {/* ETA Card */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-3xl font-bold">2</p>
              <p className="text-sm text-blue-100">menit</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">50m</p>
              <p className="text-sm text-blue-100">jarak</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2">
            <span>📞</span>
            <span>Hubungi Petugas</span>
          </button>
          <button
            onClick={onBack}
            className="bg-gray-500 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
