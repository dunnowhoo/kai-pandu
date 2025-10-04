'use client';

import { useState, useEffect } from 'react';

interface ReportData {
  totalRequests: number;
  completedRequests: number;
  averageResponseTime: number;
  disabilityBreakdown: {
    mobility: number;
    visual: number;
    hearing: number;
    cognitive: number;
    elderly: number;
    pregnant: number;
  };
  priorityBreakdown: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  securityPerformance: {
    id: string;
    name: string;
    completedTasks: number;
    averageTime: number;
    rating: number;
  }[];
}

interface ReportsComponentProps {
  requests: any[];
  securityOfficers: any[];
}

export function ReportsComponent({ requests, securityOfficers }: ReportsComponentProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  useEffect(() => {
    const completed = requests.filter(r => r.status === 'completed');
    
    const disabilityBreakdown = {
      mobility: requests.filter(r => r.disabilityType === 'mobility').length,
      visual: requests.filter(r => r.disabilityType === 'visual').length,
      hearing: requests.filter(r => r.disabilityType === 'hearing').length,
      cognitive: requests.filter(r => r.disabilityType === 'cognitive').length,
      elderly: requests.filter(r => r.disabilityType === 'elderly').length,
      pregnant: requests.filter(r => r.disabilityType === 'pregnant').length,
    };

    const priorityBreakdown = {
      low: requests.filter(r => r.priority === 'low').length,
      medium: requests.filter(r => r.priority === 'medium').length,
      high: requests.filter(r => r.priority === 'high').length,
      urgent: requests.filter(r => r.priority === 'urgent').length,
    };

    const securityPerformance = securityOfficers.map(officer => ({
      id: officer.id,
      name: officer.name,
      completedTasks: completed.filter(r => r.securityId === officer.id).length,
      averageTime: Math.floor(Math.random() * 15) + 5, 
      rating: 4.2 + Math.random() * 0.8 
    }));

    setReportData({
      totalRequests: requests.length,
      completedRequests: completed.length,
      averageResponseTime: 8.5,
      disabilityBreakdown,
      priorityBreakdown,
      securityPerformance
    });
  }, [requests, securityOfficers]);

  if (!reportData) return <div>Loading reports...</div>;

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Laporan & Statistik</h2>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-blue-600">{reportData.totalRequests}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{reportData.completedRequests}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {reportData.totalRequests > 0 
                  ? Math.round((reportData.completedRequests / reportData.totalRequests) * 100)
                  : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="text-3xl font-bold text-orange-600">{reportData.averageResponseTime}m</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-2xl">⏱️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Disability Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown Jenis Disabilitas</h3>
          <div className="space-y-3">
            {Object.entries(reportData.disabilityBreakdown).map(([type, count]) => {
              const percentage = reportData.totalRequests > 0 ? (count / reportData.totalRequests) * 100 : 0;
              const icons = {
                mobility: '♿',
                visual: '👁️',
                hearing: '👂',
                cognitive: '🧠',
                elderly: '👴',
                pregnant: '🤰'
              };
              
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{icons[type as keyof typeof icons]}</span>
                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown Prioritas</h3>
          <div className="space-y-3">
            {Object.entries(reportData.priorityBreakdown).map(([priority, count]) => {
              const percentage = reportData.totalRequests > 0 ? (count / reportData.totalRequests) * 100 : 0;
              const colors = {
                low: { bg: 'bg-gray-400', text: 'text-gray-700' },
                medium: { bg: 'bg-yellow-400', text: 'text-yellow-700' },
                high: { bg: 'bg-orange-400', text: 'text-orange-700' },
                urgent: { bg: 'bg-red-400', text: 'text-red-700' }
              };
              
              return (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colors[priority as keyof typeof colors].bg}`}></div>
                    <span className={`text-sm capitalize ${colors[priority as keyof typeof colors].text}`}>
                      {priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[priority as keyof typeof colors].bg}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa Security Officer</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Officer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Completed Tasks</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Avg Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Performance</th>
              </tr>
            </thead>
            <tbody>
              {reportData.securityPerformance.map(officer => (
                <tr key={officer.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">👮</span>
                      </div>
                      <span className="font-medium text-gray-900">{officer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{officer.completedTasks}</td>
                  <td className="py-3 px-4 text-gray-900">{officer.averageTime}m</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-900">{officer.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min(officer.rating * 20, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Real-time</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700">
              <strong>Budi Santoso</strong> menyelesaikan bantuan untuk Bapak Ahmad Wijaya (Platform 1)
            </span>
            <span className="text-xs text-green-600 ml-auto">2 menit lalu</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-700">
              <strong>Dewi Sartika</strong> ditugaskan untuk membantu Ibu Sari (Platform 2)
            </span>
            <span className="text-xs text-blue-600 ml-auto">5 menit lalu</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-yellow-700">
              Request baru dari <strong>Nenek Kartini</strong> membutuhkan bantuan di Platform 3
            </span>
            <span className="text-xs text-yellow-600 ml-auto">8 menit lalu</span>
          </div>
        </div>
      </div>
    </div>
  );
}