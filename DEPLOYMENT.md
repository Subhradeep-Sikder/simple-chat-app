# 🌐 Deploy Online

This guide shows you how to put your chat app on the internet so anyone can use it!

---

## How It Works

The app has two parts:
- **Frontend** (what users see) → Hosted on static hosting
- **Backend** (the chat engine) → Hosted on a server

When you visit the app, the frontend automatically finds the backend. Magic! ✨

---

## Step 1: Build the Frontend

First, create the production-ready files:

```bash
cd frontend
npm install
npm run build
```

This creates a `/dist` folder with all the files ready to upload.

---

## Step 2: Deploy the Backend

Pick a hosting service and deploy the backend:
- **Recommended:** [Railway.app](https://railway.app) (easiest)
- Also works: Heroku, DigitalOcean, AWS, Google Cloud

**Commands to run on server:**
```bash
cd backend
npm install
npm start
```

**Important:** Backend MUST run on port `8080`

After deployment, you'll get a URL like: `https://your-backend.railway.app`

---

## Step 3: Deploy the Frontend

Upload the `/frontend/dist` folder to:
- **Recommended:** [Vercel](https://vercel.com) (free, super easy)
- Also works: Netlify, GitHub Pages, AWS S3

Just upload the `dist` folder and you're done!

---

## Step 4: Connect Them Together

### If Backend is on Same Domain (Easy ✅)

Example: Both on `example.com`
- Frontend: `https://example.com`
- Backend: `https://example.com:8080`

**Nothing to do!** The app auto-detects.

### If Backend is on Different Domain (Need Setup)

Example:
- Frontend: `https://chat.example.com`
- Backend: `https://api.example.com:8080`

**Before building, create `/frontend/.env.production`:**

```
VITE_BACKEND_URL=wss://api.example.com:8080
```

Then rebuild:
```bash
npm run build
```

---

## Real Examples

### Example 1: Everything on Vercel + Railway

1. **Backend on Railway:**
   - Deploy `/backend` → get `https://my-chat-backend.railway.app`

2. **Frontend on Vercel:**
   - Create `.env.production`:
     ```
     VITE_BACKEND_URL=wss://my-chat-backend.railway.app:8080
     ```
   - Deploy `/frontend` → get `https://my-chat.vercel.app`

3. **Visit:** `https://my-chat.vercel.app` ✅

### Example 2: Using a Reverse Proxy (Advanced)

Use Nginx to serve both:
```
https://example.com → Frontend
https://example.com:8080 → Backend
```

This way, no environment variables needed!

---

## SSL/HTTPS Setup

For production, use `wss://` instead of `ws://`:
- `ws://` = Not secure (only for local dev)
- `wss://` = Secure (for production)

Most hosting providers handle this automatically. ✅

---

## Troubleshooting

**"Connection failed"?**
- Make sure backend is running on port 8080
- Check `.env.production` has correct backend URL
- Check CORS headers if different domains

**"404 Not Found"?**
- Make sure you uploaded the `/dist` folder, not the `/src` folder

---
