# Multi-Agent System (MERN Microservices)

A scalable, multi-agent platform built with the MERN stack using a microservices architecture. It features an API Gateway, dedicated microservices (Auth, Chat, Agent, etc.), Redis session management, MongoDB storage, and a React + Vite frontend interface.

---

## 🏗 System Architecture

```text
                        ┌────────────────────────┐
                        │   Frontend (React/Vite) │
                        │  http://localhost:5173 │
                        └───────────┬────────────┘
                                    │
                                    ▼
                        ┌────────────────────────┐
                        │       API Gateway      │
                        │  http://localhost:8000 │
                        └───────────┬────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│ Auth Service │             │ Chat Service │             │ Agent Service│
│:8001         │             │:8002         │             │:8003         │
└──────────────┘             └──────────────┘             └──────────────┘
```

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed on your machine:

1. **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
2. **MongoDB**: Installed locally or a cloud connection URI ([Download MongoDB Community](https://www.mongodb.com/try/download/community))
3. **Redis**: (Optional for basic auth, recommended for session caching)
   - **MacOS (Homebrew)**: `brew install redis`
   - **Docker**: Docker Desktop ([Download](https://www.docker.com/products/docker-desktop/))

---

## ⚡ Option 1: Run All Services with One Command (Recommended)

You can launch all services (Auth Service, Chat Service, Agent Service, API Gateway, and Frontend App) simultaneously using the provided master runner script.

### 1. Make the run script executable (first time only)
```bash
chmod +x run.sh
```

### 2. Start all services
From the root folder, run **either**:

```bash
./run.sh
```
*or*
```bash
npm run dev
```

The script will:
- Check and install missing `node_modules` automatically.
- Discover and start all microservices in `backend/services/`, the `backend/gateway`, and `frontend`.
- Provide color-coded logs for each service in a single terminal.
- Stop all background services cleanly when you press `Ctrl + C`.

---

## 🛠 Option 2: Step-by-Step Manual Run (Individual Terminals)

If you prefer to run services in separate terminal windows for debugging, follow these step-by-step instructions:

### Step 1: Start Databases (MongoDB & Redis)

- **MongoDB**:
  ```bash
  brew services start mongodb-community
  ```
- **Redis (via Homebrew)**:
  ```bash
  brew services start redis
  ```
  *OR* **Redis (via Docker)**:
  ```bash
  cd backend
  docker compose up -d
  ```

---

### Step 2: Start Auth Service

Open Terminal 1:
```bash
cd backend/services/auth
npm install   # (Only required on first setup)
npm run dev
```
> Running on: `http://localhost:8001`

---

### Step 3: Start Chat Service

Open Terminal 2:
```bash
cd backend/services/chat
npm install   # (Only required on first setup)
npm run dev
```
> Running on: `http://localhost:8002`

---

### Step 4: Start Agent Service

Open Terminal 3:
```bash
cd backend/services/agent
npm install   # (Only required on first setup)
npm run dev
```
> Running on: `http://localhost:8003`

---

### Step 5: Start API Gateway

Open Terminal 4:
```bash
cd backend/gateway
npm install   # (Only required on first setup)
npm run dev
```
> Running on: `http://localhost:8000`

---

### Step 6: Start Frontend Application

Open Terminal 5:
```bash
cd frontend
npm install   # (Only required on first setup)
npm run dev
```
> Running on: `http://localhost:5173` (or port specified in output)

---

## ⚙️ Environment Variables Setup

Ensure each component has its respective `.env` file configured.

### `backend/services/auth/.env`
```env
PORT=8001
MONGO_URI=mongodb://localhost:27017/multiagent
AUTH_COLLECTION_NAME=auth
REDIS_URL=redis://localhost:6379
```

### `backend/services/chat/.env`
```env
PORT=8002
MONGO_URI=mongodb://localhost:27017/multiagent
AUTH_COLLECTION_NAME=chat
REDIS_URL=redis://localhost:6379
```

### `backend/services/agent/.env`
```env
PORT=8003
MONGO_URI=mongodb://localhost:27017/multiagent
AUTH_COLLECTION_NAME=agent
REDIS_URL=redis://localhost:6379
```

### `backend/gateway/.env`
```env
PORT=8000
AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
FRONTEND_URL=http://localhost:5173,http://localhost:5174
REDIS_URL=redis://localhost:6379
```

### `frontend/.env`
```env
VITE_SERVER_URL="http://localhost:8000"
VITE_APP_NAME="Agentrix"
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_APP_ID="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
```

---

## 🔍 Troubleshooting & FAQs

### 1. `docker compose up -d` error: "Cannot connect to the Docker daemon"
- **Fix**: Open Docker Desktop app first to start the Docker engine. Alternatively, start Redis natively using `brew services start redis`.

### 2. `AggregateError [ECONNREFUSED]` for Redis
- The backend services are configured to catch Redis connection errors gracefully and display a warning without crashing. To enable full session caching, start Redis via Homebrew (`brew services start redis`) or Docker.

### 3. Port Conflicts (Address already in use)
- Check what process is running on the port:
  ```bash
  lsof -i :8000
  lsof -i :8001
  lsof -i :8002
  lsof -i :8003
  ```
- Kill the process if necessary:
  ```bash
  kill -9 <PID>
  ```
