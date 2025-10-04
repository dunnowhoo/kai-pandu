# 🎫 Ticket Booking Flow - KAI Pandu Voice Assistant

## Flow Diagram

```
User: "pesan tiket" / "booking" / "beli tiket"
         ↓
AI Voice Agent: Deteksi trigger words
         ↓
Call navigateToPage({ path: "ticket" })
         ↓
Navigate to /pandu-app/tiket
         ↓
AI Voice: "Baik, saya buka halaman pemesanan tiket untuk Anda."
         ↓
AI Voice: "Dari stasiun mana Anda ingin berangkat?"
         ↓
User: "Dari Gambir"
         ↓
AI Voice: "Baik, dari Gambir. Ke stasiun mana tujuan Anda?"
         ↓
User: "Ke Yogyakarta"
         ↓
AI Voice: "Baik, ke Yogyakarta. Tanggal berapa Anda ingin berangkat?"
         ↓
User: "Tanggal 10 Oktober"
         ↓
AI Voice: Collect semua data (from, to, date)
         ↓
Call submitTicketSearch({ 
  from: "Gambir", 
  to: "Yogyakarta", 
  date: "2025-10-10" 
})
         ↓
Event 'submitTicketSearch' dispatched
         ↓
Tiket Page: Listen event dan terima data
         ↓
Auto-fill form:
  - selectedOrigin = "Gambir"
  - selectedDestination = "Yogyakarta"  
  - selectedDate = "2025-10-10"
         ↓
Trigger handleFindSchedule(from, to, date)
         ↓
Generate tiket dengan data USER (bukan random!)
  - Origin: Gambir (dari user)
  - Destination: Yogyakarta (dari user)
  - Date: 2025-10-10 (dari user)
  - Train Name: Random (Argo Bromo, Taksaka, dll)
  - Class: Random (Eksekutif/Bisnis/Ekonomi)
  - Times: Random
  - Price: Random based on class
         ↓
Show loading overlay (2 detik)
         ↓
Save tiket ke localStorage
         ↓
Navigate ke /my-ticket
         ↓
Display tiket yang baru dibuat
```

## Implementation Details

### 1. Client Tools di conversation.tsx

**Tool: `submitTicketSearch`**
```typescript
submitTicketSearch: ({ from, to, date }: { 
  from: string; 
  to: string; 
  date: string; 
}) => {
  // Dispatch CustomEvent ke tiket page
  const searchData = { from, to, date };
  const event = new CustomEvent('submitTicketSearch', { 
    detail: searchData 
  });
  window.dispatchEvent(event);
  
  return "Mencari jadwal kereta untuk Anda...";
}
```

**Kapan dipanggil:**
- Setelah AI mengumpulkan 3 data: from, to, date
- AI sudah konfirmasi dengan user
- User sudah approve

### 2. Event Listener di tiket/page.tsx

```typescript
useEffect(() => {
  const handleTicketSearch = async (event: any) => {
    const { from, to, date } = event.detail;
    
    // Fill form dengan data dari user
    setSelectedOrigin(from);
    setSelectedDestination(to);
    setSelectedDate(date);
    
    // Auto-trigger search
    setTimeout(() => {
      handleFindSchedule(from, to, date);
    }, 500);
  };

  window.addEventListener('submitTicketSearch', handleTicketSearch);
  
  return () => {
    window.removeEventListener('submitTicketSearch', handleTicketSearch);
  };
}, []);
```

### 3. Updated handleFindSchedule Function

**Sebelum (SALAH):**
```typescript
const handleFindSchedule = async () => {
  // Random origin & destination
  const randomOrigin = stations[Math.floor(Math.random() * stations.length)];
  const randomDestination = stations[Math.floor(Math.random() * stations.length)];
  // ❌ Tidak pakai data user!
}
```

**Sesudah (BENAR):**
```typescript
const handleFindSchedule = async (
  origin?: string, 
  destination?: string, 
  searchDate?: string
) => {
  // Pakai data user atau fallback ke state
  const useOrigin = origin || selectedOrigin;
  const useDestination = destination || selectedDestination;
  const useDate = searchDate || selectedDate;
  
  // Validation
  if (!useOrigin || !useDestination || !useDate) {
    alert('Mohon lengkapi semua data pemesanan');
    return;
  }
  
  // Generate tiket dengan DATA USER ✅
  const dummyTicket = {
    departure: {
      station: useOrigin, // ✅ Dari user input
      ...
    },
    arrival: {
      station: useDestination, // ✅ Dari user input
      date: formatDate(useDate) // ✅ Dari user input
    },
    // Train details tetap random
    trainName: randomTrainName,
    class: randomClass,
    price: randomPrice
  };
}
```

## Trigger Words

Voice assistant akan detect keywords berikut:

| Trigger Words | Action |
|---------------|--------|
| "pesan tiket" | Navigate to ticket page |
| "booking" | Navigate to ticket page |
| "beli tiket" | Navigate to ticket page |
| "pesan kereta" | Navigate to ticket page |
| "book train" | Navigate to ticket page |

## Voice Agent Conversation Flow

### Step 1: Initial Trigger
```
User: "Saya mau pesan tiket"
AI: "Baik, saya buka halaman pemesanan tiket untuk Anda."
[Navigate to /pandu-app/tiket]
```

### Step 2: Ask Origin
```
AI: "Dari stasiun mana Anda ingin berangkat?"
User: "Dari Gambir"
AI: [Simpan: from = "Gambir"]
```

