'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVoiceAgent } from '../contexts/VoiceAgentContext';
import Link from 'next/link';
import { Mic, Ticket, Navigation, Phone, CheckCircle2, ArrowLeft, Settings, Train, MapPin, Target, Calendar, Armchair, CreditCard, CheckCircle } from 'lucide-react';

type ViewMode = 'landing' | 'ticket-booking';
type BookingStep = 'type' | 'origin' | 'destination' | 'date' | 'class' | 'payment' | 'success';

export default function PanduApp() {
  const router = useRouter();
  const { transcript, startAgent, addToTranscript } = useVoiceAgent();
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [bookingStep, setBookingStep] = useState<BookingStep>('type');
  const [showConversation, setShowConversation] = useState(false);

  // Booking data
  const [selectedType, setSelectedType] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  // Auto-scroll transcript
  useEffect(() => {
    const transcriptEl = document.getElementById('transcript');
    if (transcriptEl) {
      transcriptEl.scrollTop = transcriptEl.scrollHeight;
    }
  }, [transcript]);

  // Add custom event listener for navigation
  useEffect(() => {
    interface NavigationEventDetail {
      view?: string;
      path?: string;
    }

    const handleNavigationEvent = (event: CustomEvent<NavigationEventDetail>) => {
      console.log('🎯 Custom navigation event received:', event.detail);
      const { view } = event.detail;
      
      if (view && ['landing', 'ticket-booking'].includes(view)) {
        console.log('🚀 Setting view via custom event:', view);
        setCurrentView(view as ViewMode);
        addToTranscript('System', `📍 Navigasi ke halaman ${view} via custom event`);
      } else if (view === 'navigation') {
        console.log('🚀 Navigating to navigasi page');
        router.push('/pandu-app/navigasi');
      } else if (view === 'help') {
        console.log('🚀 Navigating to help page');
        router.push('/pandu-app/help');
      }
    };
    
    window.addEventListener('navigateToView', handleNavigationEvent as EventListener);
    
    return () => {
      window.removeEventListener('navigateToView', handleNavigationEvent as EventListener);
    };
  }, [addToTranscript, router]);

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden">
          
          {/* LANDING VIEW */}
          {currentView === 'landing' && (
            <div className="flex flex-col h-screen">
              {/* Header */}
                              {/* Header */}
                <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 z-10">
                  <Link href="/" className="text-gray-900">
                    <ArrowLeft className="w-6 h-6" />
                  </Link>
                  <div className="flex items-center gap-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 backdrop-blur-md rounded-full px-3 py-1.5">
                    <span className="text-sm font-medium text-white">Mode Pandu</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <button className="text-gray-900">
                    <Settings className="w-6 h-6" />
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
                      onClick={() => {
                        startAgent();
                        setShowConversation(true);
                      }}
                      className="w-full mx-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Mic className="w-6 h-6" />
                      Mulai KAI Pandu
                    </button>

                    {/* Features */}
                    <div className="w-full mx-6 space-y-2">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </div>
                        <span>Pesan tiket dengan suara</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </div>
                        <span>Panduan navigasi AR</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </div>
                        <span>Bantuan darurat petugas</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Conversation UI */}
                    <div className="w-full flex flex-col">
                      {/* Chatbox */}
                      <div 
                        id="transcript"
                        className="max-h-48 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-2xl mx-4 mb-6"
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
                            <Ticket className="w-10 h-10" />
                          </div>
                        </button>

                        {/* Navigation */}
                        <button
                          onClick={() => {
                            addToTranscript('Anda', 'Navigasi & panduan perjalanan');
                            addToTranscript('KAI Pandu', 'Membuka navigasi AR...');
                            
                            // Navigate to navigasi page
                            router.push('/pandu-app/navigasi');
                          }}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <h3 className="text-lg font-semibold mb-1">Navigasi & Panduan Perjalanan</h3>
                              <p className="text-green-100 text-sm">AR navigation ke peron dan gerbong</p>
                            </div>
                            <Navigation className="w-10 h-10" />
                          </div>
                        </button>

                        {/* Emergency Help */}
                        <button
                          onClick={() => {
                            addToTranscript('Anda', 'Panggil petugas');
                            addToTranscript('KAI Pandu', 'Membuka bantuan darurat...');
                            
                            // Navigate to help page
                            router.push('/pandu-app/help');
                          }}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <Phone className="w-6 h-6" />
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

        </div>
      </div>
    </>
  );
}

// TICKET BOOKING COMPONENT
interface TicketBookingViewProps {
  step: BookingStep;
  onStepChange: (step: BookingStep) => void;
  onBack: () => void;
  addToTranscript: (speaker: string, message: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (value: string) => void;
  selectedDestination: string;
  setSelectedDestination: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
}

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
}: TicketBookingViewProps) {
  const trainTypes = ['Antarkota', 'Commuter Line', 'LRT', 'Whoosh'];
  const stations = ['Gambir', 'Pasar Senen', 'Yogyakarta', 'Bandung', 'Surabaya'];
  const classes = ['Eksekutif', 'Bisnis', 'Ekonomi'];
  const payments = ['KAI Pay', 'Transfer Bank', 'E-Wallet', 'Kartu Kredit'];

  // Get icon for train type
  const getTrainTypeIcon = (trainType: string) => {
    switch (trainType) {
      case 'Antarkota':
        return <Train className="w-6 h-6 text-blue-600" />;
      case 'Commuter Line':
        return <Train className="w-6 h-6 text-green-600" />;
      case 'LRT':
        return <Train className="w-6 h-6 text-purple-600" />;
      case 'Whoosh':
        return <Train className="w-6 h-6 text-orange-600" />;
      default:
        return <Train className="w-6 h-6 text-gray-600" />;
    }
  };

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
      case 'type': return <Train className="w-16 h-16" />;
      case 'origin': return <MapPin className="w-16 h-16" />;
      case 'destination': return <Target className="w-16 h-16" />;
      case 'date': return <Calendar className="w-16 h-16" />;
      case 'class': return <Armchair className="w-16 h-16" />;
      case 'payment': return <CreditCard className="w-16 h-16" />;
      case 'success': return <CheckCircle className="w-16 h-16 text-green-600" />;
      default: return <Ticket className="w-16 h-16" />;
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
          <div className="flex justify-center">
            <CheckCircle className="w-24 h-24 text-green-600 animate-bounce" />
          </div>
          
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
          <div className="flex justify-center mb-4 text-blue-600">
            {getStepIcon()}
          </div>
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
              <div className="flex items-center gap-3">
                {step === 'type' && getTrainTypeIcon(option)}
                <span className="font-medium text-gray-800">{option}</span>
              </div>
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
