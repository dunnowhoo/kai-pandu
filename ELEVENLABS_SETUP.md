# Setup ElevenLabs untuk KAI Pandu

## ⚠️ PENTING: Gunakan Client Tools, Bukan Server Tools!

Data yang dikumpulkan di ElevenLabs **harus menggunakan Client Tools** agar bisa langsung dikirim ke browser tanpa melalui webhook server.

---

## 🔧 Konfigurasi Client Tools di ElevenLabs

### 1. Buat Client Tool untuk Booking Tiket

Di dashboard ElevenLabs, tambahkan **Client Tool** dengan konfigurasi berikut:

**Tool Name:** `bookTicket`

**Description:**
```
Navigates to the ticket booking page with the user's departure station, destination station, and travel date. Use this when the user wants to book a train ticket.
```

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "from": {
      "type": "string",
      "description": "Departure station name (e.g., 'Jakarta', 'Bandung', 'Surabaya')"
    },
    "to": {
      "type": "string", 
      "description": "Destination station name (e.g., 'Jakarta', 'Bandung', 'Surabaya')"
    },
    "date": {
      "type": "string",
      "description": "Travel date in format 'YYYY-MM-DD' or 'DD Month YYYY' (e.g., '2025-10-10' or '10 Oktober 2025')"
    }
  },
  "required": ["from", "to", "date"]
}
```

**Tool Type:** `client`

---

### 2. Buat Client Tool untuk Navigasi

**Tool Name:** `navigateToPage`

**Description:**
```
Navigates to different pages in the app. Use this when user wants to go to navigation, help, or other pages.
```

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "view": {
      "type": "string",
      "enum": ["navigation", "help", "bantuan", "landing"],
      "description": "The page to navigate to"
    }
  },
  "required": ["view"]
}
```

**Tool Type:** `client`

---

## 📱 Cara Kerja

### Flow 1: Booking Tiket
```
User: "Saya mau booking tiket dari Bogor ke Surabaya tanggal 10 Oktober"
  ↓
ElevenLabs Agent mengumpulkan data: from="Bogor", to="Surabaya", date="10 Oktober 2025"
  ↓
ElevenLabs memanggil Client Tool "bookTicket" dengan parameters
  ↓
Browser menerima event 'bookTicket' di window
  ↓
App menangkap event di pandu-app/page.tsx
  ↓
Router.push ke /pandu-app/tiket
  ↓
Dispatch event 'submitTicketSearch' dengan data
  ↓
Halaman tiket menerima data dan otomatis mencari jadwal
```

### Flow 2: Navigasi
```
User: "Bawa saya ke navigasi"
  ↓
ElevenLabs memanggil Client Tool "navigateToPage" dengan view="navigation"
  ↓
Browser menerima event 'navigateToView'
  ↓
App redirect ke /pandu-app/navigasi
```

---

## 🎯 Event Listeners yang Sudah Dibuat

### Di `pandu-app/page.tsx`:

1. **bookTicket event** - Menangani data booking tiket
   ```javascript
   window.addEventListener('bookTicket', handleTicketBooking);
   ```

2. **navigateToView event** - Menangani navigasi halaman
   ```javascript
   window.addEventListener('navigateToView', handleNavigationEvent);
   ```

### Di `pandu-app/tiket/page.tsx`:

3. **submitTicketSearch event** - Menerima data dari pandu-app
   ```javascript
   window.addEventListener('submitTicketSearch', handleTicketSearch);
   ```

---

## ✅ Testing

### Test 1: Booking Tiket
1. Buka `/pandu-app`
2. Klik tombol "Pesan Tiket Kereta"
3. Katakan: "Saya mau booking dari Jakarta ke Bandung tanggal 15 Oktober 2025"
4. ElevenLabs akan memanggil `bookTicket` client tool
5. Halaman akan redirect ke `/pandu-app/tiket` dengan data terisi

### Test 2: Navigasi
1. Buka `/pandu-app`
2. Katakan: "Bawa saya ke navigasi"
3. ElevenLabs akan memanggil `navigateToPage` client tool
4. Halaman akan redirect ke `/pandu-app/navigasi`

---

## 🐛 Debugging

Buka Browser Console (F12) dan lihat log:
- `🎫 Ticket booking data received from ElevenLabs:` - Data diterima
- `✅ Redirecting to ticket page with data:` - Redirect berhasil
- `🚀 Sent ticket search event:` - Event dikirim ke halaman tiket
- `🎯 Custom navigation event received:` - Navigasi diterima

---

## 🔄 Migrasi dari Server Tools

**SEBELUM (❌ Server Tools):**
```
ElevenLabs → Webhook API (/api/webhook/elevenlabs) → Database
                                                        ↓
                                              (Data tidak sampai ke frontend)
```

**SESUDAH (✅ Client Tools):**
```
ElevenLabs → Browser Event → Frontend Handler → Router Push → Success!
```

---

## 📝 Data Collection vs Client Tools

### Data Collection (untuk analisis):
- Hanya untuk menyimpan data percakapan
- Tidak mengirim data ke frontend
- Berguna untuk analytics/reporting

### Client Tools (untuk aksi):
- Langsung mengirim event ke browser
- Bisa trigger navigasi dan aksi real-time
- **Ini yang harus dipakai untuk booking & navigasi!**

---

## 🎤 Contoh Prompt untuk Agent

Tambahkan ini di **Agent Instructions** ElevenLabs:

```
You are KAI Pandu, a helpful voice assistant for train travel in Indonesia.

When users want to book tickets:
1. Collect: departure station, destination station, and travel date
2. Call the bookTicket tool with the collected information
3. The page will automatically navigate to ticket booking

When users want navigation or help:
1. Call the navigateToPage tool with the appropriate view
2. The page will automatically navigate

Always be friendly and confirm information before calling tools.
```

---

## ⚡ Kecepatan Response

**Client Tools:** ⚡ Instant (langsung ke browser)
**Server Tools:** 🐌 Slow (harus lewat server → database → polling)

**Kesimpulan:** Gunakan Client Tools untuk UX yang lebih baik!
