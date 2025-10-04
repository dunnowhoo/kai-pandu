'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

interface AssistanceRequest {
  id: string;
  name: string;
  disabilityType: string;
  assistanceType: string;
  trainNumber: string;
  destination: string;
  carNumber: string;
  seatNumber: string;
  boardingTime: string;
  contactNumber?: string;
  specialNotes?: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedSecurity?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLocation?: string;
  isActive?: boolean;
  mapPosition?: { x: number; y: number };
  alertType?: 'normal' | 'stuck' | 'emergency';
}

interface SecurityOfficer {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'off-duty';
  currentLocation: string;
  assignedRequests: string[];
  contactNumber: string;
  badge: string;
  mapPosition?: { x: number; y: number };
}

interface DashboardContentProps {
  requests: AssistanceRequest[];
  securityOfficers: SecurityOfficer[];
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  filteredRequests: AssistanceRequest[];
  setSelectedRequest: (request: AssistanceRequest | null) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  setShowOfficersList: (show: boolean) => void;
}

interface LiveStationMapProps {
  requests: AssistanceRequest[];
  officers: SecurityOfficer[];
  highlightedUser: string | null;
  onUserClick: (userId: string) => void;
}

interface RequestDetailModalProps {
  request: AssistanceRequest;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusText: (status: string) => string;
  getPriorityText: (priority: string) => string;
}

interface OfficersListModalProps {
  officers: SecurityOfficer[];
  requests: AssistanceRequest[];
  onClose: () => void;
}

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');
  const [requests, setRequests] = useState<AssistanceRequest[]>([]);
  const [securityOfficers, setSecurityOfficers] = useState<SecurityOfficer[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AssistanceRequest | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [highlightedUser, setHighlightedUser] = useState<string | null>(null);
  const [showOfficersList, setShowOfficersList] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockRequests: AssistanceRequest[] = [
      {
        id: 'REQ001',
        name: 'Budi Santoso',
        disabilityType: 'Kursi Roda',
        assistanceType: 'Mobilitas',
        trainNumber: 'KA 123',
        destination: 'Jakarta - Surabaya',
        carNumber: '3',
        seatNumber: '12A',
        boardingTime: '14:30',
        contactNumber: '081234567890',
        specialNotes: 'Memerlukan bantuan naik turun kereta',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLocation: 'Dekat Peron 2',
        isActive: true,
        mapPosition: { x: 35, y: 60 },
        alertType: 'normal'
      },
      {
        id: 'REQ002',
        name: 'Siti Nurhaliza',
        disabilityType: 'Tunanetra',
        assistanceType: 'Navigasi',
        trainNumber: 'KA 456',
        destination: 'Bandung - Yogyakarta',
        carNumber: '2',
        seatNumber: '8B',
        boardingTime: '16:45',
        contactNumber: '081987654321',
        specialNotes: 'Memerlukan panduan ke gerbong',
        status: 'assigned',
        priority: 'medium',
        assignedSecurity: 'Adi Pratama',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLocation: 'Pintu Masuk Utara',
        isActive: true,
        mapPosition: { x: 20, y: 30 },
        alertType: 'stuck'
      },
      {
        id: 'REQ003',
        name: 'Ahmad Yani',
        disabilityType: 'Tuna Rungu',
        assistanceType: 'Komunikasi',
        trainNumber: 'KA 789',
        destination: 'Jakarta - Malang',
        carNumber: '1',
        seatNumber: '5C',
        boardingTime: '15:00',
        contactNumber: '081555666777',
        specialNotes: 'Memerlukan komunikasi visual',
        status: 'pending',
        priority: 'urgent',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLocation: 'Ruang Tunggu',
        isActive: true,
        mapPosition: { x: 70, y: 65 },
        alertType: 'emergency'
      }
    ];

    const mockOfficers: SecurityOfficer[] = [
      {
        id: 'SEC001',
        name: 'Adi Pratama',
        status: 'busy',
        currentLocation: 'Platform 2',
        assignedRequests: ['REQ002'],
        contactNumber: '081111222333',
        badge: 'SEC-001',
        mapPosition: { x: 25, y: 35 }
      },
      {
        id: 'SEC002', 
        name: 'Benny Wijaya',
        status: 'available',
        currentLocation: 'Platform 1',
        assignedRequests: [],
        contactNumber: '081444555666',
        badge: 'SEC-002',
        mapPosition: { x: 50, y: 50 }
      },
      {
        id: 'SEC003',
        name: 'Citra Dewi',
        status: 'available',
        currentLocation: 'Main Hall',
        assignedRequests: [],
        contactNumber: '081777888999',
        badge: 'SEC-003',
        mapPosition: { x: 65, y: 30 }
      }
    ];

    setRequests(mockRequests);
    setSecurityOfficers(mockOfficers);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'assigned': return 'Ditugaskan';
      case 'in-progress': return 'Berlangsung';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Mendesak';
      case 'high': return 'Tinggi';
      case 'medium': return 'Sedang';
      case 'low': return 'Rendah';
      default: return priority;
    }
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch = filterStatus === 'all' || request.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || request.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <>
      {/* Heroicons CDN */}
      <Script src="https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/index.js" />
      
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <div className="w-20 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 flex flex-col items-center py-6 space-y-8">
          {/* Logo */}
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col items-center space-y-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeTab === 'reports'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>

            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>

            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </nav>

          {/* Bottom Items */}
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="w-12 h-12 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>
            
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Top Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Penumpang Prioritas</p>
                <h1 className="text-2xl font-bold text-gray-900">Dasbor Keamanan</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari permintaan..."
                    className="w-80 pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Profile */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
            {activeTab === 'dashboard' && (
              <DashboardContent 
                requests={requests}
                securityOfficers={securityOfficers}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filteredRequests={filteredRequests}
                setSelectedRequest={setSelectedRequest}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
                setShowOfficersList={setShowOfficersList}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsContent />
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <RequestDetailModal 
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
          getStatusText={getStatusText}
          getPriorityText={getPriorityText}
        />
      )}

      {/* Officers List Modal */}
      {showOfficersList && (
        <OfficersListModal 
          officers={securityOfficers}
          requests={requests}
          onClose={() => setShowOfficersList(false)}
        />
      )}
    </>
  );
}

