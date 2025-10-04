# 📋 Daftar Lengkap Client Tools untuk KAI Pandu

## 🎯 Overview

Berdasarkan analisa aplikasi KAI Pandu, berikut adalah daftar lengkap Client Tools yang dibutuhkan untuk mendukung semua fitur voice assistant.

---

## ✅ Client Tools yang Sudah Dibuat

### 1. **bookTicket** ✅
**Status:** Sudah dibuat dan terdokumentasi

**Fungsi:** Navigasi ke halaman booking tiket dengan data yang dikumpulkan dari voice

**Parameters:**
```json
{
  "from": "string",     // Stasiun keberangkatan
  "to": "string",       // Stasiun tujuan
  "date": "string"      // Tanggal perjalanan
}
```

**Route:** `/pandu-app/tiket`

**Trigger Keywords:**
- "booking tiket"
- "pesan tiket"
- "beli tiket"
- "saya mau booking"

---

### 2. **navigateToPage** ✅
**Status:** Sudah dibuat dan terdokumentasi

**Fungsi:** Navigasi ke halaman navigasi atau bantuan

**Parameters:**
```json
{
  "view": "navigation" | "bantuan" | "help"
}
```

**Routes:**
- `view="navigation"` → `/pandu-app/navigasi`
- `view="bantuan"` → `/pandu-app/bantuan`

**Trigger Keywords:**
- Navigation: "navigasi", "arahkan saya", "dimana"
- Bantuan: "bantuan", "tolong", "panggil petugas"

---

## 🚀 Client Tools yang Perlu Dibuat

### 3. **checkTrainSchedule** 🆕
**Priority:** HIGH

**Fungsi:** Cek jadwal kereta tanpa harus booking

**Use Case:**
- User mau cek jadwal dulu sebelum booking
- User tanya "Ada kereta apa saja dari Jakarta ke Bandung?"
- User mau compare harga dan waktu

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "from": {
      "type": "string",
      "description": "Departure station name"
    },
    "to": {
      "type": "string",
      "description": "Destination station name"
    },
    "date": {
      "type": "string",
      "description": "Travel date (optional, default to today)"
    }
  },
  "required": ["from", "to"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleCheckSchedule = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { from, to, date } = customEvent.detail || {};
    
    addToTranscript('system', `📅 Mengecek jadwal kereta ${from} → ${to}...`);
    router.push(`/pandu-app/tiket?from=${from}&to=${to}&date=${date || ''}&autoSearch=true`);
  };
  
  window.addEventListener('checkTrainSchedule', handleCheckSchedule);
  return () => window.removeEventListener('checkTrainSchedule', handleCheckSchedule);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "cek jadwal kereta"
- "ada kereta apa saja"
- "lihat jadwal"
- "kapan ada kereta"

---

### 4. **findStation** 🆕
**Priority:** MEDIUM

**Fungsi:** Cari informasi tentang stasiun tertentu

**Use Case:**
- User tanya "Dimana stasiun Gambir?"
- User mau tahu fasilitas stasiun
- User mau navigasi ke stasiun tertentu

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "stationName": {
      "type": "string",
      "description": "Name of the station. Examples: 'Gambir', 'Pasar Senen', 'Yogyakarta'"
    },
    "query": {
      "type": "string",
      "enum": ["location", "facilities", "navigate"],
      "description": "What user wants to know: location info, facilities, or navigation"
    }
  },
  "required": ["stationName"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleFindStation = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { stationName, query } = customEvent.detail || {};
    
    if (query === 'navigate') {
      addToTranscript('system', `🗺️ Membuka navigasi ke ${stationName}...`);
      router.push(`/pandu-app/navigasi?destination=${stationName}`);
    } else {
      addToTranscript('system', `ℹ️ Mencari informasi stasiun ${stationName}...`);
      // Bisa buat halaman info stasiun atau show modal
    }
  };
  
  window.addEventListener('findStation', handleFindStation);
  return () => window.removeEventListener('findStation', handleFindStation);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "dimana stasiun X"
