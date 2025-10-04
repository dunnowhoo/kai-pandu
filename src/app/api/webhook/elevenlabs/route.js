import { NextResponse } from 'next/server';

function getCleanData(webhookPayload) {
  const dataCollection = webhookPayload.analysis?.data_collection_results;

  if (!dataCollection) {
    console.log("Webhook diterima, tapi tidak ada 'data_collection_results'.");
    return null;
  }

  const cleanJson = {};
  for (const key in dataCollection) {
    if (dataCollection[key] && typeof dataCollection[key].value !== 'undefined') {
      cleanJson[key] = dataCollection[key].value;
    }
  }
  
  return Object.keys(cleanJson).length > 0 ? cleanJson : null;
}

export async function POST(request) {
  try {
    const webhookPayload = await request.json();
    const simpleJson = getCleanData(webhookPayload);


    if (simpleJson) {
      const stasiunAsal = simpleJson.stasiun_asal;
      const stasiunTujuan = simpleJson.stasiun_tujuan;
      const tanggalKeberangkatan = simpleJson.tanggal_keberangkatan;
      const jamKeberangkatan = simpleJson.jam_keberangkatan;
      const metodePembayaran = simpleJson.metode_pembayaran;
      const jumlahPenumpang = simpleJson.jumlah_penumpang || 1; 

      const pesananUntukDatabase = {
        orderId: `KAI-${Date.now()}`, 
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
    
      return NextResponse.json({ 
        status: "success", 
        message: "Webhook processed successfully and data extracted",
        extractedData: pesananUntukDatabase 
      }, { status: 200 });

    } else {
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