// Dashboard Content Component
function DashboardContent({ 
  requests, 
  securityOfficers, 
  filterStatus, 
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filteredRequests,
  setSelectedRequest,
  getStatusColor,
  getPriorityColor,
  setShowOfficersList
}: DashboardContentProps) {
  const [highlightedUser, setHighlightedUser] = useState<string | null>(null);
  const activeRequests = requests.filter(r => r.isActive);
  const urgentAlerts = requests.filter(r => r.alertType === 'emergency' && r.status !== 'completed');

  return (
    <div className="space-y-6">
      {/* Live Station Map & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Station Map - Main Component */}
        <div className="lg:col-span-2">
          <LiveStationMap 
            requests={activeRequests}
            officers={securityOfficers}
            highlightedUser={highlightedUser}
            onUserClick={(userId: string) => {
              const request = requests.find(r => r.id === userId);
              if (request) setSelectedRequest(request);
            }}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white h-40 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
            <div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Permintaan Baru</h3>
              <p className="text-sm text-blue-100 mt-1">Tambah permintaan manual</p>
            </div>
          </div>

          <div 
            onClick={() => setShowOfficersList(true)}
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-6 text-white h-40 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Daftar Petugas</h3>
              <p className="text-sm text-pink-100 mt-1">Kelola petugas keamanan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Assists Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 font-medium">LIVE</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Permintaan Aktif</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">{activeRequests.length}</p>
          <p className="text-sm text-gray-500">Pengguna aktif di stasiun saat ini</p>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Berlangsung: {requests.filter(r => r.status === 'in-progress').length}</span>
              <span>Ditugaskan: {requests.filter(r => r.status === 'assigned').length}</span>
            </div>
          </div>
        </div>

        {/* Available Officers Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">ON DUTY</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Petugas Tersedia</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">
            {securityOfficers.filter(s => s.status === 'available').length}
          </p>
          <p className="text-sm text-gray-500">dari {securityOfficers.length} total petugas</p>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all" 
                style={{ width: `${(securityOfficers.filter(s => s.status === 'available').length / securityOfficers.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Urgent Alerts Card */}
        <div className={`bg-white rounded-3xl p-6 shadow-sm border-2 ${urgentAlerts.length > 0 ? 'border-red-300 animate-pulse' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center ${urgentAlerts.length > 0 ? 'from-red-500 to-orange-600' : 'from-gray-400 to-gray-500'}`}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            {urgentAlerts.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-xs text-red-600 font-bold">URGENT!</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Panggilan Darurat</h3>
          <p className={`text-3xl font-bold mb-2 ${urgentAlerts.length > 0 ? 'text-red-600' : 'text-gray-400'}`}>
            {urgentAlerts.length}
          </p>
          <p className="text-sm text-gray-500">Panggilan darurat tertunda</p>
          
          {urgentAlerts.length > 0 && (
            <button className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all">
              Respon Sekarang
            </button>
          )}
        </div>
      </div>

      {/* Recent Requests Table - Enhanced */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Permintaan Terbaru</h2>
            <p className="text-sm text-gray-500 mt-1">Permintaan bantuan real-time dengan pelacakan lokasi</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="assigned">Ditugaskan</option>
              <option value="in-progress">Berlangsung</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredRequests.map(request => (
            <div 
              key={request.id} 
              className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer ${
                highlightedUser === request.id 
                  ? 'bg-purple-50 border-2 border-purple-300' 
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
              onClick={() => {
                setHighlightedUser(request.id);
                setSelectedRequest(request);
              }}
            >
              <div className="flex items-center gap-4">
                {/* User Avatar with Alert Indicator */}
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    request.alertType === 'emergency' ? 'bg-gradient-to-br from-red-500 to-orange-600 animate-pulse' :
                    request.alertType === 'stuck' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    'bg-gradient-to-br from-blue-400 to-indigo-500'
                  }`}>
                    {request.name.charAt(0)}
                  </div>
                  {request.alertType === 'emergency' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <h3 className="font-semibold text-gray-900">{request.name}</h3>
                  <p className="text-sm text-gray-500">{request.disabilityType} - {request.trainNumber}</p>
                  {request.lastLocation && (
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-purple-600 font-medium">{request.lastLocation}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions and Status */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{request.boardingTime}</p>
                  <p className="text-xs text-gray-500">Car {request.carNumber}, Seat {request.seatNumber}</p>
                </div>

                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  {request.status === 'pending' && (
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all">
                      Tugaskan Petugas
                    </button>
                  )}
                  {request.alertType === 'emergency' && (
                    <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition-all animate-pulse">
                      Respon Sekarang
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Voice call functionality
                    }}
                    className="p-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
                    title="Panggilan Suara"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Live Station Map Component
function LiveStationMap({ requests, officers, highlightedUser, onUserClick }: LiveStationMapProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-[600px] flex flex-col">
      {/* Header - Di margin putih atas */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-white/90">PELACAKAN LANGSUNG</span>
            </div>
            <h2 className="text-xl font-bold text-white">Peta Stasiun Gambir</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-xs text-white/80">Pengguna Aktif</p>
            <p className="text-2xl font-bold text-white">{requests.length}</p>
          </div>
        </div>
      </div>

      {/* Map Container - Foto peta sebagai background */}
      <div className="flex-1 relative bg-gray-100">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: 'url("https://i.imgur.com/5BV8flg.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />

        {/* Overlay untuk markers */}
        <div className="absolute inset-0">
          {/* User Markers - Di atas foto */}
          {requests.map(request => (
            <div
              key={request.id}
              className={`absolute transition-all duration-300 cursor-pointer ${
                highlightedUser === request.id ? 'z-30 scale-125' : 'z-20'
              }`}
              style={{
                left: `${request.mapPosition?.x || 50}%`,
                top: `${request.mapPosition?.y || 50}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onUserClick(request.id)}
            >
              {/* User Icon with Alert Indicator */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-2xl border-3 border-white ${
                  request.alertType === 'emergency' ? 'bg-red-500 animate-pulse' :
                  request.alertType === 'stuck' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}>
                  {request.name.charAt(0)}
                </div>
                
                {/* Alert Pulse Effect */}
                {request.alertType === 'emergency' && (
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                )}
                
                {/* Location Label - Ketika di-highlight */}
                {highlightedUser === request.id && (
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl z-40">
                    <div className="font-bold">{request.name}</div>
                    <div className="text-gray-300 text-[10px] mt-0.5">{request.lastLocation}</div>
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                  </div>
                )}

                {/* Emergency Badge */}
                {request.alertType === 'emergency' && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                    SOS
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Security Officer Markers - Di atas foto */}
          {officers.map(officer => (
            <div
              key={officer.id}
              className="absolute z-20"
              style={{
                left: `${officer.mapPosition?.x || 50}%`,
                top: `${officer.mapPosition?.y || 50}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={officer.name}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl border-3 border-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                {officer.status === 'available' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Info - Di margin putih bawah */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          {/* Legend */}
          <div className="flex items-center gap-6">
            <div className="text-xs font-semibold text-gray-500 uppercase">Keterangan:</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
              <span className="text-sm text-gray-700">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
              <span className="text-sm text-gray-700">Terhambat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm animate-pulse"></div>
              <span className="text-sm text-gray-700 font-semibold">Darurat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm border-2 border-gray-300"></div>
              <span className="text-sm text-gray-700">Petugas</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                <span className="font-bold text-gray-900">{requests.filter(r => r.alertType === 'normal').length}</span> Normal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">
                <span className="font-bold text-gray-900">{requests.filter(r => r.alertType === 'stuck').length}</span> Terhambat
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">
                <span className="font-bold text-red-600">{requests.filter(r => r.alertType === 'emergency').length}</span> Darurat
              </span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Klik pada ikon penumpang untuk melihat detail lengkap</span>
        </div>
      </div>
    </div>
  );
}

// Reports Content Component
function ReportsContent() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Laporan & Analitik</h2>
      <p className="text-gray-600">Fitur analitik dan pelaporan terperinci akan segera hadir...</p>
    </div>
  );
}

// Request Detail Modal Component
function RequestDetailModal({ request, onClose, getStatusColor, getPriorityColor, getStatusText, getPriorityText }: RequestDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Detail Permintaan</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 font-medium">Nama Penumpang</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 font-medium">Nomor Kontak</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.contactNumber || '-'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 font-medium">Jenis Disabilitas</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.disabilityType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 font-medium">Jenis Bantuan</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.assistanceType}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 font-medium">Nomor Kereta</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.trainNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 font-medium">Tujuan</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.destination}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-500 font-medium">Nomor Gerbong</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.carNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 font-medium">Nomor Kursi</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.seatNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 font-medium">Waktu Keberangkatan</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.boardingTime}</p>
              </div>
            </div>
            
            {request.specialNotes && (
              <div>
                <label className="text-sm text-gray-500 font-medium">Catatan Khusus</label>
                <p className="text-gray-900 mt-1 p-4 bg-gray-50 rounded-xl">{request.specialNotes}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 font-medium">Status</label>
                <div className="mt-2">
                  <span className={`inline-block px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 font-medium">Prioritas</label>
                <div className="mt-2">
                  <span className={`inline-block px-4 py-2 rounded-xl text-sm font-medium ${getPriorityColor(request.priority)}`}>
                    {getPriorityText(request.priority)}
                  </span>
                </div>
              </div>
            </div>
            
            {request.assignedSecurity && (
              <div>
                <label className="text-sm text-gray-500 font-medium">Petugas yang Ditugaskan</label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{request.assignedSecurity}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Tugaskan Petugas
              </button>
              <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Perbarui Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Officers List Modal Component
function OfficersListModal({ officers, requests, onClose }: OfficersListModalProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'off-duty':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Tersedia';
      case 'busy':
        return 'Sibuk';
      case 'off-duty':
        return 'Off Duty';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daftar Petugas Keamanan</h2>
              <p className="text-sm text-gray-500 mt-1">
                {officers.filter(o => o.status === 'available').length} tersedia dari {officers.length} petugas
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Officers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {officers.map(officer => (
              <div 
                key={officer.id}
                className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all"
              >
                {/* Officer Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      officer.status === 'available' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                      officer.status === 'busy' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                      'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      {officer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{officer.name}</h3>
                      <p className="text-sm text-gray-500">Badge: {officer.badge}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(officer.status)}`}>
                    {getStatusText(officer.status)}
                  </span>
                </div>

                {/* Officer Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{officer.currentLocation}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{officer.contactNumber}</span>
                  </div>

                  {/* Assigned Requests */}
                  {officer.assignedRequests.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tugas Saat Ini:</p>
                      <div className="space-y-2">
                        {officer.assignedRequests.map((reqId: string) => {
                          const request = requests.find(r => r.id === reqId);
                          return request ? (
                            <div key={reqId} className="bg-white rounded-lg p-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">{request.name}</span>
                                <span className="text-gray-500">{request.trainNumber}</span>
                              </div>
                              <p className="text-gray-600 mt-1">{request.disabilityType}</p>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {officer.assignedRequests.length === 0 && officer.status === 'available' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-green-600 font-medium">✓ Siap menerima tugas baru</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-xs font-semibold hover:shadow-md transition-all">
                    Lihat Detail
                  </button>
                  {officer.status === 'available' && (
                    <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors">
                      Tugaskan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {officers.filter(o => o.status === 'available').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Tersedia</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {officers.filter(o => o.status === 'busy').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Sibuk</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {officers.filter(o => o.status === 'off-duty').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Off Duty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}