"""
KAI Pandu - Voice AI Assistant Backend
ElevenLabs Integration Demo
"""

import os
import requests
import json
from typing import Optional, Dict, Any
from datetime import datetime

class KaiPanduVoiceAssistant:
    """
    Main Voice Assistant class for KAI Pandu
    Integrates STT, NLP, and TTS (ElevenLabs)
    """
    
    def __init__(self):
        # API Keys (should be in environment variables in production)
        self.elevenlabs_api_key = "sk_0c0ac367222637bcf8e859d4077c3d603978ee387ccba19a"
        self.openai_api_key = os.getenv("OPENAI_API_KEY")  # Set this in your environment
        
        # ElevenLabs Configuration
        self.voice_id = "21m00Tcm4TlvDq8ikWAM"  # Rachel voice (change to Indonesian voice if available)
        self.model_id = "eleven_multilingual_v2"  # Supports Indonesian
        
        # Voice settings for optimal quality
        self.voice_settings = {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
            "use_speaker_boost": True
        }
    
    def text_to_speech(self, text: str, output_file: str = "response.mp3") -> bool:
        """
        Convert text to speech using ElevenLabs API
        
        Args:
            text: Text to convert to speech
            output_file: Output audio file path
            
        Returns:
            bool: Success status
        """
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{self.voice_id}"
        
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": self.elevenlabs_api_key
        }
        
        data = {
            "text": text,
            "model_id": self.model_id,
            "voice_settings": self.voice_settings
        }
        
        try:
            print(f"🔊 Converting text to speech: '{text[:50]}...'")
            response = requests.post(url, json=data, headers=headers)
            
            if response.status_code == 200:
                with open(output_file, 'wb') as f:
                    f.write(response.content)
                print(f"✅ Audio saved to {output_file}")
                return True
            else:
                print(f"❌ Error: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Exception: {str(e)}")
            return False
    
    def stream_text_to_speech(self, text: str) -> bytes:
        """
        Stream audio directly without saving to file
        Useful for real-time applications
        
        Args:
            text: Text to convert
            
        Returns:
            bytes: Audio data in MP3 format
        """
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{self.voice_id}/stream"
        
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": self.elevenlabs_api_key
        }
        
        data = {
            "text": text,
            "model_id": self.model_id,
            "voice_settings": self.voice_settings
        }
        
        response = requests.post(url, json=data, headers=headers, stream=True)
        
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"TTS Error: {response.status_code}")
    
    def process_ticket_booking(self, user_input: str) -> Dict[str, Any]:
        """
        Process ticket booking request
        This would normally use GPT-4, but here's a simplified version
        
        Args:
            user_input: User's voice input (after STT)
            
        Returns:
            Dict with response and extracted data
        """
        # Mock NLP processing (in production, use GPT-4)
        response_text = ""
        
        # Simple keyword matching (replace with actual NLP)
        if "gambir" in user_input.lower() and "yogyakarta" in user_input.lower():
            response_text = """Ada beberapa pilihan kereta dari Gambir ke Yogyakarta. 
            Kereta Argo Lawu berangkat jam 07:30, harga 150 ribu rupiah kelas ekonomi. 
            Kereta Taksaka berangkat jam 09:00, harga 180 ribu rupiah kelas eksekutif. 
            Mau pilih yang mana?"""
        elif "wonosobo" in user_input.lower():
            response_text = """Maaf, untuk ke Wonosobo Anda perlu transit di Purwokerto. 
            Ada kereta Argo Dwipangga ke Purwokerto jam 08:00. 
            Apakah Anda ingin saya carikan jadwal lengkapnya?"""
        else:
            response_text = """Baik, saya siap membantu Anda memesan tiket. 
            Dari stasiun mana Anda ingin berangkat?"""
        
        return {
            "response_text": response_text,
            "intent": "book_ticket",
            "entities": {
                "origin": "Gambir",
                "destination": "Yogyakarta",
                "date": "today"
            }
        }
    
    def wayfinding_guidance(self, detected_object: str, distance: float) -> str:
        """
        Generate wayfinding voice guidance based on CV detection
        
        Args:
            detected_object: What CV detected (e.g., "Gate 3", "Platform 2")
            distance: Distance in meters
            
        Returns:
            str: Guidance text
        """
        if distance < 5:
            return f"{detected_object} sudah sangat dekat, tepat di depan Anda."
        elif distance < 20:
            return f"{detected_object} ada {int(distance)} meter di depan."
        else:
            return f"{detected_object} terdeteksi, sekitar {int(distance)} meter lagi."
    
    def emergency_assistance(self, user_location: Dict[str, Any]) -> str:
        """
        Handle emergency assistance request
        
        Args:
            user_location: User's current location data
            
        Returns:
            str: Response message
        """
        # Send alert to staff dashboard (mock)
        alert_data = {
            "user_id": user_location.get("user_id"),
            "location": user_location.get("location"),
            "platform": user_location.get("platform"),
            "timestamp": datetime.now().isoformat(),
            "urgency": "high"
        }
        
        print(f"🚨 Alert sent to staff: {json.dumps(alert_data, indent=2)}")
        
        return """Permintaan bantuan Anda telah dikirim ke petugas terdekat. 
        Petugas akan segera datang ke lokasi Anda. Mohon tetap di tempat."""


