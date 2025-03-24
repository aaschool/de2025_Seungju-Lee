
# Soundscape Garden Management System

## Project Overview

The Soundscape Garden Management System is an interactive environmental control platform that transforms a garden space into a responsive sound and light experience. The system captures real-time visitor interactions through sensors embedded in the environment and responds with dynamic soundscapes and lighting effects. It combines sensor-driven feedback, MIDI-triggered audio, and visual data representation, allowing visitors to physically influence their surroundings through proximity and touch.

Designed as both a user interface and a control infrastructure, the system integrates:

- A browser-based p5.js frontend interface
- A real-time Node.js backend server
- An Arduino (ESP32) for sensing proximity and touch
- LED lighting and sound synthesis software (via MIDI) for environmental response

This project demonstrates the merging of physical computing, sound design, and spatial interaction for digital ecologies and responsive landscapes.

## Project Structure

```
garden-soundscape-server/
├── server.js               # Node.js backend with WebSocket + API
├── simulator.js            # Simulates sensor input for testing
├── package.json            # Node project dependencies
├── public/                 # Frontend served by Express
│   ├── index.html          # Main interface
│   ├── sketch.js           # p5.js visual + WebSocket logic
│   └── style.css           # Optional custom styles
```

## Required Components

For full hardware integration (optional during simulation phase):

- ESP32 or WiFi-enabled Arduino (e.g., NodeMCU)
- Ultrasonic Sensor (for proximity detection)
- Electropad or capacitive sensor (detects touch on plants or trees)
- Speakers connected to MIDI-capable sound synthesis software (Ableton, Max/MSP, etc.)
- LED lighting system (individually addressable, optional for visual feedback)

## Required Libraries

### Backend (Node.js):
- express – web server
- ws – WebSocket communication
- midi – optional, native MIDI control (can be skipped during simulation)

### Frontend (served from /public):
- p5.js
- p5.sound (optional for future sound feedback)
- p5.touchgui (if using GUI controls)

## How the System Works

1. Arduino Setup (ESP32)  
   - Detects proximity using an ultrasonic sensor  
   - Detects touch on trees or plants using an electropad  
   - Sends sensor data (as JSON) over Wi-Fi to the Node.js backend via WebSocket

2. Node.js Backend  
   - Receives real-time sensor data from Arduino or a simulator  
   - Logs and forwards data to the frontend via WebSocket  
   - (Optional) Sends MIDI messages to sound software to create reactive audio

3. Frontend Interface (p5.js)  
   - Displays visual feedback of proximity and touch data  
   - Updates live using WebSocket data stream  
   - Can be extended with sliders, color pickers, or other UI elements to control lighting/sound zones

4. Simulator Mode (No Hardware)  
   - simulator.js can be run to generate random proximity and touch values every second  
   - Useful for frontend/backend development without Arduino hardware
