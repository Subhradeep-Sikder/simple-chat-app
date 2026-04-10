# 💬 Real-Time Chat Application

A minimalist, high-performance chat system designed to facilitate real-time communication through WebSockets. This project focuses on efficient room management, low-latency message broadcasting, and a clean, responsive user interface.

---

## 📸 Project Interface


![Landing Page](./screenshots/landing.png)  
*The landing interface featuring room creation and join logic.*

![Chat Room](./screenshots/chat.png)  
*The active chat room with dynamic user counting and message alignment.*

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, TypeScript.
* **Backend:** Node.js, `ws` (WebSocket Library), `tsx` (TypeScript Execution).
* **Environment:** TypeScript is used across the full stack for type safety and better developer experience.

---

## 🧠 System Architecture

The application is built on a **Stateful WebSocket Server** model:

1.  **Room Mapping:** The server utilizes a `Map` to associate each unique WebSocket connection with a specific Room ID.
2.  **State Synchronization:** Whenever a user joins or leaves, the server calculates the current room population and broadcasts an `update` event. This ensures all clients are aware of the room's status in real-time.
3.  **Selective Broadcasting:** To prevent "echoes" (seeing your own message twice), the server broadcasts incoming messages to all clients in a room **except** the original sender.
4.  **UI Logic:** The frontend prevents message transmission until a second user joins the room, ensuring a coordinated chat experience.



---

## 🚀 Local Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Subhradeep-Sikder/simple-chat-app.git
cd simple-chat-app
```

### 2. Configure the Backend
Open a terminal and run:
```bash
cd backend
npm install
npm start
```
*The server will initialize on `ws://localhost:8080`.*

### 3. Configure the Frontend
Open a **separate** terminal and run:
```bash
cd frontend
npm install
npm run dev
```
*The UI will be available at `http://localhost:5173`. Open this in two separate tabs to test the room logic.*

---

## 📜 Available Scripts

| Command | Directory | Purpose |
| :--- | :--- | :--- |
| `npm start` | `/backend` | Starts the WebSocket server. |
| `npm run dev` | `/backend` | Starts the server with auto-reload (watch mode). |
| `npm run dev` | `/frontend` | Launches the Vite development server. |
| `npm run build` | `/frontend` | Compiles the frontend for production. |

---

### Author's Note
This project was developed to explore the fundamentals of **Full-Duplex Communication** and server-side state management.

---

