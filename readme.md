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

## 🌐 Deploying Online

### How the Backend URL Works

The frontend automatically detects the backend URL:
- **Local Development:** Uses `ws://localhost:8080`
- **Production:** Automatically uses `wss://your-domain.com:8080` (secure WebSocket)

### Step 1: Build the Frontend

```bash
cd frontend
npm install
npm run build
```

This creates a `/dist` folder with production-ready files.

### Step 2: Deploy Backend

Deploy the backend server to your hosting provider (Heroku, Railway, DigitalOcean, AWS, etc.):

```bash
cd backend
npm install
npm start
```

**Important:** The backend must run on port `8080`.

### Step 3: Deploy Frontend

Deploy the `/frontend/dist` folder to a static hosting service:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any web server (Nginx, Apache)**

### Step 4: Configure Environment Variables (Optional)

If your backend runs on a different domain or port, create a `.env.production` file in the frontend directory:

```bash
# .env.production
VITE_BACKEND_URL=wss://your-backend-domain.com:8080
```

Then rebuild:
```bash
npm run build
```

### Example Deployment Scenarios

**Scenario 1: Backend and Frontend on Same Domain**
- Backend: `https://chat.example.com:8080` (backend)
- Frontend: `https://chat.example.com` (hosted static files)
- ✅ Automatic detection works!

**Scenario 2: Backend on Separate Domain**
- Backend: `https://api.example.com:8080`
- Frontend: `https://chat.example.com`
- Add `.env.production`: `VITE_BACKEND_URL=wss://api.example.com:8080`

**Scenario 3: Using Reverse Proxy (Recommended)**
- Use Nginx/Apache to proxy `/ws` to backend
- Everything appears on same domain
- Simpler CORS/SSL configuration

---

### Author's Note
This project was developed to explore the fundamentals of **Full-Duplex Communication** and server-side state management.

---

