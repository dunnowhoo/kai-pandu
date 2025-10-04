# 🚄 KAI Pandu: Transformasi Pengalaman Perjalanan Kereta Api

Sebuah proyek aplikasi web yang mendemonstrasikan **KAI Pandu**, fitur aksesibilitas revolusioner berbasis AI yang terintegrasi di dalam aplikasi **KAI Access** untuk memberdayakan penumpang tunanetra.

## 🎯 Masalah: Hambatan Aksesibilitas di Transportasi Publik

Berdasarkan riset, **91% penumpang disabilitas** melaporkan mengalami kendala saat menggunakan kereta api, menjadikannya moda transportasi dengan hambatan tertinggi. Di Indonesia, dengan lebih dari **8 juta penyandang tunanetra**, kebutuhan akan solusi transportasi yang inklusif sangat mendesak. Pengguna seperti Ibu Arinaf seringkali menghadapi kesulitan dalam memesan tiket dan bernavigasi di stasiun secara mandiri.

KAI Pandu hadir sebagai solusi inovatif untuk mengatasi masalah ini, sejalan dengan **Peraturan Menteri Perhubungan No. 98 Tahun 2017** tentang penyediaan aksesibilitas yang setara.

## 🌟 Solusi: KAI Pandu

KAI Pandu adalah **asisten perjalanan cerdas** yang terintegrasi dalam KAI Access, dirancang untuk memberikan kemandirian penuh bagi penumpang tunanetra.

### Fitur Utama

- 🎤 **Pemesanan Tiket via Suara**: Memesan tiket antarkota dan komuter sepenuhnya melalui perintah suara natural dengan Agentic AI.
- 🗺️ **Panduan Navigasi (Wayfinder)**: Pemandu arah real-time di dalam stasiun menggunakan Computer Vision (YOLOv11) dan AR untuk mengenali signage dan memberikan instruksi audio.
- 🚨 **Bantuan Darurat Petugas**: Tombol panggilan cepat untuk meminta bantuan petugas keamanan yang dapat melacak lokasi pengguna melalui dashboard khusus.

### Alur Kerja Pengguna

1. **Pesan Tiket**: Pengguna memesan tiket lewat suara.
2. **Navigasi ke Peron**: Setibanya di stasiun, Pandu memberikan instruksi suara turn-by-turn hingga ke peron.
3. **Onboarding Kereta**: Pandu memastikan pengguna naik ke gerbong dan menemukan kursi yang tepat.
4. **Pengingat Turun**: Pandu memberikan notifikasi suara sebelum tiba di stasiun tujuan.
5. **Navigasi Keluar**: Setelah turun, Pandu memandu pengguna hingga ke pintu keluar stasiun.

## 🚀 Demo & Proyek

- **Aplikasi Web**: [https://kai-pandu.vercel.app/](https://kai-pandu.vercel.app/)
- **Model Computer Vision (YOLOv11)**: [https://github.com/hamizghani/kai-pandu-cv-model](https://github.com/hamizghani/kai-pandu-cv-model)
- **Presentasi Proyek (PPT)**: [Lihat di Canva](https://www.canva.com/design/DAG0zfBzbKs/ddh6hpirqO3jUb7ydZd2QQ/view?utm_content=DAG0zfBzbKs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd281f8ec0c)
- **Video Demo YouTube**: [Tonton di Sini](https://youtu.be/tuvXFHmMZaI)

## 🛠️ Tech Stack

| Kategori | Teknologi | Kegunaan |
|----------|-----------|----------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS | Aplikasi web yang modern, cepat, dan full-stack. |
| **Deployment** | Vercel | Hosting aplikasi Next.js yang terintegrasi. |
| **Database** | Supabase (PostgreSQL) | Penyimpanan data pengguna dan pesanan yang skalabel. |
| **AI: Voice Agent** | ElevenLabs | Agentic AI untuk percakapan suara yang natural. |
| **AI: Computer Vision** | Python, YOLOv11 | Deteksi signage dan navigasi real-time. |
| **AI: Data Labeling** | Label Studio | Anotasi dataset gambar untuk pelatihan model CV. |

## 🤝 Tim Pengembang: KAInnovators

Proyek ini dikembangkan oleh tim **KAInnovators** dari Universitas Indonesia untuk kompetisi **Hacksphere 2025**.

- **Oscar Ryanda Putra** (Project Manager)
- **Muhammad Hamiz Ghani A.** (AI Engineer)
- **Fauzan Putra Sanjaya** (Fullstack Developer)

---

`#AccessibilityMatters` `#KAIPandu` `#InclusiveIndonesia` `#AIforGood`