### Step 3: Ask Destination
```
AI: "Baik, dari Gambir. Ke stasiun mana tujuan Anda?"
User: "Ke Surabaya"
AI: [Simpan: to = "Surabaya"]
```

### Step 4: Ask Date
```
AI: "Ke Surabaya, baik. Tanggal berapa Anda ingin berangkat?"
User: "Besok" / "Tanggal 15 Oktober" / "Minggu depan"
AI: [Parse tanggal → date = "2025-10-15"]
```

### Step 5: Confirmation & Submit
```
AI: "Baik, saya akan carikan jadwal kereta dari Gambir ke Surabaya 
     untuk tanggal 15 Oktober 2025. Mohon tunggu sebentar..."

[Call submitTicketSearch({ 
  from: "Gambir", 
  to: "Surabaya", 
  date: "2025-10-15" 
})]

[Auto-fill form → Loading 2 detik → Generate tiket → Navigate to /my-ticket]
```

## Data Flow

### Input (dari User via Voice)
- **from**: String - Stasiun keberangkatan (e.g., "Gambir", "Pasar Senen")
- **to**: String - Stasiun tujuan (e.g., "Surabaya", "Yogyakarta")
- **date**: String - Tanggal keberangkatan (format: "YYYY-MM-DD")

### Processing (Random Generation)
- **trainName**: Random dari 10 pilihan
- **class**: Random (Eksekutif/Bisnis/Ekonomi Premium)
- **departureTime**: Random 05:00-22:00
- **arrivalTime**: Random (departure + 3-10 jam)
- **price**: Random based on class
  - Eksekutif: Rp 300.000 - 500.000
  - Bisnis: Rp 200.000 - 300.000
  - Ekonomi: Rp 100.000 - 180.000
- **orderCode**: Random (e.g., "RVGX7K2")

### Output (Saved to localStorage)
```json
{
  "orderCode": "RVGX7K2",
  "trainName": "ARGO BROMO ANGGREK",
  "class": "Eksekutif",
  "trainNumber": "No Train 237",
  "category": "intercity",
  "departure": {
    "time": "08:00",
    "station": "GAMBIR (GAM)",
    "date": "Kamis 15 Oktober 2025"
  },
  "arrival": {
    "time": "15:30",
    "station": "SURABAYA GUBENG (SGB)",
    "date": "Kamis 15 Oktober 2025"
  },
  "price": "Rp 450.000",
  "purchaseDate": "2025-10-04T12:30:45.123Z"
}
```

## Comparison: Old vs New Flow

### ❌ OLD FLOW (Redundant & Random)
```
User: "pesan tiket"
  ↓
confirmTicketBooking → navigate + pass params
  ↓
Tiket page: receive params, fill form
  ↓
handleFindSchedule → IGNORE user data, use random!
  ↓
Generate dengan origin/destination RANDOM ❌
```

### ✅ NEW FLOW (Clean & User-Driven)
```
User: "pesan tiket"
  ↓
navigateToPage → open ticket page
  ↓
AI collect data via conversation (from, to, date)
  ↓
submitTicketSearch → dispatch event with user data
  ↓
handleFindSchedule → USE user data ✅
  ↓
Generate dengan origin/destination SESUAI USER ✅
```

## Benefits of New Flow

1. **✅ Linear & Intuitive**
   - Navigate → Ask → Collect → Submit
   - No redundant navigation

2. **✅ User Data Respected**
   - Tiket generated sesuai request user
   - Origin & destination match user input
   - Date match user request

3. **✅ Natural Conversation**
   - AI bertanya satu-satu
   - User jawab natural via voice
   - AI konfirmasi sebelum submit

4. **✅ Clean Code**
   - Single event: `submitTicketSearch`
   - Clear separation: conversation ↔ page
   - No parameter passing via URL

## Testing Scenarios

### Scenario 1: Complete Voice Flow
```
User: "Saya mau pesan tiket kereta"
AI: Navigate + ask questions
User: Answers (Gambir, Yogyakarta, 2025-10-10)
AI: Submit search
Result: Tiket Gambir → Yogyakarta created ✅
```

### Scenario 2: Manual Button Click
```
User: Manually open /pandu-app/tiket
User: Fill form manually
User: Click "Find Schedule" button
Result: Tiket created with form data ✅
```

### Scenario 3: Mixed Input
```
User: "pesan tiket"
AI: Navigate to ticket page
User: Fill form partially via voice
User: Complete form manually
User: Click button or continue voice
Result: Works both ways ✅
```

## Error Handling

### Validation
```typescript
if (!useOrigin || !useDestination || !useDate) {
  alert('Mohon lengkapi semua data pemesanan');
  return;
}
```

### Edge Cases
- **User cancels mid-conversation**: Form stays empty, no ticket created
- **Invalid date**: AI should parse and validate
- **Unknown station**: AI should suggest valid stations
- **Network error**: Show error message, don't navigate

## Future Enhancements

1. **Real API Integration**
   - Replace dummy data with actual KAI API
   - Real-time seat availability
   - Actual pricing

2. **Payment Integration**
   - Add payment gateway
   - Generate real booking code
   - Send confirmation email/SMS

3. **More Questions**
   - Number of passengers
   - Preferred class (Eksekutif/Bisnis/Ekonomi)
   - Seat preferences (window/aisle)
   - Round trip option

4. **Smart Date Parsing**
   - "besok" → tomorrow's date
   - "minggu depan" → next week
   - "tanggal 15" → 15th of current/next month

---

**Last Updated**: October 4, 2025  
**Status**: ✅ Implemented & Working