- "informasi stasiun X"
- "fasilitas di stasiun X"
- "cara ke stasiun X"

---

### 5. **requestAssistance** 🆕
**Priority:** HIGH (Safety Feature)

**Fungsi:** Panggil bantuan darurat atau request petugas

**Use Case:**
- User butuh bantuan mendesak
- User tersesat di stasiun
- User butuh wheelchair assistance
- Emergency situations

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "urgency": {
      "type": "string",
      "enum": ["emergency", "urgent", "normal"],
      "description": "Level of urgency"
    },
    "assistanceType": {
      "type": "string",
      "enum": ["medical", "navigation", "wheelchair", "general"],
      "description": "Type of assistance needed"
    },
    "location": {
      "type": "string",
      "description": "Current location if known (optional)"
    },
    "message": {
      "type": "string",
      "description": "Additional message from user (optional)"
    }
  },
  "required": ["urgency", "assistanceType"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleRequestAssistance = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { urgency, assistanceType, location, message } = customEvent.detail || {};
    
    if (urgency === 'emergency') {
      addToTranscript('system', `🚨 EMERGENCY - Menghubungi petugas segera!`);
      // Auto-send to security dashboard
    } else {
      addToTranscript('system', `🆘 Memproses permintaan bantuan ${assistanceType}...`);
    }
    
    router.push(`/pandu-app/bantuan?urgency=${urgency}&type=${assistanceType}&location=${location || ''}`);
  };
  
  window.addEventListener('requestAssistance', handleRequestAssistance);
  return () => window.removeEventListener('requestAssistance', handleRequestAssistance);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "tolong!" / "help!" → emergency
- "saya butuh bantuan" → urgent
- "panggil petugas" → normal
- "wheelchair" → wheelchair assistance
- "saya tersesat" → navigation assistance

---

### 6. **checkMyTicket** 🆕
**Priority:** MEDIUM

**Fungsi:** Lihat detail tiket yang sudah dibeli

**Use Case:**
- User lupa nomor kursi
- User mau cek jam keberangkatan
- User mau lihat boarding info

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "bookingCode": {
      "type": "string",
      "description": "Booking reference code (optional if user is logged in)"
    },
    "query": {
      "type": "string",
      "enum": ["seat", "time", "platform", "all"],
      "description": "What info user wants to check"
    }
  }
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleCheckMyTicket = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { bookingCode, query } = customEvent.detail || {};
    
    addToTranscript('system', `🎫 Membuka detail tiket Anda...`);
    router.push(`/pandu-app/my-ticket${bookingCode ? `?code=${bookingCode}` : ''}`);
  };
  
  window.addEventListener('checkMyTicket', handleCheckMyTicket);
  return () => window.removeEventListener('checkMyTicket', handleCheckMyTicket);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "lihat tiket saya"
- "kursi saya nomor berapa"
- "jam berapa kereta saya"
- "dimana platform saya"

---

### 7. **navigateInStation** 🆕
**Priority:** HIGH

**Fungsi:** Navigasi ke lokasi spesifik di dalam stasiun

**Use Case:**
- User mau ke toilet
- User cari musholla
- User mau ke loket
- User mau ke platform tertentu

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "destination": {
      "type": "string",
      "enum": ["toilet", "musholla", "loket", "platform", "exit", "cafe", "atm", "waiting-room"],
      "description": "Destination type in the station"
    },
    "platformNumber": {
      "type": "string",
      "description": "Platform number if destination is 'platform' (e.g., '1', '2', '3')"
    },
    "exitName": {
      "type": "string",
      "description": "Exit name/direction if destination is 'exit' (e.g., 'north', 'south', 'A', 'B')"
    }
  },
  "required": ["destination"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleNavigateInStation = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { destination, platformNumber, exitName } = customEvent.detail || {};
    
    let target = destination;
    if (platformNumber) target = `platform-${platformNumber}`;
    if (exitName) target = `exit-${exitName}`;
    
    addToTranscript('system', `🧭 Mengaktifkan navigasi AR ke ${destination}...`);
    router.push(`/pandu-app/navigasi?target=${target}`);
  };
  
  window.addEventListener('navigateInStation', handleNavigateInStation);
  return () => window.removeEventListener('navigateInStation', handleNavigateInStation);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "dimana toilet?"
