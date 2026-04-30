# 🐳 Docker Setup Guide

Run the entire app (frontend + backend) using Docker and Docker Compose. Super simple!

---

## Prerequisites

Install Docker:
- **Windows/Mac:** [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux:** `apt install docker.io` or `yum install docker`

---

## 🚀 Quick Start with Docker

### Step 1: Navigate to Project Folder
```bash
cd simple-chat-app
```

### Step 2: Run Everything
```bash
docker-compose up --build
```

**That's it!** Docker will:
- ✅ Build the backend
- ✅ Build the frontend
- ✅ Start both services
- ✅ Connect them together

### Step 3: Access the App
Open your browser: `http://localhost`

Done! The app is running! 🎉

---

## Common Commands

### Start Services
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Everything
```bash
docker-compose down -v
```

### View Logs
```bash
docker-compose logs -f
```

### View Backend Logs Only
```bash
docker-compose logs -f backend
```

### View Frontend Logs Only
```bash
docker-compose logs -f frontend
```

---

## How Docker Works Here

### What's Happening?

1. **Backend Container:**
   - Installs Node.js
   - Runs server on port 8080

2. **Frontend Container:**
   - Builds React app
   - Runs Nginx web server on port 80

3. **Network:**
   - Both containers talk to each other
   - Accessible from `localhost`

### Port Mapping

| Service | Inside Docker | Outside Docker | URL |
|---------|---------------|----------------|-----|
| Frontend | 80 | 80 | `http://localhost` |
| Backend | 8080 | 8080 | `ws://localhost:8080` |

---

## Customizing Backend URL

Want to change the backend URL? Edit `docker-compose.yml`:

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      - VITE_BACKEND_URL=ws://your-domain:8080  # Change this
```

Then restart:
```bash
docker-compose up --build
```

---

## Troubleshooting

### "Port already in use"
Port 80 or 8080 is taken. Change in `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Use 3000 instead of 80
```

Then visit: `http://localhost:3000`

### "Build failed"
Clear everything and rebuild:
```bash
docker-compose down -v
docker-compose up --build
```

### "Can't connect to backend"
Check if containers are running:
```bash
docker-compose ps
```

View errors:
```bash
docker-compose logs backend
```

### "Changes not appearing"
Rebuild with:
```bash
docker-compose up --build
```

---

## File Structure

```
simple-chat-app/
├── docker-compose.yml      ← Main config
├── backend/
│   ├── Dockerfile          ← Backend image
│   └── ...
├── frontend/
│   ├── Dockerfile          ← Frontend image
│   ├── nginx.conf          ← Nginx config
│   └── ...
```

---

## Advanced: Building Images Separately

### Build Backend Image
```bash
docker build -t chat-backend ./backend
```

### Build Frontend Image
```bash
docker build -t chat-frontend ./frontend
```

### Run Manually
```bash
docker run -p 8080:8080 chat-backend
docker run -p 80:80 chat-frontend
```

---

## Deploy Docker to Cloud

You can deploy these Docker images to:
- **AWS ECS**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean**

Push to Docker Hub or your container registry first:
```bash
docker tag chat-backend yourusername/chat-backend:latest
docker push yourusername/chat-backend:latest
```

---
