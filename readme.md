# Real-Time Chat Application

This is a real-time, lightweight chat application designed for ephemeral, direct communication. Users can instantiate temporary chat rooms and communicate instantly over WebSockets. The application utilizes a modern tech stack focused on high performance, type safety, and a minimalistic user interface.


## UI Preview

* Landing Page
  ![Landing Page](./screenshots/landing.png)

* Chat Room
  ![Chat Room](./screenshots/chat.png)

## Core Technical Features

* **WebSocket Messaging:** Low-latency real-time communication between clients.
* **Ephemeral Rooms:** In-memory room management; automatically deleted when everyone leaves.
* **Live Room Telemetry:** Dynamic updates of user counts and real-time UI state adjustment.
* **Input Locking:** Chat interface locks automatically until at least two users join.
* **Cross-Platform:** Designed to run seamlessly on Windows, macOS, and Linux.

## Architecture and Technology Stack

* **Frontend:** React 18, Vite, and Tailwind CSS.
* **Backend:** Node.js, ws library.
* **Language:** TypeScript.
* **State Flow:** Event-driven architecture with JSON payloads.

## Directory Structure

* `/frontend`: React application containing the UI logic, WebSocket event listeners, and Tailwind-based dark mode theme.
* `/backend`: Node.js WebSocket server managing room membership maps and routing messages to peer connections.

## Local Development Requirements

* Node.js v18 or higher
* npm (Node Package Manager)
* Git

## Quick Start Guide

### Step 1: Clone the Repository
Clone the repository and navigate to the project root:
```bash
git clone https://github.com/Subhradeep-Sikder/simple-chat-app.git
cd simple-chat-app
```

### Step 2: Start the Backend Server
Initialize dependencies and start the WebSocket server:
```bash
cd backend
npm install
npm start
```

### Step 3: Start the Frontend Client
Open a separate terminal window, initialize client-side dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Validate Locally
Open `http://localhost:5173` in your web browser. To test real-time communication, open the same link in a second window or browser profile and join using the same Room Code.


<p align="center">Built by Subhradeep Sikder </p>