# =============================================
# Demo Usage Examples
# =============================================

def demo_voice_responses():
    """
    Demo: Generate voice responses for various scenarios
    """
    assistant = KaiPanduVoiceAssistant()
    
    print("\n" + "="*60)
    print("🎤 KAI PANDU VOICE ASSISTANT DEMO")
    print("="*60 + "\n")
    
    # Scenario 1: Welcome Message
    print("📍 Scenario 1: User activates KAI Pandu mode")
    welcome_text = """Selamat datang di KAI Pandu. 
    Saya siap membantu perjalanan Anda hari ini. 
    Katakan 'Pesan Tiket' untuk membeli tiket kereta, 
    atau 'Bantuan' jika Anda memerlukan panduan."""
    
    assistant.text_to_speech(welcome_text, "01_welcome.mp3")
    print()
    
    # Scenario 2: Ticket Booking Response
    print("📍 Scenario 2: User asks about train options")
    ticket_text = """Ada pilihan kereta Argo Lawu jam 07:30 dan Taksaka jam 09:00. 
    Harga mulai dari 150 ribu rupiah. Mau pilih yang mana?"""
    
    assistant.text_to_speech(ticket_text, "02_ticket_options.mp3")
    print()
    
    # Scenario 3: Wayfinding Guidance
    print("📍 Scenario 3: Navigating to platform")
    wayfinding_text = assistant.wayfinding_guidance("Peron 3", 25)
    assistant.text_to_speech(wayfinding_text, "03_wayfinding.mp3")
    print()
    
    # Scenario 4: Seat Finding
    print("📍 Scenario 4: Finding seat on train")
    seat_text = """Kursi 14A ditemukan di sisi kanan Anda. 
    Tiga langkah lagi, kemudian Anda bisa duduk."""
    
    assistant.text_to_speech(seat_text, "04_seat_finding.mp3")
    print()
    
    # Scenario 5: Arrival Alert
    print("📍 Scenario 5: Approaching destination")
    arrival_text = """Stasiun Yogyakarta akan segera tiba dalam 5 menit. 
    Silakan siapkan barang bawaan Anda dan bersiap untuk turun."""
    
    assistant.text_to_speech(arrival_text, "05_arrival_alert.mp3")
    print()
    
    # Scenario 6: Emergency Assistance
    print("📍 Scenario 6: Emergency assistance")
    emergency_text = assistant.emergency_assistance({
        "user_id": "user_123",
        "location": "Platform 2, near Gate 5",
        "platform": "2"
    })
    
    assistant.text_to_speech(emergency_text, "06_emergency.mp3")
    print()
    
    print("✅ All audio files generated successfully!")
    print("\n" + "="*60)


