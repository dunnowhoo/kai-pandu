# Testing Client Tools di Browser

## 🧪 Manual Testing (Tanpa ElevenLabs)

Untuk testing apakah event listener berfungsi tanpa perlu setup ElevenLabs, buka Browser Console (F12) dan jalankan:

### Test 1: Booking Tiket

```javascript
// Simulasi ElevenLabs mengirim event bookTicket
const bookingEvent = new CustomEvent('bookTicket', {
  detail: {
    from: 'Jakarta',
    to: 'Bandung', 
    date: '15 Oktober 2025'
  }
});
window.dispatchEvent(bookingEvent);
```

**Expected Result:**
- Console log: `🎫 Ticket booking data received from ElevenLabs:`
- Console log: `✅ Redirecting to ticket page with data:`
- Halaman redirect ke `/pandu-app/tiket`
- Setelah 500ms, console log: `🚀 Sent ticket search event:`
- Form di halaman tiket terisi otomatis

---

### Test 2: Navigasi ke Halaman Navigasi

```javascript
const navEvent = new CustomEvent('navigateToView', {
  detail: {
    view: 'navigation'
  }
});
window.dispatchEvent(navEvent);
```

**Expected Result:**
- Console log: `🎯 Custom navigation event received:`
- Console log: `🚀 Navigating to navigasi page`
- Halaman redirect ke `/pandu-app/navigasi`

---

### Test 3: Navigasi ke Halaman Bantuan

```javascript
const helpEvent = new CustomEvent('navigateToView', {
  detail: {
    view: 'bantuan'
  }
});
window.dispatchEvent(helpEvent);
```

**Expected Result:**
- Console log: `🎯 Custom navigation event received:`
- Console log: `🚀 Navigating to bantuan page`
- Halaman redirect ke `/pandu-app/bantuan`

---

## 🎯 Testing dengan ElevenLabs Client SDK

Jika menggunakan ElevenLabs Conversational AI SDK di browser:

```javascript
// Contoh setup conversation dengan client tools
const conversation = await Conversation.startSession({
  agentId: 'YOUR_AGENT_ID',
  
  // Handler untuk client tools
  clientTools: {
    bookTicket: async ({ from, to, date }) => {
      console.log('ElevenLabs called bookTicket:', { from, to, date });
      
      // Dispatch event ke window
      const event = new CustomEvent('bookTicket', {
        detail: { from, to, date }
      });
      window.dispatchEvent(event);
      
      return {
        success: true,
        message: `Mengarahkan ke halaman booking tiket dari ${from} ke ${to}`
      };
    },
    
    navigateToPage: async ({ view }) => {
      console.log('ElevenLabs called navigateToPage:', { view });
      
      // Dispatch event ke window
      const event = new CustomEvent('navigateToView', {
        detail: { view }
      });
      window.dispatchEvent(event);
      
      return {
        success: true,
        message: `Navigasi ke halaman ${view}`
      };
    }
  }
});
```

---

## 📊 Monitoring Events

Untuk melihat semua events yang terjadi di aplikasi:

```javascript
// Log semua custom events
const originalDispatch = window.dispatchEvent;
window.dispatchEvent = function(event) {
  if (event instanceof CustomEvent) {
    console.log('📡 Custom Event:', event.type, event.detail);
  }
  return originalDispatch.call(this, event);
};
```

---

## 🔍 Debug Checklist

Jika navigasi tidak berfungsi, periksa:

### ✅ Event Listener Terpasang
```javascript
// Di console, cek apakah listener ada
console.log(window._events); // Akan undefined jika tidak ada custom tracking
// Atau coba dispatch manual (lihat Test 1-3 di atas)
```

### ✅ Data Lengkap
```javascript
// Pastikan data dari ElevenLabs lengkap
// Minimal harus ada: from, to, date
```

### ✅ Router Ready
```javascript
// Pastikan Next.js router sudah ready
// Error "Cannot read properties of undefined (reading 'push')" 
// = router belum initialized
```

### ✅ Halaman Tujuan Ada
```javascript
// Pastikan route exists:
// /pandu-app/tiket ✅
// /pandu-app/navigasi ✅
// /pandu-app/bantuan ✅
```

---

## 🚨 Common Issues

### Issue 1: Event tidak diterima
**Problem:** Console tidak menampilkan log saat event di-dispatch

**Solution:**
- Pastikan Anda di halaman `/pandu-app`
- Event listener hanya aktif di halaman tersebut
- Reload halaman dan coba lagi

---

### Issue 2: Redirect tapi data tidak terkirim
**Problem:** Halaman tiket terbuka tapi form kosong

**Solution:**
- Periksa Console untuk error
- Pastikan event `submitTicketSearch` di-dispatch SETELAH redirect
- Cek network tab untuk memastikan halaman sudah fully loaded

---

### Issue 3: ElevenLabs tidak memanggil tool
**Problem:** Agent tidak memanggil `bookTicket` atau `navigateToPage`

**Solution:**
1. Pastikan tool type = `client` (bukan `server`)
2. Pastikan tool di-enable di agent configuration
3. Periksa agent instructions sudah menyebutkan kapan harus memanggil tool
4. Test dengan prompt yang jelas: "Saya mau booking tiket dari Jakarta ke Bandung tanggal 15 Oktober"

---

## ✨ Success Indicators

Ketika semuanya berfungsi dengan baik, Anda akan melihat:

1. ✅ Console logs yang jelas di setiap step
2. ✅ Halaman redirect smooth tanpa error
3. ✅ Data terisi otomatis di form
4. ✅ User experience yang seamless

---

## 📞 Next Steps

Setelah testing berhasil:

1. Setup ElevenLabs Client Tools (lihat `ELEVENLABS_SETUP.md`)
2. Configure agent instructions
3. Test dengan voice input
4. Deploy ke production
5. Monitor analytics dari ElevenLabs dashboard

Happy coding! 🚀
