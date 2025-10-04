export default function KaiPandu() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <header className="relative z-10 px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-8">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Hero Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4">
              <span className="text-2xl">🌟</span>
              <span className="text-white font-semibold text-sm">Fitur Baru</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">KAI Pandu</h1>
            <p className="text-white/90 text-lg mb-2">Pendamping Perjalanan Aksesibel</p>
            <p className="text-white/80 text-sm px-6">
              Memberdayakan penumpang tunanetra dengan asisten suara berbasis AI & navigasi pintar
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 pb-32">
          
          {/* Problem Statement */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-4 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/80 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Tantangan</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  ±4 juta penyandang tunanetra di Indonesia (1,5% populasi) menghadapi kendala dalam menggunakan transportasi umum secara mandiri.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-6">
            <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span> Fitur Utama
            </h2>

            {/* Feature 1: Voice Booking */}
            <div className="bg-white rounded-3xl p-6 mb-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-xl font-bold">Pemesanan Tiket Suara</h3>
                  <p className="text-gray-600 text-sm">Pesan tiket tanpa menyentuh layar</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm italic mb-2">
                      &ldquo;Saya ingin pesan tiket dari Gambir ke Yogyakarta tanggal 15 Oktober, ada kereta apa saja?&rdquo;
                    </p>
                    <p className="text-gray-600 text-xs">
                      → Asisten AI memandu Anda langkah demi langkah hingga pembayaran selesai
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Perintah Suara</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Bahasa Alami</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Asisten AI</span>
              </div>
            </div>

            {/* Feature 2: Station Wayfinding */}
            <div className="bg-white rounded-3xl p-6 mb-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-xl font-bold">Navigasi Pintar Stasiun</h3>
                  <p className="text-gray-600 text-sm">Jelajahi stasiun dengan mudah</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 6.5c0 .79-.71 1.5-1.5 1.5-.79 0-1.5-.71-1.5-1.5 0-.79.71-1.5 1.5-1.5.79 0 1.5.71 1.5 1.5zM19.5 9c-1.38 0-2.5 1.12-2.5 2.5V14h-5V5c0-.55-.45-1-1-1s-1 .45-1 1v14H8v-4.5c0-1.38-1.12-2.5-2.5-2.5S3 13.12 3 14.5V20c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4h5v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.5c0-1.38-1.12-2.5-2.5-2.5z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm flex-1">
                    <strong>Computer Vision</strong> mendeteksi papan petunjuk, jalur pemandu, nomor peron
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm flex-1">
                    <strong>Panduan Suara:</strong> &ldquo;Gerbang 20m di depan, belok kanan ke Peron 3&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Deteksi CV</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Audio Real-time</span>
              </div>
            </div>

            {/* Feature 3: Onboard Navigation */}
            <div className="bg-white rounded-3xl p-6 mb-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 text-xl font-bold">Asisten di Kereta</h3>
                  <p className="text-gray-600 text-sm">Temukan tempat duduk & tujuan Anda</p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-3 text-gray-700 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </div>
                  <span>Memandu ke tempat duduk yang benar setelah naik</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </div>
                  <span>Peringatan sebelum tiba di stasiun tujuan</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </div>
                  <span>Tombol bantuan darurat</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Navigasi Kursi</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Peringatan Tiba</span>
              </div>
            </div>
          </div>

          {/* Security Dashboard Integration */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 mb-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-xl font-bold">Dashboard Keamanan</h3>
                <p className="text-white/90 text-sm">Untuk Petugas KAI</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-white text-sm">
                  🎯 <strong>Pelacakan real-time</strong> pengguna KAI Pandu di stasiun
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-white text-sm">
                  🚨 <strong>Peringatan instan</strong> saat pengguna meminta bantuan
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-white text-sm">
                  📊 <strong>Peta kepadatan</strong> untuk panduan rute yang lebih aman
                </p>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
            <h3 className="text-gray-900 text-xl font-bold mb-4 flex items-center gap-2">
              <span>🎯</span> Dampak
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">±4 Juta</div>
                <div className="text-xs text-gray-600">Tunanetra di Indonesia</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-xs text-gray-600">Perjalanan Mandiri</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
              <p className="text-gray-700 text-sm text-center">
                <strong>Akses = Aksesibilitas</strong><br/>
                Mewujudkan perjalanan kereta yang benar-benar inklusif untuk semua
              </p>
            </div>
          </div>

          {/* Benchmark */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 shadow-xl">
            <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <span>🌍</span> Standar Global
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🗽</span>
                <div>
                  <p className="text-white font-semibold text-sm">NaviLens</p>
                  <p className="text-gray-400 text-xs">MTA New York & TransLink Vancouver</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🇮🇩</span>
                <div>
                  <p className="text-white font-semibold text-sm">Face Recognition KAI</p>
                  <p className="text-gray-400 text-xs">Integrasi AI sudah terbukti dalam boarding</p>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* CTA Button */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md p-6 shadow-2xl z-50">
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            <span className="text-lg">Aktifkan KAI Pandu</span>
          </button>
          <p className="text-center text-gray-600 text-xs mt-3">
            Tersedia dalam versi Beta • Perintah suara dalam Bahasa Indonesia
          </p>
        </div>

      </div>
    </div>
  );
}
