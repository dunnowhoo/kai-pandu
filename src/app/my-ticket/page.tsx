'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KAI_BACKGROUND_IMAGE = '/images/KAI_bg1.png';

type TicketCategory = 'all' | 'intercity' | 'airport' | 'local';

interface Ticket {
  orderCode: string;
  trainName: string;
  class: string;
  trainNumber: string;
  category: string;
  departure: {
    time: string;
    station: string;
    date: string;
  };
  arrival: {
    time: string;
    station: string;
    date: string;
  };
  price?: string;
  purchaseDate?: string;
}

export default function MyTicketPage() {
  const [activeCategory, setActiveCategory] = useState<TicketCategory>('all');
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const loadTickets = () => {
      try {
        const storedTickets = localStorage.getItem('kai_tickets');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets);
          setTickets(parsedTickets);
          console.log('📋 Loaded tickets:', parsedTickets);
        }
      } catch (error) {
        console.error('Error loading tickets:', error);
      }
    };

    loadTickets();
    const handleStorageChange = () => {
      loadTickets();
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('ticketsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ticketsUpdated', handleStorageChange);
    };
  }, []);

  const filteredTickets = activeCategory === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.category === activeCategory);

  const hasTickets = tickets.length > 0;

  const handleDeleteTicket = (orderCode: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus tiket ini?')) {
      const updatedTickets = tickets.filter(ticket => ticket.orderCode !== orderCode);
      setTickets(updatedTickets);
      localStorage.setItem('kai_tickets', JSON.stringify(updatedTickets));
      
      window.dispatchEvent(new Event('ticketsUpdated'));
      
      console.log('🗑️ Ticket deleted:', orderCode);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header with Background Image */}
        <div 
          className="relative w-full h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${KAI_BACKGROUND_IMAGE})` }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-transparent"></div>
          
          {/* Header Content */}
          <div className="absolute inset-0 px-6 pt-6">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            <h1 className="text-white text-3xl font-bold mb-2">My Ticket</h1>
            <p className="text-white/90 text-sm">
              All train tickets that are already active and waiting for payment
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 -mt-6 pb-24 overflow-y-auto">
          
          {/* Additional Services Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-gray-800 text-lg font-bold mb-4">Additional Services for your trip</h2>
            
            <div className="flex justify-between items-center">
              <button className="flex flex-col items-center gap-2 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">RailFood</span>
              </button>
              
              <button className="flex flex-col items-center gap-2 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">Taxi</span>
              </button>
              
              <button className="flex flex-col items-center gap-2 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">Bus</span>
              </button>
              
              <button className="flex flex-col items-center gap-2 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">Hotel</span>
              </button>
            </div>
          </div>

          {/* My Tickets & Services Section */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-gray-800 text-lg font-bold mb-4">My Tickets & Services</h2>
            
            {/* Category Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('intercity')}
                className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeCategory === 'intercity'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Intercity Train
              </button>
              <button
                onClick={() => setActiveCategory('airport')}
                className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeCategory === 'airport'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Airport
              </button>
              <button
                onClick={() => setActiveCategory('local')}
                className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeCategory === 'local'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Local Train
              </button>
            </div>

            {/* Check & Add Ticket Button */}
            <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-3xl font-bold text-base shadow-lg hover:bg-blue-700 transition-all duration-300 mb-6">
              CHECK & ADD TICKET
            </button>

            {/* Tickets or Empty State */}
            {!hasTickets || filteredTickets.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6 relative">
                  {/* Clipboard illustrations */}
                  <div className="relative">
                    <svg className="w-32 h-32 text-purple-200" viewBox="0 0 200 200" fill="currentColor">
                      <rect x="40" y="20" width="120" height="160" rx="10" fill="#E9D5FF"/>
                      <rect x="60" y="10" width="30" height="10" rx="5" fill="#A78BFA"/>
                      <line x1="60" y1="50" x2="140" y2="50" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="60" y1="70" x2="140" y2="70" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="60" y1="90" x2="140" y2="90" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="60" y1="110" x2="100" y2="110" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                    
                    <svg className="w-32 h-32 text-pink-200 absolute top-4 left-8" viewBox="0 0 200 200" fill="currentColor">
                      <rect x="40" y="20" width="120" height="160" rx="10" fill="#FBCFE8"/>
                      <rect x="60" y="10" width="30" height="10" rx="5" fill="#F472B6"/>
                      <line x1="60" y1="50" x2="140" y2="50" stroke="#F9A8D4" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="60" y1="70" x2="140" y2="70" stroke="#F9A8D4" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="60" y1="90" x2="140" y2="90" stroke="#F9A8D4" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="60" y1="110" x2="100" y2="110" stroke="#F9A8D4" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-gray-800 text-xl font-bold mb-2">No Tickets Stored yet</h3>
                <p className="text-gray-500 text-sm text-center max-w-xs">
                  Come on, order your train ticket, your ticket will be displayed here.
                </p>
              </div>
            ) : (
              // Ticket List
              <div className="space-y-4">
                {filteredTickets.map((ticket, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-700 to-purple-800 rounded-3xl p-5 shadow-lg text-white relative overflow-hidden">
                    {/* Order Code & Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Order Code</span>
                        <span className="text-sm font-bold">{ticket.orderCode}</span>
                      </div>
                      <div className="bg-white px-4 py-1 rounded-full">
                        <span className="text-purple-800 text-xs font-bold">Intercity Train</span>
                      </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="bg-white rounded-2xl p-4 text-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold">{ticket.trainName}</h3>
                          <p className="text-xs text-gray-600">{ticket.class} • {ticket.trainNumber}</p>
                        </div>
                        <Image
                          src="/images/kaipaylogo.png"
                          alt="KAI Logo"
                          width={50}
                          height={25}
                          className="object-contain"
                        />
                      </div>

                      {/* Journey Timeline */}
                      <div className="relative">
                        {/* Departure */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex flex-col items-center pt-1">
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                            <div className="w-0.5 h-12 bg-blue-300 my-0.5"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-0.5">
                              <span className="text-xl font-bold text-gray-800">{ticket.departure.time}</span>
                              <span className="text-sm font-semibold text-gray-800">{ticket.departure.station}</span>
                            </div>
                            <p className="text-xs text-gray-500">{ticket.departure.date}</p>
                          </div>
                        </div>

                        {/* Arrival */}
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center pt-1">
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-0.5">
                              <span className="text-xl font-bold text-gray-800">{ticket.arrival.time}</span>
                              <span className="text-sm font-semibold text-gray-800">{ticket.arrival.station}</span>
                            </div>
                            <p className="text-xs text-gray-500">{ticket.arrival.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteTicket(ticket.orderCode)}
                      className="absolute top-4 right-4 w-8 h-8 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                      title="Hapus tiket"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl px-6 py-4 z-50">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="text-xs font-medium text-gray-400">Home</span>
            </Link>
            <Link href="/pandu-app/tiket" className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
              </svg>
              <span className="text-xs font-medium text-gray-400">Train</span>
            </Link>
            <button className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM11 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"/>
              </svg>
              <span className="text-xs font-semibold text-blue-600">My Ticket</span>
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