def demo_conversation_flow():
    """
    Demo: Complete ticket booking conversation
    """
    assistant = KaiPanduVoiceAssistant()
    
    print("\n" + "="*60)
    print("💬 CONVERSATION FLOW DEMO")
    print("="*60 + "\n")
    
    conversation = [
        {
            "user": "Saya ingin pesan tiket dari Gambir ke Yogyakarta",
            "system": """Baik, saya cari jadwal kereta dari Gambir ke Yogyakarta. 
            Ada kereta Argo Lawu jam 07:30 dan Taksaka jam 09:00. 
            Untuk tanggal kapan Anda ingin berangkat?"""
        },
        {
            "user": "Besok pagi",
            "system": """Baik, untuk besok pagi saya rekomendasikan Argo Lawu jam 07:30. 
            Mau pilih kelas ekonomi atau eksekutif?"""
        },
        {
            "user": "Ekonomi saja",
            "system": """Baik, kelas ekonomi. Harganya 150 ribu rupiah. 
            Apakah Anda ingin melanjutkan ke pembayaran?"""
        },
        {
            "user": "Ya, lanjutkan",
            "system": """Baik, saya akan proses pembayaran. 
            Pilih metode pembayaran: Transfer Bank, E-wallet, atau KAI Pay?"""
        }
    ]
    
    for idx, turn in enumerate(conversation, 1):
        print(f"\n--- Turn {idx} ---")
        print(f"👤 User: {turn['user']}")
        print(f"🤖 System: {turn['system']}")
        
        filename = f"conversation_turn_{idx}.mp3"
        assistant.text_to_speech(turn['system'], filename)
        print(f"   Audio saved: {filename}")
    
    print("\n✅ Conversation demo completed!")
    print("="*60 + "\n")


def demo_multilingual():
    """
    Demo: Test multilingual capabilities
    """
    assistant = KaiPanduVoiceAssistant()
    
    print("\n" + "="*60)
    print("🌍 MULTILINGUAL DEMO")
    print("="*60 + "\n")
    
    messages = {
        "indonesian": "Selamat datang di KAI Pandu. Kami siap membantu perjalanan Anda.",
        "english": "Welcome to KAI Pandu. We are ready to assist your journey.",
        "mixed": "Welcome ke KAI Pandu. Kami ready untuk help your journey today."
    }
    
    for language, text in messages.items():
        print(f"🗣️ Language: {language}")
        print(f"   Text: {text}")
        filename = f"multilingual_{language}.mp3"
        assistant.text_to_speech(text, filename)
        print(f"   Audio: {filename}\n")
    
    print("✅ Multilingual demo completed!")
    print("="*60 + "\n")


# =============================================
# Flask API Example (for production)
# =============================================

"""
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)

assistant = KaiPanduVoiceAssistant()

@app.route('/api/speak', methods=['POST'])
def speak():
    '''
    API endpoint to convert text to speech
    '''
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        audio_data = assistant.stream_text_to_speech(text)
        return send_file(
            io.BytesIO(audio_data),
            mimetype='audio/mpeg',
            as_attachment=True,
            download_name='speech.mp3'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/book-ticket', methods=['POST'])
def book_ticket():
    '''
    Process ticket booking with voice response
    '''
    data = request.json
    user_input = data.get('text', '')
    
    result = assistant.process_ticket_booking(user_input)
    audio_data = assistant.stream_text_to_speech(result['response_text'])
    
    return jsonify({
        'text': result['response_text'],
        'audio': base64.b64encode(audio_data).decode('utf-8'),
        'entities': result['entities']
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
"""


# =============================================
# Main Execution
# =============================================

if __name__ == "__main__":
    print("\n🚀 Starting KAI Pandu Voice Assistant Demo...\n")
    
    # Run demos
    demo_voice_responses()
    demo_conversation_flow()
    demo_multilingual()
    
    print("\n✨ All demos completed!")
    print("📁 Audio files have been generated in the current directory.")
    print("\n💡 Next steps:")
    print("   1. Review generated audio files")
    print("   2. Test with actual voice input (STT)")
    print("   3. Integrate with mobile app")
    print("   4. Deploy Flask API for production")
    print("\n" + "="*60 + "\n")
