'use client';

import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-red-500 to-orange-600 px-4 py-6 rounded-b-[40px]">
          <div className="flex items-center justify-between mb-4">
            <Link href="/pandu-app" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-white">Bantuan Darurat</h1>
            <div className="w-6"></div>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6 py-8 space-y-6">
          
          {/* Emergency Icon with Pulse Animation */}
          <div className="flex justify-center items-center py-8">
            <div className="relative">
              <div className="w-40 h-40 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
                <Phone className="w-20 h-20 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping"></div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-red-800 mb-2">Bantuan Dipanggil</h2>
              <p className="text-red-600 text-base mb-1">Petugas sedang menuju lokasi Anda</p>
              <p className="text-sm text-gray-600">Tetap di posisi saat ini</p>
            </div>

            {/* Petugas Info */}
            <div className="bg-green-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-base">Petugas: Bapak Ahmad Hidayat</p>
                  <p className="text-sm text-gray-600">Stasiun Gambir - Dekat Gate 3, Peron 2</p>
                </div>
              </div>
            </div>

            {/* ETA Card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <p className="text-5xl font-bold">2</p>
                  <p className="text-sm text-blue-100 mt-1">menit</p>
                </div>
                <div className="w-px h-16 bg-white/30"></div>
                <div className="text-center">
                  <p className="text-4xl font-bold">50m</p>
                  <p className="text-sm text-blue-100 mt-1">jarak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Hubungi Petugas</span>
            </button>
            <Link 
              href="/pandu-app"
              className="bg-gray-500 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              Kembali
            </Link>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-gray-50 rounded-2xl p-6 mt-6">
            <h3 className="font-bold text-gray-800 mb-4 text-base">Kontak Darurat Lainnya</h3>
            <div className="space-y-3">
              <a href="tel:119" className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🚨</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Polisi</p>
                    <p className="text-sm text-gray-600">119</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              <a href="tel:118" className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🚑</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Ambulans</p>
                    <p className="text-sm text-gray-600">118</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a href="tel:+622151211521" className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🚄</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">KAI Customer Service</p>
                    <p className="text-sm text-gray-600">021-5121-1521</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
