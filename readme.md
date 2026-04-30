# 💬 Real-Time Chat Application

A simple, fast chat app where people can create rooms and chat in real-time using WebSockets.

![Landing Page](./screenshots/landing.png)  
![Chat Room](./screenshots/chat.png)

---

## 🛠️ What's Inside?

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + WebSocket
- **Language:** TypeScript (for type safety)

---

## 🚀 Quick Start (Local)

### Step 1: Get the Code
```bash
git clone https://github.com/Subhradeep-Sikder/simple-chat-app.git
cd simple-chat-app
```

### Step 2: Start the Backend
Open a terminal and run:
```bash
cd backend
npm install
npm start
```
✅ Backend is ready on `ws://localhost:8080`

### Step 3: Start the Frontend
Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```
✅ Open `http://localhost:5173` in your browser

### Step 4: Test It!
1. Open the app in two browser tabs
2. Create a room or use the same room code in both tabs
3. Start chatting!

---

## 📝 Common Commands

| What | Command | Where |
|------|---------|-------|
| Start backend | `npm start` | `/backend` |
| Backend with auto-reload | `npm run dev` | `/backend` |
| Start frontend dev server | `npm run dev` | `/frontend` |
| Build frontend for production | `npm run build` | `/frontend` |

---

## 🤔 How It Works

1. **Room System:** Each chat room is temporary. It disappears when everyone leaves.
2. **Real-Time:** Messages appear instantly using WebSockets.
3. **Smart Broadcasting:** Everyone in a room sees messages except the sender (no duplicates).
4. **User Count:** Shows how many people are in your room.

---

## 🐳 Want to Use Docker?

See [DOCKER.md](./DOCKER.md) for instructions.

---

## 🌐 Want to Deploy Online?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step guide.

---
