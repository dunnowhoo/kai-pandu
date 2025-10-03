'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TiketPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get data from URL params (from voice assistant)
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load data from URL parameters when component mounts
  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    
    if (from) setSelectedOrigin(from);
    if (to) setSelectedDestination(to);
    if (date) setSelectedDate(date);
  }, [searchParams]);

  // Listen for custom events from voice assistant
  useEffect(() => {
    const handleBookingData = (event: any) => {
      console.log('📝 Received booking data:', event.detail);
      const { from, to, date, trainType } = event.detail;
      
      if (from) setSelectedOrigin(from);
      if (to) setSelectedDestination(to);
      if (date) setSelectedDate(date);
    };

    window.addEventListener('updateBookingData', handleBookingData);
    
    return () => {
      window.removeEventListener('updateBookingData', handleBookingData);
    };
  }, []);

  const handleFindSchedule = () => {
    if (selectedOrigin && selectedDestination && selectedDate) {
      setShowResults(true);
      console.log('🔍 Searching for:', { selectedOrigin, selectedDestination, selectedDate });
    } else {
      alert('Mohon lengkapi data keberangkatan, tujuan, dan tanggal');
    }
  };

  const handleSwapStations = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
  };

  // Function to handle ticket booking/purchase
  const handleBookTicket = (trainName: string, trainClass: string, departureTime: string, arrivalTime: string, price: string) => {
    // Generate order code
    const orderCode = 'RVG' + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    // Format date properly
    const formatDate = (dateStr: string) => {
      // If date is already formatted, return as is
      if (dateStr.includes(',')) return dateStr;
      
      // Parse and format the date
      const date = new Date(dateStr);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      return `${days[date.getDay()]} ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const ticketData = {
      orderCode,
      trainName: trainName.toUpperCase(),
      class: trainClass,
      trainNumber: 'No Train 271',
      category: 'intercity',
      departure: {
        time: departureTime,
        station: `${selectedOrigin.toUpperCase()} (${selectedOrigin.substring(0, 3).toUpperCase()})`,
        date: formatDate(selectedDate)
      },
      arrival: {
        time: arrivalTime,
        station: `${selectedDestination.toUpperCase()} (${selectedDestination.substring(0, 3).toUpperCase()})`,
        date: formatDate(selectedDate)
      },
      price,
      purchaseDate: new Date().toISOString()
    };

    // Get existing tickets from localStorage
    const existingTickets = JSON.parse(localStorage.getItem('kai_tickets') || '[]');
    
    // Add new ticket
    existingTickets.push(ticketData);
    
    // Save to localStorage
    localStorage.setItem('kai_tickets', JSON.stringify(existingTickets));
    
    console.log('✅ Ticket saved:', ticketData);
    
    // Show success message
    alert(`Tiket berhasil dipesan!\nOrder Code: ${orderCode}\n\nTiket Anda akan ditampilkan di halaman My Ticket.`);
    
    // Redirect to My Ticket page
    router.push('/my-ticket');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 pt-12 pb-20 px-4 rounded-b-[40px]">
          <div className="flex items-center justify-between mb-6">
            <Link href="/pandu-app" className="w-10 h-10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-lg font-bold text-white">Intercity Train</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 -mt-10 pb-6 overflow-y-auto">
          
          {/* Booking Form Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
            
            {/* Departure Field */}
            <div className="mb-1">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl">
                <div className="text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 block mb-1">Departure</label>
                  <input
                    type="text"
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    placeholder="Pilih stasiun keberangkatan"
                    className="w-full text-gray-900 font-semibold text-base outline-none bg-transparent placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 mx-4"></div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-end -my-3 mb-1 pr-4 relative z-10">
              <button
                onClick={handleSwapStations}
                className="w-12 h-12 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* Destination Field */}
            <div className="mb-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl">
                <div className="text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 block mb-1">Destination</label>
                  <input
                    type="text"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    placeholder="Pilih stasiun tujuan"
                    className="w-full text-gray-900 font-semibold text-base outline-none bg-transparent placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Date Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 block mb-1">Departure Date</label>
                  <input
                    type="text"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="Fri, 10 Oct 2025"
                    className="w-full text-gray-900 font-semibold text-base outline-none bg-transparent placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end ml-4">
                <span className="text-xs text-gray-400 mb-2 whitespace-nowrap">Pulang Pergi?</span>
                <button
                  onClick={() => setIsRoundTrip(!isRoundTrip)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    isRoundTrip ? 'bg-blue-600' : 'bg-gray-300'
                  } relative`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${
                    isRoundTrip ? 'translate-x-7' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Passenger Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 block mb-1">Select Passenger</label>
                <div className="text-gray-900 font-semibold text-base">01 Adult, 00 Infant</div>
              </div>
            </div>
          </div>

          {/* Find Schedule Button */}
          <button
            onClick={handleFindSchedule}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-3xl font-bold text-base shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Find Schedule
          </button>

          {/* Ads Banner - Below button */}
          <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg text-xs text-gray-600 font-medium">
              Ads
            </div>
            <h3 className="text-white text-base font-bold mb-2">Access to Our Exclusive Benefits</h3>
            <p className="text-white/90 text-xs mb-3">
              Nikmati berbagai keuntungan dengan bergabung dalam program loyalty di Access by KAI
            </p>
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎁</div>
              <div className="text-2xl">💎</div>
              <div className="text-2xl">🎉</div>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mt-6 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-base font-bold text-gray-800 mb-4">Jadwal Kereta Tersedia</h3>
              
              {/* Mock Train Results */}
              <div className="space-y-3">
                <button 
                  onClick={() => handleBookTicket('Argo Parahyangan', 'EKSEKUTIF (A)', '08:00', '11:30', 'Rp 200.000')}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 hover:border-blue-400 transition-colors cursor-pointer text-left"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-800">Argo Parahyangan</h4>
                    <span className="text-sm text-green-600 font-semibold">Tersedia</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>08:00 - 11:30</span>
                    <span>3j 30m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Eksekutif</span>
                    <span className="text-base font-bold text-blue-600">Rp 200.000</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleBookTicket('Taksaka', 'EKONOMI (C)', '14:00', '22:00', 'Rp 350.000')}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 hover:border-blue-400 transition-colors cursor-pointer text-left"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-800">Taksaka</h4>
                    <span className="text-sm text-green-600 font-semibold">Tersedia</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>14:00 - 22:00</span>
                    <span>8j 00m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Eksekutif</span>
                    <span className="text-base font-bold text-blue-600">Rp 350.000</span>
                  </div>
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
