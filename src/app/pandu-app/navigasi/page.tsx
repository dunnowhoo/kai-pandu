'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';

type NavPhase = 'gate' | 'platform' | 'boarding' | 'seat' | 'arrival';

interface Station {
  name: string;
  code: string;
  lat: number;
  lng: number;
  distance?: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function NavigasiPage() {
  const [phase, setPhase] = useState<NavPhase>('gate');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Location states
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [nearbyStations, setNearbyStations] = useState<Station[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

  // ETA states
  const [etaMinutes, setEtaMinutes] = useState<number>(7);
  const [trainRoute, setTrainRoute] = useState({ from: 'Gambir', to: 'Surabaya' });
  const [trainName, setTrainName] = useState('Argo Bromo Anggrek');
  const [showETA, setShowETA] = useState(false);
  const [currentStation, setCurrentStation] = useState<string | null>(null);

  const walaharSchedule = useMemo(() => [
    { trainNumber: 'KA 326', departure: '06:00', route: 'Cikarang - Purwakarta' },
    { trainNumber: 'KA 328', departure: '07:48', route: 'Cikarang - Purwakarta' },
    { trainNumber: 'KA 330', departure: '11:36', route: 'Cikarang - Purwakarta' },
    { trainNumber: 'KA 332', departure: '13:26', route: 'Cikarang - Purwakarta' },
    { trainNumber: 'KA 334', departure: '18:35', route: 'Cikarang - Purwakarta' },
  ], []);

  const stations: Station[] = useMemo(() => [
    { name: 'Gambir', code: 'GMR', lat: -6.1761, lng: 106.8310 },
    { name: 'Pasar Senen', code: 'PSE', lat: -6.1760, lng: 106.8446 },
    { name: 'Jatinegara', code: 'JNG', lat: -6.2156, lng: 106.8707 },
    { name: 'Manggarai', code: 'MRI', lat: -6.2107, lng: 106.8503 },
    { name: 'Cikini', code: 'CKI', lat: -6.1967, lng: 106.8378 },
    { name: 'Gondangdia', code: 'GDD', lat: -6.1853, lng: 106.8351 },
    { name: 'Klender Baru', code: 'KLB', lat: -6.2168, lng: 106.9217 },
    { name: 'Cakung', code: 'CKG', lat: -6.1751, lng: 106.9486 },
    { name: 'Kranji', code: 'KRJ', lat: -6.1362, lng: 107.0028 },
    { name: 'Bekasi', code: 'BKS', lat: -6.2368, lng: 107.0012 },
    { name: 'Bekasi Timur', code: 'BKT', lat: -6.2447, lng: 107.0243 },
    { name: 'Tambun', code: 'TMB', lat: -6.2645, lng: 107.0505 },
    { name: 'Cibitung', code: 'CBT', lat: -6.2557, lng: 107.0899 },
    { name: 'Metland Telagamurni', code: 'MTM', lat: -6.2650, lng: 107.1350 },
    { name: 'Cikarang', code: 'CKR', lat: -6.2608, lng: 107.1526 },
    { name: 'Cipinang', code: 'CPN', lat: -6.2168, lng: 106.8787 },
    
    // Jawa Barat
    { name: 'Purwakarta', code: 'PWK', lat: -6.5569, lng: 107.4437 },
    { name: 'Bandung', code: 'BD', lat: -6.9147, lng: 107.6098 },
    { name: 'Cirebon', code: 'CN', lat: -6.7058, lng: 108.5571 },
    
    // Jawa Tengah
    { name: 'Semarang Tawang', code: 'SMT', lat: -6.9672, lng: 110.4215 },
    { name: 'Solo Balapan', code: 'SLO', lat: -7.5561, lng: 110.8245 },
    { name: 'Yogyakarta', code: 'YK', lat: -7.7897, lng: 110.3642 },
    
    // Jawa Timur
    { name: 'Surabaya Gubeng', code: 'SGU', lat: -7.2650, lng: 112.7520 },
    { name: 'Surabaya Pasarturi', code: 'SPT', lat: -7.2407, lng: 112.7341 },
    { name: 'Malang', code: 'ML', lat: -7.9785, lng: 112.6304 },
  ], []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const checkNextTrain = useCallback(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    for (const train of walaharSchedule) {
      const [hour, minute] = train.departure.split(':').map(Number);
      const trainTimeInMinutes = hour * 60 + minute;
      const minutesUntilDeparture = trainTimeInMinutes - currentTimeInMinutes;

      if (minutesUntilDeparture > 0 && minutesUntilDeparture <= 10) {
        console.log(`🚂 Train ${train.trainNumber} departing in ${minutesUntilDeparture} minutes`);
        setEtaMinutes(minutesUntilDeparture);
        setTrainRoute({ from: 'Cikarang', to: 'Purwakarta' });
        setTrainName(`KA Walahar ${train.trainNumber}`);
        setShowETA(true);
        return true;
      }
    }
    
    setShowETA(false);
    return false;
  }, [walaharSchedule]);

  useEffect(() => {
    const checkLocation = async () => {
      setIsLoadingLocation(true);
      
      if (!navigator.geolocation) {
        console.error('Geolocation tidak didukung browser');
        setError('Browser tidak mendukung GPS');
        setIsLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          setUserLocation({ lat: userLat, lng: userLng });
          console.log('📍 User location:', userLat, userLng);
          const STATION_RADIUS = 0.5; 
          
          let isNearStation = false;
          const stationsWithDistance = stations.map(station => {
            const distance = calculateDistance(userLat, userLng, station.lat, station.lng);
            return { ...station, distance };
          });

          stationsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          if (stationsWithDistance[0].distance! <= STATION_RADIUS) {
            isNearStation = true;
            
            // Detect specific station
            const nearestStationName = stationsWithDistance[0].name;
            setCurrentStation(nearestStationName);
            
            // If user is at Cikarang station, check for upcoming Walahar trains
            if (nearestStationName === 'Cikarang') {
              console.log('🚂 User at Cikarang Station - Checking Walahar schedule...');
              checkNextTrain();
            }
          }

          setNearbyStations(stationsWithDistance.slice(0, 5)); // Top 5 nearest stations
          
          // Show modal if not in station area
          if (!isNearStation) {
            setShowLocationModal(true);
          }

          setIsLoadingLocation(false);
          console.log('✅ In station area:', isNearStation);
          console.log('📍 Current station:', stationsWithDistance[0]?.name);
          console.log('📊 Nearby stations:', stationsWithDistance.slice(0, 5));
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('Tidak dapat mengakses lokasi GPS');
          setIsLoadingLocation(false);
          setShowLocationModal(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    };

    checkLocation();
  }, [checkNextTrain, stations]);

  // ETA Countdown Timer
  useEffect(() => {
    if (!showETA || etaMinutes <= 0) return;

    const timer = setInterval(() => {
      setEtaMinutes(prev => {
        if (prev <= 1) {
          setShowETA(false);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [showETA, etaMinutes]);

  // Continuous Walahar schedule monitoring when at Cikarang station
  useEffect(() => {
    if (currentStation !== 'Cikarang') return;

    // Check immediately
    checkNextTrain();

    // Then check every minute
    const scheduleChecker = setInterval(() => {
      console.log('⏰ Checking Walahar schedule at Cikarang...');
      checkNextTrain();
    }, 60000); // Check every minute

    return () => clearInterval(scheduleChecker);
  }, [currentStation, checkNextTrain]);

  // Start camera when component mounts or facingMode changes
  useEffect(() => {
    let currentStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        // Stop previous stream if exists
        if (currentStream) {
          currentStream.getTracks().forEach(track => track.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode, // Use selected camera
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });

        currentStream = mediaStream;
        setStream(mediaStream);
        setError('');

        // Attach stream to video element
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError(err instanceof Error ? err.message : 'Tidak dapat mengakses kamera');
      }
    };

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Update video element when stream changes
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `kai-navigation-${Date.now()}.jpg`;
            a.click();
            URL.revokeObjectURL(url);
          }
        }, 'image/jpeg');
      }
    }
  };

  // Fungsi untuk membuka Google Maps ke stasiun
  const openGoogleMaps = (station: Station) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&destination_place_id=${encodeURIComponent(station.name + ' Station')}`;
    window.open(url, '_blank');
  };

  const getPhaseStatus = () => {
    switch (phase) {
      case 'gate': return { icon: '🚪', text: 'Menuju Gate 3', instruction: 'Jalan lurus 30m, belok kiri' };
      case 'platform': return { icon: '🚉', text: 'Gambir – Peron 3', instruction: 'Peron 3 di kanan, 15m' };
      case 'boarding': return { icon: '⏱️', text: 'ETA Kereta 3 menit', instruction: 'Kereta akan tiba, siap-siap' };
      case 'seat': return { icon: '🎫', text: 'Cari Kursi 14A', instruction: 'Gerbong 5, maju 10m' };
      case 'arrival': return { icon: '🏁', text: 'Stasiun Dekat', instruction: 'Yogyakarta 5 menit lagi' };
      default: return { icon: '📍', text: 'Navigasi', instruction: 'Panduan perjalanan' };
    }
  };

  const status = getPhaseStatus();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative overflow-hidden">
        
        {/* Location Check Modal */}
        {showLocationModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-t-3xl text-white">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center mb-2">
                  {isLoadingLocation ? 'Mengecek Lokasi...' : 'Anda Tidak di Kawasan Stasiun'}
                </h2>
                <p className="text-sm text-center text-white/90">
                  {isLoadingLocation 
                    ? 'Sedang memverifikasi lokasi GPS Anda...'
                    : 'Navigasi AR hanya tersedia di dalam area stasiun. Berikut stasiun terdekat dari lokasi Anda:'
                  }
                </p>
              </div>

              {/* User Location Info */}
              {userLocation && !isLoadingLocation && (
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                  <div className="flex items-center gap-2 text-blue-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C7.802 0 4.403 3.403 4.403 7.602 4.403 11.8 7.469 16.812 12 24c4.531-7.188 7.597-12.2 7.597-16.398C19.597 3.403 16.199 0 12 0zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium">Lokasi Anda Saat Ini</p>
                      <p className="text-xs text-blue-600">
                        {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoadingLocation && (
                <div className="p-8 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 text-sm">Mendapatkan lokasi GPS...</p>
                </div>
              )}

              {/* Nearby Stations List */}
              {!isLoadingLocation && nearbyStations.length > 0 && (
                <div className="p-6">
                  <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
                    </svg>
                    Stasiun Terdekat
                  </h3>
                  
                  <div className="space-y-3">
                    {nearbyStations.map((station, index) => (
                      <button
                        key={station.code}
                        onClick={() => openGoogleMaps(station)}
                        className="w-full bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-lg">{index + 1}</span>
                            </div>
                            <div className="text-left flex-1">
                              <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {station.name}
                              </h4>
                              <p className="text-xs text-gray-500">Kode: {station.code}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                </svg>
                                <span className="text-xs font-medium text-gray-600">
                                  {station.distance ? `${station.distance.toFixed(2)} km` : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error State */}
              {!isLoadingLocation && error && (
                <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-red-700 mb-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <span className="font-semibold text-sm">Error GPS</span>
                    </div>
                    <p className="text-sm text-red-600">{error}</p>
                    <p className="text-xs text-red-500 mt-2">Pastikan GPS aktif dan berikan izin lokasi.</p>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                >
                  Tutup & Lanjutkan
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Fitur AR tetap dapat digunakan meskipun di luar stasiun
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="relative h-screen bg-black overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4 z-20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-300">Panduan Perjalanan</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{status.icon}</span>
                  <span className="text-sm font-medium">{status.text}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Camera Switch Button */}
                <button 
                  onClick={toggleCamera}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  title="Switch Camera"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                {/* Close Button */}
                <Link
                  href="/pandu-app"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Camera View (Live Feed) */}
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {error ? (
              <div className="text-center text-white">
                <svg className="w-24 h-24 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-red-400 mb-2">Kamera Error</p>
                <p className="text-xs text-white/70">{error}</p>
              </div>
            ) : !stream ? (
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm">Memuat Kamera...</p>
              </div>
            ) : (
              <video
                ref={(el) => {
                  videoRef.current = el;
                  if (el && stream) {
                    el.srcObject = stream;
                  }
                }}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          {/* ETA Chip Overlay - Top Center */}
          {showETA && etaMinutes > 0 && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border-2 border-white/20 animate-pulse">
                <div className="flex items-center gap-3">
                  {/* Train Icon */}
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4z"/>
                    </svg>
                  </div>
                  
                  {/* ETA Info */}
                  <div className="text-white">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold">{trainRoute.from} → {trainRoute.to}</p>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{trainName}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <p className="text-lg font-bold">
                        {etaMinutes} menit lagi
                      </p>
                    </div>
                  </div>

                  {/* Countdown Circle */}
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="125.6"
                        strokeDashoffset={125.6 - (125.6 * etaMinutes) / 10}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{etaMinutes}</span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowETA(false)}
                    className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors ml-2"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AR Overlay Indicators */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-green-500/20 border-4 border-green-500 rounded-2xl p-4 backdrop-blur-sm animate-bounce">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>


          {/* Detected Objects */}

          {/* Bottom Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl z-20">
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4"></div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Instruksi Navigasi</h3>
                <p className="text-white/90">{status.instruction}</p>
              </div>

              {phase === 'boarding' && (
                <div className="bg-white/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Kereta Taksaka</span>
                    <span className="text-sm">3 menit</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => {/* Repeat audio */}}
                  className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
                >
                  <div className="text-lg mb-1">🔄</div>
                  <div className="text-xs">Ulangi</div>
                </button>
                <button
                  onClick={capturePhoto}
                  className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
                >
                  <div className="text-lg mb-1">📸</div>
                  <div className="text-xs">Foto</div>
                </button>
                <button
                  onClick={() => {
                    const phases: NavPhase[] = ['gate', 'platform', 'boarding', 'seat', 'arrival'];
                    const currentIndex = phases.indexOf(phase);
                    if (currentIndex < phases.length - 1) {
                      setPhase(phases[currentIndex + 1]);
                    }
                  }}
                  className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
                >
                  <div className="text-lg mb-1">➡️</div>
                  <div className="text-xs">Next</div>
                </button>
                <Link
                  href="/pandu-app"
                  className="bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl text-center hover:bg-white/30 transition-colors"
                >
                  <div className="text-lg mb-1">🛑</div>
                  <div className="text-xs">Stop</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
