# Debugging Navigation Issues - KAI Pandu

## Quick Test Steps

1. **Open Browser**: http://localhost:3001/pandu-app
2. **Klik "Mulai KAI Pandu"** untuk mengaktifkan conversation
3. **Test Manual Navigation**:
   - Klik tombol "Test Ticket Page" → lihat apakah view berubah
   - Klik tombol "Test Navigation Page" → lihat apakah view berubah  
   - Klik tombol "Test Help Page" → lihat apakah view berubah
   - Klik "Log State" → check console untuk current state

## Check Browser Console

Buka Developer Tools (F12) dan lihat Console. Seharusnya muncul:

```
🔄 Voice navigation to: /ticket
🔍 Current view before: landing
🎯 Setting view to: ticket-booking
📍 Berpindah ke halaman ticket-booking
✅ View changed successfully
```

## Test Voice Commands

Setelah manual test berhasil, test dengan suara:

1. **Berikan izin mikrofon** 
2. **Tunggu status "Terhubung"**
3. **Ucapkan**: "Pesan tiket"
4. **Check console** untuk log navigasi
5. **Lihat apakah halaman berubah**

## Expected Results

✅ **Manual Test**: Tombol test harus mengubah view/halaman  
✅ **Console Log**: Harus muncul semua debug messages  
✅ **Voice Test**: Suara "pesan tiket" harus trigger navigasi  
✅ **UI Update**: Halaman harus berubah dari landing ke ticket-booking  

## Troubleshooting

### Jika Manual Test Tidak Bekerja:
- Pastikan `currentView` state berubah di console
- Check apakah component re-render
- Lihat error di console

### Jika Voice Test Tidak Bekerja:
- Pastikan Agent sudah setup dengan Client Tools
- Check apakah `navigateToPage` dipanggil di console
- Verify agent response di ElevenLabs

### Common Issues:

1. **View tidak berubah**:
   ```javascript
   // Check di console:
   console.log('Current view:', currentView);
   ```

2. **Tool tidak dipanggil**:
   - Setup Client Tools di ElevenLabs dashboard
   - Update System Prompt dengan instruksi yang jelas

3. **Error di console**:
   - Check network requests
   - Verify agent ID di .env.local

## Debug Commands

Paste ini di browser console untuk debug:

```javascript
// Check current state
console.log('Current view:', window.currentView);
console.log('Show conversation:', window.showConversation);

// Manual navigation test
window.handleVoiceNavigation('/ticket');
```

## Next Steps

1. **Fix Manual Navigation First** - harus bisa klik tombol test
2. **Setup Agent Tools** - di ElevenLabs dashboard  
3. **Test Voice Commands** - setelah manual navigation bekerja
4. **Remove Debug Buttons** - setelah semua OK