- "bawa saya ke musholla"
- "ke platform 3"
- "exit mana yang terdekat"
- "cari ATM"

---

### 8. **readInformation** 🆕
**Priority:** MEDIUM

**Fungsi:** Bacakan informasi dari papan pengumuman atau signage

**Use Case:**
- User minta bacakan papan informasi
- User mau dengar pengumuman terbaru
- User minta translate signage

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "infoType": {
      "type": "string",
      "enum": ["announcement", "signage", "schedule-board", "emergency"],
      "description": "Type of information to read"
    },
    "language": {
      "type": "string",
      "enum": ["id", "en"],
      "description": "Preferred language (default: 'id')"
    }
  },
  "required": ["infoType"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleReadInformation = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { infoType, language } = customEvent.detail || {};
    
    addToTranscript('system', `📢 Membacakan ${infoType}...`);
    
    // Activate camera to scan signage/boards
    router.push(`/pandu-app/navigasi?mode=read&type=${infoType}`);
  };
  
  window.addEventListener('readInformation', handleReadInformation);
  return () => window.removeEventListener('readInformation', handleReadInformation);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "bacakan pengumuman"
- "apa tulisan di papan ini"
- "baca signage"
- "ada pengumuman apa"

---

### 9. **setReminder** 🆕
**Priority:** LOW

**Fungsi:** Set reminder untuk boarding atau turun kereta

**Use Case:**
- User mau diingatkan 10 menit sebelum boarding
- User mau alarm sebelum sampai tujuan
- User takut kelewatan

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "reminderType": {
      "type": "string",
      "enum": ["boarding", "arrival", "custom"],
      "description": "Type of reminder"
    },
    "minutesBefore": {
      "type": "number",
      "description": "Minutes before event to trigger reminder (e.g., 10, 15, 30)"
    },
    "message": {
      "type": "string",
      "description": "Custom reminder message (optional)"
    }
  },
  "required": ["reminderType"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleSetReminder = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { reminderType, minutesBefore, message } = customEvent.detail || {};
    
    addToTranscript('system', `⏰ Reminder diset: ${reminderType} - ${minutesBefore} menit sebelumnya`);
    
    // Save to localStorage or state
    const reminder = {
      type: reminderType,
      time: minutesBefore || 10,
      message: message || `Waktunya ${reminderType}!`,
      timestamp: Date.now()
    };
    
    localStorage.setItem('kaiPanduReminder', JSON.stringify(reminder));
  };
  
  window.addEventListener('setReminder', handleSetReminder);
  return () => window.removeEventListener('setReminder', handleSetReminder);
}, [addToTranscript]);
```

**Trigger Keywords:**
- "ingatkan saya 10 menit sebelum boarding"
- "set alarm sebelum sampai"
- "jangan sampai saya kelewatan"

---

### 10. **cancelBooking** 🆕
**Priority:** LOW

**Fungsi:** Cancel atau reschedule booking

**Use Case:**
- User mau cancel tiket
- User mau reschedule
- User mau refund

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "bookingCode": {
      "type": "string",
      "description": "Booking reference code"
    },
    "action": {
      "type": "string",
      "enum": ["cancel", "reschedule", "refund"],
      "description": "Action to perform"
    },
    "reason": {
      "type": "string",
      "description": "Reason for cancellation (optional)"
    }
  },
  "required": ["bookingCode", "action"]
}
```

**Implementation Needed:**
```typescript
// Di pandu-app/page.tsx
useEffect(() => {
  const handleCancelBooking = (event: Event) => {
    const customEvent = event as CustomEvent;
    const { bookingCode, action, reason } = customEvent.detail || {};
    
    addToTranscript('system', `🔄 Memproses ${action} untuk booking ${bookingCode}...`);
    router.push(`/pandu-app/my-ticket?action=${action}&code=${bookingCode}`);
  };
  
  window.addEventListener('cancelBooking', handleCancelBooking);
  return () => window.removeEventListener('cancelBooking', handleCancelBooking);
}, [router, addToTranscript]);
```

