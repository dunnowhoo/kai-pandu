'use client';

import { useState } from 'react';

type DisabilityType = 'visual' | 'mobility' | 'hearing' | 'cognitive' | 'elderly' | 'pregnant';

interface RequestData {
  id: string;
  passengerName: string;
  disabilityType: DisabilityType;
  description: string;
  trainNumber: string;
  destination: string;
  carNumber: string;
  seatNumber: string;
  departureTime: string;
  location: string;
  priority: string;
  contactNumber: string;
  specialNotes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AddRequestFormProps {
  onSubmit: (requestData: RequestData) => void;
  onCancel: () => void;
}

export function AddRequestForm({ onSubmit, onCancel }: AddRequestFormProps) {
  const [formData, setFormData] = useState({
    passengerName: '',
    disabilityType: 'mobility' as DisabilityType,
    description: '',
    trainNumber: '',
    destination: '',
    carNumber: '',
    seatNumber: '',
    departureTime: '',
    location: '',
    priority: 'medium',
    contactNumber: '',
    specialNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSubmit(newRequest);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Tambah Request Bantuan</h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Nama Penumpang */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Penumpang *
                </label>
                <input
                  type="text"
                  name="passengerName"
                  value={formData.passengerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama lengkap penumpang"
                />
              </div>
              
              {/* Jenis Disabilitas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Disabilitas *
                </label>
                <select
                  name="disabilityType"
                  value={formData.disabilityType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mobility">♿ Mobilitas (Kursi Roda)</option>
                  <option value="visual">👁️ Tunanetra</option>
                  <option value="hearing">👂 Tunarungu</option>
                  <option value="cognitive">🧠 Kognitif</option>
                  <option value="elderly">👴 Lansia</option>
                  <option value="pregnant">🤰 Ibu Hamil</option>
                </select>
              </div>
              
              {/* Prioritas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioritas *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              {/* Nomor Kereta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Kereta *
                </label>
                <input
                  type="text"
                  name="trainNumber"
                  value={formData.trainNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="KA 123"
                />
              </div>
              
              {/* Tujuan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tujuan *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jakarta, Yogyakarta, Surabaya..."
                />
              </div>
              
              {/* Gerbong */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Gerbong *
                </label>
                <input
                  type="text"
                  name="carNumber"
                  value={formData.carNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1, 2, 3..."
                />
              </div>
              
              {/* Nomor Kursi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Kursi *
                </label>
                <input
                  type="text"
                  name="seatNumber"
                  value={formData.seatNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12A, 5B, 8C..."
                />
              </div>
              
              {/* Waktu Keberangkatan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waktu Keberangkatan *
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Lokasi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi Saat Ini *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih Lokasi</option>
                  <option value="Platform 1">Platform 1</option>
                  <option value="Platform 2">Platform 2</option>
                  <option value="Platform 3">Platform 3</option>
                  <option value="Platform 4">Platform 4</option>
                  <option value="Platform 5">Platform 5</option>
                  <option value="Platform 6">Platform 6</option>
                  <option value="Hall Utama">Hall Utama</option>
                  <option value="Ruang Tunggu">Ruang Tunggu</option>
                  <option value="Loket">Loket</option>
                  <option value="Parkir">Area Parkir</option>
                </select>
              </div>
              
              {/* Nomor Kontak */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Kontak
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="081234567890"
                />
              </div>
              
              {/* Deskripsi Bantuan */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Bantuan yang Dibutuhkan *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jelaskan bantuan yang dibutuhkan secara detail..."
                />
              </div>
              
              {/* Catatan Khusus */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Khusus
                </label>
                <textarea
                  name="specialNotes"
                  value={formData.specialNotes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Catatan tambahan, alergi, kondisi medis, dll..."
                />
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Simpan Request
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}