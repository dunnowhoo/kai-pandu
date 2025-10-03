// app/api/webhook/elevenlabs/route.js

import { NextResponse } from 'next/server';

/**
 * Fungsi helper untuk membersihkan dan menyederhanakan payload dari ElevenLabs.
 */
function getCleanData(webhookPayload) {
  // Langsung menargetkan objek data_collection_results
  const dataCollection = webhookPayload.analysis?.data_collection_results;

  if (!dataCollection) {
    console.log("Webhook diterima, tapi tidak ada 'data_collection_results'.");
    return null;
  }

  const cleanJson = {};
  // Loop melalui setiap kunci di dataCollection (misal: 'stasiun_tujuan', 'jam_keberangkatan')
  for (const key in dataCollection) {
    // Pastikan objek ada dan memiliki properti 'value' sebelum mengambilnya
    if (dataCollection[key] && typeof dataCollection[key].value !== 'undefined') {
      cleanJson[key] = dataCollection[key].value;
    }
  }
  
  // Kembalikan objek jika tidak kosong, jika tidak kembalikan null
  return Object.keys(cleanJson).length > 0 ? cleanJson : null;
}

/**
 * Fungsi ini akan menangani semua request POST yang masuk ke URL ini.
 */
export async function POST(request) {
  try {
    // 1. Ambil seluruh body JSON dari request yang masuk
    const webhookPayload = await request.json();
    console.log("Webhook payload diterima!");

    // 2. Proses payload untuk mendapatkan JSON yang bersih
    const simpleJson = getCleanData(webhookPayload);

    // 3. Jika data bersih berhasil diekstrak
    if (simpleJson) {
      console.log("Data bersih berhasil diekstrak:", simpleJson);

      // --- LOGIKA BISNIS ANDA DI SINI ---
      
      // A. Ekstrak data dari JSON bersih ke dalam variabel-variabel
      // Ini membuat kode Anda lebih mudah dibaca dan dikelola.
      const stasiunAsal = simpleJson.stasiun_asal;
      const stasiunTujuan = simpleJson.stasiun_tujuan;
      const tanggalKeberangkatan = simpleJson.tanggal_keberangkatan;
      const jamKeberangkatan = simpleJson.jam_keberangkatan;
      const metodePembayaran = simpleJson.metode_pembayaran;
      // Anda juga bisa menambahkan jumlah penumpang jika ada di data
      const jumlahPenumpang = simpleJson.jumlah_penumpang || 1; // Default ke 1 jika tidak ada

      // Menampilkan variabel-variabel yang sudah diekstrak di log server
      console.log("--- Variabel Siap Pakai ---");
      console.log(`Asal: ${stasiunAsal}`);
      console.log(`Tujuan: ${stasiunTujuan}`);
      console.log(`Tanggal: ${tanggalKeberangkatan}`);
      console.log(`Jam: ${jamKeberangkatan}`);
      console.log(`Penumpang: ${jumlahPenumpang}`);
      console.log(`Metode Bayar: ${metodePembayaran}`);
      console.log("--------------------------");
      
      // B. (Contoh) Persiapkan objek untuk disimpan ke database
      // Ini adalah contoh langkah "Augmentasi" data
      const pesananUntukDatabase = {
        orderId: `KAI-${Date.now()}`, // Membuat ID unik
        status: 'PENDING_PAYMENT',
        originStation: stasiunAsal,
        destinationStation: stasiunTujuan,
        departureDate: tanggalKeberangkatan,
        departureTime: jamKeberangkatan,
        passengerCount: jumlahPenumpang,
        paymentMethod: metodePembayaran,
        createdAt: new Date().toISOString(),
      };
      
      console.log("Objek yang akan disimpan ke database:", pesananUntukDatabase);
      
      // C. Di sinilah Anda akan memanggil fungsi untuk menyimpan ke database
      // await saveOrderToDatabase(pesananUntukDatabase);
      
      // ------------------------------------

      // 4. Kirim respons sukses kembali ke ElevenLabs
      return NextResponse.json({ 
        status: "success", 
        message: "Webhook processed successfully and data extracted",
        extractedData: pesananUntukDatabase // Mengirim kembali data yang sudah diproses
      }, { status: 200 });

    } else {
      // Jika payload tidak valid
      return NextResponse.json({ 
        status: "error", 
        message: "Invalid payload format or no data found" 
      }, { status: 400 });
    }

  } catch (error) {
    console.error("Error saat memproses webhook:", error);
    return NextResponse.json({ 
      status: "error", 
      message: "Internal Server Error" 
    }, { status: 500 });
  }
}