**Trigger Keywords:**
- "cancel tiket saya"
- "reschedule booking"
- "mau refund"

---

## 📊 Priority Matrix

### Must Have (MVP) - Implement First 🔴
1. ✅ **bookTicket** - Sudah ada
2. ✅ **navigateToPage** - Sudah ada
3. 🆕 **requestAssistance** - Safety critical
4. 🆕 **navigateInStation** - Core feature
5. 🆕 **checkTrainSchedule** - Essential for booking flow

### Should Have (Phase 2) 🟡
6. 🆕 **checkMyTicket** - User convenience
7. 🆕 **findStation** - Navigation support
8. 🆕 **readInformation** - Accessibility feature

### Nice to Have (Future) 🟢
9. 🆕 **setReminder** - Enhancement
10. 🆕 **cancelBooking** - Advanced feature

---

## 🎯 Implementation Roadmap

### Week 1: MVP Tools
- [x] bookTicket ✅
- [x] navigateToPage ✅
- [ ] requestAssistance 🚨
- [ ] navigateInStation 🗺️
- [ ] checkTrainSchedule 📅

### Week 2: Essential Features
- [ ] checkMyTicket 🎫
- [ ] findStation 🏛️
- [ ] Update Agent Instructions
- [ ] Testing & Bug Fixes

### Week 3: Advanced Features
- [ ] readInformation 📢
- [ ] setReminder ⏰
- [ ] cancelBooking 🔄
- [ ] Final Integration Testing

---

## 📝 Agent Instructions Update Needed

Setelah semua tools dibuat, update System Prompt dengan:

```
AVAILABLE CLIENT TOOLS:
1. bookTicket - Book train tickets
2. navigateToPage - Navigate to app pages
3. checkTrainSchedule - Check train schedules
4. findStation - Find station information
5. requestAssistance - Emergency & assistance requests
6. checkMyTicket - View ticket details
7. navigateInStation - Navigate within station
8. readInformation - Read announcements/signage
9. setReminder - Set boarding/arrival reminders
10. cancelBooking - Cancel/reschedule tickets

PRIORITY RULES:
- Safety first: requestAssistance untuk emergency
- Navigation: navigateInStation untuk lokasi spesifik
- Booking flow: checkTrainSchedule → bookTicket → checkMyTicket
```

---

## 🧪 Testing Checklist

Untuk setiap Client Tool:
- [ ] JSON schema valid
- [ ] Event listener registered
- [ ] Navigation works correctly
- [ ] Data passed accurately
- [ ] Error handling implemented
- [ ] Console logs for debugging
- [ ] Voice triggers tested
- [ ] UX smooth & responsive

---

## 📞 Support & Maintenance

**File Locations:**
- Event listeners: `/src/app/pandu-app/page.tsx`
- Type definitions: `/src/types/elevenlabs.d.ts`
- Documentation: `/ELEVENLABS_CLIENT_TOOLS_GUIDE.md`
- Testing: `/TESTING_CLIENT_TOOLS.md`

**Key Dependencies:**
- Next.js `useRouter` for navigation
- CustomEvent API for browser events
- ElevenLabs Conversational AI SDK

---

## 🎉 Summary

**Total Client Tools Needed:** 10
- ✅ **Completed:** 2 (bookTicket, navigateToPage)
- 🆕 **To Build:** 8 (see list above)

**Estimated Development Time:**
- MVP (5 tools): 2-3 days
- Phase 2 (3 tools): 1-2 days
- Future (2 tools): 1 day
- **Total:** ~1 week for full implementation

**Impact:**
- Complete voice-controlled experience
- All major user journeys covered
- Safety & accessibility prioritized
- Scalable architecture for future features

Ready to start implementation! 🚀
