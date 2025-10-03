'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
}

interface SecurityOfficer {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'off-duty';
  currentLocation: string;
  assignedRequests: string[];
  contactNumber: string;
  badge: string;
}

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');
  const [requests, setRequests] = useState<AssistanceRequest[]>([]);
  const [securityOfficers, setSecurityOfficers] = useState<SecurityOfficer[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AssistanceRequest | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

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
        status: 'pending',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        badge: 'SEC-001'
      },
      {
        id: 'SEC002', 
        name: 'Benny Wijaya',
        status: 'available',
        currentLocation: 'Platform 1',
        assignedRequests: [],
        contactNumber: '081444555666',
        badge: 'SEC-002'
      },
      {
        id: 'SEC003',
        name: 'Citra Dewi',
        status: 'available',
        currentLocation: 'Main Hall',
        assignedRequests: [],
        contactNumber: '081777888999',
        badge: 'SEC-003'
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch = filterStatus === 'all' || request.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || request.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Satpam KAI</h1>
                <p className="text-sm text-gray-600">Sistem Bantuan Penumpang Disabilitas</p>
              </div>
              
              {/* Navigation Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'reports' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Laporan
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Shift: Siang</p>
                <p className="text-xs text-gray-500">08:00 - 16:00</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">👮</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Request</p>
                    <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📋</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {requests.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 text-xl">⏳</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {requests.filter(r => r.status === 'assigned' || r.status === 'in-progress').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🔄</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Available Security</p>
                    <p className="text-2xl font-bold text-green-600">
                      {securityOfficers.filter(s => s.status === 'available').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-xl">👮</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Security Officers Panel */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Officers</h2>
                <div className="space-y-3">
                  {securityOfficers.map(officer => (
                    <div key={officer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          officer.status === 'available' ? 'bg-green-500' :
                          officer.status === 'busy' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{officer.name}</p>
                          <p className="text-sm text-gray-500">{officer.currentLocation}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {officer.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requests List */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Request Bantuan</h2>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        + Tambah Request
                      </button>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex gap-4">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="assigned">Assigned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">Semua Prioritas</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {filteredRequests.map(request => (
                        <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.name}</h3>
                              <p className="text-sm text-gray-600">{request.disabilityType} • {request.assistanceType}</p>
                            </div>
                            <div className="flex gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Kereta:</span> {request.trainNumber}
                            </div>
                            <div>
                              <span className="font-medium">Tujuan:</span> {request.destination}
                            </div>
                            <div>
                              <span className="font-medium">Gerbong:</span> {request.carNumber}
                            </div>
                            <div>
                              <span className="font-medium">Waktu:</span> {request.boardingTime}
                            </div>
                          </div>
                          
                          {request.assignedSecurity && (
                            <div className="text-sm text-blue-600 mb-3">
                              <span className="font-medium">👮 Ditugaskan ke:</span> {request.assignedSecurity}
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedRequest(request)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                            >
                              Detail
                            </button>
                            {request.status === 'pending' && (
                              <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                                Assign Security
                              </button>
                            )}
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                              Update Status
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {filteredRequests.length === 0 && (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                          <p className="text-gray-500">Tidak ada request yang sesuai filter</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Reports Content */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Laporan & Statistik</h2>
            <p className="text-gray-600">Fitur laporan dalam pengembangan...</p>
          </div>
        )}
        
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Detail Request</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Nama Penumpang</label>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Jenis Disabilitas</label>
                    <p className="font-medium">{selectedRequest.disabilityType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Jenis Bantuan</label>
                    <p className="font-medium">{selectedRequest.assistanceType}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Nomor Kereta</label>
                    <p className="font-medium">{selectedRequest.trainNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Tujuan</label>
                    <p className="font-medium">{selectedRequest.destination}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Gerbong</label>
                    <p className="font-medium">{selectedRequest.carNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Kursi</label>
                    <p className="font-medium">{selectedRequest.seatNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Waktu Keberangkatan</label>
                    <p className="font-medium">{selectedRequest.boardingTime}</p>
                  </div>
                </div>
                
                {selectedRequest.contactNumber && (
                  <div>
                    <label className="text-sm text-gray-500">Nomor Kontak</label>
                    <p className="font-medium">{selectedRequest.contactNumber}</p>
                  </div>
                )}
                
                {selectedRequest.specialNotes && (
                  <div>
                    <label className="text-sm text-gray-500">Catatan Khusus</label>
                    <p className="font-medium">{selectedRequest.specialNotes}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Prioritas</label>
                    <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                      {selectedRequest.priority}
                    </p>
                  </div>
                </div>
                
                {selectedRequest.assignedSecurity && (
                  <div>
                    <label className="text-sm text-gray-500">Security yang Ditugaskan</label>
                    <p className="font-medium">👮 {selectedRequest.assignedSecurity}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}