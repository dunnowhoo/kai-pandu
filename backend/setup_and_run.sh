#!/bin/bash

# KAI Pandu Backend - Quick Start Script
# This script sets up and runs the voice assistant demo

echo "🚀 KAI Pandu Backend - Quick Start"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.10 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

echo ""

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

echo ""

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "✅ .env file created. Please add your OpenAI API key if needed."
else
    echo "✅ .env file found"
fi

echo ""
echo "🎤 Running Voice Assistant Demo..."
echo "===================================="
echo ""

# Run the demo
python kai_pandu_voice.py

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Demo completed successfully!"
    echo ""
    echo "📁 Audio files generated:"
    ls -lh *.mp3 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'
    echo ""
    echo "🎧 You can now play these audio files to hear the voice assistant"
    echo ""
else
    echo ""
    echo "❌ Demo failed. Please check the error messages above."
    echo ""
fi

echo "💡 Next steps:"
echo "   1. Review the generated audio files"
echo "   2. Check backend/README.md for API documentation"
echo "   3. Add your OpenAI API key to .env for full functionality"
echo ""
echo "===================================="
