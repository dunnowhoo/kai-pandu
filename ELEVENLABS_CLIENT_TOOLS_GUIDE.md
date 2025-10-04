# 🎯 Panduan Lengkap: Membuat Client Tools di ElevenLabs

## 📚 Daftar Isi
1. [Apa itu Client Tools?](#apa-itu-client-tools)
2. [Kenapa Pakai Client Tools?](#kenapa-pakai-client-tools)
3. [Setup Step-by-Step](#setup-step-by-step)
4. [Tool 1: bookTicket](#tool-1-bookticket)
5. [Tool 2: navigateToPage](#tool-2-navigatetopage)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Apa itu Client Tools?

**Client Tools** adalah function yang bisa dipanggil oleh ElevenLabs Agent dan dijalankan **langsung di browser pengguna** (bukan di server).

### Perbedaan Client vs Server Tools:

| Aspek | Client Tools ✅ | Server Tools ❌ |
|-------|----------------|----------------|
| Eksekusi | Di browser user | Di server backend |
| Kecepatan | Instant | Perlu HTTP request |
| Akses DOM | ✅ Bisa | ❌ Tidak bisa |
| Navigasi | ✅ Bisa router.push | ❌ Tidak bisa |
| Real-time UI | ✅ Bisa update langsung | ❌ Perlu polling |

---

## Kenapa Pakai Client Tools?

Untuk aplikasi KAI Pandu, kita perlu:
- ✅ **Navigasi instant** ke halaman lain
- ✅ **Pass data** dari voice ke form
- ✅ **Update UI** real-time
- ✅ **Tanpa latency** server roundtrip

**Client Tools adalah solusi yang tepat!**

---

## Setup Step-by-Step

### Langkah 1: Login ke ElevenLabs

1. Buka https://elevenlabs.io
2. Login ke account Anda
3. Pilih menu **"Conversational AI"** di sidebar

### Langkah 2: Pilih Agent

1. Klik agent yang ingin Anda edit (atau buat agent baru)
2. Masuk ke tab **"Configuration"**
3. Scroll ke section **"Client Tools"**

### Langkah 3: Tambah Client Tool

Klik tombol **"+ Add Client Tool"**

---

## Tool 1: bookTicket

Tool ini digunakan untuk booking tiket kereta.

### 📋 Configuration

**Tool Name:**
```
bookTicket
```

**Description:**
```
Use this tool when the user wants to book a train ticket. 
This will navigate to the ticket booking page with the collected information.
Call this after you have gathered: departure station, destination station, and travel date.
```

**Parameters (JSON Schema):**
```json
{
  "type": "object",
  "properties": {
    "from": {
      "type": "string",
      "description": "Departure station name. Examples: 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bogor'"
    },
    "to": {
      "type": "string",
      "description": "Destination station name. Examples: 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bogor'"
    },
    "date": {
      "type": "string",
      "description": "Travel date in Indonesian format. Examples: '10 Oktober 2025', '15 November 2025'. Can also accept YYYY-MM-DD format."
    }
  },
  "required": ["from", "to", "date"]
}
```

### ⚙️ Settings

- **Tool Type:** `client` ⚠️ **PENTING: Harus client, bukan server!**
- **Required:** ✅ Yes (centang semua 3 parameters: from, to, date)

### 💡 Kapan Tool Ini Dipanggil?

Agent akan memanggil tool ini ketika:
- User bilang: "Saya mau booking tiket"
- User bilang: "Pesan tiket dari Jakarta ke Bandung"
- User bilang: "Book ticket untuk besok"
- User selesai memberikan: stasiun asal, stasiun tujuan, dan tanggal

### 📝 Contoh Conversation Flow:

**Flow 1: User langsung bilang "booking tiket" (tanpa detail)**
```
User: "booking tiket"

[Agent IMMEDIATELY calls bookTicket tool with default values:]
{
  "from": "Jakarta",
  "to": "Bandung",
  "date": "4 Oktober 2025"
}

[Browser navigates to /pandu-app/tiket instantly]

Agent: "Baik, membuka halaman booking tiket..."

[User now on ticket page where they can update the form with real details]
```

**Flow 2: User memberikan detail lengkap**
```
User: "Saya mau booking tiket dari Bogor ke Surabaya tanggal 10 Oktober"

[Agent IMMEDIATELY calls bookTicket tool:]
{
  "from": "Bogor",
  "to": "Surabaya", 
  "date": "10 Oktober 2025"
}

[Browser receives event and navigates to /pandu-app/tiket]

Agent: "Baik, membuka halaman booking dari Bogor ke Surabaya..."

[Form auto-fills with the data and shows train schedules]
```

**Flow 3: User memberikan detail sebagian**
```
User: "pesan tiket ke Surabaya besok"

[Agent IMMEDIATELY calls bookTicket tool with smart defaults:]
{
  "from": "Jakarta",  // default
  "to": "Surabaya",   // from user
  "date": "5 Oktober 2025"  // besok = tomorrow
}

[Browser navigates to /pandu-app/tiket]

Agent: "Baik, membuka halaman booking ke Surabaya..."

[User can change "from" station in the form if needed]
```

---

## Tool 2: navigateToPage

Tool ini digunakan untuk navigasi ke halaman lain.

### 📋 Configuration

**Tool Name:**
```
navigateToPage
```

**Description:**
```
Use this tool to navigate to different pages in the app.
- Use 'navigation' when user wants AR navigation or directions
- Use 'bantuan' or 'help' when user needs assistance or wants to call staff
```

**Parameters (JSON Schema):**
```json
{
  "type": "object",
  "properties": {
    "view": {
      "type": "string",
      "enum": ["navigation", "bantuan", "help"],
      "description": "The page to navigate to. Options: 'navigation' for AR navigation, 'bantuan' or 'help' for calling assistance"
    }
  },
  "required": ["view"]
}
```

### ⚙️ Settings

- **Tool Type:** `client` ⚠️ **PENTING: Harus client!**
- **Required:** ✅ Yes (parameter view harus ada)

### 💡 Kapan Tool Ini Dipanggil?

Agent akan memanggil tool ini ketika:
- User bilang: "Bawa saya ke navigasi"
- User bilang: "Saya perlu bantuan"
- User bilang: "Panggil petugas"
- User bilang: "Tolong arahkan saya"

### 📝 Contoh Conversation Flow:

**Scenario 1: User bilang "navigasi" saja**
```
User: "navigasi"

[Agent IMMEDIATELY calls navigateToPage:]
{
  "view": "navigation"
}

[Browser navigates to /pandu-app/navigasi with AR camera instantly]

Agent: "Baik, mengaktifkan navigasi AR..."

[Camera opens, user can now scan their surroundings]
```

**Scenario 2: User tanya lokasi spesifik**
```
User: "Bawa saya ke platform 3"

[Agent IMMEDIATELY calls navigateToPage:]
{
  "view": "navigation"
}

[Browser navigates to /pandu-app/navigasi with AR camera]

Agent: "Baik, mengaktifkan navigasi ke platform 3..."

[AR navigation shows directions to platform 3]
```

**Scenario 3: User butuh bantuan**
```
User: "Saya butuh bantuan petugas"

[Agent IMMEDIATELY calls navigateToPage:]
{
  "view": "bantuan"
}

[Browser navigates to /pandu-app/bantuan instantly]

Agent: "Baik, menghubungkan Anda dengan petugas..."

[Help form opens for user to submit request]
```

---

## 🎤 Update Agent Instructions

Setelah membuat tools, update **System Prompt** agent Anda:

```
You are KAI Pandu, a friendly and helpful voice assistant for Indonesian train travel.

Your main functions:
1. Help users book train tickets
2. Provide navigation assistance in stations
3. Connect users with staff for help

IMPORTANT INSTRUCTIONS:

PRIORITY RULE - IMMEDIATE NAVIGATION:
- If user's FIRST message indicates a clear intent, navigate IMMEDIATELY without asking questions
- Examples of immediate navigation triggers:
  * "booking tiket" / "pesan tiket" / "beli tiket" → Call bookTicket tool (ask for missing details AFTER navigation)
  * "navigasi" / "arahkan saya" / "ke platform" / "dimana" → Call navigateToPage(view="navigation") IMMEDIATELY
  * "bantuan" / "panggil petugas" / "butuh tolong" → Call navigateToPage(view="bantuan") IMMEDIATELY
- The goal is to be RESPONSIVE and FAST - navigate first, collect details later if needed

For Ticket Booking:
- If user says anything about booking/buying tickets, IMMEDIATELY call bookTicket tool
- You can use placeholder values if information is missing:
  * If missing "from": use "Jakarta" as default
  * If missing "to": use "Bandung" as default  
  * If missing "date": use current date
- After navigation, the form will help collect proper information
- Examples: 
  * User: "booking tiket" → IMMEDIATE: bookTicket(from="Jakarta", to="Bandung", date="4 Oktober 2025")
  * User: "pesan tiket ke Surabaya" → IMMEDIATE: bookTicket(from="Jakarta", to="Surabaya", date="4 Oktober 2025")
  * User: "booking dari Bogor ke Surabaya tanggal 10 Oktober" → IMMEDIATE: bookTicket(from="Bogor", to="Surabaya", date="10 Oktober 2025")

For Navigation:
- If user mentions navigation/directions/location AT ALL, call navigateToPage IMMEDIATELY with view="navigation"
- Don't ask questions - just navigate
- Examples: 
  * "navigasi" → IMMEDIATE: navigateToPage(view="navigation")
  * "bawa saya ke platform 3" → IMMEDIATE: navigateToPage(view="navigation")
  * "dimana toilet?" → IMMEDIATE: navigateToPage(view="navigation")
  * "arahkan saya" → IMMEDIATE: navigateToPage(view="navigation")

For Help/Bantuan:
- If user asks for help/assistance/staff, call navigateToPage IMMEDIATELY with view="bantuan"
- Examples: 
  * "bantuan" → IMMEDIATE: navigateToPage(view="bantuan")
  * "saya butuh bantuan" → IMMEDIATE: navigateToPage(view="bantuan")
  * "panggil petugas" → IMMEDIATE: navigateToPage(view="bantuan")
  * "tolong saya" → IMMEDIATE: navigateToPage(view="bantuan")

RESPONSE STYLE:
- Keep responses SHORT and ACTION-ORIENTED
- After calling a tool, say something brief like:
  * "Baik, membuka halaman booking..." (for bookTicket)
  * "Baik, mengaktifkan navigasi..." (for navigation)
  * "Baik, menghubungkan dengan petugas..." (for bantuan)
- Don't over-explain - the UI will guide the user

Remember: Speed and responsiveness are key. Navigate FIRST, collect details LATER.
```

---

## 🧪 Testing

### Test 1: Manual Test di Browser

1. Deploy aplikasi Anda
2. Buka `/pandu-app`
3. Buka Browser Console (F12)
4. Jalankan:

```javascript
// Simulasi ElevenLabs calling bookTicket tool
const event = new CustomEvent('bookTicket', {
  detail: {
    from: 'Jakarta',
    to: 'Bandung',
    date: '15 Oktober 2025'
  }
});
window.dispatchEvent(event);
```

**Expected Result:**
- Halaman redirect ke `/pandu-app/tiket`
- Form terisi dengan: Jakarta → Bandung, 15 Oktober 2025
- Otomatis search jadwal kereta

### Test 2: Test dengan ElevenLabs Widget

**Test A: Immediate Navigation dengan Kata Kunci**

1. Embed ElevenLabs widget di halaman Anda
2. Klik microphone
3. **Test Case 1 - Single Word Trigger:**
   - Bilang: "booking"
   - Expected: Langsung redirect ke `/pandu-app/tiket` dengan default values
   
4. **Test Case 2 - Partial Details:**
   - Bilang: "pesan tiket ke Bandung"
   - Expected: Langsung redirect ke `/pandu-app/tiket` dengan to="Bandung"
   
5. **Test Case 3 - Complete Details:**
   - Bilang: "booking tiket dari Bogor ke Surabaya tanggal 10 Oktober"
   - Expected: Langsung redirect dengan semua data terisi

**Test B: Navigation Immediate Response**

1. **Test Case 1 - Simple Navigation:**
   - Bilang: "navigasi"
   - Expected: Langsung buka `/pandu-app/navigasi` dengan AR camera
   
2. **Test Case 2 - Location Query:**
   - Bilang: "dimana toilet?"
   - Expected: Langsung buka `/pandu-app/navigasi`

**Test C: Bantuan Immediate Response**

1. Bilang: "bantuan"
2. Expected: Langsung redirect ke `/pandu-app/bantuan`

**Console Logs yang Harus Muncul:**
   - `🎫 Ticket booking data received from ElevenLabs:`
   - `✅ Redirecting to ticket page with data:`
   - `🚀 Sent ticket search event:`

### Test 3: Test Navigation

1. Di halaman `/pandu-app`
2. Bilang: "Bawa saya ke navigasi"
3. Halaman harus redirect ke `/pandu-app/navigasi`

---

## 🐛 Troubleshooting

### Problem 1: Tool tidak terpanggil

**Symptoms:**
- User sudah berikan data lengkap tapi tidak ada aksi
- Console tidak ada log

**Solutions:**
1. ✅ Pastikan Tool Type = `client` (bukan server)
2. ✅ Pastikan tool di-enable di agent config
3. ✅ Pastikan agent instructions jelas kapan harus call tool
4. ✅ Test dengan prompt yang explicit: "booking tiket dari X ke Y tanggal Z"

### Problem 2: Event diterima tapi tidak navigate

**Symptoms:**
- Console log `🎫 Ticket booking data received`
- Tapi halaman tidak redirect

**Solutions:**
1. Check Console untuk error messages
2. Pastikan `useRouter` dari Next.js sudah initialized
3. Check apakah route `/pandu-app/tiket` exists
4. Reload halaman dan coba lagi

### Problem 3: Navigate berhasil tapi data tidak terkirim

**Symptoms:**
- Halaman redirect OK
- Tapi form di halaman tiket kosong

**Solutions:**
1. Check timing - event harus dispatch SETELAH halaman loaded
2. Pastikan delay 500ms cukup (bisa ditambah jadi 1000ms)
3. Check Console di halaman tiket untuk log `🎫 Received ticket search data`
4. Pastikan event listener di `tiket/page.tsx` sudah terpasang

### Problem 4: Agent bilang "tool call failed"

**Symptoms:**
- Agent bilang error atau tool gagal
- Console error di ElevenLabs

**Solutions:**
1. Pastikan parameter format benar (cek JSON schema)
2. Pastikan semua required fields terisi
3. Check ElevenLabs dashboard untuk error logs
4. Pastikan Client Tools sudah di-save dengan benar

---

## 📊 Monitoring

### Console Logs yang Harus Muncul:

**Saat bookTicket dipanggil:**
```
🎫 Ticket booking data received from ElevenLabs: {from: 'Jakarta', to: 'Bandung', date: '15 Oktober 2025'}
✅ Redirecting to ticket page with data: {from: 'Jakarta', to: 'Bandung', date: '15 Oktober 2025'}
System: 📍 Mengarahkan ke halaman pemesanan tiket...
🚀 Sent ticket search event: {from: 'Jakarta', to: 'Bandung', date: '15 Oktober 2025'}
```

**Saat navigateToPage dipanggil:**
```
🎯 Custom navigation event received: {view: 'navigation'}
🚀 Navigating to navigasi page
```

---

## ✅ Checklist Setup

- [ ] Login ke ElevenLabs
- [ ] Buka Conversational AI
- [ ] Pilih/buat agent
- [ ] Tambah Client Tool: `bookTicket`
  - [ ] Set type = `client`
  - [ ] Copy JSON schema untuk parameters
  - [ ] Mark semua required fields
- [ ] Tambah Client Tool: `navigateToPage`
  - [ ] Set type = `client`
  - [ ] Copy JSON schema untuk parameters
  - [ ] Mark required field
- [ ] Update System Prompt / Agent Instructions
- [ ] Save agent configuration
- [ ] Test manual di browser (F12 Console)
- [ ] Test dengan voice input
- [ ] Monitor Console logs
- [ ] Deploy ke production

---

## 🎉 Success Indicators

Anda berhasil jika:
1. ✅ Agent merespons dengan natural
2. ✅ Tool dipanggil otomatis saat data lengkap
3. ✅ Navigasi smooth tanpa error
4. ✅ Data terkirim dan form auto-fill
5. ✅ User experience seamless dari voice ke UI

---

## 📞 Support

Jika masih ada masalah:
1. Check semua console logs
2. Lihat ElevenLabs dashboard untuk error logs
3. Pastikan browser support CustomEvents
4. Test di browser berbeda (Chrome/Firefox/Safari)
5. Check network tab untuk failed requests

Happy coding! 🚀
