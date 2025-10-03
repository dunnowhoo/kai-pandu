# 🚄 KAI Access - Mobile Web App

A mobile-first web application showcasing the KAI (Kereta Api Indonesia) Access app interface with the innovative **KAI Pandu** accessibility feature.

## 🌟 Features

### Main App
- **KAI PAY** - Digital wallet for train payments
- **Ticket Booking** - Inter City, Local, Commuter Line, LRT, Airport
- **Additional Services** - Hotel, Multi Trip Card, KAI Logistics
- **Trip Planner** - Plan your journey efficiently
- **Promotions** - Latest deals and offers

### 🎯 KAI Pandu - NEW!
**Accessible Journey Companion for Visually Impaired Passengers**

An AI-powered feature that provides:
- 🎤 **Voice Ticket Booking** - Book tickets with natural voice commands
- 🗺️ **Smart Wayfinding** - CV-based navigation in stations
- 🪑 **Onboard Assistant** - Seat finding & arrival alerts
- 🚨 **Staff Dashboard** - Real-time assistance for KAI staff

**[→ Read Full KAI Pandu Proposal](./KAI-PANDU-PROPOSAL.md)**  
**[→ View Pitch Deck](./KAI-PANDU-PITCH.md)**

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

```
kai-pandu/
├── src/
│   └── app/
│       ├── page.tsx           # Main homepage
│       ├── kai-pandu/
│       │   └── page.tsx       # KAI Pandu feature page
│       ├── globals.css        # Global styles
│       └── layout.tsx         # App layout
├── backend/                   # Python backend for AI integration
│   ├── kai_pandu_voice.py    # Voice assistant with ElevenLabs
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment variables template
│   └── README.md             # Backend documentation
├── public/                    # Static assets
├── KAI-PANDU-PROPOSAL.md     # Full feature proposal
├── KAI-PANDU-PITCH.md        # One-page pitch deck
├── KAI-PANDU-TECHNICAL.md    # Technical implementation guide
└── README.md                 # This file
```

## 📱 Design

- **Mobile-First**: Optimized for 430px width (standard mobile device)
- **Responsive**: Centers on desktop with mobile viewport
- **Modern UI**: Gradient backgrounds, glassmorphism effects
- **Accessible**: High contrast, large touch targets

### Pages

1. **Homepage** (`/`) - Main KAI Access interface
2. **KAI Pandu Info** (`/kai-pandu`) - Feature showcase & proposal
3. **Pandu App** (`/pandu-app`) - Interactive voice assistant app ⭐ NEW!

### Pandu App Features

The `/pandu-app` page is a fully interactive prototype featuring:

- ✅ **Voice Assistant Integration** - ElevenLabs ConvAI widget
- ✅ **Voice Visualizer** - Real-time audio feedback
- ✅ **Conversation Transcript** - Chat-style message display
- ✅ **Quick Actions** - Pesan Tiket, Navigasi, Panggil Petugas
- ✅ **AR Navigation View** - Camera-based wayfinding simulation
- ✅ **Emergency Help Screen** - Staff assistance request flow
- ✅ **Accessibility-First Design** - Large targets, high contrast, voice-first

**[→ See UI/UX Documentation](./KAI-PANDU-UI-DESIGN.md)**

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (with Turbopack)
- **UI**: React 19.1.0
- **Styling**: Tailwind CSS 4.0
- **TypeScript**: Type-safe development
- **Deployment**: Ready for Vercel

### Backend (AI Integration)
- **Language**: Python 3.10+
- **Framework**: Flask (API Server)
- **AI Services**:
  - **ElevenLabs** - Text-to-Speech (Natural voice output)
  - **OpenAI Whisper** - Speech-to-Text (Voice input)
  - **OpenAI GPT-4** - Natural Language Processing
- **Database**: PostgreSQL + Redis
- **Real-time**: WebSocket (Socket.io)

**[→ Backend Documentation](./backend/README.md)**

## 🎨 Color Palette

- **Primary**: Purple/Indigo gradient
- **Accent**: Teal, Pink, Orange
- **KAI Pandu**: Pink to Indigo gradient (distinctive)

## 📊 KAI Pandu Impact

| Target | Value |
|--------|-------|
| Visually Impaired in Indonesia | ±4 Million |
| Target Users Year 1 | 10,000 |
| Potential Market (incl. elderly) | 25M+ |
| MVP Timeline | 3-6 months |

## 🌍 Global Benchmark

- ✅ **NaviLens** - Used by MTA New York & TransLink Vancouver
- ✅ **KAI Face Recognition** - AI already integrated in boarding process

## 🤝 Contributing

This is a concept/proposal project. For collaboration inquiries:

1. Review the proposal documents
2. Check the demo at `/kai-pandu`
3. Reach out with feedback or partnership opportunities

## 📄 Documentation

- **[Full Proposal](./KAI-PANDU-PROPOSAL.md)** - Detailed feature specification, technical implementation, business model
- **[Pitch Deck](./KAI-PANDU-PITCH.md)** - One-page executive summary
- **[Technical Guide](./KAI-PANDU-TECHNICAL.md)** - Complete technical implementation with ElevenLabs integration
- **[Backend API](./backend/README.md)** - Voice AI backend documentation

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [KAI Official Website](https://www.kai.id)

## 📞 Contact

For inquiries about KAI Pandu:
- Email: kai-pandu@kai.id
- Website: [Demo Link]

## 📝 License

This is a concept project created for demonstration purposes.

---

**#AccessibilityMatters #KAIPandu #InclusiveIndonesia #TransportForAll**

**Last Updated:** October 2, 2025
