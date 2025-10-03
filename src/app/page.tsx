export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-teal-400 relative overflow-hidden shadow-2xl">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-purple-700/30 to-transparent"></div>
      
      {/* Header */}
      <header className="relative z-10 px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm opacity-90">Good Night</p>
            <h1 className="text-white text-xl font-bold">FAUZAN</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="px-4 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-white font-semibold">EN</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-24">
        {/* KAI Pay Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">KAI PAY</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-gray-800">Rp 0</p>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Scan</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Top Up</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">History</span>
              </button>
            </div>
          </div>

          {/* Points Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 bg-orange-50 rounded-2xl px-4 py-3 flex-1 mr-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">R</div>
              <div>
                <span className="text-2xl font-bold text-orange-500">60</span>
                <span className="text-sm text-gray-600 ml-2">Railpoint</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl px-6 py-3 flex items-center gap-2 shadow-md">
              <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
              <span className="text-white font-bold">Premium</span>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Service Icons */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button className="flex flex-col items-center gap-3 min-w-[90px]">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white text-center">Inter City</span>
          </button>
          <button className="flex flex-col items-center gap-3 min-w-[90px]">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white text-center">Local</span>
          </button>
          <button className="flex flex-col items-center gap-3 min-w-[90px]">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white text-center">Commuter Line</span>
          </button>
          <button className="flex flex-col items-center gap-3 min-w-[90px]">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white text-center">LRT</span>
          </button>
          <button className="flex flex-col items-center gap-3 min-w-[90px]">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-white text-center">Airport</span>
          </button>
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-white text-center">Hotel</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-white text-center">Kartu Multi Trip</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-white text-center">KAI Logistics</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-white text-center">Show more</span>
          </button>
        </div>

        {/* Trip Planner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 mb-6 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">TRIP Planner</h3>
              <p className="text-white/80 text-sm">Make the best plans for your trip.</p>
            </div>
          </div>
          <button className="bg-white rounded-2xl px-6 py-3 font-bold text-blue-600 shadow-md">
            CREATE
          </button>
        </div>

        {/* KAI Pandu Feature Banner - NEW */}
        <a href="/pandu-app" className="block mb-6">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌟</span>
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">AKTIFKAN</span>
                </div>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <h3 className="text-white text-2xl font-bold mb-2">Mode KAI Pandu</h3>
              <p className="text-white/90 text-sm mb-4">
                🎤 Voice Assistant • 🗺️ Navigasi AR • 🚨 Bantuan Darurat
              </p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Tap untuk mengaktifkan</p>
                  <p className="text-white/80 text-xs">Asisten perjalanan dengan AI</p>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Info Banner */}
        <a href="/kai-pandu" className="block mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">ℹ️</span>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">Pelajari tentang KAI Pandu</p>
                <p className="text-white/70 text-xs">Fitur aksesibilitas untuk semua</p>
              </div>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>

        {/* Latest Promo */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">Latest Promo</h2>
          <button className="bg-white rounded-full px-6 py-2 font-semibold text-blue-600">
            See All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          <div className="min-w-[280px] bg-gradient-to-r from-gray-800 to-orange-400 rounded-3xl p-6 shadow-xl">
            <h3 className="text-white text-sm mb-2">Promo Spesial</h3>
            <p className="text-white text-3xl font-bold mb-2">50.000</p>
            <p className="text-white/80 text-xs">Dengan menunjukan</p>
          </div>
          <div className="min-w-[280px] bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-gray-800 text-sm mb-2">Kartu Kredit</h3>
            <p className="text-blue-600 text-3xl font-bold mb-2">10%</p>
            <p className="text-gray-600 text-xs">Cashback</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl px-6 py-4 z-50">
        <div className="flex items-center justify-between">
          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-semibold text-blue-600">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
            </svg>
            <span className="text-xs font-medium text-gray-400">Train</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM11 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"/>
            </svg>
            <span className="text-xs font-medium text-gray-400">My Ticket</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
            </svg>
            <span className="text-xs font-medium text-gray-400">Promotion</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="text-xs font-medium text-gray-400">Account</span>
          </button>
        </div>
      </nav>
      </div>
    </div>
  );
}
